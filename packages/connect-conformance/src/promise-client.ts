// Copyright 2021-2025 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { create } from "@bufbuild/protobuf";
import { createClient } from "@connectrpc/connect";
import type { CallOptions, Client, Transport } from "@connectrpc/connect";
import { createWritableIterable } from "@connectrpc/connect/protocol";
import {
  type ClientCompatRequest,
  ClientResponseResultSchema,
} from "./gen/connectrpc/conformance/v1/client_compat_pb.js";
import {
  ConformanceService,
  UnaryRequestSchema,
  IdempotentUnaryRequestSchema,
  ServerStreamRequestSchema,
  ClientStreamRequestSchema,
  ConformancePayloadSchema,
  BidiStreamRequestSchema,
  UnimplementedRequestSchema,
  type BidiStreamRequest,
} from "./gen/connectrpc/conformance/v1/service_pb.js";
import {
  convertToProtoHeaders,
  getCancelTiming,
  getRequestHeaders,
  getRequestMessages,
  getSingleRequestMessage,
  setClientErrorResult,
  wait,
} from "./protocol.js";
import { StreamType } from "./gen/connectrpc/conformance/v1/config_pb.js";

type ConformanceClient = Client<typeof ConformanceService>;

const emptyPayload = create(ConformancePayloadSchema);

export function invokeWithPromiseClient(
  transport: Transport,
  compatRequest: ClientCompatRequest,
) {
  const client = createClient(ConformanceService, transport);
  switch (compatRequest.method) {
    case ConformanceService.method.unary.name:
      return unary(client, compatRequest);
    case ConformanceService.method.idempotentUnary.name:
      return unary(client, compatRequest, true);
    case ConformanceService.method.serverStream.name:
      return serverStream(client, compatRequest);
    case ConformanceService.method.clientStream.name:
      return clientStream(client, compatRequest);
    case ConformanceService.method.bidiStream.name:
      return bidiStream(client, compatRequest);
    case ConformanceService.method.unimplemented.name:
      return unimplemented(client, compatRequest);
    default:
      throw new Error(`Unknown method: ${compatRequest.method}`);
  }
}

async function unary(
  client: ConformanceClient,
  compatRequest: ClientCompatRequest,
  idempotent = false,
) {
  await wait(compatRequest.requestDelayMs);
  const result = create(ClientResponseResultSchema);
  try {
    const controller = new AbortController();
    const { afterCloseSendMs } = getCancelTiming(compatRequest);
    if (afterCloseSendMs >= 0) {
      void wait(afterCloseSendMs).then(() => controller.abort());
    }
    const callOptions: CallOptions = {
      headers: getRequestHeaders(compatRequest),
      signal: controller.signal,
      onHeader(headers) {
        result.responseHeaders = convertToProtoHeaders(headers);
      },
      onTrailer(trailers) {
        result.responseTrailers = convertToProtoHeaders(trailers);
      },
    };
    const response = idempotent
      ? await client.idempotentUnary(
          getSingleRequestMessage(compatRequest, IdempotentUnaryRequestSchema),
          callOptions,
        )
      : await client.unary(
          getSingleRequestMessage(compatRequest, UnaryRequestSchema),
          callOptions,
        );
    result.payloads.push(response.payload ?? emptyPayload);
  } catch (e) {
    setClientErrorResult(result, e);
  }
  return result;
}

async function serverStream(
  client: ConformanceClient,
  compatRequest: ClientCompatRequest,
) {
  const cancelTiming = getCancelTiming(compatRequest);
  const controller = new AbortController();
  await wait(compatRequest.requestDelayMs);
  const result = create(ClientResponseResultSchema);
  const request = getSingleRequestMessage(
    compatRequest,
    ServerStreamRequestSchema,
  );
  try {
    const res = client.serverStream(request, {
      headers: getRequestHeaders(compatRequest),
      signal: controller.signal,
      onHeader(headers) {
        result.responseHeaders = convertToProtoHeaders(headers);
      },
      onTrailer(trailers) {
        result.responseTrailers = convertToProtoHeaders(trailers);
      },
    });
    if (cancelTiming.afterCloseSendMs >= 0) {
      await wait(cancelTiming.afterCloseSendMs);
      controller.abort();
    }
    for await (const msg of res) {
      result.payloads.push(msg.payload ?? emptyPayload);
      if (result.payloads.length === cancelTiming.afterNumResponses) {
        controller.abort();
      }
    }
  } catch (e) {
    setClientErrorResult(result, e);
  }
  return result;
}

async function clientStream(
  client: ConformanceClient,
  compatRequest: ClientCompatRequest,
) {
  const cancelTiming = getCancelTiming(compatRequest);
  const controller = new AbortController();
  const result = create(ClientResponseResultSchema);
  try {
    const response = await client.clientStream(
      (async function* () {
        for (const msg of getRequestMessages(
          compatRequest,
          ClientStreamRequestSchema,
        )) {
          await wait(compatRequest.requestDelayMs);
          yield msg;
        }
        if (cancelTiming.beforeCloseSend !== undefined) {
          controller.abort();
        } else if (cancelTiming.afterCloseSendMs >= 0) {
          setTimeout(() => {
            controller.abort();
          }, cancelTiming.afterCloseSendMs);
        }
      })(),
      {
        signal: controller.signal,
        headers: getRequestHeaders(compatRequest),
        onHeader(headers) {
          result.responseHeaders = convertToProtoHeaders(headers);
        },
        onTrailer(trailers) {
          result.responseTrailers = convertToProtoHeaders(trailers);
        },
      },
    );
    result.payloads.push(response.payload ?? emptyPayload);
  } catch (e) {
    setClientErrorResult(result, e);
  }
  return result;
}

async function bidiStream(
  client: ConformanceClient,
  compatRequest: ClientCompatRequest,
) {
  const cancelTiming = getCancelTiming(compatRequest);
  const controller = new AbortController();
  const result = create(ClientResponseResultSchema);
  try {
    const request = createWritableIterable<BidiStreamRequest>();
    const responses = client.bidiStream(request, {
      signal: controller.signal,
      headers: getRequestHeaders(compatRequest),
      onHeader(headers) {
        result.responseHeaders = convertToProtoHeaders(headers);
      },
      onTrailer(trailers) {
        result.responseTrailers = convertToProtoHeaders(trailers);
      },
    });
    const responseIterator = responses[Symbol.asyncIterator]();
    for (const msg of getRequestMessages(
      compatRequest,
      BidiStreamRequestSchema,
    )) {
      await wait(compatRequest.requestDelayMs);
      await request.write(msg);
      if (compatRequest.streamType === StreamType.FULL_DUPLEX_BIDI_STREAM) {
        if (cancelTiming.afterNumResponses === 0) {
          controller.abort();
        }
        const next = await responseIterator.next();
        if (next.done === true) {
          continue;
        }
        result.payloads.push(next.value.payload ?? emptyPayload);
        if (result.payloads.length === cancelTiming.afterNumResponses) {
          controller.abort();
        }
      }
    }
    if (cancelTiming.beforeCloseSend !== undefined) {
      controller.abort();
    }
    request.close();
    if (cancelTiming.afterCloseSendMs >= 0) {
      setTimeout(() => {
        controller.abort();
      }, cancelTiming.afterCloseSendMs);
    }
    if (cancelTiming.afterNumResponses === 0) {
      controller.abort();
    }
    // Drain the response iterator
    for (;;) {
      const next = await responseIterator.next();
      if (next.done === true) {
        break;
      }
      result.payloads.push(next.value.payload ?? emptyPayload);
      if (result.payloads.length === cancelTiming.afterNumResponses) {
        controller.abort();
      }
    }
  } catch (e) {
    setClientErrorResult(result, e);
  }
  return result;
}

async function unimplemented(
  client: ConformanceClient,
  compatRequest: ClientCompatRequest,
) {
  const request = getSingleRequestMessage(
    compatRequest,
    UnimplementedRequestSchema,
  );
  const result = create(ClientResponseResultSchema);
  try {
    await client.unimplemented(request, {
      headers: getRequestHeaders(compatRequest),
      onHeader(headers) {
        result.responseHeaders = convertToProtoHeaders(headers);
      },
      onTrailer(trailers) {
        result.responseTrailers = convertToProtoHeaders(trailers);
      },
    });
  } catch (e) {
    setClientErrorResult(result, e);
  }
  return result;
}

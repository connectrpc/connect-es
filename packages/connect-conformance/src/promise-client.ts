// Copyright 2021-2024 The Connect Authors
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

import { createPromiseClient, ConnectError } from "@connectrpc/connect";
import type {
  CallOptions,
  PromiseClient,
  Transport,
} from "@connectrpc/connect";
import { ClientResponseResultSchema } from "./gen/connectrpc/conformance/v1/client_compat_pb.js";
import type { ClientCompatRequest } from "./gen/connectrpc/conformance/v1/client_compat_pb.js";
import {
  ConformanceService,
  UnaryRequestSchema,
  IdempotentUnaryRequestSchema,
  ServerStreamRequestSchema,
  ClientStreamRequestSchema,
  BidiStreamRequestSchema,
  UnimplementedRequestSchema,
} from "./gen/connectrpc/conformance/v1/service_pb.js";
import type {
  Header as ConformanceHeader,
  ConformancePayload,
  BidiStreamRequest,
  UnaryResponse,
  IdempotentUnaryResponse,
} from "./gen/connectrpc/conformance/v1/service_pb.js";
import {
  convertToProtoError,
  convertToProtoHeaders,
  appendProtoHeaders,
  wait,
  getCancelTiming,
} from "./protocol.js";
import { createWritableIterable } from "@connectrpc/connect/protocol";
import { StreamType } from "./gen/connectrpc/conformance/v1/config_pb.js";
import { create } from "@bufbuild/protobuf";
import { anyUnpack } from "@bufbuild/protobuf/wkt";

type ConformanceClient = PromiseClient<typeof ConformanceService>;

export function invokeWithPromiseClient(
  transport: Transport,
  req: ClientCompatRequest,
) {
  const client = createPromiseClient(ConformanceService, transport);

  switch (req.method) {
    case ConformanceService.method.unary.name:
      return unary(client, req);
    case ConformanceService.method.idempotentUnary.name:
      return unary(client, req, true);
    case ConformanceService.method.serverStream.name:
      return serverStream(client, req);
    case ConformanceService.method.clientStream.name:
      return clientStream(client, req);
    case ConformanceService.method.bidiStream.name:
      return bidiStream(client, req);
    case ConformanceService.method.unimplemented.name:
      return unimplemented(client, req);
    default:
      throw new Error(`Unknown method: ${req.method}`);
  }
}

async function unary(
  client: ConformanceClient,
  req: ClientCompatRequest,
  idempotent: boolean = false,
) {
  if (req.requestMessages.length !== 1) {
    throw new Error("Unary method requires exactly one request message");
  }
  req.cancel;
  const msg = req.requestMessages[0];
  const uReq = anyUnpack(
    msg,
    idempotent ? IdempotentUnaryRequestSchema : UnaryRequestSchema,
  );
  if (!uReq) {
    throw new Error("Could not unpack request message to unary request");
  }
  const reqHeader = new Headers();
  appendProtoHeaders(reqHeader, req.requestHeaders);
  let error: ConnectError | undefined = undefined;
  let resHeaders: ConformanceHeader[] = [];
  let resTrailers: ConformanceHeader[] = [];
  const payloads: ConformancePayload[] = [];
  try {
    let call: (
      req: NonNullable<typeof uReq>,
      options: CallOptions,
    ) => Promise<UnaryResponse | IdempotentUnaryResponse> = client.unary;
    if (idempotent) {
      call = client.idempotentUnary;
    }
    await wait(req.requestDelayMs);
    const uRes = await call(uReq, {
      headers: reqHeader,
      onHeader(headers) {
        resHeaders = convertToProtoHeaders(headers);
      },
      onTrailer(trailers) {
        resTrailers = convertToProtoHeaders(trailers);
      },
    });
    payloads.push(uRes.payload!);
  } catch (e) {
    error = ConnectError.from(e);
    // We can't distinguish between headers and trailers here, so we just
    // add the metadata to both.
    //
    // But if the headers are already set, we don't need to overwrite them.
    resHeaders =
      resHeaders.length === 0
        ? convertToProtoHeaders(error.metadata)
        : resHeaders;
    resTrailers = convertToProtoHeaders(error.metadata);
  }
  return create(ClientResponseResultSchema, {
    payloads: payloads,
    responseHeaders: resHeaders,
    responseTrailers: resTrailers,
    error: convertToProtoError(error),
  });
}

async function serverStream(
  client: ConformanceClient,
  req: ClientCompatRequest,
) {
  if (req.requestMessages.length !== 1) {
    throw new Error("ServerStream method requires exactly one request message");
  }
  const msg = req.requestMessages[0];

  const uReq = anyUnpack(msg, ServerStreamRequestSchema);
  if (!uReq) {
    throw new Error(
      "Could not unpack request message to server stream request",
    );
  }
  const reqHeader = new Headers();
  appendProtoHeaders(reqHeader, req.requestHeaders);
  let error: ConnectError | undefined = undefined;
  let resHeaders: ConformanceHeader[] = [];
  let resTrailers: ConformanceHeader[] = [];
  const payloads: ConformancePayload[] = [];
  const cancelTiming = getCancelTiming(req);
  const controller = new AbortController();
  try {
    await wait(req.requestDelayMs);
    const res = client.serverStream(uReq, {
      headers: reqHeader,
      signal: controller.signal,
      onHeader(headers) {
        resHeaders = convertToProtoHeaders(headers);
      },
      onTrailer(trailers) {
        resTrailers = convertToProtoHeaders(trailers);
      },
    });
    if (cancelTiming.afterNumResponses == 0) {
      controller.abort();
    }
    let count = 0;
    for await (const msg of res) {
      payloads.push(msg.payload!);
      count++;
      if (count === cancelTiming.afterNumResponses) {
        controller.abort();
      }
    }
  } catch (e) {
    error = ConnectError.from(e);
    // We can't distinguish between headers and trailers here, so we just
    // add the metadata to both.
    //
    // But if the headers are already set, we don't need to overwrite them.
    resHeaders =
      resHeaders.length === 0
        ? convertToProtoHeaders(error.metadata)
        : resHeaders;
    resTrailers = convertToProtoHeaders(error.metadata);
  }
  return create(ClientResponseResultSchema, {
    responseHeaders: resHeaders,
    responseTrailers: resTrailers,
    payloads: payloads,
    error: convertToProtoError(error),
  });
}

async function clientStream(
  client: ConformanceClient,
  req: ClientCompatRequest,
) {
  const reqHeaders = new Headers();
  appendProtoHeaders(reqHeaders, req.requestHeaders);
  let error: ConnectError | undefined = undefined;
  let resHeaders: ConformanceHeader[] = [];
  let resTrailers: ConformanceHeader[] = [];
  const payloads: ConformancePayload[] = [];
  const cancelTiming = getCancelTiming(req);
  const controller = new AbortController();
  try {
    const csRes = await client.clientStream(
      (async function* () {
        for (const msg of req.requestMessages) {
          const csReq = anyUnpack(msg, ClientStreamRequestSchema);
          if (!csReq) {
            throw new Error(
              "Could not unpack request message to client stream request",
            );
          }
          await wait(req.requestDelayMs);
          yield csReq;
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
        headers: reqHeaders,
        onHeader(headers) {
          resHeaders = convertToProtoHeaders(headers);
        },
        onTrailer(trailers) {
          resTrailers = convertToProtoHeaders(trailers);
        },
      },
    );
    payloads.push(csRes.payload!);
  } catch (e) {
    error = ConnectError.from(e);
    // We can't distinguish between headers and trailers here, so we just
    // add the metadata to both.
    //
    // But if the headers are already set, we don't need to overwrite them.
    resHeaders =
      resHeaders.length === 0
        ? convertToProtoHeaders(error.metadata)
        : resHeaders;
    resTrailers = convertToProtoHeaders(error.metadata);
  }
  return create(ClientResponseResultSchema, {
    responseHeaders: resHeaders,
    responseTrailers: resTrailers,
    payloads: payloads,
    error: convertToProtoError(error),
  });
}

async function bidiStream(client: ConformanceClient, req: ClientCompatRequest) {
  const reqHeaders = new Headers();
  appendProtoHeaders(reqHeaders, req.requestHeaders);
  let error: ConnectError | undefined = undefined;
  let resHeaders: ConformanceHeader[] = [];
  let resTrailers: ConformanceHeader[] = [];
  const payloads: ConformancePayload[] = [];
  const cancelTiming = getCancelTiming(req);
  const controller = new AbortController();
  let recvCount = 0;
  try {
    const reqIt = createWritableIterable<BidiStreamRequest>();
    const sRes = client.bidiStream(reqIt, {
      signal: controller.signal,
      headers: reqHeaders,
      onHeader(headers) {
        resHeaders = convertToProtoHeaders(headers);
      },
      onTrailer(trailers) {
        resTrailers = convertToProtoHeaders(trailers);
      },
    });
    const resIt = sRes[Symbol.asyncIterator]();
    for (const msg of req.requestMessages) {
      const bdReq = anyUnpack(msg, BidiStreamRequestSchema);
      if (!bdReq) {
        throw new Error(
          "Could not unpack request message to client stream request",
        );
      }
      await wait(req.requestDelayMs);
      await reqIt.write(bdReq);
      if (req.streamType === StreamType.FULL_DUPLEX_BIDI_STREAM) {
        if (cancelTiming.afterNumResponses === 0) {
          controller.abort();
        }
        const next = await resIt.next();
        if (next.done === true) {
          continue;
        }
        recvCount++;
        if (cancelTiming.afterNumResponses === recvCount) {
          controller.abort();
        }
        payloads.push(next.value.payload!);
      }
    }
    if (cancelTiming.beforeCloseSend !== undefined) {
      controller.abort();
    }
    reqIt.close();
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
      const next = await resIt.next();
      if (next.done === true) {
        break;
      }
      recvCount++;
      if (cancelTiming.afterNumResponses === recvCount) {
        controller.abort();
      }
      payloads.push(next.value.payload!);
    }
  } catch (e) {
    error = ConnectError.from(e);
    // We can't distinguish between headers and trailers here, so we just
    // add the metadata to both.
    //
    // But if the headers are already set, we don't need to overwrite them.
    resHeaders =
      resHeaders.length === 0
        ? convertToProtoHeaders(error.metadata)
        : resHeaders;
    resTrailers = convertToProtoHeaders(error.metadata);
  }
  return create(ClientResponseResultSchema, {
    responseHeaders: resHeaders,
    responseTrailers: resTrailers,
    payloads: payloads,
    error: convertToProtoError(error),
  });
}

async function unimplemented(
  client: ConformanceClient,
  req: ClientCompatRequest,
) {
  const msg = req.requestMessages[0];
  const unReq = anyUnpack(msg, UnimplementedRequestSchema);
  if (!unReq) {
    throw new Error("Could not unpack request message to unary request");
  }
  const reqHeader = new Headers();
  appendProtoHeaders(reqHeader, req.requestHeaders);
  let error: ConnectError | undefined = undefined;
  let resHeaders: ConformanceHeader[] = [];
  let resTrailers: ConformanceHeader[] = [];
  try {
    await client.unimplemented(unReq, {
      headers: reqHeader,
      onHeader(headers) {
        resHeaders = convertToProtoHeaders(headers);
      },
      onTrailer(trailers) {
        resTrailers = convertToProtoHeaders(trailers);
      },
    });
  } catch (e) {
    error = ConnectError.from(e);
    // We can't distinguish between headers and trailers here, so we just
    // add the metadata to both.
    //
    // But if the headers are already set, we don't need to overwrite them.
    resHeaders =
      resHeaders.length === 0
        ? convertToProtoHeaders(error.metadata)
        : resHeaders;
    resTrailers = convertToProtoHeaders(error.metadata);
  }
  return create(ClientResponseResultSchema, {
    responseHeaders: resHeaders,
    responseTrailers: resTrailers,
    error: convertToProtoError(error),
  });
}

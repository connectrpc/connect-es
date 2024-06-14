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

import { createCallbackClient, ConnectError } from "@connectrpc/connect";
import type {
  CallOptions,
  CallbackClient,
  Transport,
} from "@connectrpc/connect";
import { ClientResponseResultSchema } from "./gen/connectrpc/conformance/v1/client_compat_pb.js";
import type {
  ClientCompatRequest,
  ClientResponseResult,
} from "./gen/connectrpc/conformance/v1/client_compat_pb.js";
import {
  UnaryRequestSchema,
  ServerStreamRequestSchema,
  UnimplementedRequestSchema,
  IdempotentUnaryRequestSchema,
  ConformanceService,
} from "./gen/connectrpc/conformance/v1/service_pb.js";
import type {
  Header as ConformanceHeader,
  ConformancePayload,
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
import { create } from "@bufbuild/protobuf";
import { anyUnpack } from "@bufbuild/protobuf/wkt";

type ConformanceClient = CallbackClient<typeof ConformanceService>;

export function invokeWithCallbackClient(
  transport: Transport,
  req: ClientCompatRequest,
): Promise<ClientResponseResult> {
  const client = createCallbackClient(ConformanceService, transport);

  switch (req.method) {
    case ConformanceService.method.unary.name:
      return unary(client, req);
    case ConformanceService.method.idempotentUnary.name:
      return unary(client, req, true);
    case ConformanceService.method.serverStream.name:
      return serverStream(client, req);
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

  let call: (
    req: NonNullable<typeof uReq>,
    callback: (
      error: ConnectError | undefined,
      response: UnaryResponse | IdempotentUnaryResponse,
    ) => void,
    options?: CallOptions | undefined,
  ) => () => void = client.unary;
  if (idempotent) {
    call = client.idempotentUnary;
  }

  await wait(req.requestDelayMs);
  return new Promise<ClientResponseResult>((resolve) => {
    call(
      uReq,
      (err, uRes) => {
        if (err !== undefined) {
          error = ConnectError.from(err);
          // We can't distinguish between headers and trailers here, so we just
          // add the metadata to both.
          //
          // But if the headers are already set, we don't need to overwrite them.
          resHeaders =
            resHeaders.length === 0
              ? convertToProtoHeaders(error.metadata)
              : resHeaders;
          resTrailers = convertToProtoHeaders(error.metadata);
        } else {
          payloads.push(uRes.payload!);
        }
        resolve(
          create(ClientResponseResultSchema, {
            payloads: payloads,
            responseHeaders: resHeaders,
            responseTrailers: resTrailers,
            error: convertToProtoError(error),
          }),
        );
      },
      {
        headers: reqHeader,
        onHeader(headers) {
          resHeaders = convertToProtoHeaders(headers);
        },
        onTrailer(trailers) {
          resTrailers = convertToProtoHeaders(trailers);
        },
      },
    );
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
  let count = 0;

  await wait(req.requestDelayMs);
  return new Promise<ClientResponseResult>((resolve) => {
    const cancelFn = client.serverStream(
      uReq,
      (uResp) => {
        if (cancelTiming.afterNumResponses === 0) {
          cancelFn();
        }
        payloads.push(uResp.payload!);
        count++;
        if (count === cancelTiming.afterNumResponses) {
          cancelFn();
        }
      },
      (err) => {
        if (err !== undefined) {
          error = ConnectError.from(err);
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
        resolve(
          create(ClientResponseResultSchema, {
            responseHeaders: resHeaders,
            responseTrailers: resTrailers,
            payloads: payloads,
            error: convertToProtoError(error),
          }),
        );
      },
      {
        headers: reqHeader,
        onHeader(headers) {
          resHeaders = convertToProtoHeaders(headers);
        },
        onTrailer(trailers) {
          resTrailers = convertToProtoHeaders(trailers);
        },
      },
    );
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

  return new Promise<ClientResponseResult>((resolve) => {
    client.unimplemented(
      unReq,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err, _) => {
        if (err !== undefined) {
          error = ConnectError.from(err);
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
        resolve(
          create(ClientResponseResultSchema, {
            responseHeaders: resHeaders,
            responseTrailers: resTrailers,
            error: convertToProtoError(error),
          }),
        );
      },
      {
        headers: reqHeader,
        onHeader(headers) {
          resHeaders = convertToProtoHeaders(headers);
        },
        onTrailer(trailers) {
          resTrailers = convertToProtoHeaders(trailers);
        },
      },
    );
  });
}

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

import { createCallbackClient, ConnectError, Code } from "@connectrpc/connect";
import type { CallbackClient, Transport } from "@connectrpc/connect";
import {
  ClientCompatRequest,
  ClientResponseResult,
} from "./gen/connectrpc/conformance/v1/client_compat_pb.js";
import {
  UnaryRequest,
  Header as ConformanceHeader,
  ServerStreamRequest,
  ConformancePayload,
  UnimplementedRequest,
  IdempotentUnaryRequest,
} from "./gen/connectrpc/conformance/v1/service_pb.js";
import {
  convertToProtoError,
  convertToProtoHeaders,
  appendProtoHeaders,
  wait,
  getCancelTiming,
} from "./protocol.js";
import { ConformanceService } from "./gen/connectrpc/conformance/v1/service_connect.js";

type ConformanceClient = CallbackClient<typeof ConformanceService>;

export function invokeWithCallbackClient(
  transport: Transport,
  req: ClientCompatRequest,
): Promise<ClientResponseResult> {
  const client = createCallbackClient(ConformanceService, transport);

  switch (req.method) {
    case ConformanceService.methods.unary.name:
      return unary(client, req);
    case ConformanceService.methods.idempotentUnary.name:
      return unary(client, req, true);
    case ConformanceService.methods.serverStream.name:
      return serverStream(client, req);
    case ConformanceService.methods.unimplemented.name:
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
  const uReq = idempotent ? new IdempotentUnaryRequest() : new UnaryRequest();
  if (!msg.unpackTo(uReq)) {
    throw new Error("Could not unpack request message to unary request");
  }
  const reqHeader = new Headers();
  appendProtoHeaders(reqHeader, req.requestHeaders);
  let error: ConnectError | undefined = undefined;
  let resHeaders: ConformanceHeader[] = [];
  let resTrailers: ConformanceHeader[] = [];
  const payloads: ConformancePayload[] = [];

  let call = client.unary;
  if (idempotent) {
    call = client.idempotentUnary;
  }

  await wait(req.requestDelayMs);
  return new Promise<ClientResponseResult>((resolve) => {
    const controller = new AbortController();
    // Handles client cancellation.
    controller.signal.addEventListener("abort", () => {
      resolve(
        new ClientResponseResult({
          payloads: payloads,
          responseHeaders: resHeaders,
          responseTrailers: resTrailers,
          error: convertToProtoError(
            error ?? new ConnectError("operation aborted", Code.Canceled),
          ),
        }),
      );
    });
    const { afterCloseSendMs } = getCancelTiming(req);
    if (afterCloseSendMs >= 0) {
      wait(afterCloseSendMs)
        .then(() => controller.abort())
        .catch(() => {});
    }
    call(
      uReq,
      (err, uRes) => {
        // Callback clients swallow client triggered cancellations and never
        // call the callback. This will trigger the global error handler and fail the process.
        if (controller.signal.aborted) {
          throw new Error("Aborted requests should not trigger the callback");
        }
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
          new ClientResponseResult({
            payloads: payloads,
            responseHeaders: resHeaders,
            responseTrailers: resTrailers,
            error: convertToProtoError(error),
          }),
        );
      },
      {
        headers: reqHeader,
        signal: controller.signal,
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
  const uReq = new ServerStreamRequest();
  if (!msg.unpackTo(uReq)) {
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
    const controller = new AbortController();
    let abortCount = -1;
    controller.signal.addEventListener("abort", () => {
      abortCount = count;
    });
    client.serverStream(
      uReq,
      (uResp) => {
        payloads.push(uResp.payload!);
        count++;
        if (count === cancelTiming.afterNumResponses) {
          controller.abort();
        }
      },
      (err) => {
        // Callback clients swallow client triggered cancellations don't report
        // that as an error.
        if (
          err === undefined &&
          controller.signal.aborted &&
          abortCount == count
        ) {
          error = new ConnectError("operation aborted", Code.Canceled);
        }
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
          new ClientResponseResult({
            responseHeaders: resHeaders,
            responseTrailers: resTrailers,
            payloads: payloads,
            error: convertToProtoError(error),
          }),
        );
      },
      {
        headers: reqHeader,
        signal: controller.signal,
        onHeader(headers) {
          resHeaders = convertToProtoHeaders(headers);
        },
        onTrailer(trailers) {
          resTrailers = convertToProtoHeaders(trailers);
        },
      },
    );
    if (cancelTiming.afterCloseSendMs >= 0) {
      wait(cancelTiming.afterCloseSendMs)
        .then(() => controller.abort())
        .catch(() => {});
    }
  });
}

async function unimplemented(
  client: ConformanceClient,
  req: ClientCompatRequest,
) {
  const msg = req.requestMessages[0];
  const unReq = new UnimplementedRequest();
  if (!msg.unpackTo(unReq)) {
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
          new ClientResponseResult({
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

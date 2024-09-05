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
  ServerStreamRequest,
  UnimplementedRequest,
  IdempotentUnaryRequest,
} from "./gen/connectrpc/conformance/v1/service_pb.js";
import {
  convertToProtoError,
  convertToProtoHeaders,
  wait,
  getCancelTiming,
  getRequestHeaders,
  getSingleRequestMessage,
  setClientErrorResult,
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
  compatRequest: ClientCompatRequest,
  idempotent: boolean = false,
) {
  await wait(compatRequest.requestDelayMs);
  const result = new ClientResponseResult();
  return new Promise<ClientResponseResult>((resolve) => {
    const call = idempotent ? client.idempotentUnary : client.unary;
    let clientCancelled = false;
    const clientCancelFn = call(
      getSingleRequestMessage(
        compatRequest,
        idempotent ? IdempotentUnaryRequest : UnaryRequest,
      ),
      (err, response) => {
        // Callback clients swallow client triggered cancellations and never
        // call the callback. This will trigger the global error handler and
        // fail the process.
        if (clientCancelled) {
          throw new Error("Aborted requests should not trigger the callback");
        }
        if (err !== undefined) {
          setClientErrorResult(result, err);
        } else {
          result.payloads.push(response.payload!);
        }
        resolve(result);
      },
      {
        headers: getRequestHeaders(compatRequest),
        onHeader(headers) {
          result.responseHeaders = convertToProtoHeaders(headers);
        },
        onTrailer(trailers) {
          result.responseTrailers = convertToProtoHeaders(trailers);
        },
      },
    );
    const { afterCloseSendMs } = getCancelTiming(compatRequest);
    if (afterCloseSendMs >= 0) {
      setTimeout(() => {
        clientCancelled = true;
        clientCancelFn();
        // Callback clients swallow client triggered cancellations and never
        // call the callback. We report a fake error to the test runner to let
        // it know that the call was cancelled.
        result.error = convertToProtoError(
          new ConnectError("client cancelled", Code.Canceled),
        );
        resolve(result);
      }, afterCloseSendMs);
    }
  });
}

async function serverStream(
  client: ConformanceClient,
  compatRequest: ClientCompatRequest,
) {
  const cancelTiming = getCancelTiming(compatRequest);
  await wait(compatRequest.requestDelayMs);
  const result = new ClientResponseResult();
  return new Promise<ClientResponseResult>((resolve) => {
    let clientCancelled = false;
    const clientCancelFn = client.serverStream(
      getSingleRequestMessage(compatRequest, ServerStreamRequest),
      (response) => {
        result.payloads.push(response.payload!);
        if (result.payloads.length === cancelTiming.afterNumResponses) {
          clientCancelled = true;
          clientCancelFn();
        }
      },
      (err) => {
        // Callback clients call the closeCallback without an error for client
        // triggered cancellation. We report a fake error to the test runner to let
        // it know that the call was cancelled.
        if (clientCancelled) {
          if (err !== undefined) {
            throw new Error(
              "Aborted requests should not trigger the closeCallback with an error",
            );
          }
          result.error = convertToProtoError(
            new ConnectError("client cancelled", Code.Canceled),
          );
        }
        if (err !== undefined) {
          setClientErrorResult(result, err);
        }
        resolve(result);
      },
      {
        headers: getRequestHeaders(compatRequest),
        onHeader(headers) {
          result.responseHeaders = convertToProtoHeaders(headers);
        },
        onTrailer(trailers) {
          result.responseTrailers = convertToProtoHeaders(trailers);
        },
      },
    );
    if (cancelTiming.afterCloseSendMs >= 0) {
      setTimeout(() => {
        clientCancelled = true;
        clientCancelFn();
      }, cancelTiming.afterCloseSendMs);
    }
  });
}

async function unimplemented(
  client: ConformanceClient,
  compatRequest: ClientCompatRequest,
) {
  const result = new ClientResponseResult();
  return new Promise<ClientResponseResult>((resolve) => {
    client.unimplemented(
      getSingleRequestMessage(compatRequest, UnimplementedRequest),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err, _) => {
        if (err !== undefined) {
          setClientErrorResult(result, err);
        }
        resolve(result);
      },
      {
        headers: getRequestHeaders(compatRequest),
        onHeader(headers) {
          result.responseHeaders = convertToProtoHeaders(headers);
        },
        onTrailer(trailers) {
          result.responseTrailers = convertToProtoHeaders(trailers);
        },
      },
    );
  });
}

// Copyright 2021-2023 Buf Technologies, Inc.
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

import {
  Code,
  ConnectError,
  decodeBinaryHeader,
  encodeBinaryHeader,
  ServiceImpl,
} from "@bufbuild/connect-node";
import type { TestService } from "../gen/grpc/testing/test_connect.js";
import type { StreamingOutputCallRequest } from "../gen/grpc/testing/messages_pb.js";
import { interop } from "./interop.js";

export const testService: ServiceImpl<typeof TestService> = {
  emptyCall() {
    return {};
  },

  unaryCall(request, context) {
    if (request.responseStatus?.code !== undefined) {
      throw new ConnectError(
        request.responseStatus.message,
        request.responseStatus.code
      );
    }
    echoMetadata(
      context.requestHeader,
      context.responseHeader,
      context.responseTrailer
    );
    return {
      payload: interop.makeServerPayload(
        request.responseType,
        request.responseSize
      ),
    };
  },

  failUnaryCall() {
    throw new ConnectError(interop.nonASCIIErrMsg, Code.ResourceExhausted, {}, [
      interop.errorDetail,
    ]);
  },

  cacheableUnaryCall(/*request*/) {
    throw new ConnectError("TODO", Code.Unimplemented);
  },

  async *streamingOutputCall(request, context) {
    echoMetadata(
      context.requestHeader,
      context.responseHeader,
      context.responseTrailer
    );
    for (const param of request.responseParameters) {
      if (param.intervalUs > 0) {
        await new Promise<void>((resolve) => {
          setTimeout(resolve, param.intervalUs / 1000);
        });
      }
      yield {
        payload: interop.makeServerPayload(request.responseType, param.size),
      };
    }
  },

  // eslint-disable-next-line @typescript-eslint/require-await,require-yield
  async *failStreamingOutputCall() {
    throw new ConnectError(interop.nonASCIIErrMsg, Code.ResourceExhausted, {}, [
      interop.errorDetail,
    ]);
  },

  async streamingInputCall(requests) {
    let total = 0;
    for await (const req of requests) {
      total += req.payload?.body.length ?? 0;
    }
    return {
      aggregatedPayloadSize: total,
    };
  },

  async *fullDuplexCall(requests, context) {
    echoMetadata(
      context.requestHeader,
      context.responseHeader,
      context.responseTrailer
    );
    for await (const req of requests) {
      if (req.responseStatus?.code !== undefined) {
        throw new ConnectError(
          req.responseStatus.message,
          req.responseStatus.code
        );
      }
      for (const param of req.responseParameters) {
        if (param.intervalUs > 0) {
          await new Promise<void>((resolve) => {
            setTimeout(resolve, param.intervalUs / 1000);
          });
        }
        yield {
          payload: interop.makeServerPayload(req.responseType, param.size),
        };
      }
    }
  },

  async *halfDuplexCall(requests) {
    const buffer: StreamingOutputCallRequest[] = [];
    for await (const req of requests) {
      buffer.push(req);
    }
    for await (const req of buffer) {
      if (req.responseStatus?.code !== undefined) {
        throw new ConnectError(
          req.responseStatus.message,
          req.responseStatus.code
        );
      }
      for (const param of req.responseParameters) {
        if (param.intervalUs > 0) {
          await new Promise<void>((resolve) => {
            setTimeout(resolve, param.intervalUs / 1000);
          });
        }
        yield {
          payload: interop.makeServerPayload(req.responseType, param.size),
        };
      }
    }
  },

  unimplementedCall(/*request*/) {
    throw new ConnectError(
      "grpc.testing.TestService.UnimplementedCall is not implemented",
      Code.Unimplemented
    );
  },

  // eslint-disable-next-line @typescript-eslint/require-await,require-yield
  async *unimplementedStreamingOutputCall(/*requests*/) {
    throw new ConnectError(
      "grpc.testing.TestService.UnimplementedStreamingOutputCall is not implemented",
      Code.Unimplemented
    );
  },
};

function echoMetadata(
  requestHeader: Headers,
  responseHeader: Headers,
  responseTrailer: Headers
): void {
  const leadingMetadata = requestHeader.get(interop.leadingMetadataKey);
  if (leadingMetadata !== null) {
    responseHeader.set(interop.leadingMetadataKey, leadingMetadata);
  }
  const trailingMetadata = requestHeader.get(interop.trailingMetadataKey);
  if (trailingMetadata !== null) {
    const decodedTrailingMetadata = decodeBinaryHeader(trailingMetadata);
    responseTrailer.set(
      interop.trailingMetadataKey,
      encodeBinaryHeader(decodedTrailingMetadata)
    );
  }
}

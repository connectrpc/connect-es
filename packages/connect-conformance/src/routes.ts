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

import type { ConnectRouter, HandlerContext } from "@connectrpc/connect";
import { create } from "@bufbuild/protobuf";
import {
  BidiStreamRequestSchema,
  ClientStreamRequestSchema,
  ConformancePayloadSchema,
  ConformancePayload_RequestInfoSchema,
  ConformanceService,
  IdempotentUnaryRequestSchema,
  ServerStreamRequestSchema,
  UnaryRequestSchema,
} from "./gen/connectrpc/conformance/v1/service_pb.js";
import type {
  ConformancePayload_RequestInfo,
  UnaryResponseDefinition,
  StreamResponseDefinition,
} from "./gen/connectrpc/conformance/v1/service_pb.js";
import {
  appendProtoHeaders,
  connectErrorFromProto,
  convertToProtoHeaders,
  wait,
} from "./protocol.js";
import { anyPack } from "@bufbuild/protobuf/wkt";
import type { Any } from "@bufbuild/protobuf/wkt";

function createRequestInfo(
  ctx: HandlerContext,
  reqs: Any[],
): ConformancePayload_RequestInfo {
  const timeoutMs = ctx.timeoutMs();
  return create(ConformancePayload_RequestInfoSchema, {
    requestHeaders: convertToProtoHeaders(ctx.requestHeader),
    requests: reqs,
    timeoutMs: timeoutMs !== undefined ? BigInt(timeoutMs) : undefined,
  });
}

async function handleUnaryResponse(
  def: UnaryResponseDefinition | undefined,
  reqs: Any[],
  ctx: HandlerContext,
) {
  appendProtoHeaders(ctx.responseHeader, def?.responseHeaders ?? []);
  appendProtoHeaders(ctx.responseTrailer, def?.responseTrailers ?? []);
  const reqInfo = createRequestInfo(ctx, reqs);
  if (def?.response.case === "error") {
    def.response.value.details.push(
      anyPack(ConformancePayload_RequestInfoSchema, reqInfo),
    );
    throw connectErrorFromProto(def.response.value);
  }
  if (def?.responseDelayMs !== undefined) {
    await wait(def.responseDelayMs);
  }
  return {
    payload: create(ConformancePayloadSchema, {
      requestInfo: createRequestInfo(ctx, reqs),
      data: def?.response.value,
    }),
  };
}

export default ({ service }: ConnectRouter) => {
  service(ConformanceService, {
    unary(req, ctx) {
      return handleUnaryResponse(
        req.responseDefinition,
        [anyPack(UnaryRequestSchema, req)],
        ctx,
      );
    },
    idempotentUnary(req, ctx) {
      return handleUnaryResponse(
        req.responseDefinition,
        [anyPack(IdempotentUnaryRequestSchema, req)],
        ctx,
      );
    },
    async clientStream(reqIt, ctx) {
      let def: UnaryResponseDefinition | undefined;
      const reqs: Any[] = [];
      for await (const req of reqIt) {
        if (def === undefined) {
          def = req.responseDefinition;
        }
        reqs.push(anyPack(ClientStreamRequestSchema, req));
      }
      return handleUnaryResponse(def, reqs, ctx);
    },
    async *serverStream(req, ctx) {
      const def = req.responseDefinition;
      appendProtoHeaders(ctx.responseHeader, def?.responseHeaders ?? []);
      appendProtoHeaders(ctx.responseTrailer, def?.responseTrailers ?? []);
      const anyReq = anyPack(ServerStreamRequestSchema, req);
      let reqInfo: ConformancePayload_RequestInfo | undefined =
        createRequestInfo(ctx, [anyReq]);
      for (const res of def?.responseData ?? []) {
        await wait(def!.responseDelayMs);
        yield {
          payload: create(ConformancePayloadSchema, {
            requestInfo: reqInfo,
            data: res,
          }),
        };
        // Only echo back the request info in the first response
        reqInfo = undefined;
      }
      if (def?.error !== undefined) {
        if (def.responseData.length === 0) {
          def.error.details.push(
            anyPack(
              ConformancePayload_RequestInfoSchema,
              createRequestInfo(ctx, [anyReq]),
            ),
          );
        }
        throw connectErrorFromProto(def.error);
      }
    },
    async *bidiStream(reqIt, ctx) {
      let def: StreamResponseDefinition | undefined;
      let fullDuplex = false;
      let resNum = 0;
      let reqs: Any[] = [];
      for await (const req of reqIt) {
        if (def === undefined) {
          def = req.responseDefinition;
          appendProtoHeaders(ctx.responseHeader, def?.responseHeaders ?? []);
          appendProtoHeaders(ctx.responseTrailer, def?.responseTrailers ?? []);
          fullDuplex = req.fullDuplex;
        }
        reqs.push(anyPack(BidiStreamRequestSchema, req));
        if (!fullDuplex) {
          continue;
        }
        // fullDuplex, so send one of the desired responses each time we get a message on the stream
        if (def === undefined || resNum >= def.responseData.length) {
          break;
        }
        await wait(def.responseDelayMs);
        yield {
          payload: create(ConformancePayloadSchema, {
            requestInfo: createRequestInfo(ctx, [
              anyPack(BidiStreamRequestSchema, req),
            ]),
            data: def.responseData[resNum],
          }),
        };
        resNum++;
        reqs = [];
      }
      // If we still have responses left to send, flush them now. This accommodates
      // both scenarios of half duplex (we haven't sent any responses yet) or full duplex
      // where the requested responses are greater than the total requests.
      const reqInfo = createRequestInfo(ctx, reqs);
      for (; resNum < (def?.responseData.length ?? 0); resNum++) {
        await wait(def?.responseDelayMs ?? 0);
        yield {
          payload: create(ConformancePayloadSchema, {
            requestInfo: resNum === 0 ? reqInfo : undefined,
            data: def?.responseData[resNum],
          }),
        };
      }
      if (def?.error !== undefined) {
        if (def.responseData.length === 0) {
          def.error.details.push(
            anyPack(ConformancePayload_RequestInfoSchema, reqInfo),
          );
        }
        throw connectErrorFromProto(def.error);
      }
    },
  });
};

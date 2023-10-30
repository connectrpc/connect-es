// Copyright 2021-2023 The Connect Authors
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

import { Code, ConnectError } from "@connectrpc/connect";
import type { ConnectRouter, HandlerContext } from "@connectrpc/connect";
import { ConformanceService } from "./gen/connectrpc/conformance/v1alpha1/service_connect.js";
import { Any } from "@bufbuild/protobuf";
import {
  ConformancePayload,
  ConformancePayload_RequestInfo,
} from "./gen/connectrpc/conformance/v1alpha1/service_pb.js";
import type {
  UnaryResponseDefinition,
  StreamResponseDefinition,
} from "./gen/connectrpc/conformance/v1alpha1/service_pb.js";
import {
  appendHeadersFromProtoHeaders,
  connectErrorFromProto,
  protoHeadersFromHeaders,
} from "./protocol.js";

function createRequestInfo(
  header: Headers,
  reqs: Any[],
): ConformancePayload_RequestInfo {
  return new ConformancePayload_RequestInfo({
    requestHeaders: protoHeadersFromHeaders(header),
    requests: reqs,
  });
}

function handleUnaryResponse(
  def: UnaryResponseDefinition | undefined,
  reqs: Any[],
  ctx: HandlerContext,
) {
  appendHeadersFromProtoHeaders(ctx.responseHeader, def?.responseHeaders ?? []);
  appendHeadersFromProtoHeaders(
    ctx.responseTrailer,
    def?.responseTrailers ?? [],
  );
  switch (def?.response.case) {
    case "error":
      throw connectErrorFromProto(def.response.value);
    case "responseData":
      return {
        payload: new ConformancePayload({
          requestInfo: createRequestInfo(ctx.requestHeader, reqs),
          data: def.response.value,
        }),
      };
    default:
      throw new ConnectError(
        `provided UnaryRequest.Response has an unexpected type ${def?.response.case}`,
        Code.InvalidArgument,
      );
  }
}

export default ({ service }: ConnectRouter) => {
  service(ConformanceService, {
    unary(req, ctx) {
      return handleUnaryResponse(req.responseDefinition, [Any.pack(req)], ctx);
    },
    async clientStream(reqIt, ctx) {
      let def: UnaryResponseDefinition | undefined;
      const reqs: Any[] = [];
      for await (const req of reqIt) {
        if (def === undefined) {
          def = req.responseDefinition;
        }
        reqs.push(Any.pack(req));
      }
      return handleUnaryResponse(def, reqs, ctx);
    },
    async *serverStream(req, ctx) {
      const def = req.responseDefinition;
      appendHeadersFromProtoHeaders(
        ctx.responseHeader,
        def?.responseHeaders ?? [],
      );
      appendHeadersFromProtoHeaders(
        ctx.responseTrailer,
        def?.responseTrailers ?? [],
      );
      const anyReq = Any.pack(req);
      let reqInfo: ConformancePayload_RequestInfo | undefined =
        createRequestInfo(ctx.requestHeader, [anyReq]);
      for (const res of def?.responseData ?? []) {
        await wait(def?.responseDelayMs ?? 0);
        yield {
          payload: new ConformancePayload({
            requestInfo: reqInfo,
            data: res,
          }),
        };
        reqInfo = undefined;
      }
      if (def?.error !== undefined) {
        throw connectErrorFromProto(def.error);
      }
    },
    async *bidiStream(reqIt, ctx) {
      let def: StreamResponseDefinition | undefined;
      let fullDuplex = false;
      let resNum = 0;
      const reqs: Any[] = [];
      for await (const req of reqIt) {
        if (def === undefined) {
          def = req.responseDefinition;
          appendHeadersFromProtoHeaders(
            ctx.responseHeader,
            def?.responseHeaders ?? [],
          );
          appendHeadersFromProtoHeaders(
            ctx.responseTrailer,
            def?.responseTrailers ?? [],
          );
          fullDuplex = req.fullDuplex;
        }
        reqs.push(Any.pack(req));
        if (!fullDuplex) {
          continue;
        }
        if (resNum >= (def?.responseData.length ?? 0)) {
          throw new ConnectError(
            "received more requests than desired responses on a full duplex stream",
            Code.Aborted,
          );
        }
        await wait(def?.responseDelayMs ?? 0);
        yield {
          payload: new ConformancePayload({
            requestInfo: createRequestInfo(ctx.requestHeader, [Any.pack(req)]),
            data: def?.responseData[resNum],
          }),
        };
        resNum++;
        reqs.splice(0, reqs.length);
      }
      const reqInfo = createRequestInfo(ctx.requestHeader, reqs);
      for (; resNum < (def?.responseData.length ?? 0); resNum++) {
        await wait(def?.responseDelayMs ?? 0);
        yield {
          payload: new ConformancePayload({
            requestInfo: reqInfo,
            data: def?.responseData[resNum],
          }),
        };
      }
      if (def?.error !== undefined) {
        throw connectErrorFromProto(def.error);
      }
    },
  });
};

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

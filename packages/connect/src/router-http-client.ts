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

import type { ConnectRouter } from "./router.js";
import type { UniversalClientFn } from "./protocol/universal.js";
import type { UniversalHandler } from "./protocol/universal-handler.js";
import { ConnectError } from "./connect-error.js";
import { createAsyncIterable } from "./protocol/async-iterable.js";
import { Code } from "./code.js";

/**
 * An in-memory {@link UniversalClientFn | http client} that can be used to route requests to a {@link ConnectRouter}
 * by passing network calls. Useful for testing and calling in-process services.
 *
 * @param router The {@link ConnectRouter} to use.
 * @returns The {@link UniversalClientFn} that can be passed to `createTransport` functions.
 */
export function createRouterHttpClient(
  router: ConnectRouter
): UniversalClientFn {
  const handlerMap = new Map<string, UniversalHandler>();
  for (const handler of router.handlers) {
    handlerMap.set(handler.requestPath, handler);
  }
  return async (uClientReq) => {
    const reqUrl = new URL(uClientReq.url);
    const handler = handlerMap.get(reqUrl.pathname);
    if (!handler) {
      throw new ConnectError(
        `RouterHttpClient: no handler registered for ${reqUrl.pathname}`,
        Code.Unimplemented
      );
    }
    const uServerRes = await handler({
      body: uClientReq.body,
      httpVersion: "1.1",
      method: uClientReq.method,
      url: reqUrl,
      header: uClientReq.header,
    });
    if (uServerRes.body === undefined) {
      throw new ConnectError(
        `RouterHttpClient: missing body in handler response for ${reqUrl.pathname}`,
        Code.Internal
      );
    }
    let body = uServerRes.body;
    if (body instanceof Uint8Array) {
      body = createAsyncIterable([body]);
    }
    return {
      body: body,
      header: new Headers(uServerRes.header),
      status: uServerRes.status,
      trailer: new Headers(uServerRes.trailer),
    };
  };
}

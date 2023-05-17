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

import { createConnectRouter } from "@bufbuild/connect";
import { createFetchHandler } from "@bufbuild/connect/protocol";
import routes from "./test-routes.js";

const router = createConnectRouter({
  grpc: false,
});
routes(router);

const handlers = new Map<string, ReturnType<typeof createFetchHandler>>(
  router.handlers.map((h) => [h.requestPath, createFetchHandler(h)])
);

export function handleFetchEvent(event: FetchEvent) {
  const url = new URL(event.request.url);
  const handler = handlers.get(url.pathname);
  if (handler) {
    return event.respondWith(handler(event.request));
  }
  return event.respondWith(new Response(null, { status: 404 }));
}

// @ts-expect-error TS2769 -- the DOM global addEventListener is unaware of FetchEvent
addEventListener("fetch", handleFetchEvent);

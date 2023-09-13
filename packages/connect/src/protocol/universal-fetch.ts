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

import type {
  UniversalClientFn,
  UniversalClientRequest,
  UniversalClientResponse,
  UniversalHandlerFn,
  UniversalServerRequest,
  UniversalServerResponse,
} from "./universal.js";

/**
 * Create a universal client function, a minimal abstraction of an HTTP client,
 * using the given fetch() implementation.
 */
export function createFetchClient(fetchFn: typeof fetch): UniversalClientFn {
  return async function fetchClient(
    request: UniversalClientRequest,
  ): Promise<UniversalClientResponse> {
    const res: Response = await fetchFn(universalClientRequestToFetch(request));
    return universalClientResponseFromFetch(res);
  };
}

/**
 * FetchHandlerFn is a minimal abstraction of an HTTP handler with the fetch API
 * Request and Response types.
 */
type FetchHandlerFn = (req: Request) => Promise<Response>;

interface FetchHandlerOptions {
  httpVersion?: string;
}

/**
 * Convert a universal handler function to a fetch handler.
 */
export function createFetchHandler(
  uHandler: UniversalHandlerFn,
  options?: FetchHandlerOptions,
): FetchHandlerFn {
  async function handleFetch(req: Request) {
    const uReq = universalServerRequestFromFetch(req, options ?? {});
    const uRes = await uHandler(uReq);
    return universalServerResponseToFetch(uRes);
  }

  return Object.assign(handleFetch, uHandler);
}

function universalClientRequestToFetch(req: UniversalClientRequest): Request {
  const body =
    req.body === undefined ? null : iterableToReadableStream(req.body);
  return new Request(req.url, {
    method: req.method,
    headers: req.header,
    signal: req.signal,
    body,
  });
}

function universalClientResponseFromFetch(
  res: Response,
): UniversalClientResponse {
  return {
    status: res.status,
    header: res.headers,
    body: iterableFromReadableStream(res.body),
    trailer: new Headers(),
  };
}

function universalServerRequestFromFetch(
  req: Request,
  options: FetchHandlerOptions,
): UniversalServerRequest {
  return {
    httpVersion: options.httpVersion ?? "",
    method: req.method,
    url: req.url,
    header: req.headers,
    body: iterableFromReadableStream(req.body),
    signal: req.signal,
  };
}

function universalServerResponseToFetch(
  res: UniversalServerResponse,
): Response {
  let body: ReadableStream<Uint8Array> | null = null;
  if (res.body !== undefined) {
    body = iterableToReadableStream(res.body);
  }
  return new Response(body, {
    status: res.status,
    headers: res.header,
  });
}

function iterableToReadableStream(
  iterable: AsyncIterable<Uint8Array>,
): ReadableStream<Uint8Array> {
  const it = iterable[Symbol.asyncIterator]();
  return new ReadableStream<Uint8Array>(<UnderlyingSource<Uint8Array>>{
    async pull(controller: ReadableByteStreamController) {
      const r = await it.next();
      if (r.done === true) {
        controller.close();
        return;
      }
      controller.enqueue(r.value);
    },
    async cancel(reason) {
      if (it.throw) {
        try {
          await it.throw(reason);
        } catch {
          // iterator.throw on a generator function rethrows unless the
          // body catches and swallows.
        }
      }
    },
  });
}

function iterableFromReadableStream(
  body: ReadableStream<Uint8Array> | null,
): AsyncIterable<Uint8Array> {
  return {
    [Symbol.asyncIterator](): AsyncIterator<Uint8Array> {
      const reader = body?.getReader();
      return {
        async next() {
          if (reader !== undefined) {
            const r = await reader.read();
            if (r.done) {
              return {
                done: true,
                value: undefined,
              };
            }
            return r;
          }
          return {
            done: true,
            value: undefined,
          };
        },
        async throw(e: unknown) {
          if (reader !== undefined) {
            await reader.cancel(e);
          }
          return {
            done: true,
            value: undefined,
          };
        },
      };
    },
  };
}

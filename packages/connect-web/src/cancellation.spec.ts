// Copyright 2021-2026 The Connect Authors
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

import { create } from "@bufbuild/protobuf";
import { ConnectError, Code, type Transport } from "@connectrpc/connect";
import { createAsyncIterable } from "@connectrpc/connect/protocol";
import {
  ConformanceService,
  ServerStreamRequestSchema,
  UnaryRequestSchema,
} from "@connectrpc/connect-conformance";
import { createGrpcWebTransport } from "./grpc-web-transport.js";
import { createConnectTransport } from "./connect-transport.js";

// Regression suite for client-side AbortController cancellation.
//
// Invariant under test:
//
//   When the caller's AbortSignal aborts during an in-flight call, the
//   resulting error is a ConnectError with code === Code.Canceled,
//   regardless of:
//     - which transport (gRPC-web or Connect)
//     - whether unary or server-streaming
//     - whether abort fires mid-call or before the call begins
//     - what reason (if any) the caller passed to abort()
//
// The four nested loops below generate the cross product of those axes.
// Every cell asserts the same invariant; nothing about the assertion
// shape varies between cells, so there's no per-scenario type or runner
// configuration object - just plain inline data at each level.

const baseUrl = "https://example.com";

/**
 * Build a fetch that returns a Response whose body emits one valid
 * server-streaming envelope, then rejects the next read with a generic
 * Error once the request signal aborts. This mimics what platform fetch
 * implementations do when the underlying connection is torn down by the
 * AbortController.
 *
 * The body's rejection shape is deliberately a plain Error (not a
 * DOMException with name "AbortError"): the fix consults the signal's
 * reason rather than the body's rejection, so a generic Error here also
 * acts as a regression guard - if the fix were ever reverted to consult
 * the body's rejection, a name-based fallback would not match and the
 * tests would fail loudly.
 *
 * The pre-loaded envelope lets the streaming consumer receive a first
 * message and trigger the abort from inside its for-await loop. For unary
 * and pre-aborted scenarios the envelope is never observed: the unary path
 * aborts before reading any body bytes, and pre-aborted streams discard
 * queued chunks per the WHATWG Streams spec.
 */
function abortableFetch(opts: { contentType: string }): typeof fetch {
  return (_url, init) => {
    const signal = init?.signal as AbortSignal;
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        // The minimum-valid envelope: flag=0 (regular message) + length=0
        // (no payload). Both gRPC-web and Connect protocols accept it as a
        // single empty server-streaming message.
        controller.enqueue(new Uint8Array([0, 0, 0, 0, 0]));
        const onAbort = () => controller.error(new Error("body aborted"));
        if (signal.aborted) {
          onAbort();
        } else {
          signal.addEventListener("abort", onAbort);
        }
      },
    });
    return Promise.resolve(
      new Response(body, {
        status: 200,
        headers: { "Content-Type": opts.contentType },
      }),
    );
  };
}

/** Assert a thrown value is a ConnectError with code === Code.Canceled. */
function expectCanceled(caught: unknown) {
  expect(caught).toBeInstanceOf(ConnectError);
  expect((caught as ConnectError).code).toBe(Code.Canceled);
}

/**
 * Drive a streaming call. `triggerAbort` is invoked after the first message
 * is received (or, if `preAborted` is true, the signal is already aborted
 * when the call starts).
 */
async function runStreaming(
  transport: Transport,
  signal: AbortSignal,
  triggerAbort: () => void,
  preAborted: boolean,
): Promise<unknown> {
  try {
    const res = await transport.stream(
      ConformanceService.method.serverStream,
      signal,
      undefined,
      undefined,
      createAsyncIterable([create(ServerStreamRequestSchema)]),
    );
    for await (const _ of res.message) {
      if (!preAborted) triggerAbort();
    }
  } catch (e) {
    return e;
  }
  return undefined;
}

/**
 * Drive a unary call. `triggerAbort` runs on the next microtask so that
 * the call begins reading the body before cancellation fires.
 */
async function runUnary(
  transport: Transport,
  signal: AbortSignal,
  triggerAbort: () => void,
  preAborted: boolean,
): Promise<unknown> {
  if (!preAborted) {
    queueMicrotask(triggerAbort);
  }
  try {
    await transport.unary(
      ConformanceService.method.unary,
      signal,
      undefined,
      undefined,
      create(UnaryRequestSchema),
    );
  } catch (e) {
    return e;
  }
  return undefined;
}

describe("AbortController cancellation", () => {
  const transports = [
    {
      label: "grpc",
      contentType: {
        unary: "application/grpc-web+proto",
        streaming: "application/grpc-web+proto",
      },
      build: (fetch: typeof globalThis.fetch) =>
        createGrpcWebTransport({ baseUrl, fetch }),
    },
    {
      label: "connect",
      contentType: {
        unary: "application/proto",
        streaming: "application/connect+proto",
      },
      build: (fetch: typeof globalThis.fetch) =>
        createConnectTransport({ baseUrl, useBinaryFormat: true, fetch }),
    },
  ];
  for (const transportSpec of transports) {
    describe(transportSpec.label, () => {
      const reasons = [
        {
          label: "default abort",
          apply: (c: AbortController) => c.abort(),
        },
        {
          label: "caller-supplied abort reason",
          apply: (c: AbortController) =>
            c.abort(new Error("caller-supplied abort reason")),
        },
      ];
      for (const reason of reasons) {
        describe(reason.label, () => {
          const timings = [
            { label: "aborted during the call", preAborted: false },
            { label: "aborted before the call", preAborted: true },
          ];
          for (const timing of timings) {
            describe(timing.label, () => {
              const kinds = [
                {
                  label: "server-streaming",
                  contentType: transportSpec.contentType.streaming,
                  run: runStreaming,
                },
                {
                  label: "unary",
                  contentType: transportSpec.contentType.unary,
                  run: runUnary,
                },
              ];
              for (const kind of kinds) {
                it(kind.label, async () => {
                  const controller = new AbortController();
                  if (timing.preAborted) {
                    reason.apply(controller);
                  }
                  const transport = transportSpec.build(
                    abortableFetch({ contentType: kind.contentType }),
                  );
                  expectCanceled(
                    await kind.run(
                      transport,
                      controller.signal,
                      () => reason.apply(controller),
                      timing.preAborted,
                    ),
                  );
                });
              }
            });
          }
        });
      }
    });
  }
});

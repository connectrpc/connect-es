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

import * as http2 from "http2";
import * as http from "http";
import { ConnectError } from "@bufbuild/connect";
import { createAsyncIterable } from "@bufbuild/connect/protocol";
import { createNodeHttpClient } from "./node-universal-client.js";
import { useNodeServer } from "./use-node-server-helper.spec.js";

// Polyfill the Headers API for Node versions < 18
import "./node-headers-polyfill.js";

describe("node http/2 client closing with RST_STREAM with code CANCEL", function () {
  let serverReceivedRstCode: number | undefined;
  const server = useNodeServer(() =>
    http2.createServer().on("stream", (stream) => {
      stream.on("close", () => (serverReceivedRstCode = stream.rstCode));
    })
  );
  it("should send RST_STREAM frame to the server", async function () {
    return new Promise<void>((resolve) => {
      http2.connect(server.getUrl(), (session: http2.ClientHttp2Session) => {
        const stream = session.request(
          {
            ":method": "POST",
            ":path": "/",
          },
          {}
        );
        setTimeout(() => {
          stream.close(http2.constants.NGHTTP2_CANCEL, () => {
            // We are seeing a race condition in Node v16.20.0, where closing
            // the session right after closing a stream with an RST code
            // _sometimes_ sends an INTERNAL_ERROR code.
            // Simply delaying the session close until the next tick like
            // we do here seems to work around the issue.
            // We do _not_ guard against this case in the universal client,
            // since we were not able to reproduce the issue there.
            setTimeout(() => session.close(resolve), 0);
          });
        }, 0);
      });
    });

    while (serverReceivedRstCode === undefined) {
      // wait for the server to see the reset code
      await new Promise((resolve) => setTimeout(resolve, 1));
    }
    expect(serverReceivedRstCode).toBe(http2.constants.NGHTTP2_CANCEL);
  });
});

describe("universal node http client", function () {
  describe("against an unresolvable host", function () {
    for (const httpVersion of ["2", "1.1"] as const) {
      describe(`over http ${httpVersion}`, function () {
        it("should raise Code.Unavailable", async function () {
          const client = createNodeHttpClient({
            httpVersion,
            baseUrl: "https://unresolvable-host.some.domain",
            keepSessionAlive: false,
          });
          try {
            await client({
              url: "https://unresolvable-host.some.domain",
              method: "POST",
              header: new Headers(),
              body: createAsyncIterable([]),
            });
          } catch (e) {
            expect(ConnectError.from(e).message).toBe(
              "[unavailable] getaddrinfo ENOTFOUND unresolvable-host.some.domain"
            );
          }
        });
      });
    }
  });

  describe("against a server that closes immediately", function () {
    describe("over http/2", function () {
      let serverReceivedRequest = false;
      const server = useNodeServer(() =>
        http2.createServer((request, response) => {
          serverReceivedRequest = true;
          response.stream.close(http2.constants.NGHTTP2_CANCEL);
        })
      );
      it("should reject the response promise with Code.Canceled", async function () {
        const client = createNodeHttpClient({
          httpVersion: "2",
          baseUrl: server.getUrl(),
        });
        try {
          await client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
            body: createAsyncIterable([]),
          });
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[canceled] http/2 stream closed with RST code CANCEL (0x8)"
          );
        }
        expect(serverReceivedRequest).toBeTrue();
      });
    });
    describe("over http/1.1", function () {
      let serverReceivedRequest = false;
      const server = useNodeServer(() =>
        http.createServer((req, res) => {
          serverReceivedRequest = true;
          res.destroy();
        })
      );
      it("should reject the response promise", async function () {
        const client = createNodeHttpClient({
          httpVersion: "1.1",
        });
        try {
          await client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
            body: createAsyncIterable([]),
          });
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe("[aborted] socket hang up");
        }
        expect(serverReceivedRequest).toBeTrue();
      });
    });
  });

  describe("against a server that closes before the first response byte", function () {
    describe("over http/2", function () {
      const server = useNodeServer(() =>
        http2.createServer((req, res) => {
          res.writeHead(200);
          // Calling close in the same tick as writeHead appears to prevent
          // headers from being sent. The client response promise will reject,
          // instead of the response body.
          setTimeout(() => res.stream.close(http2.constants.NGHTTP2_CANCEL), 0);
        })
      );
      it("should reject the response promise with Code.Canceled", async function () {
        const client = createNodeHttpClient({
          httpVersion: "2",
          baseUrl: server.getUrl(),
        });
        const res = await client({
          url: server.getUrl(),
          method: "POST",
          header: new Headers(),
          body: createAsyncIterable([]),
        });
        try {
          for await (const chunk of res.body) {
            expect(chunk)
              .withContext("response body iterable should be empty")
              .toBeUndefined();
          }
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[canceled] http/2 stream closed with RST code CANCEL (0x8)"
          );
        }
      });
    });
    describe("over http/1.1", function () {
      const server = useNodeServer(() =>
        http.createServer((req, res) => {
          res.writeHead(200);
          res.flushHeaders();
          res.destroy();
        })
      );
      it("should reject the response promise", async function () {
        const client = createNodeHttpClient({
          httpVersion: "1.1",
        });
        const res = await client({
          url: server.getUrl(),
          method: "POST",
          header: new Headers(),
          body: createAsyncIterable([]),
        });
        try {
          for await (const chunk of res.body) {
            expect(chunk)
              .withContext("response body iterable should be empty")
              .toBeUndefined();
          }
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe("[aborted] aborted");
        }
      });
    });
  });

  describe("against a server that closes mid request", function () {
    describe("over http/2", function () {
      let serverReceivedBytes = 0;
      const server = useNodeServer(() =>
        http2.createServer((req, res) => {
          void (async () => {
            for await (const chunk of req) {
              serverReceivedBytes += (chunk as Uint8Array).byteLength;
              res.stream.close(http2.constants.NGHTTP2_CANCEL);
              break;
            }
          })();
        })
      );
      it("should reject the response promise with Code.Canceled", async function () {
        const client = createNodeHttpClient({
          httpVersion: "2",
          baseUrl: server.getUrl(),
        });

        async function* body() {
          yield new Uint8Array(32);
          await new Promise<void>(() => {
            // never resolves
          });
        }

        try {
          await client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
            body: body(),
          });
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[canceled] http/2 stream closed with RST code CANCEL (0x8)"
          );
        }
        expect(serverReceivedBytes).toBe(32);
      });
    });
    describe("over http/1.1", function () {
      let serverReceivedBytes = 0;
      const server = useNodeServer(() =>
        http.createServer((req, res) => {
          void (async () => {
            for await (const chunk of req) {
              serverReceivedBytes += (chunk as Uint8Array).byteLength;
              res.destroy();
              break;
            }
          })();
        })
      );
      it("should reject the response promise", async function () {
        const client = createNodeHttpClient({
          httpVersion: "1.1",
        });

        async function* body() {
          yield new Uint8Array(32);
          await new Promise<void>(() => {
            // never resolves
          });
        }

        try {
          await client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
            body: body(),
          });
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe("[aborted] socket hang up");
        }
        expect(serverReceivedBytes).toBe(32);
      });
    });
  });

  describe("against a server that closes mid response", function () {
    describe("over http/2", function () {
      let serverSentBytes = 0;
      const server = useNodeServer(() =>
        http2.createServer((req, res) => {
          void (async () => {
            res.writeHead(200);
            await new Promise<void>((resolve, reject) =>
              res.write(new Uint8Array(64), (e: Error | undefined) =>
                e ? reject(e) : resolve()
              )
            );
            serverSentBytes += 64;
            res.stream.close(http2.constants.NGHTTP2_CANCEL);
          })();
        })
      );
      it("should reject the response promise with Code.Canceled", async function () {
        const client = createNodeHttpClient({
          httpVersion: "2",
          baseUrl: server.getUrl(),
        });
        const res = await client({
          url: server.getUrl(),
          method: "POST",
          header: new Headers(),
          body: createAsyncIterable([]),
        });
        try {
          for await (const chunk of res.body) {
            expect(chunk.byteLength).toBe(64);
          }
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[canceled] http/2 stream closed with RST code CANCEL (0x8)"
          );
        }
        expect(serverSentBytes).toBe(64);
      });
    });
    describe("over http/1.1", function () {
      let serverSentBytes = 0;
      const server = useNodeServer(() =>
        http.createServer((req, res) => {
          void (async () => {
            res.writeHead(200);
            await new Promise<void>((resolve, reject) =>
              res.write(new Uint8Array(64), (e) => (e ? reject(e) : resolve()))
            );
            serverSentBytes += 64;
            res.destroy();
          })();
        })
      );
      it("should reject the response promise", async function () {
        const client = createNodeHttpClient({
          httpVersion: "1.1",
        });
        const res = await client({
          url: server.getUrl(),
          method: "POST",
          header: new Headers(),
          body: createAsyncIterable([]),
        });
        try {
          for await (const chunk of res.body) {
            expect(chunk.byteLength).toBe(64);
          }
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toMatch(
            /\[aborted] (aborted|read ECONNRESET)/
          );
        }
        expect(serverSentBytes).toBe(64);
      });
    });
  });

  describe("with a signal that is already aborted", function () {
    describe("over http/2", function () {
      let serverReceivedRequest = false;
      const server = useNodeServer(() =>
        http2.createServer(() => (serverReceivedRequest = true))
      );
      it("should raise error with Code.Canceled and never hit the server", async function () {
        const signal = AbortSignal.abort();
        const client = createNodeHttpClient({
          httpVersion: "2",
          baseUrl: server.getUrl(),
          keepSessionAlive: false,
        });
        // client should raise error
        try {
          await client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
            body: createAsyncIterable([]),
            signal,
          });
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[canceled] This operation was aborted"
          );
        }
        // request should never hit the server
        expect(serverReceivedRequest).toBeFalse();
      });
    });
    describe("over http/1.1", function () {
      let serverReceivedRequest = false;
      const server = useNodeServer(() =>
        http.createServer(() => (serverReceivedRequest = true))
      );
      it("should raise error with Code.Canceled and never hit the server", async function () {
        const signal = AbortSignal.abort();
        const client = createNodeHttpClient({
          httpVersion: "1.1",
        });
        // client should raise error
        try {
          await client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
            body: createAsyncIterable([]),
            signal,
          });
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[canceled] This operation was aborted"
          );
        }
        // request should never hit the server
        expect(serverReceivedRequest).toBeFalse();
      });
    });
  });

  describe("with a signal aborting before first request byte", function () {
    describe("over http/2", function () {
      let serverReceivedRstCode: number | undefined;
      let serverReceivedBytes = 0;
      const server = useNodeServer(() =>
        http2.createServer((req, res) => {
          res.stream.on(
            "close",
            () => (serverReceivedRstCode = res.stream.rstCode)
          );
          void (async () => {
            for await (const chunk of req) {
              serverReceivedBytes += (chunk as Uint8Array).byteLength;
            }
          })();
        })
      );
      it("should raise error with code canceled and send RST_STREAM with code CANCEL", async function () {
        // set up a client that aborts while still streaming the request body
        const ac = new AbortController();
        const client = createNodeHttpClient({
          httpVersion: "2",
          baseUrl: server.getUrl(),
          keepSessionAlive: false,
        });

        async function* body() {
          await new Promise<void>((resolve) => setTimeout(resolve, 50));
          ac.abort();
          yield new Uint8Array(32);
        }

        // client should raise error
        try {
          await client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
            body: body(),
            signal: ac.signal,
          });
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[canceled] This operation was aborted"
          );
        }

        // server should receive chunks until client cancelled
        while (serverReceivedRstCode === undefined) {
          // wait for the server to see the reset code
          await new Promise((resolve) => setTimeout(resolve, 1));
        }
        expect(serverReceivedRstCode).toBe(http2.constants.NGHTTP2_CANCEL);
        expect(serverReceivedBytes).toBe(0);
      });
    });
    describe("over http/1.1", function () {
      let serverReceivedRequest = false;
      let serverReceivedBytes = 0;
      let serverRequestClosed = false;
      let serverResponseClosed = false;
      let serverRequestEmittedAborted = false;
      let serverRequestEmittedError: (Error & { code?: string }) | undefined;
      let serverRequestIterableErrored: (Error & { code?: string }) | undefined;
      const server = useNodeServer(() =>
        http.createServer((req, res) => {
          serverReceivedRequest = true;
          req.on("aborted", () => (serverRequestEmittedAborted = true));
          req.on("error", (e) => (serverRequestEmittedError = e));
          req.on("close", () => (serverRequestClosed = true));
          res.on("close", () => (serverResponseClosed = true));
          void (async () => {
            try {
              for await (const chunk of req) {
                serverReceivedBytes += (chunk as Uint8Array).byteLength;
              }
            } catch (e) {
              serverRequestIterableErrored = e as Error & { code?: string };
            }
          })();
        })
      );
      it("should raise error with code canceled", async function () {
        // set up a client that aborts while still streaming the request body
        const ac = new AbortController();
        const client = createNodeHttpClient({
          httpVersion: "1.1",
        });

        async function* body() {
          await new Promise<void>((resolve) => setTimeout(resolve, 50));
          ac.abort();
          yield new Uint8Array(32);
        }

        // client should raise error
        try {
          await client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
            body: body(),
            signal: ac.signal,
          });
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[canceled] This operation was aborted"
          );
        }

        // server should receive chunks until client cancelled
        expect(serverReceivedRequest)
          .withContext("serverReceivedRequest")
          .toBeTrue();
        while (!serverResponseClosed) {
          // wait for the server to see the response being closed
          await new Promise((resolve) => setTimeout(resolve, 1));
        }
        expect(serverRequestClosed).toBeTrue();
        expect(serverResponseClosed).toBeTrue();
        expect(serverRequestEmittedAborted).toBeTrue();
        expect(serverRequestEmittedError?.code).toBe("ECONNRESET");
        expect(serverRequestIterableErrored?.code).toBe("ECONNRESET");
        expect(serverReceivedBytes).toBe(0);
      });
    });
  });

  describe("with a signal aborting mid request", function () {
    describe("over http/2", function () {
      let serverReceivedRstCode: number | undefined;
      let serverReceivedBytes = 0;
      const server = useNodeServer(() =>
        http2.createServer((req, res) => {
          res.stream.on(
            "close",
            () => (serverReceivedRstCode = res.stream.rstCode)
          );
          void (async () => {
            for await (const chunk of req) {
              serverReceivedBytes += (chunk as Uint8Array).byteLength;
            }
          })();
        })
      );
      it("should raise error with code canceled and send RST_STREAM with code CANCEL", async function () {
        // set up a client that aborts while still streaming the request body
        const ac = new AbortController();
        const client = createNodeHttpClient({
          httpVersion: "2",
          baseUrl: server.getUrl(),
          keepSessionAlive: false,
        });

        async function* body() {
          yield new Uint8Array(32);
          await new Promise<void>((resolve) => setTimeout(resolve, 50));
          ac.abort();
          yield new Uint8Array(32);
        }

        // client should raise error
        try {
          await client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
            body: body(),
            signal: ac.signal,
          });
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[canceled] This operation was aborted"
          );
        }

        // server should receive chunks until client cancelled
        while (serverReceivedRstCode === undefined) {
          // wait for the server to see the reset code
          await new Promise((resolve) => setTimeout(resolve, 1));
        }
        expect(serverReceivedRstCode).toBe(http2.constants.NGHTTP2_CANCEL);
        expect(serverReceivedBytes).toBe(32);
      });
    });
    describe("over http/1.1", function () {
      let serverReceivedRequest = false;
      let serverReceivedBytes = 0;
      let serverRequestClosed = false;
      let serverResponseClosed = false;
      let serverRequestEmittedAborted = false;
      let serverRequestEmittedError: (Error & { code?: string }) | undefined;
      let serverRequestIterableErrored: (Error & { code?: string }) | undefined;
      const server = useNodeServer(() =>
        http.createServer((req, res) => {
          serverReceivedRequest = true;
          req.on("aborted", () => (serverRequestEmittedAborted = true));
          req.on("error", (e) => (serverRequestEmittedError = e));
          req.on("close", () => (serverRequestClosed = true));
          res.on("close", () => (serverResponseClosed = true));
          void (async () => {
            try {
              for await (const chunk of req) {
                serverReceivedBytes += (chunk as Uint8Array).byteLength;
              }
            } catch (e) {
              serverRequestIterableErrored = e as Error & { code?: string };
            }
          })();
        })
      );
      it("should raise error with code canceled", async function () {
        // set up a client that aborts while still streaming the request body
        const ac = new AbortController();
        const client = createNodeHttpClient({
          httpVersion: "1.1",
        });

        async function* body() {
          yield new Uint8Array(32);
          await new Promise<void>((resolve) => setTimeout(resolve, 50));
          ac.abort();
          yield new Uint8Array(32);
        }

        // client should raise error
        try {
          await client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
            body: body(),
            signal: ac.signal,
          });
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[canceled] This operation was aborted"
          );
        }

        // server should receive chunks until client cancelled
        expect(serverReceivedRequest).toBeTrue();
        while (!serverResponseClosed) {
          // wait for the server to see the response being closed
          await new Promise((resolve) => setTimeout(resolve, 1));
        }
        expect(serverRequestClosed).toBeTrue();
        expect(serverResponseClosed).toBeTrue();
        expect(serverRequestEmittedAborted).toBeTrue();
        expect(serverRequestEmittedError?.code).toBe("ECONNRESET");
        expect(serverRequestIterableErrored?.code).toBe("ECONNRESET");
        expect(serverReceivedBytes).toBe(32);
      });
    });
  });

  describe("with a signal aborting mid response", function () {
    describe("over http/2", function () {
      let serverReceivedRstCode: number | undefined;
      let serverSentBytes = 0;
      const server = useNodeServer(() =>
        http2.createServer((req, res) => {
          res.stream.on(
            "close",
            () => (serverReceivedRstCode = res.stream.rstCode)
          );
          void (async () => {
            res.writeHead(200);
            res.write(new Uint8Array(64));
            serverSentBytes += 64;
            await new Promise<void>(() => {
              // never resolves
            });
          })();
        })
      );
      it("should raise error with code canceled and send RST_STREAM with code CANCEL", async function () {
        // set up a client that aborts while still streaming the request body
        const ac = new AbortController();
        const client = createNodeHttpClient({
          httpVersion: "2",
          baseUrl: server.getUrl(),
          keepSessionAlive: false,
        });

        const res = await client({
          url: server.getUrl(),
          method: "POST",
          header: new Headers(),
          body: createAsyncIterable([]),
          signal: ac.signal,
        });

        // should raise error with code canceled
        try {
          for await (const chunk of res.body) {
            expect(chunk.byteLength).toBe(64);
            ac.abort();
          }
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[canceled] This operation was aborted"
          );
        }

        // server should receive RST_STREAM with code CANCEL
        while (serverReceivedRstCode === undefined) {
          // wait for the server to see the reset code
          await new Promise((resolve) => setTimeout(resolve, 1));
        }
        expect(serverReceivedRstCode).toBe(http2.constants.NGHTTP2_CANCEL);
        expect(serverSentBytes).toBe(64);
      });
    });
    describe("over http/1.1", function () {
      let serverSentBytes = 0;
      let serverRequestClosed = false;
      let serverResponseClosed = false;
      const server = useNodeServer(() =>
        http.createServer((req, res) => {
          req.on("close", () => (serverRequestClosed = true));
          res.on("close", () => (serverResponseClosed = true));
          void (async () => {
            res.writeHead(200);
            res.write(new Uint8Array(64));
            serverSentBytes += 64;
            await new Promise<void>(() => {
              // never resolves
            });
          })();
        })
      );
      it("should raise error with code canceled", async function () {
        // set up a client that aborts while still streaming the request body
        const ac = new AbortController();
        const client = createNodeHttpClient({
          httpVersion: "1.1",
        });

        const res = await client({
          url: server.getUrl(),
          method: "POST",
          header: new Headers(),
          body: createAsyncIterable([]),
          signal: ac.signal,
        });

        // should raise error with code canceled
        try {
          for await (const chunk of res.body) {
            expect(chunk.byteLength).toBe(64);
            ac.abort();
          }
          fail("expected error");
        } catch (e) {
          expect(e).toBeInstanceOf(ConnectError);
          expect(ConnectError.from(e).message).toBe(
            "[canceled] This operation was aborted"
          );
        }

        // server should see request close
        while (!serverResponseClosed) {
          // wait for the server to see the response being closed
          await new Promise((resolve) => setTimeout(resolve, 1));
        }
        expect(serverRequestClosed).toBeTrue();
        expect(serverResponseClosed).toBeTrue();
        expect(serverSentBytes).toBe(64);
      });
    });
  });
});

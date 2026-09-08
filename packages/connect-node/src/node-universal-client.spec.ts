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

import { describe, it } from "node:test";
import * as assert from "node:assert";
import * as http2 from "node:http2";
import * as http from "node:http";
import type * as net from "node:net";
import { Code, ConnectError } from "@connectrpc/connect";
import { createAsyncIterable } from "@connectrpc/connect/protocol";
import { createNodeHttpClient } from "./node-universal-client.js";
import { useNodeServer } from "./use-node-server-helper.spec.js";

describe("node http/2 client closing with RST_STREAM with code CANCEL", () => {
  let serverReceivedRstCode: number | undefined;
  const server = useNodeServer(() =>
    http2.createServer().on("stream", (stream) => {
      stream.on("close", () => {
        serverReceivedRstCode = stream.rstCode;
      });
    }),
  );
  it("should send RST_STREAM frame to the server", async () => {
    new Promise<void>((resolve) => {
      http2.connect(server.getUrl(), (session: http2.ClientHttp2Session) => {
        const stream = session.request(
          {
            ":method": "POST",
            ":path": "/",
          },
          {},
        );
        setTimeout(() => {
          stream.close(http2.constants.NGHTTP2_CANCEL, () => {
            // We are seeing a race condition in Node.js, where closing
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
    assert.strictEqual(serverReceivedRstCode, http2.constants.NGHTTP2_CANCEL);
  });
});

/**
 * Returns a serialized RST_STREAM frame with error code NO_ERROR (0x0) for
 * the given stream, see https://www.rfc-editor.org/rfc/rfc9113#name-rst_stream
 *
 * Writing this frame directly to the socket simulates a peer - typically a
 * proxy - that resets a stream without the END_STREAM flag having been sent.
 * The server APIs of the http2 module cannot produce this sequence: they
 * gracefully end the stream first.
 */
function rstStreamNoError(streamId: number): Buffer {
  const frame = Buffer.alloc(13);
  frame.writeUIntBE(4, 0, 3); // payload length
  frame.writeUInt8(0x03, 3); // frame type RST_STREAM
  frame.writeUInt8(0, 4); // flags
  frame.writeUInt32BE(streamId, 5); // stream id
  frame.writeUInt32BE(0, 9); // error code NO_ERROR
  return frame;
}

describe("universal node http client", () => {
  describe("against an unresolvable host", () => {
    for (const httpVersion of ["2", "1.1"] as const) {
      describe(`over http ${httpVersion}`, () => {
        it("should raise Code.Unavailable", async () => {
          const client = createNodeHttpClient({
            httpVersion,
          });
          try {
            await client({
              url: "https://unresolvable-host.some.domain",
              method: "POST",
              header: new Headers(),
            });
          } catch (e) {
            assert.strictEqual(
              ConnectError.from(e).message,
              "[unavailable] getaddrinfo ENOTFOUND unresolvable-host.some.domain",
            );
          }
        });
      });
    }
  });

  describe("against a server that closes immediately", () => {
    describe("over http/2", () => {
      let serverReceivedRequest = false;
      const server = useNodeServer(() =>
        http2.createServer((request, response) => {
          serverReceivedRequest = true;
          response.stream.close(http2.constants.NGHTTP2_CANCEL);
        }),
      );
      it("should reject the response promise with Code.Canceled", async () => {
        const client = server.getClient();
        await assert.rejects(
          client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
          }),
          (e: unknown) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[canceled] http/2 stream closed with error code CANCEL (0x8)",
            );
            return true;
          },
        );
        assert.ok(serverReceivedRequest);
      });
    });
    describe("over http/1.1", () => {
      let serverReceivedRequest = false;
      const server = useNodeServer(() =>
        http.createServer((req, res) => {
          serverReceivedRequest = true;
          res.destroy();
        }),
      );
      it("should reject the response promise", async () => {
        const client = server.getClient();
        await assert.rejects(
          client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
          }),
          (e: unknown) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(e.message, "[aborted] socket hang up");
            return true;
          },
        );
        assert.ok(serverReceivedRequest);
      });
    });
  });

  describe("against a server that closes with NO_ERROR before the response", () => {
    describe("over http/2", () => {
      const server = useNodeServer(() =>
        http2.createServer((request, response) => {
          response.stream.close(http2.constants.NGHTTP2_NO_ERROR);
        }),
      );
      it("should reject a request with te: trailers with Code.Unavailable", async () => {
        const client = server.getClient();
        await assert.rejects(
          Promise.race([
            client({
              url: server.getUrl(),
              method: "POST",
              header: new Headers({ te: "trailers" }),
            }),
            new Promise<never>((_, reject) =>
              setTimeout(
                () => reject(new Error("response promise never settled")),
                500,
              ),
            ),
          ]),
          (e: unknown) => {
            assert.ok(e instanceof ConnectError, String(e));
            assert.strictEqual(
              e.message,
              "[unavailable] http/2 stream closed with error code NO_ERROR (0x0) before trailers were received",
            );
            return true;
          },
        );
      });
    });
  });

  describe("against a server that resets the stream with NO_ERROR mid response body", () => {
    describe("over http/2", () => {
      let rawSocket: net.Socket | undefined;
      const server = useNodeServer(() => {
        const s = http2.createServer();
        s.on("connection", (socket: net.Socket) => {
          rawSocket = socket;
        });
        s.on("stream", (stream) => {
          stream.respond({
            ":status": 200,
            "content-type": "application/grpc",
          });
          // Write a chunk of the response body, but never the END_STREAM
          // flag. Then send a raw RST_STREAM frame with code NO_ERROR, like
          // a proxy that loses the connection to the backend during a
          // graceful shutdown. The frame is written directly to the socket,
          // because closing the stream via the http2 module would gracefully
          // send the END_STREAM flag first.
          const id = stream.id ?? 0;
          stream.write(new Uint8Array(64), () => {
            setImmediate(() => rawSocket?.write(rstStreamNoError(id)));
          });
        });
        return s;
      });
      it("should reject a request with te: trailers with Code.Unavailable", async () => {
        const client = server.getClient();
        const res = await client({
          url: server.getUrl(),
          method: "POST",
          header: new Headers({ te: "trailers" }),
        });
        let bytesReceived = 0;
        await assert.rejects(
          async () => {
            for await (const chunk of res.body) {
              bytesReceived += chunk.byteLength;
            }
          },
          (e: unknown) => {
            assert.ok(e instanceof ConnectError, String(e));
            assert.strictEqual(e.code, Code.Unavailable);
            assert.strictEqual(
              e.message,
              "[unavailable] http/2 stream closed with error code NO_ERROR (0x0) before trailers were received",
            );
            return true;
          },
        );
        assert.strictEqual(bytesReceived, 64);
      });
    });
  });

  describe("against a server that resets the stream with NO_ERROR after the response body, instead of sending trailers", () => {
    describe("over http/2", () => {
      const server = useNodeServer(() =>
        http2.createServer().on("stream", (stream) => {
          stream.respond(
            {
              ":status": 200,
              "content-type": "application/grpc",
            },
            { waitForTrailers: true },
          );
          // Closing with NO_ERROR while trailers are still outstanding sends
          // the response body, and then an RST_STREAM frame with code
          // NO_ERROR without the END_STREAM flag - the same wire sequence as
          // a proxy resetting the stream before the trailers arrive.
          stream.write(new Uint8Array(64), () =>
            stream.close(http2.constants.NGHTTP2_NO_ERROR),
          );
        }),
      );
      it("should reject a request with te: trailers with Code.Unavailable", async () => {
        const client = server.getClient();
        const res = await client({
          url: server.getUrl(),
          method: "POST",
          header: new Headers({ te: "trailers" }),
        });
        let bytesReceived = 0;
        await assert.rejects(
          async () => {
            for await (const chunk of res.body) {
              bytesReceived += chunk.byteLength;
            }
          },
          (e: unknown) => {
            assert.ok(e instanceof ConnectError, String(e));
            assert.strictEqual(e.code, Code.Unavailable);
            assert.strictEqual(
              e.message,
              "[unavailable] http/2 stream closed with error code NO_ERROR (0x0) before trailers were received",
            );
            return true;
          },
        );
        assert.strictEqual(bytesReceived, 64);
      });
    });
  });

  describe("against a server that resets the stream with NO_ERROR after the complete response, including trailers", () => {
    describe("over http/2", () => {
      let rawSocket: net.Socket | undefined;
      const server = useNodeServer(() => {
        const s = http2.createServer();
        s.on("connection", (socket: net.Socket) => {
          rawSocket = socket;
        });
        s.on("stream", (stream) => {
          const id = stream.id ?? 0;
          stream.respond(
            {
              ":status": 200,
              "content-type": "application/grpc",
            },
            { waitForTrailers: true },
          );
          stream.on("wantTrailers", () =>
            stream.sendTrailers({ "grpc-status": "0" }),
          );
          // A proxy may legally reset the stream with NO_ERROR after the
          // complete response - the client must still succeed.
          stream.on("close", () => {
            setImmediate(() => rawSocket?.write(rstStreamNoError(id)));
          });
          stream.end(new Uint8Array(64));
        });
        return s;
      });
      it("should read the response body and trailers successfully", async () => {
        const client = server.getClient();
        const res = await client({
          url: server.getUrl(),
          method: "POST",
          header: new Headers({ te: "trailers" }),
        });
        let bytesReceived = 0;
        for await (const chunk of res.body) {
          bytesReceived += chunk.byteLength;
        }
        assert.strictEqual(bytesReceived, 64);
        assert.strictEqual(res.trailer.get("grpc-status"), "0");
      });
    });
  });

  describe("against a server that responds with trailers-only", () => {
    describe("over http/2", () => {
      let rawSocket: net.Socket | undefined;
      const server = useNodeServer(() => {
        const s = http2.createServer();
        s.on("connection", (socket: net.Socket) => {
          rawSocket = socket;
        });
        s.on("stream", (stream) => {
          const id = stream.id ?? 0;
          // A trailers-only gRPC response: the initial HEADERS frame carries
          // the status and the END_STREAM flag, no trailers follow.
          stream.respond(
            {
              ":status": 200,
              "content-type": "application/grpc",
              "grpc-status": "12",
            },
            { endStream: true },
          );
          // Even a reset with NO_ERROR after the response must not affect
          // the client.
          stream.on("close", () => {
            setImmediate(() => rawSocket?.write(rstStreamNoError(id)));
          });
        });
        return s;
      });
      it("should read the response successfully for a request with te: trailers", async () => {
        const client = server.getClient();
        const res = await client({
          url: server.getUrl(),
          method: "POST",
          header: new Headers({ te: "trailers" }),
        });
        let bytesReceived = 0;
        for await (const chunk of res.body) {
          bytesReceived += chunk.byteLength;
        }
        assert.strictEqual(bytesReceived, 0);
        assert.strictEqual(res.header.get("grpc-status"), "12");
      });
    });
  });

  describe("against a server that ends the response body without trailers", () => {
    describe("over http/2", () => {
      const server = useNodeServer(() =>
        http2.createServer().on("stream", (stream) => {
          // A response that ends with the END_STREAM flag on the final DATA
          // frame, without trailers - normal for protocols that do not use
          // trailers, such as the Connect protocol.
          stream.respond({ ":status": 200 });
          stream.end(new Uint8Array(64));
        }),
      );
      it("should read the response body successfully for a request without te: trailers", async () => {
        const client = server.getClient();
        const res = await client({
          url: server.getUrl(),
          method: "POST",
          header: new Headers(),
        });
        let bytesReceived = 0;
        for await (const chunk of res.body) {
          bytesReceived += chunk.byteLength;
        }
        assert.strictEqual(bytesReceived, 64);
      });
    });
  });

  describe("against a server that closes before the first response byte", () => {
    describe("over http/2", () => {
      const server = useNodeServer(() =>
        http2.createServer((req, res) => {
          res.writeHead(200);
          // Calling close in the same tick as writeHead appears to prevent
          // headers from being sent. The client response promise will reject,
          // instead of the response body.
          setTimeout(() => res.stream.close(http2.constants.NGHTTP2_CANCEL), 0);
        }),
      );
      it("should reject the response promise with Code.Canceled", async () => {
        const client = server.getClient();
        const res = await client({
          url: server.getUrl(),
          method: "POST",
          header: new Headers(),
        });
        await assert.rejects(
          async () => {
            for await (const chunk of res.body) {
              assert.strictEqual(
                chunk,
                undefined,
                "response body iterable should be empty",
              );
            }
          },
          (e: unknown) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[canceled] http/2 stream closed with error code CANCEL (0x8)",
            );
            return true;
          },
        );
      });
    });
    describe("over http/1.1", () => {
      const server = useNodeServer(() =>
        http.createServer((req, res) => {
          res.writeHead(200);
          res.flushHeaders();
          res.destroy();
        }),
      );
      it("should reject the response promise", async () => {
        const client = server.getClient();
        const res = await client({
          url: server.getUrl(),
          method: "POST",
          header: new Headers(),
        });
        await assert.rejects(
          async () => {
            for await (const chunk of res.body) {
              assert.strictEqual(
                chunk,
                undefined,
                "response body iterable should be empty",
              );
            }
          },
          (e: unknown) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(e.message, "[aborted] aborted");
            return true;
          },
        );
      });
    });
  });

  describe("against a server that closes mid request", () => {
    describe("over http/2", () => {
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
        }),
      );
      it("should reject the response promise with Code.Canceled", async () => {
        const client = server.getClient();

        async function* body() {
          yield new Uint8Array(32);
          await new Promise<void>(() => {
            // never resolves
          });
        }

        await assert.rejects(
          client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
            body: body(),
          }),
          (e: unknown) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[canceled] http/2 stream closed with error code CANCEL (0x8)",
            );
            return true;
          },
        );
        assert.strictEqual(serverReceivedBytes, 32);
      });
    });
    describe("over http/1.1", () => {
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
        }),
      );
      it("should reject the response promise", async () => {
        const client = server.getClient();

        async function* body() {
          yield new Uint8Array(32);
          await new Promise<void>(() => {
            // never resolves
          });
        }

        await assert.rejects(
          client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
            body: body(),
          }),
          (e: unknown) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(e.message, "[aborted] socket hang up");
            return true;
          },
        );
        assert.strictEqual(serverReceivedBytes, 32);
      });
    });
  });

  describe("against a server that closes mid response", () => {
    describe("over http/2", () => {
      let serverSentBytes = 0;
      const server = useNodeServer(() =>
        http2.createServer((req, res) => {
          void (async () => {
            res.writeHead(200);
            await new Promise<void>((resolve, reject) =>
              res.write(new Uint8Array(64), (e: Error | undefined) =>
                e ? reject(e) : resolve(),
              ),
            );
            serverSentBytes += 64;
            res.stream.close(http2.constants.NGHTTP2_CANCEL);
          })();
        }),
      );
      it("should reject the response promise with Code.Canceled", async () => {
        const client = server.getClient();
        const res = await client({
          url: server.getUrl(),
          method: "POST",
          header: new Headers(),
        });
        await assert.rejects(
          async () => {
            for await (const chunk of res.body) {
              assert.strictEqual(chunk.byteLength, 64);
            }
          },
          (e: unknown) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[canceled] http/2 stream closed with error code CANCEL (0x8)",
            );
            return true;
          },
        );
        assert.strictEqual(serverSentBytes, 64);
      });
    });
    describe("over http/1.1", () => {
      let serverSentBytes = 0;
      const server = useNodeServer(() =>
        http.createServer((req, res) => {
          void (async () => {
            res.writeHead(200);
            await new Promise<void>((resolve, reject) =>
              res.write(new Uint8Array(64), (e) => (e ? reject(e) : resolve())),
            );
            serverSentBytes += 64;
            res.destroy();
          })();
        }),
      );
      it("should reject the response promise", async () => {
        const client = server.getClient();
        const res = await client({
          url: server.getUrl(),
          method: "POST",
          header: new Headers(),
        });
        await assert.rejects(
          async () => {
            for await (const chunk of res.body) {
              assert.strictEqual(chunk.byteLength, 64);
            }
          },
          (e: unknown) => {
            assert.ok(e instanceof ConnectError);
            assert.match(e.message, /\[aborted] (aborted|read ECONNRESET)/);
            return true;
          },
        );
        assert.strictEqual(serverSentBytes, 64);
      });
    });
  });

  describe("with a signal that is already aborted", () => {
    describe("over http/2", () => {
      let serverReceivedRequest = false;
      const server = useNodeServer(() =>
        http2.createServer(() => {
          serverReceivedRequest = true;
        }),
      );
      it("should raise error with Code.Canceled and never hit the server", async () => {
        const client = server.getClient();
        const signal = AbortSignal.abort();
        // client should raise error
        await assert.rejects(
          client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
            signal,
          }),
          (e: unknown) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[canceled] This operation was aborted",
            );
            return true;
          },
        );
        // request should never hit the server
        assert.ok(!serverReceivedRequest);
      });
    });
    describe("over http/1.1", () => {
      let serverReceivedRequest = false;
      const server = useNodeServer(() =>
        http.createServer(() => {
          serverReceivedRequest = true;
        }),
      );
      it("should raise error with Code.Canceled and never hit the server", async () => {
        const client = server.getClient();
        const signal = AbortSignal.abort();
        // client should raise error
        await assert.rejects(
          client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
            signal,
          }),
          (e: unknown) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[canceled] This operation was aborted",
            );
            return true;
          },
        );
        // request should never hit the server
        assert.ok(!serverReceivedRequest);
      });
    });
  });

  describe("with a signal aborting before first request byte", () => {
    describe("over http/2", () => {
      let serverReceivedRstCode: number | undefined;
      let serverReceivedBytes = 0;
      const server = useNodeServer(() =>
        http2.createServer((req, res) => {
          res.stream.on("close", () => {
            serverReceivedRstCode = res.stream.rstCode;
          });
          void (async () => {
            for await (const chunk of req) {
              serverReceivedBytes += (chunk as Uint8Array).byteLength;
            }
          })();
        }),
      );
      it("should raise error with code canceled and send RST_STREAM with code CANCEL", async () => {
        // set up a client that aborts while still streaming the request body
        const client = server.getClient();
        const ac = new AbortController();

        async function* body() {
          await new Promise<void>((resolve) => setTimeout(resolve, 50));
          ac.abort();
          yield new Uint8Array(32);
        }

        // client should raise error
        await assert.rejects(
          client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
            body: body(),
            signal: ac.signal,
          }),
          (e: unknown) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[canceled] This operation was aborted",
            );
            return true;
          },
        );

        // server should receive chunks until client cancelled
        while (serverReceivedRstCode === undefined) {
          // wait for the server to see the reset code
          await new Promise((resolve) => setTimeout(resolve, 1));
        }
        assert.strictEqual(
          serverReceivedRstCode,
          http2.constants.NGHTTP2_CANCEL,
        );
        assert.strictEqual(serverReceivedBytes, 0);
      });
    });
    describe("over http/1.1", () => {
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
          req.on("aborted", () => {
            serverRequestEmittedAborted = true;
          });
          req.on("error", (e) => {
            serverRequestEmittedError = e;
          });
          req.on("close", () => {
            serverRequestClosed = true;
          });
          res.on("close", () => {
            serverResponseClosed = true;
          });
          void (async () => {
            try {
              for await (const chunk of req) {
                serverReceivedBytes += (chunk as Uint8Array).byteLength;
              }
            } catch (e) {
              serverRequestIterableErrored = e as Error & { code?: string };
            }
          })();
        }),
      );
      it("should raise error with code canceled", async () => {
        // set up a client that aborts while still streaming the request body
        const client = server.getClient();
        const ac = new AbortController();

        async function* body() {
          await new Promise<void>((resolve) => setTimeout(resolve, 50));
          ac.abort();
          yield new Uint8Array(32);
        }

        // client should raise error
        await assert.rejects(
          client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
            body: body(),
            signal: ac.signal,
          }),
          (e: unknown) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[canceled] This operation was aborted",
            );
            return true;
          },
        );

        // server should receive chunks until client cancelled
        assert.strictEqual(
          serverReceivedRequest,
          true,
          "serverReceivedRequest",
        );
        while (!serverResponseClosed) {
          // wait for the server to see the response being closed
          await new Promise((resolve) => setTimeout(resolve, 1));
        }
        assert.ok(serverRequestClosed);
        assert.ok(serverResponseClosed);
        assert.ok(serverRequestEmittedAborted);
        assert.strictEqual(serverRequestEmittedError?.code, "ECONNRESET");
        assert.strictEqual(serverRequestIterableErrored?.code, "ECONNRESET");
        assert.strictEqual(serverReceivedBytes, 0);
      });
    });
  });

  describe("with a signal aborting mid request", () => {
    describe("over http/2", () => {
      let serverReceivedRstCode: number | undefined;
      let serverReceivedBytes = 0;
      const server = useNodeServer(() =>
        http2.createServer((req, res) => {
          res.stream.on("close", () => {
            serverReceivedRstCode = res.stream.rstCode;
          });
          void (async () => {
            for await (const chunk of req) {
              serverReceivedBytes += (chunk as Uint8Array).byteLength;
            }
          })();
        }),
      );
      it("should raise error with code canceled and send RST_STREAM with code CANCEL", async () => {
        // set up a client that aborts while still streaming the request body
        const client = server.getClient();
        const ac = new AbortController();

        async function* body() {
          yield new Uint8Array(32);
          await new Promise<void>((resolve) => setTimeout(resolve, 50));
          ac.abort();
          yield new Uint8Array(32);
        }

        // client should raise error
        await assert.rejects(
          client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
            body: body(),
            signal: ac.signal,
          }),
          (e: unknown) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[canceled] This operation was aborted",
            );
            return true;
          },
        );

        // server should receive chunks until client cancelled
        while (serverReceivedRstCode === undefined) {
          // wait for the server to see the reset code
          await new Promise((resolve) => setTimeout(resolve, 1));
        }
        assert.strictEqual(
          serverReceivedRstCode,
          http2.constants.NGHTTP2_CANCEL,
        );
        assert.strictEqual(serverReceivedBytes, 32);
      });
    });
    describe("over http/1.1", () => {
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
          req.on("aborted", () => {
            serverRequestEmittedAborted = true;
          });
          req.on("error", (e) => {
            serverRequestEmittedError = e;
          });
          req.on("close", () => {
            serverRequestClosed = true;
          });
          res.on("close", () => {
            serverResponseClosed = true;
          });
          void (async () => {
            try {
              for await (const chunk of req) {
                serverReceivedBytes += (chunk as Uint8Array).byteLength;
              }
            } catch (e) {
              serverRequestIterableErrored = e as Error & { code?: string };
            }
          })();
        }),
      );
      it("should raise error with code canceled", async () => {
        // set up a client that aborts while still streaming the request body
        const client = server.getClient();
        const ac = new AbortController();

        async function* body() {
          yield new Uint8Array(32);
          await new Promise<void>((resolve) => setTimeout(resolve, 50));
          ac.abort();
          yield new Uint8Array(32);
        }

        // client should raise error
        await assert.rejects(
          client({
            url: server.getUrl(),
            method: "POST",
            header: new Headers(),
            body: body(),
            signal: ac.signal,
          }),
          (e: unknown) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[canceled] This operation was aborted",
            );
            return true;
          },
        );

        // server should receive chunks until client cancelled
        assert.ok(serverReceivedRequest);
        while (!serverResponseClosed) {
          // wait for the server to see the response being closed
          await new Promise((resolve) => setTimeout(resolve, 1));
        }
        assert.ok(serverRequestClosed);
        assert.ok(serverResponseClosed);
        assert.ok(serverRequestEmittedAborted);
        assert.strictEqual(serverRequestEmittedError?.code, "ECONNRESET");
        assert.strictEqual(serverRequestIterableErrored?.code, "ECONNRESET");
        assert.strictEqual(serverReceivedBytes, 32);
      });
    });
  });

  describe("with a signal aborting mid response", () => {
    describe("over http/2", () => {
      let serverReceivedRstCode: number | undefined;
      let serverSentBytes = 0;
      const server = useNodeServer(() =>
        http2.createServer((req, res) => {
          res.stream.on("close", () => {
            serverReceivedRstCode = res.stream.rstCode;
          });
          void (async () => {
            res.writeHead(200);
            res.write(new Uint8Array(64));
            serverSentBytes += 64;
            await new Promise<void>(() => {
              // never resolves
            });
          })();
        }),
      );
      it("should raise error with code canceled and send RST_STREAM with code CANCEL", async () => {
        // set up a client that aborts while still streaming the request body
        const client = server.getClient();
        const ac = new AbortController();

        const res = await client({
          url: server.getUrl(),
          method: "POST",
          header: new Headers(),
          body: createAsyncIterable([]),
          signal: ac.signal,
        });

        // should raise error with code canceled
        await assert.rejects(
          async () => {
            for await (const chunk of res.body) {
              assert.strictEqual(chunk.byteLength, 64);
              ac.abort();
            }
          },
          (e: unknown) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[canceled] This operation was aborted",
            );
            return true;
          },
        );

        // server should receive RST_STREAM with code CANCEL
        while (serverReceivedRstCode === undefined) {
          // wait for the server to see the reset code
          await new Promise((resolve) => setTimeout(resolve, 1));
        }
        assert.strictEqual(
          serverReceivedRstCode,
          http2.constants.NGHTTP2_CANCEL,
        );
        assert.strictEqual(serverSentBytes, 64);
      });
    });
    describe("over http/1.1", () => {
      let serverSentBytes = 0;
      let serverRequestClosed = false;
      let serverResponseClosed = false;
      const server = useNodeServer(() =>
        http.createServer((req, res) => {
          req.on("close", () => {
            serverRequestClosed = true;
          });
          res.on("close", () => {
            serverResponseClosed = true;
          });
          void (async () => {
            res.writeHead(200);
            res.write(new Uint8Array(64));
            serverSentBytes += 64;
            await new Promise<void>(() => {
              // never resolves
            });
          })();
        }),
      );
      it("should raise error with code canceled", async () => {
        // set up a client that aborts while still streaming the request body
        const client = server.getClient();
        const ac = new AbortController();

        const res = await client({
          url: server.getUrl(),
          method: "POST",
          header: new Headers(),
          body: createAsyncIterable([]),
          signal: ac.signal,
        });

        // should raise error with code canceled
        await assert.rejects(
          async () => {
            for await (const chunk of res.body) {
              assert.strictEqual(chunk.byteLength, 64);
              ac.abort();
            }
          },
          (e: unknown) => {
            assert.ok(e instanceof ConnectError);
            assert.strictEqual(
              e.message,
              "[canceled] This operation was aborted",
            );
            return true;
          },
        );

        // server should see request close
        while (!serverResponseClosed) {
          // wait for the server to see the response being closed
          await new Promise((resolve) => setTimeout(resolve, 1));
        }
        assert.ok(serverRequestClosed);
        assert.ok(serverResponseClosed);
        assert.strictEqual(serverSentBytes, 64);
      });
    });
  });
});

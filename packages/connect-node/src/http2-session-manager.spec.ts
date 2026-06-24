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
import { useNodeServer } from "./use-node-server-helper.spec.js";
import * as http2 from "node:http2";
import { Http2SessionManager } from "./http2-session-manager.js";
import { ConnectError } from "@connectrpc/connect";
import { Worker } from "node:worker_threads";

describe("Http2SessionManager", () => {
  const serverSessions: http2.ServerHttp2Session[] = [];
  const serverReceivedPings: Buffer[] = [];
  const server = useNodeServer(() => {
    serverSessions.splice(0);
    serverReceivedPings.splice(0);
    return http2
      .createServer()
      .on("session", (s) => serverSessions.push(s))
      .on("session", (s) =>
        s.on("ping", (payload: Buffer) => serverReceivedPings.push(payload)),
      )
      .on("request", () => {
        // without the listener, node cancels streams
      });
  });

  it("should initially be closed", () => {
    const sm = new Http2SessionManager(server.getUrl());
    assert.strictEqual(sm.state(), "closed");
  });

  it("should be closed after calling abort()", () => {
    const sm = new Http2SessionManager(server.getUrl());
    sm.abort();
    assert.strictEqual(sm.state(), "closed");
  });

  it("should be error after calling abort() with an error", () => {
    const sm = new Http2SessionManager(server.getUrl());
    sm.abort(new ConnectError("foo"));
    assert.strictEqual(sm.state(), "error");
    assert.strictEqual(String(sm.error()), "ConnectError: [unknown] foo");
  });

  describe("first request", () => {
    it("should update state to 'connecting', 'open', and close cleanly after closing the stream", async () => {
      const sm = new Http2SessionManager(server.getUrl());
      const reqPromise = sm.request("POST", "/", {}, {});
      assert.strictEqual(sm.state(), "connecting");
      const req = await reqPromise;
      assert.strictEqual(sm.state(), "open");
      await new Promise<void>((resolve) =>
        req.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
      );
      sm.abort();
      assert.strictEqual(sm.state(), "closed");
    });
    it("should update state to 'idle', when closing the stream", async () => {
      const sm = new Http2SessionManager(server.getUrl());
      const req = await sm.request("POST", "/", {}, {});
      await new Promise<void>((resolve) =>
        req.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
      );
      assert.strictEqual(sm.state(), "idle");
      sm.abort();
      assert.strictEqual(sm.state(), "closed");
    });
    it("should reject if manager is aborted while connecting", async () => {
      const sm = new Http2SessionManager(server.getUrl());
      const reqPromise = sm.request("POST", "/", {}, {});
      assert.strictEqual(sm.state(), "connecting");
      sm.abort();
      await assert.rejects(reqPromise, /\[canceled] connection aborted/);
      assert.strictEqual(sm.state(), "closed");
    });
    it("should error if manager aborts", async () => {
      const sm = new Http2SessionManager(server.getUrl());
      const req = await sm.request("POST", "/", {}, {});
      assert.strictEqual(sm.state(), "open");
      let reqError: unknown;
      req.on("error", (err: unknown) => {
        reqError = err;
      });
      assert.ok(!req.destroyed);
      sm.abort();
      // wait for next tick
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
      assert.ok(req.destroyed);
      assert.strictEqual(
        String(reqError),
        "ConnectError: [canceled] connection aborted",
      );
      assert.strictEqual(sm.state(), "closed");
    });
  });

  describe("second request", () => {
    it("should re-use the existing connection", async () => {
      const sm = new Http2SessionManager(server.getUrl());
      const req1 = await sm.request("POST", "/", {}, {});
      const req2 = await sm.request("POST", "/", {}, {});
      assert.strictEqual(
        req1.session,
        req2.session,
        "session for second request is re-using connection from first request",
      );

      // clean up
      await new Promise<void>((resolve) =>
        req1.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
      );
      await new Promise<void>((resolve) =>
        req2.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
      );
      sm.abort();
    });
    it("should verify idle connection", async () => {
      const sm = new Http2SessionManager(server.getUrl(), {
        pingIntervalMs: 10, // intentionally short to trigger verification in tests
      });

      // issue a request and close it, then wait for more than pingIntervalMs to trigger a verification
      const req1 = await sm.request("POST", "/", {}, {});
      const req1Session = req1.session;
      await new Promise<void>((resolve) =>
        req1.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
      );
      assert.strictEqual(
        sm.state(),
        "idle",
        "connection state after issuing a request and closing it",
      );
      await new Promise<void>((resolve) => setTimeout(resolve, 30));

      // issue another request, which should verify the connection first with successful PING within timeout
      serverReceivedPings.splice(0);
      const req2Promise = sm.request("POST", "/", {}, {});
      assert.strictEqual(
        sm.state(),
        "verifying",
        "connection unused for more than verifyAgeMs",
      );
      const req2 = await req2Promise;
      assert.ok(
        serverReceivedPings.length > 0,
        "server received ping for verification",
      );
      assert.strictEqual(sm.state(), "open", "connection after verification");
      assert.strictEqual(
        req1Session,
        req2.session,
        "connection for second request is re-using connection from first request",
      );

      // clean up
      await new Promise<void>((resolve) =>
        req2.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
      );
      sm.abort();
      assert.strictEqual(sm.state(), "closed");
    });
    it("verify should keep the process alive", async () => {
      const worker = new Worker(
        "./dist/cjs/testdata/http2-session-manager-verify-ping.js",
        {
          workerData: server.getUrl(),
        },
      );
      worker.once("error", (err) => assert.fail(err));
      assert.strictEqual(
        await new Promise<string>((resolve) => {
          worker.once("message", (message) => {
            resolve(message as string);
          });
        }),
        "done",
      );
    });
    it("conn should response to session events after verify", async () => {
      const sm = new Http2SessionManager(server.getUrl(), {
        pingIntervalMs: 10, // intentionally short to trigger verification in tests
      });

      // issue a request and close it, then wait for more than pingIntervalMs to trigger a verification
      const req1 = await sm.request("POST", "/", {}, {});
      await new Promise<void>((resolve) =>
        req1.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
      );
      assert.strictEqual(
        sm.state(),
        "idle",
        "connection state after issuing a request and closing it",
      );
      await new Promise<void>((resolve) => setTimeout(resolve, 30));

      // issue another request, which should verify the connection first with successful PING within timeout
      serverReceivedPings.splice(0);
      const connectPromise = sm.connect();
      assert.strictEqual(
        sm.state(),
        "verifying",
        "connection unused for more than verifyAgeMs",
      );
      await connectPromise;
      assert.strictEqual(sm.state(), "idle", "connection after verification");

      assert.strictEqual(serverSessions.length, 1);
      serverSessions[0].close();
      await new Promise<void>((resolve) => setTimeout(resolve, 10));
      assert.strictEqual(
        sm.state(),
        "closed",
        "connection state after closing session",
      );
      // clean up
      sm.abort();
      assert.strictEqual(sm.state(), "closed");
    });
    it("should open a new connection if verification for the old one fails", async () => {
      const sm = new Http2SessionManager(server.getUrl(), {
        pingTimeoutMs: 0, // intentionally unsatisfiable
        pingIntervalMs: 10, // intentionally short to trigger verification in tests
      });

      // issue a request and close it, then wait for more than pingIntervalMs to trigger a verification
      const req1 = await sm.request("POST", "/", {}, {});
      const req1Session = req1.session;
      await new Promise<void>((resolve) =>
        req1.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
      );
      assert.strictEqual(
        sm.state(),
        "idle",
        "connection state after issuing a request and closing it",
      );
      await new Promise<void>((resolve) => setTimeout(resolve, 30)); // intentionally longer than pingIntervalMs

      // issue another request, which should verify the connection first
      const req2Promise = sm.request("POST", "/", {}, {});
      assert.strictEqual(
        sm.state(),
        "verifying",
        "connection unused for more than verifyAgeMs",
      );
      const req2 = await req2Promise;
      assert.strictEqual(sm.state(), "open", "connection after verification");
      assert.notStrictEqual(
        req1Session,
        req2.session,
        "connection for second request is using a new connection instead of the one from the first request",
      );

      // clean up
      await new Promise<void>((resolve) =>
        req2.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
      );
      sm.abort();
      assert.strictEqual(sm.state(), "closed");
    });
  });

  describe("with idleConnectionTimeoutMs", () => {
    it("should close an idle connection", async () => {
      const sm = new Http2SessionManager(server.getUrl(), {
        idleConnectionTimeoutMs: 5, // intentionally short for tests
      });
      const req1 = await sm.request("POST", "/", {}, {});
      await new Promise<void>((resolve) => {
        req1.close(http2.constants.NGHTTP2_NO_ERROR, resolve);
      });
      assert.strictEqual(sm.state(), "idle");
      await new Promise<void>((resolve) => setTimeout(resolve, 15)); // wait for idle timeout
      assert.strictEqual(
        sm.state(),
        "closed",
        "connection state after waiting for idle timeout",
      );

      // new request should open new connection without errors
      const req2 = await sm.request("POST", "/", {}, {});
      assert.strictEqual(sm.state(), "open");
      await new Promise<void>((resolve) => {
        req2.close(http2.constants.NGHTTP2_NO_ERROR, resolve);
      });
    });
  });

  describe("receiving a GOAWAY frame", () => {
    describe("with error ENHANCE_YOUR_CALM and debug data too_many_pings", () => {
      it("should use double the original pingIntervalMs for a second connection", async () => {
        const sm = new Http2SessionManager(server.getUrl(), {
          pingIntervalMs: 20, // intentionally small for faster tests
        });

        // issue a request to open a connection
        let req1Error: unknown;
        const req1 = await sm.request("POST", "/", {}, {});
        req1.on("error", (err) => {
          req1Error = err as unknown;
        });
        assert.strictEqual(
          sm.state(),
          "open",
          "connection state after issuing a request",
        );
        await new Promise<void>((resolve) => setTimeout(resolve, 10)); // wait for server to receive request

        // on the server, send a GOAWAY frame with code ENHANCE_YOUR_CALM and ASCII debug data "too_many_pings"
        assert.strictEqual(serverSessions.length, 1);
        const tooManyPingsAscii = Buffer.from("too_many_pings", "ascii");
        serverSessions[0].goaway(
          http2.constants.NGHTTP2_ENHANCE_YOUR_CALM,
          undefined,
          tooManyPingsAscii,
        );
        await new Promise<void>((resolve) => setTimeout(resolve, 10));

        // expect client session and stream to close
        assert.strictEqual(
          String(req1Error),
          "Error [ERR_HTTP2_SESSION_ERROR]: Session closed with error code 11",
          "node automatically destroys streams on GOAWAY",
        );
        assert.strictEqual(
          sm.state(),
          "error",
          "connection state after receiving GOAWAY",
        );
        assert.strictEqual(
          String(sm.error()),
          "ConnectError: [resource_exhausted] http/2 connection closed with error code ENHANCE_YOUR_CALM (0xb), too_many_pings, doubled the interval",
          "connect error wrapped by us with additional information",
        );

        // second connection should use double pingIntervalMs
        const req2 = await sm.request("POST", "/", {}, {});
        serverReceivedPings.splice(0);
        await new Promise<void>((resolve) => setTimeout(resolve, 20 + 10)); // original pingIntervalMs + leeway
        assert.strictEqual(
          serverReceivedPings.length,
          0,
          "pings sent within original pingIntervalMs + leeway",
        );

        // ideally, we should assert that a ping is sent within double pingIntervalMs,
        // but it makes the test very flaky

        // clean up
        await new Promise<void>((resolve) =>
          req2.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
        );
        sm.abort();
      });
    });
    describe("with NO_ERROR and an open stream", () => {
      it("should open a new session for a second request", async () => {
        const sm = new Http2SessionManager(server.getUrl());

        // issue a request to open a connection
        const req1 = await sm.request("POST", "/", {}, {});
        assert.strictEqual(
          sm.state(),
          "open",
          "connection state after issuing a request",
        );
        await new Promise<void>((resolve) => setTimeout(resolve, 10)); // wait for server to receive request

        // on the server, send a GOAWAY frame
        assert.strictEqual(serverSessions.length, 1);
        serverSessions[0].goaway(http2.constants.NGHTTP2_NO_ERROR);
        await new Promise<void>((resolve) => setTimeout(resolve, 10));
        assert.strictEqual(
          sm.state(),
          "open",
          "connection state after receiving GOAWAY",
        );

        // second request should open a new session
        const req2Promise = sm.request("POST", "/", {}, {});
        assert.strictEqual(
          sm.state(),
          "connecting",
          "connection state during second request",
        );
        const req2 = await req2Promise;
        assert.strictEqual(
          sm.state(),
          "open",
          "connection state after second request",
        );

        // clean up
        await new Promise<void>((resolve) =>
          req1.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
        );
        assert.strictEqual(
          serverSessions[0].closed,
          true,
          "first connection is closed after the stream is closed",
        );
        await new Promise<void>((resolve) =>
          req2.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
        );
        sm.abort();
      });
    });
    describe("with NO_ERROR and no open streams", () => {
      it("should close the session and open a new one for a second request", async () => {
        const sm = new Http2SessionManager(server.getUrl());

        // issue a request to open a connection, but close the request immediately
        const req1 = await sm.request("POST", "/", {}, {});
        await new Promise<void>((resolve) => setTimeout(resolve, 10));
        await new Promise<void>((resolve) =>
          req1.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
        );
        await new Promise<void>((resolve) => setTimeout(resolve, 10));
        assert.strictEqual(
          sm.state(),
          "idle",
          "connection state after issuing a request and closing it",
        );

        // on the server, send a GOAWAY frame, which emits "goaway" and "close"
        // on the client session
        assert.strictEqual(serverSessions.length, 1);
        serverSessions[0].goaway(http2.constants.NGHTTP2_NO_ERROR);
        await new Promise<void>((resolve) => setTimeout(resolve, 10));
        assert.strictEqual(
          sm.state(),
          "closed",
          "connection state after receiving GOAWAY",
        );

        // manager should not hold on to connection without streams
        assert.strictEqual(
          (sm as unknown as { shuttingDown: unknown[] }).shuttingDown.length,
          0,
        );

        // second request should open a new session
        const req2 = await sm.request("POST", "/", {}, {});
        assert.strictEqual(
          sm.state(),
          "open",
          "connection state after issuing a second request",
        );

        // clean up
        await new Promise<void>((resolve) =>
          req2.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
        );
        assert.strictEqual(
          sm.state(),
          "idle",
          "connection state after closing the second request",
        );

        // It is unclear why the first session does not close on the server, while
        // it does in the test below, where we only close the client stream after
        // receiving the GOAWAY.
        // For now, we have to close here so that the test suite does not time out
        // because of the open connection.
        await new Promise<void>((resolve) => serverSessions[0].close(resolve));

        sm.abort();
      });
    });
    describe("with NO_ERROR and open stream that is closed after receiving the GOAWAY", () => {
      it("should close the session and open a new one for a second request", async () => {
        const sm = new Http2SessionManager(server.getUrl());

        // issue a request to open a connection
        const req1 = await sm.request("POST", "/", {}, {});
        assert.strictEqual(
          sm.state(),
          "open",
          "connection state after issuing a request",
        );
        await new Promise<void>((resolve) => setTimeout(resolve, 10)); // wait for server to receive request

        // on the server, send a GOAWAY frame
        assert.strictEqual(serverSessions.length, 1);
        serverSessions[0].goaway(http2.constants.NGHTTP2_NO_ERROR);
        await new Promise<void>((resolve) => setTimeout(resolve, 10));

        // close the request
        await new Promise<void>((resolve) =>
          req1.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
        );
        await new Promise<void>((resolve) => setTimeout(resolve, 10));
        assert.strictEqual(
          sm.state(),
          "closed",
          "connection state after receiving GOAWAY and then closing the single open stream",
        );

        // second request should open a new session
        const req2 = await sm.request("POST", "/", {}, {});
        assert.strictEqual(
          sm.state(),
          "open",
          "connection state after issuing a second request",
        );

        // clean up
        await new Promise<void>((resolve) =>
          req2.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
        );
        assert.strictEqual(
          sm.state(),
          "idle",
          "connection state after closing the second request",
        );
        sm.abort();
      });
    });
    describe("with INTERNAL_ERROR and open stream", () => {
      it("should eventually go to the error state", async () => {
        const sm = new Http2SessionManager(server.getUrl());

        // issue a request to open a connection
        const req1 = await sm.request("POST", "/", {}, {});
        const req1ErrorPromise = new Promise<unknown>((resolve) =>
          req1.on("error", resolve),
        );
        assert.strictEqual(
          sm.state(),
          "open",
          "connection state after issuing a request",
        );
        await new Promise<void>((resolve) => setTimeout(resolve, 10)); // wait for server to receive request

        // on the server, send a GOAWAY frame
        assert.strictEqual(serverSessions.length, 1);
        serverSessions[0].goaway(http2.constants.NGHTTP2_INTERNAL_ERROR);

        // wait for the request to error
        const req1Error = await req1ErrorPromise;
        assert.strictEqual(
          String(req1Error),
          "Error [ERR_HTTP2_SESSION_ERROR]: Session closed with error code 2",
        );

        // the "error" event on the session is raised after the "error" event on
        // the stream, so the connection has not errored yet
        assert.strictEqual(
          sm.state(),
          "idle",
          "connection state immediately after receiving GOAWAY",
        );

        // wait for the "error" event on the session
        await new Promise<void>((resolve) => setTimeout(resolve, 50));
        assert.strictEqual(sm.state(), "error");
      });
      it("should open a new connection for a second request", async () => {
        const sm = new Http2SessionManager(server.getUrl());

        // issue a request to open a connection
        const req1 = await sm.request("POST", "/", {}, {});
        const req1ErrorPromise = new Promise<unknown>((resolve) =>
          req1.on("error", resolve),
        );
        assert.strictEqual(
          sm.state(),
          "open",
          "connection state after issuing a request",
        );
        await new Promise<void>((resolve) => setTimeout(resolve, 10)); // wait for server to receive request

        // on the server, send a GOAWAY frame
        assert.strictEqual(serverSessions.length, 1);
        serverSessions[0].goaway(http2.constants.NGHTTP2_INTERNAL_ERROR);

        // wait for the request to error
        const req1Error = await req1ErrorPromise;
        assert.strictEqual(
          String(req1Error),
          "Error [ERR_HTTP2_SESSION_ERROR]: Session closed with error code 2",
        );

        // the connection has not errored yet
        assert.strictEqual(sm.state(), "idle");

        // issue a second request
        const req2 = await sm.request("POST", "/", {}, {});
        assert.strictEqual(sm.state(), "open");
        await new Promise<void>((resolve) => setTimeout(resolve, 10)); // wait for server to receive request
        assert.strictEqual(serverSessions.length, 2);

        // clean up
        await new Promise<void>((resolve) =>
          req2.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
        );
        sm.abort();
        assert.strictEqual(sm.state(), "closed");
      });
    });
  });

  describe("ping frames", () => {
    describe("for open streams", () => {
      it("should be sent", async () => {
        const sm = new Http2SessionManager(server.getUrl(), {
          pingIntervalMs: 5, // intentionally short for faster tests
        });
        const req = await sm.request("POST", "/", {}, {});
        await new Promise<void>((resolve) => setTimeout(resolve, 50));
        assert.ok(serverReceivedPings.length >= 2);
        await new Promise<void>((resolve) =>
          req.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
        );
        sm.abort();
        assert.strictEqual(sm.state(), "closed");
      });
      it("should not be sent while client is receiving data", async () => {
        const sm = new Http2SessionManager(server.getUrl(), {
          pingIntervalMs: 10, // intentionally short for faster tests
        });
        const req = await sm.request("POST", "/", {}, {});
        for (let i = 0; i < 30; i++) {
          await new Promise<void>((resolve) => setTimeout(resolve, 1));
          sm.notifyResponseByteRead(req);
        }
        assert.strictEqual(serverReceivedPings.length, 0);

        // clean up
        await new Promise<void>((resolve) =>
          req.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
        );
        sm.abort();
        assert.strictEqual(sm.state(), "closed");
      });
      it("should destroy the connection if not answered in time", async () => {
        const sm = new Http2SessionManager(server.getUrl(), {
          pingIntervalMs: 5, // intentionally short for faster tests
          pingTimeoutMs: 0, // intentionally unsatisfiable
        });
        const req = await sm.request("POST", "/", {}, {});
        const reqErrors: unknown[] = [];
        req.on("error", (err) => reqErrors.push(err));
        await new Promise<void>((resolve) => setTimeout(resolve, 50));
        assert.strictEqual(reqErrors.length, 1);
        assert.strictEqual(
          String(reqErrors[0]),
          "ConnectError: [unavailable] PING timed out",
        );
        assert.strictEqual(sm.state(), "error");
        assert.strictEqual(
          String(sm.error()),
          "ConnectError: [unavailable] PING timed out",
        );
      });
    });

    describe("for connections without open streams", () => {
      it("should not be sent by default", async () => {
        const sm = new Http2SessionManager(server.getUrl(), {
          pingIntervalMs: 5, // intentionally short for faster tests
        });
        const req = await sm.request("POST", "/", {}, {});
        await new Promise<void>((resolve) =>
          req.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
        );
        assert.strictEqual(sm.state(), "idle");
        await new Promise<void>((resolve) => setTimeout(resolve, 50));
        assert.strictEqual(serverReceivedPings.length, 0);
        sm.abort();
      });
      it("should be sent if pingIdleConnection is enabled", async () => {
        const sm = new Http2SessionManager(server.getUrl(), {
          pingIntervalMs: 1, // intentionally short for faster tests
          pingIdleConnection: true,
        });
        const req = await sm.request("POST", "/", {}, {});
        await new Promise<void>((resolve) =>
          req.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
        );
        assert.strictEqual(sm.state(), "idle");
        await new Promise<void>((resolve) => setTimeout(resolve, 20));
        assert.ok(serverReceivedPings.length > 0);

        // cleanup
        sm.abort();
        assert.strictEqual(sm.state(), "closed");
      });
      it("should destroy the connection if not answered in time", async () => {
        const sm = new Http2SessionManager(server.getUrl(), {
          pingIntervalMs: 5, // intentionally short for faster tests
          pingTimeoutMs: 0, // intentionally unsatisfiable
          pingIdleConnection: true,
        });
        const req = await sm.request("POST", "/", {}, {});
        await new Promise<void>((resolve) =>
          req.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
        );
        await new Promise<void>((resolve) => setTimeout(resolve, 50));
        assert.strictEqual(sm.state(), "error");
        assert.strictEqual(
          String(sm.error()),
          "ConnectError: [unavailable] PING timed out",
        );
      });
    });
  });

  describe("idle timeout", () => {
    it("should close the connection", async () => {
      const sm = new Http2SessionManager(
        server.getUrl(),
        {
          idleConnectionTimeoutMs: 1, // intentionally small for faster tests
        },
        {},
      );

      const req = await sm.request("POST", "/", {}, {});
      assert.strictEqual(sm.state(), "open");
      await new Promise<void>((resolve) =>
        req.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
      );
      assert.strictEqual(sm.state(), "idle");
      await new Promise<void>((resolve) => setTimeout(resolve, 10));
      assert.strictEqual(sm.state(), "closed");
    });
  });

  describe("request against unresolvable host", () => {
    it("should reject", async () => {
      const sm = new Http2SessionManager(
        "https://unresolvable-host.some.domain",
      );
      const reqPromise = sm.request("POST", "/", {}, {});
      assert.strictEqual(sm.state(), "connecting");
      await assert.rejects(
        reqPromise,
        /getaddrinfo ENOTFOUND unresolvable-host.some.domain/,
      );
      assert.strictEqual(sm.state(), "error");
    });
    it("should reject if manager is aborted while connecting", async () => {
      const sm = new Http2SessionManager(
        "https://unresolvable-host.some.domain",
      );
      const reqPromise = sm.request("POST", "/", {}, {});
      assert.strictEqual(sm.state(), "connecting");
      sm.abort();
      await assert.rejects(reqPromise, /\[canceled] connection aborted/);
      assert.strictEqual(sm.state(), "closed");
    });
  });

  describe("connect", () => {
    it("should go from closed to idle", async () => {
      const sm = new Http2SessionManager(server.getUrl());
      assert.strictEqual(sm.state(), "closed");
      assert.strictEqual(await sm.connect(), "idle");
      sm.abort();
    });
    it("should go from error to idle", async () => {
      const sm = new Http2SessionManager(server.getUrl());
      sm.abort(new ConnectError("foo"));
      assert.strictEqual(sm.state(), "error");
      assert.strictEqual(await sm.connect(), "idle");
      sm.abort();
    });
    it("should go from idle to idle", async () => {
      const sm = new Http2SessionManager(server.getUrl());
      assert.strictEqual(await sm.connect(), "idle");
      assert.strictEqual(await sm.connect(), "idle");
      sm.abort();
    });
    it("should go from open to open", async () => {
      const sm = new Http2SessionManager(server.getUrl());
      const req = await sm.request("POST", "/", {}, {});
      assert.strictEqual(sm.state(), "open");
      assert.strictEqual(await sm.connect(), "open");

      // cleanup
      await new Promise<void>((resolve) =>
        req.close(http2.constants.NGHTTP2_NO_ERROR, resolve),
      );
      sm.abort();
    });
  });
});

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

import { useNodeServer } from "./use-node-server-helper.spec.js";
import * as http2 from "http2";
import { Http2SessionManager } from "./http2-session-manager.js";
import { ConnectError } from "@bufbuild/connect";

describe("Http2SessionManager", function () {
  const serverSessions: http2.ServerHttp2Session[] = [];
  const serverReceivedPings: Buffer[] = [];
  const server = useNodeServer(() => {
    serverSessions.splice(0);
    serverReceivedPings.splice(0);
    return http2
      .createServer()
      .on("session", (s) => serverSessions.push(s))
      .on("session", (s) =>
        s.on("ping", (payload: Buffer) => serverReceivedPings.push(payload))
      )
      .on("request", () => {
        // without the listener, node cancels streams
      });
  });

  it("should initially be closed", function () {
    const sm = new Http2SessionManager(server.getUrl());
    expect(sm.state()).toBe("closed");
  });

  it("should be closed after calling abort()", function () {
    const sm = new Http2SessionManager(server.getUrl());
    sm.abort();
    expect(sm.state()).toBe("closed");
  });

  it("should be error after calling abort() with an error", function () {
    const sm = new Http2SessionManager(server.getUrl());
    sm.abort(new ConnectError("foo"));
    expect(sm.state()).toBe("error");
    expect(String(sm.error())).toBe("ConnectError: [unknown] foo");
  });

  describe("first request", function () {
    it("should update state to 'connecting', 'open', and close cleanly after closing the stream", async function () {
      const sm = new Http2SessionManager(server.getUrl());
      const reqPromise = sm.request("POST", "/", {}, {});
      expect(sm.state()).toBe("connecting");
      const req = await reqPromise;
      expect(sm.state()).toBe("open");
      await new Promise<void>((resolve) =>
        req.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
      );
      sm.abort();
      expect(sm.state()).toBe("closed");
    });
    it("should update state to 'idle', when closing the stream", async function () {
      const sm = new Http2SessionManager(server.getUrl());
      const req = await sm.request("POST", "/", {}, {});
      await new Promise<void>((resolve) =>
        req.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
      );
      expect(sm.state()).toBe("idle");
      sm.abort();
      expect(sm.state()).toBe("closed");
    });
    it("should reject if manager is aborted while connecting", async function () {
      const sm = new Http2SessionManager(server.getUrl());
      const reqPromise = sm.request("POST", "/", {}, {});
      expect(sm.state()).toBe("connecting");
      sm.abort();
      await expectAsync(reqPromise).toBeRejectedWithError(
        /\[canceled] connection aborted/
      );
      expect(sm.state()).toBe("closed");
    });
    it("should error if manager aborts", async function () {
      const sm = new Http2SessionManager(server.getUrl());
      const req = await sm.request("POST", "/", {}, {});
      expect(sm.state()).toBe("open");
      let reqError: unknown;
      req.on("error", (err: unknown) => {
        reqError = err;
      });
      expect(req.destroyed).toBeFalse();
      sm.abort();
      // wait for next tick
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
      expect(req.destroyed).toBeTrue();
      expect(String(reqError)).toBe(
        "ConnectError: [canceled] connection aborted"
      );
      expect(sm.state()).toBe("closed");
    });
  });

  describe("second request", function () {
    it("should re-use the existing connection", async function () {
      const sm = new Http2SessionManager(server.getUrl());
      const req1 = await sm.request("POST", "/", {}, {});
      const req2 = await sm.request("POST", "/", {}, {});
      expect(req1.session === req2.session)
        .withContext(
          "session for second request is re-using connection from first request"
        )
        .toBeTrue();

      // clean up
      await new Promise<void>((resolve) =>
        req1.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
      );
      await new Promise<void>((resolve) =>
        req2.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
      );
      sm.abort();
    });
    it("should verify idle connection", async function () {
      const sm = new Http2SessionManager(server.getUrl(), {
        pingIntervalMs: 10, // intentionally short to trigger verification in tests
      });

      // issue a request and close it, then wait for more than pingIntervalMs to trigger a verification
      const req1 = await sm.request("POST", "/", {}, {});
      const req1Session = req1.session;
      await new Promise<void>((resolve) =>
        req1.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
      );
      expect(sm.state())
        .withContext("connection state after issuing a request and closing it")
        .toBe("idle");
      await new Promise<void>((resolve) => setTimeout(resolve, 30));

      // issue another request, which should verify the connection first with successful PING within timeout
      serverReceivedPings.splice(0);
      const req2Promise = sm.request("POST", "/", {}, {});
      expect(sm.state())
        .withContext("connection unused for more than verifyAgeMs")
        .toBe("verifying");
      const req2 = await req2Promise;
      expect(serverReceivedPings.length)
        .withContext("server received ping for verification")
        .toBeGreaterThan(0);
      expect(sm.state())
        .withContext("connection after verification")
        .toBe("open");
      expect(req1Session === req2.session)
        .withContext(
          "connection for second request is re-using connection from first request"
        )
        .toBeTrue();

      // clean up
      await new Promise<void>((resolve) =>
        req2.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
      );
      sm.abort();
      expect(sm.state()).toBe("closed");
    });
    it("should open a new connection if verification for the old one fails", async function () {
      const sm = new Http2SessionManager(server.getUrl(), {
        pingTimeoutMs: 0, // intentionally unsatisfiable
        pingIntervalMs: 10, // intentionally short to trigger verification in tests
      });

      // issue a request and close it, then wait for more than pingIntervalMs to trigger a verification
      const req1 = await sm.request("POST", "/", {}, {});
      const req1Session = req1.session;
      await new Promise<void>((resolve) =>
        req1.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
      );
      expect(sm.state())
        .withContext("connection state after issuing a request and closing it")
        .toBe("idle");
      await new Promise<void>((resolve) => setTimeout(resolve, 30)); // intentionally longer than pingIntervalMs

      // issue another request, which should verify the connection first
      const req2Promise = sm.request("POST", "/", {}, {});
      expect(sm.state())
        .withContext("connection unused for more than verifyAgeMs")
        .toBe("verifying");
      const req2 = await req2Promise;
      expect(sm.state())
        .withContext("connection after verification")
        .toBe("open");
      expect(req1Session !== req2.session)
        .withContext(
          "connection for second request is using a new connection instead of the one from the first request"
        )
        .toBeTrue();

      // clean up
      await new Promise<void>((resolve) =>
        req2.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
      );
      sm.abort();
      expect(sm.state()).toBe("closed");
    });
  });

  describe("with idleConnectionTimeoutMs", function () {
    it('should close an idle connection', async function () {
      const sm = new Http2SessionManager(server.getUrl(), {
        idleConnectionTimeoutMs: 5 // intentionally short for tests
      });
      const req1 = await sm.request("POST", "/", {}, {});
      await new Promise<void>(resolve => {
        req1.close(http2.constants.NGHTTP2_NO_ERROR, resolve);
      });
      expect(sm.state()).toBe("idle");
      await new Promise<void>(resolve => setTimeout(resolve, 15)); // wait for idle timeout
      expect(sm.state())
          .withContext("connection state after waiting for idle timeout")
          .toBe("closed");

      // new request should open new connection without errors
      const req2 = await sm.request("POST", "/", {}, {});
      expect(sm.state()).toBe("open");
      await new Promise<void>(resolve => {
        req2.close(http2.constants.NGHTTP2_NO_ERROR, resolve);
      });
    });
  });

  describe("receiving a GOAWAY frame", function () {
    describe("with error ENHANCE_YOUR_CALM and debug data too_many_pings", function () {
      it("should use double the original pingIntervalMs for a second connection", async function () {
        const sm = new Http2SessionManager(server.getUrl(), {
          pingIntervalMs: 20, // intentionally small for faster tests
        });

        // issue a request to open a connection
        let req1Error: unknown;
        const req1 = await sm.request("POST", "/", {}, {});
        req1.on("error", (err) => (req1Error = err as unknown));
        expect(sm.state())
          .withContext("connection state after issuing a request")
          .toBe("open");
        await new Promise<void>((resolve) => setTimeout(resolve, 10)); // wait for server to receive request

        // on the server, send a GOAWAY frame with code ENHANCE_YOUR_CALM and ASCII debug data "too_many_pings"
        expect(serverSessions.length).toBe(1);
        const tooManyPingsAscii = Buffer.from("too_many_pings", "ascii");
        serverSessions[0].goaway(
          http2.constants.NGHTTP2_ENHANCE_YOUR_CALM,
          undefined,
          tooManyPingsAscii
        );
        await new Promise<void>((resolve) => setTimeout(resolve, 10));

        // expect client session and stream to close
        expect(String(req1Error))
          .withContext("node automatically destroys streams on GOAWAY")
          .toBe(
            "Error [ERR_HTTP2_SESSION_ERROR]: Session closed with error code 11"
          );
        expect(sm.state())
          .withContext("connection state after receiving GOAWAY")
          .toBe("error");
        expect(String(sm.error()))
          .withContext(
            "connect error wrapped by us with additional information"
          )
          .toBe(
            "ConnectError: [resource_exhausted] http/2 connection closed with error code ENHANCE_YOUR_CALM (0xb), too_many_pings, doubled the interval"
          );

        // second connection should use double pingIntervalMs
        const req2 = await sm.request("POST", "/", {}, {});
        serverReceivedPings.splice(0);
        await new Promise<void>((resolve) => setTimeout(resolve, 20 + 10)); // original pingIntervalMs + leeway
        expect(serverReceivedPings.length)
          .withContext("pings sent within original pingIntervalMs + leeway")
          .toBe(0);

        // ideally, we should assert that a ping is sent within double pingIntervalMs,
        // but it makes the test very flaky

        // clean up
        await new Promise<void>((resolve) =>
          req2.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
        );
        sm.abort();
      });
    });
    describe("with NO_ERROR and an open stream", function () {
      it("should open a new session for a second request", async function () {
        const sm = new Http2SessionManager(server.getUrl());

        // issue a request to open a connection
        const req1 = await sm.request("POST", "/", {}, {});
        expect(sm.state())
          .withContext("connection state after issuing a request")
          .toBe("open");
        await new Promise<void>((resolve) => setTimeout(resolve, 10)); // wait for server to receive request

        // on the server, send a GOAWAY frame
        expect(serverSessions.length).toBe(1);
        serverSessions[0].goaway(http2.constants.NGHTTP2_NO_ERROR);
        await new Promise<void>((resolve) => setTimeout(resolve, 10));
        expect(sm.state())
          .withContext("connection state after receiving GOAWAY")
          .toBe("open");

        // second request should open a new session
        const req2Promise = sm.request("POST", "/", {}, {});
        expect(sm.state())
          .withContext("connection state during second request")
          .toBe("connecting");
        const req2 = await req2Promise;
        expect(sm.state())
          .withContext("connection state after second request")
          .toBe("open");

        // clean up
        await new Promise<void>((resolve) =>
          req1.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
        );
        expect(serverSessions[0].closed)
          .withContext("first connection is closed after the stream is closed")
          .toBeTrue();
        await new Promise<void>((resolve) =>
          req2.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
        );
        sm.abort();
      });
    });
    describe("with NO_ERROR and no open streams", function () {
      it("should close the session and open a new one for a second request", async function () {
        const sm = new Http2SessionManager(server.getUrl());

        // issue a request to open a connection, but close the request immediately
        const req1 = await sm.request("POST", "/", {}, {});
        await new Promise<void>((resolve) => setTimeout(resolve, 10));
        await new Promise<void>((resolve) =>
          req1.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
        );
        await new Promise<void>((resolve) => setTimeout(resolve, 10));
        expect(sm.state())
          .withContext(
            "connection state after issuing a request and closing it"
          )
          .toBe("idle");

        // on the server, send a GOAWAY frame, which emits "goaway" and "close"
        // on the client session
        expect(serverSessions.length).toBe(1);
        serverSessions[0].goaway(http2.constants.NGHTTP2_NO_ERROR);
        await new Promise<void>((resolve) => setTimeout(resolve, 10));
        expect(sm.state())
          .withContext("connection state after receiving GOAWAY")
          .toBe("closed");

        // second request should open a new session
        const req2 = await sm.request("POST", "/", {}, {});
        expect(sm.state())
          .withContext("connection state after issuing a second request")
          .toBe("open");

        // clean up
        await new Promise<void>((resolve) =>
          req2.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
        );
        expect(sm.state())
          .withContext("connection state after closing the second request")
          .toBe("idle");

        // It is unclear why the first session does not close on the server, while
        // it does in the test below, where we only close the client stream after
        // receiving the GOAWAY.
        // For now, we have to close here so that the test suite does not time out
        // because of the open connection.
        await new Promise<void>((resolve) => serverSessions[0].close(resolve));

        sm.abort();
      });
    });
    describe("with NO_ERROR and open stream that is closed after receiving the GOAWAY", function () {
      it("should close the session and open a new one for a second request", async function () {
        const sm = new Http2SessionManager(server.getUrl());

        // issue a request to open a connection
        const req1 = await sm.request("POST", "/", {}, {});
        expect(sm.state())
          .withContext("connection state after issuing a request")
          .toBe("open");
        await new Promise<void>((resolve) => setTimeout(resolve, 10)); // wait for server to receive request

        // on the server, send a GOAWAY frame
        expect(serverSessions.length).toBe(1);
        serverSessions[0].goaway(http2.constants.NGHTTP2_NO_ERROR);
        await new Promise<void>((resolve) => setTimeout(resolve, 10));

        // close the request
        await new Promise<void>((resolve) =>
          req1.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
        );
        await new Promise<void>((resolve) => setTimeout(resolve, 10));
        expect(sm.state())
          .withContext(
            "connection state after receiving GOAWAY and then closing the single open stream"
          )
          .toBe("closed");

        // second request should open a new session
        const req2 = await sm.request("POST", "/", {}, {});
        expect(sm.state())
          .withContext("connection state after issuing a second request")
          .toBe("open");

        // clean up
        await new Promise<void>((resolve) =>
          req2.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
        );
        expect(sm.state())
          .withContext("connection state after closing the second request")
          .toBe("idle");
        sm.abort();
      });
    });
  });

  describe("ping frames", function () {
    describe("for open streams", function () {
      it("should be sent", async function () {
        const sm = new Http2SessionManager(server.getUrl(), {
          pingIntervalMs: 5, // intentionally short for faster tests
        });
        const req = await sm.request("POST", "/", {}, {});
        await new Promise<void>((resolve) => setTimeout(resolve, 50));
        expect(serverReceivedPings.length).toBeGreaterThanOrEqual(2);
        await new Promise<void>((resolve) =>
          req.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
        );
        sm.abort();
        expect(sm.state()).toBe("closed");
      });
      it("should not be sent while client is receiving data", async function () {
        const sm = new Http2SessionManager(server.getUrl(), {
          pingIntervalMs: 10, // intentionally short for faster tests
        });
        const req = await sm.request("POST", "/", {}, {});
        for (let i = 0; i < 30; i++) {
          await new Promise<void>((resolve) => setTimeout(resolve, 1));
          sm.notifyResponseByteRead(req);
        }
        expect(serverReceivedPings.length).toBe(0);

        // clean up
        await new Promise<void>((resolve) =>
          req.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
        );
        sm.abort();
        expect(sm.state()).toBe("closed");
      });
      it("should destroy the connection if not answered in time", async function () {
        const sm = new Http2SessionManager(server.getUrl(), {
          pingIntervalMs: 5, // intentionally short for faster tests
          pingTimeoutMs: 0, // intentionally unsatisfiable
        });
        const req = await sm.request("POST", "/", {}, {});
        const reqErrors: unknown[] = [];
        req.on("error", (err) => reqErrors.push(err));
        await new Promise<void>((resolve) => setTimeout(resolve, 50));
        expect(reqErrors.length).toBe(1);
        expect(String(reqErrors[0])).toBe(
          "ConnectError: [unavailable] PING timed out"
        );
        expect(sm.state()).toBe("error");
        expect(String(sm.error())).toBe(
          "ConnectError: [unavailable] PING timed out"
        );
      });
    });

    describe("for connections without open streams", function () {
      it("should not be sent by default", async function () {
        const sm = new Http2SessionManager(server.getUrl(), {
          pingIntervalMs: 5, // intentionally short for faster tests
        });
        const req = await sm.request("POST", "/", {}, {});
        await new Promise<void>((resolve) =>
          req.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
        );
        expect(sm.state()).toBe("idle");
        await new Promise<void>((resolve) => setTimeout(resolve, 50));
        expect(serverReceivedPings.length).toBe(0);
        sm.abort();
      });
      it("should be sent if pingIdleConnection is enabled", async function () {
        const sm = new Http2SessionManager(server.getUrl(), {
          pingIntervalMs: 1, // intentionally short for faster tests
          pingIdleConnection: true,
        });
        const req = await sm.request("POST", "/", {}, {});
        await new Promise<void>((resolve) =>
          req.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
        );
        expect(sm.state()).toBe("idle");
        await new Promise<void>((resolve) => setTimeout(resolve, 20));
        expect(serverReceivedPings.length).toBeGreaterThan(0);

        // cleanup
        sm.abort();
        expect(sm.state()).toBe("closed");
      });
      it("should destroy the connection if not answered in time", async function () {
        const sm = new Http2SessionManager(server.getUrl(), {
          pingIntervalMs: 5, // intentionally short for faster tests
          pingTimeoutMs: 0, // intentionally unsatisfiable
          pingIdleConnection: true,
        });
        const req = await sm.request("POST", "/", {}, {});
        await new Promise<void>((resolve) =>
          req.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
        );
        await new Promise<void>((resolve) => setTimeout(resolve, 50));
        expect(sm.state()).toBe("error");
        expect(String(sm.error())).toBe(
          "ConnectError: [unavailable] PING timed out"
        );
      });
    });
  });

  describe("idle timeout", function () {
    it("should close the connection", async function () {
      const sm = new Http2SessionManager(
        server.getUrl(),
        {
          idleConnectionTimeoutMs: 1, // intentionally small for faster tests
        },
        {}
      );

      const req = await sm.request("POST", "/", {}, {});
      expect(sm.state()).toBe("open");
      await new Promise<void>((resolve) =>
        req.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
      );
      expect(sm.state()).toBe("idle");
      await new Promise<void>((resolve) => setTimeout(resolve, 10));
      expect(sm.state()).toBe("closed");
    });
  });

  describe("request against unresolvable host", function () {
    it("should reject", async function () {
      const sm = new Http2SessionManager(
        "https://unresolvable-host.some.domain"
      );
      const reqPromise = sm.request("POST", "/", {}, {});
      expect(sm.state()).toBe("connecting");
      await expectAsync(reqPromise).toBeRejectedWithError(
        /getaddrinfo ENOTFOUND unresolvable-host.some.domain/
      );
      expect(sm.state()).toBe("error");
    });
    it("should reject if manager is aborted while connecting", async function () {
      const sm = new Http2SessionManager(
        "https://unresolvable-host.some.domain"
      );
      const reqPromise = sm.request("POST", "/", {}, {});
      expect(sm.state()).toBe("connecting");
      sm.abort();
      await expectAsync(reqPromise).toBeRejectedWithError(
        /\[canceled] connection aborted/
      );
      expect(sm.state()).toBe("closed");
    });
  });

  describe("connect", function () {
    it("should go from closed to idle", async function () {
      const sm = new Http2SessionManager(server.getUrl());
      expect(sm.state()).toBe("closed");
      await expectAsync(sm.connect()).toBeResolvedTo("idle");
      sm.abort();
    });
    it("should go from error to idle", async function () {
      const sm = new Http2SessionManager(server.getUrl());
      sm.abort(new ConnectError("foo"));
      expect(sm.state()).toBe("error");
      await expectAsync(sm.connect()).toBeResolvedTo("idle");
      sm.abort();
    });
    it("should go from idle to idle", async function () {
      const sm = new Http2SessionManager(server.getUrl());
      await expectAsync(sm.connect()).toBeResolvedTo("idle");
      await expectAsync(sm.connect()).toBeResolvedTo("idle");
      sm.abort();
    });
    it("should go from open to open", async function () {
      const sm = new Http2SessionManager(server.getUrl());
      const req = await sm.request("POST", "/", {}, {});
      expect(sm.state()).toBe("open");
      await expectAsync(sm.connect()).toBeResolvedTo("open");

      // cleanup
      await new Promise<void>((resolve) =>
        req.close(http2.constants.NGHTTP2_NO_ERROR, resolve)
      );
      sm.abort();
    });
  });
});

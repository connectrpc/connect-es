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
import { Code, ConnectError } from "@bufbuild/connect";

export interface Http2SessionOptions {
  /**
   * The interval to send PING frames to keep a connection alive. The interval
   * is reset whenever a stream receives data. If a PING frame is not responded
   * to within pingTimeoutMs, the connection and all open streams close.
   *
   * By default, no PING frames are sent. If a value is provided, PING frames
   * are sent only for connections that have open streams, unless
   * pingIdleConnections is enabled.
   *
   * Sensible values can be between 10 seconds and 2 hours, depending on your
   * infrastructure.
   *
   * This option is equivalent to GRPC_ARG_KEEPALIVE_TIME_MS in gRPC Core.
   */
  pingIntervalMs?: number;

  /**
   * Enable PING frames for connections that are have no open streams.
   * This option is only effective if a value for pingIntervalMs is provided.
   *
   * Note that it may not be necessary to enable this option. If a request is
   * made on a connection that has not been used for longer than pingIntervalMs,
   * a PING frame is sent to verify that the connection is still alive, and a
   * new connection is opened transparently if necessary.
   *
   * Defaults to false.
   *
   * This option is equivalent to GRPC_ARG_KEEPALIVE_PERMIT_WITHOUT_CALLS in
   * gRPC Core.
   */
  pingIdleConnection?: boolean;

  /**
   * Timeout for PING frames. If a PING is not answered within this time, the
   * connection is considered dead.
   *
   * Defaults to 15 seconds. This option is only used if a value for
   * pingIntervalMs is provided.
   *
   * This option is equivalent to GRPC_ARG_KEEPALIVE_TIME_MS in gRPC Core.
   */
  pingTimeoutMs?: number;

  /**
   * Automatically close a connection if the time since the last request stream
   * exceeds this value.
   *
   * Defaults to 5 minutes.
   *
   * This option is equivalent to GRPC_ARG_CLIENT_IDLE_TIMEOUT_MS of gRPC core.
   */
  idleConnectionTimeoutMs?: number;
}

// TODO document
/**
 * Manages a HTTP/2 connection with Basic Keepalive as described in
 * https://github.com/grpc/proposal/blob/0ba0c1905050525f9b0aee46f3f23c8e1e515489/A8-client-side-keepalive.md#basic-keepalive
 */
export class Http2SessionManager {
  /**
   * The host this session manager connect to.
   */
  authority: string;

  /**
   * The current state of the connection:
   *
   * - "closed"
   *   The connection is closed, or no connection has been opened yet.
   * - connecting
   *   Currently establishing a connection.
   *
   * - "open"
   *   A connection is open and has open streams. PING frames are sent every
   *   pingIntervalMs, unless a stream received data.
   *   If a PING frame is not responded to within pingTimeoutMs, the connection
   *   and all open streams close.
   *
   * - "idle"
   *   A connection is open, but it does not have any open streams.
   *   If pingIdleConnection is enabled, PING frames are used to keep the
   *   connection alive, similar to an "open" connection.
   *   If a connection is idle for longer than idleConnectionTimeoutMs, it closes.
   *   If a request is made on an idle connection that has not been used for
   *   longer than pingIntervalMs, the connection is verified.
   *
   * - "verifying"
   *   Verifying a connection after a long period of inactivity before issuing a
   *   request. A PING frame is sent, and if it times out within pingTimeoutMs, a
   *   new connection is opened.
   *
   * - "error"
   *   The connection is closed because of a transient error. A connection
   *   may have failed to reach the host, or the connection may have died,
   *   or it may have been aborted.
   */
  state(): "closed" | "connecting" | "open" | "idle" | "verifying" | "error" {
    if (this.s.t == "ready") {
      return this.s.streamCount() > 0 ? "open" : "idle";
    }
    return this.s.t;
  }

  /**
   * Returns the error object if the connection is in the "error" state,
   * `undefined` otherwise.
   */
  error(): unknown {
    if (this.s.t == "error") {
      return this.s.reason;
    }
    return undefined;
  }

  private s:
    | StateClosed
    | StateError
    | StateConnecting
    | StateVerifying
    | StateReady = closed();

  private readonly http2SessionOptions:
    | http2.ClientSessionOptions
    | http2.SecureClientSessionOptions
    | undefined;

  private readonly options: Required<Http2SessionOptions>;

  public constructor(
    authority: URL | string,
    pingOptions?: Http2SessionOptions,
    http2SessionOptions?:
      | http2.ClientSessionOptions
      | http2.SecureClientSessionOptions
  ) {
    this.authority = new URL(authority).origin;
    this.http2SessionOptions = http2SessionOptions;
    this.options = {
      pingIntervalMs: pingOptions?.pingIntervalMs ?? Number.POSITIVE_INFINITY,
      pingTimeoutMs: pingOptions?.pingTimeoutMs ?? 1000 * 15,
      pingIdleConnection: pingOptions?.pingIdleConnection ?? false,
      idleConnectionTimeoutMs:
        pingOptions?.idleConnectionTimeoutMs ?? 1000 * 60 * 5,
    };
  }

  /**
   * Open a connection if none exists, and verify and existing connection if
   * necessary.
   */
  async connect(): Promise<"open" | "idle" | "error"> {
    try {
      const ready = await this.gotoReady();
      return ready.streamCount() > 0 ? "open" : "idle";
    } catch (e) {
      return "error";
    }
  }

  /**
   * Issue a request.
   *
   * This method automatically opens a connection if none exists, and verifies
   * an existing connection if necessary. It calls http2.ClientHttp2Session.request(),
   * and keeps track of all open http2.ClientHttp2Stream.
   *
   * Clients must call notifyResponseByteRead() whenever they successfully read
   * data from the http2.ClientHttp2Stream.
   */
  async request(
    method: string,
    path: string,
    headers: http2.OutgoingHttpHeaders,
    options: Omit<http2.ClientSessionRequestOptions, "signal">
  ): Promise<http2.ClientHttp2Stream> {
    const ready = await this.gotoReady();
    const stream = ready.conn.request(
      {
        ...headers,
        ":method": method,
        ":path": path,
      },
      options
    );
    ready.registerRequest(stream);
    return stream;
  }

  /**
   * Notify the manager of a successful read from a http2.ClientHttp2Stream.
   *
   * Clients must call this function whenever they successfully read data from
   * a http2.ClientHttp2Stream obtained from request(). This informs the
   * keep-alive logic that the connection is alive, and prevents it from sending
   * unnecessary PING frames.
   */
  notifyResponseByteRead(stream: http2.ClientHttp2Stream): void {
    if (this.s.t == "ready") {
      this.s.responseByteRead(stream);
    }
  }

  /**
   * If there is an open connection, close it. This also closes any open streams.
   */
  abort(reason?: Error): void {
    const err = reason ?? new ConnectError("connection aborted", Code.Canceled);
    this.s.abort?.(err);
    this.setState(closedOrError(err));
  }

  private async gotoReady() {
    if (this.s.t == "ready") {
      if (this.s.requiresVerify()) {
        this.setState(
          verify(this.s, this.options, this.authority, this.http2SessionOptions)
        );
      }
    } else if (this.s.t == "closed" || this.s.t == "error") {
      this.setState(connect(this.authority, this.http2SessionOptions));
    }
    while (this.s.t !== "ready") {
      if (this.s.t === "error") {
        throw this.s.reason;
      }
      if (this.s.t === "connecting") {
        await this.s.conn;
      }
      if (this.s.t === "verifying") {
        await this.s.verified;
      }
    }
    return this.s;
  }

  private setState(
    this: Http2SessionManager,
    state:
      | StateClosed
      | StateError
      | StateConnecting
      | StateVerifying
      | StateReady
  ): void {
    this.s.onExitState?.();
    switch (state.t) {
      case "connecting":
        state.conn.then(
          (value) => {
            this.setState(ready(value, this.options));
          },
          (reason) => {
            this.setState(closedOrError(reason));
          }
        );
        break;
      case "verifying":
        state.verified.then(
          (value) => {
            if ("t" in value) {
              this.setState(value);
            } else {
              this.setState(ready(value, this.options));
            }
          },
          (reason) => {
            this.setState(closedOrError(reason));
          }
        );
        break;
      case "ready":
        state.onClose = () => this.setState(closed());
        state.onError = (err) => this.setState(closedOrError(err));
        break;
      case "closed":
        break;
      case "error":
        break;
    }
    this.s = state;
  }
}

interface StateCommon {
  /**
   * A unique string that serves as a discriminator for each state type.
   */
  readonly t: string;
  /**
   * Abort this state, cancelling any work, and terminating any connection.
   */
  abort?: (reason?: Error) => void;
  /**
   * Called when the manager is leaving this state.
   */
  onExitState?: () => void;
}

/**
 * The connection is closed, or no connection has been opened yet.
 */
interface StateClosed extends StateCommon {
  readonly t: "closed";
}

function closed(): StateClosed {
  return {
    t: "closed",
  };
}

/**
 * The connection is closed because of a transient error.
 * A connection may have failed to reach the host, or the connection may have
 * died, or it may have been aborted.
 */
interface StateError extends StateCommon {
  readonly t: "error";
  /**
   * The error.
   */
  readonly reason: unknown;
}

function error(reason: unknown): StateError {
  return {
    t: "error",
    reason,
  };
}

function closedOrError(reason: unknown) {
  const isCancel =
    reason instanceof ConnectError &&
    ConnectError.from(reason).code == Code.Canceled;
  return isCancel ? closed() : error(reason);
}

/**
 * The manager is currently establishing a connection.
 */
interface StateConnecting extends StateCommon {
  readonly t: "connecting";

  /**
   * A promise for the new connection that resolves if the connection was
   * established, but rejects if the connection failed or the state was aborted.
   */
  readonly conn: Promise<http2.ClientHttp2Session>;
}

function connect(
  authority: string,
  http2SessionOptions:
    | http2.ClientSessionOptions
    | http2.SecureClientSessionOptions
    | undefined
): StateConnecting {
  let resolve: ((value: http2.ClientHttp2Session) => void) | undefined;
  let reject: ((reason: unknown) => void) | undefined;
  const conn = new Promise<http2.ClientHttp2Session>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  const newConn = http2.connect(authority, http2SessionOptions);
  newConn.on("connect", onConnect);
  newConn.on("error", onError);

  function onConnect() {
    resolve?.(newConn);
    cleanup();
  }

  function onError(err: unknown) {
    reject?.(err);
    cleanup();
  }

  function cleanup() {
    newConn.off("connect", onConnect);
    newConn.off("error", onError);
  }

  return {
    t: "connecting",
    conn,
    abort(reason) {
      if (!newConn.destroyed) {
        newConn.destroy(undefined, http2.constants.NGHTTP2_CANCEL);
      }
      // According to the documentation, destroy() should immediately terminate
      // the session and the socket, but we still receive a "connect" event.
      // We must not resolve a broken connection, so we reject it manually here.
      reject?.(reason);
    },
    onExitState() {
      cleanup();
    },
  } satisfies StateConnecting;
}

interface StateVerifying extends StateCommon {
  readonly t: "verifying";

  /**
   * The existing connection (StateReady) if it has been successfully verified
   * with a PING frame. A new connection otherwise.
   */
  readonly verified: Promise<StateReady | StateConnecting>;
}

export function verify(
  stateReady: StateReady,
  options: Required<Http2SessionOptions>,
  authority: string,
  http2SessionOptions:
    | http2.ClientSessionOptions
    | http2.SecureClientSessionOptions
    | undefined
): StateVerifying {
  const verified = stateReady.ping().then((success) => {
    if (success) {
      return stateReady;
    }
    // ping() has destroyed the old connection
    return connect(authority, http2SessionOptions);
  });
  return {
    t: "verifying",
    verified,
    abort(reason) {
      stateReady.abort?.(reason);
    },
  };
}

interface StateReady extends StateCommon {
  readonly t: "ready";

  /**
   * The open connection that is ready to use, but might require verification.
   */
  readonly conn: http2.ClientHttp2Session;

  /**
   * Returns the number of open streams.
   */
  streamCount(): number;

  /**
   * Returns true if the connection should be verified before use, because it
   * has not received a PING response or response bytes for longer than
   * pingIntervalMs.
   */
  requiresVerify(): boolean;

  /**
   * Register a stream, so that we can keep track of open streams, and keep the
   * connection alive with PING frames while streams are open.
   */
  registerRequest(stream: http2.ClientHttp2Stream): void;

  /**
   * Notify the keep-alive logic about received response bytes. A received byte
   * is proof that the connection is alive, resets the interval for PING frames.
   */
  responseByteRead(stream: http2.ClientHttp2Stream): void;

  /**
   * Send a PING frame, resolve to true if it is responded to in time, resolve
   * to false otherwise (and closes the connection).
   */
  ping(): Promise<boolean>;

  /**
   * Called when the connection closes without error.
   */
  onClose: (() => void) | undefined;

  /**
   * Called when the connection closes with an error.
   */
  onError: ((err: Error) => void) | undefined;
}

function ready(
  conn: http2.ClientHttp2Session,
  options: Required<Http2SessionOptions>
): StateReady {
  // the last time we were sure that the connection is alive, via a PING
  // response, or via received response bytes
  let lastAliveAt = Date.now();
  // how many streams are currently open on this session
  let streamCount = 0;
  // timer for the keep-alive interval
  let pingIntervalId: ReturnType<typeof setTimeout> | undefined;
  // timer for waiting for a PING response
  let pingTimeoutId: ReturnType<typeof setTimeout> | undefined;
  // keep track of GOAWAY with ENHANCE_YOUR_CALM and with debug data too_many_pings
  let receivedGoAwayEnhanceYourCalmTooManyPings = false;
  // timer for closing connections without open streams, must be initialized
  let idleTimeoutId: ReturnType<typeof setTimeout> | undefined;
  resetIdleTimeout();

  const state: StateReady = {
    t: "ready",
    conn,
    streamCount() {
      return streamCount;
    },
    requiresVerify(): boolean {
      const elapsedMs = Date.now() - lastAliveAt;
      return elapsedMs > options.pingIntervalMs;
    },
    onClose: undefined,
    onError: undefined,
    registerRequest(stream: http2.ClientHttp2Stream): void {
      streamCount++;
      if (streamCount == 1) {
        resetPingInterval(); // reset to ping with the appropriate interval for "open"
        stopIdleTimeout();
      }
      stream.once("response", () => {
        lastAliveAt = Date.now();
        resetPingInterval();
      });
      stream.once("close", () => {
        streamCount--;
        if (streamCount == 0) {
          resetPingInterval(); // reset to ping with the appropriate interval for "idle"
          resetIdleTimeout();
        }
      });
    },
    responseByteRead(stream: http2.ClientHttp2Stream) {
      if (stream.session !== conn) {
        return;
      }
      if (conn.closed || conn.destroyed) {
        return;
      }
      if (streamCount <= 0) {
        return;
      }
      lastAliveAt = Date.now();
      resetPingInterval();
    },
    ping() {
      return new Promise<boolean>((resolve) => {
        commonPing(() => resolve(true));
        conn.once("error", () => resolve(false));
      });
    },
    abort(reason) {
      if (!conn.destroyed) {
        conn.once("error", () => {
          // conn.destroy() may raise an error after onExitState() was called
          // and our error listeners are removed.
          // We attach this one to swallow uncaught exceptions.
        });
        conn.destroy(reason, http2.constants.NGHTTP2_CANCEL);
      }
    },
    onExitState() {
      cleanup();
      this.onError = undefined;
      this.onClose = undefined;
    },
  };

  // start or restart the ping interval
  function resetPingInterval() {
    stopPingInterval();
    if (streamCount > 0 || options.pingIdleConnection) {
      pingIntervalId = safeSetTimeout(onPingInterval, options.pingIntervalMs);
    }
  }

  function stopPingInterval() {
    clearTimeout(pingIntervalId);
    clearTimeout(pingTimeoutId);
  }

  function onPingInterval() {
    commonPing(resetPingInterval);
  }

  function commonPing(onSuccess: () => void) {
    clearTimeout(pingTimeoutId);
    pingTimeoutId = safeSetTimeout(() => {
      conn.destroy(
        new ConnectError("PING timed out", Code.Unavailable),
        http2.constants.NGHTTP2_CANCEL
      );
    }, options.pingTimeoutMs);
    conn.ping((err, duration) => {
      clearTimeout(pingTimeoutId);
      if (err !== null) {
        // We will receive an ERR_HTTP2_PING_CANCEL here if we destroy the
        // connection with a pending ping.
        // We might also see other errors, but they should be picked up by the
        // "error" event listener.
        return;
      }
      if (duration > options.pingTimeoutMs) {
        // setTimeout is not precise, and HTTP/2 pings take less than 1ms in
        // tests.
        conn.destroy(
          new ConnectError("PING timed out", Code.Unavailable),
          http2.constants.NGHTTP2_CANCEL
        );
        return;
      }
      lastAliveAt = Date.now();
      onSuccess();
    });
  }

  function stopIdleTimeout() {
    clearTimeout(idleTimeoutId);
  }

  function resetIdleTimeout() {
    idleTimeoutId = safeSetTimeout(
      onIdleTimeout,
      options.idleConnectionTimeoutMs
    );
  }

  function onIdleTimeout() {
    conn.close();
    onClose(); // trigger a state change right away so we are not open to races
  }

  function onGoaway(
    errorCode: number,
    lastStreamID: number,
    opaqueData: Buffer
  ) {
    const tooManyPingsAscii = Buffer.from("too_many_pings", "ascii");
    if (
      errorCode === http2.constants.NGHTTP2_ENHANCE_YOUR_CALM &&
      opaqueData.equals(tooManyPingsAscii)
    ) {
      // double pingIntervalMs, following the last paragraph of https://github.com/grpc/proposal/blob/0ba0c1905050525f9b0aee46f3f23c8e1e515489/A8-client-side-keepalive.md#basic-keepalive
      options.pingIntervalMs = options.pingIntervalMs * 2;
      receivedGoAwayEnhanceYourCalmTooManyPings = true;
    }
  }

  function onClose() {
    cleanup();
    state.onClose?.();
  }

  function onError(err: Error) {
    cleanup();
    if (receivedGoAwayEnhanceYourCalmTooManyPings) {
      // We cannot prevent node from destroying session and streams with its own
      // error that does not carry debug data, but at least we can wrap the error
      // we surface on the manager.
      const ce = new ConnectError(
        `http/2 connection closed with error code ENHANCE_YOUR_CALM (0x${http2.constants.NGHTTP2_ENHANCE_YOUR_CALM.toString(
          16
        )}), too_many_pings, doubled the interval`,
        Code.ResourceExhausted
      );
      state.onError?.(ce);
    } else {
      state.onError?.(err);
    }
  }

  function cleanup() {
    stopPingInterval();
    stopIdleTimeout();
    conn.off("error", onError);
    conn.off("close", onClose);
    conn.off("goaway", onGoaway);
  }

  conn.on("error", onError);
  conn.on("close", onClose);
  conn.on("goaway", onGoaway);

  return state;
}

/**
 * setTimeout(), but simply ignores values larger than the maximum supported
 * value (signed 32-bit integer) instead of calling the callback right away.
 */
function safeSetTimeout(
  callback: () => void,
  ms: number
): ReturnType<typeof setTimeout> | undefined {
  if (ms > 0x7fffffff) {
    return;
  }
  return setTimeout(callback, ms);
}

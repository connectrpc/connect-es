import { createConnectTransport } from "@bufbuild/connect-web-next";
import * as http2 from "http2";
import * as http from "http";
import {
  Code,
  ConnectError,
  createServiceHandlers,
  mergeHandlers,
  Transport,
} from "@bufbuild/connect-node";
import { TestService } from "../gen/grpc/testing/test_connectweb.js";
import type { crosstestTransports } from "./crosstestserver.js";
import { interop } from "./interop.js";

/* eslint-disable @typescript-eslint/require-await,require-yield */

const handlers = createServiceHandlers(
  TestService,
  {
    emptyCall(/*request*/) {
      return {};
    },

    unaryCall(request) {
      if (request.responseStatus?.code !== undefined) {
        throw new ConnectError(
          request.responseStatus.message,
          request.responseStatus.code
        );
      }
      throw new ConnectError("TODO", Code.Unimplemented);
    },

    failUnaryCall(/*request*/) {
      throw new ConnectError(
        interop.nonASCIIErrMsg,
        Code.ResourceExhausted,
        {},
        [interop.errorDetail]
      );
    },

    cacheableUnaryCall(/*request*/) {
      return {};
    },

    async *streamingOutputCall(/*request*/) {
      yield {};
    },

    async *failStreamingOutputCall(/*request*/) {
      yield {};
    },

    async streamingInputCall(/*request*/) {
      throw new ConnectError("TODO", Code.Unimplemented);
    },

    async *fullDuplexCall(/*requests*/) {
      yield {};
      throw new ConnectError("TODO", Code.Unimplemented);
    },

    async *halfDuplexCall(/*requests*/) {
      yield {};
      throw new ConnectError("TODO", Code.Unimplemented);
    },

    async *unimplementedCall(/*request*/) {
      throw new ConnectError("Not implemented", Code.Unimplemented);
    },

    async *unimplementedStreamingOutputCall(/*requests*/) {
      throw new ConnectError("Not implemented", Code.Unimplemented);
    },
  },
  {}
);

export function createTestServers() {
  let http2Server: http2.Http2Server | undefined;
  let httpServer: http.Server | undefined;

  function getPort(
    server:
      | http2.Http2Server
      | http2.Http2SecureServer
      | http.Server
      | undefined
  ): number {
    const address = server?.address();
    if (address == null || typeof address == "string") {
      throw new Error();
    }
    return address.port;
  }

  const transports: typeof crosstestTransports = {
    // TODO need http/2 session management so we can shut down the server cleanly
    // "connect Node.js HTTP2 transport with binary": (options) => createConnectHttp2Transport({
    //   ...options,
    //   baseUrl: getBaseUrl(),
    //   useBinaryFormat: true,
    // }),
    // "connect Node.js HTTP2 transport with JSON": (options) => createConnectHttp2Transport({
    //   ...options,
    //   baseUrl: getBaseUrl(),
    //   useBinaryFormat: false,
    // }),
    // TODO need to configure undici to accept the certificate - for a start, see https://stackoverflow.com/questions/71946885/accept-self-signed-certificates-for-undici-fetch
    "connect fetch transport (binary) against Node.js (http)": (options) =>
      createConnectTransport({
        ...options,
        baseUrl: `http://localhost:${getPort(httpServer)}`,
        useBinaryFormat: true,
      }),
    "connect fetch transport (JSON) against Node.js (http)": (options) =>
      createConnectTransport({
        ...options,
        baseUrl: `http://localhost:${getPort(httpServer)}`,
        useBinaryFormat: false,
      }),
  };
  return {
    transports,
    describeTransports(
      specDefinitions: (
        transport: () => Transport,
        transportName: string
      ) => void
    ) {
      for (const [name, transportFactory] of Object.entries(transports)) {
        describe(name, () => {
          specDefinitions(transportFactory, name);
        });
      }
    },
    start(): Promise<void> {
      return Promise.all([
        // TODO http2.createSecureServer() , https.createServer()
        new Promise<void>((resolve) => {
          http2Server = http2
            .createServer({}, mergeHandlers(handlers))
            .listen(0, resolve);
        }),
        new Promise<void>((resolve) => {
          httpServer = http
            .createServer({}, mergeHandlers(handlers))
            .listen(0, resolve);
        }),
      ]).then();
    },
    stop(): Promise<void> {
      return Promise.all([
        new Promise<void>((resolve, reject) => {
          if (!http2Server) {
            reject(new Error("http2Server not started"));
            return;
          }
          http2Server.close((err) => (err ? reject(err) : resolve()));
          // TODO this resolve is only there because we currently don't manage http2 sessions in the client, and the server doesn't shut down with an open connection
          resolve();
        }),
        new Promise<void>((resolve, reject) => {
          if (!httpServer) {
            reject(new Error("httpServer not started"));
            return;
          }
          httpServer.close((err) => (err ? reject(err) : resolve()));
        }),
      ]).then();
    },
  };
}

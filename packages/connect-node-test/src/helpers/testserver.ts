import { createConnectTransport } from "@bufbuild/connect-web-next";
import * as http2 from "http2";
import * as http from "http";
import {
  Code,
  ConnectError,
  createConnectHttp2Transport,
  createHandlers,
  mergeHandlers,
  Transport,
} from "@bufbuild/connect-node";
import { TestService } from "../gen/grpc/testing/test_connectweb.js";
import type { crosstestTransports } from "./crosstestserver.js";
import { interop } from "./interop.js";

/* eslint-disable @typescript-eslint/require-await,require-yield */

const handlers = createHandlers(
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
  // TODO http2 server with TLS and allow http1
  let nodeH2cServer: http2.Http2Server | undefined;
  let nodeHttpServer: http.Server | undefined;

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
    "connect Node.js http2 transport (binary) against Node.js (H2C)": (
      options
    ) =>
      createConnectHttp2Transport({
        ...options,
        baseUrl: `http://localhost:${getPort(nodeH2cServer)}`,
        useBinaryFormat: true,
      }),
    "connect Node.js http2 transport (JSON) against Node.js (H2C)": (options) =>
      createConnectHttp2Transport({
        ...options,
        baseUrl: `http://localhost:${getPort(nodeH2cServer)}`,
        useBinaryFormat: false,
      }),
    "connect fetch transport (binary) against Node.js (http)": (options) =>
      createConnectTransport({
        ...options,
        baseUrl: `http://localhost:${getPort(nodeHttpServer)}`,
        useBinaryFormat: true,
      }),
    "connect fetch transport (JSON) against Node.js (http)": (options) =>
      createConnectTransport({
        ...options,
        baseUrl: `http://localhost:${getPort(nodeHttpServer)}`,
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
        new Promise<void>((resolve) => {
          nodeH2cServer = http2
            .createServer({}, mergeHandlers(handlers))
            .listen(0, resolve);
        }),
        new Promise<void>((resolve) => {
          nodeHttpServer = http
            .createServer({}, mergeHandlers(handlers))
            .listen(0, resolve);
        }),
      ]).then();
    },
    stop(): Promise<void> {
      return Promise.all([
        new Promise<void>((resolve, reject) => {
          if (!nodeH2cServer) {
            reject(new Error("http2Server not started"));
            return;
          }
          nodeH2cServer.close((err) => (err ? reject(err) : resolve()));
          // TODO this resolve is only there because we currently don't manage http2 sessions in the client, and the server doesn't shut down with an open connection
          resolve();
        }),
        new Promise<void>((resolve, reject) => {
          if (!nodeHttpServer) {
            reject(new Error("httpServer not started"));
            return;
          }
          nodeHttpServer.close((err) => (err ? reject(err) : resolve()));
        }),
      ]).then();
    },
  };
}

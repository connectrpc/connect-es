import { createConnectTransport } from "@bufbuild/connect-web-next";
import * as http2 from "http2";
import * as http from "http";
import {
  Code,
  ConnectError,
  createConnectHttp2Transport,
  createHandlers,
  decodeBinaryHeader,
  encodeBinaryHeader,
  mergeHandlers,
  Transport,
} from "@bufbuild/connect-node";
import { TestService } from "../gen/grpc/testing/test_connectweb.js";
import { interop } from "./interop.js";

/* eslint-disable @typescript-eslint/require-await,require-yield */

const handlers = createHandlers(
  TestService,
  {
    emptyCall() {
      return {};
    },

    unaryCall(request, context) {
      if (request.responseStatus?.code !== undefined) {
        throw new ConnectError(
          request.responseStatus.message,
          request.responseStatus.code
        );
      }
      echoMetadata(
        context.requestHeader,
        context.responseHeader,
        context.responseTrailer
      );
      return {
        payload: interop.makeServerPayload(
          request.responseType,
          request.responseSize
        ),
      };
    },

    failUnaryCall() {
      throw new ConnectError(
        interop.nonASCIIErrMsg,
        Code.ResourceExhausted,
        {},
        [interop.errorDetail]
      );
    },

    cacheableUnaryCall(/*request*/) {
      throw new ConnectError("TODO", Code.Unimplemented);
    },

    async *streamingOutputCall(request, context) {
      echoMetadata(
        context.requestHeader,
        context.responseHeader,
        context.responseTrailer
      );
      for (const param of request.responseParameters) {
        if (param.intervalUs > 0) {
          await new Promise<void>((resolve) => {
            setTimeout(resolve, param.intervalUs / 1000);
          });
        }
        yield {
          payload: interop.makeServerPayload(request.responseType, param.size),
        };
      }
    },

    async *failStreamingOutputCall() {
      throw new ConnectError(
        interop.nonASCIIErrMsg,
        Code.ResourceExhausted,
        {},
        [interop.errorDetail]
      );
    },

    async streamingInputCall(requests) {
      let total = 0;
      for await (const req of requests) {
        total += req.payload?.body.length ?? 0;
      }
      return {
        aggregatedPayloadSize: total,
      };
    },

    async *fullDuplexCall(requests, context) {
      echoMetadata(
        context.requestHeader,
        context.responseHeader,
        context.responseTrailer
      );
      for await (const req of requests) {
        if (req.responseStatus?.code !== undefined) {
          throw new ConnectError(
            req.responseStatus.message,
            req.responseStatus.code
          );
        }
        for (const param of req.responseParameters) {
          if (param.intervalUs > 0) {
            await new Promise<void>((resolve) => {
              setTimeout(resolve, param.intervalUs / 1000);
            });
          }
          yield {
            payload: interop.makeServerPayload(req.responseType, param.size),
          };
        }
      }
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

function echoMetadata(
  requestHeader: Headers,
  responseHeader: Headers,
  responseTrailer: Headers
): void {
  const leadingMetadata = requestHeader.get(interop.leadingMetadataKey);
  if (leadingMetadata !== null) {
    responseHeader.set(interop.leadingMetadataKey, leadingMetadata);
  }
  const trailingMetadata = requestHeader.get(interop.trailingMetadataKey);
  if (trailingMetadata !== null) {
    const decodedTrailingMetadata = decodeBinaryHeader(trailingMetadata);
    responseTrailer.set(
      interop.trailingMetadataKey,
      encodeBinaryHeader(decodedTrailingMetadata)
    );
  }
}

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

  // Node's undici fetch does not support HTTP1.1 (as of Nov 2022), so we cannot
  // run it against the H2C server
  const transports = {
    "connect Node.js http2 transport (binary) against Node.js (H2C)": (
      options?: Record<string, unknown>
    ) =>
      createConnectHttp2Transport({
        ...options,
        baseUrl: `http://localhost:${getPort(nodeH2cServer)}`,
        useBinaryFormat: true,
      }),
    "connect Node.js http2 transport (JSON) against Node.js (H2C)": (
      options?: Record<string, unknown>
    ) =>
      createConnectHttp2Transport({
        ...options,
        baseUrl: `http://localhost:${getPort(nodeH2cServer)}`,
        useBinaryFormat: false,
      }),
    "connect fetch transport (binary) against Node.js (http)": (
      options?: Record<string, unknown>
    ) =>
      createConnectTransport({
        ...options,
        baseUrl: `http://localhost:${getPort(nodeHttpServer)}`,
        useBinaryFormat: true,
      }),
    "connect fetch transport (JSON) against Node.js (http)": (
      options?: Record<string, unknown>
    ) =>
      createConnectTransport({
        ...options,
        baseUrl: `http://localhost:${getPort(nodeHttpServer)}`,
        useBinaryFormat: false,
      }),
  } as const;

  return {
    transports,
    describeTransports(
      specDefinitions: (
        transport: () => Transport,
        transportName: keyof typeof transports
      ) => void
    ) {
      for (const [name, transportFactory] of Object.entries(transports)) {
        describe(name, () => {
          specDefinitions(transportFactory, name as keyof typeof transports);
        });
      }
    },
    describeTransports2(
      exclude: Array<keyof typeof transports>,
      specDefinitions: (
        transport: () => Transport,
        transportName: keyof typeof transports
      ) => void
    ) {
      for (const [name, transportFactory] of Object.entries(transports)) {
        if (exclude.includes(name as keyof typeof transports)) {
          continue;
        }
        describe(name, () => {
          specDefinitions(transportFactory, name as keyof typeof transports);
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

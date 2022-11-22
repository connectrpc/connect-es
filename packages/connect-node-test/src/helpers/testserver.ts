// Copyright 2021-2022 Buf Technologies, Inc.
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

import {
  createConnectTransport,
  createGrpcWebTransport,
} from "@bufbuild/connect-web-next";
import * as http2 from "http2";
import * as http from "http";
import {
  createConnectHttp2Transport,
  createGrpcWebHttp2Transport,
  createHandlers,
  mergeHandlers,
  Transport,
} from "@bufbuild/connect-node";
import { TestService } from "../gen/grpc/testing/test_connectweb.js";
import { testService } from "./test-service-impl.js";

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
      throw new Error("cannot get server port");
    }
    return address.port;
  }

  // The following servers are available through crosstests:
  // Source: // https://github.com/bufbuild/connect-web/pull/87
  const crosstestConnectGoH1Url = "https://127.0.0.1:8080";
  const crosstestConnectGoH2Url = "https://127.0.0.1:8081";
  // const crosstestGrpcGoUrl = "https://127.0.0.1:8083";

  const transports = {
    // TODO add gRPC transport once implemented
    // TODO add http1.1 transports once implemented
    "@bufbuild/connect-node (Connect, binary, http2) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createConnectHttp2Transport({
        ...options,
        baseUrl: crosstestConnectGoH1Url,
        useBinaryFormat: true,
      }),
    "@bufbuild/connect-node (Connect, JSON, http2) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createConnectHttp2Transport({
        ...options,
        baseUrl: crosstestConnectGoH1Url,
        useBinaryFormat: false,
      }),
    "@bufbuild/connect-node (Connect, binary, http2) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createConnectHttp2Transport({
          ...options,
          baseUrl: `http://localhost:${getPort(nodeH2cServer)}`,
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (Connect, JSON, http2) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createConnectHttp2Transport({
          ...options,
          baseUrl: `http://localhost:${getPort(nodeH2cServer)}`,
          useBinaryFormat: false,
        }),
    "@bufbuild/connect-node (gRPC-web, binary, http2) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttp2Transport({
          ...options,
          baseUrl: crosstestConnectGoH1Url,
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http2) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcWebHttp2Transport({
        ...options,
        baseUrl: crosstestConnectGoH1Url,
        useBinaryFormat: false,
      }),
    "@bufbuild/connect-node (gRPC-web, binary, http2) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttp2Transport({
          ...options,
          baseUrl: `http://localhost:${getPort(nodeH2cServer)}`,
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http2) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttp2Transport({
          ...options,
          baseUrl: `http://localhost:${getPort(nodeH2cServer)}`,
          useBinaryFormat: false,
        }),
    // The following transports from @bufbuild/connect-web use the fetch API.
    // Node's undici fetch implementation only supports HTTP1.1 (as of Nov 2022),
    // so we cannot run it against servers which do not provide a fallback to
    // HTTP1.1.
    "@bufbuild/connect-web (gRPC-web, binary) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcWebTransport({
        ...options,
        baseUrl: crosstestConnectGoH1Url,
        useBinaryFormat: true,
      }),
    "@bufbuild/connect-web (gRPC-web, binary) against connect-go (h2)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcWebTransport({
        ...options,
        baseUrl: crosstestConnectGoH2Url,
        useBinaryFormat: true,
      }),
    "@bufbuild/connect-web (gRPC-web, JSON) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcWebTransport({
        ...options,
        baseUrl: crosstestConnectGoH1Url,
        useBinaryFormat: false,
      }),
    "@bufbuild/connect-web (gRPC-web, JSON) against connect-go (h2)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcWebTransport({
        ...options,
        baseUrl: crosstestConnectGoH2Url,
        useBinaryFormat: false,
      }),
    "@bufbuild/connect-web (Connect, binary) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createConnectTransport({
        ...options,
        baseUrl: crosstestConnectGoH1Url,
        useBinaryFormat: true,
      }),
    "@bufbuild/connect-web (Connect, binary) against connect-go (h2)": (
      options?: Record<string, unknown>
    ) =>
      createConnectTransport({
        ...options,
        baseUrl: crosstestConnectGoH2Url,
        useBinaryFormat: true,
      }),
    "@bufbuild/connect-web (Connect, JSON) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createConnectTransport({
        ...options,
        baseUrl: crosstestConnectGoH1Url,
        useBinaryFormat: false,
      }),
    "@bufbuild/connect-web (Connect, JSON) against connect-go (h2)": (
      options?: Record<string, unknown>
    ) =>
      createConnectTransport({
        ...options,
        baseUrl: crosstestConnectGoH2Url,
        useBinaryFormat: false,
      }),
    "@bufbuild/connect-web (gRPC-web, binary) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: `http://localhost:${getPort(nodeHttpServer)}`,
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-web (gRPC-web, JSON) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: `http://localhost:${getPort(nodeHttpServer)}`,
          useBinaryFormat: false,
        }),
    "@bufbuild/connect-web (Connect, binary) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: `http://localhost:${getPort(nodeHttpServer)}`,
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-web (Connect, JSON) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
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
    describeTransportsExcluding(
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
    describeTransportsOnly(
      only: Array<keyof typeof transports>,
      specDefinitions: (
        transport: () => Transport,
        transportName: keyof typeof transports
      ) => void
    ) {
      for (const [name, transportFactory] of Object.entries(transports)) {
        if (only.includes(name as keyof typeof transports)) {
          describe(name, () => {
            specDefinitions(transportFactory, name as keyof typeof transports);
          });
        }
      }
    },
    start(): Promise<void> {
      return Promise.all([
        new Promise<void>((resolve) => {
          nodeH2cServer = http2
            .createServer(
              {},
              mergeHandlers(createHandlers(TestService, testService, {}))
            )
            .listen(0, resolve);
        }),
        new Promise<void>((resolve) => {
          nodeHttpServer = http
            .createServer(
              {},
              mergeHandlers(createHandlers(TestService, testService, {}))
            )
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

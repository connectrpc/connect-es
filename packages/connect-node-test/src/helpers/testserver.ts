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
import { createGrpcHttp2Transport } from "@bufbuild/connect-node";

export function createTestServers() {
  // TODO http2 server with TLS and allow http1
  let nodeH2cServer: http2.Http2Server | undefined;
  let nodeHttpServer: http.Server | undefined;

  // The following servers are available through crosstests:
  //
  // | server        | port |
  // | ------------- | --- |
  // | connect-go h1 | 8080 |
  // | connect-go h2 | 8081 |
  // | grpc-go       | 8083 |
  //
  // Source: https://github.com/bufbuild/connect-web/pull/87
  const servers = {
    "connect-go (h1)": {
      getUrl() {
        return `https://127.0.0.1:8080`;
      },
      start() {
        return Promise.resolve();
      },
      stop() {
        return Promise.resolve();
      },
    },
    "connect-go (h2)": {
      getUrl() {
        return `https://127.0.0.1:8081`;
      },
      start() {
        return Promise.resolve();
      },
      stop() {
        return Promise.resolve();
      },
    },
    "grpc-go (h2)": {
      getUrl() {
        return `https://127.0.0.1:8083`;
      },
      start() {
        return Promise.resolve();
      },
      stop() {
        return Promise.resolve();
      },
    },
    "@bufbuild/connect-node (h2c)": {
      getUrl() {
        const address = nodeH2cServer?.address();
        if (address == null || typeof address == "string") {
          throw new Error("cannot get server port");
        }
        return `http://localhost:${address.port}`;
      },
      start() {
        return new Promise<void>((resolve) => {
          nodeH2cServer = http2
            .createServer(
              {},
              mergeHandlers(createHandlers(TestService, testService, {}))
            )
            .listen(0, resolve);
        });
      },
      stop() {
        return new Promise<void>((resolve, reject) => {
          if (!nodeH2cServer) {
            reject(new Error("http2Server not started"));
            return;
          }
          nodeH2cServer.close((err) => (err ? reject(err) : resolve()));
          // TODO this resolve is only there because we currently don't manage http2 sessions in the client, and the server doesn't shut down with an open connection
          resolve();
        });
      },
    },
    "@bufbuild/connect-node (h1)": {
      getUrl() {
        const address = nodeHttpServer?.address();
        if (address == null || typeof address == "string") {
          throw new Error("cannot get server port");
        }
        return `http://localhost:${address.port}`;
      },
      start() {
        return new Promise<void>((resolve) => {
          nodeHttpServer = http
            .createServer(
              {},
              mergeHandlers(createHandlers(TestService, testService, {}))
            )
            .listen(0, resolve);
        });
      },
      stop() {
        return new Promise<void>((resolve, reject) => {
          if (!nodeHttpServer) {
            reject(new Error("httpServer not started"));
            return;
          }
          nodeHttpServer.close((err) => (err ? reject(err) : resolve()));
        });
      },
    },
  };

  const transports = {
    // TODO add http1.1 transports once implemented
    // TODO run gRPC transport against @bufbuild/connect-node server
    "@bufbuild/connect-node (gRPC, binary, http2) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcHttp2Transport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        useBinaryFormat: true,
      }),
    "@bufbuild/connect-node (gRPC, JSON, http2) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcHttp2Transport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        useBinaryFormat: false,
      }),
    "@bufbuild/connect-node (Connect, binary, http2) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createConnectHttp2Transport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        useBinaryFormat: true,
      }),
    "@bufbuild/connect-node (Connect, JSON, http2) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createConnectHttp2Transport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        useBinaryFormat: false,
      }),
    "@bufbuild/connect-node (Connect, binary, http2) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createConnectHttp2Transport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (Connect, JSON, http2) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createConnectHttp2Transport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          useBinaryFormat: false,
        }),
    "@bufbuild/connect-node (gRPC-web, binary, http2) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttp2Transport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http2) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcWebHttp2Transport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        useBinaryFormat: false,
      }),
    "@bufbuild/connect-node (gRPC-web, binary, http2) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttp2Transport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http2) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttp2Transport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          useBinaryFormat: false,
        }),
  } as const;

  return {
    servers,
    transports,
    start(): Promise<void> {
      return Promise.all(Object.values(servers).map((s) => s.start())).then();
    },
    stop(): Promise<void> {
      return Promise.all(Object.values(servers).map((s) => s.stop())).then();
    },
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
  };
}

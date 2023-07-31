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
import * as https from "https";
import * as fs from "fs";
import * as path from "path";
import { cors, createRouterTransport } from "@bufbuild/connect";
import type { Transport } from "@bufbuild/connect";
import {
  compressionGzip,
  connectNodeAdapter,
  createConnectTransport,
  createGrpcTransport,
  createGrpcWebTransport,
} from "@bufbuild/connect-node";
import { fastifyConnectPlugin } from "@bufbuild/connect-fastify";
import { expressConnectMiddleware } from "@bufbuild/connect-express";
import type {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyTypeProviderDefault,
} from "fastify";
import { fastify } from "fastify";
import { importExpress } from "./import-express.js";
import { testRoutes } from "./test-routes.js";

export function createTestServers() {
  // TODO http2 server with TLS and allow http1
  let nodeH2SecureServer: http2.Http2SecureServer | undefined;
  let nodeH2cServer: http2.Http2Server | undefined;
  let nodeHttpServer: http.Server | undefined;
  let nodeHttpsServer: http.Server | undefined;
  let fastifyH2cServer:
    | FastifyInstance<
        http2.Http2Server,
        http2.Http2ServerRequest,
        http2.Http2ServerResponse,
        FastifyBaseLogger,
        FastifyTypeProviderDefault
      >
    | undefined;
  let expressServer: http.Server | undefined;

  const certLocalhost = getCertLocalhost();

  // The following servers are available through crosstests:
  //
  // | server        | port |
  // | ------------- | --- |
  // | connect-go h1 | 8080 |
  // | connect-go h2 | 8081 |
  // | grpc-go       | 8083 |
  //
  // Source: https://github.com/bufbuild/connect-es/pull/87
  const servers = {
    // connect-go
    "connect-go (h1)": {
      getUrl() {
        return `https://localhost:8080`;
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
        return `https://localhost:8081`;
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
        return `https://localhost:8083`;
      },
      start() {
        return Promise.resolve();
      },
      stop() {
        return Promise.resolve();
      },
    },
    "@bufbuild/connect-node (h2)": {
      getUrl() {
        const address = nodeH2SecureServer?.address();
        if (address == null || typeof address == "string") {
          throw new Error("cannot get server port");
        }
        return `https://localhost:${address.port}`;
      },
      start() {
        return new Promise<void>((resolve) => {
          nodeH2SecureServer = http2
            .createSecureServer(
              {
                allowHTTP1: true,
                cert: certLocalhost.cert,
                key: certLocalhost.key,
              },
              connectNodeAdapter({
                routes: testRoutes,
                requireConnectProtocolHeader: true,
              })
            )
            .listen(0, resolve);
        });
      },
      stop() {
        return new Promise<void>((resolve, reject) => {
          if (!nodeH2SecureServer) {
            reject(new Error("http2Server not started"));
            return;
          }
          nodeH2SecureServer.close((err) => (err ? reject(err) : resolve()));
        });
      },
    },
    // connect-node
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
              connectNodeAdapter({
                routes: testRoutes,
                requireConnectProtocolHeader: true,
              })
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
        });
      },
    },
    "@bufbuild/connect-node (h1)": {
      getUrl() {
        const address = nodeHttpServer?.address();
        if (address == null || typeof address == "string") {
          throw new Error("cannot get server port");
        }
        return `http://127.0.0.1:${address.port}`;
      },
      start(port = 0) {
        return new Promise<void>((resolve) => {
          const corsHeaders = {
            "Access-Control-Allow-Origin": "*", // caution with this
            "Access-Control-Allow-Methods": cors.allowedMethods.join(","),
            "Access-Control-Allow-Headers": [
              ...cors.allowedHeaders,
              // used in tests
              "X-Grpc-Test-Echo-Initial",
              "X-Grpc-Test-Echo-Trailing-Bin",
              "Request-Protocol",
              "Get-Request",
            ].join(", "),
            "Access-Control-Expose-Headers": [
              ...cors.exposedHeaders,
              "X-Grpc-Test-Echo-Initial",
              "X-Grpc-Test-Echo-Trailing-Bin",
              "Trailer-X-Grpc-Test-Echo-Trailing-Bin", // unary trailer in Connect
              "Request-Protocol",
              "Get-Request",
            ],
            "Access-Control-Max-Age": 2 * 3600,
          };
          const serviceHandler = connectNodeAdapter({
            routes: testRoutes,
            requireConnectProtocolHeader: true,
          });
          nodeHttpServer = http
            .createServer({}, (req, res) => {
              if (req.method === "OPTIONS") {
                res.writeHead(204, corsHeaders);
                res.end();
                return;
              }
              for (const [k, v] of Object.entries(corsHeaders)) {
                res.setHeader(k, v);
              }
              serviceHandler(req, res);
            })
            .listen(port, resolve);
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
    "@bufbuild/connect-node (h1 + tls)": {
      getUrl() {
        const address = nodeHttpsServer?.address();
        if (address == null || typeof address == "string") {
          throw new Error("cannot get server port");
        }
        return `https://localhost:${address.port}`;
      },
      start() {
        return new Promise<void>((resolve) => {
          nodeHttpsServer = https
            .createServer(
              {
                cert: certLocalhost.cert,
                key: certLocalhost.key,
              },
              connectNodeAdapter({
                routes: testRoutes,
                requireConnectProtocolHeader: true,
              })
            )
            .listen(0, resolve);
        });
      },
      stop() {
        return new Promise<void>((resolve, reject) => {
          if (!nodeHttpsServer) {
            reject(new Error("https not started"));
            return;
          }
          nodeHttpsServer.close((err) => (err ? reject(err) : resolve()));
          resolve(); // the server.close() callback above slows down our tests
        });
      },
    },
    // connect-fastify
    "@bufbuild/connect-fastify (h2c)": {
      getUrl() {
        if (!fastifyH2cServer) {
          throw new Error("fastifyH2cServer not started");
        }
        const port = fastifyH2cServer.addresses().map((a) => a.port)[0] as
          | number
          | undefined;
        if (port === undefined) {
          throw new Error("fastifyH2cServer not started");
        }
        return `http://localhost:${port}`;
      },
      async start() {
        fastifyH2cServer = fastify({
          http2: true,
          logger: false,
        });
        await fastifyH2cServer.register(fastifyConnectPlugin, {
          routes: testRoutes,
          requireConnectProtocolHeader: true,
        });
        await fastifyH2cServer.listen();
      },
      async stop() {
        if (!fastifyH2cServer) {
          throw new Error("fastifyH2cServer not started");
        }
        await fastifyH2cServer.close();
      },
    },
    // connect-express
    "@bufbuild/connect-express (h1)": {
      getUrl() {
        const address = expressServer?.address();
        if (address == null || typeof address == "string") {
          throw new Error("cannot get server port");
        }
        return `http://127.0.0.1:${address.port}`;
      },
      async start(port = 0) {
        const express = await importExpress();
        const app = express();
        app.use(
          expressConnectMiddleware({
            routes: testRoutes,
            requireConnectProtocolHeader: true,
          })
        );
        expressServer = http.createServer(app);
        return new Promise<void>((resolve) => {
          expressServer?.listen(port, resolve);
        });
      },
      stop() {
        return new Promise<void>((resolve, reject) => {
          if (!expressServer) {
            reject(new Error("expressServer not started"));
            return;
          }
          expressServer.close((err) => (err ? reject(err) : resolve()));
          resolve(); // the server.close() callback above slows down our tests
        });
      },
    },
  };

  const transports = {
    // gRPC
    "@bufbuild/connect-node (gRPC, binary, http2) against @bufbuild/connect-node (h2)":
      (options?: Record<string, unknown>) =>
        createGrpcTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          nodeOptions: {
            ca: certLocalhost.cert,
          },
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (gRPC, binary, http2) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (gRPC, JSON, http2) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          useBinaryFormat: false,
        }),
    "@bufbuild/connect-node (gRPC, binary, http2, gzip) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC, JSON, http2, gzip) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC, binary, http2) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcTransport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        httpVersion: "2",
        idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
        nodeOptions: {
          rejectUnauthorized: false, // TODO set up cert for go server correctly
        },
        useBinaryFormat: true,
      }),
    "@bufbuild/connect-node (gRPC, binary, http2, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcTransport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          nodeOptions: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC, JSON, http2, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcTransport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          nodeOptions: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC, JSON, http2) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcTransport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        httpVersion: "2",
        idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
        nodeOptions: {
          rejectUnauthorized: false, // TODO set up cert for go server correctly
        },
        useBinaryFormat: false,
      }),
    "@bufbuild/connect-node (gRPC, binary, http2) against grpc-go (h2)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcTransport({
        ...options,
        baseUrl: servers["grpc-go (h2)"].getUrl(),
        httpVersion: "2",
        idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
        nodeOptions: {
          rejectUnauthorized: false, // TODO set up cert for go server correctly
        },
        useBinaryFormat: true,
      }),
    "@bufbuild/connect-node (gRPC, binary, http) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (gRPC, JSON, http) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: false,
        }),
    "@bufbuild/connect-node (gRPC, JSON, https) against @bufbuild/connect-node (h1 + tls)":
      (options?: Record<string, unknown>) =>
        createGrpcTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1 + tls)"].getUrl(),
          httpVersion: "1.1",
          nodeOptions: {
            rejectUnauthorized: false,
          },
          useBinaryFormat: false,
        }),
    "@bufbuild/connect-node (gRPC, binary, https) against @bufbuild/connect-node (h1 + tls)":
      (options?: Record<string, unknown>) =>
        createGrpcTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1 + tls)"].getUrl(),
          httpVersion: "1.1",
          nodeOptions: {
            rejectUnauthorized: false,
          },
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (gRPC, binary, https) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcTransport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        httpVersion: "1.1",
        nodeOptions: {
          rejectUnauthorized: false,
        },
        useBinaryFormat: true,
      }),
    "@bufbuild/connect-node (gRPC, JSON, https) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcTransport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        httpVersion: "1.1",
        nodeOptions: {
          rejectUnauthorized: false,
        },
        useBinaryFormat: false,
      }),
    "@bufbuild/connect-node (gRPC, binary, http, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcTransport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          httpVersion: "1.1",
          nodeOptions: {
            rejectUnauthorized: false,
          },
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC, JSON, http, gzip) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcTransport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        useBinaryFormat: false,
        sendCompression: compressionGzip,
        httpVersion: "1.1",
        nodeOptions: {
          rejectUnauthorized: false,
        },
      }),
    "@bufbuild/connect-node (gRPC, binary, http, gzip) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC, JSON, http, gzip) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC, binary, http, gzip) against @bufbuild/connect-fastify (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-fastify (h2c)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC, JSON, http, gzip) against @bufbuild/connect-fastify (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-fastify (h2c)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),

    "@bufbuild/connect-node (gRPC, binary, http, gzip) against @bufbuild/connect-express (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-express (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC, JSON, http, gzip) against @bufbuild/connect-express (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-express (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),

    // Connect
    "@bufbuild/connect-node (Connect, binary, http2, gzip) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (Connect, binary, http2, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          nodeOptions: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (Connect, JSON, http2, gzip) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (Connect, JSON, http2, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          nodeOptions: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (Connect, JSON, http) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: false,
        }),
    "@bufbuild/connect-node (Connect, binary, http) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (Connect, binary, https) against @bufbuild/connect-node (h1 + tls)":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1 + tls)"].getUrl(),
          httpVersion: "1.1",
          nodeOptions: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (Connect, JSON, https) against @bufbuild/connect-node (h1 + tls)":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1 + tls)"].getUrl(),
          httpVersion: "1.1",
          nodeOptions: {
            rejectUnauthorized: false,
          },
          useBinaryFormat: false,
        }),
    "@bufbuild/connect-node (Connect, binary, http) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createConnectTransport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        httpVersion: "1.1",
        nodeOptions: {
          rejectUnauthorized: false, // TODO set up cert for go server correctly
        },
        useBinaryFormat: true,
      }),
    "@bufbuild/connect-node (Connect, JSON, http) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createConnectTransport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        httpVersion: "1.1",
        nodeOptions: {
          rejectUnauthorized: false, // TODO set up cert for go server correctly
        },
        useBinaryFormat: false,
      }),
    "@bufbuild/connect-node (Connect, binary, http, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          httpVersion: "1.1",
          nodeOptions: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (Connect, JSON, http, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          httpVersion: "1.1",
          nodeOptions: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (Connect, JSON, http, gzip) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          httpVersion: "1.1",
          nodeOptions: {
            rejectUnauthorized: false,
          },
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (Connect, binary, http, gzip) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          httpVersion: "1.1",
          nodeOptions: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (Connect, JSON, http, gzip) against @bufbuild/connect-fastify (h2c)":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-fastify (h2c)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (Connect, binary, http, gzip) against @bufbuild/connect-fastify (h2c)":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-fastify (h2c)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),

    "@bufbuild/connect-node (Connect, JSON, http, gzip) against @bufbuild/connect-express (h1)":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-express (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (Connect, binary, http, gzip) against @bufbuild/connect-express (h1)":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-express (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),

    // gRPC-web
    "@bufbuild/connect-node (gRPC-web, binary, http2) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http2) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          useBinaryFormat: false,
        }),
    "@bufbuild/connect-node (gRPC-web, binary, http2) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          nodeOptions: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (gRPC-web, binary, http2, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          nodeOptions: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http2, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          nodeOptions: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC-web, binary, http2, gzip) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          nodeOptions: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http2, gzip) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          nodeOptions: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http2) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcWebTransport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        httpVersion: "2",
        idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
        nodeOptions: {
          rejectUnauthorized: false, // TODO set up cert for go server correctly
        },
        useBinaryFormat: false,
      }),
    "@bufbuild/connect-node (gRPC-web, binary, http) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: false,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, https) against @bufbuild/connect-node (h1 + tls)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: false,
          nodeOptions: {
            rejectUnauthorized: false,
          },
        }),
    "@bufbuild/connect-node (gRPC-web, binary, https) against @bufbuild/connect-node (h1 + tls)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: true,
          nodeOptions: {
            rejectUnauthorized: false,
          },
        }),
    "@bufbuild/connect-node (gRPC-web, binary, https) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: true,
          nodeOptions: {
            rejectUnauthorized: false,
          },
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, https) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcWebTransport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        httpVersion: "1.1",
        useBinaryFormat: false,
        nodeOptions: {
          rejectUnauthorized: false,
        },
      }),
    "@bufbuild/connect-node (gRPC-web, JSON, http, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: false,
          sendCompression: compressionGzip,
          nodeOptions: {
            rejectUnauthorized: false,
          },
        }),
    "@bufbuild/connect-node (gRPC-web, binary, http, gzip) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: true,
          sendCompression: compressionGzip,
          nodeOptions: {
            rejectUnauthorized: false,
          },
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http, gzip) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: false,
          sendCompression: compressionGzip,
          nodeOptions: {
            rejectUnauthorized: false,
          },
        }),
    "@bufbuild/connect-node (gRPC-web, binary, http, gzip against @bufbuild/connect-fastify (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-fastify (h2c)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http, gzip) against @bufbuild/connect-fastify (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-fastify (h2c)"].getUrl(),
          httpVersion: "2",
          idleConnectionTimeoutMs: 25, // automatically close connection without streams so the server shuts down quickly after tests
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http, gzip) against @bufbuild/connect-express (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-express (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC-web, binary, http, gzip) against @bufbuild/connect-express (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-express (h1)"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),

    // ConnectRouter
    "@bufbuild/connect (ConnectRouter, binary)": (
      options?: Record<string, unknown>
    ) =>
      createRouterTransport(testRoutes, {
        transport: {
          ...options,
          useBinaryFormat: true,
        },
      }),
    "@bufbuild/connect (ConnectRouter, JSON)": (
      options?: Record<string, unknown>
    ) =>
      createRouterTransport(testRoutes, {
        transport: {
          ...options,
          useBinaryFormat: false,
        },
      }),
  };

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
        transport: (options?: Record<string, unknown>) => Transport,
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
        transport: (options?: Record<string, unknown>) => Transport,
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
        transport: (options?: Record<string, unknown>) => Transport,
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
    describeServers(
      only: Array<keyof typeof servers>,
      specDefinitions: (
        server: (typeof servers)[keyof typeof servers],
        serverName: keyof typeof servers
      ) => void
    ) {
      for (const [name, server] of Object.entries(servers)) {
        if (only.includes(name as keyof typeof servers)) {
          describe(name, () => {
            specDefinitions(server, name as keyof typeof servers);
          });
        }
      }
    },
  };
}

let certLocalHost:
  | {
      key: string;
      cert: string;
    }
  | undefined;

function getCertLocalhost(): { key: string; cert: string } {
  if (certLocalHost === undefined) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let dir = new URL(import.meta.url).pathname;
    for (let i = 0; i < 10; i++) {
      if (fs.existsSync(path.join(dir, "package.json"))) {
        break;
      }
      dir = path.join(dir, "..");
    }
    const key = fs.readFileSync(path.join(dir, "localhost-key.pem"), "utf8");
    const cert = fs.readFileSync(path.join(dir, "localhost-cert.pem"), "utf8");
    certLocalHost = { key, cert };
  }
  return certLocalHost;
}

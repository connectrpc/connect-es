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

import * as http from "http";
import type { Transport } from "@bufbuild/connect";
import { EdgeRuntime, runServer } from "edge-runtime";
import { buildSync } from "esbuild";
import {
  connectNodeAdapter,
  createConnectTransport,
  createGrpcWebTransport,
} from "@bufbuild/connect-node";
import testRoutes from "./test-routes.js";

export function createTestServers() {
  let nodeHttpServer: http.Server | undefined;
  let vercelEdgeRuntimeServer:
    | Awaited<ReturnType<typeof runServer>>
    | undefined;

  const servers = {
    "vercel edge-runtime on node": {
      getUrl() {
        const url = vercelEdgeRuntimeServer?.url;
        if (url === undefined) {
          throw new Error("cannot get server url");
        }
        return url;
      },
      async start() {
        const code = buildSync({
          write: false,
          minify: false,
          bundle: true,
          format: "iife",
          platform: "neutral",
          entryPoints: [
            new URL(
              "./vercel-edge-server.code.ts",
              import.meta.url
            ).pathname.replace("dist/esm", "src"),
          ],
        }).outputFiles[0].text;
        const runtime = new EdgeRuntime({
          initialCode: code,
        });
        vercelEdgeRuntimeServer = await runServer({
          runtime,
          port: 0,
        });
      },
      async stop() {
        await vercelEdgeRuntimeServer?.close();
      },
    },

    // connect-node
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
          nodeHttpServer = http
            .createServer(
              {},
              connectNodeAdapter({
                routes: testRoutes,
                requireConnectProtocolHeader: true,
              })
            )
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
  };

  const transports = {
    // Connect
    "@bufbuild/connect-node (Connect, JSON, http) against vercel edge-runtime on node":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: servers["vercel edge-runtime on node"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: false,
        }),
    "@bufbuild/connect-node (Connect, binary, http) against vercel edge-runtime on node":
      (options?: Record<string, unknown>) =>
        createConnectTransport({
          ...options,
          baseUrl: servers["vercel edge-runtime on node"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: true,
        }),

    // gRPC-web
    "@bufbuild/connect-node (gRPC-web, binary, http) against vercel edge-runtime on node":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["vercel edge-runtime on node"].getUrl(),
          httpVersion: "1.1",
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http) against vercel edge-runtime on node":
      (options?: Record<string, unknown>) =>
        createGrpcWebTransport({
          ...options,
          baseUrl: servers["vercel edge-runtime on node"].getUrl(),
          httpVersion: "1.1",
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

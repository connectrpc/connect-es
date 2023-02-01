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

import type { Transport } from "@bufbuild/connect-web";
import {
  createConnectTransport,
  createGrpcWebTransport,
} from "@bufbuild/connect-web";

// TODO remove this file after connect-web has migrated to connect-core

// The following servers are available through crosstests:
//
// | server        | port |
// | ------------- | --- |
// | connect-go h1 | 8080 |
// | connect-go h2 | 8081 |
// | grpc-go       | 8083 |
//
// Source: // https://github.com/bufbuild/connect-web/pull/87
const crossTestConnectGoH1BaseUrl = "https://127.0.0.1:8080";

// see connect-node-h1-server.mjs
const connectNodeH1BaseUrl = "http://127.0.0.1:8085";

const legacyCrosstestTransports = {
  "legacy gRPC-web transport against connect-go (h1)": (
    options?: Record<string, unknown>
  ) =>
    createGrpcWebTransport({
      ...options,
      baseUrl: crossTestConnectGoH1BaseUrl,
    }),
  "legacy connect JSON transport against connect-go (h1)": (
    options?: Record<string, unknown>
  ) =>
    createConnectTransport({
      ...options,
      baseUrl: crossTestConnectGoH1BaseUrl,
      useBinaryFormat: false,
    }),
  "legacy connect binary transport against connect-go (h1)": (
    options?: Record<string, unknown>
  ) =>
    createConnectTransport({
      ...options,
      baseUrl: crossTestConnectGoH1BaseUrl,
      useBinaryFormat: true,
    }),
  "legacy gRPC-web transport against @bufbuild/connect-node (h1)": (
    options?: Record<string, unknown>
  ) =>
    createGrpcWebTransport({
      ...options,
      baseUrl: connectNodeH1BaseUrl,
    }),
  "legacy connect JSON transport against @bufbuild/connect-node (h1)": (
    options?: Record<string, unknown>
  ) =>
    createConnectTransport({
      ...options,
      baseUrl: connectNodeH1BaseUrl,
      useBinaryFormat: false,
    }),
  "legacy connect binary transport against @bufbuild/connect-node (h1)": (
    options?: Record<string, unknown>
  ) =>
    createConnectTransport({
      ...options,
      baseUrl: connectNodeH1BaseUrl,
      useBinaryFormat: true,
    }),
} as const;

export function describeLegacyTransports(
  specDefinitions: (
    transport: (options?: Record<string, unknown>) => Transport,
    transportName: keyof typeof legacyCrosstestTransports
  ) => void
) {
  for (const [name, transportFactory] of Object.entries(
    legacyCrosstestTransports
  )) {
    describe(name, () => {
      specDefinitions(
        transportFactory,
        name as keyof typeof legacyCrosstestTransports
      );
    });
  }
}

export function describeLegacyTransportsExcluding(
  exclude: Array<keyof typeof legacyCrosstestTransports>,
  specDefinitions: (
    transport: (options?: Record<string, unknown>) => Transport,
    transportName: keyof typeof legacyCrosstestTransports
  ) => void
) {
  for (const [name, transportFactory] of Object.entries(
    legacyCrosstestTransports
  )) {
    if (exclude.includes(name as keyof typeof legacyCrosstestTransports)) {
      continue;
    }
    describe(name, () => {
      specDefinitions(
        transportFactory,
        name as keyof typeof legacyCrosstestTransports
      );
    });
  }
}

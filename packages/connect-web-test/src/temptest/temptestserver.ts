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

import type { ClientTransport } from "@bufbuild/connect-web";
import {
  createConnectTransport,
  createGrpcWebTransport,
} from "@bufbuild/connect-web";
import { TypeRegistry } from "@bufbuild/protobuf";
import { UnaryErrorRequest } from "../gen/testing/v1/test_pb.js";

export const temptestserverBaseUrl = "http://127.0.0.1:9000";

export const temptestserverTransports: Record<
  string,
  (options?: Record<string, unknown>) => ClientTransport
> = {
  "gRPC-web transport": (options) =>
    createGrpcWebTransport({
      ...options,
      baseUrl: temptestserverBaseUrl,
      errorDetailRegistry: TypeRegistry.from(UnaryErrorRequest), // used as error detail in tests
    }),
  "connect JSON transport": (options) =>
    createConnectTransport({
      ...options,
      baseUrl: temptestserverBaseUrl,
      useBinaryFormat: false,
      errorDetailRegistry: TypeRegistry.from(UnaryErrorRequest), // used as error detail in tests
    }),
  "connect binary transport": (options) =>
    createConnectTransport({
      ...options,
      baseUrl: temptestserverBaseUrl,
      useBinaryFormat: true,
      errorDetailRegistry: TypeRegistry.from(UnaryErrorRequest), // used as error detail in tests
    }),
};

// Copyright 2021-2024 The Connect Authors
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

export { createGrpcWebTransport } from "./grpc-web-transport.js";
export type { GrpcWebTransportOptions } from "./grpc-web-transport.js";
export { createGrpcTransport } from "./grpc-transport.js";
export type { GrpcTransportOptions } from "./grpc-transport.js";
export { createConnectTransport } from "./connect-transport.js";
export type { ConnectTransportOptions } from "./connect-transport.js";
export { compressionBrotli, compressionGzip } from "./compression.js";
export { connectNodeAdapter } from "./connect-node-adapter.js";
export type { ConnectNodeAdapterOptions } from "./connect-node-adapter.js";

export {
  universalRequestFromNodeRequest,
  universalResponseToNodeResponse,
} from "./node-universal-handler.js";

export { createNodeHttpClient } from "./node-universal-client.js";
export type { NodeHttpClientOptions } from "./node-universal-client.js";
export { Http2SessionManager } from "./http2-session-manager.js";
export type { Http2SessionOptions } from "./http2-session-manager.js";

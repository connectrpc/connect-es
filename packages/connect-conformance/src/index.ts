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

export { default as routes } from "./routes.js";
export { run } from "./conformance.js";
export {
  readSizeDelimitedBuffers,
  writeSizeDelimitedBuffer,
} from "./protocol.js";
export { default as invoke } from "./invoke.js";
export { createTransport } from "./node/transport.js";

export * from "./gen/connectrpc/conformance/v1/client_compat_pb.js";
export * from "./gen/connectrpc/conformance/v1/config_pb.js";
export * from "./gen/connectrpc/conformance/v1/server_compat_pb.js";
export * from "./gen/connectrpc/conformance/v1/service_connect.js";
export * from "./gen/connectrpc/conformance/v1/service_pb.js";
export * from "./gen/connectrpc/conformance/v1/suite_pb.js";

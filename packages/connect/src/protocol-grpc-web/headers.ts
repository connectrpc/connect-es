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

/**
 * @private
 */
export {
  headerContentType,
  headerEncoding,
  headerAcceptEncoding,
  headerTimeout,
  headerGrpcStatus,
  headerGrpcMessage,
  headerStatusDetailsBin,
} from "../protocol-grpc/headers.js";

/**
 * gRPC-web does not use the standard header User-Agent.
 *
 * @private
 */
export const headerXUserAgent = "X-User-Agent";

/**
 * The canonical grpc/grpc-web JavaScript implementation sets
 * this request header with value "1".
 * Some servers may rely on the header to identify gRPC-web
 * requests. For example the proxy by improbable:
 * https://github.com/improbable-eng/grpc-web/blob/53aaf4cdc0fede7103c1b06f0cfc560c003a5c41/go/grpcweb/wrapper.go#L231
 *
 * @private
 */
export const headerXGrpcWeb = "X-Grpc-Web";

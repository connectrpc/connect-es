// Copyright 2021-2025 The Connect Authors
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

import type { Interceptor, Transport } from "@connectrpc/connect";
import type { Compression } from "@connectrpc/connect/protocol";
import { createTransport } from "@connectrpc/connect/protocol-grpc";
import type {
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
} from "@bufbuild/protobuf";
import {
  type NodeHttp2TransportOptions,
  validateNodeTransportOptions,
} from "./node-transport-options.js";

/**
 * Options used to configure the gRPC transport.
 *
 * See createGrpcTransport().
 */
export type GrpcTransportOptions = NodeHttp2TransportOptions & {
  /**
   * Base URI for all HTTP requests.
   *
   * Requests will be made to <baseUrl>/<package>.<service>/method
   *
   * Example: `baseUrl: "https://example.com/my-api"`
   *
   * This will make a `POST /my-api/my_package.MyService/Foo` to
   * `example.com` via HTTPS.
   */
  baseUrl: string;

  /**
   * By default, clients use the binary format for gRPC-web, because
   * not all gRPC-web implementations support JSON.
   */
  useBinaryFormat?: boolean;

  /**
   * Interceptors that should be applied to all calls running through
   * this transport. See the Interceptor type for details.
   */
  interceptors?: Interceptor[];

  /**
   * Options for the JSON format.
   * By default, unknown fields are ignored.
   */
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;

  /**
   * Options for the binary wire format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;

  /**
   * Compression algorithms available to a client. Clients ask servers to
   * compress responses using any of the registered algorithms. The first
   * registered algorithm is the most preferred.
   *
   * It is safe to use this option liberally: servers will ignore any
   * compression algorithms they don't support. To compress requests, pair this
   * option with `sendCompression`.
   *
   * If this option is not provided, the compression algorithms "gzip" and "br"
   * (Brotli) are accepted. To opt out of response compression, pass an
   * empty array.
   */
  acceptCompression?: Compression[];

  /**
   * Configures the client to use the specified algorithm to compress request
   * messages.
   *
   * Because some servers don't support compression, clients default to sending
   * uncompressed requests.
   */
  sendCompression?: Compression;

  /**
   * Sets a minimum size threshold for compression: Messages that are smaller
   * than the configured minimum are sent uncompressed.
   *
   * The default value is 1 kibibyte, because the CPU cost of compressing very
   * small messages usually isn't worth the small reduction in network I/O.
   */
  compressMinBytes?: number;

  /**
   * Limits the performance impact of pathologically large messages sent by the
   * server. Limits apply to each individual message, not to the stream as a
   * whole.
   *
   * The default limit is the maximum supported value of ~4GiB.
   */
  readMaxBytes?: number;

  /**
   * Prevents sending messages too large for the server to handle.
   *
   * The default limit is the maximum supported value of ~4GiB.
   */
  writeMaxBytes?: number;

  /**
   * The timeout in milliseconds to apply to all requests.
   *
   * This can be overridden on a per-request basis by passing a timeoutMs.
   */
  defaultTimeoutMs?: number;
};

/**
 * Create a Transport for the gRPC protocol using the Node.js `http2` module.
 */
export function createGrpcTransport(options: GrpcTransportOptions): Transport {
  return createTransport(
    validateNodeTransportOptions({
      ...options,
      httpVersion: "2",
    }),
  );
}

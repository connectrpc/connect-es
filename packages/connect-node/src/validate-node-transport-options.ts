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

import type * as http2 from "http2";
import type * as http from "http";
import type * as https from "https";
import { validateReadWriteMaxBytes } from "@bufbuild/connect/protocol";
import { compressionBrotli, compressionGzip } from "./compression.js";
import {
  createNodeHttp1Client,
  createNodeHttp2Client,
} from "./node-universal-client.js";
import type { CommonTransportOptions } from "@bufbuild/connect/protocol";

/**
 * Options specific to the Node.js built in http and https modules.
 */
export interface NodeHttp1TransportOptions {
  httpVersion: "1.1";

  /**
   * Options passed to the request() call of the Node.js built-in
   * http or https module.
   */
  nodeOptions?:
    | Omit<http.RequestOptions, "signal">
    | Omit<https.RequestOptions, "signal">;
}

/**
 * Options specific to the Node.js built in http2 module.
 */
export interface NodeHttp2TransportOptions {
  httpVersion: "2";

  /**
   * Options passed to the connect() call of the Node.js built-in
   * http2 module.
   */
  nodeOptions?: http2.ClientSessionOptions | http2.SecureClientSessionOptions;

  /**
   * By default, HTTP/2 sessions are terminated after each request.
   * Set this option to true to keep sessions alive across multiple
   * requests.
   */
  keepSessionAlive?: boolean;
}

/**
 * Options that are common to all client transports for Node.js.
 */
type CommonNodeTransportOptions = (
  | NodeHttp1TransportOptions
  | NodeHttp2TransportOptions
) &
  Partial<Omit<CommonTransportOptions, "baseUrl">> &
  Pick<CommonTransportOptions, "baseUrl">;

/**
 * Asserts that the options are within sane limits, and returns default values
 * where no value is provided.
 */
export function validateNodeTransportOptions(
  options: CommonNodeTransportOptions
) {
  return {
    baseUrl: options.baseUrl,
    useBinaryFormat: options.useBinaryFormat ?? true,
    interceptors: options.interceptors ?? [],
    ...validateReadWriteMaxBytes(
      options.readMaxBytes,
      options.writeMaxBytes,
      options.compressMinBytes
    ),
    client:
      options.httpVersion == "2"
        ? createNodeHttp2Client(
            options.baseUrl,
            options.keepSessionAlive ?? false,
            options.nodeOptions
          )
        : createNodeHttp1Client(options.nodeOptions),
    sendCompression: options.sendCompression ?? null,
    acceptCompression: options.acceptCompression ?? [
      compressionGzip,
      compressionBrotli,
    ],
  };
}

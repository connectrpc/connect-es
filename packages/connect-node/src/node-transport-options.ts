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

import type {
  CommonTransportOptions,
  UniversalClientFn,
} from "@bufbuild/connect/protocol";
import { validateReadWriteMaxBytes } from "@bufbuild/connect/protocol";
import { compressionBrotli, compressionGzip } from "./compression.js";
import {
  createNodeHttpClient,
  type NodeHttp2ClientSessionManager,
} from "./node-universal-client.js";
import {
  Http2SessionManager,
  type Http2SessionOptions,
} from "./http2-session-manager.js";
import * as http2 from "http2";
import * as http from "http";
import * as https from "https";

export type DeprecatedNodeTransportOptions = {
  /**
   * @deprecated use the Http2SessionManager instead for fine-grained control over sessions and keep-alive
   *
   * By default, HTTP/2 sessions are terminated after each request.
   * Set this option to true to keep sessions alive across multiple
   * requests.
   */
  keepSessionAlive?: boolean;
};

/**
 * Options specific to Node.js client transports.
 */
export type NodeTransportOptions =
  | {
      httpVersion: "1.1";
      /**
       * Options passed to the request() call of the Node.js built-in
       * http or https module.
       */
      nodeOptions?:
        | Omit<http.RequestOptions, "signal">
        | Omit<https.RequestOptions, "signal">;
    }
  | ({
      httpVersion: "2";

      /**
       * A manager for the HTTP/2 connection of the transport.
       *
       * Providing this option makes nodeOptions as well as the HTTP/2 session
       * options (pingIntervalMs et cetera) ineffective.
       */
      sessionManager?: NodeHttp2ClientSessionManager;

      /**
       * Options passed to the connect() call of the Node.js built-in
       * http2 module.
       */
      nodeOptions?:
        | http2.ClientSessionOptions
        | http2.SecureClientSessionOptions;
    } & Http2SessionOptions);

/**
 * Asserts that the options are within sane limits, and returns default values
 * where no value is provided.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function validateNodeTransportOptions(
  options: NodeTransportOptions &
    Partial<Omit<CommonTransportOptions, "baseUrl">> &
    Pick<CommonTransportOptions, "baseUrl">
) {
  let httpClient: UniversalClientFn;
  if (options.httpVersion == "2") {
    let sessionManager: NodeHttp2ClientSessionManager;
    if (options.sessionManager) {
      sessionManager = options.sessionManager;
    } else {
      sessionManager = new Http2SessionManager(
        options.baseUrl,
        {
          pingIntervalMs: options.pingIntervalMs,
          pingIdleConnection: options.pingIdleConnection,
          pingTimeoutMs: options.pingTimeoutMs,
          idleConnectionTimeoutMs: options.idleConnectionTimeoutMs,
        },
        options.nodeOptions
      );
    }
    httpClient = createNodeHttpClient({
      httpVersion: "2",
      sessionProvider: () => sessionManager,
    });
  } else {
    httpClient = createNodeHttpClient({
      httpVersion: "1.1",
      nodeOptions: options.nodeOptions,
    });
  }
  return {
    ...options,
    httpClient,
    useBinaryFormat: options.useBinaryFormat ?? true,
    interceptors: options.interceptors ?? [],
    sendCompression: options.sendCompression ?? null,
    acceptCompression: options.acceptCompression ?? [
      compressionGzip,
      compressionBrotli,
    ],
    ...validateReadWriteMaxBytes(
      options.readMaxBytes,
      options.writeMaxBytes,
      options.compressMinBytes
    ),
  };
}

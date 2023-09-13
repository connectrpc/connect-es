// Copyright 2021-2023 The Connect Authors
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
 * Options for a call. Every client should accept CallOptions as optional
 * argument in its RPC methods.
 */
export interface CallOptions {
  /**
   * Timeout in milliseconds.
   */
  timeoutMs?: number;

  /**
   * Custom headers to send with the request.
   */
  headers?: HeadersInit;

  /**
   * An optional AbortSignal to cancel the call.
   * If cancelled, an error with Code.Canceled is raised.
   */
  signal?: AbortSignal;

  /**
   * Called when response headers are received.
   */
  onHeader?(headers: Headers): void;

  /**
   * Called when response trailers are received.
   */
  onTrailer?(trailers: Headers): void;
}

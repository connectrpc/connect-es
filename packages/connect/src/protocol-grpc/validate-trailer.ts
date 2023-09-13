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

import { findTrailerError } from "./trailer-status.js";

/**
 * Validates a trailer for the gRPC and the gRPC-web protocol.
 * Throws a ConnectError if the trailer contains an error status.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function validateTrailer(trailer: Headers): void {
  const err = findTrailerError(trailer);
  if (err) {
    throw err;
  }
}

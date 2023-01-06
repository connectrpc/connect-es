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

import { Code } from "../code.js";
import { ConnectError } from "../connect-error.js";

/**
 * Parse a gRPC Timeout (Deadline) header.
 */
export function grpcParseTimeout(
  value: string | null
): number | undefined | ConnectError {
  if (value === null) {
    return undefined;
  }
  const results = /^(\d{1,8})([HMSmun])$/.exec(value);
  if (results === null) {
    return new ConnectError(
      `protocol error: invalid grpc timeout value: ${value}`,
      Code.InvalidArgument
    );
  }
  const v = {
    H: 60 * 60 * 1000, // hour
    M: 60 * 1000, // minute
    S: 1000, // second
    m: 1, // millisecond
    u: 0.001, // microsecond
    n: 0.000001, // nanosecond
  };
  return v[results[2] as keyof typeof v] * parseInt(results[1]);
}

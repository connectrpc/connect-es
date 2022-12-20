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

import { Code } from "./code.js";
import { ConnectError } from "./connect-error.js";

enum TimeoutUnit {
  Hour = "H",
  Minute = "M",
  Second = "S",
  Millisecond = "m",
  Microsecond = "u",
  Nanosecond = "n",
}

/**
 * Parse a gRPC Timeout(Deadline) header.
 */
export function grpcParseTimeout(
  value: string | null
): number | undefined | ConnectError {
  if (value === null || value.length === 0) {
    return undefined;
  }
  const regex = /(\d{1,8})([HMSmun])/gm;
  const results = regex.exec(value);

  if (results === null) {
    return new ConnectError(
      `protocol error: invalid grpc timeout value: ${value}`,
      Code.InvalidArgument
    );
  }

  const [, duration, unit] = results;
  const timeout = parseInt(duration);

  if (!Number.isInteger(timeout)) {
    return new ConnectError(
      `protocol error: grpc timeout value must be an integer: ${timeout}`,
      Code.InvalidArgument
    );
  }

  switch (unit) {
    case TimeoutUnit.Hour:
      return timeout * 60 * 60 * 1000;
    case TimeoutUnit.Minute:
      return timeout * 60 * 60 * 1000;
    case TimeoutUnit.Second:
      return timeout * 1000;
    case TimeoutUnit.Millisecond:
      return timeout;
    case TimeoutUnit.Microsecond:
      return timeout / 1000;
    case TimeoutUnit.Nanosecond:
      return timeout / 1000 / 1000;
    default:
      return new ConnectError(
        `protocol error: invalid grpc timeout unit: ${unit}`,
        Code.InvalidArgument
      );
  }
}

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

/**
 * Parse a Connect Timeout(Deadline) header.
 */
export function connectParseTimeout(
  value: string | null
): number | undefined | ConnectError {
  if (value === null || value.length === 0) {
    return undefined;
  }

  const regex = /(\d{1,8})([HMSmun])?/gm;
  const results = regex.exec(value);

  if (results === null) {
    return new ConnectError(
      `protocol error: invalid connect timeout value: ${value}`,
      Code.InvalidArgument
    );
  }

  const [, duration, unit] = results;
  const timeout = parseInt(duration);

  // unit can be undefined as indicated in the regex statement
  // however type wise its always a string so added the cast so we can check if its undefined or not
  if (((unit as string | undefined) ?? "").length > 0) {
    return new ConnectError(
      `protocol error: connect timeout value should only be an integer: ${timeout}`,
      Code.InvalidArgument
    );
  }

  if (!Number.isInteger(timeout)) {
    return new ConnectError(
      `protocol error: connect timeout value must be an integer: ${timeout}`,
      Code.InvalidArgument
    );
  }

  return timeout;
}

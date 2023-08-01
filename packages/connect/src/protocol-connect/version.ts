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

import { headerProtocolVersion } from "./headers.js";
import { paramConnectVersion } from "./query-params.js";
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";

/**
 * The only know value for the header Connect-Protocol-Version.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export const protocolVersion = "1";

/**
 * Requires the Connect-Protocol-Version header to be present with the expected
 * value. Raises a ConnectError with Code.InvalidArgument otherwise.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function requireProtocolVersionHeader(requestHeader: Headers) {
  const v = requestHeader.get(headerProtocolVersion);
  if (v === null) {
    throw new ConnectError(
      `missing required header: set ${headerProtocolVersion} to "${protocolVersion}"`,
      Code.InvalidArgument,
    );
  } else if (v !== protocolVersion) {
    throw new ConnectError(
      `${headerProtocolVersion} must be "${protocolVersion}": got "${v}"`,
      Code.InvalidArgument,
    );
  }
}

/**
 * Requires the connect query parameter to be present with the expected value.
 * Raises a ConnectError with Code.InvalidArgument otherwise.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function requireProtocolVersionParam(queryParams: URLSearchParams) {
  const v = queryParams.get(paramConnectVersion);
  if (v === null) {
    throw new ConnectError(
      `missing required parameter: set ${paramConnectVersion} to "v${protocolVersion}"`,
      Code.InvalidArgument,
    );
  } else if (v !== `v${protocolVersion}`) {
    throw new ConnectError(
      `${paramConnectVersion} must be "v${protocolVersion}": got "${v}"`,
      Code.InvalidArgument,
    );
  }
}

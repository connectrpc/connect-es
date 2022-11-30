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

import {
  Code,
  ConnectError,
  connectErrorFromReason,
} from "@bufbuild/connect-core";

/**
 * Returns connect error with reason and appropriate error code from Node
 */
export function connectErrorFromNodeReason(reason: unknown): ConnectError {
  let code = Code.Internal;
  if (
    isSyscallError(reason, "getaddrinfo", "ENOTFOUND") ||
    isSyscallError(reason, "getaddrinfo", "EAI_AGAIN")
  ) {
    code = Code.Unavailable;
  }
  return connectErrorFromReason(reason, code);
}

function isSyscallError(
  reason: unknown,
  syscall: string,
  code: string
): boolean {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
  const r = reason as any;
  if (reason instanceof Error) {
    // if ("code" in r) {
    //   // TODO
    //   // eslint-disable-next-line no-console
    //   console.error(r);
    //   // eslint-disable-next-line no-console
    //   console.error("want syscall", syscall, "want code", code);
    //   // eslint-disable-next-line no-console
    //   console.log("syscall in r", "syscall" in r)
    //   if ("syscall" in r) {
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,no-console
    //     console.log("r.syscall", r.syscall)
    //   }
    //   // eslint-disable-next-line no-console
    //   console.log("code in r", "code" in r)
    //   if ("code" in r) {
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,no-console
    //     console.log("r.code", r.code)
    //   }
    //   // eslint-disable-next-line no-console
    //   console.log("syscall = " + syscall, "syscall" in r)
    // }
    if ("code" in r && "syscall" in r) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      if (syscall === r.syscall && code === r.code) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access,no-console
        console.log(`isSyscallError ${syscall} ${code} OK`, reason)
        return true;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access,no-console
        console.log(`isSyscallError ${syscall} ${code} NO`, reason)
      }
    }
    if ("cause" in reason) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
      return isSyscallError(r.cause, syscall, code);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access,no-console
      console.log(`isSyscallError ${syscall} ${code} NO, and cause also NO`, reason)
    }
  }
  return false;
}

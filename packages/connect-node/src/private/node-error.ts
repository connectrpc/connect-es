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

import {
  Code,
  ConnectError,
  connectErrorFromReason,
} from "@bufbuild/connect-core";

/**
 * Similar to connectErrorFromReason(), this function turns any value into
 * a ConnectError, but special cases some Node.js specific error codes and
 * sets an appropriate Connect error code.
 */
export function connectErrorFromNodeReason(reason: unknown): ConnectError {
  let code = Code.Internal;
  const chain = unwrapNodeErrorChain(reason).map(getNodeErrorProps);
  if (chain.some((p) => p.code == "ERR_STREAM_WRITE_AFTER_END")) {
    // We do not want intentional errors from the server to be shadowed
    // by client-side errors.
    // This can occur if the server has written a response with an error
    // and has ended the connection. This response may already sit in a
    // buffer on the client, while it is still writing to the request
    // body.
    // To avoid this problem, we wrap ERR_STREAM_WRITE_AFTER_END as a
    // ConnectError with Code.Aborted. The special meaning of this code
    // in this situation is documented in StreamingConn.send() and in
    // createServerStreamingFn().
    code = Code.Aborted;
  } else if (
    chain.some(
      (p) =>
        p.syscall === "getaddrinfo" &&
        (p.code == "ENOTFOUND" || p.code == "EAI_AGAIN")
    )
  ) {
    // Calling an unresolvable host should raise a ConnectError with
    // Code.Aborted.
    // This behavior is covered by the crosstest "unresolvable_host".
    code = Code.Unavailable;
  }
  return connectErrorFromReason(reason, code);
}

/**
 * Unwraps a chain of errors, by walking through all "cause" properties
 * recursively.
 * This function is useful to find the root cause of an error.
 */
export function unwrapNodeErrorChain(reason: unknown): Error[] {
  const chain: Error[] = [];
  for (;;) {
    if (!(reason instanceof Error)) {
      break;
    }
    if (chain.includes(reason)) {
      // safeguard against infinite loop when "cause" points to an ancestor
      break;
    }
    chain.push(reason);
    if (!("cause" in reason)) {
      break;
    }
    reason = reason.cause;
  }
  return chain;
}

/**
 * Returns standard Node.js error properties from the given reason, if present.
 *
 * For context: Every error raised by Node.js APIs should expose a `code`
 * property - a string that permanently identifies the error. Some errors may
 * have an additional `syscall` property - a string that identifies native
 * components, for example "getaddrinfo" of libuv.
 * For more information, see https://github.com/nodejs/node/blob/f6052c68c1f9a4400a723e9c0b79da14197ab754/lib/internal/errors.js
 */
export function getNodeErrorProps(reason: unknown): {
  code?: string;
  syscall?: string;
} {
  const props: { code?: string; syscall?: string } = {};
  if (reason instanceof Error) {
    if ("code" in reason && typeof reason.code == "string") {
      props.code = reason.code;
    }
    if ("syscall" in reason && typeof reason.syscall == "string") {
      props.syscall = reason.syscall;
    }
  }
  return props;
}

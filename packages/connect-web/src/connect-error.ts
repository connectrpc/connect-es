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

import { Code, codeToString } from "./code.js";
import type { Any, AnyMessage, JsonValue } from "@bufbuild/protobuf";

// TODO "procedure" - service / method name would be convenient to have her
// TODO nest errors á la https://github.com/Veetaha/ts-nested-error/blob/master/src/nested-error.ts ?

/**
 * ConnectError captures three pieces of information: a Code, an error
 * message, and an optional collection of arbitrary Protobuf messages called
 * "details".
 *
 * Because developer tools typically show just the error message, we prefix
 * it with the status code.
 *
 * Error details are wrapped with google.protobuf.Any on the wire, so that
 * a server or middleware can attach arbitrary data to an error. We
 * automatically unwrap the details for you.
 */
export class ConnectError extends Error {
  /**
   * The Code for this error.
   */
  readonly code: Code;

  /**
   * Optional collection of arbitrary Protobuf messages.
   */
  readonly details: AnyMessage[];

  /**
   * A union of response headers and trailers associated with this error.
   */
  readonly metadata: Headers;

  /**
   * When an error is parsed from the wire, details are unwrapped
   * automatically from google.protobuf.Any, but we can only do so if you
   * provide the message types in a type registry. If a message type is not
   * given in a type registry, the unwrapped details are available here.
   */
  readonly rawDetails: RawDetail[];

  /**
   * The error message, but without a status code in front.
   *
   * For example, a new `ConnectError("hello", Code.NotFound)` will have
   * the message `[not found] hello`, and the rawMessage `hello`.
   */
  readonly rawMessage: string;

  override name = "ConnectError";

  constructor(
    message: string,
    code: Code = Code.Unknown,
    details?: AnyMessage[],
    metadata?: HeadersInit
  ) {
    super(syntheticMessage(code, message));
    // see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#example
    Object.setPrototypeOf(this, new.target.prototype);
    this.rawMessage = message;
    this.code = code;
    this.details = details ?? [];
    this.metadata = new Headers(metadata);
    this.rawDetails = [];
  }
}

/**
 * A raw detail is a google.protobuf.Any, or it's JSON representation.
 * This type is used for error details that we could not unwrap because
 * we are missing type information.
 */
export type RawDetail =
  | Any
  | {
      "@type": string;
      [key: string]: JsonValue;
    };

function syntheticMessage(code: Code, message: string) {
  return message.length
    ? `[${codeToString(code)}] ${message}`
    : `[${codeToString(code)}]`;
}

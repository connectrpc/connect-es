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
import {
  Any,
  AnyMessage,
  createRegistry,
  IMessageTypeRegistry,
  Message,
  MessageType,
} from "@bufbuild/protobuf";

/**
 * ConnectError captures three pieces of information: a Code, an error
 * message, and an optional collection of arbitrary Protobuf messages called
 * "details".
 *
 * Because developer tools typically show just the error message, we prefix
 * it with the status code, so that the most important information is always
 * visible immediately.
 *
 * Error details are wrapped with google.protobuf.Any on the wire, so that
 * a server or middleware can attach arbitrary data to an error. Use the
 * function connectErrorDetails() to retrieve the details.
 */
export class ConnectError extends Error {
  /**
   * The Code for this error.
   */
  readonly code: Code;

  /**
   * A union of response headers and trailers associated with this error.
   */
  readonly metadata: Headers;

  /**
   * When an error is parsed from the wire, error details are stored in
   * this property. They can be retrieved using connectErrorDetails().
   */
  details: Pick<Any, "typeUrl" | "value">[];

  /**
   * The error message, but without a status code in front.
   *
   * For example, a new `ConnectError("hello", Code.NotFound)` will have
   * the message `[not found] hello`, and the rawMessage `hello`.
   */
  readonly rawMessage: string;

  override name = "ConnectError";

  /**
   * Create a new ConnectError. If no code is provided, code "unknown" is
   * used.
   */
  constructor(message: string, code?: Code, metadata?: HeadersInit);
  /**
   * @deprecated We do not support providing error details in the constructor.
   * This signature was left here by accident, and will be removed in the next
   * release.
   */
  constructor(
    message: string,
    code?: Code,
    details?: AnyMessage[],
    metadata?: HeadersInit
  );
  constructor(
    message: string,
    code: Code = Code.Unknown,
    detailsOrMetadata?: AnyMessage[] | HeadersInit,
    metadata?: HeadersInit
  ) {
    super(createMessage(message, code));
    // see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#example
    Object.setPrototypeOf(this, new.target.prototype);
    this.rawMessage = message;
    this.code = code;
    // TODO once we remove the deprecated constructor, this can become `new Headers(metadata ?? {})`
    const metadataInit =
      metadata ??
      (Array.isArray(detailsOrMetadata) ? undefined : detailsOrMetadata) ??
      {};
    this.metadata = new Headers(metadataInit);
    this.details = [];
  }
}

/**
 * Retrieve error details from a ConnectError. On the wire, error details are
 * wrapped with google.protobuf.Any, so that a server or middleware can attach
 * arbitrary data to an error. This function decodes the array of error details
 * from the ConnectError object, and returns an array with the decoded
 * messages. Any decoding errors are ignored, and the detail will simply be
 * omitted from the list.
 */
export function connectErrorDetails<T extends Message<T>>(
  error: ConnectError,
  type: MessageType<T>
): T[];
export function connectErrorDetails(
  error: ConnectError,
  type: MessageType,
  ...moreTypes: MessageType[]
): AnyMessage[];
export function connectErrorDetails(
  error: ConnectError,
  registry: IMessageTypeRegistry
): AnyMessage[];
export function connectErrorDetails(
  error: ConnectError,
  typeOrRegistry: MessageType | IMessageTypeRegistry,
  ...moreTypes: MessageType[]
): AnyMessage[] {
  const typeRegistry =
    "typeName" in typeOrRegistry
      ? createRegistry(typeOrRegistry, ...moreTypes)
      : typeOrRegistry;
  const details: AnyMessage[] = [];
  for (const data of error.details) {
    try {
      const any = new Any(data);
      const name = any.typeUrl.substring(any.typeUrl.lastIndexOf("/") + 1);
      const type = typeRegistry.findMessage(name);
      if (type) {
        const message = new type();
        if (any.unpackTo(message)) {
          details.push(message);
        }
      }
    } catch (_) {
      //
    }
  }
  return details;
}

/**
 * Create an error message, prefixing the given code.
 */
function createMessage(message: string, code: Code) {
  return message.length
    ? `[${codeToString(code)}] ${message}`
    : `[${codeToString(code)}]`;
}

/**
 * Convert any value - typically a caught error into a ConnectError,
 * following these rules:
 * - If the value is already a ConnectError, return it as is.
 * - If the value is an AbortError from the fetch API, return the message
 *   of the AbortError with code Canceled.
 * - For other Errors, return the Errors message with code Unknown by default.
 * - For other values, return the values String representation as a message,
 *   with the code Unknown by default.
 */
export function connectErrorFromReason(
  reason: unknown,
  code = Code.Unknown
): ConnectError {
  if (reason instanceof ConnectError) {
    return reason;
  }
  if (reason instanceof Error) {
    if (reason.name == "AbortError") {
      // Fetch requests can only be canceled with an AbortController.
      // We detect that condition by looking at the name of the raised
      // error object, and translate to the appropriate status code.
      return new ConnectError(reason.message, Code.Canceled);
    }
    return new ConnectError(reason.message);
  }
  return new ConnectError(String(reason), code);
}

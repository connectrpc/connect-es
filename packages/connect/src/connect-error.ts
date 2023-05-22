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

import { Code } from "./code.js";
import type {
  AnyMessage,
  IMessageTypeRegistry,
  JsonValue,
  MessageType,
} from "@bufbuild/protobuf";
import { 
  createRegistry, 
  Message } from '@bufbuild/protobuf'
import { codeToString } from "./protocol-connect/code-string.js";

/**
 * ConnectError captures four pieces of information: a Code, an error
 * message, an optional cause of the error, and an optional collection of
 * arbitrary Protobuf messages called  "details".
 *
 * Because developer tools typically show just the error message, we prefix
 * it with the status code, so that the most important information is always
 * visible immediately.
 *
 * Error details are wrapped with google.protobuf.Any on the wire, so that
 * a server or middleware can attach arbitrary data to an error. Use the
 * method findDetails() to retrieve the details.
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
   * When an error is parsed from the wire, incoming error details are stored
   * in this property. They can be retrieved using findDetails().
   *
   * When an error is constructed to be sent over the wire, outgoing error
   * details are stored in this property as well.
   */
  details: (Message | IncomingDetail)[];

  /**
   * The error message, but without a status code in front.
   *
   * For example, a new `ConnectError("hello", Code.NotFound)` will have
   * the message `[not found] hello`, and the rawMessage `hello`.
   */
  readonly rawMessage: string;

  override name = "ConnectError";

  /**
   * The underlying cause of this error.  In cases where the actual cause is
   * elided with the error message, the cause is specified here so that we don't
   * leak the underlying error, but instead make it available for logging.
   */
  cause: unknown | undefined;

  /**
   * Create a new ConnectError.
   * If no code is provided, code "unknown" is used.
   * Outgoing details are only relevant for the server side - a service may
   * raise an error with details, and it is up to the protocol implementation
   * to encode and send the details along with error.
   */
  constructor(
    message: string,
    code: Code = Code.Unknown,
    metadata?: HeadersInit,
    outgoingDetails?: Message[],
    cause?: unknown
  ) {
    super(createMessage(message, code));
    // see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#example
    Object.setPrototypeOf(this, new.target.prototype);
    this.rawMessage = message;
    this.code = code;
    this.metadata = new Headers(metadata ?? {});
    this.details = outgoingDetails ?? [];
    this.cause = cause;
  }

  /**
   * Convert any value - typically a caught error into a ConnectError,
   * following these rules:
   * - If the value is already a ConnectError, return it as is.
   * - If the value is an AbortError from the fetch API, return the message
   *   of the AbortError with code Canceled.
   * - For other Errors, return the error message with code Unknown by default.
   * - For other values, return the values String representation as a message,
   *   with the code Unknown by default.
   */
  static from(reason: unknown, code = Code.Unknown): ConnectError {
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
      return new ConnectError(reason.message, code);
    }
    return new ConnectError(String(reason), code);
  }

  /**
   * Retrieve error details from a ConnectError. On the wire, error details are
   * wrapped with google.protobuf.Any, so that a server or middleware can attach
   * arbitrary data to an error. This function decodes the array of error details
   * from the ConnectError object, and returns an array with the decoded
   * messages. Any decoding errors are ignored, and the detail will simply be
   * omitted from the list.
   */
  findDetails<T extends Message<T>>(type: MessageType<T>): T[];
  findDetails(registry: IMessageTypeRegistry): AnyMessage[];
  findDetails(
    typeOrRegistry: MessageType | IMessageTypeRegistry
  ): AnyMessage[] {
    const registry =
      "typeName" in typeOrRegistry
        ? {
            findMessage: (typeName: string): MessageType | undefined =>
              typeName === typeOrRegistry.typeName ? typeOrRegistry : undefined,
          }
        : typeOrRegistry;
    const details: AnyMessage[] = [];
    for (const data of this.details) {
      if (data instanceof Message) {
        if (registry.findMessage(data.getType().typeName)) {
          details.push(data);
        }
        continue;
      }
      const type = registry.findMessage(data.type);
      if (type) {
        try {
          details.push(type.fromBinary(data.value));
        } catch (_) {
          // We silently give up if we are unable to parse the detail, because
          // that appears to be the least worst behavior.
          // It is very unlikely that a user surrounds a catch body handling the
          // error with another try-catch statement, and we do not want to
          // recommend doing so.
        }
      }
    }
    return details;
  }
}

/**
 * An incoming detail is basically a google.protobuf.Any, but it includes an
 * optional JSON representation in the "debug" key, and stores a type name
 * instead of a type URL.
 */
type IncomingDetail = { type: string; value: Uint8Array; debug?: JsonValue };

/**
 * Retrieve error details from a ConnectError. On the wire, error details are
 * wrapped with google.protobuf.Any, so that a server or middleware can attach
 * arbitrary data to an error. This function decodes the array of error details
 * from the ConnectError object, and returns an array with the decoded
 * messages. Any decoding errors are ignored, and the detail will simply be
 * omitted from the list.
 *
 * @deprecated use ConnectError.findDetails() instead
 */
export function connectErrorDetails<T extends Message<T>>(
  error: ConnectError,
  type: MessageType<T>
): T[];
/**
 * @deprecated use ConnectError.findDetails() instead
 */
export function connectErrorDetails(
  error: ConnectError,
  type: MessageType,
  ...moreTypes: MessageType[]
): AnyMessage[];
/**
 * @deprecated use ConnectError.findDetails() instead
 */
export function connectErrorDetails(
  error: ConnectError,
  registry: IMessageTypeRegistry
): AnyMessage[];
/**
 * @deprecated use ConnectError.findDetails() instead
 */
export function connectErrorDetails(
  error: ConnectError,
  typeOrRegistry: MessageType | IMessageTypeRegistry,
  ...moreTypes: MessageType[]
): AnyMessage[] {
  const types: MessageType[] =
    "typeName" in typeOrRegistry ? [typeOrRegistry, ...moreTypes] : [];
  const registry =
    "typeName" in typeOrRegistry ? createRegistry(...types) : typeOrRegistry;
  const details: AnyMessage[] = [];
  for (const data of error.details) {
    if (data instanceof Message) {
      if (registry.findMessage(data.getType().typeName)) {
        details.push(data);
      }
      continue;
    }
    const type = registry.findMessage(data.type);
    if (type) {
      try {
        details.push(type.fromBinary(data.value));
      } catch (_) {
        // We silently give up if we are unable to parse the detail, because
        // that appears to be the least worst behavior.
        // It is very unlikely that a user surrounds a catch body handling the
        // error with another try-catch statement, and we do not want to
        // recommend doing so.
      }
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
 * - For other Errors, return the error message with code Unknown by default.
 * - For other values, return the values String representation as a message,
 *   with the code Unknown by default.
 *
 * @deprecated use ConnectError.from() instead
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
    return new ConnectError(reason.message, code);
  }
  return new ConnectError(String(reason), code);
}

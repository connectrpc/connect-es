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

import { Code, codeFromString, codeToString } from "./code.js";
import {
  AnyMessage,
  IMessageTypeRegistry,
  JsonValue,
  Message,
  MessageType,
  proto3,
} from "@bufbuild/protobuf";
import { Any, TypeRegistry } from "@bufbuild/protobuf";

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
  readonly rawDetails: RawErrorDetail[];

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
    super(createMessage(message, code));
    // see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#example
    Object.setPrototypeOf(this, new.target.prototype);
    this.rawMessage = message;
    this.code = code;
    this.metadata = new Headers(metadata);
    this.rawDetails = [];
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
      ? TypeRegistry.from(typeOrRegistry, ...moreTypes)
      : typeOrRegistry;
  const details: AnyMessage[] = [];
  for (const raw of error.rawDetails) {
    try {
      const any = "@type" in raw ? Any.fromJson(raw, { typeRegistry }) : raw;
      const name = any.typeUrl.substring(any.typeUrl.lastIndexOf("/") + 1);
      const type = typeRegistry.findMessage(name);
      if (type) {
        const message = new type();
        any.unpackTo(message);
        details.push(message);
      }
    } catch (_) {
      //
    }
  }
  return details;
}

/**
 * A raw error detail is a google.protobuf.Any, or it's JSON representation.
 * This type is used for error details that we could not unwrap because
 * we are missing type information.
 */
export type RawErrorDetail =
  | Any
  | {
      "@type": string;
      [key: string]: JsonValue;
    };

/**
 * Create an error message, prefixing the given code.
 */
function createMessage(message: string, code: Code) {
  return message.length
    ? `[${codeToString(code)}] ${message}`
    : `[${codeToString(code)}]`;
}

/**
 * Parse a Connect error from a JSON value.
 * Will return a ConnectError, but throw one in case the JSON is malformed.
 */
export function connectErrorFromJson(
  jsonValue: JsonValue,
  metadata?: HeadersInit
): ConnectError {
  if (
    typeof jsonValue !== "object" ||
    jsonValue == null ||
    Array.isArray(jsonValue) ||
    !("code" in jsonValue) ||
    typeof jsonValue.code !== "string"
  ) {
    throw newParseError(jsonValue);
  }
  const code = codeFromString(jsonValue.code);
  if (!code) {
    throw newParseError(jsonValue.code, ".code");
  }
  const message = jsonValue.message;
  if (message != null && typeof message !== "string") {
    throw newParseError(jsonValue.code, ".message");
  }
  const error = new ConnectError(message ?? "", code, undefined, metadata);
  if ("details" in jsonValue && Array.isArray(jsonValue.details)) {
    error.rawDetails.push(...(jsonValue.details as RawErrorDetail[]));
  }
  return error;
}

/**
 * Convert any value - typically a caught error into a ConnectError.
 * If the value is already a ConnectError, return it as is.
 * If the value is an AbortError from the fetch API, return code Canceled.
 * For other values, return code Internal.
 */
export function connectErrorFromReason(reason: unknown): ConnectError {
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
  return new ConnectError(String(reason), Code.Internal);
}

/**
 * newParseError() is an internal utility to create a ConnectError while
 * parsing a Connect EndStreamResponse or a Connect Error from the wire.
 */
export function newParseError(
  error: unknown,
  property: string,
  json: false
): ConnectError;
export function newParseError(
  value: JsonValue,
  property?: string,
  json?: true
): ConnectError;
export function newParseError(
  valueOrError: JsonValue | unknown,
  property?: string,
  json?: boolean
): ConnectError {
  let d: string;
  if (json ?? true) {
    d = proto3.json.debug(valueOrError as JsonValue);
  } else {
    property = "";
    d =
      valueOrError instanceof Error
        ? valueOrError.message
        : String(valueOrError);
  }
  return new ConnectError(
    `cannot decode ConnectError${property ?? ""} from JSON: ${d}`,
    Code.Internal
  );
}

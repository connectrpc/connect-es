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
  proto3,
} from "@bufbuild/protobuf";
import { Any } from "@bufbuild/protobuf";

// TODO "procedure" - service / method name would be convenient to have here

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

/**
 * Parse an error from a JSON value.
 * Will return a ConnectError, but throw one in case the JSON is malformed.
 */
export function connectErrorFromJson(
  jsonValue: JsonValue,
  options?: { typeRegistry?: IMessageTypeRegistry; metadata?: HeadersInit }
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
  const error = new ConnectError(
    message ?? "",
    code,
    undefined,
    options?.metadata
  );
  if ("details" in jsonValue && Array.isArray(jsonValue.details)) {
    for (const raw of jsonValue.details) {
      let any: Any;
      try {
        any = Any.fromJson(raw, options);
      } catch (e) {
        // We consider error details to be supplementary information.
        // Parsing error details must not hide elementary information
        // like code and message, so we deliberately ignore parsing
        // errors here.
        error.rawDetails.push(raw as RawDetail);
        continue;
      }
      const typeName = any.typeUrl.substring(any.typeUrl.lastIndexOf("/") + 1);
      if (!options?.typeRegistry) {
        error.rawDetails.push(raw as RawDetail);
        continue;
      }
      const messageType = options.typeRegistry.findMessage(typeName);
      if (messageType) {
        const message = new messageType();
        if (any.unpackTo(message)) {
          error.details.push(message);
        }
      }
    }
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
 * newParseError() is an internal utility to create a ConnectError
 * while parsing a Connect EndStreamResponse or a Connect Error.
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

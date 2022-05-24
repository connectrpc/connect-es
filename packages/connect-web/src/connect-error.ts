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
  StatusCode,
  statusCodeFromString,
  statusCodeToString,
} from "./status-code.js";
import {
  Any,
  AnyMessage,
  IMessageTypeRegistry,
  JsonValue,
  MessageType,
  proto3,
  TypeRegistry,
} from "@bufbuild/protobuf";

// TODO "procedure" - service / method name would be convenient to have her
// TODO nest errors á la https://github.com/Veetaha/ts-nested-error/blob/master/src/nested-error.ts ?

/**
 * ErrorCode is every StatusCode, except Ok.
 */
type ErrorCode = Exclude<StatusCode, StatusCode.Ok>;

/**
 * ConnectError captures three pieces of information: a StatusCode, an error
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
   * The StatusCode for this error. This is never StatusCode.Ok.
   */
  readonly code: ErrorCode;

  /**
   * Optional collection of arbitrary Protobuf messages.
   */
  readonly details: AnyMessage[];

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
   * For example, a new `ConnectError("hello", StatusCode.NotFound)` will have
   * the message `[not found] hello`, and the rawMessage `hello`.
   */
  readonly rawMessage: string;

  override name = "ConnectError";

  constructor(
    message: string,
    code: ErrorCode = StatusCode.Unknown,
    details?: AnyMessage[]
  ) {
    super(`[${statusCodeToString(code)}] ${message}`);
    // see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#example
    Object.setPrototypeOf(this, new.target.prototype);
    this.rawMessage = message;
    this.code = code;
    this.details = details ?? [];
    this.rawDetails = [];
  }

  /**
   * Serialize the error to its JSON representation. Error details are wrapped
   * in google.protobuf.Any, so that they are self-describing.
   */
  toJson(): JsonValue {
    const value: { code: string; message: string; details?: JsonValue[] } = {
      code: statusCodeToString(this.code),
      message: this.rawMessage,
    };
    if (this.details.length > 0) {
      const typeRegistry = TypeRegistry.fromIterable(
        this.details.reduce(
          (prev, cur) => addTypesToSet(cur.getType(), prev),
          new Set<MessageType>()
        )
      );
      value.details = this.details.map((detail) => {
        const any = new Any();
        any.packFrom(detail);
        return any.toJson({ typeRegistry });
      });
    }
    return value;
  }

  /**
   * Serialize an error to a JSON string.
   */
  toJsonString(options?: { prettySpaces?: number }): string {
    return JSON.stringify(this.toJson(), null, options?.prettySpaces ?? 0);
  }

  /**
   * Parse an error from a JSON string.
   * Will return a ConnectError, but throw one in case the JSON is malformed.
   */
  static fromJsonString(jsonString: string): ConnectError {
    let json: JsonValue;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      json = JSON.parse(jsonString);
    } catch (e) {
      throw newParseError(e, "syntax");
    }
    return this.fromJson(json);
  }

  /**
   * Parse an error from a JSON value.
   * Will return a ConnectError, but throw one in case the JSON is malformed.
   */
  static fromJson(
    jsonValue: JsonValue,
    options?: { typeRegistry?: IMessageTypeRegistry }
  ): ConnectError {
    if (
      typeof jsonValue !== "object" ||
      jsonValue == null ||
      Array.isArray(jsonValue) ||
      !("code" in jsonValue) ||
      !("message" in jsonValue) ||
      typeof jsonValue.code !== "string" ||
      typeof jsonValue.message !== "string"
    ) {
      throw newParseError(jsonValue);
    }
    const code = statusCodeFromString(jsonValue.code);
    if (code == undefined || code == StatusCode.Ok) {
      throw newParseError(jsonValue.code, ".code");
    }
    const error = new ConnectError(jsonValue.message, code);
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
        const typeName = any.typeUrl.substring(
          any.typeUrl.lastIndexOf("/") + 1
        );
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
}

/**
 * A raw detail is a google.protobuf.Any, or it's JSON representation.
 * This type is used for error details that we could not unwrap because
 * we are missing type information.
 */
type RawDetail =
  | Any
  | {
      "@type": string;
      [key: string]: JsonValue;
    };

function newParseError(value: JsonValue, property?: ".code"): ConnectError;
function newParseError(error: unknown, property: "syntax"): ConnectError;
function newParseError(
  valueOrError: unknown | JsonValue,
  property?: "syntax" | string
): ConnectError {
  let d: string;
  if (property == "syntax") {
    property = "";
    d =
      valueOrError instanceof Error
        ? valueOrError.message
        : String(valueOrError);
  } else {
    d = proto3.json.debug(valueOrError as JsonValue);
  }
  return new ConnectError(
    `cannot decode ConnectError${property ?? ""} from JSON: ${d}`,
    StatusCode.Internal
  );
}

function addTypesToSet(
  type: MessageType,
  set: Set<MessageType>
): Set<MessageType> {
  if (set.has(type)) {
    return set;
  }
  set.add(type);
  for (const field of type.fields.list()) {
    if (field.kind == "message") {
      addTypesToSet(field.T, set);
    } else if (field.kind == "map" && field.V.kind == "message") {
      addTypesToSet(field.V.T, set);
    }
  }
  return set;
}

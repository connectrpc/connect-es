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

/**
 * Serialize the error to its JSON representation. Error details are wrapped
 * in google.protobuf.Any, so that they are self-describing.
 */

import { codeFromString, codeToString } from "./code.js";
import { ConnectError, RawDetail } from "./connect-error.js";
import {
  Any,
  JsonValue,
  TypeRegistry,
  IMessageTypeRegistry,
} from "@bufbuild/protobuf";
import { newParseError } from "./private/new-parse-error.js";

export function toJson(error: ConnectError): JsonValue {
  const value: { code: string; message: string; details?: JsonValue[] } = {
    code: codeToString(error.code),
    message: error.rawMessage,
  };
  if (error.details.length > 0) {
    const typeRegistry = TypeRegistry.from(
      ...error.details.map((message) => message.getType())
    );
    value.details = error.details.map((detail) => {
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
export function toJsonString(
  error: ConnectError,
  options?: { prettySpaces?: number }
): string {
  return JSON.stringify(toJson(error), null, options?.prettySpaces ?? 0);
}

/**
 * Parse an error from a JSON string.
 * Will return a ConnectError, but throw one in case the JSON is malformed.
 */
export function fromJsonString(
  jsonString: string,
  options?: { typeRegistry?: IMessageTypeRegistry; metadata?: HeadersInit }
): ConnectError {
  let json: JsonValue;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    json = JSON.parse(jsonString);
  } catch (e) {
    throw newParseError(e, "", false);
  }
  return fromJson(json, options);
}

/**
 * Parse an error from a JSON value.
 * Will return a ConnectError, but throw one in case the JSON is malformed.
 */
export function fromJson(
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

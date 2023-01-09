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
  JsonObject,
  JsonValue,
  JsonWriteOptions,
  Message,
  protoBase64,
} from "@bufbuild/protobuf";
import type { ConnectError } from "../connect-error.js";
import { codeToString } from "../code.js";

/**
 * Serialize the given error to JSON.
 *
 * The JSON serialization options are required to produce the optional
 * human-readable representation in the "debug" key if the detail uses
 * google.protobuf.Any. If serialization of the "debug" value fails, it
 * is silently disregarded.
 *
 * See https://connect.build/docs/protocol#error-end-stream
 */
export function errorToJson(
  error: ConnectError,
  jsonWriteOptions: Partial<JsonWriteOptions> | undefined
): JsonObject {
  const o: JsonObject = {
    code: codeToString(error.code),
  };
  if (error.rawMessage.length > 0) {
    o.message = error.rawMessage;
  }
  if (error.details.length > 0) {
    type IncomingDetail = {
      type: string;
      value: Uint8Array;
      debug?: JsonValue;
    };
    o.details = error.details
      .map((value) => {
        if (value instanceof Message) {
          const i: IncomingDetail = {
            type: value.getType().typeName,
            value: value.toBinary(),
          };
          try {
            i.debug = value.toJson(jsonWriteOptions);
          } catch (e) {
            // We deliberately ignore errors that may occur when serializing
            // a message to JSON (the message contains an Any).
            // The rationale is that we are only trying to provide optional
            // debug information.
          }
          return i;
        }
        return value;
      })
      .map(({ value, ...rest }) => ({
        ...rest,
        value: protoBase64.enc(value),
      }));
  }
  return o;
}

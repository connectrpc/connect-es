// Copyright 2021-2024 The Connect Authors
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

import type {
  JsonObject,
  JsonValue,
  JsonWriteOptions,
} from "@bufbuild/protobuf";
import { errorFromJson, errorToJson } from "./error-json.js";
import { appendHeaders } from "../http-headers.js";
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";
import type { Serialization } from "../protocol/serialization.js";

/**
 * endStreamFlag indicates that the data in a EnvelopedMessage
 * is a EndStreamResponse of the Connect protocol.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export const endStreamFlag = 0b00000010;

/**
 * Represents the EndStreamResponse of the Connect protocol.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export interface EndStreamResponse {
  metadata: Headers;
  error?: ConnectError;
}

/**
 * Parse an EndStreamResponse of the Connect protocol.
 * Throws a ConnectError on malformed input.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function endStreamFromJson(
  data: Uint8Array | string,
): EndStreamResponse {
  const parseErr = new ConnectError("invalid end stream", Code.InvalidArgument);
  let jsonValue: JsonValue;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    jsonValue = JSON.parse(
      typeof data == "string" ? data : new TextDecoder().decode(data),
    );
  } catch (e) {
    throw parseErr;
  }
  if (
    typeof jsonValue != "object" ||
    jsonValue == null ||
    Array.isArray(jsonValue)
  ) {
    throw parseErr;
  }
  const metadata = new Headers();
  if ("metadata" in jsonValue) {
    if (
      typeof jsonValue.metadata != "object" ||
      jsonValue.metadata == null ||
      Array.isArray(jsonValue.metadata)
    ) {
      throw parseErr;
    }
    for (const [key, values] of Object.entries(jsonValue.metadata)) {
      if (
        !Array.isArray(values) ||
        values.some((value) => typeof value != "string")
      ) {
        throw parseErr;
      }
      for (const value of values) {
        metadata.append(key, value as string);
      }
    }
  }
  const error =
    "error" in jsonValue && jsonValue.error != null
      ? errorFromJson(jsonValue.error, metadata, parseErr)
      : undefined;
  return { metadata, error };
}

/**
 * Serialize the given EndStreamResponse to JSON.
 *
 * The JSON serialization options are required to produce the optional
 * human-readable representation of error details if the detail uses
 * google.protobuf.Any.
 *
 * See https://connectrpc.com/docs/protocol#error-end-stream
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function endStreamToJson(
  metadata: Headers,
  error: ConnectError | undefined,
  jsonWriteOptions: Partial<JsonWriteOptions> | undefined,
): JsonObject {
  const es: JsonObject = {};
  if (error !== undefined) {
    es.error = errorToJson(error, jsonWriteOptions);
    metadata = appendHeaders(metadata, error.metadata);
  }
  let hasMetadata = false;
  const md: JsonObject = {};
  metadata.forEach((value, key) => {
    hasMetadata = true;
    md[key] = [value];
  });
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (hasMetadata) {
    es.metadata = md;
  }
  return es;
}

/**
 * Create a Serialization object that serializes a Connect EndStreamResponse.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function createEndStreamSerialization(
  options: Partial<JsonWriteOptions> | undefined,
): Serialization<EndStreamResponse> {
  const textEncoder = new TextEncoder();
  return {
    serialize(data: EndStreamResponse): Uint8Array {
      try {
        const jsonObject = endStreamToJson(data.metadata, data.error, options);
        const jsonString = JSON.stringify(jsonObject);
        return textEncoder.encode(jsonString);
      } catch (e) {
        const m = e instanceof Error ? e.message : String(e);
        throw new ConnectError(
          `failed to serialize EndStreamResponse: ${m}`,
          Code.Internal,
        );
      }
    },
    parse(data: Uint8Array): EndStreamResponse {
      try {
        return endStreamFromJson(data);
      } catch (e) {
        const m = e instanceof Error ? e.message : String(e);
        throw new ConnectError(
          `failed to parse EndStreamResponse: ${m}`,
          Code.InvalidArgument,
        );
      }
    },
  };
}

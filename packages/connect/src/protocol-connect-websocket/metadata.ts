// Copyright 2021-2026 The Connect Authors
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

import type { JsonValue } from "@bufbuild/protobuf";
import { Code } from "../code.js";
import { ConnectError } from "../connect-error.js";
import { protocolError } from "./error.js";

/**
 * Encodes headers as the payload of a Leading-Metadata message.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function encodeMetadata(metadata: Headers): string {
  return JSON.stringify([...metadata]);
}

/**
 * Decodes the payload of a Leading-Metadata message into headers.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function decodeMetadata(payload: string): Headers {
  try {
    const json = JSON.parse(payload) as JsonValue;
    if (!Array.isArray(json)) {
      throw new Error("must be an array");
    }
    const metadata = new Headers();
    for (const [index, entry] of json.entries()) {
      const [key, ...values] = Array.isArray(entry) ? entry : [];
      if (
        typeof key !== "string" ||
        !values.every((value): value is string => typeof value === "string")
      ) {
        throw new Error(`entry ${index} must be an array of strings`);
      }
      if (!keyRegExp.test(key)) {
        throw new Error(`key "${key}" must be a lowercase HTTP header name`);
      }
      if (metadata.has(key)) {
        throw new Error(`key "${key}" is repeated`);
      }
      if (values.length === 0) {
        throw new Error(`key "${key}" has no value`);
      }
      for (const value of values) {
        if (!valueRegExp.test(value)) {
          throw new Error(
            `key "${key}" value must be an ASCII HTTP header value`,
          );
        }
        metadata.append(key, value);
      }
    }
    return metadata;
  } catch (e) {
    throw protocolError(`invalid metadata: ${(e as Error).message}`);
  }
}

/**
 * Rejects headers that a client may not send as Leading-Metadata.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function validateMetadata(metadata: Headers): void {
  for (const [key, value] of metadata) {
    if (reservedKeyRegExp.test(key)) {
      throw new ConnectError(
        `header "${key}" is reserved, and cannot be sent as metadata`,
        Code.Internal,
      );
    }
    // Headers already yields valid lower-case keys, so we only check values.
    if (!valueRegExp.test(value)) {
      throw new ConnectError(
        `header "${key}" must have an ASCII HTTP header value`,
        Code.Internal,
      );
    }
  }
}

/** Matches a lower-case field name, which is a token in RFC 9110. */
const keyRegExp = /^[a-z\d_!#$%&'*+.^`|~-]+$/;

/** Matches a value of only visible ASCII characters, spaces, and tabs. */
const valueRegExp = /^[\t\x20-\x7e]*$/;

/** Matches the keys that a client may not send as metadata. */
const reservedKeyRegExp = /* @__PURE__ */ new RegExp(
  "^(" +
    "accept-charset|accept-encoding|access-control-request-headers|" +
    "access-control-request-method|connection|content-length|cookie|" +
    "cookie2|date|dnt|expect|host|keep-alive|origin|referer|set-cookie|te|" +
    "trailer|transfer-encoding|upgrade|via|x-http-method|" +
    "x-http-method-override|x-method-override|proxy-.*|sec-.*|forwarded|" +
    "x-forwarded-.*|x-real-ip|connect-.*|content-type|content-encoding" +
    ")$",
);

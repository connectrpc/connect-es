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

import { Code, ConnectError } from "@bufbuild/connect-core";
import type * as http from "http";
import type * as http2 from "http2";

enum TimeoutUnit {
  Hour = "H",
  Minute = "M",
  Second = "S",
  Millisecond = "m",
  Microsecond = "u",
  Nanosecond = "n",
}

export function nodeHeaderToWebHeader(
  nodeHeaders:
    | http.OutgoingHttpHeaders
    | http.IncomingHttpHeaders
    | http2.IncomingHttpHeaders
    | http.IncomingMessage["trailers"]
): Headers {
  const header = new Headers();
  for (const [k, v] of Object.entries(nodeHeaders)) {
    if (k.startsWith(":")) {
      continue;
    }
    if (v === undefined) {
      continue;
    }
    if (typeof v == "string") {
      header.append(k, v);
    } else if (typeof v == "number") {
      header.append(k, String(v));
    } else {
      for (const e of v) {
        header.append(k, e);
      }
    }
  }
  return header;
}

export function webHeaderToNodeHeaders(
  headersInit: HeadersInit
): http.OutgoingHttpHeaders {
  const o = Object.create(null) as http.OutgoingHttpHeaders;
  if (Array.isArray(headersInit)) {
    for (const [key, value] of headersInit) {
      const k = key.toLowerCase();
      o[k] = value;
    }
  } else if ("forEach" in headersInit) {
    if (typeof headersInit.forEach == "function") {
      headersInit.forEach((value, key) => {
        const k = key.toLowerCase();
        o[k] = value;
      });
    }
  } else {
    for (const [key, value] of Object.entries<string>(headersInit)) {
      const k = key.toLowerCase();
      o[k] = value;
    }
  }
  return o;
}

export function parseGrpcTimeoutFromHeader(value: string): number | null {
  if (value.length === 0) {
    return null;
  }

  const result = value.match(/[a-z]+|[^a-z]+/gi); // splits number from character
  const [duration, unit] = result ?? [];
  const timeout = parseInt(duration ?? "");

  if (!Number.isInteger(timeout)) {
    throw new ConnectError(
      `protocol error: timeout value must be an integer: ${timeout}`,
      Code.InvalidArgument
    );
  }

  if (timeout > 99999999) {
    throw new ConnectError(
      `protocol error: invalid grpc timeout: ${timeout}`,
      Code.InvalidArgument
    );
  }

  switch (unit) {
    case TimeoutUnit.Hour:
      return timeout * 60 * 60 * 1000;
    case TimeoutUnit.Minute:
      return timeout * 60 * 60 * 1000;
    case TimeoutUnit.Second:
      return timeout * 1000;
    case TimeoutUnit.Millisecond:
      return timeout;
    case TimeoutUnit.Microsecond:
      return timeout / 1000;
    case TimeoutUnit.Nanosecond:
      return timeout / 1000 / 1000;
    default:
      throw new ConnectError(
        `protocol error: invalid grpc timeout unit: ${unit}`,
        Code.InvalidArgument
      );
  }
}

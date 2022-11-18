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

import { nodeHeaderToWebHeader } from "./web-header-to-node-headers.js";
import type * as http2 from "http2";

/**
 * Returns functions that parses the response code and response headers
 * and returns it as an array
 */
export function responseHeadersPromise(
  stream: http2.ClientHttp2Stream
): Promise<[number, Headers]> {
  return new Promise<[number, Headers]>((resolve, reject) => {
    if (stream.errored) {
      return reject(stream.errored);
    }
    stream.once("error", reject);
    function parse(
      headers: http2.IncomingHttpHeaders & http2.IncomingHttpStatusHeader
    ) {
      stream.off("error", reject);
      resolve([headers[":status"] ?? 0, nodeHeaderToWebHeader(headers)]);
    }
    stream.once("response", parse);
  });
}

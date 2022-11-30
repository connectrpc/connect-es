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

import type * as http from "http";
import * as http2 from "http2";
import { strict as assert } from "node:assert";

interface Http2Response {
  status: number;
  body: Uint8Array;
}

export function http2Request(
  method: string,
  url: URL | string,
  headers: http.OutgoingHttpHeaders,
  body?: Uint8Array,
  options?: http2.ClientSessionOptions | http2.SecureClientSessionOptions
): Promise<Http2Response> {
  return new Promise<Http2Response>((resolve, reject) => {
    http2
      .connect(url, options, (sess) => {
        const stream = sess.request({
          ...headers,
          ":method": method,
          ":path": new URL(url).pathname,
        });
        stream.once("error", reject);
        stream.once("response", (headers) => {
          const chunks: Uint8Array[] = [];

          function read() {
            let chunk: unknown;
            while (null !== (chunk = stream.read() as unknown)) {
              assert(chunk instanceof Buffer);
              chunks.push(chunk);
            }
          }

          stream.on("readable", read);
          stream.once("end", () => {
            stream.off("readable", read);
            stream.off("error", reject);
            sess.close();
            const body = Buffer.concat(chunks);
            resolve({
              status: headers[":status"] ?? -1,
              body,
            });
          });
        });
        if (body !== undefined) {
          stream.write(body);
        }
        stream.end();
      })
      .once("error", reject);
  });
}

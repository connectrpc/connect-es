// Copyright 2021-2023 The Connect Authors
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

interface Http2RequestInit {
  url: string;
  method?: string;
  body?: Uint8Array;
  ctype?: string;
  headers?: http2.OutgoingHttpHeaders;
  rejectUnauthorized?: boolean;
}

export function http2Request(init: Http2RequestInit): Promise<Http2Response> {
  return new Promise<Http2Response>((resolve, reject) => {
    const options: http2.SecureClientSessionOptions = {};
    if (init.rejectUnauthorized !== undefined) {
      options.rejectUnauthorized = init.rejectUnauthorized;
    }
    const headers: http.OutgoingHttpHeaders = {
      ...init.headers,
      ":path": new URL(init.url).pathname,
      ":method": "GET",
    };
    if (init.ctype !== undefined) {
      headers["content-type"] = init.ctype;
    }
    if (init.method !== undefined) {
      headers[":method"] = init.method;
    }
    http2
      .connect(init.url, options, (sess) => {
        const stream = sess.request(headers);
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
        if (init.body !== undefined) {
          stream.write(init.body);
        }
        stream.end();
      })
      .once("error", reject);
  });
}

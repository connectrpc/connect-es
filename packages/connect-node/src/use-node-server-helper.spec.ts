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

import * as http2 from "http2";
import * as http from "http";
import * as https from "https";

export function useNodeServer(
  createServer: () =>
    | http.Server
    | https.Server
    | http2.Http2Server
    | http2.Http2SecureServer
) {
  let server:
    | http.Server
    | https.Server
    | http2.Http2Server
    | http2.Http2SecureServer
    | undefined;

  beforeAll(function (doneFn) {
    server = createServer();
    server.listen(0, function listenCallback() {
      doneFn();
    });
  });

  afterAll(async function () {
    if (server === undefined) {
      throw new Error("server not defined");
    }
    const s = server;
    for (;;) {
      const count = await new Promise<number>((resolve, reject) => {
        s.getConnections((err, count) => {
          if (err) {
            return reject(err);
          }
          return resolve(count);
        });
      });
      if (count === 0) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    s.close();
  });

  return {
    getUrl(): string {
      if (server === undefined) {
        throw new Error("cannot get server port");
      }
      const address = server.address();
      if (address == null || typeof address == "string") {
        throw new Error("cannot get server port");
      }
      const secure =
        typeof (server as unknown as Record<string, unknown>)
          .setSecureContext == "function";
      return `${secure ? "https" : "http"}://localhost:${address.port}`;
    },
  };
}

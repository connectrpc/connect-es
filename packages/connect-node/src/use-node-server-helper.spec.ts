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

import * as http2 from "http2";
import * as http from "http";
import * as https from "https";
import type { UniversalClientFn } from "@connectrpc/connect/protocol";
import { Http2SessionManager } from "./http2-session-manager.js";
import { createNodeHttpClient } from "./node-universal-client.js";

/**
 * Before each test, spin up the given server, and tear it down again after the
 * test.
 * The teardown will wait for all connections to the server to be closed.
 * The server is accessible via the getUrl method of the returned object, or
 */
export function useNodeServer(
  createServer: () =>
    | http.Server
    | https.Server
    | http2.Http2Server
    | http2.Http2SecureServer,
) {
  let server:
    | http.Server
    | https.Server
    | http2.Http2Server
    | http2.Http2SecureServer
    | undefined;

  let client: UniversalClientFn | undefined;
  let clientSessionManager: Http2SessionManager | undefined;

  beforeEach(function (doneFn) {
    server = createServer();
    server.listen(0, function listenCallback() {
      doneFn();
    });
  });

  afterEach(async function () {
    if (server === undefined) {
      throw new Error("server not defined");
    }
    const s = server;
    for (;;) {
      // If open connections are dangling, this loop will not exit before
      // afterEach runs into a timeout.
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
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
    s.close();
  });

  return {
    getClient(): UniversalClientFn {
      if (client === undefined) {
        if (server === undefined) {
          throw new Error("cannot get client");
        }
        if (server instanceof http.Server) {
          client = createNodeHttpClient({
            httpVersion: "1.1",
          });
        } else {
          clientSessionManager = new Http2SessionManager(
            this.getUrl(),
            {
              // In tests, we typically want to make sure that we don't leave any
              // open streams dangling. We configure the session manager to close
              // idle connections after a very short amount if time.
              // This way, the server shutdown in afterEach will not time out if
              // we kept a clean house, and closed all our streams.
              idleConnectionTimeoutMs: 5,
            },
            undefined,
          );
          client = createNodeHttpClient({
            httpVersion: "2",
            sessionProvider: (authority) => {
              if (authority !== this.getUrl()) {
                throw new Error(
                  "client from useNodeServer() can only be used for requests against the server URL",
                );
              }
              clientSessionManager = new Http2SessionManager(
                authority,
                {
                  // In tests, we typically want to make sure that we don't leave any
                  // open streams dangling. We configure the session manager to close
                  // idle connections after a very short amount if time.
                  // This way, the server shutdown in afterEach will not time out if
                  // we kept a clean house, and closed all our streams.
                  idleConnectionTimeoutMs: 5,
                },
                undefined,
              );
              return clientSessionManager;
            },
          });
        }
      }
      return client;
    },
    getUrl(): string {
      if (server === undefined) {
        throw new Error("cannot get server url");
      }
      return getServerUrl(server);
    },
  };
}

function getServerUrl(
  server:
    | http.Server
    | https.Server
    | http2.Http2Server
    | http2.Http2SecureServer,
): string {
  const address = server.address();
  if (address == null || typeof address == "string") {
    throw new Error("cannot get server port");
  }
  const secure =
    typeof (server as unknown as Record<string, unknown>).setSecureContext ==
    "function";
  return `${secure ? "https" : "http"}://localhost:${address.port}`;
}

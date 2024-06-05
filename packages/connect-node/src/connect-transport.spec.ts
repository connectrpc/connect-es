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

import { Code, ConnectError } from "@connectrpc/connect";
import { createConnectTransport } from "./connect-transport.js";
import { Http2SessionManager } from "./http2-session-manager.js";

describe("createConnectTransport()", function () {
  it("should take just httpVersion and baseUrl", function () {
    const t = createConnectTransport({
      httpVersion: "2",
      baseUrl: "https://example.com",
    });
    expect(t).toBeDefined();
  });
  it("should take session options", function () {
    const t = createConnectTransport({
      httpVersion: "2",
      baseUrl: "https://example.com",
      pingIntervalMs: 1000 * 30,
      pingIdleConnection: true,
      pingTimeoutMs: 1000 * 5,
      idleConnectionTimeoutMs: 1000 * 60 * 5,
    });
    expect(t).toBeDefined();
  });
  it("should take node options", function () {
    const t = createConnectTransport({
      httpVersion: "2",
      baseUrl: "https://example.com",
      nodeOptions: {
        maxSessionMemory: 1024 * 1024 * 4,
      },
    });
    expect(t).toBeDefined();
  });
  it("should take session manager", function () {
    const sm = new Http2SessionManager(
      "https://example.com",
      {
        pingIntervalMs: 1000 * 10,
      },
      {
        maxSessionMemory: 1024 * 1024 * 4,
      },
    );
    const t = createConnectTransport({
      httpVersion: "2",
      baseUrl: "https://example.com",
      sessionManager: sm,
    });
    expect(t).toBeDefined();
  });
});

describe("using a session manager to open a connection before starting an application", function () {
  it("should work", async function () {
    const sm = new Http2SessionManager("https://demo.connectrpc.com");
    for (let backoff = 1; ; backoff++) {
      const state = await sm.connect();
      if (state == "error") {
        // For a transient error, we can retry here
        const reason = sm.error();
        if (ConnectError.from(reason).code !== Code.Unavailable) {
          throw sm.error();
        }
        await new Promise<void>((resolve) =>
          setTimeout(resolve, backoff * 1000),
        );
      } else {
        // we are connected (either open or idle), break the loop
        break;
      }
    }
    // here we would enter the application logic, and start calling RPCs
  });
});

describe("using a session manager to explicitly close all connections", function () {
  it("should work", function () {
    // create a client, keeping a reference to the session manage
    const sessionManager = new Http2SessionManager(
      "https://demo.connectrpc.com",
    );
    createConnectTransport({
      httpVersion: "2",
      baseUrl: "https://demo.connectrpc.com",
      sessionManager,
    });
    // const client = createPromiseClient(..., transport);

    // make calls with the client

    // close the connection
    sessionManager.abort();
  });
});

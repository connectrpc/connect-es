#!/usr/bin/env -S npx tsx

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

import { remote } from "webdriverio";
import * as esbuild from "esbuild";
import { parseArgs } from "node:util";
import * as http from "node:http";
import {
  invokeWithCallbackClient,
  invokeWithPromiseClient,
  ClientCompatRequest,
  ClientCompatResponse,
  ClientErrorResult,
  readSizeDelimitedBuffers,
  writeSizeDelimitedBuffer,
} from "@connectrpc/connect-conformance";
import { createTransport } from "./transport.js";

void main(process.argv.slice(2));

/**
 * This program implements a client under test for the connect conformance test
 * runner. It reads ClientCompatRequest messages from stdin. For each request,
 * it makes a call, and reports the result with a ClientCompatResponse message
 * to stdout.
 */
async function main(args: string[]) {
  const { values: flags } = parseArgs({
    args,
    options: {
      browser: { type: "string", default: "chrome" },
      headless: { type: "boolean" },
      openBrowser: { type: "boolean" },
      useCallbackClient: { type: "boolean" },
    },
  });
  switch (flags.browser) {
    case "chrome":
    case undefined:
      await runBrowser(
        "chrome",
        flags.useCallbackClient ?? false,
        flags.openBrowser ?? false,
      );
      break;
    case "firefox":
    case "safari":
      await runBrowser(
        flags.browser,
        flags.useCallbackClient ?? false,
        flags.openBrowser ?? false,
      );
      break;
    case "node":
      await runNode(flags.useCallbackClient ?? false);
      break;
    default:
      throw new Error(`Unsupported browser: ${flags.browser}`);
  }
}

/**
 * Run tests in Node.js.
 */
async function runNode(useCallbackClient: boolean) {
  const invoke = useCallbackClient
    ? invokeWithCallbackClient
    : invokeWithPromiseClient;
  for await (const next of readSizeDelimitedBuffers(process.stdin)) {
    const req = ClientCompatRequest.fromBinary(next);
    const res = new ClientCompatResponse({
      testName: req.testName,
    });
    try {
      const invokeResult = await invoke(createTransport(req), req);
      res.result = { case: "response", value: invokeResult };
    } catch (err) {
      res.result = {
        case: "error",
        value: new ClientErrorResult({
          message: `Failed to run test case: ${String(err)}`,
        }),
      };
    }
    process.stdout.write(writeSizeDelimitedBuffer(res.toBinary()));
  }
}

/**
 * Delegate tests to a browser.
 */
async function runBrowser(
  browserName: "chrome" | "firefox" | "safari",
  useCallbackClient: boolean,
  openBrowser: boolean,
) {
  const browser = await remote({
    capabilities: {
      browserName,
      acceptInsecureCerts: true,
      "goog:chromeOptions": {
        args: [
          "--disable-gpu",
          openBrowser ? "--auto-open-devtools-for-tabs" : "--headless",
        ],
      },
      "moz:firefoxOptions": {
        args: [openBrowser ? "--devtools" : "-headless"],
      },
      // Safari does not support headless mode
    },
    // Directory to store all test runner log files (including reporter logs and wdio logs).
    // If not set, all logs are streamed to stdout, which conflicts with the conformance runner I/O.
    outputDir: new URL("logs", import.meta.url).pathname,
  });

  // In Firefox, `AbortSignal.abort().reason instanceof Error` evaluates to false when the script
  // does not originate from a web page. We use a HTTP server to serve the script to avoid the issue.
  const browserscript = await buildBrowserScript();
  const browserserver = await startBrowserServer(browserscript);
  await browser.url(browserserver.url);
  for await (const next of readSizeDelimitedBuffers(process.stdin)) {
    const invokeResult = await browser.executeAsync(
      (data, useCallbackClient, done: (res: number[]) => void) => {
        void window.runTestCase(data, useCallbackClient).then(done);
      },
      Array.from(next),
      useCallbackClient,
    );
    process.stdout.write(
      writeSizeDelimitedBuffer(new Uint8Array(invokeResult)),
    );
  }
  await browser.executeScript(
    `const p = document.createElement("p");
       p.innerText = "Tests done. You can inspect requests in the network explorer."
       document.body.append(p);`,
    [],
  );
  await browserserver.close();
  if (openBrowser) {
    // Exit the client so that the test runner does not report a time-out from the client.
    // At the time of testing, this still leaves browser windows open.
    process.exit(0);
  } else {
    await browser.deleteSession();
  }
}

/**
 * Bundle the script to run in the browser.
 */
async function buildBrowserScript() {
  const buildResult = await esbuild.build({
    entryPoints: [new URL("browserscript.ts", import.meta.url).pathname],
    bundle: true,
    write: false,
  });
  if (buildResult.outputFiles.length !== 1) {
    throw new Error("Expected exactly one output file");
  }
  return buildResult.outputFiles[0].text;
}

/**
 * Start an HTTP server to serve a script.
 */
async function startBrowserServer(script: string) {
  const server = http.createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { "content-type": "text/html" });
      res.write(
        `<!DOCTYPE html><html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>@connectrpc/connect-web conformance</title>
          <link rel="icon" href="data:,">
          <script>${script}</script>
        </head>
        <body>
          <p>Waiting for tests.</p>
        </body></html>`,
        "utf8",
      );
      res.end();
      return;
    }
    res.writeHead(404);
    res.end();
  });
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const address = server.address();
  if (address == null || typeof address == "string") {
    throw new Error("cannot get server port");
  }
  return {
    url: new URL(`http://localhost:${address.port}`).toString(),
    close() {
      server.closeAllConnections();
      return new Promise<void>((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      });
    },
  };
}

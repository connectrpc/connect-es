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

const { values: flags } = parseArgs({
  args: process.argv.slice(2),
  options: {
    browser: { type: "string", default: "chrome" },
    headless: { type: "boolean" },
    openBrowser: { type: "boolean" },
    useCallbackClient: { type: "boolean" },
  },
});

void main();

/**
 * This program implements a client under test for the connect conformance test
 * runner. It reads ClientCompatRequest messages from stdin. For each request,
 * it makes a call, and reports the result with a ClientCompatResponse message
 * to stdout.
 */
async function main() {
  let invoke;
  if (flags.useCallbackClient === true) {
    invoke = invokeWithCallbackClient;
  } else {
    invoke = invokeWithPromiseClient;
  }

  if (flags.browser !== "node") {
    // If this is not Node, then run using the specified browser
    await runBrowser();
    return;
  }

  // Otherwise, run the conformance tests using Node as the environment
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

async function runBrowser() {
  let browserName: string;
  switch (flags.browser) {
    case "chrome":
    case undefined:
      browserName = "chrome";
      break;
    case "firefox":
    case "safari":
      browserName = flags.browser;
      break;
    default:
      throw new Error(`Unsupported browser: ${flags.browser}`);
  }
  const browser = await remote({
    capabilities: {
      browserName,
      acceptInsecureCerts: true,
      "goog:chromeOptions": {
        args: [
          "--disable-gpu",
          flags.openBrowser === true
            ? "--auto-open-devtools-for-tabs"
            : "--headless",
        ],
      },
      "moz:firefoxOptions": {
        args: [flags.openBrowser === true ? "--devtools" : "-headless"],
      },
      // Safari does not support headless mode
    },
    // Directory to store all testrunner log files (including reporter logs and wdio logs).
    // If not set, all logs are streamed to stdout, which conflicts with the conformance runner I/O.
    outputDir: new URL("logs", import.meta.url).pathname,
  });
  await browser.executeScript(await buildBrowserScript(), []);
  for await (const next of readSizeDelimitedBuffers(process.stdin)) {
    const invokeResult = await browser.executeAsync(
      (data, useCallbackClient, done: (res: number[]) => void) => {
        void window.runTestCase(data, useCallbackClient).then(done);
      },
      Array.from(next),
      flags.useCallbackClient === true,
    );
    process.stdout.write(
      writeSizeDelimitedBuffer(new Uint8Array(invokeResult)),
    );
  }
  if (flags.openBrowser == true) {
    await browser.executeScript(
      `const p = document.createElement("p");
       p.innerText = "Tests done. You can inspect requests in the network explorer."
       document.body.append(p);`,
      [],
    );
  } else {
    await browser.deleteSession();
  }
}

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

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
import type { RemoteOptions } from "webdriverio";
import * as esbuild from "esbuild";
import { parseArgs } from "node:util";
import {
  callbackInvoke,
  promiseInvoke,
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
  if (flags.useCallbackClient) {
    invoke = callbackInvoke;
  } else {
    invoke = promiseInvoke;
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
    } catch (e) {
      res.result = {
        case: "error",
        value: new ClientErrorResult({ message: (e as Error).message }),
      };
    }
    process.stdout.write(writeSizeDelimitedBuffer(res.toBinary()));
  }
}

async function runBrowser() {
  let capabilities: RemoteOptions["capabilities"] = {
    acceptInsecureCerts: true,
  };
  switch (flags.browser) {
    case "chrome":
    case undefined:
      capabilities = {
        ...capabilities,
        browserName: "chrome",
        "goog:chromeOptions": {
          args: [
            "--disable-gpu",
            flags.headless === true
              ? "--headless"
              : "--auto-open-devtools-for-tabs",
          ],
        },
      };
      break;
    case "firefox":
      capabilities = {
        ...capabilities,
        browserName: "firefox",
        "moz:firefoxOptions": {
          args: [flags.headless === true ? "-headless" : "--devtools"],
        },
      };
      break;
    case "safari":
      capabilities = {
        ...capabilities,
        browserName: "safari",
        // Safari does not support headless mode
      };
      break;
    default:
      throw new Error(`Unsupported browser: ${flags.browser}`);
  }
  const browser = await remote({
    // webdriverio prints all the logs to stdout, this will interfere with the conformance test output
    // so we set the log level to silent
    //
    // TODO: look for a way to redirect the logs to a file/stderr
    logLevel: "silent",
    capabilities,
  });
  await browser.executeScript(await buildBrowserScript(), []);
  for await (const next of readSizeDelimitedBuffers(process.stdin)) {
    const invokeResult = await browser.executeAsync(
      (reqBytes, useCallbackClient, done: (res: number[]) => void) => {
        void window.runTestCase(reqBytes, useCallbackClient).then(done);
      },
      Array.from(next),
      flags.useCallbackClient,
    );
    process.stdout.write(
      writeSizeDelimitedBuffer(new Uint8Array(invokeResult)),
    );
  }
  if (flags.headless === true) {
    await browser.deleteSession();
  } else {
    await browser.executeScript(
      `document.write("Tests done. You can inspect requests in the network explorer.")`,
      [],
    );
  }
}

async function buildBrowserScript() {
  const buildResult = await esbuild.build({
    entryPoints: ["./conformance/browserscript.ts"],
    bundle: true,
    write: false,
  });
  if (buildResult.outputFiles.length !== 1) {
    throw new Error("Expected exactly one output file");
  }
  return buildResult.outputFiles[0].text;
}

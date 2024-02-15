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

import { ClientCompatResponse } from "../gen/connectrpc/conformance/v1/client_compat_pb.js";
import { Buffer } from "node:buffer";
import { remote } from "webdriverio";
import type { RemoteOptions } from "webdriverio";
import * as esbuild from "esbuild";
import { parseArgs } from "node:util";
import { readSizeDelimitedBuffers } from "../protocol.js";

const { values: flags } = parseArgs({
  args: process.argv.slice(2),
  options: {
    browser: { type: "string", default: "chrome" },
  },
});

export async function run() {
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
          args: ["--disable-gpu", "--headless"],
        },
      };
      break;
    case "firefox":
      capabilities = {
        ...capabilities,
        browserName: "firefox",
        "moz:firefoxOptions": {
          args: ["-headless"],
        },
      };
      break;
    case "safari":
      capabilities = {
        ...capabilities,
        browserName: "safari",
      };
      break;
    default:
      throw new Error(`Unsupported browser: ${flags.browser}`);
  }
  const browser = await remote({
    // webdriverio prints all the logs to stdout, this will interfere with the conformance test output
    // so we set the log level to silent
    logLevel: "silent",
    capabilities,
  });
  await browser.executeScript(await buildBrowserScript(), []);
  for await (const next of readSizeDelimitedBuffers(process.stdin)) {
    const invokeResult = await browser.executeAsync(
      (reqBytes, done: (res: number[]) => void) => {
        void window.runTestCase(reqBytes).then(done);
      },
      Array.from(next),
    );
    const res = ClientCompatResponse.fromBinary(new Uint8Array(invokeResult));
    const resData = res.toBinary();
    const resSize = Buffer.alloc(4);
    resSize.writeUInt32BE(resData.length);
    process.stdout.write(resSize);
    process.stdout.write(resData);
  }
  await browser.deleteSession();
}

async function buildBrowserScript() {
  const buildResult = await esbuild.build({
    entryPoints: ["./src/web/browserscript.ts"],
    bundle: true,
    write: false,
  });
  if (buildResult.outputFiles.length !== 1) {
    throw new Error("Expected exactly one output file");
  }
  return buildResult.outputFiles[0].text;
}

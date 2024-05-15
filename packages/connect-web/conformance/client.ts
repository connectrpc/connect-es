#!/usr/bin/env -S npx tsx

import { remote } from "webdriverio";
import type { RemoteOptions } from "webdriverio";
import * as esbuild from "esbuild";
import { parseArgs } from "node:util";
import {
  invoke,
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
  },
});

export async function run() {
  if (flags.browser !== "node") {
    await runBrowser();
  }
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
      (reqBytes, done: (res: number[]) => void) => {
        void window.runTestCase(reqBytes).then(done);
      },
      Array.from(next),
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
run();

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

import {
  ClientCompatRequest,
  ClientCompatResponse,
  ClientErrorResult,
  ClientResponseResult,
} from "../gen/connectrpc/conformance/v1/client_compat_pb.js";
import type { ReadStream } from "node:tty";
import { remote } from "webdriverio";
import * as esbuild from "esbuild";
import {
  BidiStreamRequest,
  ClientStreamRequest,
  ServerStreamRequest,
  UnaryRequest,
  ConformancePayload_RequestInfo,
  UnimplementedRequest,
} from "../gen/connectrpc/conformance/v1/service_pb.js";
import { createRegistry } from "@bufbuild/protobuf";

const typeRegistry = createRegistry(
  UnaryRequest,
  ServerStreamRequest,
  ClientStreamRequest,
  BidiStreamRequest,
  ConformancePayload_RequestInfo,
  UnimplementedRequest,
);

export async function run() {
  const buildResult = await esbuild.build({
    entryPoints: ["./src/web/client-entry.ts"],
    bundle: true,
    format: "esm",
    write: false,
    sourcemap: "inline",
  });
  if (buildResult.outputFiles.length !== 1) {
    throw new Error("Expected exactly one output file");
  }
  const invokeScript = buildResult.outputFiles[0].text;
  const browser = await remote({
    capabilities: {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["headless", "disable-gpu"],
      },
    },
    logLevel: "error",
  });
  for await (const next of readReqBuffers(process.stdin)) {
    const req = ClientCompatRequest.fromBinary(next);
    const res = new ClientCompatResponse({
      testName: req.testName,
    });
    try {
      const invokeResultJson = (await browser.executeAsyncScript(invokeScript, [
        req.toJsonString({ typeRegistry }),
      ])) as { type: "data"; data: string } | { type: "error"; error: string };
      if (invokeResultJson.type === "data") {
        res.result = {
          case: "response",
          value: ClientResponseResult.fromJsonString(invokeResultJson.data, {
            typeRegistry,
          }),
        };
      } else {
        res.result = {
          case: "error",
          value: new ClientErrorResult({ message: invokeResultJson.error }),
        };
      }
    } catch (e) {
      res.result = {
        case: "error",
        value: new ClientErrorResult({ message: (e as Error).message }),
      };
    }
    const resData = res.toBinary();
    const resSize = Buffer.alloc(4);
    resSize.writeUInt32BE(resData.length);
    process.stdout.write(resSize);
    process.stdout.write(resData);
  }
  await browser.deleteSession();
}

async function* readReqBuffers(stream: ReadStream) {
  stream.on("error", (err) => {
    throw err;
  });
  for (; !stream.readableEnded; ) {
    const size = stream.read(4) as Buffer | null;
    if (size === null) {
      await new Promise<void>((resolve) => {
        stream.once("readable", resolve);
        stream.once("end", resolve);
      });
      continue;
    }
    let chunk: Buffer | null = null;
    // We are guaranteed to get the next chunk.
    for (;;) {
      chunk = stream.read(size.readUInt32BE()) as Buffer | null;
      if (chunk !== null) {
        break;
      }
      await new Promise((resolve) => stream.once("readable", resolve));
    }
    yield chunk;
  }
}

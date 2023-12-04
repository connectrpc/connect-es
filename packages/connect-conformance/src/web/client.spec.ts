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

import { browser } from "@wdio/globals";
import * as esbuild from "esbuild";
import { execFile } from "node:child_process";
import type { Readable } from "node:stream";
import * as net from "node:net";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join as joinPath } from "node:path";
import {
  ClientCompatRequest,
  ClientCompatResponse,
  ClientErrorResult,
  ClientResponseResult,
} from "../gen/connectrpc/conformance/v1/client_compat_pb.js";
import { createRegistry } from "@bufbuild/protobuf";
import {
  UnaryRequest,
  ServerStreamRequest,
  ClientStreamRequest,
  BidiStreamRequest,
  ConformancePayload_RequestInfo,
  UnimplementedRequest,
} from "../gen/connectrpc/conformance/v1/service_pb";

const typeRegistry = createRegistry(
  UnaryRequest,
  ServerStreamRequest,
  ClientStreamRequest,
  BidiStreamRequest,
  ConformancePayload_RequestInfo,
  UnimplementedRequest,
);

describe("Connect Conformance", () => {
  it("Connect Conformance", async () => {
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
    const server = net.createServer((socket) => void run(socket, invokeScript));
    let runnerCloseResolve: () => void,
      runnerCloseReject: (err: unknown) => void;
    const runnerClose = new Promise<void>((resolve, reject) => {
      runnerCloseResolve = resolve;
      runnerCloseReject = reject;
    });
    server.on("error", (err) => {
      runnerCloseReject(err);
    });

    const socketName = joinPath(
      mkdtempSync(joinPath(tmpdir(), "connectconformance")),
      "socket",
    );
    server.listen(socketName, () => {
      const runner = execFile(
        "./bin/connectconformance",
        [
          "--mode",
          "client",
          "--conf",
          "conformance-web.yaml",
          "-v",
          "./bin/pipe",
          socketName,
        ],
        {},
      );
      runner.stdout?.pipe(process.stdout);
      runner.stderr?.pipe(process.stderr);
      runner.on("error", (err) => {
        runnerCloseReject(err);
      });
      runner.on("close", (code) => {
        if (code !== 0) {
          runnerCloseReject(new Error(`Runner exited with code ${code}`));
        }
        runnerCloseResolve();
      });
    });
    await runnerClose.finally(() => server.close());
  });
});

async function run(socket: net.Socket, invokeScript: string) {
  for await (const next of readReqBuffers(socket)) {
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
    socket.write(resSize);
    socket.write(resData);
  }
}

async function* readReqBuffers(stream: Readable) {
  stream.once("error", (err) => {
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

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

import * as os from "node:os";
import {
  readFileSync,
  writeFileSync,
  existsSync,
  chmodSync,
  mkdirSync,
} from "node:fs";
import { join as joinPath } from "node:path";
import { unzipSync, gunzipSync } from "fflate";
import * as tar from "tar-stream";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { execFileSync } from "node:child_process";
import { fetch } from "undici";

const version = "v1.0.0-rc3";
const name = "connectconformance";
const downloadUrl = `https://github.com/connectrpc/conformance/releases/download/${version}`;

export async function run() {
  const tempDir = getTempDir();
  const artifactName = getArtifactNameForEnv();
  const assetPath = joinPath(tempDir, artifactName);
  await download(`${downloadUrl}/${artifactName}`, assetPath);
  execFileSync(await extractBin(assetPath), process.argv.slice(2), {
    stdio: "inherit",
  });
}

async function download(url: string, path: string) {
  if (existsSync(path)) {
    return;
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.statusText}`);
  }
  writeFileSync(path, new Uint8Array(await res.arrayBuffer()));
}

async function extractBin(path: string) {
  if (path.endsWith(".zip")) {
    const unzipped = unzipSync(readFileSync(path), {
      filter(file) {
        return file.name === "connectconformance.exe";
      },
    });
    const binBytes = unzipped["connectconformance.exe"] as
      | Uint8Array
      | undefined;
    if (binBytes === undefined) {
      throw new Error("Failed to extract connectconformance.exe");
    }
    const bin = joinPath(getTempDir(), "connectconformance.exe");
    writeFileSync(bin, binBytes);
    return bin;
  }
  const bin = joinPath(getTempDir(), "connectconformance");
  const extract = tar.extract();
  extract.on("entry", (header, stream, next) => {
    if (header.name === "connectconformance") {
      const chunks: Buffer[] = [];
      stream.on("data", (chunk: Buffer) => chunks.push(chunk));
      stream.on("end", () => {
        writeFileSync(bin, Buffer.concat(chunks));
        next();
      });
    } else {
      stream.on("end", next);
      stream.resume();
    }
  });
  await pipeline(
    new Readable({
      read() {
        this.push(gunzipSync(readFileSync(path)));
        this.push(null);
      },
    }),
    extract,
  );
  chmodSync(bin, 755);
  return bin;
}

function getTempDir() {
  const tempDir = joinPath(process.env["TEMP"] ?? os.tmpdir(), "conformance");
  if (!existsSync(tempDir)) {
    mkdirSync(tempDir, { recursive: true });
  }
  return tempDir;
}

function getArtifactNameForEnv() {
  let build = "";
  let ext = ".tar.gz";
  switch (os.platform()) {
    case "darwin":
      switch (os.arch()) {
        case "arm64":
          build = "Darwin-arm64";
          break;
        case "x64":
          build = "Darwin-x86_64";
          break;
        default:
          throw new Error(`Unsupported architecture: ${os.arch()}`);
      }
      break;
    case "linux":
      switch (os.arch()) {
        case "arm64":
          build = "Linux-aarch64";
          break;
        case "x64":
          build = "Linux-x86_64";
          break;
        default:
          throw new Error(`Unsupported architecture: ${os.arch()}`);
      }
      break;
    case "win32":
      ext = ".zip";
      switch (os.arch()) {
        case "arm64":
          build = "Windows-arm64";
          break;
        case "x64":
          build = "Windows-x86_64";
          break;
        default:
          throw new Error(`Unsupported architecture: ${os.arch()}`);
      }
      break;
    default:
      throw new Error(`Unsupported platform: ${os.platform()}`);
  }
  return `${name}-${version}-${build}${ext}`;
}

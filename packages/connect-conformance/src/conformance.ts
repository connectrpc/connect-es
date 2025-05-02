// Copyright 2021-2025 The Connect Authors
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
import { join as joinPath, basename } from "node:path";
import { unzipSync, gunzipSync } from "fflate";
import * as tar from "tar-stream";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { execFileSync } from "node:child_process";

export async function run(version: string) {
  const { archive, bin } = getArtifactNameForEnv(version);
  const tempDir = getTempDir(version);
  const binPath = joinPath(tempDir, bin);
  if (!existsSync(binPath)) {
    const downloadUrl = `https://github.com/connectrpc/conformance/releases/download/${version}/${archive}`;
    const archivePath = joinPath(tempDir, archive);
    await download(downloadUrl, archivePath);
    await extractBin(archivePath, binPath);
  }
  execFileSync(binPath, process.argv.slice(2), {
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

async function extractBin(archivePath: string, binPath: string) {
  const binName = basename(binPath);
  if (archivePath.endsWith(".zip")) {
    const unzipped = unzipSync(readFileSync(archivePath), {
      filter(file) {
        return file.name === binName;
      },
    });
    const binBytes = unzipped[binName] as Uint8Array | undefined;
    if (binBytes === undefined) {
      throw new Error(`Failed to extract ${binName}`);
    }
    writeFileSync(binPath, binBytes);
  }
  const extract = tar.extract();
  extract.on("entry", (header, stream, next) => {
    if (header.name === binName) {
      const chunks: Buffer[] = [];
      stream.on("data", (chunk: Buffer) => chunks.push(chunk));
      stream.on("end", () => {
        writeFileSync(binPath, Buffer.concat(chunks));
        chmodSync(binPath, 0o755);
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
        this.push(gunzipSync(readFileSync(archivePath)));
        this.push(null);
      },
    }),
    extract,
  );
}

function getTempDir(version: string) {
  const tempDir = joinPath(
    // biome-ignore lint/complexity/useLiteralKeys: prefer this to be recognizable as a dict
    process.env["TEMP"] ?? os.tmpdir(),
    `conformance-${version}`,
  );
  if (!existsSync(tempDir)) {
    mkdirSync(tempDir, { recursive: true });
  }
  return tempDir;
}

function getArtifactNameForEnv(version: string): {
  archive: string;
  bin: string;
} {
  let build = "";
  let ext = ".tar.gz";
  let bin = "connectconformance";
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
      bin = "connectconformance.exe";
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
  return {
    archive: `connectconformance-${version}-${build}${ext}`,
    bin,
  };
}

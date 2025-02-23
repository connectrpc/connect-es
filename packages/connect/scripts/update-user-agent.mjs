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

import { readFileSync, writeFileSync } from "node:fs";
import assert from "node:assert";

const paths = [
  "dist/esm/protocol-connect/request-header.js",
  "dist/esm/protocol-grpc/request-header.js",
  "dist/esm/protocol-grpc-web/request-header.js",
  "dist/cjs/protocol-connect/request-header.js",
  "dist/cjs/protocol-grpc/request-header.js",
  "dist/cjs/protocol-grpc-web/request-header.js",
];

const { version } = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url).pathname, "utf-8"),
);
assert(typeof version == "string");
assert(version.length >= 5);

let replacements = 0;
for (const path of paths) {
  const oldContent = readFileSync(path, "utf-8");
  const newContent = oldContent.replace(
    /CONNECT_ES_USER_AGENT/g,
    `connect-es/${version}`,
  );
  if (oldContent !== newContent) {
    writeFileSync(path, newContent);
    replacements++;
  }
}
assert(replacements > 0);

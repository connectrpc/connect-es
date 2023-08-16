import {readFileSync, writeFileSync} from "node:fs";
import assert from "node:assert";

const placeholder = "CONNECT_ES_USER_AGENT";

const paths = [
  "dist/esm/protocol-grpc/request-header.js",
  "dist/esm/protocol-grpc-web/request-header.js",
  "dist/cjs/protocol-grpc/request-header.js",
  "dist/cjs/protocol-grpc-web/request-header.js",
];

const {version} = JSON.parse(readFileSync(new URL("../package.json", import.meta.url).pathname, "utf-8"));
assert(typeof version == "string");
assert(version.length >= 5);

for (const path of paths) {
  const oldContent = readFileSync(path, "utf-8");
  const newContent = oldContent.replace(placeholder, `connect-es/${version}`);
  writeFileSync(path, newContent);
}

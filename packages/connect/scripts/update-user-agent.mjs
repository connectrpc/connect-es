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

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

import { buildSync } from "esbuild";
import { compress } from "brotli";

const connect = gather("src/entry-connect.ts");
const grpcweb = gather("src/entry-grpcweb.ts");

process.stdout.write(`# Code size comparison

This is a simple code size comparison between Connect-Web and gRPC-web.

We are generating code for the module [buf.build/connectrpc/eliza](https://buf.build/connectrpc/eliza)
once with \`protoc-gen-grpc-web\`, once with \`protoc-gen-connect-es\`.
Then we bundle a client for the service \`connectrpc.eliza.v1.ElizaService\`
with [esbuild](https://esbuild.github.io/), minify the bundle, and compress
it like a web server would usually do.

| code generator | bundle size        | minified               | compressed           |
|----------------|-------------------:|-----------------------:|---------------------:|
| connect        | ${connect.size} | ${connect.minified} | ${connect.compressed} |
| grpc-web       | ${grpcweb.size}    | ${grpcweb.minified}    | ${grpcweb.compressed} |
`);

function gather(entryPoint) {
  const bundle = build(entryPoint, false, "esm");
  const bundleMinified = build(entryPoint, true, "esm");
  const compressed = compress(bundleMinified);
  return {
    entryPoint,
    size: formatSize(bundle.byteLength),
    minified: formatSize(bundleMinified.byteLength),
    compressed: formatSize(compressed.byteLength),
  };
}

function build(entryPoint, minify, format) {
  const result = buildSync({
    entryPoints: [entryPoint],
    bundle: true,
    format: format,
    treeShaking: true,
    minify: minify,
    write: false,
  });
  if (result.outputFiles.length !== 1) {
    throw new Error();
  }
  return result.outputFiles[0].contents;
}

function formatSize(bytes) {
  return new Intl.NumberFormat().format(bytes) + " b";
}

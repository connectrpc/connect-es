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

import { writeFileSync } from "node:fs";
import {
  bundleStats,
  generateChart,
  generateMarkdownTable,
  injectTable,
} from "./util.js";
import { sizes } from "./constants.js";

const connectWeb = sizes.map((size) => ({
  name: "Connect-ES",
  rpcs: size,
  ...bundleStats(`src/gen/connectweb/entry-${size}.ts`),
}));

const grpcWeb = sizes.map((size) => ({
  name: "gRPC-Web",
  rpcs: size,
  ...bundleStats(`src/gen/grpcweb/entry-${size}.ts`),
}));

injectTable("README.md", generateMarkdownTable([...connectWeb, ...grpcWeb]));

writeFileSync(
  "chart.svg",
  generateChart([
    {
      name: connectWeb[0].name,
      color: "#ffa600",
      points: connectWeb.map((g) => ({ bytes: g.compressed, rpcs: g.rpcs })),
    },
    {
      name: grpcWeb[0].name,
      color: "#ff6361",
      points: grpcWeb.map((g) => ({
        bytes: g.compressed,
        rpcs: g.rpcs,
      })),
    },
  ]),
);

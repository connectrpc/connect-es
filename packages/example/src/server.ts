// Copyright 2021-2023 Buf Technologies, Inc.
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

import { createHandlers } from "@bufbuild/connect-node";
import { ElizaService } from "./gen/eliza_connectweb.js";
import http from "http";
import express from "express";
import * as esbuild from "esbuild";
import { stdout } from "process";

const handlers = createHandlers(ElizaService, {
  say(req) {
    return {
      sentence: `You said ${req.sentence}`,
    };
  },
  async *introduce(req) {
    yield { sentence: `Hi ${req.name}, I'm eliza` };
    await delay(250);
    yield {
      sentence: `Before we begin, ${req.name}, let me tell you something about myself.`,
    };
    await delay(150);
    yield { sentence: `I'm a Rogerian psychotherapist.` };
    await delay(150);
    yield { sentence: `How are you feeling today?` };
  },
  async *converse(reqs) {
    for await (const req of reqs) {
      yield {
        sentence: `You said ${req.sentence}`,
      };
    }
  },
});

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const app = express();
app.use(express.static("www"));

void esbuild.build({
  entryPoints: ["src/webclient.ts"],
  bundle: true,
  outdir: "www",
});

for (const handler of handlers) {
  app.post(handler.requestPath, handler);
}
http.createServer({}, app).listen(8080, () => {
  stdout.write("The server is listening on http://localhost:8080\n");
  stdout.write("Run `npm run client` for a terminal client.\n");
});

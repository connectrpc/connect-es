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

import { ConnectRouter } from "@bufbuild/connect";
import { connectNodeAdapter } from "@bufbuild/connect-node";
import { ElizaService } from "./gen/eliza_connect.js";
import type {
  SayRequest,
  IntroduceRequest,
  ConverseRequest,
} from "./gen/eliza_pb.js";
import * as esbuild from "esbuild";
import http2 from "http2";
import { readFileSync } from "fs";
import { stdout } from "process";
import fs from "fs";
import path from "path";

function routes(router: ConnectRouter) {
  router.service(ElizaService, {
    say(req: SayRequest) {
      return {
        sentence: `You said ${req.sentence}`,
      };
    },
    async *introduce(req: IntroduceRequest) {
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
    async *converse(reqs: AsyncIterable<ConverseRequest>) {
      for await (const req of reqs) {
        yield {
          sentence: `You said ${req.sentence}`,
        };
      }
    },
  });
}

const handler = connectNodeAdapter({
  routes,
  fallback(req, res) {
    switch (req.url) {
      case "/":
        res.writeHead(200, { "content-type": "text/html" });
        res.write(readFileSync("www/index.html", "utf8"), "utf8");
        res.end();
        break;
      case "/style.css":
        res.writeHead(200, { "content-type": "text/css" });
        res.write(readFileSync("www/style.css", "utf8"), "utf8");
        res.end();
        break;
      case "/webclient.js":
        void esbuild.build({
          entryPoints: ["src/webclient.ts"],
          bundle: true,
          outdir: "www",
        });
        res.writeHead(200, { "content-type": "application/javascript" });
        res.write(readFileSync("www/webclient.js", "utf8"), "utf8");
        res.end();
        break;
      default:
        res.writeHead(404);
        res.end();
    }
  },
});

http2
  .createSecureServer(
    {
      allowHTTP1: true,
      key: fs.readFileSync(path.join(".", "localhost-key.pem"), {
        encoding: "utf8",
      }),
      cert: fs.readFileSync(path.join(".", "localhost-cert.pem"), {
        encoding: "utf8",
      }),
    },
    handler
  )
  .listen(8080, () => {
    stdout.write("The server is listening on https://localhost:8080\n");
    stdout.write("Run `npm run client` for a terminal client.\n");
  });

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

import jscodeshift from "jscodeshift/src/core";
import { Transform } from "jscodeshift";
import { Logger } from "./logger";
import { readFileSync, writeFileSync } from "node:fs";

const codeshiftTs = jscodeshift.withParser("ts");
const codeshiftTsx = jscodeshift.withParser("tsx");
const codeshiftBabel = jscodeshift.withParser("babel");

interface UpdateSourceFileResult {
  ok: boolean;
  modified: boolean;
}

export function updateSourceFile(
  transform: Transform,
  path: string,
  logger?: Logger,
): UpdateSourceFileResult {
  logger?.log(`transform ${path}`);
  let jscs: jscodeshift.JSCodeshift;
  if (path.endsWith(".tsx")) {
    jscs = codeshiftTsx;
  } else if (path.endsWith(".ts")) {
    jscs = codeshiftTs;
  } else {
    jscs = codeshiftBabel;
  }
  try {
    const source = readFileSync(path, "utf8");
    const result = transform(
      { path, source },
      {
        jscodeshift: jscs,
        j: jscs,
        stats: () => {},
        report: () => {},
      },
      {},
    );
    if (typeof result != "string") {
      logger?.log(`skipped`);
      return { ok: true, modified: false };
    }
    if (result.trim() === source.trim()) {
      logger?.log(`not modified`);
      return { ok: true, modified: false };
    }
    writeFileSync(path, result, "utf-8");
    logger?.log(`modified`);
    return { ok: true, modified: true };
  } catch (e) {
    logger?.error(`caught error: ${String(e)}`);
    if (e instanceof Error && e.stack !== undefined) {
      logger?.error(e.stack);
    }
    return { ok: false, modified: false };
  }
}

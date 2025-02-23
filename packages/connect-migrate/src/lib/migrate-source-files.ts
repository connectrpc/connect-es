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

import { Scanned } from "./scan";
import { Logger, PrintFn } from "./logger";
import j, { Transform } from "jscodeshift";
import { readFileSync, writeFileSync } from "node:fs";

interface MigrateSourceFilesResult {
  sourceFileErrors: number;
}

export function migrateSourceFiles(
  scanned: Scanned,
  transform: j.Transform | j.Transform[],
  print: PrintFn,
  logger?: Logger,
  updateSourceFileFn: typeof updateSourceFile = updateSourceFile,
): MigrateSourceFilesResult {
  let sourceFileErrors = 0;
  if (scanned.sourceFiles.length == 0) {
    return { sourceFileErrors };
  }
  print(
    `Updating source ${
      scanned.sourceFiles.length == 1 ? "file" : "files"
    }... \n`,
  );
  let sourceFilesUpdated = false;
  for (const path of scanned.sourceFiles) {
    const r = updateSourceFileFn(transform, path, logger);
    if (r.ok) {
      if (r.modified) {
        print(`  ${path} ✓\n`);
        sourceFilesUpdated = true;
      }
    } else {
      print(`  ${path} ❌\n`);
      sourceFileErrors++;
    }
  }
  if (!sourceFilesUpdated) {
    print(`  No files modified.\n`);
  }
  return {
    sourceFileErrors,
  };
}

const codeshiftTs = j.withParser("ts");
const codeshiftTsx = j.withParser("tsx");
const codeshiftBabel = j.withParser("babel");

interface UpdateSourceFileResult {
  ok: boolean;
  modified: boolean;
}

export function updateSourceFile(
  transform: Transform | Transform[],
  path: string,
  logger?: Logger,
): UpdateSourceFileResult {
  logger?.log(`transform ${path}`);
  try {
    let source = readFileSync(path, "utf8");
    let modified = false;
    for (const t of Array.isArray(transform) ? transform : [transform]) {
      const result = updateSourceFileInMemory(t, source, path);
      source = result.source;
      modified = modified || result.modified;
    }
    if (!modified) {
      logger?.log(`skipped`);
      return { ok: true, modified: false };
    }
    writeFileSync(path, source, "utf-8");
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

export function updateSourceFileInMemory(
  transform: Transform,
  source: string,
  path: string,
): { modified: boolean; source: string } {
  let jscs: j.JSCodeshift;
  if (path.endsWith(".tsx")) {
    jscs = codeshiftTsx;
  } else if (path.endsWith(".ts")) {
    jscs = codeshiftTs;
  } else {
    jscs = codeshiftBabel;
  }
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
    return { modified: false, source };
  }
  if (result.trim() === source.trim()) {
    return { modified: false, source };
  }
  return { modified: true, source: result };
}

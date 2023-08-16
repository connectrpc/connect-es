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

import { join } from "node:path";
import { readFileSync, readdirSync } from "node:fs";
import jscodeshift from "jscodeshift/src/core";
import transform from "./modify-imports";

// Make sure to import the testfixtures from source so we're not comparing transformed fixtures
const fixtureLocation = join(
  __dirname,
  "../../../src/transforms",
  "__testfixtures__"
);

describe("modify-imports", () => {
  const tests = readdirSync(fixtureLocation).filter(
    (file) => file.endsWith(".input.ts") || file.endsWith(".input.js")
  );

  tests.forEach((test) => {
    it(`snapshot test ${test} matches expected output`, () => {
      const shift = jscodeshift.withParser(
        test.endsWith(".ts") ? "ts" : "babel"
      );
      const inputPath = join(fixtureLocation, test);
      const input = readFileSync(inputPath, "utf8");
      const expectedOutput = readFileSync(
        join(fixtureLocation, test.replace(/\.input\.(ts|js)$/, ".output.$1")),
        "utf8"
      );
      const output = transform(
        { path: inputPath, source: input },
        {
          jscodeshift: shift,
          j: shift,
          stats: () => {},
          report: () => {},
        },
        {}
      );

      expect(output?.trim()).toEqual(expectedOutput.trim());
    });
  });
});

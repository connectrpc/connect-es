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

import { execSync } from "node:child_process";

if (gitUncommitted()) {
  process.stdout.write(
    "::error::Uncommitted changes found. Please make sure this branch is up to date, and run the command locally (for example `npx turbo format`). " +
      "Verify the changes are what you want and commit them.\n",
  );
  execSync("git --no-pager diff", {
    stdio: "inherit",
  });
  process.exit(1);
}

/**
 * @returns {boolean}
 */
function gitUncommitted() {
  const out = execSync("git status --porcelain", {
    encoding: "utf-8",
  });
  return out.trim().length > 0;
}

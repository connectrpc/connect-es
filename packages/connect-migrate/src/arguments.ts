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

export interface CommandLineArgs {
  ok: true;
  help: boolean;
  version: boolean;
  ignorePatterns: string[];
  noInstall: boolean;
  forceUpdate: boolean;
}

interface CommandLineError {
  ok: false;
  errorMessage: string;
}

export function parseCommandLineArgs(
  args: string[],
): CommandLineArgs | CommandLineError {
  const parsed = {
    singleQuotes: false,
    help: false,
    version: false,
    ignorePatterns: ["**/dist/**"],
    noInstall: false,
    forceUpdate: false,
  };
  let overridingIgnore = false;
  while (args.length > 0) {
    const arg = args.shift();
    switch (arg) {
      case "-h":
      case "--help":
        if (parsed.help) {
          break;
        }
        parsed.help = true;
        break;
      case "--version":
        parsed.version = true;
        break;
      case "--no-install":
        parsed.noInstall = true;
        break;
      case "--ignore-pattern": {
        if (!overridingIgnore) {
          overridingIgnore = true;
          parsed.ignorePatterns = [];
        }
        const value = args.shift();
        if (value === undefined) {
          return {
            ok: false,
            errorMessage: `--ignore-pattern requires a value`,
          };
        }
        parsed.ignorePatterns.push(value);
        break;
      }
      case "--force": {
        parsed.forceUpdate = true;
        break;
      }
      default:
        return {
          ok: false,
          errorMessage: `unknown argument ${arg}`,
        };
    }
  }
  return { ...parsed, ok: true };
}

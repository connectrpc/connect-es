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

export interface CommandLineArgs {
  ok: true;
  help: boolean;
}

interface CommandLineError {
  ok: false;
  errorMessage: string;
}

const usage = `USAGE: connect-migrate
Updates references to connect-es packages in your project to use @connectrpc.
`;

export function parseCommandLineArgs(
  args: string[],
): CommandLineArgs | CommandLineError {
  const parsed = {
    singleQuotes: false,
    help: false,
    runInstall: false,
  };
  while (args.length > 0) {
    const arg = args.shift();
    switch (arg) {
      case "-h":
      case "--help":
        if (parsed.help) {
          break;
        }
        parsed.help = true;
        process.stdout.write(usage);
        process.exit(0);
        break;
      default:
        return {
          ok: false,
          errorMessage: `unknown argument ${arg}`,
        };
    }
  }
  return { ...parsed, ok: true };
}

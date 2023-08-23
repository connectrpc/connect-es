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

import {
  replacePackageJSONReferences,
  getInvalidUsedPackagesForPackageFile,
} from "./migrate";

describe("replacePackageJSONReferences", () => {
  it("handles parsing package.json", () => {
    expect(
      replacePackageJSONReferences(
        `
            {
                "name": "test",
                "dependencies": {
                    "@bufbuild/connect": "0.14.0",
                    "@bufbuild/connect-web": "0.14.0"
                }
            }
        `.trim()
      )
    ).toEqual(
      `
            {
                "name": "test",
                "dependencies": {
                    "@connectrpc/connect": "0.14.0",
                    "@connectrpc/connect-web": "0.14.0"
                }
            }
        `.trim()
    );
  });

  it("can forceupdate the version", () => {
    expect(
      replacePackageJSONReferences(
        `
            {
                "name": "test",
                "dependencies": {
                    "@bufbuild/connect": "0.13.0",
                    "@bufbuild/connect-web": "0.13.0"
                }
            }
        `.trim(),
        [
          {
            packageName: "@bufbuild/connect",
          },
        ]
      )
    ).toEqual(
      `
            {
                "name": "test",
                "dependencies": {
                    "@connectrpc/connect": "0.13.1",
                    "@connectrpc/connect-web": "0.13.0"
                }
            }
        `.trim()
    );
  });

  it("ignores ranges provided", () => {
    expect(
      replacePackageJSONReferences(
        `
            {
                "name": "test",
                "dependencies": {
                    "@bufbuild/connect": "^0.13.0",
                    "@bufbuild/connect-web": "^0.13.0"
                }
            }
        `.trim(),
        [
          {
            packageName: "@bufbuild/connect",
          },
          {
            packageName: "@bufbuild/connect-web",
          },
        ]
      )
    ).toEqual(
      `
            {
                "name": "test",
                "dependencies": {
                    "@connectrpc/connect": "0.13.1",
                    "@connectrpc/connect-web": "0.13.1"
                }
            }
        `.trim()
    );
  });
});

describe("getInvalidUsedPackages", () => {
  it("skips versions that satisfy", () => {
    expect(
      getInvalidUsedPackagesForPackageFile(
        `
    {
        "name": "test",
        "dependencies": {
            "@bufbuild/connect": "^0.13.1",
            "@bufbuild/connect-web": "^0.13.1"
        }
    }`.trim()
      )
    ).toEqual([]);
  });
  it("detects packages that may not satisfy our version", () => {
    expect(
      getInvalidUsedPackagesForPackageFile(
        `
    {
        "name": "test",
        "dependencies": {
            "@bufbuild/connect": "^0.13.0",
            "@bufbuild/connect-web": "^0.13.0"
        }
    }`.trim()
      )
    ).toEqual([
      {
        packageName: "@bufbuild/connect",
        version: "^0.13.0",
      },
      {
        packageName: "@bufbuild/connect-web",
        version: "^0.13.0",
      },
    ]);
  });
});

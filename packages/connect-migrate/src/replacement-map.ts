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

export const replacementMap = {
  "@bufbuild/connect": "@connectrpc/connect",
  "@bufbuild/connect-web": "@connectrpc/connect-web",
  "@bufbuild/connect-fastify": "@connectrpc/connect-fastify",
  "@bufbuild/connect-node": "@connectrpc/connect-node",
  "@bufbuild/connect-next": "@connectrpc/connect-next",
  "@bufbuild/connect-express": "@connectrpc/connect-express",
  "@bufbuild/protoc-gen-connect-es": "@connectrpc/protoc-gen-connect-es",
  "@bufbuild/protoc-gen-connect-web": "@connectrpc/protoc-gen-connect-web",
  // TODO: Add connect-query once we've published it in the new scope
} as const;

const keys = Object.keys(replacementMap) as (keyof typeof replacementMap)[];

export function getReplacementImport(sourceValue: string): string | undefined {
  const match = keys.find((key) => {
    return sourceValue.match(new RegExp(`^${key}\\b`));
  });
  if (match !== undefined) {
    return sourceValue.replace(
      new RegExp(`^${match}\\b`),
      replacementMap[match],
    );
  }
  return undefined;
}

export function replacePackageJSONReferences(jsonString: string): string {
  let result = jsonString;
  for (const key of keys) {
    result = result.replace(
      new RegExp(`"${key}":`, "g"),
      `"${replacementMap[key]}":`,
    );
  }
  return result;
}

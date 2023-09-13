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

import type * as express from "express";

/**
 * Express requires the TS compiler setting allowSyntheticDefaultImports to be
 * enabled, but we don't want to enable it just for tests because it could
 * shadow other issues we want to be aware of.
 */
export async function importExpress(): Promise<typeof express> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const expressImport = (await import("express")) as {
    default: typeof express;
  };
  return expressImport.default;
}

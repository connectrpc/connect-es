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

import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import { generateTs } from "./typescript.js";
import { generateJs } from "./javascript.js";
import { generateDts } from "./declaration.js";
import { version } from "../package.json";

export const protocGenConnectEs = createEcmaScriptPlugin({
  name: "protoc-gen-connect-es",
  version: `v${String(version)}`,
  generateTs,
  generateJs,
  generateDts,
});

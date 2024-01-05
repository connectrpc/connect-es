// Copyright 2021-2024 The Connect Authors
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

import { Headers as HeadersPolyfill } from "undici";

// The global Headers class was introduced in Node v16.15.0, behind the
// --experimental-fetch flag. It became available by default with Node
// v18.0.0.
// If this code runs in Node < 18, it installs an alternative
// implementation if one has not already been polyfilled.

const [major] = process.versions.node
  .split(".")
  .map((value) => parseInt(value, 10));
if (major < 18) {
  if (typeof globalThis.Headers === "undefined") {
    globalThis.Headers = HeadersPolyfill as unknown as typeof Headers;
  }
}

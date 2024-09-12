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

import {
  ReadableStream as NodeReadableStream,
  TransformStream as NodeTransformStream,
  WritableStream as NodeWritableStream,
} from "stream/web";

/**
 * Make the WHATWG stream implementation of Node.js v16 available in the global
 * scope.
 */
export function node16WhatwgStreamPolyfill() {
  // node >= v16 has an implementation for WHATWG streams, but doesn't expose
  // them in the global scope, nor globalThis.
  if (typeof globalThis.ReadableStream !== "function") {
    globalThis.ReadableStream =
      NodeReadableStream as unknown as typeof ReadableStream;
  }
  if (typeof globalThis.WritableStream !== "function") {
    globalThis.WritableStream =
      NodeWritableStream as unknown as typeof WritableStream;
  }
  if (typeof globalThis.TransformStream !== "function") {
    globalThis.TransformStream =
      NodeTransformStream as unknown as typeof TransformStream;
  }
}

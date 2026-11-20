// Copyright 2021-2026 The Connect Authors
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

import { describe, it } from "node:test";
import * as assert from "node:assert";
import { StringValueSchema } from "@bufbuild/protobuf/wkt";
import { deserializeMessage } from "./message.js";
import type { SerializationOptions } from "./message.js";

describe("deserializeMessage()", () => {
  it("should name the expected frame type for a message in the wrong frame", () => {
    const jsonOptions: SerializationOptions = { useBinaryFormat: false };
    const binaryOptions: SerializationOptions = { useBinaryFormat: true };
    const wrongFrames: [string | Uint8Array, SerializationOptions, RegExp][] = [
      [
        new Uint8Array([0x4d]),
        jsonOptions,
        /M message must be sent in a text frame/,
      ],
      [
        new Uint8Array([0x42]),
        jsonOptions,
        /B message must be sent in a text frame/,
      ],
      ["B", binaryOptions, /B message must be sent in a binary frame/],
    ];
    for (const [data, options, message] of wrongFrames) {
      assert.throws(
        () => deserializeMessage(data, StringValueSchema, options),
        message,
      );
    }
  });
});

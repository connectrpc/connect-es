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

import { Transform, TransformCallback } from "node:stream";
import {
  Code,
  ConnectError,
  EnvelopedMessage,
  Serialization,
} from "@bufbuild/connect-core";

/**
 * Creates a Node.js stream.Transform that takes a specified type as input, and
 * serializes it as an enveloped messages.
 */
export function transformSerialize<T>(serializer: Serialization<T>): Transform {
  return new Transform({
    decodeStrings: false,
    objectMode: true,
    readableObjectMode: true,
    writableObjectMode: true,
    transform(
      chunk: unknown,
      encoding: BufferEncoding,
      callback: TransformCallback
    ) {
      let data: Uint8Array;
      try {
        data = serializer.serialize(chunk as T);
      } catch (e) {
        return callback(new ConnectError("failed to serialize", Code.Internal));
      }
      this.push({ flags: 0, data });
      callback();
    },
  });
}

/**
 * Creates a Node.js stream.Transform that takes enveloped messages as input,
 * and parses it into the specified type.
 */
export function deserializeStream<T>(serializer: Serialization<T>): Transform {
  return new Transform({
    decodeStrings: false,
    encoding: undefined,
    objectMode: true,
    readableObjectMode: true,
    writableObjectMode: true,
    transform(
      chunk: unknown,
      encoding: BufferEncoding,
      callback: TransformCallback
    ) {
      let data: T;
      try {
        data = serializer.parse((chunk as EnvelopedMessage).data);
      } catch (e) {
        return callback(new ConnectError("failed to parse", Code.Internal));
      }
      this.push(data);
      callback(null);
    },
  });
}

// Copyright 2021-2022 Buf Technologies, Inc.
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

import type {
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
  Message,
  MethodInfo,
  PartialMessage,
} from "@bufbuild/protobuf";
import { Code, ConnectError } from "@bufbuild/connect-core";

/**
 * Returns functions to normalize and serialize the output message
 * of an RPC, and to parse the input message of an RPC.
 */
export function createServerMethodSerializers<
  I extends Message<I>,
  O extends Message<O>
>(
  jsonOptions: Partial<JsonReadOptions & JsonWriteOptions> | undefined,
  binaryOptions: Partial<BinaryReadOptions & BinaryWriteOptions> | undefined,
  method: MethodInfo<I, O>,
  useBinaryFormat: boolean
) {
  function normalize(output: O | PartialMessage<O>): O {
    return output instanceof method.O
      ? output
      : new method.O(output as PartialMessage<O>);
  }

  function serialize(message: O): Uint8Array {
    try {
      return useBinaryFormat
        ? message.toBinary(binaryOptions)
        : new TextEncoder().encode(message.toJsonString(jsonOptions));
    } catch (e) {
      const m = e instanceof Error ? e.message : String(e);
      const format = useBinaryFormat ? "binary format" : "json format";
      throw new ConnectError(`${format}: ${m}`, Code.Internal);
    }
  }

  function parse(data: Uint8Array | ArrayBuffer): I {
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
    try {
      return useBinaryFormat
        ? method.I.fromBinary(bytes, binaryOptions)
        : method.I.fromJsonString(new TextDecoder().decode(bytes), jsonOptions);
    } catch (e) {
      const m = e instanceof Error ? e.message : String(e);
      const format = useBinaryFormat ? "binary format" : "json format";
      throw new ConnectError(`${format}: ${m}`, Code.InvalidArgument);
    }
  }

  return { normalize, parse, serialize };
}

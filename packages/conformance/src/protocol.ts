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

import { ConnectError, Code } from "@connectrpc/connect";
import {
  Error as ConformanceError,
  Header as ConformanceHeader,
  ConformancePayload_RequestInfo,
} from "./gen/connectrpc/conformance/v1/service_pb.js";
import { Code as ConformanceCode } from "./gen/connectrpc/conformance/v1/config_pb.js";
import { createRegistry, Any, Message } from "@bufbuild/protobuf";

const detailsRegitry = createRegistry(ConformancePayload_RequestInfo);

export function connectErrorFromProto(err: ConformanceError) {
  // The ConnectError constructor accepts messages for details.
  // The conformance error details are the raw google.protobuf.Any messages.
  // We need to unpack the Any messages for connect to represent them accurately.
  return new ConnectError(
    err.message ?? "",
    err.code as unknown as Code,
    undefined,
    err.details.map((d) => {
      const m = d.unpack(detailsRegitry);
      if (m === undefined) {
        throw new Error(`Cannot unpack ${d.typeUrl}`);
      }
      return m;
    }),
  );
}

export function convertToProtoError(err: ConnectError | undefined) {
  if (err === undefined) {
    return undefined;
  }
  const details: Any[] = [];
  for (const detail of err.details) {
    if (detail instanceof Message) {
      details.push(Any.pack(detail));
    } else {
      details.push(
        new Any({
          typeUrl: "type.googleapis.com/" + detail.type,
          value: detail.value,
        }),
      );
    }
  }
  return new ConformanceError({
    code: err.code as unknown as ConformanceCode,
    message: err.rawMessage,
    details,
  });
}

export function convertToProtoHeaders(headers: Headers): ConformanceHeader[] {
  const result: ConformanceHeader[] = [];
  headers.forEach((value, key) => {
    result.push(
      new ConformanceHeader({
        name: key,
        value: [value],
      }),
    );
  });
  return result;
}

export function appendProtoHeaders(
  headers: Headers,
  protoHeaders: ConformanceHeader[],
) {
  for (const header of protoHeaders) {
    for (const value of header.value) {
      headers.append(header.name, value);
    }
  }
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Input from the conformance runner is a stream of size-delimited buffers.
 *
 * This function reads the stream and yields the buffers. Each buffer represents a
 *  a ClientCompatRequest.
 */
export async function* readSizeDelimitedBuffers(
  stream: AsyncIterable<Uint8Array>,
) {
  // append chunk to buffer, returning updated buffer
  function append(buffer: Uint8Array, chunk: Uint8Array): Uint8Array {
    const n = new Uint8Array(buffer.byteLength + chunk.byteLength);
    n.set(buffer);
    n.set(chunk, buffer.length);
    return n;
  }
  let buffer = new Uint8Array(0);
  for await (const chunk of stream) {
    buffer = append(buffer, chunk);
    for (;;) {
      if (buffer.byteLength < 4) {
        // size is incomplete, buffer more data
        break;
      }
      const size = new DataView(
        buffer.buffer.slice(buffer.byteOffset),
      ).getUint32(0);
      if (size + 4 > buffer.byteLength) {
        // message is incomplete, buffer more data
        break;
      }
      yield buffer.subarray(4, size + 4);
      buffer = buffer.subarray(size + 4);
    }
  }
  if (buffer.byteLength > 0) {
    throw new Error("incomplete data");
  }
}

/**
 * Output to the conformance runner is a size-delimited buffer.
 *
 * This function takes a buffer and returns a size-delimited buffer.
 */
export function writeSizeDelimitedBuffer(buffer: Uint8Array) {
  const sizeDelimited = new Uint8Array(4 + buffer.byteLength);
  new DataView(sizeDelimited.buffer).setUint32(0, buffer.byteLength);
  sizeDelimited.set(buffer, 4);
  return sizeDelimited;
}

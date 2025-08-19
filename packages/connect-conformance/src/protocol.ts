// Copyright 2021-2025 The Connect Authors
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

import { ConnectError, type Code } from "@connectrpc/connect";
import { create, createRegistry } from "@bufbuild/protobuf";
import type { DescMessage, MessageShape } from "@bufbuild/protobuf";
import {
  ErrorSchema as ConformanceErrorDesc,
  HeaderSchema as ConformanceHeaderDesc,
  ConformancePayload_RequestInfoSchema,
} from "./gen/connectrpc/conformance/v1/service_pb.js";
import type {
  Error as ConformanceError,
  Header as ConformanceHeader,
} from "./gen/connectrpc/conformance/v1/service_pb.js";
import type { Code as ConformanceCode } from "./gen/connectrpc/conformance/v1/config_pb.js";
import { AnySchema, anyPack, anyUnpack } from "@bufbuild/protobuf/wkt";
import type { Any } from "@bufbuild/protobuf/wkt";

const detailsRegitry = createRegistry(ConformancePayload_RequestInfoSchema);
import type {
  ClientCompatRequest,
  ClientResponseResult,
} from "./gen/connectrpc/conformance/v1/client_compat_pb.js";

export function getCancelTiming(compatRequest: ClientCompatRequest) {
  const def = {
    beforeCloseSend: undefined,
    afterCloseSendMs: -1,
    afterNumResponses: -1,
  };
  switch (compatRequest.cancel?.cancelTiming.case) {
    case "beforeCloseSend":
      return { ...def, beforeCloseSend: {} };
    case "afterCloseSendMs":
      return {
        ...def,
        afterCloseSendMs: compatRequest.cancel.cancelTiming.value,
      };
    case "afterNumResponses":
      return {
        ...def,
        afterNumResponses: compatRequest.cancel.cancelTiming.value,
      };
    case undefined:
      return def;
  }
}

/**
 * Get the headers for a conformance client request.
 */
export function getRequestHeaders(
  compatRequest: ClientCompatRequest,
): HeadersInit {
  const headers = new Headers();
  appendProtoHeaders(headers, compatRequest.requestHeaders);
  return headers;
}

/**
 * Get a single request message for a conformance client call.
 */
export function getSingleRequestMessage<T extends DescMessage>(
  compatRequest: ClientCompatRequest,
  desc: T,
): MessageShape<T> {
  if (compatRequest.requestMessages.length !== 1) {
    throw new Error(
      `Expected exactly one request_message in ClientCompatRequest, found ${compatRequest.requestMessages.length}`,
    );
  }
  const any = compatRequest.requestMessages[0];
  const target = anyUnpack(any, desc);
  if (!target) {
    throw new Error(
      `Could not unpack request_message from ClientCompatRequest into ${desc.typeName}`,
    );
  }
  return target;
}

/**
 * Get a request messages for a conformance client call.
 */
export function* getRequestMessages<T extends DescMessage>(
  compatRequest: ClientCompatRequest,
  desc: T,
): Iterable<MessageShape<T>> {
  for (const any of compatRequest.requestMessages) {
    const target = anyUnpack(any, desc);
    if (!target) {
      throw new Error(
        `Could not unpack request_message from ClientCompatRequest into ${desc.typeName}`,
      );
    }
    yield target;
  }
}

/**
 * Record an error from a failed conformance client call in the result message.
 */
export function setClientErrorResult(
  result: ClientResponseResult,
  error: unknown,
): void {
  const connectError = ConnectError.from(error);
  result.error = convertToProtoError(connectError);
  // We can't distinguish between headers and trailers here, so we just
  // add the metadata to both.
  //
  // But if the headers are already set, we don't need to overwrite them.
  if (result.responseHeaders.length === 0) {
    result.responseHeaders = convertToProtoHeaders(connectError.metadata);
  }
  result.responseTrailers = convertToProtoHeaders(connectError.metadata);
}

export function connectErrorFromProto(err: ConformanceError) {
  // The ConnectError constructor accepts messages for details.
  // The conformance error details are the raw google.protobuf.Any messages.
  // We need to unpack the Any messages for connect to represent them accurately.
  return new ConnectError(
    err.message ?? "",
    err.code as unknown as Code,
    undefined,
    err.details.map((d) => {
      const m = anyUnpack(d, detailsRegitry);
      if (m === undefined) {
        throw new Error(`Cannot unpack ${d.typeUrl}`);
      }
      return { desc: ConformancePayload_RequestInfoSchema, value: m };
    }),
  );
}

export function convertToProtoError(err: ConnectError | undefined) {
  if (err === undefined) {
    return undefined;
  }
  const details: Any[] = [];
  for (const detail of err.details) {
    if ("desc" in detail) {
      details.push(anyPack(detail.desc, create(detail.desc, detail.value)));
    } else {
      details.push(
        create(AnySchema, {
          typeUrl: "type.googleapis.com/" + detail.type,
          value: detail.value,
        }),
      );
    }
  }
  return create(ConformanceErrorDesc, {
    code: err.code as unknown as ConformanceCode,
    message: err.rawMessage,
    details,
  });
}

export function convertToProtoHeaders(headers: Headers): ConformanceHeader[] {
  const result: ConformanceHeader[] = [];
  headers.forEach((value, key) => {
    result.push(
      create(ConformanceHeaderDesc, {
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
  let buffer: Uint8Array = new Uint8Array(0);
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

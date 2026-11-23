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

import {
  fromBinary,
  fromJsonString,
  toBinary,
  toJsonString,
} from "@bufbuild/protobuf";
import type {
  BinaryReadOptions,
  BinaryWriteOptions,
  DescMessage,
  JsonReadOptions,
  JsonWriteOptions,
  MessageShape,
} from "@bufbuild/protobuf";
import { Code } from "../code.js";
import { ConnectError } from "../connect-error.js";
import { getJsonOptions } from "../protocol/serialization.js";
import {
  endStreamFromJson,
  endStreamToJson,
} from "../protocol-connect/end-stream.js";
import type { EndStreamResponse } from "../protocol-connect/end-stream.js";
import { protocolError } from "./error.js";
import { decodeMetadata, encodeMetadata } from "./metadata.js";

/** Marks a message that carries one RPC message. */
const markerBody = "B";

/** Marks a message that carries leading metadata. */
const markerMetadata = "M";

/** Marks the message that ends the server stream. */
const markerServerEnd = "S";

/** Marks the message that ends the client stream. */
const markerClientEnd = "C";

/** The first byte of every message, which names its type. */
type Marker =
  | typeof markerBody
  | typeof markerMetadata
  | typeof markerServerEnd
  | typeof markerClientEnd;

/** A marker and its payload, which is always text unless the marker is B. */
type RawMessage =
  | { marker: typeof markerBody; payload: string | Uint8Array }
  | { marker: Exclude<Marker, typeof markerBody>; payload: string };

/** Joins a marker and its payload into a WebSocket message of the same type. */
function encodeMessage({
  marker,
  payload,
}: RawMessage): string | Uint8Array<ArrayBuffer> {
  if (typeof payload === "string") {
    return marker + payload;
  }
  const data = new Uint8Array(payload.length + 1);
  data[0] = marker.charCodeAt(0);
  data.set(payload, 1);
  return data;
}

/** Splits the data of one WebSocket message into its marker and payload. */
function decodeMessage(data: string | Uint8Array): RawMessage {
  if (data.length === 0) {
    throw protocolError("empty message carries no marker");
  }
  const isText = typeof data === "string";
  const marker = isText ? data[0] : String.fromCharCode(data[0]);
  switch (marker) {
    case markerBody:
      return { marker, payload: isText ? data.slice(1) : data.subarray(1) };
    case markerMetadata:
    case markerServerEnd:
    case markerClientEnd:
      if (!isText) {
        throw protocolError(`${marker} message must be sent in a text frame`);
      }
      return { marker, payload: data.slice(1) };
    default:
      throw protocolError(`unknown marker "${marker}"`);
  }
}

/** A parsed message, where E is the value that ends the stream. */
type Message<T, E> =
  | { type: "metadata"; value: Headers }
  | { type: "body"; value: T }
  | { type: "end"; value: E };

/**
 * A parsed message that a client sent.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export type ClientMessage<I> = Message<I, undefined>;

/**
 * A parsed message that a server sent.
 *
 * @private Internal code, does not follow semantic versioning.
 */
type ServerMessage<O> = Message<O, EndStreamResponse>;

/**
 * Selects the format of B messages and configures their serialization.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export interface SerializationOptions {
  /**
   * Sends and expects B messages as Protobuf in binary frames, or as JSON in
   * text frames.
   */
  useBinaryFormat: boolean;

  /**
   * Options for the Protobuf format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;

  /**
   * Options for the JSON format.
   */
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;
}

/**
 * Serializes a message into the data of one WebSocket message.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function serializeMessage<Desc extends DescMessage>(
  message:
    | ClientMessage<MessageShape<Desc>>
    | ServerMessage<MessageShape<Desc>>,
  desc: Desc,
  options: SerializationOptions,
): string | Uint8Array<ArrayBuffer> {
  switch (message.type) {
    case "metadata":
      return encodeMessage({
        marker: markerMetadata,
        payload: encodeMetadata(message.value),
      });
    case "body":
      try {
        return encodeMessage({
          marker: markerBody,
          payload: options.useBinaryFormat
            ? toBinary(desc, message.value, options.binaryOptions)
            : toJsonString(desc, message.value, options.jsonOptions),
        });
      } catch (e) {
        throw ConnectError.from(e, Code.Internal);
      }
    case "end": {
      if (message.value === undefined) {
        return encodeMessage({ marker: markerClientEnd, payload: "" });
      }
      const { metadata, error } = message.value;
      const endStream = endStreamToJson(metadata, error, options.jsonOptions);
      return encodeMessage({
        marker: markerServerEnd,
        payload: JSON.stringify(endStream),
      });
    }
  }
}

/**
 * Deserializes one WebSocket message, from a client or from a server.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function deserializeMessage<Desc extends DescMessage>(
  data: string | Uint8Array,
  desc: Desc,
  options: SerializationOptions,
): ClientMessage<MessageShape<Desc>> | ServerMessage<MessageShape<Desc>> {
  const { marker, payload } = decodeMessage(data);
  switch (marker) {
    case markerBody: {
      const isBinary = typeof payload !== "string";
      if (isBinary !== options.useBinaryFormat) {
        throw protocolError(
          `B message must be sent in a ${options.useBinaryFormat ? "binary" : "text"} frame`,
        );
      }
      try {
        const value = isBinary
          ? fromBinary(desc, payload, options.binaryOptions)
          : fromJsonString(desc, payload, getJsonOptions(options.jsonOptions));
        return { type: "body", value };
      } catch (e) {
        throw protocolError(
          "B message has an invalid payload",
          e,
          Code.InvalidArgument,
        );
      }
    }
    case markerMetadata:
      return { type: "metadata", value: decodeMetadata(payload) };
    case markerServerEnd:
      try {
        return { type: "end", value: endStreamFromJson(payload) };
      } catch (e) {
        throw protocolError("S message has an invalid payload", e);
      }
    case markerClientEnd:
      if (payload !== "") {
        throw protocolError("C message has a payload");
      }
      return { type: "end", value: undefined };
  }
}

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

import type * as stream from "stream";
import type * as http2 from "http2";
import type * as http from "http";
import { assert } from "./assert.js";
import type { ReadableStreamReadResultLike } from "../lib.dom.streams.js";
import { Code, ConnectError, EnvelopedMessage } from "@bufbuild/connect-core";
import type { JsonValue } from "@bufbuild/protobuf";
import {
  nodeHeaderToWebHeader,
  webHeaderToNodeHeaders,
} from "./web-header-to-node-headers.js";

export function jsonParse(bytes: Uint8Array): JsonValue {
  const buf = bytes instanceof Buffer ? bytes : Buffer.from(bytes);
  const jsonString = buf.toString("utf8");
  return JSON.parse(jsonString) as JsonValue;
}

export function jsonSerialize(json: JsonValue): Uint8Array {
  const jsonString = JSON.stringify(json);
  const encoder = new TextEncoder();
  return encoder.encode(jsonString);
}

export async function readEnvelope(
  stream: http2.ClientHttp2Stream | stream.Readable
): Promise<ReadableStreamReadResultLike<EnvelopedMessage>> {
  const head = await read(stream, 5).catch((e) => {
    if (e instanceof ConnectError && e.code == Code.DataLoss) {
      throw new ConnectError(
        "protocol error: incomplete envelope",
        Code.InvalidArgument
      );
    }
    return Promise.reject(e);
  });
  if (head.done) {
    return {
      done: true,
    };
  }
  const v = new DataView(
    head.value.buffer,
    head.value.byteOffset,
    head.value.byteLength
  );
  const flags = v.getUint8(0);
  const len = v.getUint32(1, false);
  const body = await read(stream, len).catch((e) => {
    if (e instanceof ConnectError && e.code == Code.DataLoss) {
      throw new ConnectError(
        `protocol error: promised ${len} bytes in enveloped message, got less bytes`,
        Code.InvalidArgument
      );
    }
    return Promise.reject(e);
  });
  if (body.done) {
    if (len == 0) {
      return {
        done: false,
        value: {
          flags,
          data: new Uint8Array(0),
        },
      };
    }
    throw new ConnectError(
      `protocol error: promised ${len} bytes in enveloped message, got ${0} bytes`,
      Code.InvalidArgument
    );
  }
  return {
    done: false,
    value: {
      flags,
      data: body.value,
    },
  };
}

// Note: Will return {done: true} if size is 0
export function read(
  stream: http2.ClientHttp2Stream | stream.Readable,
  size: number
): Promise<ReadableStreamReadResultLike<Uint8Array>> {
  return new Promise<ReadableStreamReadResultLike<Uint8Array>>(
    (resolve, reject) => {
      if (stream.readableEnded || size === 0) {
        return resolve({
          done: true,
        });
      }
      if (stream.errored) {
        return reject(stream.errored);
      }
      stream.once("error", error);
      stream.once("end", end);
      if (stream.readable) {
        return read();
      }
      stream.once("readable", read);
      function error(err: Error) {
        stream.off("end", end);
        stream.off("error", error);
        stream.off("readable", read);
        reject(err);
      }
      function end() {
        stream.off("error", error);
        stream.off("readable", read);
        resolve({
          done: true,
        });
      }
      function read() {
        const chunk = stream.read(size) as unknown;
        assert(chunk instanceof Buffer || chunk === null);
        if (chunk === null) {
          stream.once("readable", read);
          return;
        }
        if (chunk.length < size) {
          return error(
            new ConnectError("premature end of stream", Code.DataLoss)
          );
        }
        stream.off("error", error);
        stream.off("readable", read);
        stream.off("end", end);
        resolve({
          done: false,
          value: chunk,
        });
      }
    }
  );
}

export function end(stream: stream.Writable): Promise<void> {
  return new Promise<void>((resolve) => {
    stream.end(resolve);
  });
}

export function write(
  stream: stream.Writable,
  data: Uint8Array | string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const encoding = typeof data == "string" ? "utf8" : "binary";
    const cb = (error: Error | null | undefined) => {
      if (error) {
        reject(error);
      }
    };
    const flushed = stream.write(data, encoding, cb);
    if (flushed) {
      resolve();
    } else {
      stream.once("drain", resolve);
    }
  });
}

export function readToEnd(stream: stream.Readable): Promise<Uint8Array> {
  return new Promise<Uint8Array>((resolve, reject) => {
    stream.once("error", reject);
    const chunks: Uint8Array[] = [];
    function read() {
      let chunk: unknown;
      while (null !== (chunk = stream.read() as unknown)) {
        assert(chunk instanceof Buffer);
        chunks.push(chunk);
      }
    }
    stream.on("readable", read);
    stream.once("end", () => {
      stream.off("readable", read);
      stream.off("error", reject);
      return resolve(Buffer.concat(chunks));
    });
  });
}

export async function endWithHttpStatus(
  res: http.ServerResponse | http2.Http2ServerResponse,
  statusCode: number,
  statusMessage: string,
  header?: HeadersInit
): Promise<void> {
  const headers: http.OutgoingHttpHeaders | undefined = header
    ? webHeaderToNodeHeaders(header)
    : undefined;
  if ("createPushResponse" in res) {
    // this is a HTTP/2 response, which does not support status messages
    res.writeHead(statusCode, headers);
  } else {
    res.writeHead(statusCode, statusMessage, headers);
  }
  await end(res);
}

/**
 * Returns a promise for the response status code and response headers
 * as a tuple.
 */
export function readResponseHeader(
  stream: http2.ClientHttp2Stream
): Promise<[number, Headers]> {
  return new Promise<[number, Headers]>((resolve, reject) => {
    if (stream.errored) {
      return reject(stream.errored);
    }
    stream.once("error", error);
    stream.once("response", parse);

    function error(err: Error) {
      stream.off("error", error);
      stream.off('"response"', parse);
      reject(err);
    }

    function parse(
      headers: http2.IncomingHttpHeaders & http2.IncomingHttpStatusHeader
    ) {
      stream.off("error", error);
      resolve([headers[":status"] ?? 0, nodeHeaderToWebHeader(headers)]);
    }
  });
}

/**
 * Returns a promise for HTTP/2 response trailers.
 */
export function readResponseTrailer(
  stream: http2.ClientHttp2Stream
): Promise<Headers> {
  return new Promise<Headers>((resolve, reject) => {
    if (stream.errored) {
      return reject(stream.errored);
    }
    if (stream.readableEnded) {
      return resolve(new Headers());
    }
    stream.once("error", error);
    stream.once("trailers", parse);
    stream.once("end", end);

    function end() {
      stream.off("error", error);
      stream.off("trailers", parse);
      stream.off("end", end);
      resolve(new Headers());
    }

    function error(err: Error) {
      stream.off("error", error);
      stream.off("trailers", parse);
      stream.off("end", end);
      reject(err);
    }

    function parse(
      headers: http2.IncomingHttpHeaders & http2.IncomingHttpStatusHeader,
      _flags: number // eslint-disable-line @typescript-eslint/no-unused-vars
    ) {
      stream.off("error", error);
      stream.off("end", end);
      resolve(nodeHeaderToWebHeader(headers));
    }
  });
}

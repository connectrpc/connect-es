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
        stream.off("timeout", timeout);
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
        stream.off("timeout", timeout);
        resolve({
          done: false,
          value: chunk,
        });
      }

      function timeout() {
        return error(new ConnectError("Timed out", Code.DeadlineExceeded));
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
    if (stream.errored) {
      return error(stream.errored);
    }

    stream.once("error", error);

    stream.once("drain", drain);
    const encoding = typeof data == "string" ? "utf8" : "binary";
    // flushed == false: the stream wishes for the calling code to wait for
    // the 'drain' event to be emitted before continuing to write additional
    // data.
    const flushed = stream.write(data, encoding, function (err) {
      if (err && !flushed) {
        // We are never getting a "drain" nor an "error" event if the stream
        // has already ended (ERR_STREAM_WRITE_AFTER_END), so we have to
        // resolve our promise in this callback.
        error(err);
        // However, once we do that (and remove our event listeners), we _do_
        // get an "error" event, which ends up as an uncaught exception.
        // We silence this error specifically with the following listener.
        // All of this seems very fragile.
        stream.once("error", () => {
          //
        });
      }
    });
    if (flushed) {
      drain();
    }

    function error(err: Error) {
      stream.off("error", error);
      stream.off("drain", drain);
      reject(err);
    }

    function drain() {
      stream.off("error", error);
      stream.off("drain", drain);
      resolve();
    }
  });
}

export function readToEnd(stream: stream.Readable): Promise<Uint8Array> {
  return new Promise<Uint8Array>((resolve, reject) => {
    if (stream.errored) {
      return error(stream.errored);
    }
    if (stream.readableEnded) {
      return aborted();
    }

    stream.once("error", error);
    stream.once("aborted", aborted);

    function aborted() {
      stream.off("readable", read);
      stream.off("error", error);
      stream.off("aborted", aborted);
      reject(new ConnectError("http stream aborted", Code.Aborted));
    }

    function error(err: Error) {
      stream.off("readable", read);
      stream.off("error", error);
      stream.off("aborted", aborted);
      reject(err);
    }

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
 * Returns a promise for the status code and headers of a HTTP/2 response.
 */
export function readResponseHeader(
  stream: http2.ClientHttp2Stream
): Promise<[number, Headers]> {
  return new Promise<[number, Headers]>((resolve, reject) => {
    if (stream.errored) {
      return error(stream.errored);
    }
    if (stream.aborted) {
      return aborted();
    }

    stream.once("error", error);
    stream.once("response", parse);
    stream.once("aborted", aborted);

    function aborted() {
      stream.off("error", error);
      stream.off("response", parse);
      stream.off("aborted", aborted);
      reject(new ConnectError("http stream aborted", Code.Aborted));
    }

    function error(err: Error) {
      stream.off("error", error);
      stream.off("response", parse);
      stream.off("aborted", aborted);
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
      return error(stream.errored);
    }
    if (stream.aborted) {
      return aborted();
    }
    if (stream.readableEnded) {
      return resolve(new Headers());
    }

    stream.once("end", end);
    stream.once("aborted", aborted);
    stream.once("error", error);
    stream.once("trailers", parse);

    function end() {
      stream.off("error", error);
      stream.off("trailers", parse);
      stream.off("end", end);
      resolve(new Headers());
    }

    function aborted() {
      stream.off("error", error);
      stream.off("response", parse);
      stream.off("aborted", aborted);
      reject(new ConnectError("http stream aborted", Code.Aborted));
    }

    function error(err: Error) {
      stream.off("end", end);
      stream.off("aborted", aborted);
      stream.off("error", error);
      stream.off("trailers", parse);
      reject(err);
    }

    function parse(
      headers: http2.IncomingHttpHeaders & http2.IncomingHttpStatusHeader,
      _flags: number // eslint-disable-line @typescript-eslint/no-unused-vars
    ) {
      stream.off("end", end);
      stream.off("aborted", aborted);
      stream.off("error", error);
      stream.off("trailers", parse);
      resolve(nodeHeaderToWebHeader(headers));
    }
  });
}

/**
 * Returns a promise for HTTP/1 response trailers.
 */
export function readHttp1ResponseTrailer(
  response: http.IncomingMessage
): Promise<Headers> {
  return new Promise<Headers>((resolve, reject) => {
    if (response.errored) {
      return error(response.errored);
    }
    if (response.aborted) {
      return aborted();
    }
    if (response.readableEnded) {
      return resolve(nodeHeaderToWebHeader(response.trailers));
    }
    response.once("end", end);
    response.once("aborted", aborted);
    response.once("error", error);

    function end() {
      response.off("end", end);
      response.off("aborted", aborted);
      response.off("error", error);
      resolve(nodeHeaderToWebHeader(response.trailers));
    }

    function aborted() {
      response.off("end", end);
      response.off("aborted", aborted);
      response.off("error", error);
      reject(new ConnectError("http stream aborted", Code.Aborted));
    }

    function error(err: Error) {
      response.off("end", end);
      response.off("aborted", aborted);
      response.off("error", error);
      reject(err);
    }
  });
}

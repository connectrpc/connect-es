import type * as stream from "stream";
import type * as http2 from "http2";
import type * as http from "http";
import { assert } from "./assert.js";
import type { ReadableStreamReadResultLike } from "../lib.dom.streams.js";
import { Code, ConnectError, EnvelopedMessage } from "@bufbuild/connect-core";
import type { JsonValue } from "@bufbuild/protobuf";

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
  const head = await read(stream, 5);
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
  const body = await read(stream, len);
  if (body.done) {
    throw new ConnectError("premature end of stream", Code.DataLoss);
  }
  return {
    done: false,
    value: {
      flags,
      data: body.value,
    },
  };
}

export function read(
  stream: http2.ClientHttp2Stream | stream.Readable,
  size: number
): Promise<ReadableStreamReadResultLike<Uint8Array>> {
  return new Promise<ReadableStreamReadResultLike<Uint8Array>>(
    (resolve, reject) => {
      if (stream.readableEnded) {
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
        stream.off("error", error);
        stream.off("readable", read);
        stream.off("end", end);
        if (chunk.length < size) {
          throw new ConnectError("premature end of stream", Code.DataLoss);
        }
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
  statusMessage: string
): Promise<void> {
  res.writeHead(statusCode, statusMessage);
  await end(res);
}

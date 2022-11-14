import type * as stream from "stream";
import type * as http2 from "http2";
import { assert } from "./assert.js";
import type { ReadableStreamReadResultLike } from "../lib.dom.streams";
import { Code, ConnectError } from "@bufbuild/connect-core";
import type { JsonValue } from "@bufbuild/protobuf";

export function write(
  stream: http2.ClientHttp2Stream | stream.Writable,
  data: Uint8Array | string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    stream.write(data, typeof data == "string" ? "utf8" : "binary", (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
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
      stream.once("error", reject);

      function read() {
        const chunk = stream.read(size) as unknown;
        assert(chunk instanceof Buffer || chunk === null);
        if (chunk === null) {
          stream.once("readable", read);
          return;
        }
        stream.off("error", reject);
        stream.off("readable", read);
        if (chunk.length < size) {
          throw new ConnectError("premature end of stream", Code.DataLoss);
        }
        resolve({
          done: false,
          value: chunk,
        });
      }

      if (stream.readable) {
        return read();
      }
      stream.once("readable", read);
    }
  );
}

export function jsonParse(bytes: Uint8Array): JsonValue {
  const buf = bytes instanceof Buffer ? bytes : Buffer.from(bytes);
  const jsonString = buf.toString("utf8");
  return JSON.parse(jsonString) as JsonValue;
}

export function readToEnd(
  stream: http2.ClientHttp2Stream
): Promise<Uint8Array> {
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

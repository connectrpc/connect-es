import * as http from "http";
import type * as http2 from "http2";
import { assert } from "./assert.js";

export async function endWithHttpStatus(
  res: http.ServerResponse | http2.Http2ServerResponse,
  statusCode: number,
  statusMessage: string
): Promise<void> {
  res.writeHead(statusCode, statusMessage);
  await end(res);
}

export function end(
  res: http.ServerResponse | http2.Http2ServerResponse
): Promise<void> {
  return new Promise<void>((resolve) => {
    res.end(resolve);
  });
}

export function write(
  res: http.ServerResponse | http2.Http2ServerResponse,
  data: Uint8Array | string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const encoding = typeof data == "string" ? "utf8" : "binary";
    const cb = (error: Error | null | undefined) => {
      if (error) {
        reject(error);
      }
    };
    const flushed =
      res instanceof http.ServerResponse
        ? res.write(data, encoding, cb)
        : res.write(data, encoding, cb);
    if (flushed) {
      resolve();
    } else {
      res.once("drain", resolve);
    }
  });
}

export function readToEnd(
  req: http.IncomingMessage | http2.Http2ServerRequest
): Promise<Uint8Array> {
  return new Promise<Uint8Array>((resolve, reject) => {
    req.once("error", reject);
    const chunks: Uint8Array[] = [];
    function read() {
      let chunk: unknown;
      while (null !== (chunk = req.read() as unknown)) {
        assert(chunk instanceof Buffer);
        chunks.push(chunk);
      }
    }
    req.on("readable", read);
    req.once("end", () => {
      req.off("readable", read);
      req.off("error", reject);
      return resolve(Buffer.concat(chunks));
    });
  });
}

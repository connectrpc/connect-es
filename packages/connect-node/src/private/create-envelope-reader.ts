import type * as http2 from "http2";
import type * as stream from "stream";
import type { ReadableStreamReadResultLike } from "../lib.dom.streams.js";
import { Code, ConnectError, EnvelopedMessage } from "@bufbuild/connect-core";
import { read } from "./client-io.js";

// TODO make this more universally usable
export function createEnvelopeReader(
  stream: http2.ClientHttp2Stream | stream.Readable
): () => Promise<ReadableStreamReadResultLike<EnvelopedMessage>> {
  return async function (): Promise<
    ReadableStreamReadResultLike<EnvelopedMessage>
  > {
    const head = await read(stream, 5);
    if (head.done) {
      throw new ConnectError("premature end of stream", Code.DataLoss);
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
  };
}

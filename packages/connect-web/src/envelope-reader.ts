import { ConnectError } from "./connect-error";
import { StatusCode } from "./status-code";

/**
 * Enveloped-Message
 */
export interface EnvelopedMessage {
  /**
   * Envelope-Flags, a set of 8 bitwise flags.
   */
  flags: number;

  /**
   * Raw data of the message that was enveloped.
   */
  data: Uint8Array;

  /**
   * True if the Message is an EndStreamResponse rather than the
   * response type defined in the service's IDL.
   */
  end: boolean;
}

/**
 * A function that reads one EnvelopedMessage per call from the given stream.
 */
export type EnvelopeReader = () => Promise<EnvelopedMessage | null>;

/**
 * Create a function that reads one EnvelopedMessage per call from the given
 * stream.
 */
export function createEnvelopeReader(
  stream: ReadableStream<Uint8Array>
): EnvelopeReader {
  const reader = stream.getReader();
  let buffer = new Uint8Array(0);
  function append(chunk: Uint8Array): void {
    const n = new Uint8Array(buffer.length + chunk.length);
    n.set(buffer);
    n.set(chunk, buffer.length);
    buffer = n;
  }
  return async function readEnvelopedMessage(): Promise<EnvelopedMessage | null> {
    let header: { length: number; flags: number } | undefined = undefined;
    for (;;) {
      if (header === undefined && buffer.byteLength >= 5) {
        let length = 0;
        for (let i = 1; i < 5; i++) {
          length = (length << 8) + buffer[i];
        }
        header = { flags: buffer[0], length };
      }
      const result = await reader.read();
      if (result.done) {
        break;
      }
      append(result.value);
      if (header !== undefined && buffer.byteLength >= header.length + 5) {
        break;
      }
    }
    if (header === undefined) {
      if (buffer.byteLength == 0) {
        return null;
      }
      throw new ConnectError("premature end of stream", StatusCode.DataLoss);
    }
    const data = buffer.subarray(5, 5 + header.length);
    buffer = buffer.subarray(5 + header.length);
    return {
      end: (header.flags & END_STREAM_MASK) === END_STREAM_MASK,
      flags: header.flags,
      data,
    };
  };
}

const END_STREAM_MASK = 0x80;

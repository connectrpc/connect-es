// Copyright 2021-2023 Buf Technologies, Inc.
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
  createReadableByteStream,
  createReadableStream,
  node16WhatwgStreamPolyfill,
  readAll,
  readAllBytes,
} from "./whatwg-stream-helper.spec.js";
import type { Serialization } from "./serialization.js";
import {
  streamTransformCompress,
  streamTransformDecompress,
  streamTransformJoin,
  streamTransformParse,
  streamTransformSerialize,
  streamTransformSplit,
} from "./stream-transform.js";
import type { Compression } from "./compression.js";
import { encodeEnvelopes } from "./envelope.js";
import { ConnectError } from "./connect-error.js";
import { Code } from "./code.js";

node16WhatwgStreamPolyfill();

// These tests aim to model the usage of transform streams in clients and servers.
// Note that the tests were written as a proof of concept, and the coverage is
// incomplete (cancellation, backpressure, error handling, etc.).
describe("full story", function () {
  const readMaxBytes = 0xffffffff; // zlib caps maxOutputLength at this value
  const writeMaxBytes = readMaxBytes;
  const serialization: Serialization<string> = {
    serialize(data: string): Uint8Array {
      return new TextEncoder().encode(data);
    },
    parse(data: Uint8Array): string {
      return new TextDecoder().decode(data);
    },
  };
  const endSerialization: Serialization<"end"> = {
    serialize(data: string): Uint8Array {
      return new TextEncoder().encode(data + ".");
    },
    parse(data: Uint8Array): "end" {
      const t = new TextDecoder().decode(data).slice(0, -1);
      if (t !== "end") {
        throw new ConnectError(
          "serialize end: cannot parse",
          Code.InvalidArgument
        );
      }
      return t;
    },
  };
  const endFlag = 0b10000000;
  const compressionReverse: Compression = {
    name: "fake",
    compress(bytes) {
      const b = new Uint8Array(bytes.byteLength);
      b.set(bytes, 0);
      return Promise.resolve(b.reverse());
    },
    decompress(bytes, readMaxBytes) {
      if (bytes.byteLength > readMaxBytes) {
        return Promise.reject(
          new ConnectError(
            `message is larger than configured readMaxBytes ${readMaxBytes} after decompression`,
            Code.ResourceExhausted
          )
        );
      }
      const b = new Uint8Array(bytes.byteLength);
      b.set(bytes, 0);
      return Promise.resolve(b.reverse());
    },
  };
  const goldenBytes = encodeEnvelopes(
    {
      flags: 0 | 0b00000001,
      data: new TextEncoder().encode("alpha").reverse(),
    },
    {
      flags: 0 | 0b00000001,
      data: new TextEncoder().encode("beta").reverse(),
    },
    {
      flags: 0 | 0b00000001 | endFlag,
      data: new TextEncoder().encode("end.").reverse(),
    }
  );
  type Payload<I, E> = { end: false; value: I } | { end: true; value: E };
  const goldenPayload: Payload<string, "end">[] = [
    { value: "alpha", end: false },
    { value: "beta", end: false },
    { value: "end", end: true },
  ];

  describe("write", function () {
    it("should write expected bytes", async function () {
      const stream = createReadableStream(goldenPayload)
        .pipeThrough(
          streamTransformSerialize(serialization, endFlag, endSerialization),
          {}
        )
        .pipeThrough(
          streamTransformCompress(compressionReverse, writeMaxBytes, 0),
          {}
        )
        .pipeThrough(streamTransformJoin(writeMaxBytes), {});
      const all = await readAllBytes(stream);
      expect(all).toEqual(goldenBytes);
    });
  });

  describe("read", function () {
    it("should read expected bytes", async function () {
      const inputStream = createReadableByteStream(goldenBytes)
        .pipeThrough(streamTransformSplit(readMaxBytes), {})
        .pipeThrough(
          streamTransformDecompress(compressionReverse, readMaxBytes),
          {}
        )
        .pipeThrough(
          streamTransformParse(serialization, endFlag, endSerialization),
          {}
        );
      const all = await readAll(inputStream);
      expect(all).toEqual(goldenPayload);
    });
  });

  describe("client integration", function () {
    it("should works", async function () {
      const requestTransformStream = new TransformStream<
        { end: false; value: string } | { end: true; value: "end" },
        { end: false; value: string } | { end: true; value: "end" }
      >();
      const requestWriter = requestTransformStream.writable.getWriter();
      const rawRequestStream = requestTransformStream.readable
        .pipeThrough(
          streamTransformSerialize(serialization, endFlag, endSerialization),
          {}
        )
        .pipeThrough(
          streamTransformCompress(compressionReverse, writeMaxBytes, 0),
          {}
        )
        .pipeThrough(streamTransformJoin(writeMaxBytes), {});

      const responseReader = createReadableByteStream(goldenBytes)
        .pipeThrough(streamTransformSplit(readMaxBytes), {})
        .pipeThrough(
          streamTransformDecompress(compressionReverse, readMaxBytes),
          {}
        )
        .pipeThrough(
          streamTransformParse(serialization, endFlag, endSerialization),
          {}
        )
        .getReader();

      const streamingConn = {
        async send(message: string): Promise<void> {
          await requestWriter.ready;
          await requestWriter.write({
            end: false,
            value: message,
          });
        },
        async close(): Promise<void> {
          await requestWriter.ready;
          await requestWriter.write({
            end: true,
            value: "end",
          });
          await requestWriter.close();
        },
        async read(): Promise<ReadableStreamReadResult<string>> {
          const r = await responseReader.read();
          if (r.done) {
            return {
              done: true,
              value: undefined,
            };
          }
          if (r.value.end) {
            return {
              done: true,
              value: undefined,
            };
          }
          return {
            done: false,
            value: r.value.value,
          };
        },
      };

      const writtenBytesPromise = readAllBytes(rawRequestStream);

      await streamingConn.send("alpha");
      await streamingConn.send("beta");
      await streamingConn.close();

      const alpha = await streamingConn.read();
      expect(alpha).toEqual({
        done: false,
        value: "alpha",
      });
      const beta = await streamingConn.read();
      expect(beta).toEqual({
        done: false,
        value: "beta",
      });
      const end = await streamingConn.read();
      expect(end).toEqual({
        done: true,
        value: undefined,
      });

      const writtenBytes = await writtenBytesPromise;
      expect(writtenBytes).toEqual(goldenBytes);
    });
  });

  describe("server integration", function () {
    const echoImplReceived: string[] = [];

    async function* echoImpl(
      input: AsyncIterable<string>
    ): AsyncIterable<string> {
      for await (const i of input) {
        echoImplReceived.push(i);
        yield i;
      }
    }

    beforeEach(function () {
      echoImplReceived.splice(0);
    });

    it("should echo expected bytes", async function () {
      const requestStream = createReadableByteStream(goldenBytes)
        .pipeThrough(streamTransformSplit(readMaxBytes), {})
        .pipeThrough(
          streamTransformDecompress(compressionReverse, readMaxBytes),
          {}
        )
        .pipeThrough(
          streamTransformParse(serialization, endFlag, endSerialization),
          {}
        );

      // implementations take an iterable - make our stream available as one
      const implInput: AsyncIterable<string> = {
        [Symbol.asyncIterator](): AsyncIterator<string> {
          const reader = requestStream.getReader();
          return {
            async next(): Promise<IteratorResult<string>> {
              const r = await reader.read();
              if (r.done) {
                return {
                  done: true,
                  value: undefined,
                };
              }
              if (r.value.end) {
                return {
                  done: true,
                  value: undefined,
                };
              }
              return {
                done: false,
                value: r.value.value,
              };
            },
          };
        },
      };

      // invoke the implementation
      const implOutput = echoImpl(implInput)[Symbol.asyncIterator]();

      // implementations return an iterable - make a readable stream from it
      const responseStream = new ReadableStream<
        { end: false; value: string } | { end: true; value: string }
      >({
        async pull(controller) {
          const r = await implOutput.next();
          if (r.done === true) {
            controller.enqueue({
              end: true,
              value: "end",
            });
            return controller.close();
          }
          controller.enqueue({
            end: false,
            value: r.value,
          });
        },
      })
        .pipeThrough(
          streamTransformSerialize(serialization, endFlag, endSerialization),
          {}
        )
        .pipeThrough(
          streamTransformCompress(compressionReverse, writeMaxBytes, 0),
          {}
        )
        .pipeThrough(streamTransformJoin(writeMaxBytes), {});

      // in practice, we would pipe the response data to a writable stream with pipeTo()
      expect(await readAllBytes(responseStream)).toEqual(goldenBytes);

      // sanity check that the implementation was invoked
      expect(echoImplReceived).toEqual(["alpha", "beta"]);
    });
  });
});

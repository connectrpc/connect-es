// Copyright 2020-2022 Buf Technologies, Inc.
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

// This is a subset of lib.dom.ts that only contains TextEncoder and TextDecoder,
// part of the WHATWG Encoding Standard: https://encoding.spec.whatwg.org/
//
// We do *not* want to include the full DOM definitions, because we do not want
// to unintentionally depend on a feature that may not be commonly available.
//
// Availability:
//
// - TextEncoder
//   - all modern browsers: https://caniuse.com/textencoder
//   - Node.js v11.0.0
// - TextDecoder
//   - all modern browsers: https://caniuse.com/textencoder
//   - Node.js v8.3.0
//
// There is an effort to move the TextEncoder API definitions out of the DOM lib.
// If that happens, we should ultimately remove this here file.
// https://github.com/microsoft/TypeScript/issues/31535
// https://github.com/microsoft/TypeScript/issues/41727

/* eslint-disable */

/** TextEncoder takes a stream of code points as input and emits a stream of bytes. For a more scalable, non-native library, see StringView – a C-like representation of strings based on typed arrays. */
interface TextEncoder extends TextEncoderCommon {
  /** Returns the result of running UTF-8's encoder. */
  encode(input?: string): Uint8Array;
  /** Runs the UTF-8 encoder on source, stores the result of that operation into destination, and returns the progress made as an object wherein read is the number of converted code units of source and written is the number of bytes modified in destination. */
  encodeInto(
    source: string,
    destination: Uint8Array
  ): TextEncoderEncodeIntoResult;
}

interface TextEncoderEncodeIntoResult {
  read?: number;
  written?: number;
}

declare var TextEncoder: {
  prototype: TextEncoder;
  new (): TextEncoder;
};

interface TextEncoderCommon {
  /** Returns "utf-8". */
  readonly encoding: string;
}

interface TextDecoderCommon {
  /**
   * Returns encoding's name, lowercased.
   */
  readonly encoding: string;
  /**
   * Returns true if error mode is "fatal", and false otherwise.
   */
  readonly fatal: boolean;
  /**
   * Returns true if ignore BOM flag is set, and false otherwise.
   */
  readonly ignoreBOM: boolean;
}

type BufferSource = ArrayBufferView | ArrayBuffer;

/** A decoder for a specific method, that is a specific character encoding, like utf-8, iso-8859-2, koi8, cp1261, gbk, etc. A decoder takes a stream of bytes as input and emits a stream of code points. For a more scalable, non-native library, see StringView – a C-like representation of strings based on typed arrays. */
interface TextDecoder extends TextDecoderCommon {
  /**
   * Returns the result of running encoding's decoder. The method can be invoked zero or more times with options's stream set to true, and then once without options's stream (or set to false), to process a fragmented stream. If the invocation without options's stream (or set to false) has no input, it's clearest to omit both arguments.
   *
   * ```
   * var string = "", decoder = new TextDecoder(encoding), buffer;
   * while(buffer = next_chunk()) {
   *   string += decoder.decode(buffer, {stream:true});
   * }
   * string += decoder.decode(); // end-of-stream
   * ```
   *
   * If the error mode is "fatal" and encoding's decoder returns error, throws a TypeError.
   */
  decode(input?: BufferSource, options?: TextDecodeOptions): string;
}

declare var TextDecoder: {
  prototype: TextDecoder;
  new (label?: string, options?: TextDecoderOptions): TextDecoder;
};

interface TextDecodeOptions {
  stream?: boolean;
}

interface TextDecoderOptions {
  fatal?: boolean;
  ignoreBOM?: boolean;
}

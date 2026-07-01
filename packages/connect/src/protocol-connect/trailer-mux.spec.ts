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

import { describe, it, beforeEach } from "node:test";
import * as assert from "node:assert";
import { trailerMux, trailerDemux } from "./trailer-mux.js";

function listHeaderKeys(header: Headers): string[] {
  const keys: string[] = [];
  header.forEach((_, key) => keys.push(key));
  return keys;
}

describe("trailer-mux", () => {
  let headers: Headers, trailers: Headers, combined: Headers;
  beforeEach(() => {
    headers = new Headers({
      "Content-Type": "application/connect+json",
    });
    trailers = new Headers({
      Buf: "buf.build",
    });
    combined = new Headers({
      "Content-Type": "application/connect+json",
      "Trailer-Buf": "buf.build",
    });
  });
  describe("muxing()", () => {
    it("should return an empty headers object when headers and trailers are empty", () => {
      const muxed = trailerMux(new Headers(), new Headers());
      assert.deepStrictEqual(listHeaderKeys(muxed), []);
    });

    it("should correctly mux headers and trailers", () => {
      const muxed = trailerMux(headers, trailers);

      assert.deepStrictEqual(listHeaderKeys(muxed), [
        "content-type",
        "trailer-buf",
      ]);
      assert.strictEqual(muxed.get("Content-Type"), "application/connect+json");
      assert.strictEqual(muxed.get("Trailer-Buf"), "buf.build");
    });
  });

  describe("demuxing()", () => {
    it("should return two empty header objects when the muxed object is empty", () => {
      const [gotHeader, gotTrailer] = trailerDemux(new Headers());

      assert.deepStrictEqual(listHeaderKeys(gotHeader), []);
      assert.deepStrictEqual(listHeaderKeys(gotTrailer), []);
    });

    it("should correctly demux headers and trailers", () => {
      const [gotHeader, gotTrailer] = trailerDemux(combined);

      assert.deepStrictEqual(listHeaderKeys(gotHeader), ["content-type"]);
      assert.strictEqual(
        gotHeader.get("Content-Type"),
        "application/connect+json",
      );

      assert.deepStrictEqual(listHeaderKeys(gotTrailer), ["buf"]);
      assert.strictEqual(gotTrailer.get("Buf"), "buf.build");
    });

    it("should return an empty trailers object if there are no trailers", () => {
      const [gotHeader, gotTrailer] = trailerDemux(headers);

      assert.deepStrictEqual(listHeaderKeys(gotHeader), ["content-type"]);
      assert.strictEqual(
        gotHeader.get("Content-Type"),
        "application/connect+json",
      );

      assert.deepStrictEqual(listHeaderKeys(gotTrailer), []);
    });
  });
});

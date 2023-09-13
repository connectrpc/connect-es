// Copyright 2021-2023 The Connect Authors
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

import { trailerMux, trailerDemux } from "./trailer-mux.js";

function listHeaderKeys(header: Headers): string[] {
  const keys: string[] = [];
  header.forEach((_, key) => keys.push(key));
  return keys;
}

describe("trailer-mux", function () {
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
  describe("muxing()", function () {
    it("should return an empty headers object when headers and trailers are empty", () => {
      const muxed = trailerMux(new Headers(), new Headers());
      expect(listHeaderKeys(muxed)).toEqual([]);
    });

    it("should correctly mux headers and trailers", () => {
      const muxed = trailerMux(headers, trailers);

      expect(listHeaderKeys(muxed)).toEqual(["content-type", "trailer-buf"]);
      expect(muxed.get("Content-Type")).toBe("application/connect+json");
      expect(muxed.get("Trailer-Buf")).toBe("buf.build");
    });
  });

  describe("demuxing()", function () {
    it("should return two empty header objects when the muxed object is empty", () => {
      const [gotHeader, gotTrailer] = trailerDemux(new Headers());

      expect(listHeaderKeys(gotHeader)).toEqual([]);
      expect(listHeaderKeys(gotTrailer)).toEqual([]);
    });

    it("should correctly demux headers and trailers", () => {
      const [gotHeader, gotTrailer] = trailerDemux(combined);

      expect(listHeaderKeys(gotHeader)).toEqual(["content-type"]);
      expect(gotHeader.get("Content-Type")).toBe("application/connect+json");

      expect(listHeaderKeys(gotTrailer)).toEqual(["buf"]);
      expect(gotTrailer.get("Buf")).toBe("buf.build");
    });

    it("should return an empty trailers object if there are no trailers", () => {
      const [gotHeader, gotTrailer] = trailerDemux(headers);

      expect(listHeaderKeys(gotHeader)).toEqual(["content-type"]);
      expect(gotHeader.get("Content-Type")).toBe("application/connect+json");

      expect(listHeaderKeys(gotTrailer)).toEqual([]);
    });
  });
});

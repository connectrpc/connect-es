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

import { trailerMux, trailerDemux } from "./trailer-mux.js";

// Node17 and below treats header keys as case-sensitive, so the keys need to
// be all lowercased for correct comparison.
function lowerCaseKeys(headers: Headers): Headers {
  const lower = new Headers();
  headers.forEach((value, key) => {
    lower.append(key.toLowerCase(), value);
  });
  return lower;
}

describe("trailer-mux", function () {
  let headers: Headers, trailers: Headers, combined: Headers;
  beforeEach(() => {
    headers = new Headers({
      "Content-Type": "application/connect+json",
      "X-Custom-Header": "A custom header",
    });
    trailers = new Headers({
      Buf: "buf.build",
    });
    combined = new Headers({
      "Content-Type": "application/connect+json",
      "X-Custom-Header": "A custom header",
      "Trailer-Buf": "buf.build",
    });
  });
  describe("muxing()", function () {
    it("should return an empty headers object when headers and trailers are empty", () => {
      const muxed = trailerMux(new Headers(), new Headers());
      expect(muxed).toEqual(new Headers());
    });

    it("should correctly mux headers and trailers", () => {
      const muxed = trailerMux(headers, trailers);
      expect(muxed).toEqual(lowerCaseKeys(combined));
    });
  });

  describe("demuxing()", function () {
    it("should return two empty header objects when the muxed object is empty", () => {
      expect(trailerDemux(new Headers())).toEqual([
        new Headers(),
        new Headers(),
      ]);
    });

    it("should correctly demux headers and trailers", () => {
      const demuxed = trailerDemux(combined);
      expect(demuxed).toEqual([
        lowerCaseKeys(headers),
        lowerCaseKeys(trailers),
      ]);
    });

    it("should return an empty trailers object if there are no trailers", () => {
      const demuxed = trailerDemux(headers);
      expect(demuxed[0]).toEqual(new Headers(lowerCaseKeys(headers)));
      expect(demuxed[1]).toEqual(new Headers());
    });
  });
});

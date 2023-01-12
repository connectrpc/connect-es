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
import { compare } from "./headers.spec.js";

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
      expect(compare(muxed, new Headers())).toBeTrue();
    });

    it("should correctly mux headers and trailers", () => {
      const muxed = trailerMux(headers, trailers);
      expect(compare(muxed, combined)).toBeTrue();
    });
  });

  describe("demuxing()", function () {
    it("should return two empty header objects when the muxed object is empty", () => {
      const demuxed = trailerDemux(new Headers());
      expect(compare(demuxed[0], new Headers())).toBeTrue();
      expect(compare(demuxed[1], new Headers())).toBeTrue();
    });

    it("should correctly demux headers and trailers", () => {
      const demuxed = trailerDemux(combined);
      expect(compare(demuxed[0], headers)).toBeTrue();
      expect(compare(demuxed[1], trailers)).toBeTrue();
    });

    it("should return an empty trailers object if there are no trailers", () => {
      const demuxed = trailerDemux(headers);
      expect(compare(demuxed[0], headers)).toBeTrue();
      expect(compare(demuxed[1], new Headers())).toBeTrue();
    });
  });
});

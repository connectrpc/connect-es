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

import { contentTypeMatcher } from "./content-type.js";

describe("contentTypeMatcher()", function () {
  it("matches multiple regular expressions as expected", function () {
    const matcher = contentTypeMatcher(/a/, /b/);
    expect(matcher("a")).toBeTrue();
    expect(matcher("b")).toBeTrue();
    expect(matcher("c")).toBeFalse();
    expect(matcher("d")).toBeFalse();
  });
  it("matches multiple content type matchers as expected", function () {
    const matcher = contentTypeMatcher(
      contentTypeMatcher(/a/, /b/),
      contentTypeMatcher(/c/)
    );
    expect(matcher("a")).toBeTrue();
    expect(matcher("b")).toBeTrue();
    expect(matcher("c")).toBeTrue();
    expect(matcher("d")).toBeFalse();
  });
});

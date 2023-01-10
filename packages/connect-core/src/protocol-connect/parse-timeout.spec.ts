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

import { ConnectError } from "../connect-error.js";
import { parseTimeout } from "./parse-timeout.js";

describe("parseTimeout()", function () {
  it("should parse proper timeout", () => {
    expect(parseTimeout("1")).toEqual(1);
    expect(parseTimeout("1234567890")).toEqual(1234567890);
  });
  it("should should return undefined for null value", () => {
    expect(parseTimeout(null)).toEqual(undefined);
  });
  it("should should return a ConnectError for an incorrect value", () => {
    expect(parseTimeout("100m")).toBeInstanceOf(ConnectError);
    expect(parseTimeout("1H")).toBeInstanceOf(ConnectError);
    expect(parseTimeout("-1")).toBeInstanceOf(ConnectError);
    expect(parseTimeout("1e+10")).toBeInstanceOf(ConnectError);
    expect(parseTimeout("")).toBeInstanceOf(ConnectError);
    expect(parseTimeout("12345678901")).toBeInstanceOf(ConnectError);
    expect(parseTimeout("foo")).toBeInstanceOf(ConnectError);
  });
});

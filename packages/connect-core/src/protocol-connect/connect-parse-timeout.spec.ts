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
import { connectParseTimeout } from "./connect-parse-timeout.js";

describe("connectParseTimeout()", function () {
  it("should parse proper timeout", () => {
    expect(connectParseTimeout("1")).toEqual(1);
    expect(connectParseTimeout("1234567890")).toEqual(1234567890);
  });
  it("should should return undefined for null value", () => {
    expect(connectParseTimeout(null)).toEqual(undefined);
  });
  it("should should return a ConnectError for an incorrect value", () => {
    expect(connectParseTimeout("100m")).toBeInstanceOf(ConnectError);
    expect(connectParseTimeout("1H")).toBeInstanceOf(ConnectError);
    expect(connectParseTimeout("-1")).toBeInstanceOf(ConnectError);
    expect(connectParseTimeout("1e+10")).toBeInstanceOf(ConnectError);
    expect(connectParseTimeout("")).toBeInstanceOf(ConnectError);
    expect(connectParseTimeout("12345678901")).toBeInstanceOf(ConnectError);
    expect(connectParseTimeout("foo")).toBeInstanceOf(ConnectError);
  });
});

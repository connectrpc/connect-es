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

import { ConnectError } from "./connect-error.js";
import { grpcParseTimeout } from "./grpc-parse-timeout.js";

describe("grpcParseTimeout()", function () {
  it("should parse proper timeout", () => {
    expect(grpcParseTimeout("1H")).toEqual(3600000);
    expect(grpcParseTimeout("12345678m")).toEqual(12345678);
  });
  it("should should return undefined for null value", () => {
    expect(grpcParseTimeout(null)).toEqual(undefined);
  });
  it("should should return a ConnectError for an incorrect value", () => {
    expect(grpcParseTimeout("HH")).toBeInstanceOf(ConnectError);
    expect(grpcParseTimeout("123456789m")).toBeInstanceOf(ConnectError);
    expect(grpcParseTimeout("12345678")).toBeInstanceOf(ConnectError);
    expect(grpcParseTimeout("1H1H")).toBeInstanceOf(ConnectError);
    expect(grpcParseTimeout("foo")).toBeInstanceOf(ConnectError);
  });
  it("should should return a Connect Error for an incorrect timeout unit", () => {
    const result = grpcParseTimeout("1X");
    expect(result).toBeInstanceOf(ConnectError);
  });
});

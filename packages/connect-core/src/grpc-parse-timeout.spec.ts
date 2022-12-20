// Copyright 2021-2022 Buf Technologies, Inc.
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
  });
  it("should should return undefined for null value", () => {
    expect(grpcParseTimeout(null)).toEqual(undefined);
  });
  it("should should return a ConnectError for an incorrect value", () => {
    const result = grpcParseTimeout("HH");
    expect(result).toBeInstanceOf(ConnectError);
  });
  it("should should return a Connect Error for an incorrect timeout unit", () => {
    const result = grpcParseTimeout("1X");
    expect(result).toBeInstanceOf(ConnectError);
  });
});

// Copyright 2021-2025 The Connect Authors
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

import { createGrpcTransport } from "./grpc-transport.js";

describe("createGrpcTransport()", function () {
  it("should take just baseUrl", function () {
    const t = createGrpcTransport({
      baseUrl: "https://example.com",
    });
    expect(t).toBeDefined();
  });
  it("should raise type error for httpVersion: 2", function () {
    const t = createGrpcTransport({
      // @ts-expect-error TS2353: Object literal may only specify known properties, and httpVersion does not exist in type GrpcTransportOptions
      httpVersion: "2",
      baseUrl: "https://example.com",
    });
    expect(t).toBeDefined();
  });
  it("should raise type error for httpVersion: 1.1", function () {
    const t = createGrpcTransport({
      // @ts-expect-error TS2353: Object literal may only specify known properties, and httpVersion does not exist in type GrpcTransportOptions
      httpVersion: "1.1",
      baseUrl: "https://example.com",
    });
    expect(t).toBeDefined();
  });
});

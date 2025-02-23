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

import { findTrailerError, setTrailerStatus } from "./trailer-status.js";
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";
import { Int32ValueSchema } from "@bufbuild/protobuf/wkt";

describe("setTrailerStatus()", function () {
  it("should set grpc-status when called without error", function () {
    const t = new Headers();
    setTrailerStatus(t, undefined);
    let count = 0;
    t.forEach(() => count++);
    expect(count).toBe(1);
    expect(t.get("grpc-status")).toBe("0");
  });
  it("should keep existing fields", function () {
    const t = new Headers({
      foo: "bar",
    });
    setTrailerStatus(t, undefined);
    let count = 0;
    t.forEach(() => count++);
    expect(count).toBe(2);
    expect(t.get("grpc-status")).toBe("0");
    expect(t.get("foo")).toBe("bar");
  });
  it("should set only grpc-status and grpc-message when called with an error", function () {
    const t = new Headers();
    setTrailerStatus(t, new ConnectError("soirée 🎉", Code.ResourceExhausted));
    let count = 0;
    t.forEach(() => count++);
    expect(count).toBe(2);
    expect(t.get("grpc-status")).toBe("8"); // resource_exhausted
    expect(t.get("grpc-message")).toBe("soir%C3%A9e%20%F0%9F%8E%89");
  });
  it("should set all related fields when called with an error with details", function () {
    const t = new Headers();
    setTrailerStatus(
      t,
      new ConnectError("soirée 🎉", Code.ResourceExhausted, {}, [
        { desc: Int32ValueSchema, value: { value: 123 } },
      ]),
    );
    let count = 0;
    t.forEach(() => count++);
    expect(count).toBe(3);
    expect(t.get("grpc-status")).toBe("8"); // resource_exhausted
    expect(t.get("grpc-message")).toBe("soir%C3%A9e%20%F0%9F%8E%89");
    expect(t.get("grpc-status-details-bin")).toBe(
      "CAgSDHNvaXLDqWUg8J+OiRo0Ci50eXBlLmdvb2dsZWFwaXMuY29tL2dvb2dsZS5wcm90b2J1Zi5JbnQzMlZhbHVlEgIIew",
    );
  });
  it("should append any error metadata", function () {
    const t = new Headers();
    setTrailerStatus(
      t,
      new ConnectError("soirée 🎉", Code.ResourceExhausted, { foo: "bar" }),
    );
    let count = 0;
    t.forEach(() => count++);
    expect(count).toBe(3);
    expect(t.get("grpc-status")).toBe("8"); // resource_exhausted
    expect(t.get("grpc-message")).toBe("soir%C3%A9e%20%F0%9F%8E%89");
    expect(t.get("foo")).toBe("bar");
  });
  it("should overwrite error metadata that uses reserved protocol headers", function () {
    const t = new Headers();
    setTrailerStatus(
      t,
      new ConnectError("soirée 🎉", Code.ResourceExhausted, {
        foo: "bar",
        "grpc-status": "foo-status",
        "grpc-message": "foo-message",
      }),
    );
    let count = 0;
    t.forEach(() => count++);
    expect(count).toBe(3);
    expect(t.get("grpc-status")).toBe("8"); // resource_exhausted
    expect(t.get("grpc-message")).toBe("soir%C3%A9e%20%F0%9F%8E%89");
    expect(t.get("foo")).toBe("bar");
  });
});

describe("findTrailerError()", function () {
  it("should not find an error on empty trailer", function () {
    const t = new Headers();
    expect(findTrailerError(t)).toBeUndefined();
  });
  it("should not find an error for grpc-status 0", function () {
    const t = new Headers({
      "grpc-status": "0",
    });
    expect(findTrailerError(t)).toBeUndefined();
  });
  it("should not find an error for grpc-status 0", function () {
    const t = new Headers({
      "grpc-status": "0",
    });
    expect(findTrailerError(t)).toBeUndefined();
  });
  it("should find an error for the grpc-status field", function () {
    const t = new Headers({
      "grpc-status": "8", // resource_exhausted
    });
    expect(findTrailerError(t)?.code).toBe(Code.ResourceExhausted);
  });
  it("should use the grpc-message field", function () {
    const t = new Headers({
      "grpc-status": "8", // resource_exhausted
      "grpc-message": "soir%C3%A9e%20%F0%9F%8E%89",
    });
    expect(findTrailerError(t)?.code).toBe(Code.ResourceExhausted);
    expect(findTrailerError(t)?.rawMessage).toBe("soirée 🎉");
  });
  it("should prefer the grpc-status-details-bin field", function () {
    const t = new Headers({
      "grpc-status": "9", // failed_precondition
      "grpc-status-details-bin":
        "CAgSDHNvaXLDqWUg8J+OiRo0Ci50eXBlLmdvb2dsZWFwaXMuY29tL2dvb2dsZS5wcm90b2J1Zi5JbnQzMlZhbHVlEgIIew==",
    });
    expect(findTrailerError(t)?.code).toBe(Code.ResourceExhausted);
  });
});

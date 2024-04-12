// Copyright 2021-2024 The Connect Authors
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
import { Code } from "../code.js";
import { Message, proto3, protoBase64, ScalarType } from "@bufbuild/protobuf";
import { errorFromJson, errorToJson } from "./error-json.js";
import { codeToString } from "./code-string.js";

describe("errorToJson()", () => {
  it("serializes code and message", () => {
    const json = errorToJson(
      new ConnectError("Not permitted", Code.PermissionDenied),
      undefined,
    );
    expect(json.code as unknown).toBe("permission_denied");
    expect(json.message as unknown).toBe("Not permitted");
  });
  it("does not serialize empty message", () => {
    const json = errorToJson(
      new ConnectError("", Code.PermissionDenied),
      undefined,
    );
    expect(json.code as unknown).toBe("permission_denied");
    expect(json.message as unknown).toBeUndefined();
  });
  it("serializes details", () => {
    type ErrorDetail = Message<ErrorDetail> & {
      reason: string;
      domain: string;
    };
    const ErrorDetail = proto3.makeMessageType<ErrorDetail>(
      "handwritten.ErrorDetail",
      [
        { no: 1, name: "reason", kind: "scalar", T: ScalarType.STRING },
        { no: 2, name: "domain", kind: "scalar", T: ScalarType.STRING },
      ],
    );
    const err = new ConnectError("Not permitted", Code.PermissionDenied);
    err.details.push(
      new ErrorDetail({ reason: "soirée 🎉", domain: "example.com" }),
    );
    const got = errorToJson(err, undefined);
    const want = {
      code: "permission_denied",
      message: "Not permitted",
      details: [
        {
          type: ErrorDetail.typeName,
          value: protoBase64.enc(
            new ErrorDetail({
              reason: "soirée 🎉",
              domain: "example.com",
            }).toBinary(),
          ),
          debug: {
            reason: "soirée 🎉",
            domain: "example.com",
          },
        },
      ],
    };
    expect(got).toEqual(want);
  });
});

describe("errorFromJson()", () => {
  it("parses code and message", () => {
    const error = errorFromJson(
      {
        code: "permission_denied",
        message: "Not permitted",
      },
      undefined,
      new ConnectError("foo", Code.ResourceExhausted),
    );
    expect(error.code).toBe(Code.PermissionDenied);
    expect(error.rawMessage).toBe("Not permitted");
    expect(error.details.length).toBe(0);
  });
  it("does not require message", () => {
    const error = errorFromJson(
      {
        code: codeToString(Code.PermissionDenied),
      },
      undefined,
      new ConnectError("foo", Code.ResourceExhausted),
    );
    expect(error.message).toBe("[permission_denied]");
    expect(error.rawMessage).toBe("");
  });
  it("with invalid code throws fallback", () => {
    const e = errorFromJson(
      {
        code: "wrong code",
        message: "Not permitted",
      },
      undefined,
      new ConnectError("foo", Code.ResourceExhausted),
    );
    expect(e).toBeInstanceOf(ConnectError);
    expect(ConnectError.from(e).message).toBe(
      "[resource_exhausted] Not permitted",
    );
  });
  it("with invalid code returns fallback code with metadata", () => {
    const e = errorFromJson(
      {
        code: "wrong code",
        message: "Not permitted",
      },
      new Headers({ foo: "bar" }),
      new ConnectError("foo", Code.ResourceExhausted),
    );
    expect(e).toBeInstanceOf(ConnectError);
    expect(ConnectError.from(e).message).toBe(
      "[resource_exhausted] Not permitted",
    );
    expect(ConnectError.from(e).metadata.get("foo")).toBe("bar");
  });
  it("with code Ok returns fallback code", () => {
    const e = errorFromJson(
      {
        code: "ok",
        message: "Not permitted",
      },
      undefined,
      new ConnectError("foo", Code.ResourceExhausted),
    );
    expect(e).toBeInstanceOf(ConnectError);
    expect(ConnectError.from(e).message).toBe(
      "[resource_exhausted] Not permitted",
    );
  });
  it("with missing code returns fallback code", () => {
    const e = errorFromJson(
      {
        message: "Not permitted",
      },
      undefined,
      new ConnectError("foo", Code.ResourceExhausted),
    );
    expect(e).toBeInstanceOf(ConnectError);
    expect(ConnectError.from(e).message).toBe(
      "[resource_exhausted] Not permitted",
    );
  });
  describe("with details", () => {
    type ErrorDetail = Message<ErrorDetail> & {
      reason: string;
      domain: string;
    };
    const ErrorDetail = proto3.makeMessageType<ErrorDetail>(
      "handwritten.ErrorDetail",
      [
        { no: 1, name: "reason", kind: "scalar", T: ScalarType.STRING },
        { no: 2, name: "domain", kind: "scalar", T: ScalarType.STRING },
      ],
    );
    const json = {
      code: "permission_denied",
      message: "Not permitted",
      details: [
        {
          type: ErrorDetail.typeName,
          value: protoBase64.enc(
            new ErrorDetail({
              reason: "soirée 🎉",
              domain: "example.com",
            }).toBinary(),
          ),
        },
      ],
    };
    it("adds to raw detail", () => {
      const error = errorFromJson(
        json,
        undefined,
        new ConnectError("foo", Code.ResourceExhausted),
      );
      expect(error.details.length).toBe(1);
    });
    it("works with findDetails()", () => {
      const error = errorFromJson(
        json,
        undefined,
        new ConnectError("foo", Code.ResourceExhausted),
      );
      const details = error.findDetails(ErrorDetail);
      expect(details.length).toBe(1);
      expect(details[0]?.reason).toBe("soirée 🎉");
      expect(details[0]?.domain).toBe("example.com");
    });
  });
});

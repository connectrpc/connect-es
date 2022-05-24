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

import {
  ConnectError,
  StatusCode,
  statusCodeToString,
} from "@bufbuild/connect-web";
import { TypeRegistry } from "@bufbuild/protobuf";
import { FooRequest } from "./gen/examples/myservice_pb.js";

describe("ConnectError", function () {
  describe("constructor", () => {
    it("should have status unknown by default", () => {
      const e = new ConnectError("foo");
      expect(e.code).toBe(StatusCode.Unknown);
      expect(e.message).toBe("[unknown] foo");
      expect(e.rawMessage).toBe("foo");
      expect(String(e)).toBe("ConnectError: [unknown] foo");
    });
    it("should take other status", () => {
      const e = new ConnectError("foo", StatusCode.AlreadyExists);
      expect(e.code).toBe(StatusCode.AlreadyExists);
      expect(e.message).toBe("[already_exists] foo");
      expect(e.rawMessage).toBe("foo");
      expect(String(e)).toBe("ConnectError: [already_exists] foo");
    });
  });
  describe("toJson", () => {
    it("serializes code and message", () => {
      const json = new ConnectError(
        "Not permitted",
        StatusCode.PermissionDenied
      ).toJson();
      expect(json as unknown).toEqual({
        code: "permission_denied",
        message: "Not permitted",
      });
    });
    it("serializes details", () => {
      const json = new ConnectError(
        "Not permitted",
        StatusCode.PermissionDenied,
        [new FooRequest({ foo: "abc" })]
      ).toJson();
      expect(json as unknown).toEqual({
        code: "permission_denied",
        message: "Not permitted",
        details: [
          { foo: "abc", "@type": "type.googleapis.com/examples.FooRequest" },
        ],
      });
    });
  });
  describe("fromJsonString", () => {
    it("with syntax error throws", () => {
      expect(() => ConnectError.fromJsonString("invalid json")).toThrowError(
        "[internal] cannot decode ConnectError from JSON: Unexpected token i in JSON at position 0"
      );
    });
  });
  describe("fromJson", () => {
    it("parses code and message", () => {
      const error = ConnectError.fromJson({
        code: "permission_denied",
        message: "Not permitted",
      });
      expect(error.code).toBe(StatusCode.PermissionDenied);
      expect(error.rawMessage).toBe("Not permitted");
      expect(error.details.length).toBe(0);
    });
    it("with invalid code throws", () => {
      expect(() =>
        ConnectError.fromJson({
          code: "wrong code",
          message: "Not permitted",
        })
      ).toThrowError(
        '[internal] cannot decode ConnectError.code from JSON: "wrong code"'
      );
    });
    it("with code Ok throws", () => {
      expect(() =>
        ConnectError.fromJson({
          code: statusCodeToString(StatusCode.Ok),
          message: "Not permitted",
        })
      ).toThrowError(
        '[internal] cannot decode ConnectError.code from JSON: "ok"'
      );
    });
    it("with missing code throws", () => {
      expect(() =>
        ConnectError.fromJson({
          message: "Not permitted",
        })
      ).toThrowError("[internal] cannot decode ConnectError from JSON: object");
    });
    it("with missing message throws", () => {
      expect(() =>
        ConnectError.fromJson({
          code: statusCodeToString(StatusCode.PermissionDenied),
        })
      ).toThrowError("[internal] cannot decode ConnectError from JSON: object");
    });
    describe("with details", () => {
      const json = {
        code: "permission_denied",
        message: "Not permitted",
        details: [
          {
            foo: "abc",
            "@type": "type.googleapis.com/examples.FooRequest",
          },
        ],
      };
      it("skips details when not given a type registry", () => {
        const error = ConnectError.fromJson(json);
        expect(error.details.length).toBe(0);
      });
      it("skips details not present in type registry", () => {
        const error = ConnectError.fromJson(json, {
          typeRegistry: new TypeRegistry(),
        });
        expect(error.details.length).toBe(0);
      });
      it("uses rawDetails when not given a type registry", () => {
        const error = ConnectError.fromJson(json);
        expect(error.rawDetails as unknown).toEqual([
          {
            foo: "abc",
            "@type": "type.googleapis.com/examples.FooRequest",
          },
        ]);
      });
      it("uses rawDetails for details not present in type registry", () => {
        const error = ConnectError.fromJson(json, {
          typeRegistry: new TypeRegistry(),
        });
        expect(error.rawDetails as unknown).toEqual([
          {
            foo: "abc",
            "@type": "type.googleapis.com/examples.FooRequest",
          },
        ]);
      });
      it("decodes details using type registry", () => {
        const error = ConnectError.fromJson(json, {
          typeRegistry: TypeRegistry.fromTypes(FooRequest),
        });
        expect(error.code).toBe(StatusCode.PermissionDenied);
        expect(error.rawMessage).toBe("Not permitted");
        expect(error.details.length).toBe(1);
        if (error.details[0] instanceof FooRequest) {
          expect(error.details[0].foo).toBe("abc");
        } else {
          fail();
        }
      });
    });
  });
});

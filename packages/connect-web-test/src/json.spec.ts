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
  codeToString,
  Code,
  ConnectError,
  toJson,
  fromJson,
  fromJsonString,
} from "@bufbuild/connect-web";
import { TypeRegistry } from "@bufbuild/protobuf";
import { ServerStreamingHappyRequest } from "./gen/testing/v1/test_pb.js";

describe("Json", function () {
  describe("toJson", () => {
    it("serializes code and message", () => {
      const error = new ConnectError("Not permitted", Code.PermissionDenied);

      const json = toJson(error);

      expect(json as unknown).toEqual({
        code: "permission_denied",
        message: "Not permitted",
      });
    });
    it("serializes details", () => {
      const error = new ConnectError("Not permitted", Code.PermissionDenied, [
        new ServerStreamingHappyRequest({ value: 123 }),
      ]);
      const json = toJson(error);
      expect(json as unknown).toEqual({
        code: "permission_denied",
        message: "Not permitted",
        details: [
          {
            value: 123,
            "@type":
              "type.googleapis.com/testing.v1.ServerStreamingHappyRequest",
          },
        ],
      });
    });
  });
  describe("fromJsonString", () => {
    it("with syntax error throws", () => {
      expect(() => fromJsonString("invalid json")).toThrowError(
        "[internal] cannot decode ConnectError from JSON: Unexpected token i in JSON at position 0"
      );
    });
  });
  describe("fromJson", () => {
    it("parses code and message", () => {
      const error = fromJson({
        code: "permission_denied",
        message: "Not permitted",
      });
      expect(error.code).toBe(Code.PermissionDenied);
      expect(error.rawMessage).toBe("Not permitted");
      expect(error.details.length).toBe(0);
    });
    it("does not require message", () => {
      const error = fromJson({
        code: codeToString(Code.PermissionDenied),
      });
      expect(error.message).toBe("[permission_denied]");
      expect(error.rawMessage).toBe("");
    });
    it("with invalid code throws", () => {
      expect(() =>
        fromJson({
          code: "wrong code",
          message: "Not permitted",
        })
      ).toThrowError(
        '[internal] cannot decode ConnectError.code from JSON: "wrong code"'
      );
    });
    it("with code Ok throws", () => {
      expect(() =>
        fromJson({
          code: "ok",
          message: "Not permitted",
        })
      ).toThrowError(
        '[internal] cannot decode ConnectError.code from JSON: "ok"'
      );
    });
    it("with missing code throws", () => {
      expect(() =>
        fromJson({
          message: "Not permitted",
        })
      ).toThrowError("[internal] cannot decode ConnectError from JSON: object");
    });
    describe("with details", () => {
      const json = {
        code: "permission_denied",
        message: "Not permitted",
        details: [
          {
            value: 123,
            "@type":
              "type.googleapis.com/testing.v1.ServerStreamingHappyRequest",
          },
        ],
      };
      it("skips details when not given a type registry", () => {
        const error = fromJson(json);
        expect(error.details.length).toBe(0);
      });
      it("skips details not present in type registry", () => {
        const error = fromJson(json, {
          typeRegistry: new TypeRegistry(),
        });
        expect(error.details.length).toBe(0);
      });
      it("uses rawDetails when not given a type registry", () => {
        const error = fromJson(json);
        expect(error.rawDetails as unknown).toEqual([
          {
            value: 123,
            "@type":
              "type.googleapis.com/testing.v1.ServerStreamingHappyRequest",
          },
        ]);
      });
      it("uses rawDetails for details not present in type registry", () => {
        const error = fromJson(json, {
          typeRegistry: new TypeRegistry(),
        });
        expect(error.rawDetails as unknown).toEqual([
          {
            value: 123,
            "@type":
              "type.googleapis.com/testing.v1.ServerStreamingHappyRequest",
          },
        ]);
      });
      it("decodes details using type registry", () => {
        const error = fromJson(json, {
          typeRegistry: TypeRegistry.from(ServerStreamingHappyRequest),
        });
        expect(error.code).toBe(Code.PermissionDenied);
        expect(error.rawMessage).toBe("Not permitted");
        expect(error.details.length).toBe(1);
        if (error.details[0] instanceof ServerStreamingHappyRequest) {
          expect(error.details[0].value).toBe(123);
        } else {
          fail();
        }
      });
    });
  });
});

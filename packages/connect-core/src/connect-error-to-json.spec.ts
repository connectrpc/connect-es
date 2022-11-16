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
import { Code } from "./code.js";
import { connectErrorToJson } from "./connect-error-to-json.js";
import { Message, proto3, protoBase64, ScalarType } from "@bufbuild/protobuf";

describe("connectErrorToJson()", () => {
  it("serializes code and message", () => {
    const json = connectErrorToJson(
      new ConnectError("Not permitted", Code.PermissionDenied),
      undefined
    );
    expect(json.code as unknown).toBe("permission_denied");
    expect(json.message as unknown).toBe("Not permitted");
  });
  it("does not serialize empty message", () => {
    const json = connectErrorToJson(
      new ConnectError("", Code.PermissionDenied),
      undefined
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
      ]
    );
    const err = new ConnectError("Not permitted", Code.PermissionDenied);
    err.details.push(
      new ErrorDetail({ reason: "soirée 🎉", domain: "example.com" })
    );
    const got = connectErrorToJson(err, undefined);
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
            }).toBinary()
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

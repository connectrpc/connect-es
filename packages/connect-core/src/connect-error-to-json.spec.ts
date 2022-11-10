import { ConnectError } from "./connect-error.js";
import { Code } from "./code.js";
import { connectErrorToJson } from "./connect-error-to-json.js";
import { Message, proto3, protoBase64, ScalarType } from "@bufbuild/protobuf";

describe("connectErrorToJson()", () => {
  it("serializes code and message", () => {
    const json = connectErrorToJson(
      new ConnectError("Not permitted", Code.PermissionDenied)
    );
    expect(json.code as unknown).toBe("permission_denied");
    expect(json.message as unknown).toBe("Not permitted");
  });
  it("does not serialize empty message", () => {
    const json = connectErrorToJson(
      new ConnectError("", Code.PermissionDenied)
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
    const got = connectErrorToJson(err);
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

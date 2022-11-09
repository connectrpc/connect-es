import { createMethodUrl } from "./create-method-url.js";

describe("createMethodUrl()", function () {
  it("should create the expected URL", function () {
    const url = createMethodUrl(
      "https://example.com",
      "example.Service",
      "Method"
    );
    expect(url.toString()).toEqual(
      "https://example.com/example.Service/Method"
    );
  });
  it("should not duplicating slashes", function () {
    const url = createMethodUrl(
      "https://example.com/",
      "example.Service",
      "Method"
    );
    expect(url.toString()).toEqual(
      "https://example.com/example.Service/Method"
    );
  });
  it("should merge paths", function () {
    const url = createMethodUrl(
      "https://example.com/twirp",
      "example.Service",
      "Method"
    );
    expect(url.toString()).toEqual(
      "https://example.com/twirp/example.Service/Method"
    );
  });
  it("should merge paths without duplicating slashes", function () {
    const url = createMethodUrl(
      "https://example.com/twirp/",
      "example.Service",
      "Method"
    );
    expect(url.toString()).toEqual(
      "https://example.com/twirp/example.Service/Method"
    );
  });
});

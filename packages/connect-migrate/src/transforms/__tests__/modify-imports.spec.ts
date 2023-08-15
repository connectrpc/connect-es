import { defineTest } from "jscodeshift/src/testUtils";

describe("modify-imports", () => {
  const tests = ["simple", "sub-directory-imports", "cjs"];

  tests.forEach((test) => {
    defineTest(__dirname, "modify-imports", null, `modify-imports/${test}`, {
      parser: "ts",
    });
  });
});

import { replacePackageJSONReferences } from "./replacement-map";

describe("replacePackageJSONReferences", () => {
  it("handles parsing package.json", () => {
    expect(
      replacePackageJSONReferences(
        `
            {
                "name": "test",
                "dependencies": {
                    "@bufbuild/connect": "1.0.0",
                }
            }
        `.trim()
      )
    ).toEqual(
      `
            {
                "name": "test",
                "dependencies": {
                    "@connectrpc/connect": "1.0.0",
                }
            }
        `.trim()
    );
  });
});

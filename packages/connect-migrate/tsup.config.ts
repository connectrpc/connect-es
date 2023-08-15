import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/cli.ts"],
  format: "esm",
  clean: true,
  target: ["es2020"],
});

# @bufbuild/connect-migrate

This tool migrates your packages from the old `@bufbuild` organization to the dedicated `@connectrpc` organization.

Usage:

```shell
npx @bufbuild/connect-migrate
```

## What it does

This package is made up of a few migration steps

1. Updates `package.json` files to point to the new `@connectrpc` organization
1. Updates references to these packages in any javascript/typescript files
1. Runs the appropriate install command for your package manager

## What files are changed

We ignore all files within node_modules but will update any other files that end with the following extensions: .ts, .tsx, .js, .jsx, .cjs, mjs.

# @connectrpc/connect-migrate

This tool updates your Connect project to use the new `@connectrpc` packages.

## Usage

To migrate, run the following command in your project root directory:

```shell
npx @connectrpc/connect-migrate
```

Add the `--help` flag to the command to learn more about the available flags.

## What it does

This package is made up of a few migration steps

1. Updates `package.json` files to point to the new `@connectrpc` organization
1. Updates references to these packages in JavaScript and TypeScript files
1. Runs the appropriate `install` command for your package manager

## What files are changed

We ignore all files within `node_modules` but will update any other files that
end with the following extensions: `.ts`, `.tsx`, `.js`, `.jsx`, `.cjs`, `.mjs`.

## Prerequisites

- Commit any unstaged changes to your project, so that you can revert in case the
  migration fails.
- After migration, run your generate scripts to re-generate code with the latest
  plugin versions.

## Alternative running methods

This tool leverages `jscodeshift` in order to find all references to packages and
update them. As a result, we've assumed a parser to parse your JavaScript/TypeScript
files. If you see errors due to parsing, you may be using a custom babel config
or another custom parser. You can work around this while leveraging our
transforms by calling `jscodeshift` directly.

```shell
npx jscodeshift -t ./node_modules/@connectrpc/connect-migrate/dist/cjs/migrations/v0.13.1-transform.js .
```

And add any additional params you feel are necessary. You can find more
information about `jscodeshift` [here](https://github.com/facebook/jscodeshift/blob/main/README.md#usage-cli).

# @connectrpc/connect-migrate

This tool updates your Connect project to use the new `@connectrpc` packages.

Usage:

```shell
npx @connectrpc/connect-migrate --help
```

## What it does

This package is made up of a few migration steps

1. Updates `package.json` files to point to the new `@connectrpc` organization
1. Updates references to these packages in any javascript/typescript files
1. Runs the appropriate install command for your package manager

## What files are changed

We ignore all files within node_modules but will update any other files that end with the following extensions: .ts, .tsx, .js, .jsx, .cjs, mjs.

## Alternative running methods

This tool leverages jscodeshift in order to find all references to packages and update them. As a result, we've assumed a parser to parser your javascript/typescript files. If you see errors due to parsing,
you may be using a custom babel config or another custom parser. You can work around this while leveraging
our transforms by calling jscodeshift directly.

```shell
npx jscodeshift -t ./node_modules/@connectrpc/connect-migrate/dist/cjs/transforms/modify-imports.js .
```

And add any additional params you feel are necessary. You can find more information about jscodeshift [here](https://github.com/facebook/jscodeshift/blob/main/README.md#usage-cli)

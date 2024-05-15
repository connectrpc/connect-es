# Connect Conformance

This package provides common artifacts and functionality for running conformance tests against the various packages in
this repository.

For documentation on the conformance tests, see the repository [here](https://github.com/connectrpc/conformance?tab=readme-ov-file#documentation).

Note that this package does not run any conformance tests itself, but instead exports functionality to be used by other
packages, such as `connect-node`, `connect-web`, etc.

The package exposes three paths for imports:

* `@connectrpc/connect-conformance` - common functionality which can be used for any tests in any environment as well as
  the files generated from the conformance protos located in the [BSR](https://buf.build/connectrpc/conformance).
* `@connectrpc/connect-conformance/node` - contains exports meant to run inside a Node environment, such as creating a
  Connect-Node transport. Note that since Node is used to initiate the conformance runner, the main `run` entrypoint is 
  also located at this path.
* `@connectrpc/connect-conformance/web` - contains exports meant to run inside a web environment (i.e. a browser) such
  as creating a Connect-Web transport.

## Updating the conformance version

To update the version of the conformance runner and protos, change the version in the following places:

* The `generate` command of this package's `package.json` file.
* The `version` constant inside `node/conformance.ts`.


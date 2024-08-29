# Connect Conformance

This package provides common artifacts and functionality for running conformance tests against the various packages in
this repository.

For documentation on the conformance tests, see the repository [here](https://github.com/connectrpc/conformance?tab=readme-ov-file#documentation).

Note that this package does not run any conformance tests itself, but instead exports functionality to be used by other
packages, such as `connect-node`, `connect-web`, etc.

## Updating the conformance version

To update the version of the conformance runner and protos, change the version in the following places:

- The `generate` command of this package's `package.json` file.
- The `version` constant inside `node/conformance.ts`.

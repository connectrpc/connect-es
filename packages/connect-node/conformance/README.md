# Connect-Node Conformance Tests

This directory provides conformance test coverage for @connectrpc/connect-node for both clients and servers.

It uses the [conformance runner](https://github.com/connectrpc/conformance/releases) to run the tests.

## Running conformance tests

```bash
cd packages/connect-node
npx turbo run conformance:server conformance:client
```

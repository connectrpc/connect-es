# Connect-Node Conformance Tests

This directory provides conformance test coverage for @connectrpc/connect-node for both clients and servers. 

It uses the [conformance runner](https://github.com/connectrpc/conformance/releases) to run the tests.

## Running conformance tests

Run `make testnodeconformance` to run all Node conformance tests for both server and client. 
The above command is also available as an npm script: `npm run conformance`.

The individual tests for server and client can also be run via npm:

`npm run conformance:server`
`npm run conformance:client`

# Connect-ES on Cloudflare Conformance Tests

This package provides conformance test coverage for Connect-ES on Cloudflare. 

It uses the [conformance runner](https://github.com/connectrpc/conformance/releases) to run the tests.

Cloudflare worker tests are run once every 24 hours and on a release PR. This is because the tests are run on a live 
Cloudflare worker, and deploying a new version of the worker is a slow process.

## Running conformance tests

To run the conformance tests, use the command `npm run conformance`.

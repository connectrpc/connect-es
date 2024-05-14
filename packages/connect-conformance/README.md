# Conformance tests for connect

This package provides test coverage for connect-es. It implements the conformance service described [here](https://buf.build/connectrpc/conformance).

It uses the [conformance runner](https://github.com/connectrpc/conformance/releases) to run the tests.


## Node

Node tests are run as part of regular CI, on every commit. The [src/node](src/node/) directory contains the entry points for tests.

## Cloudflare workers

Cloudflare worker tests are run once every 24 hours and on a release PR. This is because the tests are run on a live Cloudflare worker, and deploying a new version of the worker is a slow process.

The [src/cloudflare](src/cloudflare/) directory contains the entry points for tests.

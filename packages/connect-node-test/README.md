# Tests

This package provides test coverage for @connectrpc/connect-node with the test
framework [Jasmine](https://jasmine.github.io/).

Run the suite with `make testnode` from the project root.

The tests run against:
- connect-go (h1/h2) via Docker
- grpc-go (h2) via Docker
- @connectrpc/connect-node (h1)


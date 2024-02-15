# Conformance tests for connect

This package provides test coverage for connect-es. It implements the conformance service described [here](https://buf.build/connectrpc/conformance).

It uses the [conformance runner](https://github.com/connectrpc/conformance/releases) to run the tests.

## Browser

Browser tests are run on every commit.

### Running tests in a headless browser

Run `make testwebconformance` to run the tests in a headless browser. It runs tests in chrome and firefox, safari if running on a mac. Safari requires users to enable the 'Allow Remote Automation' option in Safari's Develop menu. As a special case it also runs the
tests in node.

### Running tests in a local browser

Run `make testwebconformancelocal` to run the tests in a local browser. This will open a chrome browser and run the tests. If you want to run the tests in a different browser, set the `CONFORMANCE_BROWSER` environment variable.

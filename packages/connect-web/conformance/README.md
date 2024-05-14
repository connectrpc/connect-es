# Connect-Web Conformance Tests

This directory provides conformance test coverage for @connectrpc/connect-web. It implements the conformance service described [here](https://buf.build/connectrpc/conformance).

## Browser

Browser tests are run on every commit.

### Running tests in a headless browser

Run `make testwebconformance` to run the tests in a headless browser. It runs tests in Chrome and Firefox. It also will run tests in Safari if running on a Mac. Safari requires users to enable the 'Allow Remote Automation' option in Safari's Develop menu. As a special case it also runs the
tests in Node.

### Running tests in a local browser

Run `make testwebconformancelocal` to run the tests in a local browser. This will open a Chrome browser and run the tests. If you want to run the tests in a different browser, set the `CONFORMANCE_BROWSER` environment variable.



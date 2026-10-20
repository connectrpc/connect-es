# Connect-Web Conformance Tests

This directory provides conformance test coverage for @connectrpc/connect-web. It implements the conformance service described [here](https://buf.build/connectrpc/conformance).

It uses the [conformance runner](https://github.com/connectrpc/conformance/releases) to run the tests.

## Running conformance tests

Tests can run in the following environments:

- Chrome
- Firefox
- Safari (only if running in OSX. Safari requires users to enable the "Allow Remote Automation" option in Safari's Develop menu)
- Node.js

Browsers are instrumented with [webdriverio](https://webdriver.io/).

For every environment, two client flavors are available:

- Promise (using `createClient`)
- Callback (using `createCallbackClient`)

For every combination, a task is available:

`npx turbo run conformance:<chrome|firefox|safari|node>:<promise|callback>`

Note tests only run on Node.js in CI, or with the `conformance` task.

The promise client supports all stream types. The callback client only supports unary and
server-streaming methods, so it runs with a separate configuration file.

Client-streaming and bidi-streaming calls require support for streaming request bodies in the
fetch API. Chromium-based browsers only support streaming request bodies over HTTP/2 and HTTP/3,
and Firefox and Safari do not support them at all. The test cases affected are listed in the
`known-failing-*.txt` files, which the conformance runner requires to fail. If a browser gains
support, remove the test cases from the file.

## Using a local browser

To launch a browser window with access to the browser's network inspector, append the `--openBrowser` flag to the npm script:

```
npx turbo run conformance:chrome:promise -- --openBrowser
```

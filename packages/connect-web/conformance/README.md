# Connect-Web Conformance Tests

This directory provides conformance test coverage for @connectrpc/connect-web. It implements the conformance service described [here](https://buf.build/connectrpc/conformance).

It uses the [conformance runner](https://github.com/connectrpc/conformance/releases) to run the tests.

## Running conformance tests

Tests run in the following environments:

* Chrome
* Firefox
* Safari (only if running in OSX. Safari requires users to enable the "Allow Remote Automation" option in Safari's Develop menu)
* Node.js

For every environment, two client flavors are available:
* Promise (using `createPromiseClient`)
* Callback (using `createCallbackClient`)

For every combination, an npm script is available:

`npm run conformance:client:<chrome|firefox|safari|node>:<promise|callback>`

Before you run npm scripts, make sure to build dependencies with `make .tmp/build/connect-web`.

## Using a local browser

To launch a browser window with access to the browser's network inspector, append the `--openBrowser` flag to the npm script:

```
npm run conformance:client:chrome:promise -- --openBrowser
```

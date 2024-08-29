# Connect-Web Conformance Tests

This directory provides conformance test coverage for @connectrpc/connect-web. It implements the conformance service described [here](https://buf.build/connectrpc/conformance).

It uses the [conformance runner](https://github.com/connectrpc/conformance/releases) to run the tests.

## Running conformance tests

Tests run in the following environments:

- Chrome
- Firefox
- Safari (only if running in OSX. Safari requires users to enable the "Allow Remote Automation" option in Safari's Develop menu)
- Node.js

For every environment, two client flavors are available:

- Promise (using `createPromiseClient`)
- Callback (using `createCallbackClient`)

For every combination, a task is available:

`npx turbo run conformance:client:<chrome|firefox|safari|node>:<promise|callback>`

## Using a local browser

To launch a browser window with access to the browser's network inspector, append the `--openBrowser` flag to the npm script:

```
npx turbo run conformance:client:chrome:promise -- --openBrowser
```

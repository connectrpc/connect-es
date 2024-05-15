# Connect-Web Conformance Tests

This directory provides conformance test coverage for @connectrpc/connect-web. It implements the conformance service described [here](https://buf.build/connectrpc/conformance).

It uses the [conformance runner](https://github.com/connectrpc/conformance/releases) to run the tests.

## Running conformance tests

## Using a headless browser

Run `make testwebconformance` to run all conformance tests in the following headless browsers / environments:

* Chrome
* Firefox
* Node 
* Safari (only if running in OSX. Safari requires users to enable the `Allow Remote Automation` option in Safari's Develop menu)

The individual tests can also be run via npm:

`npm run conformance:client:chrome`
`npm run conformance:client:firefox`
`npm run conformance:client:safari`
`npm run conformance:client:node`

## Using a local browser

Run `make testwebconformancelocal` to run the tests in a local browser. This will open a Chrome browser and run the tests. If you want to run the tests in a different browser, set the `CONFORMANCE_BROWSER` environment variable.

Also available as an npm script:

`npm run conformance:client:browser`

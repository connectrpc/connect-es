# Tests

This package provides test coverage for @bufbuild/connect-web with Jasmine.

The test suite is run twice, once in a headless browser, once in Node.js.
Note running in Node.js requires the fetch API implementation added in v18.
You can conveniently run the suite with `make test-node test-browser` from 
the project root. Files with a `.nodeonly` extension are excluded from 
browser runs.

To run the test suite in local browsers, you can start the karma server
with `npm run karma-serve` and open the printed karma server URL in the 
browser you want to test. Alternatively, run `make test-local-browser` from
the project root. If you encounter a CORS error in your local browser, this
is most likely because you need to explicitly trust the self-signed 
certificate of the test server. Open one of the failed requests from the 
browsers network inspector, and trust the self-signed certificate in the 
browser UI.

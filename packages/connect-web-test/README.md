# Tests

This package provides test coverage for @bufbuild/connect-web with the test
framework [Jasmine](https://jasmine.github.io/) and the [Karma](https://karma-runner.github.io/) 
test runner.

The test suite is run multiple times:

1. In a headless browser (Chrome).
2. In multiple old browsers on Browserstack.
3. In Node.js (v18 for the fetch API).

The tests run against:
- connect-go (h1/h2) via Docker
- @bufbuild/connect-node (h1)

### Running tests in a headless browser

Run `make testwebbrowser` to run tests in a headless Chrome. This can be 
combined with Node.js by running `make testwebbrowser testwebnode` to get 
decent coverage quickly. 

### Running tests in a local browser

To run the test suite in local browsers, start the karma server with 
`make testwebbrowserlocal` from the project root. If you encounter a CORS 
error in your local browser, this is most likely because you need to 
explicitly trust the self-signed certificate of the test server. 
Open one of the failed requests from the browsers network inspector, 
and trust the self-signed certificate in the browser UI.

### Running tests in Node.js

@bufbuild/connect-web requires the fetch API. It is available since Node.js 
v18, and you can run this suite of tests on it with `make testwebnode`.
Note that client-streaming and bidi-streaming are not fully supported because
of limitations in browser APIs.

### Running tests in Browserstack

We are running a few select tests on old browsers. Thanks to Browserstack
for the sponsorship!

To run these tests locally, you need to sign up on [browserstack.com](https://www.browserstack.com/)
and provide your username and access key:

```bash
BROWSERSTACK_USERNAME=<username> BROWSERSTACK_ACCESS_KEY=<key> make testwebbrowserstack
```

### Running tests in Node.js

Running in Node.js requires the fetch API implementation added in v18.
You can conveniently run the suite with `make testwebnode` from the project
root. 


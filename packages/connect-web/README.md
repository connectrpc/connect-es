# @connectrpc/connect-web

Connect is a family of libraries for building and consuming APIs on different languages and platforms.
[@connectrpc/connect](https://www.npmjs.com/package/@connectrpc/connect) brings type-safe APIs with Protobuf to
TypeScript.

`@connectrpc/connect-web` provides the following adapters for web browsers, and any other platform that has
the fetch API on board:


### createConnectTransport()

Lets your clients running in the web browser talk to a server with the Connect protocol:

```diff
import { createPromiseClient } from "@connectrpc/connect";
+ import { createConnectTransport } from "@connectrpc/connect-web";
import { ElizaService } from "./gen/eliza_connect.js";

+ // A transport for clients using the Connect protocol with fetch()
+ const transport = createConnectTransport({
+   baseUrl: "https://demo.connectrpc.com",
+ });

const client = createPromiseClient(ElizaService, transport);
const { sentence } = await client.say({ sentence: "I feel happy." });
console.log(sentence) // you said: I feel happy.
```

### createGrpcWebTransport()

Lets your clients running in the web browser  talk to a server with the gRPC-web protocol:

```diff
import { createPromiseClient } from "@connectrpc/connect";
+ import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { ElizaService } from "./gen/eliza_connect.js";

+ // A transport for clients using the Connect protocol with fetch()
+ const transport = createGrpcWebTransport({
+   baseUrl: "https://demo.connectrpc.com",
+ });

const client = createPromiseClient(ElizaService, transport);
const { sentence } = await client.say({ sentence: "I feel happy." });
console.log(sentence) // you said: I feel happy.
```


## Getting started

To get started with Connect, head over to the [docs](https://connectrpc.com/docs/node/getting-started)
for a tutorial, or take a look at [our example](https://github.com/connectrpc/connect-es/tree/main/packages/example).

Connect plays nice with Vue, Svelte, Remix, Next.js, Angular and many others. Take a look at
[our examples](https://github.com/connectrpc/examples-es) for various frameworks.

# Tests

This package contains test coverage for @connectrpc/connect-web with the test
framework [Jasmine](https://jasmine.github.io/) and the [Karma](https://karma-runner.github.io/) 
test runner.

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

@connectrpc/connect-web requires the fetch API. It is available since Node.js 
v18, and you can run this suite of tests on it with `make testwebnode`.
Note that client-streaming and bidi-streaming are not fully supported because
of limitations in browser APIs.

In addition to Karma and Jasmine, this package also runs conformance tests via the Connect conformance runner 
as well as a limited number of tests on older browsers via Browserstack.

For instructions on running conformance tests, see the [conformance](https://github.com/connectrpc/connect-es/tree/main/packages/connect-web/conformance) directory.

To run the Browserstack tests, see the [browserstacktests](https://github.com/connectrpc/connect-es/tree/main/packages/connect-web/src/browserstacktests) directory.

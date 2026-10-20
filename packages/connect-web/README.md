# @connectrpc/connect-web

Connect is a family of libraries for building and consuming APIs on different languages and platforms.
[@connectrpc/connect](https://www.npmjs.com/package/@connectrpc/connect) brings type-safe APIs with Protobuf to
TypeScript.

`@connectrpc/connect-web` provides the following adapters for web browsers, and any other platform that has
the fetch API on board:

### createConnectTransport()

Lets your clients running in the web browser talk to a server with the Connect protocol:

```diff
import { createClient } from "@connectrpc/connect";
+ import { createConnectTransport } from "@connectrpc/connect-web";
import { ElizaService } from "./gen/eliza_connect.js";

+ // A transport for clients using the Connect protocol with fetch()
+ const transport = createConnectTransport({
+   baseUrl: "https://demo.connectrpc.com",
+ });

const client = createClient(ElizaService, transport);
const { sentence } = await client.say({ sentence: "I feel happy." });
console.log(sentence) // you said: I feel happy.
```

### createGrpcWebTransport()

Lets your clients running in the web browser talk to a server with the gRPC-web protocol:

```diff
import { createClient } from "@connectrpc/connect";
+ import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { ElizaService } from "./gen/eliza_connect.js";

+ // A transport for clients using the Connect protocol with fetch()
+ const transport = createGrpcWebTransport({
+   baseUrl: "https://demo.connectrpc.com",
+ });

const client = createClient(ElizaService, transport);
const { sentence } = await client.say({ sentence: "I feel happy." });
console.log(sentence) // you said: I feel happy.
```

### Streaming

Both transports support unary, server-streaming, client-streaming, and bidi-streaming methods.

Client-streaming and bidi-streaming methods send request messages as a streaming request body.
This requires support for streaming request bodies in the fetch API, which is available in
Chromium-based browsers over HTTP/2 and HTTP/3, and in Node.js. Firefox and Safari do not
support streaming request bodies at the time of writing. If support is missing, the call raises
a `ConnectError` with `Code.Unimplemented`. See the [browser compatibility table on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#browser_compatibility)
for the current state of support.

Note that the fetch API only supports half-duplex streaming: the response of a bidi-streaming
call does not become available until all request messages have been sent.

## Getting started

To get started with Connect, head over to the [docs](https://connectrpc.com/docs/node/getting-started)
for a tutorial, or take a look at [our example](https://github.com/connectrpc/connect-es/tree/main/packages/example).

Connect plays nice with Vue, Svelte, Remix, Next.js, Angular and many others. Take a look at
[our examples](https://github.com/connectrpc/examples-es) for various frameworks.

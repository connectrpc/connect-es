# @bufbuild/connect-web

Connect is a family of libraries for building and consuming APIs on different languages and platforms.
[@bufbuild/connect](https://www.npmjs.com/package/@bufbuild/connect) brings type-safe APIs with Protobuf to
TypeScript.

`@bufbuild/connect-web` provides the following adapters for web browsers, and any other platform that has
the fetch API on board:


### createConnectTransport()

Lets your clients running in the web browser talk to a server with the Connect protocol:

```diff
import { createPromiseClient } from "@bufbuild/connect";
+ import { createConnectTransport } from "@bufbuild/connect-web";
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
import { createPromiseClient } from "@bufbuild/connect";
+ import { createGrpcWebTransport } from "@bufbuild/connect-web";
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

To get started with Connect, head over to the [docs](https://connect.build/docs/node/getting-started)
for a tutorial, or take a look at [our example](https://github.com/bufbuild/connect-es/tree/main/packages/example).

Connect plays nice with Vue, Svelte, Remix, Next.js, Angular and many others. Take a look at
[our examples](https://github.com/bufbuild/connect-es-integration) for various frameworks.


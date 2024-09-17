# @connectrpc/connect-node

Connect is a family of libraries for building and consuming APIs on different languages and platforms, and
[@connectrpc/connect](https://www.npmjs.com/package/@connectrpc/connect) brings type-safe APIs with Protobuf to
TypeScript.

`@connectrpc/connect-node` provides the following adapters for Node.js:

### createConnectTransport()

Lets your clients running on Node.js talk to a server with the Connect protocol:

```diff
import { createClient } from "@connectrpc/connect";
+ import { createConnectTransport } from "@connectrpc/connect-node";
import { ElizaService } from "./gen/eliza_connect.js";

+ // A transport for clients using the Connect protocol with Node.js `http` module
+ const transport = createConnectTransport({
+   baseUrl: "https://demo.connectrpc.com",
+   httpVersion: "1.1"
+ });

const client = createClient(ElizaService, transport);
const { sentence } = await client.say({ sentence: "I feel happy." });
console.log(sentence) // you said: I feel happy.
```

### createGrpcTransport()

Lets your clients running on Node.js talk to a server with the gRPC protocol:

```diff
import { createClient } from "@connectrpc/connect";
+ import { createGrpcTransport } from "@connectrpc/connect-node";
import { ElizaService } from "./gen/eliza_connect.js";

+ // A transport for clients using the gRPC protocol with Node.js `http2` module
+ const transport = createGrpcTransport({
+   baseUrl: "https://demo.connectrpc.com",
+   httpVersion: "2"
+ });

const client = createClient(ElizaService, transport);
const { sentence } = await client.say({ sentence: "I feel happy." });
console.log(sentence) // you said: I feel happy.
```

### createGrpcWebTransport()

Lets your clients running on Node.js talk to a server with the gRPC-web protocol:

```diff
import { createClient } from "@connectrpc/connect";
+ import { createGrpcWebTransport } from "@connectrpc/connect-node";
import { ElizaService } from "./gen/eliza_connect.js";

+ // A transport for clients using the Connect protocol with Node.js `http` module
+ const transport = createGrpcWebTransport({
+   baseUrl: "https://demo.connectrpc.com",
+   httpVersion: "1.1"
+ });

const client = createClient(ElizaService, transport);
const { sentence } = await client.say({ sentence: "I feel happy." });
console.log(sentence) // you said: I feel happy.
```

### connectNodeAdapter()

Run your Connect RPCs on the Node.js `http`, `https`, or `http2` modules.

```ts
// connect.ts
import { ConnectRouter } from "@connectrpc/connect";

export default function (router: ConnectRouter) {
  // implement rpc Say(SayRequest) returns (SayResponse)
  router.rpc(ElizaService, ElizaService.methods.say, async (req) => ({
    sentence: `you said: ${req.sentence}`,
  }));
}
```

```diff
// server.ts
import * as http2 from "http2";
+ import routes from "connect";
+ import { connectNodeAdapter } from "@connectrpc/connect-node";

http2.createServer(
+ connectNodeAdapter({ routes }) // responds with 404 for other requests
).listen(8080);
```

With that server running, you can make requests with any gRPC, gRPC-Web, or Connect client.

`buf curl` with the gRPC protocol:

```bash
buf curl --schema buf.build/connectrpc/eliza \
  --protocol grpc --http2-prior-knowledge \
  -d '{"sentence": "I feel happy."}' \
  http://localhost:8080/connectrpc.eliza.v1.ElizaService/Say
```

`curl` with the Connect protocol:

```bash
curl \
    --header "Content-Type: application/json" \
    --data '{"sentence": "I feel happy."}' \
     --http2-prior-knowledge \
    http://localhost:8080/connectrpc.eliza.v1.ElizaService/Say
```

Node.js with the gRPC protocol:

```ts
import { createClient } from "@connectrpc/connect";
import { createGrpcTransport } from "@connectrpc/connect-node";
import { ElizaService } from "./gen/eliza_connect.js";

const transport = createGrpcTransport({
  baseUrl: "http://localhost:8080",
  httpVersion: "2",
});

const client = createClient(ElizaService, transport);
const { sentence } = await client.say({ sentence: "I feel happy." });
console.log(sentence); // you said: I feel happy.
```

A client for the web browser actually looks identical to this example - it would
simply use `createConnectTransport` from [@connectrpc/connect-web](https://www.npmjs.com/package/@connectrpc/connect-web)
instead.

## Getting started

To get started with Connect, head over to the [docs](https://connectrpc.com/docs/node/getting-started)
for a tutorial, or take a look at [our example](https://github.com/connectrpc/connect-es/tree/main/packages/example).

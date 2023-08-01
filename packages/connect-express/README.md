# @bufbuild/connect-express

Connect is a family of libraries for building and consuming APIs on different languages and platforms, and
[@bufbuild/connect](https://www.npmjs.com/package/@bufbuild/connect) brings type-safe APIs with Protobuf to
TypeScript.

`@bufbuild/connect-express` provides a middleware for [Express](https://expressjs.com/), the fast,
unopinionated, minimalist web framework for Node.js

### expressConnectMiddleware()

Adds your Connect RPCs to an Express server.

```ts
// connect.ts
import { ConnectRouter } from "@bufbuild/connect";

export default function(router: ConnectRouter) {
  // implement rpc Say(SayRequest) returns (SayResponse)
  router.rpc(ElizaService, ElizaService.methods.say, async (req) => ({
    sentence: `you said: ${req.sentence}`,
  }));
}
```

```diff
// server.ts
import http from "http";
import express from "express";
+ import routes from "connect";
+ import { expressConnectMiddleware } from "@bufbuild/connect-express";

const app = express();

+ app.use(expressConnectMiddleware({
+  routes
+ }));

http.createServer(app).listen(8080);
```

With that server running, you can make requests with any gRPC-web or Connect client.

`curl` with the Connect protocol:

```bash
curl \
    --header "Content-Type: application/json" \
    --data '{"sentence": "I feel happy."}' \
    http://localhost:8080/connectrpc.eliza.v1.ElizaService/Say
```

Node.js with the gRPC-web protocol (using a transport from [@bufbuild/connect-node](https://www.npmjs.com/package/@bufbuild/connect-node)):

```ts
import { createPromiseClient } from "@bufbuild/connect";
import { createGrpcWebTransport } from "@bufbuild/connect-node";
import { ElizaService } from "./gen/eliza_connect.js";

const transport = createGrpcWebTransport({
  baseUrl: "http://localhost:8080",
  httpVersion: "1.1",
});

const client = createPromiseClient(ElizaService, transport);
const { sentence } = await client.say({ sentence: "I feel happy." });
console.log(sentence) // you said: I feel happy.
```

A client for the web browser actually looks identical to this example - it would
simply use `createConnectTransport` from [@bufbuild/connect-web](https://www.npmjs.com/package/@bufbuild/connect-web)
instead.

Note that support for gRPC is limited, since many gRPC clients require HTTP/2,
and Express does not support the Node.js `http2` module.


## Getting started

To get started with Connect, head over to the [docs](https://connectrpc.com/docs/node/getting-started)
for a tutorial, or take a look at [our example](https://github.com/bufbuild/connect-es/tree/main/packages/example).

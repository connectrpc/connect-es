# @bufbuild/connect-fastify

Connect is a family of libraries for building and consuming APIs on different languages and platforms, and
[@bufbuild/connect](https://www.npmjs.com/package/@bufbuild/connect) brings type-safe APIs with Protobuf to
TypeScript.

`@bufbuild/connect-fastify` provides a plugin for [fastify](https://www.fastify.io/), the fast and
low overhead web framework, for Node.js.

### fastifyConnectPlugin()

Plug your Connect RPCs into a fastify server.

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
import { fastify } from "fastify";
+ import routes from "connect";
+ import { fastifyConnectPlugin } from "@bufbuild/connect-fastify";

const server = fastify({
  http2: true,
});

+ await server.register(fastifyConnectPlugin, {
+  routes
+ });

await server.listen({
  host: "localhost",
  port: 8080,
});
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

Node.js with the gRPC protocol (using a transport from [@bufbuild/connect-node](https://www.npmjs.com/package/@bufbuild/connect-node)):

```ts
import { createPromiseClient } from "@bufbuild/connect";
import { createGrpcTransport } from "@bufbuild/connect-node";
import { ElizaService } from "./gen/eliza_connect.js";

const transport = createGrpcTransport({
  baseUrl: "http://localhost:8080",
  httpVersion: "2",
});

const client = createPromiseClient(ElizaService, transport);
const { sentence } = await client.say({ sentence: "I feel happy." });
console.log(sentence) // you said: I feel happy.
```

A client for the web browser actually looks identical to this example - it would
simply use `createConnectTransport` from [@bufbuild/connect-web](https://www.npmjs.com/package/@bufbuild/connect-web)
instead.


## Getting started

To get started with Connect, head over to the [docs](https://connect.build/docs/node/getting-started)
for a tutorial, or take a look at [our example](https://github.com/bufbuild/connect-es/tree/main/packages/example).

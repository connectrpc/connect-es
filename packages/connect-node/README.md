# @bufbuild/connect-node (Preview)

Connect-Node is a slim library for building browser and gRPC-compatible HTTP APIs. 
The procedures are defined in a [Protocol Buffer](https://developers.google.com/protocol-buffers)
schema, and Connect generates code and types for type-safe clients and handlers.
Handlers and clients support three protocols: gRPC, gRPC-Web, and Connect's own protocol.

The [Connect protocol](https://connect.build/docs/protocol/) is a simple,
POST-only protocol that works over HTTP/1.1 or HTTP/2. It takes the best portions 
of gRPC and gRPC-Web, including streaming, and packages them into a protocol that 
works equally well in browsers, monoliths, and microservices. Calling a Connect 
API is as easy as using `curl`.


## Project status

Connect-Node is still in preview, so we want your feedback! We’d love to learn about 
your use cases and what you’d like to do with Connect-Node. For example, do you plan 
to use it with React, Remix, or on the edge with Vercel’s Edge Runtime? You can reach 
us either through the [Buf Slack](https://buf.build/links/slack/) or by filing a 
[GitHub issue](https://github.com/bufbuild/connect-web/issues) and we’d be more than 
happy to chat!


## A small example

Curious what this looks like in practice? From a [Protobuf schema](https://github.com/bufbuild/connect-web/blob/main/packages/example/eliza.proto), 
we generate a small piece of RPC metadata with [@bufbuild/protoc-gen-connect-web](https://www.npmjs.com/package/@bufbuild/protoc-gen-connect-web), 
the `ElizaService`. Using that metadata, we can build a server:

```ts
// server.ts
import { createHandler, mergeHandlers } from "@bufbuild/connect-node";
import { ElizaService } from "./gen/eliza_connect.js";
import * as http2 from "http2";

// A Node.js request listener that implements rpc Say(SayRequest) returns (SayResponse)
const handleSay = createHandler(
  ElizaService,
  ElizaService.methods.say,
  async (req) => {
    return {
      sentence: `you said: ${req.sentence}`,
    };
  }
);

http2.createServer(
  mergeHandlers([handleSay]) // responds with 404 for other requests
).listen(8080);
```

With that server running, you can make requests with any gRPC or Connect client.

`buf curl` with the gRPC protocol:

```bash
buf curl --schema /Users/ts/buf/connect-web-main/packages/example/eliza.proto \
  --protocol grpc --http2-prior-knowledge \
  -d '{"sentence": "I feel happy."}' \
  http://localhost:8080/buf.connect.demo.eliza.v1.ElizaService/Say
```

`curl` with the Connect protocol:

```bash
curl \
    --header "Content-Type: application/json" \
    --data '{"sentence": "I feel happy."}' \
     --http2-prior-knowledge \
    http://localhost:8080/buf.connect.demo.eliza.v1.ElizaService/Say
```

`@bufbuild/connect-node` with the gRPC protocol:

```ts
import { createGrpcTransport, createPromiseClient } from "@bufbuild/connect-node";
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
simply use `createConnectTransport` from `@bufbuild/connect-web` instead.


## Getting started

To get started, head over to the [docs](https://connect.build/docs/node/getting-started) 
for a tutorial, or take a look at [our example](https://github.com/bufbuild/connect-web/tree/main/packages/example). 

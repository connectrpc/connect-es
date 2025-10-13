<img src=".github/connect-logo.png" width="15%" />

# Connect for ECMAScript

[![License](https://img.shields.io/github/license/connectrpc/connect-es?color=blue)](./LICENSE) [![Build](https://github.com/connectrpc/connect-es/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/connectrpc/connect-es/actions/workflows/ci.yaml) [![NPM Version](https://img.shields.io/npm/v/@connectrpc/connect/latest?color=green&label=%40connectrpc%2Fconnect)](https://www.npmjs.com/package/@connectrpc/connect)

Connect is a family of libraries for building type-safe APIs with different languages and platforms.
[@connectrpc/connect](https://www.npmjs.com/package/@connectrpc/connect) brings them to TypeScript,
web browsers, and Node.js.

## A small example

With Connect, we define our schema first:

```proto
service ElizaService {
  rpc Say(SayRequest) returns (SayResponse) {}
}
```

And with the magic of code generation, we can implement and serve our service:

```ts
import * as http from "node:http";
import type { ConnectRouter } from "@connectrpc/connect";
import { connectNodeAdapter } from "@connectrpc/connect-node";
import { createValidateInterceptor } from "@connectrpc/validate";
import type { SayRequest } from "./gen/eliza_pb.js";
import { ElizaService } from "./gen/eliza_pb.js";

// The adapter turns our RPC routes into a Node.js request handler.
const handler = connectNodeAdapter({
  // Validation via Protovalidate is almost always recommended
  interceptors: [createValidateInterceptor()],
  routes: (router: ConnectRouter) => {
    router.service(ElizaService, {
      say(req: SayRequest) {
        return {
          sentence: `You said "${req.sentence}"`,
        };
      },
    });
  },
});

http.createServer(handler).listen(8080)
```

Calling an RPC is just as simple. You create a client with your server's URL and call a method:

```ts
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";
import { ElizaService } from "./gen/eliza_pb.js";

const client = createClient(
  ElizaService,
  createConnectTransport({
    httpVersion: "1.1",
    baseUrl: "http://localhost:8080",
  })
);

try {
  const res = await client.say({sentence: "Hello, world!"})
  console.log(res.sentence)
} catch (err) {
  console.error(err);
}
```

Of course, a plain HTTP server isn't fit for production use! See
Connect's [server plugins](https://connectrpc.com/docs/node/server-plugins)
for a guide to production deployment with Fastify, Next.js, Express, and more.

## Simple, cURL-friendly RPC protocol

Unlike REST, the Remote Procedure Calls are type-safe, but they are regular HTTP
under the hood. You can see all requests in the network inspector, and you
can `curl` them if you want:

```shell
curl \
    --header 'Content-Type: application/json' \
    --data '{"sentence": "I feel happy."}' \
    https://demo.connectrpc.com/connectrpc.eliza.v1.ElizaService/Say
```

Connect uses [Protobuf-ES](https://github.com/bufbuild/protobuf-es), the only
[fully-compliant](https://buf.build/blog/protobuf-conformance) Protobuf JavaScript library.

Connect implements RPC three protocols: The widely available gRPC and
gRPC-web protocols, and Connect's [own protocol](https://connectrpc.com/docs/protocol/),
optimized for the web. This gives you unparalleled interoperability across many
platforms and languages, with type safety end-to-end.

## Get started on the web

Follow our [10-minute tutorial](https://connectrpc.com/docs/web/getting-started) where
we use [Vite](https://vitejs.dev/) and [React](https://reactjs.org/) to create a
web interface for ELIZA.

For other frameworks, such as **Svelte**, **Vue**, **Next.js** and **Angular**, see [our examples](https://github.com/connectrpc/examples-es).
For **TanStack Query**, see our expansion pack [Connect-Query](https://github.com/connectrpc/connect-query-es).

## Get started on Node.js

Follow our [10-minute tutorial](https://connectrpc.com/docs/node/getting-started)
to spin up a service in Node.js, and call it from the web, and from a gRPC client
in your terminal.

You can serve your Connect RPCs with vanilla Node.js, or use our [server plugins](https://connectrpc.com/docs/node/server-plugins)
for **Fastify**, **Next.js**, and **Express**.

## Migrating from version 1

If you are migrating from v1 to v2, check out our [migration guide](./MIGRATING.md).

## Other platforms

Would you like to use Connect on other platforms like Bun, Deno, Vercel’s Edge Runtime,
or Cloudflare Workers? We’d love to learn about your use cases and what you’d like to do
with Connect. You can reach us either through the [Buf Slack](https://buf.build/links/slack/)
or by filing a [GitHub issue](https://github.com/connectrpc/connect-es/issues) and we’d
be more than happy to chat!

## Packages

- [@connectrpc/connect](https://www.npmjs.com/package/@connectrpc/connect):
  RPC clients and servers for your schema ([source code](packages/connect)).
- [@connectrpc/connect-web](https://www.npmjs.com/package/@connectrpc/connect-web):
  Adapters for web browsers and any other platform that has the fetch API on board.
- [@connectrpc/connect-node](https://www.npmjs.com/package/@connectrpc/connect-node):
  Serve RPCs on vanilla Node.js servers. Call RPCs with any protocol.
- [@connectrpc/connect-fastify](https://www.npmjs.com/package/@connectrpc/connect-fastify):
  Plug your services into a [Fastify](https://www.fastify.io/) server.
- [@connectrpc/connect-next](https://www.npmjs.com/package/@connectrpc/connect-next):
  Serve your RPCs with [Next.js](https://nextjs.org/) API routes.
- [@connectrpc/connect-express](https://www.npmjs.com/package/@connectrpc/connect-express):
  Adds your services to an [Express](https://expressjs.com/) server.

## Ecosystem

- [examples-es](https://github.com/connectrpc/examples-es):
  Examples for using Connect with various TypeScript web frameworks and tooling
- [validate-es](https://www.npmjs.com/package/@connectrpc/validate):
  [Protovalidate](https://protovalidate.com) interceptor for Connect.
- [connect-query-es](https://github.com/connectrpc/connect-query-es):
  TypeScript-first expansion pack for TanStack Query that gives you Protobuf superpowers
- [connect-playwright-es](https://github.com/connectrpc/connect-playwright-es):
  Playwright tests for your Connect application
- [connect-swift](https://github.com/connectrpc/connect-swift):
  Idiomatic gRPC & Connect RPCs for Swift
- [connect-go](https://github.com/connectrpc/connect-go):
  Go implementation of gRPC, gRPC-Web, and Connect
- [examples-go](https://github.com/connectrpc/examples-go):
  Example RPC service powering https://demo.connectrpc.com and built with connect-go
- [conformance](https://github.com/connectrpc/conformance):
  gRPC-Web and Connect interoperability tests
- [Buf Studio](https://buf.build/studio): web UI for ad-hoc RPCs

## Compatibility

All maintained releases of Node.js ([Current, Active LTS, and the Maintenance LTS release](https://nodejs.org/en/about/previous-releases))
are supported.

[Baseline web browsers](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility)
from the last 2.5 years are supported.

[Same as Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped#support-window),
we support versions of TypeScript that are less than 2 years old, with default compiler
settings. Note that for some changes in TypeScript, it is impossible to support both
new and old versions in the support window. We break the tie by supporting the newer
version.

## Status

This project is stable and follows semantic versioning, which means any breaking changes will result in a major version increase.
Our goal is to not make breaking changes unless absolutely necessary.

## Legal

Offered under the [Apache 2 license](/LICENSE).

<img src=".github/connect-logo.png" width="15%" />

# Connect for ECMAScript

[![License](https://img.shields.io/github/license/bufbuild/connect-es?color=blue)](./LICENSE) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/connect/latest?color=green&label=%40bufbuild%2Fconnect)](https://www.npmjs.com/package/@bufbuild/connect) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protoc-gen-connect-es/latest?color=green&label=%40bufbuild%2Fprotoc-gen-connect-es)](https://www.npmjs.com/package/@bufbuild/protoc-gen-connect-es)

Connect is a family of libraries for building type-safe APIs with different languages and platforms.  
[@bufbuild/connect](https://www.npmjs.com/package/@bufbuild/connect) brings them to TypeScript,
the web browser, and to Node.js.

With Connect, you define your schema first:

```
service ElizaService {
  rpc Say(SayRequest) returns (SayResponse) {}
}
```

And with the magic of code generation, this schema produces servers and clients:

```ts
const answer = await eliza.say({sentence: "I feel happy."});
console.log(answer);
// {sentence: 'When you feel happy, what do you do?'}
```

Unlike REST, the Remote Procedure Call are type-safe, but they are regular HTTP 
under the hood. You can see all requests in the network inspector, and you 
can `curl` them if you want:

```shell
curl \
    --header 'Content-Type: application/json' \
    --data '{"sentence": "I feel happy."}' \
    https://demo.connect.build/buf.connect.demo.eliza.v1.ElizaService/Say
```

Connect uses [Protocol Buffers](https://github.com/bufbuild/protobuf-es) for the 
schema, and implements RPC with three protocols: The widely available gRPC and 
gRPC-web protocols, and Connect's [own protocol](https://connect.build/docs/protocol/),
optimized for the web. This gives you unparalleled interoperability across many
platforms and languages, with type-safety end-to-end.


## Get started on the web

Follow our [10 minute tutorial](https://connect.build/docs/web/getting-started) where
we use [Vite](https://vitejs.dev/) and [React](https://reactjs.org/) to create a
web interface for ELIZA.

**React**, **Svelte**, **Vue**, **Next.js** and **Angular** are supported (see [examples](https://github.com/bufbuild/connect-es-integration)), 
and we have an expansion pack for [TanStack Query](https://github.com/bufbuild/connect-query).
We support all modern web browsers that implement the widely available
[fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
and the [Encoding API](https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API).


## Get started on Node.js

Follow our [10 minute tutorial](https://connect.build/docs/node/getting-started)
to spin up service in Node.js, and call it from the web, and from a gRPC client 
in your terminal.

You can use vanilla Node.js, or our server plugins for [Fastify](https://www.fastify.io/) 
or [Express](https://expressjs.com/). We support the builtin `http`, and `http2` 
modules on Node.js v16, v17 and v18.


## Other platforms

Would you like to use Connect on other platforms like Bun, Deno, Vercel’s Edge Runtime,
or Cloudflare Workers? We’d love to learn about your use cases and what you’d like to do
with Connect. You can reach us either through the [Buf Slack](https://buf.build/links/slack/)
or by filing a [GitHub issue](https://github.com/bufbuild/connect-web/issues) and we’d
be more than happy to chat!


## Packages

- [@bufbuild/connect](https://www.npmjs.com/package/@bufbuild/connect):
  RPC clients and servers for your schema ([source code](packages/connect)).
- [@bufbuild/protoc-gen-connect-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-connect-es):
  Code generator plugin for the services in your schema ([source code](packages/protoc-gen-connect-es)).
- [@bufbuild/connect-web](https://www.npmjs.com/package/@bufbuild/connect-web):
  Adapters for web browsers, and any other platform that has the fetch API on board.
- [@bufbuild/connect-node](https://www.npmjs.com/package/@bufbuild/connect-node):
  Serve RPCs on vanilla Node.js servers. Call RPCs with any protocol.
- [@bufbuild/connect-fastify](https://www.npmjs.com/package/@bufbuild/connect-fastify):
  Plug your services into a [Fastify](https://www.fastify.io/) server.
- [@bufbuild/connect-express](https://www.npmjs.com/package/@bufbuild/connect-express):
  Adds your services to an [Express](https://expressjs.com/) server.

The libraries and the generated code are compatible with ES2017 and TypeScript 4.1.


## Ecosystem

* [connect-es-integration](https://github.com/bufbuild/connect-es-integration):
  Examples for using Connect with various TypeScript web frameworks and tooling
* [connect-query](https://github.com/bufbuild/connect-query):
  TypeScript-first expansion pack for TanStack Query that gives you Protobuf superpowers
* [connect-swift](https://github.com/bufbuild/connect-swift):
  Idiomatic gRPC & Connect RPCs for Swift.
* [connect-go](https://github.com/bufbuild/connect-go):
  Go implementation of gRPC, gRPC-Web, and Connect
* [connect-demo](https://github.com/bufbuild/connect-demo):
  demonstration service powering demo.connect.build
* [connect-crosstest](https://github.com/bufbuild/connect-crosstest):
  gRPC-Web and Connect interoperability tests
* [Buf Studio](https://studio.buf.build/): web UI for ad-hoc RPCs



## Status

This project is a beta: we rely on it in production, but we may make a few
changes as we gather feedback from early adopters. Join us on [Slack](https://buf.build/links/slack)
or see the [roadmap discussion](https://github.com/bufbuild/connect-web/discussions/315) for details.


## Legal

Offered under the [Apache 2 license](/LICENSE).

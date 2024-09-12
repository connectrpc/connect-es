<img src=".github/connect-logo.png" width="15%" />

# Connect for ECMAScript

[![License](https://img.shields.io/github/license/connectrpc/connect-es?color=blue)](./LICENSE) [![Build](https://github.com/connectrpc/connect-es/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/connectrpc/connect-es/actions/workflows/ci.yaml) [![NPM Version](https://img.shields.io/npm/v/@connectrpc/connect/latest?color=green&label=%40connectrpc%2Fconnect)](https://www.npmjs.com/package/@connectrpc/connect)

Connect is a family of libraries for building type-safe APIs with different languages and platforms.
[@connectrpc/connect](https://www.npmjs.com/package/@connectrpc/connect) brings them to TypeScript,
the web browser, and to Node.js.

With Connect, you define your schema first:

```
service ElizaService {
  rpc Say(SayRequest) returns (SayResponse) {}
}
```

And with the magic of code generation, this schema produces servers and clients:

```ts
const answer = await eliza.say({ sentence: "I feel happy." });
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
    https://demo.connectrpc.com/connectrpc.eliza.v1.ElizaService/Say
```

Connect uses [Protobuf-ES](https://github.com/bufbuild/protobuf-es), the only
[fully-compliant](https://buf.build/blog/protobuf-conformance) Protobuf JavaScript library.

Connect implements RPC three protocols: The widely available gRPC and
gRPC-web protocols, and Connect's [own protocol](https://connectrpc.com/docs/protocol/),
optimized for the web. This gives you unparalleled interoperability across many
platforms and languages, with type-safety end-to-end.

## Get started on the web

Follow our [10 minute tutorial](https://connectrpc.com/docs/web/getting-started) where
we use [Vite](https://vitejs.dev/) and [React](https://reactjs.org/) to create a
web interface for ELIZA.

**React**, **Svelte**, **Vue**, **Next.js** and **Angular** are supported (see [examples](https://github.com/connectrpc/examples-es)),
and we have an expansion pack for [TanStack Query](https://github.com/connectrpc/connect-query-es).
We support all modern web browsers that implement the widely available
[fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
and the [Encoding API](https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API).

## Get started on Node.js

Follow our [10 minute tutorial](https://connectrpc.com/docs/node/getting-started)
to spin up a service in Node.js, and call it from the web, and from a gRPC client
in your terminal.

You can serve your Connect RPCs with vanilla Node.js, or use our [server plugins](https://connectrpc.com/docs/node/server-plugins)
for **Fastify**, **Next.js**, and **Express**. We support Node.js v18.14.1 and later with
the builtin `http` and `http2` modules.

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
  Adapters for web browsers, and any other platform that has the fetch API on board.
- [@connectrpc/connect-node](https://www.npmjs.com/package/@connectrpc/connect-node):
  Serve RPCs on vanilla Node.js servers. Call RPCs with any protocol.
- [@connectrpc/connect-fastify](https://www.npmjs.com/package/@connectrpc/connect-fastify):
  Plug your services into a [Fastify](https://www.fastify.io/) server.
- [@connectrpc/connect-next](https://www.npmjs.com/package/@connectrpc/connect-next):
  Serve your RPCs with [Next.js](https://nextjs.org/) API routes.
- [@connectrpc/connect-express](https://www.npmjs.com/package/@connectrpc/connect-express):
  Adds your services to an [Express](https://expressjs.com/) server.

The libraries and the generated code are compatible with ES2017 and TypeScript 4.1.

## Ecosystem

- [examples-es](https://github.com/connectrpc/examples-es):
  Examples for using Connect with various TypeScript web frameworks and tooling
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

## Status: Stable

All packages are stable and have reached a major version release.

## Legal

Offered under the [Apache 2 license](/LICENSE).

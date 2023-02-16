<img src=".github/connect-logo.png" width="15%" />

# Connect for ECMAScript

[![License](https://img.shields.io/github/license/bufbuild/connect-es?color=blue)](./LICENSE) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/connect-web/latest?color=green&label=%40bufbuild%2Fconnect-web)](https://www.npmjs.com/package/@bufbuild/connect-web) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/connect-node/latest?color=green&label=%40bufbuild%2Fconnect-node)](https://www.npmjs.com/package/@bufbuild/connect-node) [![NPM Version](https://img.shields.io/npm/v/@bufbuild/protoc-gen-connect-es/latest?color=green&label=%40bufbuild%2Fprotoc-gen-connect-es)](https://www.npmjs.com/package/@bufbuild/protoc-gen-connect-es)

Connect is a family of libraries for building and consuming APIs on 
different languages and platforms. 

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

Unlike REST, the RPCs you use with Connect are typesafe end to end, but they are 
regular HTTP under the hood. You can see all requests in the network inspector,
and you can `curl` them if you want:

```shell
curl \
    --header 'Content-Type: application/json' \
    --data '{"sentence": "I feel happy."}' \
    https://demo.connect.build/buf.connect.demo.eliza.v1.ElizaService/Say
```

With Connect for ECMAScript, you can spin up a service in Node.js and call it
from the web, the terminal, or native mobile clients. Under the hood, it uses 
[Protocol Buffers](https://github.com/bufbuild/protobuf-es) for the schema, and 
implements RPC (remote procedure calls) with three protocols: The widely available 
gRPC and gRPC-web, and Connect's [own protocol](https://connect.build/docs/protocol/), 
optimized for the web. This gives you unparalleled interoperability with 
full-stack type-safety.

To get started, head over to the [docs](https://connect.build/docs/web/getting-started)
for a tutorial. You will also find API documentation and best practices there.
For using Connect with your favorite frontend framework, take a look at
[connect-web-integration](https://github.com/bufbuild/connect-web-integration).

## Ecosystem

* [connect-web-integration](https://github.com/bufbuild/connect-web-integration):
  Example projects using Connect-Web with various JS frameworks and tooling
* [connect-query](https://github.com/bufbuild/connect-query):
  TypeScript-first expansion pack for TanStack Query that gives you Protobuf superpowers
* [connect-swift](https://github.com/bufbuild/connect-swift):
  Idiomatic gRPC & Connect RPCs for Swift.
* [connect-go](https://github.com/bufbuild/connect-go):
  Go implementation of gRPC, gRPC-Web, and Connect
* [connect-demo](https://github.com/bufbuild/connect-demo):
  demonstration service powering demo.connect.build
* [Buf Studio](https://studio.buf.build/): web UI for ad-hoc RPCs
* [connect-crosstest](https://github.com/bufbuild/connect-crosstest):
  gRPC-Web and Connect interoperability tests


## Packages

- [@bufbuild/connect-web](https://www.npmjs.com/package/@bufbuild/connect-web):
  Implements browser clients for the Connect and gRPC-web protocols ([source code](packages/connect-web)).
- [@bufbuild/connect-node](https://www.npmjs.com/package/@bufbuild/connect-node):
  Implements Node.js clients and servers for the Connect, gRPC-web, and gRPC protocols ([source code](packages/connect-node)).
- [@bufbuild/protoc-gen-connect-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-connect-es):
  Code generator plugin for the services in your schema ([source code](packages/protoc-gen-connect-es)).


## Supported Platforms

We support all modern web browsers that implement the widely available 
[fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
and the [Encoding API](https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API).
The libraries and the generated code are compatible with ES2017 and TypeScript 4.1.

On Node.js, we use the `http`, `https`, or `http2` modules, and support v16, v17 and v18.

Would you like to use Connect on other platforms like Bun, Deno, Vercel’s Edge Runtime,
or Cloudflare Workers? We’d love to learn about your use cases and what you’d like to do 
with Connect. You can reach us either through the [Buf Slack](https://buf.build/links/slack/) 
or by filing a [GitHub issue](https://github.com/bufbuild/connect-web/issues) and we’d 
be more than happy to chat!


## Status

This project is a beta: we rely on it in production, but we may make a few
changes as we gather feedback from early adopters. Join us on [Slack](https://buf.build/links/slack)
or see the [roadmap discussion](https://github.com/bufbuild/connect-web/discussions/315) for details.


## Legal

Offered under the [Apache 2 license](/LICENSE).

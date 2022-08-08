# Connect-Web

Connect-Web is a simple library to call remote procedures from a web browser. 
Unlike REST, you get a type-safe client and never have to think about
serialization again.

The procedures are defined in a [Protocol Buffer](https://developers.google.com/protocol-buffers)
schema implemented by your backend, and Connect-Web generates the clients and
related types to access the backend. The clients support two protocols:
gRPC-web, and Connect's own protocol.

The [Connect protocol](https://connect.build/docs/protocol/) is a simple,
POST-only protocol that works over HTTP/1.1 or HTTP/2. It supports
server-streaming methods just like gRPC-Web, but is easy to debug in the
network inspector. Calling a Connect API is easy enough just with the fetch
API. Try it with our live demo:

```ts
const res = await fetch("https://demo.connect.build/buf.connect.demo.eliza.v1.ElizaService/Say", {
  method: "POST",
  headers: {"content-type": "application/json"},
  body: `{"sentence": "I feel happy."}`
});
const answer = res.json();
console.log(answer);
// {sentence: 'When you feel happy, what do you do?'}
```

Using the client generated by Connect-Web, the same call becomes quite a bit 
simpler:

```ts
const answer = await eliza.say({sentence: "I feel happy."});
console.log(answer);
// {sentence: 'When you feel happy, what do you do?'}
```

To get started, head over to the [docs](https://connect.build/docs/web/getting-started) 
for a tutorial, or take a look at [our examples](https://github.com/bufbuild/connect-web-integration)
for integration with various frameworks. 


## Supported Browsers

Connect-Web supports all modern web browsers that implement the widely
available [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
and the [Encoding API](https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API).
The library and the generated code are compatible with ES2017 and TypeScript 4.1.

Node.js is not supported. We are working on Connect for Node.js - if you are 
interested, let us know on [Slack](https://join.slack.com/t/bufbuild/shared_invite/zt-f5k547ki-VDs_iC4TblNCu7ubhRD17w) 
or on [GitHub discussions](https://github.com/bufbuild/connect-web/discussions).


## Packages

- [@bufbuild/connect-web](https://www.npmjs.com/package/@bufbuild/connect-web):
  Implements the Connect and gRPC-web protocols ([source code](packages/connect-web)).
- [@bufbuild/protoc-gen-connect-web](https://www.npmjs.com/package/@bufbuild/protoc-gen-connect-web):
  Code generator plugin for the services in your schema ([source code](packages/protoc-gen-connect-web)).


## Ecosystem

* [connect-web-integration](https://github.com/bufbuild/connect-web-integration):
  Example projects using Connect-Web with various JS frameworks and tooling
* [connect-go](https://github.com/bufbuild/connect-go):
  Go implementation of gRPC, gRPC-Web, and Connect
* [connect-demo](https://github.com/bufbuild/connect-demo):
  demonstration service powering demo.connect.build
* [Buf Studio](https://studio.buf.build/): web UI for ad-hoc RPCs
* [connect-crosstest](https://github.com/bufbuild/connect-crosstest):
  gRPC-Web and Connect interoperability tests


## Status

This project is a beta: we rely on it in production, but we may make a few
changes as we gather feedback from early adopters. We're planning to release a
stable v1 later this year.


## Legal

Offered under the [Apache 2 license](/LICENSE).

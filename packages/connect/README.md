# @bufbuild/connect

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


## Getting started

To get started with Connect, head over to the [docs](https://connect.build/docs/node/getting-started)
for a tutorial, or take a look at [our example](https://github.com/bufbuild/connect-es/tree/main/packages/example).

Connect plays nice with Vue, Svelte, Remix, Next.js, Angular and many others. Take a look at
[our examples](https://github.com/bufbuild/connect-es-integration) for various frameworks.


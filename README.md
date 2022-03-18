# Connect-ES

Connect-ES is the simple and flexible framework for your RPC needs. Under the hood,
it uses protocol buffers and gRPC-web. You write an API definition file, and
Connect-ES generates a small piece of code from which clients and servers are
derived - with compile-time type-safety, if you use TypeScript.

<details>
 <summary>New to protocol buffers?</summary>

The examples below use the following `ping.proto` file:

```protobuf
// ping.proto
syntax = "proto3";

package connect.ping.v1test;

message PingRequest {
  int64 number = 1;
  string text = 2;
}

message PingResponse {
  int64 number = 1;
  string text = 2;
}

message CumSumRequest {
  int64 number = 1;
}

message CumSumResponse {
  int64 sum = 1;
}

service PingService {
  // Ping sends a ping to the server to determine if it's reachable.
  rpc Ping(PingRequest) returns (PingResponse) {}
  // CumSum determines the cumulative sum of all the numbers sent on the stream.
  rpc CumSum(stream CumSumRequest) returns (stream CumSumResponse) {}
}
```

To compile it to TypeScript, you can use `protoc`, or `buf`:

```yaml
# buf.gen.yaml - a code generation template 
version: v1
plugins:
    # this plugin generates the request and response messages 
  - remote: buf.build/protocolbuffers/plugins/es
    out: gen
    # this plugin generates the PingService
  - remote: buf.build/connect/plugins/es
    out: gen
```

```shell
$ npm install @bufbuild/buf @bufbuild/protoc-gen-es @bufbuild/protoc-gen-connect-es
$ npx buf generate
```

This generates two files:

```shell
.
├── node_modules/…
├── ping.proto
└── gen
    └── ping_pb.ts      ← contains the request and response messages
    └── ping_connect.ts ← contains the service type
```

Learn more about protocol buffers and our ECMAScript implementation in the docs.
</details>


### An example client

To make a request, you first create a client for a service, then invoke any of
its methods:

```ts
const client = makePromiseClient(PingService, transport);

const response = await client.ping({
  number: 123n,
  text: "hello"
});

for await (const response of await client.countUp({ number: 11n })) {
  console.log(`number: ${response.number}`)
}
```

`makePromiseClient()` makes a client for a service - if you prefer, you can also
make a client that uses callbacks instead of promises, or make your own client
shapes.   
Head to [the client tutorial](TODO) to get started.


### An example server

Implementing a server is equally straight-forward:

```ts
const router = makeExpressRouter(PingService, {
  ping(request: PingRequest): PingResponse | Promise<PingResponse> {
    return new PingResponse({
      number: request.number,
      text: request.text,
    });
  },
  * countUp(request: CountUpRequest): AsyncIterable<CountUpResponse> {
    for (const i = 0n; i < request.number; i++) {
      yield new CountUpResponse({
        number: i,
      });
    }
  }
});

// use the router with an express app
app.use('/', router);
```

`makeExpressRouter()` takes a service definition and an and implementation, and
returns an express router.

Head to [the server tutorial](TODO) to get started.

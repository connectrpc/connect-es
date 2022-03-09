# Connect-ES npm packages


### [@bufbuild/protoc-gen-connect-es](./protoc-gen-connect-web)

[![npm](https://img.shields.io/npm/v/@protobuf-ts/plugin?style=flat-square)](https://www.npmjs.com/package/@protobuf-ts/plugin)

The code generator plugin that generates a ServiceType from your protocol buffers 
service definition.

<details>
 <summary>See what it generates</summary>

```ts
/**
 * @generated from service connect.ping.v1test.PingService
 */
export const PingService = {
    typeName: "connect.ping.v1test.PingService",
    methods: {
        /**
         * Ping sends a ping to the server to determine if it's reachable.
         *
         * @generated from rpc connect.ping.v1test.PingService.Ping
         */
        ping: {
            name: "Ping",
            I: PingRequest,
            O: PingResponse,
            kind: MethodKind.Unary,
        },
        /**
         * CumSum determines the cumulative sum of all the numbers sent on the stream.
         *
         * @generated from rpc connect.ping.v1test.PingService.CumSum
         */
        cumSum: {
            name: "CumSum",
            I: CumSumRequest,
            O: CumSumResponse,
            kind: MethodKind.BiDiStreaming,
        },
    }
} as const;
```
</details>


### [@bufbuild/connect-web](./connect-web)

[![npm](https://img.shields.io/npm/v/@protobuf-ts/plugin?style=flat-square)](https://www.npmjs.com/package/@protobuf-ts/plugin)

Lets you create clients from the generated ServiceType with `makePromiseClient()` or
`makeCallbackClient()`. Supports all recent web browsers and gRPC-web. Head to
[the client tutorial](TODO) to learn more.


### [@bufbuild/connect-rx](./connect-rx)

[![npm](https://img.shields.io/npm/v/@protobuf-ts/plugin?style=flat-square)](https://www.npmjs.com/package/@protobuf-ts/plugin)

Lets you create RxJS clients for your Angular or React with `makeRxClient()`.  
Browse [our examples](TODO) to learn more.


### [@bufbuild/connect-express](./protoc-gen-connect-express)

[![npm](https://img.shields.io/npm/v/@protobuf-ts/plugin?style=flat-square)](https://www.npmjs.com/package/@protobuf-ts/plugin)

Lets you create a router for [express](https://www.npmjs.com/package/express) with 
`makeExpressRouter()`. Head to [the server tutorial](TODO) to learn more.



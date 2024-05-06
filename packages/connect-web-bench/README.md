# Code size comparison

This is a simple code size comparison between Connect-Web and gRPC-web.

We are generating code for the module [buf.build/connectrpc/eliza](https://buf.build/connectrpc/eliza)
once with `protoc-gen-grpc-web`, once with `protoc-gen-connect-es`.
Then we bundle a client for the service `connectrpc.eliza.v1.ElizaService`
with [esbuild](https://esbuild.github.io/), minify the bundle, and compress
it like a web server would usually do.

| code generator | bundle size        | minified               | compressed           |
|----------------|-------------------:|-----------------------:|---------------------:|
| connect        | 124,827 b | 54,757 b | 14,748 b |
| grpc-web       | 415,212 b    | 300,936 b    | 53,420 b |

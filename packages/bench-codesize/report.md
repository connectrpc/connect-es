# Code size comparison

This is a simple code size comparison between Connect-Web and gRPC-web.

We are generating code for the module [buf.build/bufbuild/buf](https://buf.build/bufbuild/buf)
once with `protoc-gen-grpc-web`, once with `protoc-gen-connect-web`. Then we bundle a client 
for the service `buf.alpha.registry.v1alpha1.PluginService` with [esbuild](https://esbuild.github.io/),
minify the bundle, and compress it like a web server would usually do.

| code generator                         | bundle size        | minified               | gzip               |
|----------------------------------------|-------------------:|-----------------------:|-------------------:|
| [connect-web](src/entry-connectweb.ts) | 269,096 b | 142,437 b | 25,371 b |
| [grpc-web](src/entry-grpcweb.ts)       | 1,019,177 b    | 724,458 b    | 90,848 b    |

# Code size comparison

This is a simple code size comparison between Connect-Web and gRPC-web.

We are generating code for the module [buf.build/bufbuild/buf](https://buf.build/bufbuild/buf)
once with `protoc-gen-grpc-web`, once with `protoc-gen-connect-web`. Then we bundle Then we bundle [a client](./src) 
for the service `buf.alpha.registry.v1alpha1.PluginService` with [esbuild](https://esbuild.github.io/),
minify the bundle, and compress it like a web server would usually do.

| code generator | bundle size        | minified               | compressed           |
|----------------|-------------------:|-----------------------:|---------------------:|
| connect-web    | 86,080 b | 39,976 b | 11,013 b |
| grpc-web       | 393,982 b    | 283,904 b    | 51,879 b |

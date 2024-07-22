# Code size comparison

This is a simple code size comparison between Connect-ES and [gRPC-web](https://github.com/grpc/grpc-web).

We are generating code for the module [buf.build/bufbuild/registry](https://buf.build/bufbuild/registry)
once with gRPC-web, once with Connect-ES. Then we bundle a client calling an RPC
with [esbuild](https://esbuild.github.io/), minify the bundle, and compress it like a web server would
usually do. We repeat this for an increasing number of RPCs.

![chart](./chart.svg)

<details><summary>Tabular data</summary>

<!-- TABLE-START -->

| code generator | RPCs | bundle size |  minified | compressed |
| -------------- | ---: | ----------: | --------: | ---------: |
| Connect-ES     |    1 |   152,637 b |  66,472 b |   16,369 b |
| Connect-ES     |    4 |   168,079 b |  72,412 b |   16,863 b |
| Connect-ES     |    8 |   193,392 b |  82,136 b |   17,475 b |
| Connect-ES     |   16 |   227,031 b |  96,402 b |   18,225 b |
| gRPC-Web       |    1 |   876,563 b | 548,495 b |   52,300 b |
| gRPC-Web       |    4 |   928,964 b | 580,477 b |   54,673 b |
| gRPC-Web       |    8 | 1,004,833 b | 628,223 b |   57,118 b |
| gRPC-Web       |   16 | 1,124,155 b | 701,232 b |   61,248 b |

<!-- TABLE-END -->

</details>

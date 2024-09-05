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
| Connect-ES     |    1 |   152,762 b |  66,522 b |   16,383 b |
| Connect-ES     |    4 |   168,204 b |  72,461 b |   16,895 b |
| Connect-ES     |    8 |   193,517 b |  82,184 b |   17,500 b |
| Connect-ES     |   16 |   227,156 b |  96,450 b |   18,264 b |
| gRPC-Web       |    1 |   876,563 b | 548,495 b |   52,300 b |
| gRPC-Web       |    4 |   928,964 b | 580,477 b |   54,673 b |
| gRPC-Web       |    8 | 1,004,833 b | 628,223 b |   57,118 b |
| gRPC-Web       |   16 | 1,124,155 b | 701,232 b |   61,248 b |

<!-- TABLE-END -->

</details>

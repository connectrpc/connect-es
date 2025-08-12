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
| Connect-ES     |    1 |   284,091 b | 180,106 b |   36,503 b |
| Connect-ES     |    4 |   288,343 b | 183,208 b |   37,219 b |
| Connect-ES     |    8 |   293,206 b | 187,639 b |   38,212 b |
| Connect-ES     |   16 |   302,334 b | 195,266 b |   39,666 b |
| gRPC-Web       |    1 |   876,563 b | 548,495 b |   52,300 b |
| gRPC-Web       |    4 |   928,964 b | 580,477 b |   54,673 b |
| gRPC-Web       |    8 | 1,004,833 b | 628,223 b |   57,118 b |
| gRPC-Web       |   16 | 1,124,155 b | 701,232 b |   61,248 b |

<!-- TABLE-END -->

</details>

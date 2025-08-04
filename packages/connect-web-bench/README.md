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
| Connect-ES     |    1 |   284,072 b | 180,102 b |   36,452 b |
| Connect-ES     |    4 |   288,324 b | 183,204 b |   37,264 b |
| Connect-ES     |    8 |   293,187 b | 187,635 b |   38,195 b |
| Connect-ES     |   16 |   302,315 b | 195,262 b |   39,723 b |
| gRPC-Web       |    1 |   876,563 b | 548,495 b |   52,300 b |
| gRPC-Web       |    4 |   928,964 b | 580,477 b |   54,673 b |
| gRPC-Web       |    8 | 1,004,833 b | 628,223 b |   57,118 b |
| gRPC-Web       |   16 | 1,124,155 b | 701,232 b |   61,248 b |

<!-- TABLE-END -->

</details>

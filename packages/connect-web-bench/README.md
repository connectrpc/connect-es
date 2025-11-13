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
| Connect-ES     |    1 |   285,007 b | 180,536 b |   36,523 b |
| Connect-ES     |    4 |   289,259 b | 183,638 b |   37,365 b |
| Connect-ES     |    8 |   294,122 b | 188,069 b |   38,271 b |
| Connect-ES     |   16 |   303,250 b | 195,696 b |   39,724 b |
| gRPC-Web       |    1 | 1,077,987 b | 709,778 b |   70,344 b |
| gRPC-Web       |    4 | 1,130,547 b | 741,715 b |   72,837 b |
| gRPC-Web       |    8 | 1,206,618 b | 789,425 b |   75,176 b |
| gRPC-Web       |   16 | 1,326,317 b | 862,372 b |   79,319 b |

<!-- TABLE-END -->

</details>

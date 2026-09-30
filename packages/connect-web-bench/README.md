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
| Connect-ES     |    1 |   330,521 b | 197,456 b |   40,579 b |
| Connect-ES     |    4 |   334,773 b | 200,559 b |   41,372 b |
| Connect-ES     |    8 |   339,636 b | 204,988 b |   42,237 b |
| Connect-ES     |   16 |   348,764 b | 212,616 b |   43,834 b |
| gRPC-Web       |    1 | 1,080,604 b | 716,717 b |   70,467 b |
| gRPC-Web       |    4 | 1,131,993 b | 748,011 b |   72,862 b |
| gRPC-Web       |    8 | 1,207,404 b | 795,535 b |   75,345 b |
| gRPC-Web       |   16 | 1,326,175 b | 867,961 b |   79,393 b |

<!-- TABLE-END -->

</details>

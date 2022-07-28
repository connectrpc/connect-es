# @bufbuild/protoc-gen-connect-web

The code generator for Connect-Web, a simple library to call remote procedures 
from a browser client. Unlike REST, you get a type-safe client and never have 
to think about serialization again.

Learn more about Connect-Web at [github.com/bufbuild/connect-web](https://github.com/bufbuild/connect-web).

`protoc-gen-connect-web` is a plugin for `protoc` and [`buf`](https://github.com/bufbuild/buf). 
It generates services from your Protocol Buffer schema, and works in tandem with
[@bufbuild/protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es), 
the code generator plugin for all Protocol Buffer base types.


## Installation

### With npm

```shell
npm install @bufbuild/protoc-gen-es @bufbuild/protoc-gen-connect-web
```

This will install the code generator plugins in `node_modules/.bin/protoc-gen-es`
and `node_modules/.bin/protoc-gen-connect-web`.
Note that npm does not add the executable to your `$PATH`. You can do so with:

```shell
PATH=$PATH:$(pwd)/node_modules/.bin
```

Note that `protoc-gen-connect-web` is actually just a simple node script that selects the
correct precompiled binary for your platform. For example, if you are on a 32-bit
linux machine, the optional dependency `@bufbuild/protoc-gen-connect-web-linux-32` is
automatically installed by `npm`, and our node script will run it. Note that this
means you cannot move your `node_modules` directory to a different platform and
run it. We recommend you run `npm ci` in CI or your docker images instead.


### With yarn

```shell
yarn add @bufbuild/protoc-gen-es @bufbuild/protoc-gen-connect-web
```

Note that yarn v2 does not use a `node_modules` directory anymore. To find the path
where yarn stores the executable, run `yarn bin protoc-gen-connect-web` (it is "unplugged"
automatically).

Yarn supports installing dependencies for several platforms at the same time, by
adding the configuration field [`supportedArchitectures`](https://yarnpkg.com/configuration/yarnrc#supportedArchitectures)
in your `.yarnrc.yml`.

You can always confirm successful installation with:
```shell
protoc-gen-es --version
```


## Plugin options

### `target`

This option controls whether the plugin generates JavaScript, TypeScript,
or TypeScript declaration files.

Possible values:
- `target=js` - generates a `_pb.js` file for every `.proto` input file.
- `target=ts` - generates a `_pb.ts` file for every `.proto` input file.
- `target=dts` - generates a `_pb.d.ts` file for every `.proto` input file.

Multiple values can be given by separating them with `+`, for example
`target=js+dts`.

By default, we generate JavaScript and TypeScript declaration files, which
produces the smallest code size. If you prefer to generate TypeScript, use
`target=ts`.



## Example generated code

`eliza.proto`

```protobuf
syntax = "proto3";

package buf.connect.demo.eliza.v1;

// ElizaService provides a way to talk to the ELIZA, which is a port of
// the DOCTOR script for Joseph Weizenbaum's original ELIZA program.
// Created in the mid-1960s at the MIT Artificial Intelligence Laboratory,
// ELIZA demonstrates the superficiality of human-computer communication.
// DOCTOR simulates a psychotherapist, and is commonly found as an Easter
// egg in emacs distributions.
service ElizaService {
  // Say is a unary request demo. This method should allow for a one sentence
  // response given a one sentence request.
  rpc Say(SayRequest) returns (SayResponse) {}
}

// SayRequest describes the sentence said to the ELIZA program.
message SayRequest {
  string sentence = 1;
}

// SayResponse describes the sentence responded by the ELIZA program.
message SayResponse {
  string sentence = 1;
}
```

`eliza_connectweb.ts`
```ts
/**
 * ElizaService provides a way to talk to the ELIZA, which is a port of
 * the DOCTOR script for Joseph Weizenbaum's original ELIZA program.
 * Created in the mid-1960s at the MIT Artificial Intelligence Laboratory,
 * ELIZA demonstrates the superficiality of human-computer communication.
 * DOCTOR simulates a psychotherapist, and is commonly found as an Easter
 * egg in emacs distributions.
 *
 * @generated from service buf.connect.demo.eliza.v1.ElizaService
 */
export const ElizaService = {
  typeName: "buf.connect.demo.eliza.v1.ElizaService",
  methods: {
    /**
     * Say is a unary request demo. This method should allow for a one sentence
     * response given a one sentence request.
     *
     * @generated from rpc buf.connect.demo.eliza.v1.ElizaService.Say
     */
    say: {
      name: "Say",
      I: SayRequest,
      O: SayResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Converse is a bi-directional request demo. This method should allow for
     * many requests and many responses.
     *
     * @generated from rpc buf.connect.demo.eliza.v1.ElizaService.Converse
     */
    converse: {
      name: "Converse",
      I: ConverseRequest,
      O: ConverseResponse,
      kind: MethodKind.BiDiStreaming,
    },
  }
} as const;
```

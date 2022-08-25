# @bufbuild/protoc-gen-connect-web

The code generator for Connect-Web, a simple library to call remote procedures 
from a browser client. Unlike REST, you get a type-safe client and never have 
to think about serialization again.

Learn more about Connect-Web at [github.com/bufbuild/connect-web](https://github.com/bufbuild/connect-web).

## Installation

`protoc-gen-connect-web` is a code generator plugin for Protocol Buffer compilers, 
like [buf](https://github.com/bufbuild/buf) and [protoc](https://github.com/protocolbuffers/protobuf/releases).
It generates clients from your Protocol Buffer schema, and works in tandem with
[@bufbuild/protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es),
the code generator plugin for all Protocol Buffer base types. The code those two 
plugins generate requires the runtime libraries [@bufbuild/connect-web](https://www.npmjs.com/package/@bufbuild/connect-web), 
and [@bufbuild/protobuf](https://www.npmjs.com/package/@bufbuild/protobuf).

To install the plugins and their runtime libraries, run:

```shell
npm install --save-dev @bufbuild/protoc-gen-connect-web @bufbuild/protoc-gen-es
npm install @bufbuild/connect-web @bufbuild/protobuf
```

We use peer dependencies to ensure that code generator and runtime library are
compatible with each other. Note that yarn and pnpm only emit a warning in this case.


## Generating code

### With buf

Add a new configuration file `buf.gen.yaml`:

```yaml
# buf.gen.yaml defines a local generation template.
# For details, see https://docs.buf.build/configuration/v1/buf-gen-yaml
version: v1
plugins:
  # This will invoke protoc-gen-es and write output to src/gen
  - name: es
    out: src/gen
    opt: target=ts
  # This will invoke protoc-gen-connect-web
  - name: connect-web
    out: src/gen
    opt: target=ts
```

Add the following script to your `package.json`:

```json
{
  "name": "your-package",
  "version": "1.0.0",
  "scripts": {
    "generate": "buf generate"
  },
  // ...
}
```

To generate code for all protobuf files within your project, simply run:

```bash
npm run generate
```

Note that `buf` can generate from various [inputs](https://docs.buf.build/reference/inputs), 
not just local protobuf files. For example, `npm run generate buf.build/bufbuild/eliza` 
generates code for the module [bufbuild/eliza](https://buf.build/bufbuild/eliza) on the Buf Schema
Registry.


### With protoc

```bash
PATH=$PATH:$(pwd)/node_modules/.bin \
  protoc -I . \
  --es_out src/gen \
  --os_opt target=ts \
  --connect-web_out src/gen \
  --connect-web_opt target=ts \
  a.proto b.proto c.proto
```

Note that we are adding `node_modules/.bin` to the `$PATH`, so that the protocol 
buffer compiler can find them. This happens automatically with npm scripts.

Since yarn does not use a `node_modules` directory, you need to change the variable
a bit:

```bash
PATH=$(dirname $(yarn bin protoc-gen-es)):$(dirname $(yarn bin protoc-gen-connect-web)):$PATH
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

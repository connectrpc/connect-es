# @bufbuild/protoc-gen-connect-es

The code generator for Connect, a simple library to work with servers and clients
in ECMAScript with the type-safety of TypeScript.  It generates code that is compatible with
browsers and Node.js.

Learn more about Connect at [github.com/bufbuild/connect-es](https://github.com/bufbuild/connect-es).

## Installation

`protoc-gen-connect-es` is a code generator plugin for Protocol Buffer compilers, 
like [buf](https://github.com/bufbuild/buf) and [protoc](https://github.com/protocolbuffers/protobuf/releases).
It generates clients as well as server definitions from your Protocol Buffer schema, and works in tandem with
[@bufbuild/protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es),
the code generator plugin for all Protocol Buffer base types. The code these two 
plugins generate requires the runtime libraries [@bufbuild/connect](https://www.npmjs.com/package/@bufbuild/connect), 
and [@bufbuild/protobuf](https://www.npmjs.com/package/@bufbuild/protobuf).

To install `buf`, the plugins and their runtime libraries, run:

```shell
npm install --save-dev @bufbuild/buf @bufbuild/protoc-gen-es @bufbuild/protoc-gen-connect-es
npm install @bufbuild/connect @bufbuild/protobuf
```

If you want to call Connect or gRPC-web services from a web browsers, make sure to install 
[@bufbuild/connect-web](https://www.npmjs.com/package/@bufbuild/connect-web). If you want servers too, 
install [@bufbuild/connect-node](https://www.npmjs.com/package/@bufbuild/connect-node),
[@bufbuild/connect-fastify](https://www.npmjs.com/package/@bufbuild/connect-fastify), or
[@bufbuild/connect-express](https://www.npmjs.com/package/@bufbuild/connect-express)

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
  # This will invoke protoc-gen-connect-es
  - name: connect-es
    out: src/gen
    opt: target=ts
```

To generate code for all protobuf files within your project, simply run:

```bash
npx buf generate
```

Note that `buf` can generate from various [inputs](https://docs.buf.build/reference/inputs), 
not just local protobuf files. For example, `npx buf generate buf.build/bufbuild/eliza` 
generates code for the module [bufbuild/eliza](https://buf.build/bufbuild/eliza) on the Buf Schema
Registry.


### With protoc

```bash
PATH=$PATH:$(pwd)/node_modules/.bin \
  protoc -I . \
  --es_out src/gen \
  --es_opt target=ts \
  --connect-es_out src/gen \
  --connect-es_opt target=ts \
  a.proto b.proto c.proto
```

Note that we are adding `node_modules/.bin` to the `$PATH`, so that the protocol 
buffer compiler can find them. This happens automatically with npm scripts.

Since yarn v2 and above does not use a `node_modules` directory, you need to 
change the variable a bit:

```bash
PATH=$(dirname $(yarn bin protoc-gen-es)):$(dirname $(yarn bin protoc-gen-connect-es)):$PATH
```


## Plugin options

### `target`

This option controls whether the plugin generates JavaScript, TypeScript,
or TypeScript declaration files.

Possible values:
- `target=js` - generates a `_connect.js` file for every `.proto` input file.
- `target=ts` - generates a `_connect.ts` file for every `.proto` input file.
- `target=dts` - generates a `_connect.d.ts` file for every `.proto` input file.

Multiple values can be given by separating them with `+`, for example
`target=js+dts`.

By default, we generate JavaScript and TypeScript declaration files, which
produces the smallest code size and is the most compatible with various 
bundler configurations. If you prefer to generate TypeScript, use `target=ts`.

### `import_extension=.js`

By default, [protoc-gen-connect-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-connect-es)
(and all other plugins based on [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin))
uses a `.js` file extensions in import paths, even in TypeScript files.

This is unintuitive, but necessary for [ECMAScript modules in Node.js](https://www.typescriptlang.org/docs/handbook/esm-node.html).
Unfortunately, not all bundlers and tools have caught up yet, and Deno 
requires `.ts`. With this plugin option, you can replace `.js` extensions 
in import paths with the given value. For example, set

- `import_extension=none` to remove the `.js` extension
- `import_extension=.ts` to replace the `.js` extension with `.ts`


### `keep_empty_files=true`

By default, [protoc-gen-connect-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-connect-es)
(and all other plugins based on [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin))
omit empty files from the plugin output. This option disables pruning of
empty files, to allow for smooth interoperation with Bazel and similar
tooling that requires all output files to be declared ahead of time.
Unless you use Bazel, it is very unlikely that you need this option.


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

`eliza_connect.ts`
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
  }
} as const;
```

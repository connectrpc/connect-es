# @connectrpc/protoc-gen-connect-es

The code generator for Connect, a simple library to work with servers and clients
in ECMAScript with the type-safety of TypeScript. It generates code that is compatible with
browsers and Node.js.

Learn more about Connect at [github.com/connectrpc/connect-es](https://github.com/connectrpc/connect-es).

## Installation

`protoc-gen-connect-es` is a code generator plugin for Protocol Buffer compilers,
like [buf](https://github.com/bufbuild/buf) and [protoc](https://github.com/protocolbuffers/protobuf/releases).
It generates clients as well as server definitions from your Protocol Buffer schema, and works in tandem with
[@bufbuild/protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es),
the code generator plugin for all Protocol Buffer base types. The code these two
plugins generate requires the runtime libraries [@connectrpc/connect](https://www.npmjs.com/package/@connectrpc/connect),
and [@bufbuild/protobuf](https://www.npmjs.com/package/@bufbuild/protobuf).

To install `buf`, the plugins and their runtime libraries, run:

```shell
npm install --save-dev @bufbuild/buf @bufbuild/protoc-gen-es @connectrpc/protoc-gen-connect-es
npm install @connectrpc/connect @bufbuild/protobuf
```

If you want to call Connect or gRPC-web services from a web browsers, make sure to install
[@connectrpc/connect-web](https://www.npmjs.com/package/@connectrpc/connect-web). If you want servers too,
install [@connectrpc/connect-node](https://www.npmjs.com/package/@connectrpc/connect-node),
[@connectrpc/connect-fastify](https://www.npmjs.com/package/@connectrpc/connect-fastify), or
[@connectrpc/connect-express](https://www.npmjs.com/package/@connectrpc/connect-express)

We use peer dependencies to ensure that code generator and runtime library are
compatible with each other. Note that npm installs them automatically, but yarn
and pnpm do not.

## Generating code

### With buf

Add a new configuration file `buf.gen.yaml`:

```yaml
# buf.gen.yaml defines a local generation template.
# For details, see https://docs.buf.build/configuration/v1/buf-gen-yaml
version: v1
plugins:
  # This will invoke protoc-gen-es and write output to src/gen
  - plugin: es
    out: src/gen
    opt: target=ts
  # This will invoke protoc-gen-connect-es
  - plugin: connect-es
    out: src/gen
    opt:
      # Add more plugin options here
      - target=ts
```

To generate code for all protobuf files within your project, simply run:

```bash
npx buf generate
```

Note that `buf` can generate from various [inputs](https://docs.buf.build/reference/inputs),
not just local protobuf files. For example, `npx buf generate buf.build/connectrpc/eliza`
generates code for the module [connectrpc/eliza](https://buf.build/connectrpc/eliza) on the Buf Schema
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

By default, [protoc-gen-connect-es](https://www.npmjs.com/package/@connectrpc/protoc-gen-connect-es)
(and all other plugins based on [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin))
uses a `.js` file extensions in import paths, even in TypeScript files.

This is unintuitive, but necessary for [ECMAScript modules in Node.js](https://www.typescriptlang.org/docs/handbook/esm-node.html).
Unfortunately, not all bundlers and tools have caught up yet, and Deno
requires `.ts`. With this plugin option, you can replace `.js` extensions
in import paths with the given value. For example, set

- `import_extension=none` to remove the `.js` extension
- `import_extension=.ts` to replace the `.js` extension with `.ts`

### `js_import_style`

By default, [protoc-gen-connect-es](https://www.npmjs.com/package/@connectrpc/protoc-gen-connect-es)
(and all other plugins based on [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin))
generate ECMAScript `import` and `export` statements. For use cases where
CommonJS is difficult to avoid, this option can be used to generate CommonJS
`require()` calls.

Possible values:

- `js_import_style=module` generate ECMAScript `import` / `export` statements -
  the default behavior.
- `js_import_style=legacy_commonjs` generate CommonJS `require()` calls.

### `keep_empty_files=true`

By default, [protoc-gen-connect-es](https://www.npmjs.com/package/@connectrpc/protoc-gen-connect-es)
(and all other plugins based on [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin))
omit empty files from the plugin output. This option disables pruning of
empty files, to allow for smooth interoperation with Bazel and similar
tooling that requires all output files to be declared ahead of time.
Unless you use Bazel, it is very unlikely that you need this option.

### `ts_nocheck=false`

By default, [protoc-gen-connect-es](https://www.npmjs.com/package/@connectrpc/protoc-gen-connect-es)
(and all other plugins based on [@bufbuild/protoplugin](https://www.npmjs.com/package/@bufbuild/protoplugin))
generate an annotation at the top of each file: `// @ts-nocheck`.

We generate the annotation to support a wide range of compiler configurations
and future changes to the language. But there can be situations where the
annotation shadows an underlying problem, for example an unresolvable import.
To remove the annotation and to enable type checks, set the plugin option
`ts_nocheck=false`.

## Example generated code

`eliza.proto`

```protobuf
syntax = "proto3";

package connectrpc.eliza.v1;

// ElizaService provides a way to talk to Eliza, a port of the DOCTOR script
// for Joseph Weizenbaum's original ELIZA program. Created in the mid-1960s at
// the MIT Artificial Intelligence Laboratory, ELIZA demonstrates the
// superficiality of human-computer communication. DOCTOR simulates a
// psychotherapist, and is commonly found as an Easter egg in emacs
// distributions.
service ElizaService {
  // Say is a unary RPC. Eliza responds to the prompt with a single sentence.
  rpc Say(SayRequest) returns (SayResponse) {}
}

// SayRequest is a single-sentence request.
message SayRequest {
  string sentence = 1;
}

// SayRequest is a single-sentence response.
message SayResponse {
  string sentence = 1;
}
```

`eliza_connect.ts`

```ts
/**
 * ElizaService provides a way to talk to Eliza, a port of the DOCTOR script
 * for Joseph Weizenbaum's original ELIZA program. Created in the mid-1960s at
 * the MIT Artificial Intelligence Laboratory, ELIZA demonstrates the
 * superficiality of human-computer communication. DOCTOR simulates a
 * psychotherapist, and is commonly found as an Easter egg in emacs
 * distributions.
 *
 * @generated from service connectrpc.eliza.v1.ElizaService
 */
export const ElizaService = {
  typeName: "connectrpc.eliza.v1.ElizaService",
  methods: {
    /**
     * Say is a unary RPC. Eliza responds to the prompt with a single sentence.
     *
     * @generated from rpc connectrpc.eliza.v1.ElizaService.Say
     */
    say: {
      name: "Say",
      I: SayRequest,
      O: SayResponse,
      kind: MethodKind.Unary,
    },
  },
} as const;
```

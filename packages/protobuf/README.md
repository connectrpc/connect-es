# @bufbuild/protobuf

A complete implementation of protocol buffers in TypeScript, 
suitable for web browsers and Node.js.

### Features
- small code size
- no dependencies
- implements all proto3 features, including the canonical JSON format
- implements all proto2 features, except for extensions and the text format
- passes the protocol buffers conformance tests
- provides all well-known types with their specialized JSON representation
- uses and algebraic data type to represent `oneof` groups
- unboxes fields using google/protobuf/wrappers.proto to optional primitives
- represents 64-bit integers with BigInt, and falls back to `string` if unavailable
- uses standard TypeScript enums for protocol buffer `enum`
- provides `equals()` and `clone()` on each message for convenience
- fields are plain properties, and support the object spread operator
- messages can be constructed from partial plain objects
- can dynamically create types at run time, for example from a set of `google.protobuf.FileDescriptorProto`
- provides field information to traverse types programmatically


### Copyright

The [code to encode and decode varint](./src/private/goog-varint.ts) is Copyright 2008 Google Inc., licensed under BSD-3-Clause.

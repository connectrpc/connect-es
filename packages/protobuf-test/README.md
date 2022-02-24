# Tests

This packages implements tests for @bufbuild/protobuf. 

They use the protocol buffers conformance test suite, and a collection of 
handwritten Jest tests.

We also generate code for many of the unit test proto files that are part of 
github.com/protocolbuffers/protobuf. They cover many edge cases for both code 
generation and serialization.

Most tests are run twice, once with the generated code, once with a type that 
is created at run time from a file descriptor set.

The Jest tests run on code transpiled to CommonJS, while the conformance tests 
run on code transpiled to ECMAScript modules, so we test both variants to some 
degree.
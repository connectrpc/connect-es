import { Empty, MethodKind, ServiceType } from '@bufbuild/protobuf';

export const FooService = {
  typeName: 'foo.v1.FooService',
  methods: {
    foo: {
      name: 'Foo',
      kind: MethodKind.Unary,
      I: Empty,
      O: Empty,
    },
    bar: {
      name: 'Bar',
      kind: MethodKind.ServerStreaming,
      I: Empty,
      O: Empty,
    },
  },
} as const;

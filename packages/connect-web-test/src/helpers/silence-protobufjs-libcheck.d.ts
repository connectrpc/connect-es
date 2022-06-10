/**
 * We want to run the TypeScript compiler's lib checks, because it gives us
 * confidence that our package @bufbuild/connect-web is set up correctly.
 *
 * But @grpc/grpc-js imports the package "protobufjs" (and through it, the
 * package "long"). We don't want to install them to satisfy lib checks, so
 * we declare them here. We also have a dependency on @types/long for this
 * reason.
 */

/* eslint-disable */
declare module "protobufjs" {
  export type Reader = any;
  export type IConversionOptions = any;
  export type INamespace = any;
  export type Message<T> = any;
  export type IParseOptions = any;
}
declare module "protobufjs/ext/descriptor" {
  export type IDescriptorProto = any;
  export type IEnumDescriptorProto = any;
  export const FileDescriptorSet: any;
  export type IFileDescriptorSet = any;
}

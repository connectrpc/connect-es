// Copyright 2021-2025 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// @generated by protoc-gen-es v2.6.0 with parameter "target=ts,import_extension=.js"
// @generated from file connectrpc/conformance/v1/config.proto (package connectrpc.conformance.v1, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file connectrpc/conformance/v1/config.proto.
 */
export const file_connectrpc_conformance_v1_config: GenFile = /*@__PURE__*/
  fileDesc("CiZjb25uZWN0cnBjL2NvbmZvcm1hbmNlL3YxL2NvbmZpZy5wcm90bxIZY29ubmVjdHJwYy5jb25mb3JtYW5jZS52MSK7AQoGQ29uZmlnEjUKCGZlYXR1cmVzGAEgASgLMiMuY29ubmVjdHJwYy5jb25mb3JtYW5jZS52MS5GZWF0dXJlcxI8Cg1pbmNsdWRlX2Nhc2VzGAIgAygLMiUuY29ubmVjdHJwYy5jb25mb3JtYW5jZS52MS5Db25maWdDYXNlEjwKDWV4Y2x1ZGVfY2FzZXMYAyADKAsyJS5jb25uZWN0cnBjLmNvbmZvcm1hbmNlLnYxLkNvbmZpZ0Nhc2Ui5QUKCEZlYXR1cmVzEjgKCHZlcnNpb25zGAEgAygOMiYuY29ubmVjdHJwYy5jb25mb3JtYW5jZS52MS5IVFRQVmVyc2lvbhI2Cglwcm90b2NvbHMYAiADKA4yIy5jb25uZWN0cnBjLmNvbmZvcm1hbmNlLnYxLlByb3RvY29sEjAKBmNvZGVjcxgDIAMoDjIgLmNvbm5lY3RycGMuY29uZm9ybWFuY2UudjEuQ29kZWMSPAoMY29tcHJlc3Npb25zGAQgAygOMiYuY29ubmVjdHJwYy5jb25mb3JtYW5jZS52MS5Db21wcmVzc2lvbhI7CgxzdHJlYW1fdHlwZXMYBSADKA4yJS5jb25uZWN0cnBjLmNvbmZvcm1hbmNlLnYxLlN0cmVhbVR5cGUSGQoMc3VwcG9ydHNfaDJjGAYgASgISACIAQESGQoMc3VwcG9ydHNfdGxzGAcgASgISAGIAQESJgoZc3VwcG9ydHNfdGxzX2NsaWVudF9jZXJ0cxgIIAEoCEgCiAEBEh4KEXN1cHBvcnRzX3RyYWlsZXJzGAkgASgISAOIAQESMQokc3VwcG9ydHNfaGFsZl9kdXBsZXhfYmlkaV9vdmVyX2h0dHAxGAogASgISASIAQESIQoUc3VwcG9ydHNfY29ubmVjdF9nZXQYCyABKAhIBYgBARIrCh5zdXBwb3J0c19tZXNzYWdlX3JlY2VpdmVfbGltaXQYDCABKAhIBogBAUIPCg1fc3VwcG9ydHNfaDJjQg8KDV9zdXBwb3J0c190bHNCHAoaX3N1cHBvcnRzX3Rsc19jbGllbnRfY2VydHNCFAoSX3N1cHBvcnRzX3RyYWlsZXJzQicKJV9zdXBwb3J0c19oYWxmX2R1cGxleF9iaWRpX292ZXJfaHR0cDFCFwoVX3N1cHBvcnRzX2Nvbm5lY3RfZ2V0QiEKH19zdXBwb3J0c19tZXNzYWdlX3JlY2VpdmVfbGltaXQiygMKCkNvbmZpZ0Nhc2USNwoHdmVyc2lvbhgBIAEoDjImLmNvbm5lY3RycGMuY29uZm9ybWFuY2UudjEuSFRUUFZlcnNpb24SNQoIcHJvdG9jb2wYAiABKA4yIy5jb25uZWN0cnBjLmNvbmZvcm1hbmNlLnYxLlByb3RvY29sEi8KBWNvZGVjGAMgASgOMiAuY29ubmVjdHJwYy5jb25mb3JtYW5jZS52MS5Db2RlYxI7Cgtjb21wcmVzc2lvbhgEIAEoDjImLmNvbm5lY3RycGMuY29uZm9ybWFuY2UudjEuQ29tcHJlc3Npb24SOgoLc3RyZWFtX3R5cGUYBSABKA4yJS5jb25uZWN0cnBjLmNvbmZvcm1hbmNlLnYxLlN0cmVhbVR5cGUSFAoHdXNlX3RscxgGIAEoCEgAiAEBEiEKFHVzZV90bHNfY2xpZW50X2NlcnRzGAcgASgISAGIAQESJgoZdXNlX21lc3NhZ2VfcmVjZWl2ZV9saW1pdBgIIAEoCEgCiAEBQgoKCF91c2VfdGxzQhcKFV91c2VfdGxzX2NsaWVudF9jZXJ0c0IcChpfdXNlX21lc3NhZ2VfcmVjZWl2ZV9saW1pdCIlCghUTFNDcmVkcxIMCgRjZXJ0GAEgASgMEgsKA2tleRgCIAEoDCpnCgtIVFRQVmVyc2lvbhIcChhIVFRQX1ZFUlNJT05fVU5TUEVDSUZJRUQQABISCg5IVFRQX1ZFUlNJT05fMRABEhIKDkhUVFBfVkVSU0lPTl8yEAISEgoOSFRUUF9WRVJTSU9OXzMQAypkCghQcm90b2NvbBIYChRQUk9UT0NPTF9VTlNQRUNJRklFRBAAEhQKEFBST1RPQ09MX0NPTk5FQ1QQARIRCg1QUk9UT0NPTF9HUlBDEAISFQoRUFJPVE9DT0xfR1JQQ19XRUIQAypTCgVDb2RlYxIVChFDT0RFQ19VTlNQRUNJRklFRBAAEg8KC0NPREVDX1BST1RPEAESDgoKQ09ERUNfSlNPThACEhIKCkNPREVDX1RFWFQQAxoCCAEqtQEKC0NvbXByZXNzaW9uEhsKF0NPTVBSRVNTSU9OX1VOU1BFQ0lGSUVEEAASGAoUQ09NUFJFU1NJT05fSURFTlRJVFkQARIUChBDT01QUkVTU0lPTl9HWklQEAISEgoOQ09NUFJFU1NJT05fQlIQAxIUChBDT01QUkVTU0lPTl9aU1REEAQSFwoTQ09NUFJFU1NJT05fREVGTEFURRAFEhYKEkNPTVBSRVNTSU9OX1NOQVBQWRAGKtABCgpTdHJlYW1UeXBlEhsKF1NUUkVBTV9UWVBFX1VOU1BFQ0lGSUVEEAASFQoRU1RSRUFNX1RZUEVfVU5BUlkQARIdChlTVFJFQU1fVFlQRV9DTElFTlRfU1RSRUFNEAISHQoZU1RSRUFNX1RZUEVfU0VSVkVSX1NUUkVBTRADEicKI1NUUkVBTV9UWVBFX0hBTEZfRFVQTEVYX0JJRElfU1RSRUFNEAQSJwojU1RSRUFNX1RZUEVfRlVMTF9EVVBMRVhfQklESV9TVFJFQU0QBSqUAwoEQ29kZRIUChBDT0RFX1VOU1BFQ0lGSUVEEAASEQoNQ09ERV9DQU5DRUxFRBABEhAKDENPREVfVU5LTk9XThACEhkKFUNPREVfSU5WQUxJRF9BUkdVTUVOVBADEhoKFkNPREVfREVBRExJTkVfRVhDRUVERUQQBBISCg5DT0RFX05PVF9GT1VORBAFEhcKE0NPREVfQUxSRUFEWV9FWElTVFMQBhIaChZDT0RFX1BFUk1JU1NJT05fREVOSUVEEAcSGwoXQ09ERV9SRVNPVVJDRV9FWEhBVVNURUQQCBIcChhDT0RFX0ZBSUxFRF9QUkVDT05ESVRJT04QCRIQCgxDT0RFX0FCT1JURUQQChIVChFDT0RFX09VVF9PRl9SQU5HRRALEhYKEkNPREVfVU5JTVBMRU1FTlRFRBAMEhEKDUNPREVfSU5URVJOQUwQDRIUChBDT0RFX1VOQVZBSUxBQkxFEA4SEgoOQ09ERV9EQVRBX0xPU1MQDxIYChRDT0RFX1VOQVVUSEVOVElDQVRFRBAQYgZwcm90bzM");

/**
 * Config defines the configuration for running conformance tests.
 * This enumerates all of the "flavors" of the test suite to run.
 *
 * @generated from message connectrpc.conformance.v1.Config
 */
export type Config = Message<"connectrpc.conformance.v1.Config"> & {
  /**
   * The features supported by the client or server under test.
   * This is used to filter the set of test cases that are run.
   * If absent, an empty message is used. See Features for more
   * on how empty/absent fields are interpreted.
   *
   * @generated from field: connectrpc.conformance.v1.Features features = 1;
   */
  features?: Features;

  /**
   * This can indicate additional permutations that are supported
   * that might otherwise be excluded based on the above features.
   *
   * @generated from field: repeated connectrpc.conformance.v1.ConfigCase include_cases = 2;
   */
  includeCases: ConfigCase[];

  /**
   * This can indicates permutations that are not supported even
   * though their support might be implied by the above features.
   *
   * @generated from field: repeated connectrpc.conformance.v1.ConfigCase exclude_cases = 3;
   */
  excludeCases: ConfigCase[];
};

/**
 * Describes the message connectrpc.conformance.v1.Config.
 * Use `create(ConfigSchema)` to create a new message.
 */
export const ConfigSchema: GenMessage<Config> = /*@__PURE__*/
  messageDesc(file_connectrpc_conformance_v1_config, 0);

/**
 * Features define the feature set that a client or server supports. They are
 * used to determine the server configurations and test cases that
 * will be run. They are defined in YAML files and are specified as part of the
 * --conf flag to the test runner.
 *
 * TODO: we could probably model some of the constraints on what are valid vs.
 *       invalid (i.e. conflicting/impossible) features using protovalidate rules
 *
 * @generated from message connectrpc.conformance.v1.Features
 */
export type Features = Message<"connectrpc.conformance.v1.Features"> & {
  /**
   * Supported HTTP versions.
   * If empty, HTTP 1.1 and HTTP/2 are assumed.
   *
   * @generated from field: repeated connectrpc.conformance.v1.HTTPVersion versions = 1;
   */
  versions: HTTPVersion[];

  /**
   * Supported protocols.
   * If empty, all three are assumed: Connect, gRPC, and gRPC-Web.
   *
   * @generated from field: repeated connectrpc.conformance.v1.Protocol protocols = 2;
   */
  protocols: Protocol[];

  /**
   * Supported codecs.
   * If empty, "proto" and "json" are assumed.
   *
   * @generated from field: repeated connectrpc.conformance.v1.Codec codecs = 3;
   */
  codecs: Codec[];

  /**
   * Supported compression algorithms.
   * If empty, "identity" and "gzip" are assumed.
   *
   * @generated from field: repeated connectrpc.conformance.v1.Compression compressions = 4;
   */
  compressions: Compression[];

  /**
   * Supported stream types.
   * If empty, all stream types are assumed. This is usually for
   * clients, since some client environments may not be able to
   * support certain kinds of streaming operations, especially
   * bidirectional streams.
   *
   * @generated from field: repeated connectrpc.conformance.v1.StreamType stream_types = 5;
   */
  streamTypes: StreamType[];

  /**
   * Whether H2C (unencrypted, non-TLS HTTP/2 over cleartext) is supported.
   * If absent, true is assumed.
   *
   * @generated from field: optional bool supports_h2c = 6;
   */
  supportsH2c?: boolean;

  /**
   * Whether TLS is supported.
   * If absent, true is assumed.
   *
   * @generated from field: optional bool supports_tls = 7;
   */
  supportsTls?: boolean;

  /**
   * Whether the client supports TLS certificates.
   * If absent, false is assumed. This should not be set if
   * supports_tls is false.
   *
   * @generated from field: optional bool supports_tls_client_certs = 8;
   */
  supportsTlsClientCerts?: boolean;

  /**
   * Whether trailers are supported.
   * If absent, true is assumed. If false, implies that gRPC protocol is not allowed.
   *
   * @generated from field: optional bool supports_trailers = 9;
   */
  supportsTrailers?: boolean;

  /**
   * Whether half duplex bidi streams are supported over HTTP/1.1.
   * If absent, false is assumed.
   *
   * @generated from field: optional bool supports_half_duplex_bidi_over_http1 = 10;
   */
  supportsHalfDuplexBidiOverHttp1?: boolean;

  /**
   * Whether Connect via GET is supported.
   * If absent, true is assumed.
   *
   * @generated from field: optional bool supports_connect_get = 11;
   */
  supportsConnectGet?: boolean;

  /**
   * Whether a message receive limit is supported.
   * If absent, true is assumed.
   *
   * @generated from field: optional bool supports_message_receive_limit = 12;
   */
  supportsMessageReceiveLimit?: boolean;
};

/**
 * Describes the message connectrpc.conformance.v1.Features.
 * Use `create(FeaturesSchema)` to create a new message.
 */
export const FeaturesSchema: GenMessage<Features> = /*@__PURE__*/
  messageDesc(file_connectrpc_conformance_v1_config, 1);

/**
 * ConfigCase represents a single resolved configuration case. When tests are
 * run, the Config and the supported features therein are used to compute all
 * of the cases relevant to the implementation under test. These configuration
 * cases are then used to select which test cases are applicable.
 *
 * TODO: we could probably model some of the constraints on what is a valid
 *       vs. invalid config case using protovalidate rules
 *
 * @generated from message connectrpc.conformance.v1.ConfigCase
 */
export type ConfigCase = Message<"connectrpc.conformance.v1.ConfigCase"> & {
  /**
   * If unspecified, indicates cases for all versions.
   *
   * @generated from field: connectrpc.conformance.v1.HTTPVersion version = 1;
   */
  version: HTTPVersion;

  /**
   * If unspecified, indicates cases for all protocols.
   *
   * @generated from field: connectrpc.conformance.v1.Protocol protocol = 2;
   */
  protocol: Protocol;

  /**
   * If unspecified, indicates cases for all codecs.
   *
   * @generated from field: connectrpc.conformance.v1.Codec codec = 3;
   */
  codec: Codec;

  /**
   * If unspecified, indicates cases for all compression algorithms.
   *
   * @generated from field: connectrpc.conformance.v1.Compression compression = 4;
   */
  compression: Compression;

  /**
   * If unspecified, indicates cases for all stream types.
   *
   * @generated from field: connectrpc.conformance.v1.StreamType stream_type = 5;
   */
  streamType: StreamType;

  /**
   * If absent, indicates cases for plaintext (no TLS) but also for
   * TLS if features indicate that TLS is supported.
   *
   * @generated from field: optional bool use_tls = 6;
   */
  useTls?: boolean;

  /**
   * If absent, indicates cases without client certs but also cases
   * that use client certs if features indicate they are supported.
   *
   * @generated from field: optional bool use_tls_client_certs = 7;
   */
  useTlsClientCerts?: boolean;

  /**
   * If absent, indicates cases that do not test message receive
   * limits but also cases that do test message receive limits if
   * features indicate they are supported.
   *
   * @generated from field: optional bool use_message_receive_limit = 8;
   */
  useMessageReceiveLimit?: boolean;
};

/**
 * Describes the message connectrpc.conformance.v1.ConfigCase.
 * Use `create(ConfigCaseSchema)` to create a new message.
 */
export const ConfigCaseSchema: GenMessage<ConfigCase> = /*@__PURE__*/
  messageDesc(file_connectrpc_conformance_v1_config, 2);

/**
 * TLSCreds represents credentials for TLS. It includes both a
 * certificate and corresponding private key. Both are encoded
 * in PEM format.
 *
 * @generated from message connectrpc.conformance.v1.TLSCreds
 */
export type TLSCreds = Message<"connectrpc.conformance.v1.TLSCreds"> & {
  /**
   * @generated from field: bytes cert = 1;
   */
  cert: Uint8Array;

  /**
   * @generated from field: bytes key = 2;
   */
  key: Uint8Array;
};

/**
 * Describes the message connectrpc.conformance.v1.TLSCreds.
 * Use `create(TLSCredsSchema)` to create a new message.
 */
export const TLSCredsSchema: GenMessage<TLSCreds> = /*@__PURE__*/
  messageDesc(file_connectrpc_conformance_v1_config, 3);

/**
 * @generated from enum connectrpc.conformance.v1.HTTPVersion
 */
export enum HTTPVersion {
  /**
   * @generated from enum value: HTTP_VERSION_UNSPECIFIED = 0;
   */
  HTTP_VERSION_UNSPECIFIED = 0,

  /**
   * @generated from enum value: HTTP_VERSION_1 = 1;
   */
  HTTP_VERSION_1 = 1,

  /**
   * @generated from enum value: HTTP_VERSION_2 = 2;
   */
  HTTP_VERSION_2 = 2,

  /**
   * @generated from enum value: HTTP_VERSION_3 = 3;
   */
  HTTP_VERSION_3 = 3,
}

/**
 * Describes the enum connectrpc.conformance.v1.HTTPVersion.
 */
export const HTTPVersionSchema: GenEnum<HTTPVersion> = /*@__PURE__*/
  enumDesc(file_connectrpc_conformance_v1_config, 0);

/**
 * @generated from enum connectrpc.conformance.v1.Protocol
 */
export enum Protocol {
  /**
   * @generated from enum value: PROTOCOL_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: PROTOCOL_CONNECT = 1;
   */
  CONNECT = 1,

  /**
   * @generated from enum value: PROTOCOL_GRPC = 2;
   */
  GRPC = 2,

  /**
   * TODO: Support add'l protocols:
   * PROTOCOL_GRPC_WEB_TEXT = 4;
   * PROTOCOL_REST_TRANSCODING = 5;
   *
   * @generated from enum value: PROTOCOL_GRPC_WEB = 3;
   */
  GRPC_WEB = 3,
}

/**
 * Describes the enum connectrpc.conformance.v1.Protocol.
 */
export const ProtocolSchema: GenEnum<Protocol> = /*@__PURE__*/
  enumDesc(file_connectrpc_conformance_v1_config, 1);

/**
 * @generated from enum connectrpc.conformance.v1.Codec
 */
export enum Codec {
  /**
   * @generated from enum value: CODEC_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: CODEC_PROTO = 1;
   */
  PROTO = 1,

  /**
   * @generated from enum value: CODEC_JSON = 2;
   */
  JSON = 2,

  /**
   * not used; will be ignored
   *
   * @generated from enum value: CODEC_TEXT = 3 [deprecated = true];
   * @deprecated
   */
  TEXT = 3,
}

/**
 * Describes the enum connectrpc.conformance.v1.Codec.
 */
export const CodecSchema: GenEnum<Codec> = /*@__PURE__*/
  enumDesc(file_connectrpc_conformance_v1_config, 2);

/**
 * @generated from enum connectrpc.conformance.v1.Compression
 */
export enum Compression {
  /**
   * @generated from enum value: COMPRESSION_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: COMPRESSION_IDENTITY = 1;
   */
  IDENTITY = 1,

  /**
   * @generated from enum value: COMPRESSION_GZIP = 2;
   */
  GZIP = 2,

  /**
   * @generated from enum value: COMPRESSION_BR = 3;
   */
  BR = 3,

  /**
   * @generated from enum value: COMPRESSION_ZSTD = 4;
   */
  ZSTD = 4,

  /**
   * @generated from enum value: COMPRESSION_DEFLATE = 5;
   */
  DEFLATE = 5,

  /**
   * @generated from enum value: COMPRESSION_SNAPPY = 6;
   */
  SNAPPY = 6,
}

/**
 * Describes the enum connectrpc.conformance.v1.Compression.
 */
export const CompressionSchema: GenEnum<Compression> = /*@__PURE__*/
  enumDesc(file_connectrpc_conformance_v1_config, 3);

/**
 * @generated from enum connectrpc.conformance.v1.StreamType
 */
export enum StreamType {
  /**
   * @generated from enum value: STREAM_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: STREAM_TYPE_UNARY = 1;
   */
  UNARY = 1,

  /**
   * @generated from enum value: STREAM_TYPE_CLIENT_STREAM = 2;
   */
  CLIENT_STREAM = 2,

  /**
   * @generated from enum value: STREAM_TYPE_SERVER_STREAM = 3;
   */
  SERVER_STREAM = 3,

  /**
   * @generated from enum value: STREAM_TYPE_HALF_DUPLEX_BIDI_STREAM = 4;
   */
  HALF_DUPLEX_BIDI_STREAM = 4,

  /**
   * @generated from enum value: STREAM_TYPE_FULL_DUPLEX_BIDI_STREAM = 5;
   */
  FULL_DUPLEX_BIDI_STREAM = 5,
}

/**
 * Describes the enum connectrpc.conformance.v1.StreamType.
 */
export const StreamTypeSchema: GenEnum<StreamType> = /*@__PURE__*/
  enumDesc(file_connectrpc_conformance_v1_config, 4);

/**
 * @generated from enum connectrpc.conformance.v1.Code
 */
export enum Code {
  /**
   * @generated from enum value: CODE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: CODE_CANCELED = 1;
   */
  CANCELED = 1,

  /**
   * @generated from enum value: CODE_UNKNOWN = 2;
   */
  UNKNOWN = 2,

  /**
   * @generated from enum value: CODE_INVALID_ARGUMENT = 3;
   */
  INVALID_ARGUMENT = 3,

  /**
   * @generated from enum value: CODE_DEADLINE_EXCEEDED = 4;
   */
  DEADLINE_EXCEEDED = 4,

  /**
   * @generated from enum value: CODE_NOT_FOUND = 5;
   */
  NOT_FOUND = 5,

  /**
   * @generated from enum value: CODE_ALREADY_EXISTS = 6;
   */
  ALREADY_EXISTS = 6,

  /**
   * @generated from enum value: CODE_PERMISSION_DENIED = 7;
   */
  PERMISSION_DENIED = 7,

  /**
   * @generated from enum value: CODE_RESOURCE_EXHAUSTED = 8;
   */
  RESOURCE_EXHAUSTED = 8,

  /**
   * @generated from enum value: CODE_FAILED_PRECONDITION = 9;
   */
  FAILED_PRECONDITION = 9,

  /**
   * @generated from enum value: CODE_ABORTED = 10;
   */
  ABORTED = 10,

  /**
   * @generated from enum value: CODE_OUT_OF_RANGE = 11;
   */
  OUT_OF_RANGE = 11,

  /**
   * @generated from enum value: CODE_UNIMPLEMENTED = 12;
   */
  UNIMPLEMENTED = 12,

  /**
   * @generated from enum value: CODE_INTERNAL = 13;
   */
  INTERNAL = 13,

  /**
   * @generated from enum value: CODE_UNAVAILABLE = 14;
   */
  UNAVAILABLE = 14,

  /**
   * @generated from enum value: CODE_DATA_LOSS = 15;
   */
  DATA_LOSS = 15,

  /**
   * @generated from enum value: CODE_UNAUTHENTICATED = 16;
   */
  UNAUTHENTICATED = 16,
}

/**
 * Describes the enum connectrpc.conformance.v1.Code.
 */
export const CodeSchema: GenEnum<Code> = /*@__PURE__*/
  enumDesc(file_connectrpc_conformance_v1_config, 5);


// Copyright 2023-2024 The Connect Authors
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
import { Message, proto3 } from "@bufbuild/protobuf";
import { HTTPVersion, Protocol, TLSCreds } from "./config_pb.js";
/**
 * Describes one configuration for an RPC server. The server is
 * expected to expose the connectrpc.conformance.v1.ConformanceService
 * RPC service. The configuration does not include a port. The
 * process should pick an available port, which is typically
 * done by using port zero (0) when creating a network listener
 * so that the OS selects an available ephemeral port.
 *
 * These properties are read from stdin. Once the server is
 * listening, details about the server, in the form of a
 * ServerCompatResponse, are written to stdout.
 *
 * Each test process is expected to start only one RPC server.
 * When testing multiple configurations, multiple test processes
 * will be started, each with different properties.
 *
 * @generated from message connectrpc.conformance.v1.ServerCompatRequest
 */
export class ServerCompatRequest extends Message {
    constructor(data) {
        super();
        /**
         * Signals to the server that it must support at least this protocol. Note
         * that it is fine to support others.
         * For example if `PROTOCOL_CONNECT` is specified, the server _must_ support
         * at least Connect, but _may_ also support gRPC or gRPC-web.
         *
         * @generated from field: connectrpc.conformance.v1.Protocol protocol = 1;
         */
        this.protocol = Protocol.UNSPECIFIED;
        /**
         * Signals to the server the minimum HTTP version to support. As with
         * `protocol`, it is fine to support other versions. For example, if
         * `HTTP_VERSION_2` is specified, the server _must_ support HTTP/2, but _may_ also
         * support HTTP/1.1 or HTTP/3.
         *
         * @generated from field: connectrpc.conformance.v1.HTTPVersion http_version = 2;
         */
        this.httpVersion = HTTPVersion.HTTP_VERSION_UNSPECIFIED;
        /**
         * If true, generate a certificate that clients will be configured to trust
         * when connecting and return it in the `pem_cert` field of the `ServerCompatResponse`.
         * The certificate can be any TLS certificate where the subject matches the
         * value sent back in the `host` field of the `ServerCompatResponse`.
         * Self-signed certificates (and `localhost` as the subject) are allowed.
         * If false, the server should not use TLS and instead use
         * a plain-text/unencrypted socket.
         *
         * @generated from field: bool use_tls = 4;
         */
        this.useTls = false;
        /**
         * If non-empty, the clients will use certificates to authenticate
         * themselves. This value is a PEM-encoded cert that should be
         * trusted by the server. When non-empty, the server should require
         * that clients provide certificates and they should validate that
         * the certificate presented is valid.
         *
         * This will always be empty if use_tls is false.
         *
         * @generated from field: bytes client_tls_cert = 5;
         */
        this.clientTlsCert = new Uint8Array(0);
        /**
         * If non-zero, indicates the maximum size in bytes for a message.
         * If the client sends anything larger, the server should reject it.
         *
         * @generated from field: uint32 message_receive_limit = 6;
         */
        this.messageReceiveLimit = 0;
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new ServerCompatRequest().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new ServerCompatRequest().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new ServerCompatRequest().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(ServerCompatRequest, a, b);
    }
}
ServerCompatRequest.runtime = proto3;
ServerCompatRequest.typeName = "connectrpc.conformance.v1.ServerCompatRequest";
ServerCompatRequest.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "protocol", kind: "enum", T: proto3.getEnumType(Protocol) },
    { no: 2, name: "http_version", kind: "enum", T: proto3.getEnumType(HTTPVersion) },
    { no: 4, name: "use_tls", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 5, name: "client_tls_cert", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 6, name: "message_receive_limit", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 7, name: "server_creds", kind: "message", T: TLSCreds },
]);
/**
 * The outcome of one ServerCompatRequest.
 *
 * @generated from message connectrpc.conformance.v1.ServerCompatResponse
 */
export class ServerCompatResponse extends Message {
    constructor(data) {
        super();
        /**
         * The host where the server is running. This should usually be `127.0.0.1`,
         * unless your program actually starts a remote server to which the client
         * should connect.
         *
         * @generated from field: string host = 1;
         */
        this.host = "";
        /**
         * The port where the server is listening.
         *
         * @generated from field: uint32 port = 2;
         */
        this.port = 0;
        /**
         * The TLS certificate, in PEM format, if `use_tls` was set
         * to `true`. Clients will verify this certificate when connecting via TLS.
         * If `use_tls` was set to `false`, this should always be empty.
         *
         * @generated from field: bytes pem_cert = 3;
         */
        this.pemCert = new Uint8Array(0);
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new ServerCompatResponse().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new ServerCompatResponse().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new ServerCompatResponse().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(ServerCompatResponse, a, b);
    }
}
ServerCompatResponse.runtime = proto3;
ServerCompatResponse.typeName = "connectrpc.conformance.v1.ServerCompatResponse";
ServerCompatResponse.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "host", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "port", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 3, name: "pem_cert", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
]);

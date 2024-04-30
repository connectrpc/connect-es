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
import { Any, Empty, Message, proto3, Struct } from "@bufbuild/protobuf";
import { Codec, Compression, HTTPVersion, Protocol, StreamType, TLSCreds } from "./config_pb.js";
import { ConformancePayload, Error, Header, RawHTTPRequest } from "./service_pb.js";
/**
 * Describes one call the client should make. The client reads
 * these from stdin and, for each one, invokes an RPC as directed
 * and writes the results (in the form of a ClientCompatResponse
 * message) to stdout.
 *
 * @generated from message connectrpc.conformance.v1.ClientCompatRequest
 */
export class ClientCompatRequest extends Message {
    constructor(data) {
        super();
        /**
         * The name of the test that this request is performing.
         * When writing test cases, this is a required field.
         *
         * @generated from field: string test_name = 1;
         */
        this.testName = "";
        /**
         * Test suite YAML definitions should NOT set values for these next
         * nine fields (fields 2 - 10). They are automatically populated by the test
         * runner. If a test is specific to one of these values, it should instead be
         * indicated in the test suite itself (where it defines the required
         * features and relevant values for these fields).
         *
         * The HTTP version to use for the test (i.e. HTTP/1.1, HTTP/2, HTTP/3).
         *
         * @generated from field: connectrpc.conformance.v1.HTTPVersion http_version = 2;
         */
        this.httpVersion = HTTPVersion.HTTP_VERSION_UNSPECIFIED;
        /**
         * The protocol to use for the test (i.e. Connect, gRPC, gRPC-web).
         *
         * @generated from field: connectrpc.conformance.v1.Protocol protocol = 3;
         */
        this.protocol = Protocol.UNSPECIFIED;
        /**
         * The codec to use for the test (i.e. JSON, proto/binary).
         *
         * @generated from field: connectrpc.conformance.v1.Codec codec = 4;
         */
        this.codec = Codec.UNSPECIFIED;
        /**
         * The compression to use for the test (i.e. brotli, gzip, identity).
         *
         * @generated from field: connectrpc.conformance.v1.Compression compression = 5;
         */
        this.compression = Compression.UNSPECIFIED;
        /**
         * The server host that this request will be sent to.
         *
         * @generated from field: string host = 6;
         */
        this.host = "";
        /**
         * The server port that this request will be sent to.
         *
         * @generated from field: uint32 port = 7;
         */
        this.port = 0;
        /**
         * If non-empty, the server is using TLS. The bytes are the
         * server's PEM-encoded certificate, which the client should
         * verify and trust.
         *
         * @generated from field: bytes server_tls_cert = 8;
         */
        this.serverTlsCert = new Uint8Array(0);
        /**
         * If non-zero, indicates the maximum size in bytes for a message.
         * If the server sends anything larger, the client should reject it.
         *
         * @generated from field: uint32 message_receive_limit = 10;
         */
        this.messageReceiveLimit = 0;
        /**
         * The stream type of `method` (i.e. Unary, Client-Streaming, Server-Streaming, Full Duplex Bidi, or Half Duplex Bidi).
         * When writing test cases, this is a required field.
         *
         * @generated from field: connectrpc.conformance.v1.StreamType stream_type = 13;
         */
        this.streamType = StreamType.UNSPECIFIED;
        /**
         * If protocol indicates Connect and stream type indicates
         * Unary, this instructs the client to use a GET HTTP method
         * when making the request.
         *
         * @generated from field: bool use_get_http_method = 14;
         */
        this.useGetHttpMethod = false;
        /**
         * Any request headers that should be sent as part of the request.
         * These include only custom header metadata. Headers that are
         * part of the relevant protocol (such as "content-type", etc) should
         * not be stated here.
         *
         * @generated from field: repeated connectrpc.conformance.v1.Header request_headers = 15;
         */
        this.requestHeaders = [];
        /**
         * The actual request messages that will sent to the server.
         * The type URL for all entries should be equal to the request type of the
         * method.
         * There must be exactly one for unary and server-stream methods but
         * can be zero or more for client- and bidi-stream methods.
         * For client- and bidi-stream methods, all entries will have the
         * same type URL.
         *
         * @generated from field: repeated google.protobuf.Any request_messages = 16;
         */
        this.requestMessages = [];
        /**
         * Wait this many milliseconds before sending a request message.
         * For client- or bidi-streaming requests, this delay should be
         * applied before each request sent.
         *
         * @generated from field: uint32 request_delay_ms = 18;
         */
        this.requestDelayMs = 0;
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new ClientCompatRequest().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new ClientCompatRequest().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new ClientCompatRequest().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(ClientCompatRequest, a, b);
    }
}
ClientCompatRequest.runtime = proto3;
ClientCompatRequest.typeName = "connectrpc.conformance.v1.ClientCompatRequest";
ClientCompatRequest.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "test_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "http_version", kind: "enum", T: proto3.getEnumType(HTTPVersion) },
    { no: 3, name: "protocol", kind: "enum", T: proto3.getEnumType(Protocol) },
    { no: 4, name: "codec", kind: "enum", T: proto3.getEnumType(Codec) },
    { no: 5, name: "compression", kind: "enum", T: proto3.getEnumType(Compression) },
    { no: 6, name: "host", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "port", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 8, name: "server_tls_cert", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 9, name: "client_tls_creds", kind: "message", T: TLSCreds },
    { no: 10, name: "message_receive_limit", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 11, name: "service", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 12, name: "method", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 13, name: "stream_type", kind: "enum", T: proto3.getEnumType(StreamType) },
    { no: 14, name: "use_get_http_method", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 15, name: "request_headers", kind: "message", T: Header, repeated: true },
    { no: 16, name: "request_messages", kind: "message", T: Any, repeated: true },
    { no: 17, name: "timeout_ms", kind: "scalar", T: 13 /* ScalarType.UINT32 */, opt: true },
    { no: 18, name: "request_delay_ms", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 19, name: "cancel", kind: "message", T: ClientCompatRequest_Cancel },
    { no: 20, name: "raw_request", kind: "message", T: RawHTTPRequest },
]);
/**
 * @generated from message connectrpc.conformance.v1.ClientCompatRequest.Cancel
 */
export class ClientCompatRequest_Cancel extends Message {
    constructor(data) {
        super();
        /**
         * These fields determine the timing of cancellation.
         * If none are present, the client should cancel immediately
         * after all request messages are sent and the send side is
         * closed (as if the after_close_send_ms field were present
         * and zero).
         *
         * @generated from oneof connectrpc.conformance.v1.ClientCompatRequest.Cancel.cancel_timing
         */
        this.cancelTiming = { case: undefined };
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new ClientCompatRequest_Cancel().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new ClientCompatRequest_Cancel().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new ClientCompatRequest_Cancel().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(ClientCompatRequest_Cancel, a, b);
    }
}
ClientCompatRequest_Cancel.runtime = proto3;
ClientCompatRequest_Cancel.typeName = "connectrpc.conformance.v1.ClientCompatRequest.Cancel";
ClientCompatRequest_Cancel.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "before_close_send", kind: "message", T: Empty, oneof: "cancel_timing" },
    { no: 2, name: "after_close_send_ms", kind: "scalar", T: 13 /* ScalarType.UINT32 */, oneof: "cancel_timing" },
    { no: 3, name: "after_num_responses", kind: "scalar", T: 13 /* ScalarType.UINT32 */, oneof: "cancel_timing" },
]);
/**
 * The outcome of one ClientCompatRequest.
 *
 * @generated from message connectrpc.conformance.v1.ClientCompatResponse
 */
export class ClientCompatResponse extends Message {
    constructor(data) {
        super();
        /**
         * The test name that this response applies to.
         *
         * @generated from field: string test_name = 1;
         */
        this.testName = "";
        /**
         * These fields determine the outcome of the request.
         *
         * With regards to errors, any unexpected errors that prevent the client from
         * issuing the RPC and following the instructions implied by the request can
         * be reported as an error. These would be errors creating an RPC client from
         * the request parameters or unsupported/illegal values in the request
         * (e.g. a unary request that defines zero or multiple request messages).
         *
         * However, once the RPC is issued, any resulting error should instead be encoded in response.
         *
         * @generated from oneof connectrpc.conformance.v1.ClientCompatResponse.result
         */
        this.result = { case: undefined };
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new ClientCompatResponse().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new ClientCompatResponse().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new ClientCompatResponse().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(ClientCompatResponse, a, b);
    }
}
ClientCompatResponse.runtime = proto3;
ClientCompatResponse.typeName = "connectrpc.conformance.v1.ClientCompatResponse";
ClientCompatResponse.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "test_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "response", kind: "message", T: ClientResponseResult, oneof: "result" },
    { no: 3, name: "error", kind: "message", T: ClientErrorResult, oneof: "result" },
]);
/**
 * The result of a ClientCompatRequest, which may or may not be successful.
 * The client will build this message and return it back to the test runner.
 *
 * @generated from message connectrpc.conformance.v1.ClientResponseResult
 */
export class ClientResponseResult extends Message {
    constructor(data) {
        super();
        /**
         * All response headers read from the response.
         *
         * @generated from field: repeated connectrpc.conformance.v1.Header response_headers = 1;
         */
        this.responseHeaders = [];
        /**
         * Servers should echo back payloads that they received as part of the request.
         * This field should contain all the payloads the server echoed back. Note that
         * There will be zero-to-one for unary and client-stream methods and
         * zero-to-many for server- and bidi-stream methods.
         *
         * @generated from field: repeated connectrpc.conformance.v1.ConformancePayload payloads = 2;
         */
        this.payloads = [];
        /**
         * All response headers read from the response.
         *
         * @generated from field: repeated connectrpc.conformance.v1.Header response_trailers = 4;
         */
        this.responseTrailers = [];
        /**
         * The number of messages that were present in the request but that could not be
         * sent because an error occurred before finishing the upload.
         *
         * @generated from field: int32 num_unsent_requests = 5;
         */
        this.numUnsentRequests = 0;
        /**
         * This field is used only by the reference client, and it can be used
         * to provide additional feedback about problems observed in the server
         * response or in client processing of the response. If non-empty, the test
         * case is considered failed even if the result above matches all expectations.
         * If you are implementing a client-under-test, you should ignore this field
         * and leave it unset.
         *
         * @generated from field: repeated string feedback = 7;
         */
        this.feedback = [];
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new ClientResponseResult().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new ClientResponseResult().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new ClientResponseResult().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(ClientResponseResult, a, b);
    }
}
ClientResponseResult.runtime = proto3;
ClientResponseResult.typeName = "connectrpc.conformance.v1.ClientResponseResult";
ClientResponseResult.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "response_headers", kind: "message", T: Header, repeated: true },
    { no: 2, name: "payloads", kind: "message", T: ConformancePayload, repeated: true },
    { no: 3, name: "error", kind: "message", T: Error },
    { no: 4, name: "response_trailers", kind: "message", T: Header, repeated: true },
    { no: 5, name: "num_unsent_requests", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 6, name: "http_status_code", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 7, name: "feedback", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
]);
/**
 * The client is not able to fulfill the ClientCompatRequest. This may be due
 * to a runtime error or an unexpected internal error such as the requested protocol
 * not being supported. This is completely independent of the actual RPC invocation.
 *
 * @generated from message connectrpc.conformance.v1.ClientErrorResult
 */
export class ClientErrorResult extends Message {
    constructor(data) {
        super();
        /**
         * A message describing the error that occurred. This string will be shown to
         * users running conformance tests so it should include any relevant details
         * that may help troubleshoot or remedy the error.
         *
         * @generated from field: string message = 1;
         */
        this.message = "";
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new ClientErrorResult().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new ClientErrorResult().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new ClientErrorResult().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(ClientErrorResult, a, b);
    }
}
ClientErrorResult.runtime = proto3;
ClientErrorResult.typeName = "connectrpc.conformance.v1.ClientErrorResult";
ClientErrorResult.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "message", kind: "scalar", T: 9 /* ScalarType.STRING */ },
]);
/**
 * Details about various values as observed on the wire. This message is used
 * only by the reference client when reporting results and should not be populated
 * by clients under test.
 *
 * @generated from message connectrpc.conformance.v1.WireDetails
 */
export class WireDetails extends Message {
    constructor(data) {
        super();
        /**
         * The HTTP status code of the response.
         *
         * @generated from field: int32 actual_status_code = 1;
         */
        this.actualStatusCode = 0;
        /**
         * Any HTTP trailers observed after the response body. These do NOT
         * include trailers that conveyed via the body, as done in the gRPC-Web
         * and Connect streaming protocols.
         *
         * @generated from field: repeated connectrpc.conformance.v1.Header actual_http_trailers = 3;
         */
        this.actualHttpTrailers = [];
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new WireDetails().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new WireDetails().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new WireDetails().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(WireDetails, a, b);
    }
}
WireDetails.runtime = proto3;
WireDetails.typeName = "connectrpc.conformance.v1.WireDetails";
WireDetails.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "actual_status_code", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "connect_error_raw", kind: "message", T: Struct },
    { no: 3, name: "actual_http_trailers", kind: "message", T: Header, repeated: true },
    { no: 4, name: "actual_grpcweb_trailers", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
]);

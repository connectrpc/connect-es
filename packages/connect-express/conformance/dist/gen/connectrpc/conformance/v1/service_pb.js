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
import { Any, Message, proto3 } from "@bufbuild/protobuf";
import { Code, Compression } from "./config_pb.js";
/**
 * A definition of a response to be sent from a single-response endpoint.
 * Can be used to define a response for unary or client-streaming calls.
 *
 * @generated from message connectrpc.conformance.v1.UnaryResponseDefinition
 */
export class UnaryResponseDefinition extends Message {
    constructor(data) {
        super();
        /**
         * Response headers to send
         *
         * @generated from field: repeated connectrpc.conformance.v1.Header response_headers = 1;
         */
        this.responseHeaders = [];
        /**
         * @generated from oneof connectrpc.conformance.v1.UnaryResponseDefinition.response
         */
        this.response = { case: undefined };
        /**
         * Response trailers to send - together with the error if present
         *
         * @generated from field: repeated connectrpc.conformance.v1.Header response_trailers = 4;
         */
        this.responseTrailers = [];
        /**
         * Wait this many milliseconds before sending a response message
         *
         * @generated from field: uint32 response_delay_ms = 6;
         */
        this.responseDelayMs = 0;
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new UnaryResponseDefinition().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new UnaryResponseDefinition().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new UnaryResponseDefinition().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(UnaryResponseDefinition, a, b);
    }
}
UnaryResponseDefinition.runtime = proto3;
UnaryResponseDefinition.typeName = "connectrpc.conformance.v1.UnaryResponseDefinition";
UnaryResponseDefinition.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "response_headers", kind: "message", T: Header, repeated: true },
    { no: 2, name: "response_data", kind: "scalar", T: 12 /* ScalarType.BYTES */, oneof: "response" },
    { no: 3, name: "error", kind: "message", T: Error, oneof: "response" },
    { no: 4, name: "response_trailers", kind: "message", T: Header, repeated: true },
    { no: 6, name: "response_delay_ms", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 5, name: "raw_response", kind: "message", T: RawHTTPResponse },
]);
/**
 * A definition of responses to be sent from a streaming endpoint.
 * Can be used to define responses for server-streaming or bidi-streaming calls.
 *
 * @generated from message connectrpc.conformance.v1.StreamResponseDefinition
 */
export class StreamResponseDefinition extends Message {
    constructor(data) {
        super();
        /**
         * Response headers to send
         *
         * @generated from field: repeated connectrpc.conformance.v1.Header response_headers = 1;
         */
        this.responseHeaders = [];
        /**
         * Response data to send
         *
         * @generated from field: repeated bytes response_data = 2;
         */
        this.responseData = [];
        /**
         * Wait this many milliseconds before sending each response message
         *
         * @generated from field: uint32 response_delay_ms = 3;
         */
        this.responseDelayMs = 0;
        /**
         * Response trailers to send - together with the error if present
         *
         * @generated from field: repeated connectrpc.conformance.v1.Header response_trailers = 5;
         */
        this.responseTrailers = [];
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new StreamResponseDefinition().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new StreamResponseDefinition().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new StreamResponseDefinition().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(StreamResponseDefinition, a, b);
    }
}
StreamResponseDefinition.runtime = proto3;
StreamResponseDefinition.typeName = "connectrpc.conformance.v1.StreamResponseDefinition";
StreamResponseDefinition.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "response_headers", kind: "message", T: Header, repeated: true },
    { no: 2, name: "response_data", kind: "scalar", T: 12 /* ScalarType.BYTES */, repeated: true },
    { no: 3, name: "response_delay_ms", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 4, name: "error", kind: "message", T: Error },
    { no: 5, name: "response_trailers", kind: "message", T: Header, repeated: true },
    { no: 6, name: "raw_response", kind: "message", T: RawHTTPResponse },
]);
/**
 * @generated from message connectrpc.conformance.v1.UnaryRequest
 */
export class UnaryRequest extends Message {
    constructor(data) {
        super();
        /**
         * Additional data. Only used to pad the request size to test large request messages.
         *
         * @generated from field: bytes request_data = 2;
         */
        this.requestData = new Uint8Array(0);
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new UnaryRequest().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new UnaryRequest().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new UnaryRequest().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(UnaryRequest, a, b);
    }
}
UnaryRequest.runtime = proto3;
UnaryRequest.typeName = "connectrpc.conformance.v1.UnaryRequest";
UnaryRequest.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "response_definition", kind: "message", T: UnaryResponseDefinition },
    { no: 2, name: "request_data", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
]);
/**
 * @generated from message connectrpc.conformance.v1.UnaryResponse
 */
export class UnaryResponse extends Message {
    constructor(data) {
        super();
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new UnaryResponse().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new UnaryResponse().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new UnaryResponse().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(UnaryResponse, a, b);
    }
}
UnaryResponse.runtime = proto3;
UnaryResponse.typeName = "connectrpc.conformance.v1.UnaryResponse";
UnaryResponse.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "payload", kind: "message", T: ConformancePayload },
]);
/**
 * @generated from message connectrpc.conformance.v1.IdempotentUnaryRequest
 */
export class IdempotentUnaryRequest extends Message {
    constructor(data) {
        super();
        /**
         * Additional data. Only used to pad the request size to test large request messages.
         *
         * @generated from field: bytes request_data = 2;
         */
        this.requestData = new Uint8Array(0);
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new IdempotentUnaryRequest().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new IdempotentUnaryRequest().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new IdempotentUnaryRequest().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(IdempotentUnaryRequest, a, b);
    }
}
IdempotentUnaryRequest.runtime = proto3;
IdempotentUnaryRequest.typeName = "connectrpc.conformance.v1.IdempotentUnaryRequest";
IdempotentUnaryRequest.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "response_definition", kind: "message", T: UnaryResponseDefinition },
    { no: 2, name: "request_data", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
]);
/**
 * @generated from message connectrpc.conformance.v1.IdempotentUnaryResponse
 */
export class IdempotentUnaryResponse extends Message {
    constructor(data) {
        super();
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new IdempotentUnaryResponse().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new IdempotentUnaryResponse().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new IdempotentUnaryResponse().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(IdempotentUnaryResponse, a, b);
    }
}
IdempotentUnaryResponse.runtime = proto3;
IdempotentUnaryResponse.typeName = "connectrpc.conformance.v1.IdempotentUnaryResponse";
IdempotentUnaryResponse.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "payload", kind: "message", T: ConformancePayload },
]);
/**
 * @generated from message connectrpc.conformance.v1.ServerStreamRequest
 */
export class ServerStreamRequest extends Message {
    constructor(data) {
        super();
        /**
         * Additional data. Only used to pad the request size to test large request messages.
         *
         * @generated from field: bytes request_data = 2;
         */
        this.requestData = new Uint8Array(0);
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new ServerStreamRequest().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new ServerStreamRequest().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new ServerStreamRequest().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(ServerStreamRequest, a, b);
    }
}
ServerStreamRequest.runtime = proto3;
ServerStreamRequest.typeName = "connectrpc.conformance.v1.ServerStreamRequest";
ServerStreamRequest.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "response_definition", kind: "message", T: StreamResponseDefinition },
    { no: 2, name: "request_data", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
]);
/**
 * @generated from message connectrpc.conformance.v1.ServerStreamResponse
 */
export class ServerStreamResponse extends Message {
    constructor(data) {
        super();
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new ServerStreamResponse().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new ServerStreamResponse().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new ServerStreamResponse().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(ServerStreamResponse, a, b);
    }
}
ServerStreamResponse.runtime = proto3;
ServerStreamResponse.typeName = "connectrpc.conformance.v1.ServerStreamResponse";
ServerStreamResponse.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "payload", kind: "message", T: ConformancePayload },
]);
/**
 * @generated from message connectrpc.conformance.v1.ClientStreamRequest
 */
export class ClientStreamRequest extends Message {
    constructor(data) {
        super();
        /**
         * Additional data for subsequent messages in the stream. Also
         * used to pad the request size to test large request messages.
         *
         * @generated from field: bytes request_data = 2;
         */
        this.requestData = new Uint8Array(0);
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new ClientStreamRequest().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new ClientStreamRequest().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new ClientStreamRequest().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(ClientStreamRequest, a, b);
    }
}
ClientStreamRequest.runtime = proto3;
ClientStreamRequest.typeName = "connectrpc.conformance.v1.ClientStreamRequest";
ClientStreamRequest.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "response_definition", kind: "message", T: UnaryResponseDefinition },
    { no: 2, name: "request_data", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
]);
/**
 * @generated from message connectrpc.conformance.v1.ClientStreamResponse
 */
export class ClientStreamResponse extends Message {
    constructor(data) {
        super();
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new ClientStreamResponse().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new ClientStreamResponse().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new ClientStreamResponse().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(ClientStreamResponse, a, b);
    }
}
ClientStreamResponse.runtime = proto3;
ClientStreamResponse.typeName = "connectrpc.conformance.v1.ClientStreamResponse";
ClientStreamResponse.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "payload", kind: "message", T: ConformancePayload },
]);
/**
 * @generated from message connectrpc.conformance.v1.BidiStreamRequest
 */
export class BidiStreamRequest extends Message {
    constructor(data) {
        super();
        /**
         * Tells the server whether it should wait for each request
         * before sending a response.
         *
         * If true, it indicates the server should effectively interleave the
         * stream so messages are sent in request->response pairs.
         *
         * If false, then the response stream will be sent once all request messages
         * are finished sending with the only delays between messages
         * being the optional fixed milliseconds defined in the response
         * definition.
         *
         * This field is only relevant in the first message in the stream
         * and should be ignored in subsequent messages.
         *
         * @generated from field: bool full_duplex = 2;
         */
        this.fullDuplex = false;
        /**
         * Additional data for subsequent messages in the stream. Also
         * used to pad the request size to test large request messages.
         *
         * @generated from field: bytes request_data = 3;
         */
        this.requestData = new Uint8Array(0);
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new BidiStreamRequest().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new BidiStreamRequest().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new BidiStreamRequest().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(BidiStreamRequest, a, b);
    }
}
BidiStreamRequest.runtime = proto3;
BidiStreamRequest.typeName = "connectrpc.conformance.v1.BidiStreamRequest";
BidiStreamRequest.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "response_definition", kind: "message", T: StreamResponseDefinition },
    { no: 2, name: "full_duplex", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 3, name: "request_data", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
]);
/**
 * @generated from message connectrpc.conformance.v1.BidiStreamResponse
 */
export class BidiStreamResponse extends Message {
    constructor(data) {
        super();
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new BidiStreamResponse().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new BidiStreamResponse().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new BidiStreamResponse().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(BidiStreamResponse, a, b);
    }
}
BidiStreamResponse.runtime = proto3;
BidiStreamResponse.typeName = "connectrpc.conformance.v1.BidiStreamResponse";
BidiStreamResponse.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "payload", kind: "message", T: ConformancePayload },
]);
/**
 * @generated from message connectrpc.conformance.v1.UnimplementedRequest
 */
export class UnimplementedRequest extends Message {
    constructor(data) {
        super();
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new UnimplementedRequest().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new UnimplementedRequest().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new UnimplementedRequest().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(UnimplementedRequest, a, b);
    }
}
UnimplementedRequest.runtime = proto3;
UnimplementedRequest.typeName = "connectrpc.conformance.v1.UnimplementedRequest";
UnimplementedRequest.fields = proto3.util.newFieldList(() => []);
/**
 * @generated from message connectrpc.conformance.v1.UnimplementedResponse
 */
export class UnimplementedResponse extends Message {
    constructor(data) {
        super();
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new UnimplementedResponse().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new UnimplementedResponse().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new UnimplementedResponse().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(UnimplementedResponse, a, b);
    }
}
UnimplementedResponse.runtime = proto3;
UnimplementedResponse.typeName = "connectrpc.conformance.v1.UnimplementedResponse";
UnimplementedResponse.fields = proto3.util.newFieldList(() => []);
/**
 * @generated from message connectrpc.conformance.v1.ConformancePayload
 */
export class ConformancePayload extends Message {
    constructor(data) {
        super();
        /**
         * Any response data specified in the response definition to the server should be
         * echoed back here.
         *
         * @generated from field: bytes data = 1;
         */
        this.data = new Uint8Array(0);
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new ConformancePayload().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new ConformancePayload().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new ConformancePayload().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(ConformancePayload, a, b);
    }
}
ConformancePayload.runtime = proto3;
ConformancePayload.typeName = "connectrpc.conformance.v1.ConformancePayload";
ConformancePayload.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "data", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "request_info", kind: "message", T: ConformancePayload_RequestInfo },
]);
/**
 * @generated from message connectrpc.conformance.v1.ConformancePayload.RequestInfo
 */
export class ConformancePayload_RequestInfo extends Message {
    constructor(data) {
        super();
        /**
         * The server echos back the request headers it observed here.
         *
         * @generated from field: repeated connectrpc.conformance.v1.Header request_headers = 1;
         */
        this.requestHeaders = [];
        /**
         * The server should echo back all requests received.
         * For unary and server-streaming requests, this should always contain a single request
         * For client-streaming and half-duplex bidi-streaming, this should contain
         * all client requests in the order received and be present in each response.
         * For full-duplex bidirectional-streaming, this should contain all requests in the order
         * they were received since the last sent response.
         *
         * @generated from field: repeated google.protobuf.Any requests = 3;
         */
        this.requests = [];
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new ConformancePayload_RequestInfo().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new ConformancePayload_RequestInfo().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new ConformancePayload_RequestInfo().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(ConformancePayload_RequestInfo, a, b);
    }
}
ConformancePayload_RequestInfo.runtime = proto3;
ConformancePayload_RequestInfo.typeName = "connectrpc.conformance.v1.ConformancePayload.RequestInfo";
ConformancePayload_RequestInfo.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "request_headers", kind: "message", T: Header, repeated: true },
    { no: 2, name: "timeout_ms", kind: "scalar", T: 3 /* ScalarType.INT64 */, opt: true },
    { no: 3, name: "requests", kind: "message", T: Any, repeated: true },
    { no: 4, name: "connect_get_info", kind: "message", T: ConformancePayload_ConnectGetInfo },
]);
/**
 * @generated from message connectrpc.conformance.v1.ConformancePayload.ConnectGetInfo
 */
export class ConformancePayload_ConnectGetInfo extends Message {
    constructor(data) {
        super();
        /**
         * The query params observed in the request URL.
         *
         * @generated from field: repeated connectrpc.conformance.v1.Header query_params = 1;
         */
        this.queryParams = [];
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new ConformancePayload_ConnectGetInfo().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new ConformancePayload_ConnectGetInfo().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new ConformancePayload_ConnectGetInfo().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(ConformancePayload_ConnectGetInfo, a, b);
    }
}
ConformancePayload_ConnectGetInfo.runtime = proto3;
ConformancePayload_ConnectGetInfo.typeName = "connectrpc.conformance.v1.ConformancePayload.ConnectGetInfo";
ConformancePayload_ConnectGetInfo.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "query_params", kind: "message", T: Header, repeated: true },
]);
/**
 * An error definition used for specifying a desired error response
 *
 * @generated from message connectrpc.conformance.v1.Error
 */
export class Error extends Message {
    constructor(data) {
        super();
        /**
         * The error code.
         * For a list of Connect error codes see: https://connectrpc.com/docs/protocol#error-codes
         *
         * @generated from field: connectrpc.conformance.v1.Code code = 1;
         */
        this.code = Code.UNSPECIFIED;
        /**
         * Errors in Connect and gRPC protocols can have arbitrary messages
         * attached to them, which are known as error details.
         *
         * @generated from field: repeated google.protobuf.Any details = 3;
         */
        this.details = [];
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new Error().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new Error().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new Error().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(Error, a, b);
    }
}
Error.runtime = proto3;
Error.typeName = "connectrpc.conformance.v1.Error";
Error.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "code", kind: "enum", T: proto3.getEnumType(Code) },
    { no: 2, name: "message", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 3, name: "details", kind: "message", T: Any, repeated: true },
]);
/**
 * A tuple of name and values (ASCII) for a header or trailer entry.
 *
 * @generated from message connectrpc.conformance.v1.Header
 */
export class Header extends Message {
    constructor(data) {
        super();
        /**
         * Header/trailer name (key).
         *
         * @generated from field: string name = 1;
         */
        this.name = "";
        /**
         * Header/trailer value. This is repeated to explicitly support headers and
         * trailers where a key is repeated. In such a case, these values must be in
         * the same order as which values appeared in the header or trailer block.
         *
         * @generated from field: repeated string value = 2;
         */
        this.value = [];
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new Header().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new Header().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new Header().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(Header, a, b);
    }
}
Header.runtime = proto3;
Header.typeName = "connectrpc.conformance.v1.Header";
Header.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
]);
/**
 * RawHTTPRequest models a raw HTTP request. This can be used to craft
 * custom requests with odd properties (including certain kinds of
 * malformed requests) to test edge cases in servers.
 *
 * @generated from message connectrpc.conformance.v1.RawHTTPRequest
 */
export class RawHTTPRequest extends Message {
    constructor(data) {
        super();
        /**
         * The HTTP verb (i.e. GET , POST).
         *
         * @generated from field: string verb = 1;
         */
        this.verb = "";
        /**
         * The URI to send the request to.
         *
         * @generated from field: string uri = 2;
         */
        this.uri = "";
        /**
         * Any headers to set on the request.
         *
         * @generated from field: repeated connectrpc.conformance.v1.Header headers = 3;
         */
        this.headers = [];
        /**
         * These query params will be encoded and added to the uri before
         * the request is sent.
         *
         * @generated from field: repeated connectrpc.conformance.v1.Header raw_query_params = 4;
         */
        this.rawQueryParams = [];
        /**
         * This provides an easier way to define a complex binary query param
         * than having to write literal base64-encoded bytes in raw_query_params.
         *
         * @generated from field: repeated connectrpc.conformance.v1.RawHTTPRequest.EncodedQueryParam encoded_query_params = 5;
         */
        this.encodedQueryParams = [];
        /**
         * @generated from oneof connectrpc.conformance.v1.RawHTTPRequest.body
         */
        this.body = { case: undefined };
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new RawHTTPRequest().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new RawHTTPRequest().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new RawHTTPRequest().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(RawHTTPRequest, a, b);
    }
}
RawHTTPRequest.runtime = proto3;
RawHTTPRequest.typeName = "connectrpc.conformance.v1.RawHTTPRequest";
RawHTTPRequest.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "verb", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "uri", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "headers", kind: "message", T: Header, repeated: true },
    { no: 4, name: "raw_query_params", kind: "message", T: Header, repeated: true },
    { no: 5, name: "encoded_query_params", kind: "message", T: RawHTTPRequest_EncodedQueryParam, repeated: true },
    { no: 6, name: "unary", kind: "message", T: MessageContents, oneof: "body" },
    { no: 7, name: "stream", kind: "message", T: StreamContents, oneof: "body" },
]);
/**
 * @generated from message connectrpc.conformance.v1.RawHTTPRequest.EncodedQueryParam
 */
export class RawHTTPRequest_EncodedQueryParam extends Message {
    constructor(data) {
        super();
        /**
         * Query param name.
         *
         * @generated from field: string name = 1;
         */
        this.name = "";
        /**
         * If true, the message contents will be base64-encoded and the
         * resulting string used as the query parameter value.
         *
         * @generated from field: bool base64_encode = 3;
         */
        this.base64Encode = false;
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new RawHTTPRequest_EncodedQueryParam().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new RawHTTPRequest_EncodedQueryParam().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new RawHTTPRequest_EncodedQueryParam().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(RawHTTPRequest_EncodedQueryParam, a, b);
    }
}
RawHTTPRequest_EncodedQueryParam.runtime = proto3;
RawHTTPRequest_EncodedQueryParam.typeName = "connectrpc.conformance.v1.RawHTTPRequest.EncodedQueryParam";
RawHTTPRequest_EncodedQueryParam.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "value", kind: "message", T: MessageContents },
    { no: 3, name: "base64_encode", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
]);
/**
 * MessageContents represents a message in a request body.
 *
 * @generated from message connectrpc.conformance.v1.MessageContents
 */
export class MessageContents extends Message {
    constructor(data) {
        super();
        /**
         * The message data can be defined in one of three ways.
         *
         * @generated from oneof connectrpc.conformance.v1.MessageContents.data
         */
        this.data = { case: undefined };
        /**
         * If specified and not identity, the above data will be
         * compressed using the given algorithm.
         *
         * @generated from field: connectrpc.conformance.v1.Compression compression = 4;
         */
        this.compression = Compression.UNSPECIFIED;
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new MessageContents().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new MessageContents().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new MessageContents().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(MessageContents, a, b);
    }
}
MessageContents.runtime = proto3;
MessageContents.typeName = "connectrpc.conformance.v1.MessageContents";
MessageContents.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "binary", kind: "scalar", T: 12 /* ScalarType.BYTES */, oneof: "data" },
    { no: 2, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "data" },
    { no: 3, name: "binary_message", kind: "message", T: Any, oneof: "data" },
    { no: 4, name: "compression", kind: "enum", T: proto3.getEnumType(Compression) },
]);
/**
 * StreamContents represents a sequence of messages in a request body.
 *
 * @generated from message connectrpc.conformance.v1.StreamContents
 */
export class StreamContents extends Message {
    constructor(data) {
        super();
        /**
         * The messages in the stream.
         *
         * @generated from field: repeated connectrpc.conformance.v1.StreamContents.StreamItem items = 1;
         */
        this.items = [];
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new StreamContents().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new StreamContents().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new StreamContents().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(StreamContents, a, b);
    }
}
StreamContents.runtime = proto3;
StreamContents.typeName = "connectrpc.conformance.v1.StreamContents";
StreamContents.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "items", kind: "message", T: StreamContents_StreamItem, repeated: true },
]);
/**
 * @generated from message connectrpc.conformance.v1.StreamContents.StreamItem
 */
export class StreamContents_StreamItem extends Message {
    constructor(data) {
        super();
        /**
         * must be in the range 0 to 255.
         *
         * @generated from field: uint32 flags = 1;
         */
        this.flags = 0;
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new StreamContents_StreamItem().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new StreamContents_StreamItem().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new StreamContents_StreamItem().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(StreamContents_StreamItem, a, b);
    }
}
StreamContents_StreamItem.runtime = proto3;
StreamContents_StreamItem.typeName = "connectrpc.conformance.v1.StreamContents.StreamItem";
StreamContents_StreamItem.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "flags", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "length", kind: "scalar", T: 13 /* ScalarType.UINT32 */, opt: true },
    { no: 3, name: "payload", kind: "message", T: MessageContents },
]);
/**
 * RawHTTPResponse models a raw HTTP response. This can be used to craft
 * custom responses with odd properties (including certain kinds of
 * malformed responses) to test edge cases in clients.
 *
 * @generated from message connectrpc.conformance.v1.RawHTTPResponse
 */
export class RawHTTPResponse extends Message {
    constructor(data) {
        super();
        /**
         * If status code is not specified, it will default to a 200 response code.
         *
         * @generated from field: uint32 status_code = 1;
         */
        this.statusCode = 0;
        /**
         * Headers to be set on the response.
         *
         * @generated from field: repeated connectrpc.conformance.v1.Header headers = 2;
         */
        this.headers = [];
        /**
         * @generated from oneof connectrpc.conformance.v1.RawHTTPResponse.body
         */
        this.body = { case: undefined };
        /**
         * Trailers to be set on the response.
         *
         * @generated from field: repeated connectrpc.conformance.v1.Header trailers = 5;
         */
        this.trailers = [];
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new RawHTTPResponse().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new RawHTTPResponse().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new RawHTTPResponse().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(RawHTTPResponse, a, b);
    }
}
RawHTTPResponse.runtime = proto3;
RawHTTPResponse.typeName = "connectrpc.conformance.v1.RawHTTPResponse";
RawHTTPResponse.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "status_code", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "headers", kind: "message", T: Header, repeated: true },
    { no: 3, name: "unary", kind: "message", T: MessageContents, oneof: "body" },
    { no: 4, name: "stream", kind: "message", T: StreamContents, oneof: "body" },
    { no: 5, name: "trailers", kind: "message", T: Header, repeated: true },
]);

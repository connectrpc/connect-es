/* eslint-disable */
// @generated by protoc-gen-es v0.0.1 with parameter "ts_nocheck=false"
// @generated from file extra/service-example.proto (package spec, syntax proto3)
//
// Copyright 2020-2022 Buf Technologies, Inc.
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

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from enum spec.FailRequest
 */
export enum FailRequest {

    /**
     * don't fail
     *
     * @generated from enum value: FAIL_REQUEST_NONE = 0;
     */
    FAIL_REQUEST_NONE = 0,

    /**
     * send an error status trailer after sending a message
     *
     * @generated from enum value: MESSAGE_THEN_ERROR_STATUS = 1;
     */
    MESSAGE_THEN_ERROR_STATUS = 1,

    /**
     * send an error status, don't send any message
     *
     * @generated from enum value: ERROR_STATUS_ONLY = 2;
     */
    ERROR_STATUS_ONLY = 2,

}

// Retrieve enum metadata with: proto3.getEnumType(FailRequest)
proto3.util.setEnumType(FailRequest, "spec.FailRequest", [
    {no: 0, name: "FAIL_REQUEST_NONE"},
    {no: 1, name: "MESSAGE_THEN_ERROR_STATUS"},
    {no: 2, name: "ERROR_STATUS_ONLY"},
]);

/**
 * @generated from message spec.ExampleRequest
 */
export class ExampleRequest extends Message<ExampleRequest> {

    /**
     * any text
     *
     * @generated from field: string question = 1;
     */
    question = "";

    /**
     * the server should simulate an error in the requested way 
     *
     * @generated from field: spec.FailRequest please_fail = 2;
     */
    pleaseFail = FailRequest.FAIL_REQUEST_NONE;

    /**
     * the server should delay it's response for this amount of milliseconds
     *
     * @generated from field: int32 please_delay_response_ms = 3;
     */
    pleaseDelayResponseMs = 0;

    /**
     * by default, the server always writes some custom response headers
     *
     * @generated from field: bool disable_sending_example_response_headers = 4;
     */
    disableSendingExampleResponseHeaders = false;

    constructor(data?: PartialMessage<ExampleRequest>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "spec.ExampleRequest";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "question", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 2, name: "please_fail", kind: "enum", T: proto3.getEnumType(FailRequest)},
        {no: 3, name: "please_delay_response_ms", kind: "scalar", T: 5 /* ScalarType.INT32 */},
        {no: 4, name: "disable_sending_example_response_headers", kind: "scalar", T: 8 /* ScalarType.BOOL */},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExampleRequest {
        return new ExampleRequest().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExampleRequest {
        return new ExampleRequest().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExampleRequest {
        return new ExampleRequest().fromJsonString(jsonString, options);
    }

    static equals(a: ExampleRequest | PlainMessage<ExampleRequest> | undefined, b: ExampleRequest | PlainMessage<ExampleRequest> | undefined): boolean {
        return proto3.util.equals(ExampleRequest, a, b);
    }

}


/**
 * @generated from message spec.ExampleResponse
 */
export class ExampleResponse extends Message<ExampleResponse> {

    /**
     * any text
     *
     * @generated from field: string answer = 1;
     */
    answer = "";

    /**
     * contains the request headers that the server received
     *
     * @generated from field: map<string, string> your_request_headers = 2;
     */
    yourRequestHeaders: { [key: string]: string } = {};

    /**
     * contains the deadline that the server received 
     *
     * @generated from field: string your_deadline = 3;
     */
    yourDeadline = "";

    /**
     * the failure requested 
     *
     * @generated from field: spec.FailRequest your_fail_request = 4;
     */
    yourFailRequest = FailRequest.FAIL_REQUEST_NONE;

    constructor(data?: PartialMessage<ExampleResponse>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "spec.ExampleResponse";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "answer", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 2, name: "your_request_headers", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 9 /* ScalarType.0 */}},
        {no: 3, name: "your_deadline", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 4, name: "your_fail_request", kind: "enum", T: proto3.getEnumType(FailRequest)},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExampleResponse {
        return new ExampleResponse().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExampleResponse {
        return new ExampleResponse().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExampleResponse {
        return new ExampleResponse().fromJsonString(jsonString, options);
    }

    static equals(a: ExampleResponse | PlainMessage<ExampleResponse> | undefined, b: ExampleResponse | PlainMessage<ExampleResponse> | undefined): boolean {
        return proto3.util.equals(ExampleResponse, a, b);
    }

}



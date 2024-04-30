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
import { Code, Codec, Compression, HTTPVersion, Protocol } from "./config_pb.js";
import { ClientCompatRequest, ClientResponseResult } from "./client_compat_pb.js";
/**
 * TestSuite represents a set of conformance test cases. This is also the schema
 * used for the structure of a YAML test file. Each YAML file represents a test
 * suite, which can contain numerous cases. Each test suite has various properties
 * that indicate the kinds of features that are tested. Test suites may be skipped
 * based on whether the client or server under test implements these features.
 *
 * @generated from message connectrpc.conformance.v1.TestSuite
 */
export class TestSuite extends Message {
    constructor(data) {
        super();
        /**
         * Test suite name. When writing test suites, this is a required field.
         *
         * @generated from field: string name = 1;
         */
        this.name = "";
        /**
         * The mode (client or server) that this test suite applies to. This is used
         * in conjunction with the `--mode` flag passed to the conformance runner
         * binary. If the mode on the suite is set to client, the tests will only be
         * run if `--mode client` is set on the command to the test runner.
         * Likewise if mode is server. If this is unset, the test case will be run in both modes.
         *
         * @generated from field: connectrpc.conformance.v1.TestSuite.TestMode mode = 2;
         */
        this.mode = TestSuite_TestMode.UNSPECIFIED;
        /**
         * The actual test cases in the suite.
         *
         * @generated from field: repeated connectrpc.conformance.v1.TestCase test_cases = 3;
         */
        this.testCases = [];
        /**
         * If non-empty, the protocols to which this suite applies. If empty,
         * this suite applies to all protocols.
         *
         * @generated from field: repeated connectrpc.conformance.v1.Protocol relevant_protocols = 4;
         */
        this.relevantProtocols = [];
        /**
         * If non-empty, the HTTP versions to which this suite applies. If empty,
         * this suite applies to all HTTP versions.
         *
         * @generated from field: repeated connectrpc.conformance.v1.HTTPVersion relevant_http_versions = 5;
         */
        this.relevantHttpVersions = [];
        /**
         * If non-empty, the codecs to which this suite applies. If empty, this
         * suite applies to all codecs.
         *
         * @generated from field: repeated connectrpc.conformance.v1.Codec relevant_codecs = 6;
         */
        this.relevantCodecs = [];
        /**
         * If non-empty, the compression encodings to which this suite applies.
         * If empty, this suite applies to all encodings.
         *
         * @generated from field: repeated connectrpc.conformance.v1.Compression relevant_compressions = 7;
         */
        this.relevantCompressions = [];
        /**
         * Indicates the Connect version validation behavior that this suite
         * relies on.
         *
         * @generated from field: connectrpc.conformance.v1.TestSuite.ConnectVersionMode connect_version_mode = 8;
         */
        this.connectVersionMode = TestSuite_ConnectVersionMode.UNSPECIFIED;
        /**
         * If true, the cases in this suite rely on TLS and will only be run against
         * TLS server configurations.
         *
         * @generated from field: bool relies_on_tls = 9;
         */
        this.reliesOnTls = false;
        /**
         * If true, the cases in this suite rely on the client using TLS
         * certificates to authenticate with the server. (Should only be
         * true if relies_on_tls is also true.)
         *
         * @generated from field: bool relies_on_tls_client_certs = 10;
         */
        this.reliesOnTlsClientCerts = false;
        /**
         * If true, the cases in this suite rely on the Connect GET protocol.
         *
         * @generated from field: bool relies_on_connect_get = 11;
         */
        this.reliesOnConnectGet = false;
        /**
         * If true, the cases in this suite rely on support for limiting the
         * size of received messages. When true, mode should be set to indicate
         * whether it is the client or the server that must support the limit.
         *
         * @generated from field: bool relies_on_message_receive_limit = 12;
         */
        this.reliesOnMessageReceiveLimit = false;
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new TestSuite().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new TestSuite().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new TestSuite().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(TestSuite, a, b);
    }
}
TestSuite.runtime = proto3;
TestSuite.typeName = "connectrpc.conformance.v1.TestSuite";
TestSuite.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "mode", kind: "enum", T: proto3.getEnumType(TestSuite_TestMode) },
    { no: 3, name: "test_cases", kind: "message", T: TestCase, repeated: true },
    { no: 4, name: "relevant_protocols", kind: "enum", T: proto3.getEnumType(Protocol), repeated: true },
    { no: 5, name: "relevant_http_versions", kind: "enum", T: proto3.getEnumType(HTTPVersion), repeated: true },
    { no: 6, name: "relevant_codecs", kind: "enum", T: proto3.getEnumType(Codec), repeated: true },
    { no: 7, name: "relevant_compressions", kind: "enum", T: proto3.getEnumType(Compression), repeated: true },
    { no: 8, name: "connect_version_mode", kind: "enum", T: proto3.getEnumType(TestSuite_ConnectVersionMode) },
    { no: 9, name: "relies_on_tls", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 10, name: "relies_on_tls_client_certs", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 11, name: "relies_on_connect_get", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 12, name: "relies_on_message_receive_limit", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
]);
/**
 * @generated from enum connectrpc.conformance.v1.TestSuite.TestMode
 */
export var TestSuite_TestMode;
(function (TestSuite_TestMode) {
    /**
     * Used when the test suite does not apply to a particular mode. Such tests
     * are run, regardless of the current test mode, to verify both clients and
     * servers under test.
     *
     * @generated from enum value: TEST_MODE_UNSPECIFIED = 0;
     */
    TestSuite_TestMode[TestSuite_TestMode["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * Indicates tests that are intended to be used only for a client-under-test.
     * These cases can induce very particular and/or aberrant responses from the
     * reference server, to verify how the client reacts to such responses.
     *
     * @generated from enum value: TEST_MODE_CLIENT = 1;
     */
    TestSuite_TestMode[TestSuite_TestMode["CLIENT"] = 1] = "CLIENT";
    /**
     * Indicates tests that are intended to be used only for a server-under-test.
     * These cases can induce very particular and/or aberrant requests from the
     * reference client, to verify how the server reacts to such requests.
     *
     * @generated from enum value: TEST_MODE_SERVER = 2;
     */
    TestSuite_TestMode[TestSuite_TestMode["SERVER"] = 2] = "SERVER";
})(TestSuite_TestMode || (TestSuite_TestMode = {}));
// Retrieve enum metadata with: proto3.getEnumType(TestSuite_TestMode)
proto3.util.setEnumType(TestSuite_TestMode, "connectrpc.conformance.v1.TestSuite.TestMode", [
    { no: 0, name: "TEST_MODE_UNSPECIFIED" },
    { no: 1, name: "TEST_MODE_CLIENT" },
    { no: 2, name: "TEST_MODE_SERVER" },
]);
/**
 * @generated from enum connectrpc.conformance.v1.TestSuite.ConnectVersionMode
 */
export var TestSuite_ConnectVersionMode;
(function (TestSuite_ConnectVersionMode) {
    /**
     * Used when the suite is agnostic to the server's validation
     * behavior.
     *
     * @generated from enum value: CONNECT_VERSION_MODE_UNSPECIFIED = 0;
     */
    TestSuite_ConnectVersionMode[TestSuite_ConnectVersionMode["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * Used when the suite relies on the server validating the presence
     * and correctness of the Connect version header or query param.
     *
     * @generated from enum value: CONNECT_VERSION_MODE_REQUIRE = 1;
     */
    TestSuite_ConnectVersionMode[TestSuite_ConnectVersionMode["REQUIRE"] = 1] = "REQUIRE";
    /**
     * Used when the suite relies on the server ignore any Connect
     * header or query param.
     *
     * @generated from enum value: CONNECT_VERSION_MODE_IGNORE = 2;
     */
    TestSuite_ConnectVersionMode[TestSuite_ConnectVersionMode["IGNORE"] = 2] = "IGNORE";
})(TestSuite_ConnectVersionMode || (TestSuite_ConnectVersionMode = {}));
// Retrieve enum metadata with: proto3.getEnumType(TestSuite_ConnectVersionMode)
proto3.util.setEnumType(TestSuite_ConnectVersionMode, "connectrpc.conformance.v1.TestSuite.ConnectVersionMode", [
    { no: 0, name: "CONNECT_VERSION_MODE_UNSPECIFIED" },
    { no: 1, name: "CONNECT_VERSION_MODE_REQUIRE" },
    { no: 2, name: "CONNECT_VERSION_MODE_IGNORE" },
]);
/**
 * @generated from message connectrpc.conformance.v1.TestCase
 */
export class TestCase extends Message {
    constructor(data) {
        super();
        /**
         * To support extremely large messages, as well as very precisely-sized
         * messages, without having to encode them fully or perfectly in YAML
         * test cases, this value can be specified. When non-empty, this value
         * should have no more entries than there are messages in the request
         * stream. The first value is applied to the first request message, and
         * so on. For each entry, if the size is present, it is used to expand
         * the data field in the request (which is actually part of the response
         * definition). The specified size is added to the current limit on
         * message size that the server will accept. That sum is the size of the
         * the serialized message that will be sent, and the data field will be
         * padded as needed to reach that size.
         *
         * @generated from field: repeated connectrpc.conformance.v1.TestCase.ExpandedSize expand_requests = 2;
         */
        this.expandRequests = [];
        /**
         * When expected_response indicates that an error is expected, in some cases, the
         * actual error code returned may be flexible. In that case, this field provides
         * other acceptable error codes, in addition to the one indicated in the
         * expected_response. As long as the actual error's code matches any of these, the
         * error is considered conformant, and the test case can pass.
         *
         * @generated from field: repeated connectrpc.conformance.v1.Code other_allowed_error_codes = 4;
         */
        this.otherAllowedErrorCodes = [];
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new TestCase().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new TestCase().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new TestCase().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(TestCase, a, b);
    }
}
TestCase.runtime = proto3;
TestCase.typeName = "connectrpc.conformance.v1.TestCase";
TestCase.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "request", kind: "message", T: ClientCompatRequest },
    { no: 2, name: "expand_requests", kind: "message", T: TestCase_ExpandedSize, repeated: true },
    { no: 3, name: "expected_response", kind: "message", T: ClientResponseResult },
    { no: 4, name: "other_allowed_error_codes", kind: "enum", T: proto3.getEnumType(Code), repeated: true },
]);
/**
 * @generated from message connectrpc.conformance.v1.TestCase.ExpandedSize
 */
export class TestCase_ExpandedSize extends Message {
    constructor(data) {
        super();
        proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new TestCase_ExpandedSize().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new TestCase_ExpandedSize().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new TestCase_ExpandedSize().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return proto3.util.equals(TestCase_ExpandedSize, a, b);
    }
}
TestCase_ExpandedSize.runtime = proto3;
TestCase_ExpandedSize.typeName = "connectrpc.conformance.v1.TestCase.ExpandedSize";
TestCase_ExpandedSize.fields = proto3.util.newFieldList(() => [
    { no: 1, name: "size_relative_to_limit", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
]);

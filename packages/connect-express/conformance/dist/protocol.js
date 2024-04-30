// Copyright 2021-2024 The Connect Authors
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
import { ConnectError, Code } from "@connectrpc/connect";
import { Error as ConformanceError, Header as ConformanceHeader, ConformancePayload_RequestInfo, } from "./gen/connectrpc/conformance/v1/service_pb.js";
import { Code as ConformanceCode } from "./gen/connectrpc/conformance/v1/config_pb.js";
import { createRegistry, Any, Message } from "@bufbuild/protobuf";
const detailsRegitry = createRegistry(ConformancePayload_RequestInfo);
export function connectErrorFromProto(err) {
    var _a;
    // The ConnectError constructor accepts messages for details.
    // The conformance error details are the raw google.protobuf.Any messages.
    // We need to unpack the Any messages for connect to represent them accurately.
    return new ConnectError((_a = err.message) !== null && _a !== void 0 ? _a : "", err.code, undefined, err.details.map((d) => {
        const m = d.unpack(detailsRegitry);
        if (m === undefined) {
            throw new Error(`Cannot unpack ${d.typeUrl}`);
        }
        return m;
    }));
}
export function convertToProtoError(err) {
    if (err === undefined) {
        return undefined;
    }
    const details = [];
    for (const detail of err.details) {
        if (detail instanceof Message) {
            details.push(Any.pack(detail));
        }
        else {
            details.push(new Any({
                typeUrl: "type.googleapis.com/" + detail.type,
                value: detail.value,
            }));
        }
    }
    return new ConformanceError({
        code: err.code,
        message: err.rawMessage,
        details,
    });
}
export function convertToProtoHeaders(headers) {
    const result = [];
    headers.forEach((value, key) => {
        result.push(new ConformanceHeader({
            name: key,
            value: [value],
        }));
    });
    return result;
}
export function appendProtoHeaders(headers, protoHeaders) {
    for (const header of protoHeaders) {
        for (const value of header.value) {
            headers.append(header.name, value);
        }
    }
}
export function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * Input from the conformance runner is a stream of size-delimited buffers.
 *
 * This function reads the stream and yields the buffers. Each buffer represents a
 *  a ClientCompatRequest.
 */
export function readSizeDelimitedBuffers(stream) {
    return __asyncGenerator(this, arguments, function* readSizeDelimitedBuffers_1() {
        var _a, e_1, _b, _c;
        // append chunk to buffer, returning updated buffer
        function append(buffer, chunk) {
            const n = new Uint8Array(buffer.byteLength + chunk.byteLength);
            n.set(buffer);
            n.set(chunk, buffer.length);
            return n;
        }
        let buffer = new Uint8Array(0);
        try {
            for (var _d = true, stream_1 = __asyncValues(stream), stream_1_1; stream_1_1 = yield __await(stream_1.next()), _a = stream_1_1.done, !_a; _d = true) {
                _c = stream_1_1.value;
                _d = false;
                const chunk = _c;
                buffer = append(buffer, chunk);
                for (;;) {
                    if (buffer.byteLength < 4) {
                        // size is incomplete, buffer more data
                        break;
                    }
                    const size = new DataView(buffer.buffer.slice(buffer.byteOffset)).getUint32(0);
                    if (size + 4 > buffer.byteLength) {
                        // message is incomplete, buffer more data
                        break;
                    }
                    yield yield __await(buffer.subarray(4, size + 4));
                    buffer = buffer.subarray(size + 4);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = stream_1.return)) yield __await(_b.call(stream_1));
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (buffer.byteLength > 0) {
            throw new Error("incomplete data");
        }
    });
}
/**
 * Output to the conformance runner is a size-delimited buffer.
 *
 * This function takes a buffer and returns a size-delimited buffer.
 */
export function writeSizeDelimitedBuffer(buffer) {
    const sizeDelimited = new Uint8Array(4 + buffer.byteLength);
    new DataView(sizeDelimited.buffer).setUint32(0, buffer.byteLength);
    sizeDelimited.set(buffer, 4);
    return sizeDelimited;
}

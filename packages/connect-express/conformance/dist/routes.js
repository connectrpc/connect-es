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
import { ConformanceService } from "./gen/connectrpc/conformance/v1/service_connect.js";
import { Any } from "@bufbuild/protobuf";
import { ConformancePayload, ConformancePayload_RequestInfo, } from "./gen/connectrpc/conformance/v1/service_pb.js";
import { appendProtoHeaders, connectErrorFromProto, convertToProtoHeaders, wait, } from "./protocol.js";
function createRequestInfo(ctx, reqs) {
    const timeoutMs = ctx.timeoutMs();
    return new ConformancePayload_RequestInfo({
        requestHeaders: convertToProtoHeaders(ctx.requestHeader),
        requests: reqs,
        timeoutMs: timeoutMs !== undefined ? BigInt(timeoutMs) : undefined,
    });
}
async function handleUnaryResponse(def, reqs, ctx) {
    var _a, _b;
    appendProtoHeaders(ctx.responseHeader, (_a = def === null || def === void 0 ? void 0 : def.responseHeaders) !== null && _a !== void 0 ? _a : []);
    appendProtoHeaders(ctx.responseTrailer, (_b = def === null || def === void 0 ? void 0 : def.responseTrailers) !== null && _b !== void 0 ? _b : []);
    const reqInfo = createRequestInfo(ctx, reqs);
    if ((def === null || def === void 0 ? void 0 : def.response.case) === "error") {
        def.response.value.details.push(Any.pack(reqInfo));
        throw connectErrorFromProto(def.response.value);
    }
    if ((def === null || def === void 0 ? void 0 : def.responseDelayMs) !== undefined) {
        await wait(def.responseDelayMs);
    }
    return {
        payload: new ConformancePayload({
            requestInfo: createRequestInfo(ctx, reqs),
            data: def === null || def === void 0 ? void 0 : def.response.value,
        }),
    };
}
export default ({ service }) => {
    service(ConformanceService, {
        unary(req, ctx) {
            return handleUnaryResponse(req.responseDefinition, [Any.pack(req)], ctx);
        },
        idempotentUnary(req, ctx) {
            return handleUnaryResponse(req.responseDefinition, [Any.pack(req)], ctx);
        },
        async clientStream(reqIt, ctx) {
            var _a, e_1, _b, _c;
            let def;
            const reqs = [];
            try {
                for (var _d = true, reqIt_1 = __asyncValues(reqIt), reqIt_1_1; reqIt_1_1 = await reqIt_1.next(), _a = reqIt_1_1.done, !_a; _d = true) {
                    _c = reqIt_1_1.value;
                    _d = false;
                    const req = _c;
                    if (def === undefined) {
                        def = req.responseDefinition;
                    }
                    reqs.push(Any.pack(req));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = reqIt_1.return)) await _b.call(reqIt_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return handleUnaryResponse(def, reqs, ctx);
        },
        serverStream(req, ctx) {
            return __asyncGenerator(this, arguments, function* serverStream_1() {
                var _a, _b, _c;
                const def = req.responseDefinition;
                appendProtoHeaders(ctx.responseHeader, (_a = def === null || def === void 0 ? void 0 : def.responseHeaders) !== null && _a !== void 0 ? _a : []);
                appendProtoHeaders(ctx.responseTrailer, (_b = def === null || def === void 0 ? void 0 : def.responseTrailers) !== null && _b !== void 0 ? _b : []);
                const anyReq = Any.pack(req);
                let reqInfo = createRequestInfo(ctx, [anyReq]);
                for (const res of (_c = def === null || def === void 0 ? void 0 : def.responseData) !== null && _c !== void 0 ? _c : []) {
                    yield __await(wait(def.responseDelayMs));
                    yield yield __await({
                        payload: new ConformancePayload({
                            requestInfo: reqInfo,
                            data: res,
                        }),
                    });
                    // Only echo back the request info in the first response
                    reqInfo = undefined;
                }
                if ((def === null || def === void 0 ? void 0 : def.error) !== undefined) {
                    if (def.responseData.length === 0) {
                        def.error.details.push(Any.pack(createRequestInfo(ctx, [anyReq])));
                    }
                    throw connectErrorFromProto(def.error);
                }
            });
        },
        bidiStream(reqIt, ctx) {
            return __asyncGenerator(this, arguments, function* bidiStream_1() {
                var _a, e_2, _b, _c;
                var _d, _e, _f, _g;
                let def;
                let fullDuplex = false;
                let resNum = 0;
                let reqs = [];
                try {
                    for (var _h = true, reqIt_2 = __asyncValues(reqIt), reqIt_2_1; reqIt_2_1 = yield __await(reqIt_2.next()), _a = reqIt_2_1.done, !_a; _h = true) {
                        _c = reqIt_2_1.value;
                        _h = false;
                        const req = _c;
                        if (def === undefined) {
                            def = req.responseDefinition;
                            appendProtoHeaders(ctx.responseHeader, (_d = def === null || def === void 0 ? void 0 : def.responseHeaders) !== null && _d !== void 0 ? _d : []);
                            appendProtoHeaders(ctx.responseTrailer, (_e = def === null || def === void 0 ? void 0 : def.responseTrailers) !== null && _e !== void 0 ? _e : []);
                            fullDuplex = req.fullDuplex;
                        }
                        reqs.push(Any.pack(req));
                        if (!fullDuplex) {
                            continue;
                        }
                        // fullDuplex, so send one of the desired responses each time we get a message on the stream
                        if (def === undefined || resNum >= def.responseData.length) {
                            break;
                        }
                        yield __await(wait(def.responseDelayMs));
                        yield yield __await({
                            payload: new ConformancePayload({
                                requestInfo: createRequestInfo(ctx, [Any.pack(req)]),
                                data: def.responseData[resNum],
                            }),
                        });
                        resNum++;
                        reqs = [];
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (!_h && !_a && (_b = reqIt_2.return)) yield __await(_b.call(reqIt_2));
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                // If we still have responses left to send, flush them now. This accommodates
                // both scenarios of half duplex (we haven't sent any responses yet) or full duplex
                // where the requested responses are greater than the total requests.
                const reqInfo = createRequestInfo(ctx, reqs);
                for (; resNum < ((_f = def === null || def === void 0 ? void 0 : def.responseData.length) !== null && _f !== void 0 ? _f : 0); resNum++) {
                    yield __await(wait((_g = def === null || def === void 0 ? void 0 : def.responseDelayMs) !== null && _g !== void 0 ? _g : 0));
                    yield yield __await({
                        payload: new ConformancePayload({
                            requestInfo: resNum === 0 ? reqInfo : undefined,
                            data: def === null || def === void 0 ? void 0 : def.responseData[resNum],
                        }),
                    });
                }
                if ((def === null || def === void 0 ? void 0 : def.error) !== undefined) {
                    if (def.responseData.length === 0) {
                        def.error.details.push(Any.pack(reqInfo));
                    }
                    throw connectErrorFromProto(def.error);
                }
            });
        },
    });
};

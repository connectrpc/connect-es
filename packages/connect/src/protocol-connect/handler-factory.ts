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

import type { JsonValue, MethodInfo } from "@bufbuild/protobuf";
import {
  Message,
  MethodIdempotency,
  MethodKind,
  protoBase64,
} from "@bufbuild/protobuf";
import { Code } from "../code.js";
import { ConnectError } from "../connect-error.js";
import type { MethodImplSpec } from "../implementation.js";
import { createHandlerContext } from "../implementation.js";
import {
  contentTypeStreamJson,
  contentTypeStreamProto,
  contentTypeStreamRegExp,
  contentTypeUnaryJson,
  contentTypeUnaryProto,
  contentTypeUnaryRegExp,
  parseContentType,
  parseEncodingQuery,
} from "./content-type.js";
import type { EndStreamResponse } from "./end-stream.js";
import { createEndStreamSerialization, endStreamFlag } from "./end-stream.js";
import { errorToJsonBytes } from "./error-json.js";
import {
  headerContentType,
  headerStreamAcceptEncoding,
  headerStreamEncoding,
  headerTimeout,
  headerUnaryAcceptEncoding,
  headerUnaryContentLength,
  headerUnaryEncoding,
} from "./headers.js";
import { codeToHttpStatus } from "./http-status.js";
import { parseTimeout } from "./parse-timeout.js";
import {
  paramBase64,
  paramCompression,
  paramEncoding,
  paramMessage,
} from "./query-params.js";
import { trailerMux } from "./trailer-mux.js";
import {
  requireProtocolVersionHeader,
  requireProtocolVersionParam,
} from "./version.js";
import { compressionNegotiate } from "../protocol/compression.js";
import type { Compression } from "../protocol/compression.js";
import { createMethodSerializationLookup } from "../protocol/serialization.js";
import type {
  MethodSerializationLookup,
  Serialization,
} from "../protocol/serialization.js";
import { validateUniversalHandlerOptions } from "../protocol/universal-handler.js";
import type { UniversalHandlerOptions } from "../protocol/universal-handler.js";
import {
  assertByteStreamRequest,
  uResponseMethodNotAllowed,
  uResponseOk,
  uResponseUnsupportedMediaType,
} from "../protocol/universal.js";
import type {
  UniversalHandlerFn,
  UniversalServerRequest,
  UniversalServerResponse,
} from "../protocol/universal.js";
import {
  createAsyncIterable,
  pipe,
  readAllBytes,
  transformCatchFinally,
  transformCompressEnvelope,
  transformDecompressEnvelope,
  transformJoinEnvelopes,
  transformParseEnvelope,
  transformPrepend,
  transformSerializeEnvelope,
  transformSplitEnvelope,
  untilFirst,
} from "../protocol/async-iterable.js";
import { contentTypeMatcher } from "../protocol/content-type-matcher.js";
import { createMethodUrl } from "../protocol/create-method-url.js";
import type { EnvelopedMessage } from "../protocol/envelope.js";
import {
  invokeUnaryImplementation,
  transformInvokeImplementation,
} from "../protocol/invoke-implementation.js";
import type { ProtocolHandlerFactory } from "../protocol/protocol-handler-factory.js";

const protocolName = "connect";
const methodPost = "POST";
const methodGet = "GET";

/**
 * Create a factory that creates Connect handlers.
 */
export function createHandlerFactory(
  options: Partial<UniversalHandlerOptions>,
): ProtocolHandlerFactory {
  const opt = validateUniversalHandlerOptions(options);
  const endStreamSerialization = createEndStreamSerialization(opt.jsonOptions);

  function fact(spec: MethodImplSpec) {
    let h: UniversalHandlerFn;
    let contentTypeRegExp: RegExp;
    const serialization = createMethodSerializationLookup(
      spec.method,
      opt.binaryOptions,
      opt.jsonOptions,
      opt,
    );
    switch (spec.kind) {
      case MethodKind.Unary:
        contentTypeRegExp = contentTypeUnaryRegExp;
        h = createUnaryHandler(opt, spec, serialization);
        break;
      default:
        contentTypeRegExp = contentTypeStreamRegExp;
        h = createStreamHandler(
          opt,
          spec,
          serialization,
          endStreamSerialization,
        );
        break;
    }
    const allowedMethods = [methodPost];
    if (spec.method.idempotency === MethodIdempotency.NoSideEffects) {
      allowedMethods.push(methodGet);
    }
    return Object.assign(h, {
      protocolNames: [protocolName],
      supportedContentType: contentTypeMatcher(contentTypeRegExp),
      allowedMethods,
      requestPath: createMethodUrl("/", spec.service, spec.method),
      service: spec.service,
      method: spec.method,
    });
  }

  fact.protocolName = protocolName;
  return fact;
}

function createUnaryHandler<I extends Message<I>, O extends Message<O>>(
  opt: UniversalHandlerOptions,
  spec: MethodImplSpec<I, O> & { kind: MethodKind.Unary },
  serialization: MethodSerializationLookup<I, O>,
) {
  return async function handle(
    req: UniversalServerRequest,
  ): Promise<UniversalServerResponse> {
    const isGet = req.method == methodGet;
    if (isGet && spec.method.idempotency != MethodIdempotency.NoSideEffects) {
      return uResponseMethodNotAllowed;
    }
    const queryParams = new URL(req.url).searchParams;
    const compressionRequested = isGet
      ? queryParams.get(paramCompression)
      : req.header.get(headerUnaryEncoding);
    const type = isGet
      ? parseEncodingQuery(queryParams.get(paramEncoding))
      : parseContentType(req.header.get(headerContentType));
    if (type == undefined || type.stream) {
      return uResponseUnsupportedMediaType;
    }
    const timeout = parseTimeout(
      req.header.get(headerTimeout),
      opt.maxTimeoutMs,
    );
    const context = createHandlerContext({
      ...spec,
      requestMethod: req.method,
      protocolName,
      timeoutMs: timeout.timeoutMs,
      shutdownSignal: opt.shutdownSignal,
      requestSignal: req.signal,
      requestHeader: req.header,
      url: req.url,
      responseHeader: {
        [headerContentType]: type.binary
          ? contentTypeUnaryProto
          : contentTypeUnaryJson,
      },
      contextValues: req.contextValues,
    });
    const compression = compressionNegotiate(
      opt.acceptCompression,
      compressionRequested,
      req.header.get(headerUnaryAcceptEncoding),
      headerUnaryAcceptEncoding,
    );
    let status = uResponseOk.status;
    let body: Uint8Array;
    try {
      if (opt.requireConnectProtocolHeader) {
        if (isGet) {
          requireProtocolVersionParam(queryParams);
        } else {
          requireProtocolVersionHeader(req.header);
        }
      }
      // raise compression error to serialize it as a error response
      if (compression.error) {
        throw compression.error;
      }
      // raise timeout parsing error to serialize it as a trailer status
      if (timeout.error) {
        throw timeout.error;
      }
      let reqBody: Uint8Array | JsonValue;
      if (isGet) {
        reqBody = await readUnaryMessageFromQuery(
          opt.readMaxBytes,
          compression.request,
          queryParams,
        );
      } else {
        reqBody = await readUnaryMessageFromBody(
          opt.readMaxBytes,
          compression.request,
          req,
        );
      }
      const input = parseUnaryMessage(
        spec.method,
        type.binary,
        serialization,
        reqBody,
      );
      const output = await invokeUnaryImplementation(
        spec,
        context,
        input,
        opt.interceptors,
      );
      body = serialization.getO(type.binary).serialize(output);
    } catch (e) {
      let error: ConnectError | undefined;
      if (e instanceof ConnectError) {
        error = e;
      } else {
        error = new ConnectError(
          "internal error",
          Code.Internal,
          undefined,
          undefined,
          e,
        );
      }
      status = codeToHttpStatus(error.code);
      context.responseHeader.set(headerContentType, contentTypeUnaryJson);
      error.metadata.forEach((value, key) => {
        context.responseHeader.set(key, value);
      });
      body = errorToJsonBytes(error, opt.jsonOptions);
    } finally {
      context.cleanup();
    }
    if (compression.response && body.byteLength >= opt.compressMinBytes) {
      body = await compression.response.compress(body);
      context.responseHeader.set(
        headerUnaryEncoding,
        compression.response.name,
      );
    }
    const header = trailerMux(context.responseHeader, context.responseTrailer);
    header.set(headerUnaryContentLength, body.byteLength.toString(10));
    return {
      status,
      body: createAsyncIterable([body]),
      header,
    };
  };
}

async function readUnaryMessageFromBody(
  readMaxBytes: number,
  compression: Compression | null,
  request: UniversalServerRequest,
): Promise<Uint8Array | JsonValue> {
  if (
    typeof request.body == "object" &&
    request.body !== null &&
    Symbol.asyncIterator in request.body
  ) {
    let reqBytes = await readAllBytes(
      request.body,
      readMaxBytes,
      request.header.get(headerUnaryContentLength),
    );
    if (compression) {
      reqBytes = await compression.decompress(reqBytes, readMaxBytes);
    }
    return reqBytes;
  }
  return request.body;
}

async function readUnaryMessageFromQuery(
  readMaxBytes: number,
  compression: Compression | null,
  queryParams: URLSearchParams,
): Promise<Uint8Array> {
  const base64 = queryParams.get(paramBase64);
  const message = queryParams.get(paramMessage) ?? "";
  let decoded: Uint8Array;
  if (base64 === "1") {
    decoded = protoBase64.dec(message);
  } else {
    decoded = new TextEncoder().encode(message);
  }
  if (compression) {
    decoded = await compression.decompress(decoded, readMaxBytes);
  }
  return decoded;
}

function parseUnaryMessage<I extends Message<I>, O extends Message<O>>(
  method: MethodInfo<I, O>,
  useBinaryFormat: boolean,
  serialization: MethodSerializationLookup<I, O>,
  input: Uint8Array | JsonValue,
): I {
  if (input instanceof Uint8Array) {
    return serialization.getI(useBinaryFormat).parse(input);
  }
  if (useBinaryFormat) {
    throw new ConnectError(
      "received parsed JSON request body, but content-type indicates binary format",
      Code.Internal,
    );
  }
  try {
    return method.I.fromJson(input);
  } catch (e) {
    throw ConnectError.from(e, Code.InvalidArgument);
  }
}

function createStreamHandler<I extends Message<I>, O extends Message<O>>(
  opt: UniversalHandlerOptions,
  spec: MethodImplSpec<I, O>,
  serialization: MethodSerializationLookup<I, O>,
  endStreamSerialization: Serialization<EndStreamResponse>,
) {
  return async function handle(
    req: UniversalServerRequest,
  ): Promise<UniversalServerResponse> {
    assertByteStreamRequest(req);
    const type = parseContentType(req.header.get(headerContentType));
    if (type == undefined || !type.stream) {
      return uResponseUnsupportedMediaType;
    }
    if (req.method !== methodPost) {
      return uResponseMethodNotAllowed;
    }
    const timeout = parseTimeout(
      req.header.get(headerTimeout),
      opt.maxTimeoutMs,
    );
    const context = createHandlerContext({
      ...spec,
      requestMethod: req.method,
      protocolName,
      timeoutMs: timeout.timeoutMs,
      shutdownSignal: opt.shutdownSignal,
      requestSignal: req.signal,
      requestHeader: req.header,
      url: req.url,
      responseHeader: {
        [headerContentType]: type.binary
          ? contentTypeStreamProto
          : contentTypeStreamJson,
      },
      contextValues: req.contextValues,
    });
    const compression = compressionNegotiate(
      opt.acceptCompression,
      req.header.get(headerStreamEncoding),
      req.header.get(headerStreamAcceptEncoding),
      headerStreamAcceptEncoding,
    );
    if (compression.response) {
      context.responseHeader.set(
        headerStreamEncoding,
        compression.response.name,
      );
    }
    // We split the pipeline into two parts: The request iterator, and the
    // response iterator. We do this because the request iterator is responsible
    // for parsing the request body, and we don't want write errors of the response
    // iterator to affect the request iterator.
    const inputIt = pipe(
      req.body,
      transformPrepend<Uint8Array>(() => {
        if (opt.requireConnectProtocolHeader) {
          requireProtocolVersionHeader(req.header);
        }
        // raise compression error to serialize it as the end stream response
        if (compression.error) throw compression.error;
        // raise timeout parsing error to serialize it as a trailer status
        if (timeout.error) throw timeout.error;
        return undefined;
      }),
      transformSplitEnvelope(opt.readMaxBytes),
      transformDecompressEnvelope(compression.request, opt.readMaxBytes),
      transformParseEnvelope(
        serialization.getI(type.binary),
        endStreamFlag,
        // if we set `null` here, an end-stream-message in the request
        // raises an error, but we want to be lenient
      ),
    );
    const it = transformInvokeImplementation<I, O>(
      spec,
      context,
      opt.interceptors,
    )(inputIt)[Symbol.asyncIterator]();
    const outputIt = pipe(
      // We wrap the iterator in an async iterator to ensure that the
      // abort signal is aborted when the iterator is done.
      {
        [Symbol.asyncIterator]() {
          return {
            next: () => it.next(),
            throw: (e: unknown) => {
              context.abort(e);
              return it.throw?.(e) ?? Promise.reject({ done: true });
            },
            return: (v: unknown) => {
              context.abort();
              return (
                it.return?.(v) ?? Promise.resolve({ done: true, value: v })
              );
            },
          };
        },
      },
      transformSerializeEnvelope(serialization.getO(type.binary)),
      transformCatchFinally<EnvelopedMessage>((e) => {
        context.abort();
        const end: EndStreamResponse = {
          metadata: context.responseTrailer,
        };
        if (e instanceof ConnectError) {
          end.error = e;
        } else if (e !== undefined) {
          end.error = new ConnectError(
            "internal error",
            Code.Internal,
            undefined,
            undefined,
            e,
          );
        }
        return {
          flags: endStreamFlag,
          data: endStreamSerialization.serialize(end),
        };
      }),
      transformCompressEnvelope(compression.response, opt.compressMinBytes),
      transformJoinEnvelopes(),
      { propagateDownStreamError: true },
    );
    return {
      ...uResponseOk,
      // We wait for the first response body bytes before resolving, so that
      // implementations have a chance to add headers before an adapter commits
      // them to the wire.
      body: await untilFirst(outputIt),
      header: context.responseHeader,
    };
  };
}

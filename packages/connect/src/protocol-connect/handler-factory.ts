// Copyright 2021-2023 Buf Technologies, Inc.
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

import { Message, MethodInfo, MethodKind } from "@bufbuild/protobuf";
import { ConnectError, connectErrorFromReason } from "../connect-error.js";
import { Code } from "../code.js";
import { createHandlerContext, MethodImplSpec } from "../implementation.js";
import {
  assertByteStreamRequest,
  Compression,
  compressionNegotiate,
  contentTypeMatcher,
  createMethodSerializationLookup,
  createMethodUrl,
  EnvelopedMessage,
  invokeUnaryImplementation,
  MethodSerializationLookup,
  validateUniversalHandlerOptions,
  pipe,
  ProtocolHandlerFactory,
  readAllBytes,
  Serialization,
  transformCatchFinally,
  transformCompressEnvelope,
  transformDecompressEnvelope,
  transformInvokeImplementation,
  transformJoinEnvelopes,
  transformParseEnvelope,
  transformPrepend,
  transformSerializeEnvelope,
  transformSplitEnvelope,
  UniversalHandlerFn,
  UniversalHandlerOptions,
  UniversalServerRequest,
  UniversalServerResponse,
  uResponseMethodNotAllowed,
  uResponseOk,
  uResponseUnsupportedMediaType,
} from "../protocol/index.js";
import {
  contentTypeStreamJson,
  contentTypeStreamProto,
  contentTypeStreamRegExp,
  contentTypeUnaryJson,
  contentTypeUnaryProto,
  contentTypeUnaryRegExp,
  parseContentType,
} from "./content-type.js";
import {
  createEndStreamSerialization,
  endStreamFlag,
  EndStreamResponse,
} from "./end-stream.js";
import {
  headerContentType,
  headerStreamAcceptEncoding,
  headerStreamEncoding,
  headerUnaryAcceptEncoding,
  headerUnaryContentLength,
  headerUnaryEncoding,
} from "./headers.js";
import { codeToHttpStatus } from "./http-status.js";
import { errorToJsonBytes } from "./error-json.js";
import { trailerMux } from "./trailer-mux.js";
import { requireProtocolVersion } from "./version.js";

const protocolName = "connect";
const methodPost = "POST";

/**
 * Create a factory that creates Connect handlers.
 */
export function createHandlerFactory(
  options: Partial<UniversalHandlerOptions>
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
      opt
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
          endStreamSerialization
        );
        break;
    }
    return Object.assign(h, {
      protocolNames: [protocolName],
      supportedContentType: contentTypeMatcher(contentTypeRegExp),
      allowedMethods: [methodPost],
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
  serialization: MethodSerializationLookup<I, O>
) {
  return async function handle(
    req: UniversalServerRequest
  ): Promise<UniversalServerResponse> {
    const type = parseContentType(req.header.get(headerContentType));
    if (type == undefined || type.stream) {
      return uResponseUnsupportedMediaType;
    }
    if (req.method !== methodPost) {
      return uResponseMethodNotAllowed;
    }
    const context = createHandlerContext(spec, req.header, {
      [headerContentType]: type.binary
        ? contentTypeUnaryProto
        : contentTypeUnaryJson,
    });
    const compression = compressionNegotiate(
      opt.acceptCompression,
      req.header.get(headerUnaryEncoding),
      req.header.get(headerUnaryAcceptEncoding),
      headerUnaryAcceptEncoding
    );
    let status = uResponseOk.status;
    let body: Uint8Array;
    try {
      if (opt.requireConnectProtocolHeader) {
        requireProtocolVersion(req.header);
      }
      // raise compression error to serialize it as a error response
      if (compression.error) {
        throw compression.error;
      }
      const input = await parseUnaryInput(
        spec.method,
        serialization,
        compression.request,
        opt.readMaxBytes,
        type.binary,
        req
      );
      const output = await invokeUnaryImplementation(spec, context, input);
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
          e
        );
      }
      status = codeToHttpStatus(error.code);
      context.responseHeader.set(headerContentType, contentTypeUnaryJson);
      error.metadata.forEach((value, key) => {
        context.responseHeader.set(key, value);
      });
      body = errorToJsonBytes(error, opt.jsonOptions);
    }
    if (compression.response && body.byteLength >= opt.compressMinBytes) {
      body = await compression.response.compress(body);
      context.responseHeader.set(
        headerUnaryEncoding,
        compression.response.name
      );
    }
    const header = trailerMux(context.responseHeader, context.responseTrailer);
    header.set(headerUnaryContentLength, body.byteLength.toString(10));
    return {
      status,
      body,
      header,
    };
  };
}

async function parseUnaryInput<I extends Message<I>, O extends Message<O>>(
  method: MethodInfo<I, O>,
  serialization: MethodSerializationLookup<I, O>,
  compression: Compression | null,
  readMaxBytes: number,
  useBinaryFormat: boolean,
  request: UniversalServerRequest
): Promise<I> {
  if (
    typeof request.body == "object" &&
    request.body !== null &&
    Symbol.asyncIterator in request.body
  ) {
    let reqBytes = await readAllBytes(
      request.body,
      readMaxBytes,
      request.header.get(headerUnaryContentLength)
    );
    if (compression) {
      reqBytes = await compression.decompress(reqBytes, readMaxBytes);
    }
    return serialization.getI(useBinaryFormat).parse(reqBytes);
  }
  if (useBinaryFormat) {
    throw new ConnectError(
      "received parsed JSON request body, but content-type indicates binary format",
      Code.Internal
    );
  }
  try {
    return method.I.fromJson(request.body);
  } catch (e) {
    throw connectErrorFromReason(e, Code.InvalidArgument);
  }
}

function createStreamHandler<I extends Message<I>, O extends Message<O>>(
  opt: UniversalHandlerOptions,
  spec: MethodImplSpec<I, O>,
  serialization: MethodSerializationLookup<I, O>,
  endStreamSerialization: Serialization<EndStreamResponse>
) {
  // eslint-disable-next-line @typescript-eslint/require-await
  return async function handle(
    req: UniversalServerRequest
  ): Promise<UniversalServerResponse> {
    assertByteStreamRequest(req);
    const type = parseContentType(req.header.get(headerContentType));
    if (type == undefined || !type.stream) {
      return uResponseUnsupportedMediaType;
    }
    if (req.method !== methodPost) {
      return uResponseMethodNotAllowed;
    }
    const context = createHandlerContext(spec, req.header, {
      [headerContentType]: type.binary
        ? contentTypeStreamProto
        : contentTypeStreamJson,
    });
    const compression = compressionNegotiate(
      opt.acceptCompression,
      req.header.get(headerStreamEncoding),
      req.header.get(headerStreamAcceptEncoding),
      headerStreamAcceptEncoding
    );
    if (compression.response) {
      context.responseHeader.set(
        headerStreamEncoding,
        compression.response.name
      );
    }
    const outputIt = pipe(
      req.body,
      transformPrepend<Uint8Array>(() => {
        if (opt.requireConnectProtocolHeader) {
          requireProtocolVersion(req.header);
        }
        // raise compression error to serialize it as the end stream response
        if (compression.error) throw compression.error;
        return undefined;
      }),
      transformSplitEnvelope(opt.readMaxBytes),
      transformDecompressEnvelope(compression.request, opt.readMaxBytes),
      transformParseEnvelope(
        serialization.getI(type.binary),
        endStreamFlag
        // if we set `null` here, an end-stream-message in the request
        // raises an error, but we want to be lenient
      ),
      transformInvokeImplementation<I, O>(spec, context),
      transformSerializeEnvelope(serialization.getO(type.binary)),
      transformCatchFinally<EnvelopedMessage>((e) => {
        const end: EndStreamResponse = {
          metadata: context.responseTrailer,
        };
        if (e !== undefined) {
          if (e instanceof ConnectError) {
            end.error = e;
          } else {
            end.error = new ConnectError(
              "internal error",
              Code.Internal,
              undefined,
              undefined,
              e
            );
          }
        }
        return {
          flags: endStreamFlag,
          data: endStreamSerialization.serialize(end),
        };
      }),
      transformCompressEnvelope(compression.response, opt.compressMinBytes),
      transformJoinEnvelopes()
    );
    return {
      ...uResponseOk,
      body: outputIt,
      header: context.responseHeader,
    };
  };
}

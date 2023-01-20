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

import type {
  EnvelopedMessage,
  MethodSerializationLookup,
} from "@bufbuild/connect-core";
import {
  Code,
  compressedFlag,
  compressionNegotiate,
  compressionValidateOptions,
  ConnectError,
  createMethodSerializationLookup,
  createMethodUrl,
  pipe,
  pipeTo,
  Serialization,
  sinkAllBytes,
  transformCatch,
  transformCatchFinally,
  transformCompressEnvelope,
  transformDecompressEnvelope,
  transformJoinEnvelopes,
  transformParseEnvelope,
  transformPrepend,
  transformReadAllBytes,
  transformSerializeEnvelope,
  transformSplitEnvelope,
} from "@bufbuild/connect-core";
import { Message, MethodKind } from "@bufbuild/protobuf";
import {
  codeToHttpStatus,
  contentTypeStreamJson,
  contentTypeStreamProto,
  contentTypeStreamRegExp,
  contentTypeUnaryJson,
  contentTypeUnaryProto,
  contentTypeUnaryRegExp,
  createEndStreamSerialization,
  endStreamFlag,
  EndStreamResponse,
  errorToJsonBytes,
  headerContentType,
  headerStreamAcceptEncoding,
  headerStreamEncoding,
  headerUnaryAcceptEncoding,
  headerUnaryContentLength,
  headerUnaryEncoding,
  parseContentType,
  trailerMux,
} from "@bufbuild/connect-core/protocol-connect";
import type { ImplSpec } from "./implementation.js";
import {
  createHandlerContext,
  transformInvokeImplementation,
} from "./implementation.js";
import type {
  ProtocolHandlerFact,
  ProtocolHandlerFactInit,
  UniversalHandlerFn,
  UniversalRequest,
  UniversalResponse,
} from "./protocol-handler.js";
import {
  uResponseMethodNotAllowed,
  uResponseOk,
  uResponseUnsupportedMediaType,
} from "./private/universal-response-status.js";

const protocolName = "connect";
const methodPost = "POST";

/**
 * Create a factory that creates Connect handlers.
 */
export function createConnectProtocolHandler(
  options: ProtocolHandlerFactInit
): ProtocolHandlerFact {
  compressionValidateOptions(options);
  const endStreamSerialization = createEndStreamSerialization(
    options.jsonOptions
  );

  function fact(spec: ImplSpec) {
    let h: UniversalHandlerFn;
    let supportedContentType: RegExp;
    const serialization = createMethodSerializationLookup(
      spec.method,
      options.binaryOptions,
      options.jsonOptions
    );
    switch (spec.kind) {
      case MethodKind.Unary:
        supportedContentType = contentTypeUnaryRegExp;
        h = createUnaryHandler(options, spec, serialization);
        break;
      default:
        supportedContentType = contentTypeStreamRegExp;
        h = createStreamHandler(
          options,
          spec,
          serialization,
          endStreamSerialization
        );
        break;
    }
    return Object.assign(h, {
      protocolNames: [protocolName],
      supportedContentType,
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
  opt: ProtocolHandlerFactInit,
  spec: ImplSpec<I, O>,
  serialization: MethodSerializationLookup<I, O>
) {
  return async function handle(
    req: UniversalRequest
  ): Promise<UniversalResponse> {
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
    let responseStatusCode = uResponseOk.status;
    const responseBody = await pipeTo(
      req.body,
      transformPrepend<Uint8Array>(() => {
        // raise compression error to serialize it as a error response
        if (compression.error) throw compression.error;
        return undefined;
      }),
      transformReadAllBytes(
        opt.readMaxBytes,
        req.header.get(headerUnaryContentLength)
      ),
      async function* wrapInEnvelope(
        it: AsyncIterable<Uint8Array>
      ): AsyncIterable<EnvelopedMessage> {
        for await (const chunk of it) {
          yield {
            flags: compression.request ? compressedFlag : 0,
            data: chunk,
          };
        }
      },
      transformDecompressEnvelope(compression.request, opt.readMaxBytes),
      transformParseEnvelope(serialization.getI(type.binary)),
      transformInvokeImplementation<I, O>(spec, context),
      transformSerializeEnvelope(
        serialization.getO(type.binary),
        opt.writeMaxBytes
      ),
      transformCatch<EnvelopedMessage>((e) => {
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
        responseStatusCode = codeToHttpStatus(error.code);
        context.responseHeader.set(headerContentType, contentTypeUnaryJson);
        error.metadata.forEach((value, key) => {
          context.responseHeader.set(key, value);
        });
        return {
          flags: 0,
          data: errorToJsonBytes(error, opt.jsonOptions),
        };
      }),
      transformCompressEnvelope(compression.response, opt.compressMinBytes),
      async function* unwrapEnvelope(
        it: AsyncIterable<EnvelopedMessage>
      ): AsyncIterable<Uint8Array> {
        for await (const { flags, data } of it) {
          if (
            compression.response &&
            (flags & compressedFlag) === compressedFlag
          ) {
            context.responseHeader.set(
              headerUnaryEncoding,
              compression.response.name
            );
          }
          yield data;
        }
      },
      sinkAllBytes(Number.MAX_SAFE_INTEGER)
    );

    return {
      status: responseStatusCode,
      body: responseBody,
      header: trailerMux(context.responseHeader, context.responseTrailer),
    };
  };
}

function createStreamHandler<I extends Message<I>, O extends Message<O>>(
  opt: ProtocolHandlerFactInit,
  spec: ImplSpec<I, O>,
  serialization: MethodSerializationLookup<I, O>,
  endStreamSerialization: Serialization<EndStreamResponse>
) {
  return function handle(req: UniversalRequest): UniversalResponse {
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
        // raise compression error to serialize it as the end stream response
        if (compression.error) throw compression.error;
        return undefined;
      }),
      transformSplitEnvelope(opt.readMaxBytes),
      transformDecompressEnvelope(compression.request, opt.readMaxBytes),
      transformParseEnvelope(
        serialization.getI(type.binary),
        endStreamFlag,
        null
      ),
      transformInvokeImplementation<I, O>(spec, context),
      transformSerializeEnvelope(
        serialization.getO(type.binary),
        opt.writeMaxBytes
      ),
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

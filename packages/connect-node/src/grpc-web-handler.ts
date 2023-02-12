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

import {
  Code,
  compressionNegotiate,
  ConnectError,
  contentTypeMatcher,
  createMethodSerializationLookup,
  createMethodUrl,
  EnvelopedMessage,
  limitIoOptionsValidate,
  pipe,
  Serialization,
  transformCatchFinally,
  transformCompressEnvelope,
  transformDecompressEnvelope,
  transformJoinEnvelopes,
  transformParseEnvelope,
  transformPrepend,
  transformSerializeEnvelope,
  transformSplitEnvelope,
} from "@bufbuild/connect-core";
import type { Message } from "@bufbuild/protobuf";
import {
  contentTypeJson,
  contentTypeProto,
  contentTypeRegExp,
  createTrailerSerialization,
  grpcStatusOk,
  headerAcceptEncoding,
  headerContentType,
  headerEncoding,
  headerGrpcStatus,
  parseContentType,
  setTrailerStatus,
  trailerFlag,
} from "@bufbuild/connect-core/protocol-grpc-web";
import type { ImplSpec } from "./implementation.js";
import {
  createHandlerContext,
  transformInvokeImplementation,
} from "./implementation.js";
import type {
  ProtocolHandlerFact,
  ProtocolHandlerFactInit,
} from "./protocol-handler.js";
import {
  assertByteStreamRequest,
  UniversalServerRequest,
  UniversalServerResponse,
  uResponseMethodNotAllowed,
  uResponseOk,
  uResponseUnsupportedMediaType,
} from "./private/universal.js";

const protocolName = "grpc-web";
const methodPost = "POST";

/**
 * Create a factory that creates gRPC-web handlers.
 */
export function createGrpcWebProtocolHandler(
  options: ProtocolHandlerFactInit
): ProtocolHandlerFact {
  limitIoOptionsValidate(options);
  const trailerSerialization = createTrailerSerialization();

  function fact(spec: ImplSpec) {
    const h = createHandler(options, trailerSerialization, spec);
    return Object.assign(h, {
      protocolNames: [protocolName],
      allowedMethods: [methodPost],
      supportedContentType: contentTypeMatcher(contentTypeRegExp),
      requestPath: createMethodUrl("/", spec.service, spec.method),
      service: spec.service,
      method: spec.method,
    });
  }

  fact.protocolName = protocolName;
  return fact;
}

function createHandler<I extends Message<I>, O extends Message<O>>(
  opt: ProtocolHandlerFactInit,
  trailerSerialization: Serialization<Headers>,
  spec: ImplSpec<I, O>
) {
  const serialization = createMethodSerializationLookup(
    spec.method,
    opt.binaryOptions,
    opt.jsonOptions,
    opt
  );
  return function handle(req: UniversalServerRequest): UniversalServerResponse {
    assertByteStreamRequest(req);
    const type = parseContentType(req.header.get(headerContentType));
    if (type == undefined || type.text) {
      return uResponseUnsupportedMediaType;
    }
    if (req.method !== methodPost) {
      return uResponseMethodNotAllowed;
    }
    const context = createHandlerContext(
      spec,
      req.header,
      {
        [headerContentType]: type.binary ? contentTypeProto : contentTypeJson,
      },
      {
        [headerGrpcStatus]: grpcStatusOk,
      }
    );
    const compression = compressionNegotiate(
      opt.acceptCompression,
      req.header.get(headerEncoding),
      req.header.get(headerAcceptEncoding),
      headerAcceptEncoding
    );
    if (compression.response) {
      context.responseHeader.set(headerEncoding, compression.response.name);
    }
    const outputIt = pipe(
      req.body,
      transformPrepend<Uint8Array>(() => {
        // raise compression error to serialize it as a trailer status
        if (compression.error) throw compression.error;
        return undefined;
      }),
      transformSplitEnvelope(opt.readMaxBytes),
      transformDecompressEnvelope(compression.request, opt.readMaxBytes),
      transformParseEnvelope(
        serialization.getI(type.binary),
        trailerFlag
        // if we set `null` here, an end-stream-message in the request
        // raises an error, but we want to be lenient
      ),
      transformInvokeImplementation<I, O>(spec, context),
      transformSerializeEnvelope(serialization.getO(type.binary)),
      transformCatchFinally<EnvelopedMessage>((e) => {
        const trailer = context.responseTrailer;
        if (e !== undefined) {
          if (e instanceof ConnectError) {
            setTrailerStatus(trailer, e);
          } else {
            setTrailerStatus(
              trailer,
              new ConnectError(
                "internal error",
                Code.Internal,
                undefined,
                undefined,
                e
              )
            );
          }
        }
        return {
          flags: trailerFlag,
          data: trailerSerialization.serialize(trailer),
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

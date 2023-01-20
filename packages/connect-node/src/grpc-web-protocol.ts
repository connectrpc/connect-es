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
  compressedFlag,
  Compression,
  ConnectError,
  connectErrorFromReason,
  encodeEnvelope,
} from "@bufbuild/connect-core";
import {
  parseTimeout,
  setTrailerStatus,
  headerEncoding,
  headerAcceptEncoding,
  headerContentType,
  headerTimeout,
  parseContentType,
  trailerFlag,
  trailerSerialize,
} from "@bufbuild/connect-core/protocol-grpc-web";
import {
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
  Message,
  MethodKind,
  PartialMessage,
} from "@bufbuild/protobuf";
import type { ImplHandler, ImplSpec, Protocol } from "./protocol.js";
import { createServerMethodSerializers } from "./private/create-server-method-serializers.js";
import type { HandlerContext } from "./implementation";
import {
  nodeHeaderToWebHeader,
  webHeaderToNodeHeaders,
} from "./private/web-header-to-node-headers.js";
import type * as http from "http";
import type * as http2 from "http2";
import { end, endWithHttpStatus, readEnvelope, write } from "./private/io.js";
import { compressionBrotli, compressionGzip } from "./compression.js";
import { compressionNegotiate } from "./private/compression-negotiate.js";
import { validateReadMaxBytesOption } from "./private/validate-read-max-bytes-option.js";

/**
 * Options for creating a gRPC-web Protocol instance.
 */
interface CreateGrpcWebProtocolOptions {
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;
  // TODO document
  acceptCompression?: Compression[];
  compressMinBytes?: number;
  readMaxBytes?: number;
  writeMaxBytes?: number;
}

/**
 * Create a gRPC-web Protocol instance.
 */
export function createGrpcWebProtocol(
  options: CreateGrpcWebProtocolOptions
): Protocol {
  const readMaxBytes = validateReadMaxBytesOption(options.readMaxBytes);
  const compressMinBytes = options.compressMinBytes ?? 0;
  const acceptCompression = options.acceptCompression ?? [
    compressionGzip,
    compressionBrotli,
  ];
  return {
    supportsMediaType: (type) => !!parseContentType(type),

    createHandler<I extends Message<I>, O extends Message<O>>(
      spec: ImplSpec<I, O>
    ): ImplHandler {
      switch (spec.kind) {
        case MethodKind.Unary:
          return async (req, res) => {
            const requestHeader = nodeHeaderToWebHeader(req.headers);
            const type = parseContentType(requestHeader.get(headerContentType));
            if (type === undefined) {
              return await endWithHttpStatus(
                res,
                415,
                "Unsupported Media Type"
              );
            }
            if (type.text) {
              return await endWithHttpStatus(
                res,
                415,
                "Unsupported Media Type"
              );
            }

            const context: HandlerContext = {
              method: spec.method,
              service: spec.service,
              requestHeader,
              responseHeader: createResponseHeader(type.binary),
              responseTrailer: new Headers(),
            };

            const timeout = parseTimeout(requestHeader.get(headerTimeout));
            if (timeout instanceof ConnectError) {
              return await endWithGrpcWebTrailer(res, context, timeout);
            }
            if (typeof timeout === "number") {
              res.setTimeout(timeout, () => {
                return void endWithGrpcWebTrailer(
                  res,
                  context,
                  new ConnectError("Request Timed Out", Code.DeadlineExceeded)
                );
              });
            }

            const {
              requestCompression,
              responseCompression,
              unsupportedError,
              supportedNames,
            } = compressionNegotiate(
              acceptCompression,
              requestHeader.get(headerEncoding),
              requestHeader.get(headerAcceptEncoding)
            );

            if (unsupportedError) {
              unsupportedError.metadata.set(
                headerAcceptEncoding,
                supportedNames
              );
              return await endWithGrpcWebTrailer(
                res,
                context,
                unsupportedError
              );
            }

            if (responseCompression) {
              context.responseHeader.set(
                headerEncoding,
                responseCompression.name
              );
            }

            const { normalize, parse, serialize } =
              createServerMethodSerializers(
                options.jsonOptions,
                options.binaryOptions,
                spec.method,
                type.binary
              );
            const inputResult = await readEnvelope(req);
            if (inputResult.done) {
              return await endWithGrpcWebTrailer(
                res,
                context,
                new ConnectError("Missing input message", Code.Internal)
              );
            }
            const flags = inputResult.value.flags;
            let data = inputResult.value.data;
            if ((flags & compressedFlag) === compressedFlag) {
              if (!requestCompression) {
                throw new ConnectError(
                  `received compressed envelope, but no content-encoding`,
                  Code.InvalidArgument
                );
              }
              data = await requestCompression.decompress(data, readMaxBytes);
            }
            const input = parse(data);
            let output: O | PartialMessage<O>;
            try {
              output = await spec.impl(input, context);
            } catch (e) {
              return await endWithGrpcWebTrailer(
                res,
                context,
                connectErrorFromReason(e)
              );
            }
            res.writeHead(200, webHeaderToNodeHeaders(context.responseHeader));
            let response = serialize(normalize(output));
            let envelopeFlag = 0;
            if (responseCompression && data.length >= compressMinBytes) {
              response = await responseCompression.compress(response);
              envelopeFlag = flags | compressedFlag;
            }
            await write(res, encodeEnvelope(envelopeFlag, response));
            return await endWithGrpcWebTrailer(res, context, undefined);
          };
        case MethodKind.ServerStreaming: {
          return async (req, res) => {
            const requestHeader = nodeHeaderToWebHeader(req.headers);
            const type = parseContentType(requestHeader.get(headerContentType));
            if (type === undefined) {
              return await endWithHttpStatus(
                res,
                415,
                "Unsupported Media Type"
              );
            }
            if (type.text) {
              return await endWithHttpStatus(
                res,
                415,
                "Unsupported Media Type"
              );
            }

            const context: HandlerContext = {
              method: spec.method,
              service: spec.service,
              requestHeader,
              responseHeader: createResponseHeader(type.binary),
              responseTrailer: new Headers(),
            };

            const timeout = parseTimeout(requestHeader.get(headerTimeout));
            if (timeout instanceof ConnectError) {
              return await endWithGrpcWebTrailer(res, context, timeout);
            }
            if (typeof timeout === "number") {
              res.setTimeout(timeout, () => {
                return void endWithGrpcWebTrailer(
                  res,
                  context,
                  new ConnectError("Stream Timed Out", Code.DeadlineExceeded)
                );
              });
            }

            const {
              requestCompression,
              responseCompression,
              unsupportedError,
              supportedNames,
            } = compressionNegotiate(
              acceptCompression,
              requestHeader.get(headerEncoding),
              requestHeader.get(headerAcceptEncoding)
            );

            if (unsupportedError) {
              unsupportedError.metadata.set(
                headerAcceptEncoding,
                supportedNames
              );
              return await endWithGrpcWebTrailer(
                res,
                context,
                unsupportedError
              );
            }
            if (responseCompression) {
              context.responseHeader.set(
                headerEncoding,
                responseCompression.name
              );
            }

            const { normalize, parse, serialize } =
              createServerMethodSerializers(
                options.jsonOptions,
                options.binaryOptions,
                spec.method,
                type.binary
              );

            const inputResult = await readEnvelope(req);
            if (inputResult.done) {
              return await endWithGrpcWebTrailer(
                res,
                context,
                new ConnectError("Missing input message", Code.Internal)
              );
            }
            const flags = inputResult.value.flags;
            let data = inputResult.value.data;
            if ((flags & compressedFlag) === compressedFlag) {
              if (!requestCompression) {
                throw new ConnectError(
                  `received compressed envelope, but no content-encoding`,
                  Code.InvalidArgument
                );
              }
              data = await requestCompression.decompress(data, readMaxBytes);
            }
            const input = parse(data);
            try {
              for await (const output of spec.impl(input, context)) {
                if (!res.headersSent) {
                  res.writeHead(
                    200,
                    webHeaderToNodeHeaders(context.responseHeader)
                  );
                }
                let data = serialize(normalize(output));
                let flags = 0;
                if (responseCompression && data.length >= compressMinBytes) {
                  data = await responseCompression.compress(data);
                  flags = flags | compressedFlag;
                }
                await write(res, encodeEnvelope(flags, data));
              }
            } catch (e) {
              return await endWithGrpcWebTrailer(
                res,
                context,
                connectErrorFromReason(e)
              );
            }
            return await endWithGrpcWebTrailer(res, context, undefined);
          };
        }
        case MethodKind.ClientStreaming: {
          return async (req, res) => {
            const requestHeader = nodeHeaderToWebHeader(req.headers);
            const type = parseContentType(requestHeader.get(headerContentType));
            if (type === undefined) {
              return await endWithHttpStatus(
                res,
                415,
                "Unsupported Media Type"
              );
            }
            if (type.text) {
              return await endWithHttpStatus(
                res,
                415,
                "Unsupported Media Type"
              );
            }

            const context: HandlerContext = {
              method: spec.method,
              service: spec.service,
              requestHeader,
              responseHeader: createResponseHeader(type.binary),
              responseTrailer: new Headers(),
            };

            const timeout = parseTimeout(requestHeader.get(headerTimeout));
            if (timeout instanceof ConnectError) {
              return await endWithGrpcWebTrailer(res, context, timeout);
            }
            if (typeof timeout === "number") {
              res.setTimeout(timeout, () => {
                return void endWithGrpcWebTrailer(
                  res,
                  context,
                  new ConnectError("Stream Timed Out", Code.DeadlineExceeded)
                );
              });
            }

            const {
              requestCompression,
              responseCompression,
              unsupportedError,
              supportedNames,
            } = compressionNegotiate(
              acceptCompression,
              requestHeader.get(headerEncoding),
              requestHeader.get(headerAcceptEncoding)
            );

            if (unsupportedError) {
              unsupportedError.metadata.set(
                headerAcceptEncoding,
                supportedNames
              );
              return await endWithGrpcWebTrailer(
                res,
                context,
                unsupportedError
              );
            }
            if (responseCompression) {
              context.responseHeader.set(
                headerEncoding,
                responseCompression.name
              );
            }

            const { normalize, parse, serialize } =
              createServerMethodSerializers(
                options.jsonOptions,
                options.binaryOptions,
                spec.method,
                type.binary
              );

            async function* input() {
              for (;;) {
                const result = await readEnvelope(req);
                if (result.done) {
                  break;
                }
                const flags = result.value.flags;
                let data = result.value.data;
                if ((flags & compressedFlag) === compressedFlag) {
                  if (!requestCompression) {
                    throw new ConnectError(
                      `received compressed envelope, but no content-encoding on server`,
                      Code.InvalidArgument
                    );
                  }
                  data = await requestCompression.decompress(
                    data,
                    readMaxBytes
                  );
                }
                yield parse(data);
              }
            }

            let output: O | PartialMessage<O>;
            try {
              output = await spec.impl(input(), context);
            } catch (e) {
              return await endWithGrpcWebTrailer(
                res,
                context,
                connectErrorFromReason(e)
              );
            }
            let data = serialize(normalize(output));
            let flags = 0;
            if (responseCompression && data.length >= compressMinBytes) {
              data = await responseCompression.compress(data);
              flags = flags | compressedFlag;
            }
            res.writeHead(200, webHeaderToNodeHeaders(context.responseHeader));
            await write(res, encodeEnvelope(flags, data));
            return await endWithGrpcWebTrailer(res, context, undefined);
          };
        }
        case MethodKind.BiDiStreaming: {
          return async (req, res) => {
            const requestHeader = nodeHeaderToWebHeader(req.headers);
            const type = parseContentType(requestHeader.get(headerContentType));
            if (type === undefined) {
              return await endWithHttpStatus(
                res,
                415,
                "Unsupported Media Type"
              );
            }
            if (type.text) {
              return await endWithHttpStatus(
                res,
                415,
                "Unsupported Media Type"
              );
            }

            const context: HandlerContext = {
              method: spec.method,
              service: spec.service,
              requestHeader,
              responseHeader: createResponseHeader(type.binary),
              responseTrailer: new Headers(),
            };

            const timeout = parseTimeout(requestHeader.get(headerTimeout));
            if (timeout instanceof ConnectError) {
              return await endWithGrpcWebTrailer(res, context, timeout);
            }
            if (typeof timeout === "number") {
              res.setTimeout(timeout, () => {
                return void endWithGrpcWebTrailer(
                  res,
                  context,
                  new ConnectError("Stream Timed Out", Code.DeadlineExceeded)
                );
              });
            }

            const {
              requestCompression,
              responseCompression,
              unsupportedError,
              supportedNames,
            } = compressionNegotiate(
              acceptCompression,
              requestHeader.get(headerEncoding),
              requestHeader.get(headerAcceptEncoding)
            );

            if (unsupportedError) {
              unsupportedError.metadata.set(
                headerAcceptEncoding,
                supportedNames
              );
              return await endWithGrpcWebTrailer(
                res,
                context,
                unsupportedError
              );
            }
            if (responseCompression) {
              context.responseHeader.set(
                headerEncoding,
                responseCompression.name
              );
            }

            const { normalize, parse, serialize } =
              createServerMethodSerializers(
                options.jsonOptions,
                options.binaryOptions,
                spec.method,
                type.binary
              );

            async function* input() {
              for (;;) {
                const result = await readEnvelope(req);
                if (result.done) {
                  break;
                }
                const flags = result.value.flags;
                let data = result.value.data;
                if ((flags & compressedFlag) === compressedFlag) {
                  if (!requestCompression) {
                    throw new ConnectError(
                      `received compressed envelope, but no content-encoding on server`,
                      Code.InvalidArgument
                    );
                  }
                  data = await requestCompression.decompress(
                    data,
                    readMaxBytes
                  );
                }
                yield parse(data);
              }
            }

            try {
              for await (const output of spec.impl(input(), context)) {
                if (!res.headersSent) {
                  res.writeHead(
                    200,
                    webHeaderToNodeHeaders(context.responseHeader)
                  );
                }
                let data = serialize(normalize(output));
                let flags = 0;
                if (responseCompression && data.length >= compressMinBytes) {
                  data = await responseCompression.compress(data);
                  flags = flags | compressedFlag;
                }
                await write(res, encodeEnvelope(flags, data));
              }
            } catch (e) {
              return await endWithGrpcWebTrailer(
                res,
                context,
                connectErrorFromReason(e)
              );
            }
            return await endWithGrpcWebTrailer(res, context, undefined);
          };
        }
      }
    },
  };
}

function createResponseHeader(useBinaryFormat: boolean): Headers {
  let type = "application/grpc-web+";
  type += useBinaryFormat ? "proto" : "json";
  return new Headers({
    "Content-Type": type,
  });
}

async function endWithGrpcWebTrailer(
  res: http.ServerResponse | http2.Http2ServerResponse,
  context: HandlerContext,
  error: ConnectError | undefined
) {
  if (!res.headersSent) {
    res.writeHead(200, webHeaderToNodeHeaders(context.responseHeader));
  }
  setTrailerStatus(context.responseTrailer, error);
  const trailerBytes = trailerSerialize(context.responseTrailer);
  await write(res, encodeEnvelope(trailerFlag, trailerBytes));
  await end(res);
}

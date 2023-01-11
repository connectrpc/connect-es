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
  appendHeaders,
  Code,
  ConnectError,
  encodeEnvelope,
  connectErrorFromReason,
} from "@bufbuild/connect-core";
import {
  codeToHttpStatus,
  endStreamFlag,
  endStreamToJson,
  errorToJson,
  parseContentType,
  parseTimeout,
} from "@bufbuild/connect-core/protocol-connect";
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
import type { HandlerContext } from "./implementation.js";
import {
  nodeHeaderToWebHeader,
  webHeaderToNodeHeaders,
} from "./private/web-header-to-node-headers.js";
import { connectTrailerMux } from "./private/connect-trailer-mux.js";
import type * as http from "http";
import type * as http2 from "http2";
import {
  end,
  endWithHttpStatus,
  jsonSerialize,
  readEnvelope,
  readToEnd,
  write,
} from "./private/io.js";
import { compressedFlag, Compression } from "./compression.js";
import { compressionBrotli, compressionGzip } from "./compression.js";
import { validateReadMaxBytesOption } from "./private/validate-read-max-bytes-option.js";
import { connectErrorFromNodeReason } from "./private/node-error.js";
import { compressionNegotiate } from "./private/compression-negotiate.js";

const headerUnaryEncoding = "Content-Encoding";
const headerStreamEncoding = "Connect-Content-Encoding";
const headerUnaryAcceptEncoding = "Accept-Encoding";
const headerStreamAcceptEncoding = "Connect-Accept-Encoding";
const headerContentType = "Content-Type";

/**
 * Options for creating a Connect Protocol instance.
 */
interface CreateConnectProtocolOptions {
  // TODO document
  acceptCompression?: Compression[];
  compressMinBytes?: number;
  readMaxBytes?: number;
  sendMaxBytes?: number;
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;
  requireConnectProtocolHeader?: boolean;
}

const connectProtocolVersionHeader = "Connect-Protocol-Version";
const connectProtocolVersion = "1";
const connectTimeoutHeader = "Connect-Timeout-Ms";

/**
 * Create a Connect Protocol instance.
 */
export function createConnectProtocol(
  options: CreateConnectProtocolOptions
): Protocol {
  const shouldRequireHeader = options.requireConnectProtocolHeader ?? false;
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
            if (type.stream) {
              return await endWithHttpStatus(
                res,
                415,
                "Unsupported Media Type"
              );
            }

            if (
              shouldRequireHeader &&
              req.headers[connectProtocolVersionHeader] !==
                connectProtocolVersion
            ) {
              return await endWithHttpStatus(
                res,
                400,
                `Missing required header Connect-Protocol-Version ${connectProtocolVersion}`
              );
            }

            const context: HandlerContext = {
              method: spec.method,
              service: spec.service,
              requestHeader: requestHeader,
              responseHeader: connectCreateResponseHeader(
                spec.method.kind,
                type.binary
              ),
              responseTrailer: new Headers(),
            };

            const timeout = parseTimeout(
              requestHeader.get(connectTimeoutHeader)
            );

            if (timeout instanceof ConnectError) {
              return await endWithConnectUnaryError(
                res,
                context,
                timeout,
                options.jsonOptions,
                undefined,
                compressMinBytes
              );
            }

            if (typeof timeout === "number") {
              res.setTimeout(timeout, () => {
                return void endWithConnectUnaryError(
                  res,
                  context,
                  new ConnectError("Request Timed Out", Code.DeadlineExceeded),
                  options.jsonOptions,
                  undefined,
                  compressMinBytes
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
              requestHeader.get(headerUnaryEncoding),
              requestHeader.get(headerUnaryAcceptEncoding)
            );

            if (unsupportedError) {
              unsupportedError.metadata.set(
                headerUnaryAcceptEncoding,
                supportedNames
              );
              return await endWithConnectUnaryError(
                res,
                context,
                unsupportedError,
                options.jsonOptions,
                undefined,
                compressMinBytes
              );
            }

            const { normalize, parse, serialize } =
              createServerMethodSerializers(
                options.jsonOptions,
                options.binaryOptions,
                spec.method,
                type.binary
              );
            let requestBody = await readToEnd(req); // TODO(TCN-785) honor readMaxBytes
            if (requestCompression) {
              requestBody = await requestCompression.decompress(
                requestBody,
                readMaxBytes
              );
            }
            let output: O | PartialMessage<O>;
            const input = parse(requestBody);
            try {
              output = await spec.impl(input, context);
            } catch (e) {
              let ce: ConnectError;
              if (e instanceof ConnectError) {
                ce = e;
                context.responseHeader = appendHeaders(
                  context.responseHeader,
                  e.metadata
                );
              } else if (connectErrorFromNodeReason(e).code == Code.Canceled) {
                ce = new ConnectError("operation canceled", Code.Canceled);
              } else {
                ce = new ConnectError(
                  "internal error",
                  Code.Internal,
                  undefined,
                  undefined,
                  (e as Error).message
                );
              }
              return await endWithConnectUnaryError(
                res,
                context,
                ce,
                options.jsonOptions,
                responseCompression,
                compressMinBytes
              );
            }
            let responseBody = serialize(normalize(output));
            if (
              responseCompression &&
              responseBody.length >= compressMinBytes
            ) {
              responseBody = await responseCompression.compress(responseBody);
              context.responseHeader.set(
                headerUnaryEncoding,
                responseCompression.name
              );
            }
            res.writeHead(
              200,
              webHeaderToNodeHeaders(
                connectTrailerMux(
                  context.responseHeader,
                  context.responseTrailer
                )
              )
            );
            await write(res, responseBody);
            await end(res);
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
            if (!type.stream) {
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
              responseHeader: connectCreateResponseHeader(
                spec.method.kind,
                type.binary
              ),
              responseTrailer: new Headers(),
            };

            if (
              shouldRequireHeader &&
              req.headers[connectProtocolVersionHeader] !==
                connectProtocolVersion
            ) {
              return await endWithHttpStatus(
                res,
                400,
                `Missing required header Connect-Protocol-Version ${connectProtocolVersion}`
              );
            }

            const timeout = parseTimeout(
              requestHeader.get(connectTimeoutHeader)
            );

            if (timeout instanceof ConnectError) {
              return await endWithConnectEndStream(
                res,
                context,
                timeout,
                options.jsonOptions,
                undefined,
                compressMinBytes
              );
            }

            if (typeof timeout === "number") {
              res.setTimeout(timeout, () => {
                return void endWithConnectEndStream(
                  res,
                  context,
                  new ConnectError("Stream Timed Out", Code.DeadlineExceeded),
                  options.jsonOptions,
                  responseCompression,
                  compressMinBytes
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
              requestHeader.get(headerStreamEncoding),
              requestHeader.get(headerStreamAcceptEncoding)
            );
            if (unsupportedError) {
              unsupportedError.metadata.set(
                headerStreamAcceptEncoding,
                supportedNames
              );
              return await endWithConnectEndStream(
                res,
                context,
                unsupportedError,
                options.jsonOptions,
                undefined,
                compressMinBytes
              );
            }
            if (responseCompression) {
              context.responseHeader.set(
                headerStreamEncoding,
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
              return await endWithConnectEndStream(
                res,
                context,
                new ConnectError("Missing input message", Code.Internal),
                options.jsonOptions,
                responseCompression,
                compressMinBytes
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
              return await endWithConnectEndStream(
                res,
                context,
                connectErrorFromReason(e),
                options.jsonOptions,
                responseCompression,
                compressMinBytes
              );
            }
            return await endWithConnectEndStream(
              res,
              context,
              undefined,
              options.jsonOptions,
              responseCompression,
              compressMinBytes
            );
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
            if (!type.stream) {
              return await endWithHttpStatus(
                res,
                415,
                "Unsupported Media Type"
              );
            }

            if (
              shouldRequireHeader &&
              req.headers[connectProtocolVersionHeader] !==
                connectProtocolVersion
            ) {
              return await endWithHttpStatus(
                res,
                400,
                `Missing required header Connect-Protocol-Version ${connectProtocolVersion}`
              );
            }

            const context: HandlerContext = {
              method: spec.method,
              service: spec.service,
              requestHeader: nodeHeaderToWebHeader(req.headers),
              responseHeader: connectCreateResponseHeader(
                spec.method.kind,
                type.binary
              ),
              responseTrailer: new Headers(),
            };

            const timeout = parseTimeout(
              requestHeader.get(connectTimeoutHeader)
            );

            if (timeout instanceof ConnectError) {
              return await endWithConnectEndStream(
                res,
                context,
                timeout,
                options.jsonOptions,
                undefined,
                compressMinBytes
              );
            }

            if (typeof timeout === "number") {
              res.setTimeout(timeout, () => {
                return void endWithConnectEndStream(
                  res,
                  context,
                  new ConnectError("Stream Timed Out", Code.DeadlineExceeded),
                  options.jsonOptions,
                  responseCompression,
                  compressMinBytes
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
              requestHeader.get(headerStreamEncoding),
              requestHeader.get(headerStreamAcceptEncoding)
            );
            if (unsupportedError) {
              unsupportedError.metadata.set(
                headerStreamAcceptEncoding,
                supportedNames
              );
              return await endWithConnectEndStream(
                res,
                context,
                unsupportedError,
                options.jsonOptions,
                undefined,
                compressMinBytes
              );
            }
            if (responseCompression) {
              context.responseHeader.set(
                headerStreamEncoding,
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
                      `received compressed envelope, but no content-encoding`,
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
              return await endWithConnectEndStream(
                res,
                context,
                connectErrorFromReason(e),
                options.jsonOptions,
                responseCompression,
                compressMinBytes
              );
            }
            res.writeHead(200, webHeaderToNodeHeaders(context.responseHeader));
            let data = serialize(normalize(output));
            let flags = 0;
            if (responseCompression && data.length >= compressMinBytes) {
              data = await responseCompression.compress(data);
              flags = flags | compressedFlag;
            }
            await write(res, encodeEnvelope(flags, data));
            return await endWithConnectEndStream(
              res,
              context,
              undefined,
              options.jsonOptions,
              responseCompression,
              compressMinBytes
            );
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
            if (!type.stream) {
              return await endWithHttpStatus(
                res,
                415,
                "Unsupported Media Type"
              );
            }

            if (
              shouldRequireHeader &&
              req.headers[connectProtocolVersionHeader] !==
                connectProtocolVersion
            ) {
              return await endWithHttpStatus(
                res,
                400,
                `Missing required header Connect-Protocol-Version ${connectProtocolVersion}`
              );
            }

            const context: HandlerContext = {
              method: spec.method,
              service: spec.service,
              requestHeader: nodeHeaderToWebHeader(req.headers),
              responseHeader: connectCreateResponseHeader(
                spec.method.kind,
                type.binary
              ),
              responseTrailer: new Headers(),
            };

            const timeout = parseTimeout(
              requestHeader.get(connectTimeoutHeader)
            );

            if (timeout instanceof ConnectError) {
              return await endWithConnectEndStream(
                res,
                context,
                timeout,
                options.jsonOptions,
                undefined,
                compressMinBytes
              );
            }

            if (typeof timeout === "number") {
              res.setTimeout(timeout, () => {
                return void endWithConnectEndStream(
                  res,
                  context,
                  new ConnectError("Stream Timed Out", Code.DeadlineExceeded),
                  options.jsonOptions,
                  responseCompression,
                  compressMinBytes
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
              requestHeader.get(headerStreamEncoding),
              requestHeader.get(headerStreamAcceptEncoding)
            );
            if (unsupportedError) {
              unsupportedError.metadata.set(
                headerUnaryAcceptEncoding,
                supportedNames
              );
              return await endWithConnectUnaryError(
                res,
                context,
                unsupportedError,
                options.jsonOptions,
                undefined,
                compressMinBytes
              );
            }
            if (responseCompression) {
              context.responseHeader.set(
                headerStreamEncoding,
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
                      `received compressed envelope, but no content-encoding`,
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
              return await endWithConnectEndStream(
                res,
                context,
                connectErrorFromReason(e),
                options.jsonOptions,
                responseCompression,
                compressMinBytes
              );
            }
            return await endWithConnectEndStream(
              res,
              context,
              undefined,
              options.jsonOptions,
              responseCompression,
              compressMinBytes
            );
          };
        }
      }
    },
  };
}

function connectCreateResponseHeader(
  methodKind: MethodKind,
  useBinaryFormat: boolean
): Headers {
  let contentTypeValue = "application/";
  if (methodKind != MethodKind.Unary) {
    contentTypeValue += "connect+";
  }
  contentTypeValue += useBinaryFormat ? "proto" : "json";
  const result = new Headers();
  result.set(headerContentType, contentTypeValue);
  return result;
}

async function endWithConnectEndStream(
  res: http.ServerResponse | http2.Http2ServerResponse,
  context: HandlerContext,
  error: ConnectError | undefined,
  jsonWriteOptions: Partial<JsonWriteOptions> | undefined,
  responseCompression: Compression | undefined,
  compressMinBytes: number
) {
  if (!res.headersSent) {
    res.writeHead(200, webHeaderToNodeHeaders(context.responseHeader));
  }
  const endStreamJson = endStreamToJson(
    context.responseTrailer,
    error,
    jsonWriteOptions
  );
  let data = jsonSerialize(endStreamJson);
  let flags = endStreamFlag;
  if (responseCompression && data.length >= compressMinBytes) {
    data = await responseCompression.compress(data);
    flags = flags | compressedFlag;
  }
  await write(res, encodeEnvelope(flags, data));
  await end(res);
}

async function endWithConnectUnaryError(
  res: http.ServerResponse | http2.Http2ServerResponse,
  context: HandlerContext,
  error: ConnectError,
  jsonWriteOptions: Partial<JsonWriteOptions> | undefined,
  responseCompression: Compression | undefined,
  compressMinBytes: number
): Promise<void> {
  const header = appendHeaders(
    connectTrailerMux(context.responseHeader, context.responseTrailer),
    error.metadata
  );
  header.set(headerContentType, "application/json");
  const json = errorToJson(error, jsonWriteOptions);
  let body = jsonSerialize(json);
  if (responseCompression && body.length >= compressMinBytes) {
    body = await responseCompression.compress(body);
    header.set(headerUnaryEncoding, responseCompression.name);
  }
  const statusCode = codeToHttpStatus(error.code);
  res.writeHead(statusCode, webHeaderToNodeHeaders(header));
  await write(res, body);
  await end(res);
}

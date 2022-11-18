// Copyright 2021-2022 Buf Technologies, Inc.
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
  connectCodeToHttpStatus,
  connectEndStreamFlag,
  connectEndStreamToJson,
  ConnectError,
  connectErrorFromReason,
  connectErrorToJson,
  connectParseContentType,
  encodeEnvelope,
} from "@bufbuild/connect-core";
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

/**
 * Options for creating a Connect Protocol instance.
 */
interface CreateConnectProtocolOptions {
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;
}

/**
 * Create a Connect Protocol instance.
 */
export function createConnectProtocol(
  options: CreateConnectProtocolOptions
): Protocol {
  return {
    supportsMediaType: (type) => !!connectParseContentType(type),

    createHandler<I extends Message<I>, O extends Message<O>>(
      spec: ImplSpec<I, O>
    ): ImplHandler {
      switch (spec.kind) {
        case MethodKind.Unary:
          return async (req, res) => {
            const type = connectParseContentType(
              req.headers["content-type"] ?? null
            );
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
            const context: HandlerContext = {
              requestHeader: nodeHeaderToWebHeader(req.headers),
              responseHeader: connectCreateResponseHeader(
                spec.method.kind,
                type.binary
              ),
              responseTrailer: new Headers(),
            };
            const { normalize, parse, serialize } =
              createServerMethodSerializers(
                options.jsonOptions,
                options.binaryOptions,
                spec.method,
                type.binary
              );

            const input = parse(await readToEnd(req));
            let output: O | PartialMessage<O>;
            try {
              output = await spec.impl(input, context);
            } catch (e) {
              return await endWithConnectUnaryError(
                res,
                context,
                connectErrorFromReason(e),
                options.jsonOptions
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
            await write(res, serialize(normalize(output)));
            await end(res);
          };
        case MethodKind.ServerStreaming: {
          return async (req, res) => {
            const type = connectParseContentType(
              req.headers["content-type"] ?? null
            );
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
              requestHeader: nodeHeaderToWebHeader(req.headers),
              responseHeader: connectCreateResponseHeader(
                spec.method.kind,
                type.binary
              ),
              responseTrailer: new Headers(),
            };
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
                options.jsonOptions
              );
            }
            if (inputResult.value.flags !== 0b00000000) {
              return await endWithConnectEndStream(
                res,
                context,
                new ConnectError(
                  `Unexpected input flags ${inputResult.value.flags.toString(
                    2
                  )}`,
                  Code.Internal
                ),
                options.jsonOptions
              );
            }
            const input = parse(inputResult.value.data);
            try {
              for await (const output of spec.impl(input, context)) {
                if (!res.headersSent) {
                  res.writeHead(
                    200,
                    webHeaderToNodeHeaders(context.responseHeader)
                  );
                }
                await write(
                  res,
                  encodeEnvelope(0b00000000, serialize(normalize(output)))
                );
              }
            } catch (e) {
              return await endWithConnectEndStream(
                res,
                context,
                connectErrorFromReason(e),
                options.jsonOptions
              );
            }
            return await endWithConnectEndStream(
              res,
              context,
              undefined,
              options.jsonOptions
            );
          };
        }
        case MethodKind.ClientStreaming: {
          return async (req, res) => {
            const type = connectParseContentType(
              req.headers["content-type"] ?? null
            );
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
              requestHeader: nodeHeaderToWebHeader(req.headers),
              responseHeader: connectCreateResponseHeader(
                spec.method.kind,
                type.binary
              ),
              responseTrailer: new Headers(),
            };
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
                if (result.value.flags !== 0b00000000) {
                  return await endWithConnectEndStream(
                    res,
                    context,
                    new ConnectError(
                      `Unexpected input flags ${result.value.flags.toString(
                        2
                      )}`,
                      Code.Internal
                    ),
                    options.jsonOptions
                  );
                }
                yield parse(result.value.data);
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
                options.jsonOptions
              );
            }
            res.writeHead(200, webHeaderToNodeHeaders(context.responseHeader));
            await write(
              res,
              encodeEnvelope(0b00000000, serialize(normalize(output)))
            );
            return await endWithConnectEndStream(
              res,
              context,
              undefined,
              options.jsonOptions
            );
          };
        }
        case MethodKind.BiDiStreaming: {
          return async (req, res) => {
            const type = connectParseContentType(
              req.headers["content-type"] ?? null
            );
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
              requestHeader: nodeHeaderToWebHeader(req.headers),
              responseHeader: connectCreateResponseHeader(
                spec.method.kind,
                type.binary
              ),
              responseTrailer: new Headers(),
            };
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
                if (result.value.flags !== 0b00000000) {
                  return await endWithConnectEndStream(
                    res,
                    context,
                    new ConnectError(
                      `Unexpected input flags ${result.value.flags.toString(
                        2
                      )}`,
                      Code.Internal
                    ),
                    options.jsonOptions
                  );
                }
                yield parse(result.value.data);
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
                await write(
                  res,
                  encodeEnvelope(0b00000000, serialize(normalize(output)))
                );
              }
            } catch (e) {
              return await endWithConnectEndStream(
                res,
                context,
                connectErrorFromReason(e),
                options.jsonOptions
              );
            }
            return await endWithConnectEndStream(
              res,
              context,
              undefined,
              options.jsonOptions
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
  let type = "application/";
  if (methodKind != MethodKind.Unary) {
    type += "connect+";
  }
  type += useBinaryFormat ? "proto" : "json";
  return new Headers({
    "Content-Type": type,
  });
}

async function endWithConnectEndStream(
  res: http.ServerResponse | http2.Http2ServerResponse,
  context: HandlerContext,
  error: ConnectError | undefined,
  jsonWriteOptions: Partial<JsonWriteOptions> | undefined
) {
  if (!res.headersSent) {
    res.writeHead(200, webHeaderToNodeHeaders(context.responseHeader));
  }
  const endStreamJson = connectEndStreamToJson(
    context.responseTrailer,
    error,
    jsonWriteOptions
  );
  await write(
    res,
    encodeEnvelope(connectEndStreamFlag, jsonSerialize(endStreamJson))
  );
  await end(res);
}

async function endWithConnectUnaryError(
  res: http.ServerResponse | http2.Http2ServerResponse,
  context: HandlerContext,
  error: ConnectError,
  jsonWriteOptions: Partial<JsonWriteOptions> | undefined
): Promise<void> {
  const statusCode = connectCodeToHttpStatus(error.code);
  const header = appendHeaders(
    connectTrailerMux(context.responseHeader, context.responseTrailer),
    error.metadata
  );
  header.set("Content-Type", "application/json");
  res.writeHead(statusCode, webHeaderToNodeHeaders(header));
  const json = connectErrorToJson(error, jsonWriteOptions);
  await write(res, jsonSerialize(json));
  await end(res);
}

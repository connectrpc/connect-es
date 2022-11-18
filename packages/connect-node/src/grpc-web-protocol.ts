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
  Code,
  ConnectError,
  connectErrorFromReason,
  encodeEnvelope,
  grpcSetTrailerStatus,
  grpcWebParseContentType,
  grpcWebTrailerSerialize,
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
import type { HandlerContext } from "./implementation";
import {
  nodeHeaderToWebHeader,
  webHeaderToNodeHeaders,
} from "./private/web-header-to-node-headers.js";
import type * as http from "http";
import type * as http2 from "http2";
import { end, endWithHttpStatus, readEnvelope, write } from "./private/io.js";

/**
 * Options for creating a gRPC-web Protocol instance.
 */
interface CreateGrpcWebProtocolOptions {
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;
}

/**
 * Create a gRPC-web Protocol instance.
 */
export function createGrpcWebProtocol(
  options: CreateGrpcWebProtocolOptions
): Protocol {
  return {
    supportsMediaType: (type) => !!grpcWebParseContentType(type),

    createHandler<I extends Message<I>, O extends Message<O>>(
      spec: ImplSpec<I, O>
    ): ImplHandler {
      switch (spec.kind) {
        case MethodKind.Unary:
          return async (req, res) => {
            const type = grpcWebParseContentType(
              req.headers["content-type"] ?? null
            );
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
              requestHeader: nodeHeaderToWebHeader(req.headers),
              responseHeader: grpcWebCreateResponseHeader(type.binary),
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
              return await endWithGrpcWebTrailer(
                res,
                context,
                new ConnectError("Missing input message", Code.Internal)
              );
            }
            const input = parse(inputResult.value.data);
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
            await write(
              res,
              encodeEnvelope(0b00000000, serialize(normalize(output)))
            );
            return await endWithGrpcWebTrailer(res, context, undefined);
          };
        case MethodKind.ServerStreaming: {
          return async (req, res) => {
            const type = grpcWebParseContentType(
              req.headers["content-type"] ?? null
            );
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
              requestHeader: nodeHeaderToWebHeader(req.headers),
              responseHeader: grpcWebCreateResponseHeader(type.binary),
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
              return await endWithGrpcWebTrailer(
                res,
                context,
                new ConnectError("Missing input message", Code.Internal)
              );
            }
            if (inputResult.value.flags !== 0b00000000) {
              return await endWithGrpcWebTrailer(
                res,
                context,
                new ConnectError(
                  `Unexpected input flags ${inputResult.value.flags.toString(
                    2
                  )}`,
                  Code.Internal
                )
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
            const type = grpcWebParseContentType(
              req.headers["content-type"] ?? null
            );
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
              requestHeader: nodeHeaderToWebHeader(req.headers),
              responseHeader: grpcWebCreateResponseHeader(type.binary),
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
                  return await endWithGrpcWebTrailer(
                    res,
                    context,
                    new ConnectError(
                      `Unexpected input flags ${result.value.flags.toString(
                        2
                      )}`,
                      Code.Internal
                    )
                  );
                }
                yield parse(result.value.data);
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
            res.writeHead(200, webHeaderToNodeHeaders(context.responseHeader));
            await write(
              res,
              encodeEnvelope(0b00000000, serialize(normalize(output)))
            );
            return await endWithGrpcWebTrailer(res, context, undefined);
          };
        }
        case MethodKind.BiDiStreaming: {
          return async (req, res) => {
            const type = grpcWebParseContentType(
              req.headers["content-type"] ?? null
            );
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
              requestHeader: nodeHeaderToWebHeader(req.headers),
              responseHeader: grpcWebCreateResponseHeader(type.binary),
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
                  return await endWithGrpcWebTrailer(
                    res,
                    context,
                    new ConnectError(
                      `Unexpected input flags ${result.value.flags.toString(
                        2
                      )}`,
                      Code.Internal
                    )
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

function grpcWebCreateResponseHeader(useBinaryFormat: boolean): Headers {
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
  grpcSetTrailerStatus(context.responseTrailer, error);
  const trailerBytes = grpcWebTrailerSerialize(context.responseTrailer);
  await write(res, encodeEnvelope(0b10000000, trailerBytes));
  await end(res);
}

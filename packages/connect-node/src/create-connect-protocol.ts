import {
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
import {
  end,
  endWithHttpStatus,
  readToEnd,
  write,
} from "./private/handler-io.js";
import { createServerMethodSerializers } from "./private/create-server-method-serializers.js";
import type { HandlerContext } from "./handler.js";
import {
  nodeHeaderToWebHeader,
  webHeaderToNodeHeaders,
} from "./private/web-header-to-node-headers.js";
import { connectTrailerMux } from "./private/connect-trailer-mux.js";
import type * as http from "http";
import type * as http2 from "http2";
import { createEnvelopeReader } from "./private/create-envelope-reader.js";

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

            const { normalize, parse, serialize } =
              createServerMethodSerializers(
                options.jsonOptions,
                options.binaryOptions,
                spec.method,
                type.binary
              );

            const context: HandlerContext = {
              requestHeader: nodeHeaderToWebHeader(req.headers),
              responseHeader: connectCreateResponseHeader(
                spec.method.kind,
                type.binary
              ),
              responseTrailer: new Headers(),
            };
            const input = parse(await readToEnd(req));
            let output: O | PartialMessage<O>;
            try {
              output = await spec.impl(input, context);
            } catch (e) {
              return await endWithConnectError(
                res,
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

            const readEnvelope = createEnvelopeReader(req);

            const inputResult = await readEnvelope();
            if (inputResult.done) {
              throw "TODO";
            }
            if (inputResult.value.flags !== 0b00000000) {
              throw "TODO";
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
                context.responseTrailer,
                connectErrorFromReason(e),
                options.jsonOptions
              );
            }
            return await endWithConnectEndStream(
              res,
              context.responseTrailer,
              undefined,
              options.jsonOptions
            );
          };
        }
        case MethodKind.ClientStreaming: {
          return async (req, res) => {
            return await endWithConnectEndStream(
              res,
              new Headers(),
              // TODO implement
              new ConnectError("TODO", Code.Unimplemented),
              options.jsonOptions
            );
          };
        }
        case MethodKind.BiDiStreaming: {
          return async (req, res) => {
            return await endWithConnectEndStream(
              res,
              new Headers(),
              // TODO implement
              new ConnectError("TODO", Code.Unimplemented),
              options.jsonOptions
            );
          };
        }
      }
    },
  };
}

async function endWithConnectEndStream(
  res: http.ServerResponse | http2.Http2ServerResponse,
  metadata: Headers,
  error: ConnectError | undefined,
  jsonWriteOptions: Partial<JsonWriteOptions> | undefined
) {
  const endStreamJson = connectEndStreamToJson(
    metadata,
    error,
    jsonWriteOptions
  );
  const endStreamJsonString = JSON.stringify(endStreamJson);
  const endStreamBytes = new TextEncoder().encode(endStreamJsonString);
  await write(res, encodeEnvelope(connectEndStreamFlag, endStreamBytes));
  await end(res);
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

async function endWithConnectError(
  res: http.ServerResponse | http2.Http2ServerResponse,
  error: ConnectError,
  jsonWriteOptions: Partial<JsonWriteOptions> | undefined
): Promise<void> {
  const statusCode = connectCodeToHttpStatus(error.code);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });
  const json = connectErrorToJson(error, jsonWriteOptions);
  await write(res, JSON.stringify(json));
  await end(res);
}

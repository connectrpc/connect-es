import {
  Code,
  connectCodeToHttpStatus,
  ConnectError,
  connectErrorFromReason,
  connectErrorToJson,
  connectParseContentType,
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
import { createServerMethodSerializers } from "./create-server-method-serializers.js";
import type { HandlerContext } from "./handler.js";
import {
  nodeHeaderToWebHeader,
  webHeaderToNodeHeaders,
} from "./private/web-header-to-node-headers.js";
import { connectTrailerMux } from "./private/connect-trailer-mux.js";
import type * as http from "http";
import type * as http2 from "http2";

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
              requestHeaders: nodeHeaderToWebHeader(req.headers),
              responseHeaders: connectCreateResponseHeader(
                spec.method.kind,
                type.binary
              ),
              responseTrailers: new Headers(),
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
                  context.responseHeaders,
                  context.responseTrailers
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
            if (type.stream) {
              return await endWithHttpStatus(
                res,
                415,
                "Unsupported Media Type"
              );
            }

            const context: HandlerContext = {
              requestHeaders: nodeHeaderToWebHeader(req.headers),
              responseHeaders: connectCreateResponseHeader(
                spec.method.kind,
                type.binary
              ),
              responseTrailers: new Headers(),
            };

            const { normalize, parse, serialize } =
              createServerMethodSerializers(
                options.jsonOptions,
                options.binaryOptions,
                spec.method,
                type.binary
              );

            const input = parse(await readToEnd(req));
            try {
              for await (const output of spec.impl(input, context)) {
                if (!res.headersSent) {
                  res.writeHead(
                    200,
                    webHeaderToNodeHeaders(context.responseHeaders)
                  );
                }
                // TODO envelope
                await write(res, serialize(normalize(output)));
              }
            } catch (e) {
              // TODO end stream message
              return await endWithConnectError(
                res,
                connectErrorFromReason(e),
                options.jsonOptions
              );
            }
            await end(res);
          };
        }
        case MethodKind.ClientStreaming: {
          return async (req, res) => {
            await endWithConnectError(
              res,
              new ConnectError("TODO", Code.Unimplemented)
            );
          };
        }
        case MethodKind.BiDiStreaming: {
          return async (req, res) => {
            await endWithConnectError(
              res,
              new ConnectError("TODO", Code.Unimplemented)
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

async function endWithConnectError(
  res: http.ServerResponse | http2.Http2ServerResponse,
  error: ConnectError,
  jsonWriteOptions?: Partial<JsonWriteOptions>
): Promise<void> {
  const statusCode = connectCodeToHttpStatus(error.code);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });
  const json = connectErrorToJson(error, jsonWriteOptions);
  await write(res, JSON.stringify(json));
  await end(res);
}

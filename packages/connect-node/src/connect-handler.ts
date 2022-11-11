import type { HandlerSpec } from "./create-service-handlers.js";
import type * as http from "http";
import type * as http2 from "http2";
import {
  connectCodeToHttpStatus,
  ConnectError,
  connectErrorFromReason,
  connectErrorToJson,
  connectParseContentType,
} from "@bufbuild/connect-core";
import { createServerMethodSerializers } from "./create-server-method-serializers.js";
import type { HandlerContext } from "./handler.js";
import {
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
  Message,
  MethodKind,
  PartialMessage,
} from "@bufbuild/protobuf";
import {
  end,
  endWithHttpStatus,
  readToEnd,
  write,
} from "./private/handler-io.js";
import {
  nodeHeaderToWebHeader,
  webHeaderToNodeHeaders,
} from "./private/web-header-to-node-headers.js";
import { connectTrailerMux } from "./private/connect-trailer-mux.js";

export type ProtocolHandler = () => void;

export interface Protocol {
  supportsContentType(type: string | null, spec: HandlerSpec): boolean;

  handle(
    spec: HandlerSpec,
    req: http.IncomingMessage | http2.Http2ServerRequest,
    res: http.ServerResponse | http2.Http2ServerResponse
  ): Promise<void>;
}

interface Options {
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;
}

export function createConnectProtocol(options: Options = {}): Protocol {
  // const createSerializers = createServerMethodSerializers.bind(null, options.jsonOptions, options.binaryOptions);
  // const {normalize, parse, serialize} = createSerializers(spec.method, type.binary);
  return {
    supportsContentType(type: string | null): boolean {
      return connectParseContentType(type) !== undefined;
    },
    async handle<I extends Message<I>, O extends Message<O>>(
      spec: HandlerSpec<I, O>,
      req: http.IncomingMessage | http2.Http2ServerRequest,
      res: http.ServerResponse | http2.Http2ServerResponse
    ) {
      // TODO support aborted requests, and timeouts
      const type = connectParseContentType(req.headers["content-type"] ?? null);
      if (type === undefined) {
        return await endWithHttpStatus(res, 415, "Unsupported Media Type");
      }
      if (type.stream !== (spec.method.kind !== MethodKind.Unary)) {
        return await endWithHttpStatus(res, 415, "Unsupported Media Type");
      }
      if (req.method !== "POST") {
        return await endWithHttpStatus(res, 405, "Method Not Allowed");
      }
      const { normalize, parse, serialize } = createServerMethodSerializers(
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
      switch (spec.kind) {
        case MethodKind.Unary: {
          const input = parse(await readToEnd(req));
          let output: O | PartialMessage<O>;
          try {
            output = await spec.implementation(input, context);
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
          break;
        }
        case MethodKind.ServerStreaming: {
          throw new Error(
            "Not implemented yet: MethodKind.ServerStreaming case"
          );
        }
        case MethodKind.ClientStreaming: {
          throw new Error(
            "Not implemented yet: MethodKind.ClientStreaming case"
          );
        }
        case MethodKind.BiDiStreaming: {
          throw new Error("Not implemented yet: MethodKind.BiDiStreaming case");
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

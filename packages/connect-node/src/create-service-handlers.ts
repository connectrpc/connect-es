import { createMethodUrl } from "@bufbuild/connect-core";
import type {
  AnyMessage,
  Message,
  MethodInfo,
  MethodKind,
  ServiceType,
} from "@bufbuild/protobuf";
import type {
  Handler,
  HandlerOptions,
  ServerBiDiStreamingFn,
  ServerClientStreamingFn,
  ServerServerStreamingFn,
  ServerUnaryFn,
  ServiceImplementation,
} from "./handler.js";
import type * as http from "http";
import type * as http2 from "http2";
import { createConnectProtocol, Protocol } from "./connect-handler.js";
import { endWithHttpStatus } from "./private/handler-io.js";

// TODO
// prettier-ignore
export type HandlerSpec<I extends Message<I> = AnyMessage, O extends Message<O> = AnyMessage> =
  {
    service: ServiceType;
    method: MethodInfo<I, O>;
    requestPath: string;
  }
  & (
  | { kind: MethodKind.Unary;           implementation: ServerUnaryFn<I, O> }
  | { kind: MethodKind.ServerStreaming; implementation: ServerServerStreamingFn<I, O> }
  | { kind: MethodKind.ClientStreaming; implementation: ServerClientStreamingFn<I, O> }
  | { kind: MethodKind.BiDiStreaming;   implementation: ServerBiDiStreamingFn<I, O> }
  );

// TODO createMethodHandler(service, method, implementation: MethodImplementation, options: HandlerOptions): Handler

export function createServiceHandlers<T extends ServiceType>(
  service: T,
  implementation: ServiceImplementation<T>,
  options?: HandlerOptions // TODO all protocols by default; json and binary-options settable for all protocols at once; or individually add protocols
): Handler[] {
  const protocols: Protocol[] = [createConnectProtocol(options)];
  return Object.entries(service.methods).map(([name, method]) => {
    const requestPath = createMethodUrl(
      "https://example.com",
      service,
      method
    ).pathname;
    const spec = {
      kind: method.kind,
      service,
      method,
      requestPath,
      implementation: implementation[name].bind(implementation),
    } as HandlerSpec;
    function handler(
      req: http.IncomingMessage | http2.Http2ServerRequest,
      res: http.ServerResponse | http2.Http2ServerResponse
    ): boolean {
      for (const protocol of protocols) {
        if (
          protocol.supportsContentType(
            req.headers["content-type"] ?? null,
            spec
          )
        ) {
          protocol.handle(spec, req, res).catch((reason) => {
            // TODO need to handle rejections here, but it's unclear how exactly
            // eslint-disable-next-line no-console
            console.error("protocol handle failed", reason);
          });
          return true;
        }
      }
      void endWithHttpStatus(res, 415, "Unsupported Media Type");
      return true;
    }
    return Object.assign(handler, {
      service,
      method,
      requestPath,
    });
  });
}

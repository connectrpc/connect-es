import { createMethodUrl } from "@bufbuild/connect-core";
import type { MethodInfo, ServiceType } from "@bufbuild/protobuf";
import { MethodKind } from "@bufbuild/protobuf";
import type {
  Handler,
  HandlerOptions,
  MethodImpl,
  ServiceImpl,
} from "./handler.js";
import type * as http from "http";
import type * as http2 from "http2";
import { createConnectProtocol } from "./create-connect-protocol.js";
import type { ImplSpec, Protocol } from "./protocol.js";
import { endWithHttpStatus } from "./private/io.js";

/**
 * createHandlers() takes a service definition and a service implementation,
 * and returns an array of Handler functions, one for each RPC.
 */
export function createHandlers<T extends ServiceType>(
  service: T,
  implementation: ServiceImpl<T>,
  options?: HandlerOptions
): Handler[] {
  return Object.entries(service.methods).map(([name, method]) => {
    const i = implementation[name].bind(implementation);
    return createHandler(service, method, i, options);
  });
}

/**
 * createHandler takes an RPC definition and an RPC implementation, and
 * returns a Handler function.
 */
export function createHandler<M extends MethodInfo>(
  service: ServiceType,
  method: M,
  impl: MethodImpl<M>,
  options?: HandlerOptions
): Handler {
  // TODO
  const protocols: Protocol[] = [createConnectProtocol(options ?? {})];

  const protocolHandlers = protocols.map((p) =>
    Object.assign(p.createHandler(createImplSpec(service, method, impl)), p)
  );

  function handleAny(
    req: http.IncomingMessage | http2.Http2ServerRequest,
    res: http.ServerResponse | http2.Http2ServerResponse
  ): void {
    if (method.kind == MethodKind.BiDiStreaming && req.httpVersionMajor !== 2) {
      return void endWithHttpStatus(res, 505, "Version Not Supported");
    }
    if (req.method !== "POST") {
      // The gRPC-HTTP2, gRPC-Web, and Connect protocols are all POST-only.
      return void endWithHttpStatus(res, 405, "Method Not Allowed");
    }
    const handleProtocol = protocolHandlers.find((p) =>
      p.supportsMediaType(req.headers["content-type"] ?? "")
    );
    if (!handleProtocol) {
      return void endWithHttpStatus(res, 415, "Unsupported Media Type");
    }
    handleProtocol(req, res).catch((reason) => {
      // TODO need to handle rejections here, but it's unclear how exactly
      // eslint-disable-next-line no-console
      console.error("protocol handle failed", reason);
    });
  }
  return Object.assign(handleAny, {
    service,
    method,
    requestPath: createMethodUrl("https://example.com", service, method)
      .pathname,
  });
}

function createImplSpec<M extends MethodInfo>(
  service: ServiceType,
  method: M,
  impl: MethodImpl<M>
): ImplSpec {
  return {
    kind: method.kind,
    service,
    method,
    impl,
  } as ImplSpec;
}

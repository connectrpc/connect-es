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
import { endWithHttpStatus } from "./private/handler-io.js";
import { createConnectProtocol } from "./create-connect-protocol.js";
import type { ImplSpec, Protocol } from "./protocol.js";

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
  ): boolean {
    if (method.kind !== MethodKind.Unary && req.httpVersionMajor !== 2) {
      void endWithHttpStatus(res, 505, "Version Not Supported");
      return true;
    }
    if (req.method !== "POST") {
      // The gRPC-HTTP2, gRPC-Web, and Connect protocols are all POST-only.
      void endWithHttpStatus(res, 405, "Method Not Allowed");
      return true;
    }
    const handleProtocol = protocolHandlers.find((p) =>
      p.supportsMediaType(req.headers["content-type"] ?? "")
    );
    if (!handleProtocol) {
      void endWithHttpStatus(res, 415, "Unsupported Media Type");
      return true;
    }
    handleProtocol(req, res).catch((reason) => {
      // TODO need to handle rejections here, but it's unclear how exactly
      // eslint-disable-next-line no-console
      console.error("protocol handle failed", reason);
    });
    return true;
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

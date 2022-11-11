import type * as http from "http";
import type * as http2 from "http2";
import type { Handler } from "./handler.js";

type NodeHandler = (
  request: http.IncomingMessage | http2.Http2ServerRequest,
  response: http.ServerResponse | http2.Http2ServerResponse
) => void;

interface MergeHandlersOptions {
  // e.g. "/something"
  requestPathPrefix?: string;
  fallback?: NodeHandler;
}

export function mergeHandlers(
  handlers: Handler[],
  options?: MergeHandlersOptions
): NodeHandler {
  const prefix = options?.requestPathPrefix ?? "";
  const fallback =
    options?.fallback ??
    ((request, response) => {
      response.writeHead(404);
      response.end();
    });
  return function mergedHandlers(request, response) {
    for (const handler of handlers) {
      if (
        request.url === prefix + handler.requestPath &&
        handler(request, response)
      ) {
        return;
      }
    }
    fallback(request, response);
  };
}

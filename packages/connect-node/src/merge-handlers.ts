import type { Handler, NodeHandler } from "./handler.js";

/**
 * mergeHandlers takes an array of Handler functions, and merges them into a
 * single handler function that invokes the correct handler by its request
 * path. If no request path matches, it serves a 404.
 */
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
  return function handleByRequestPath(request, response) {
    const handler = handlers.find(
      (h) => request.url === prefix + h.requestPath
    );
    if (!handler) {
      return fallback(request, response);
    }
    handler(request, response);
  };
}

/**
 * Options to the function mergeHandlers().
 */
interface MergeHandlersOptions {
  /**
   * Serve all handlers under this prefix. For example, the prefix "/something"
   * will serve the RPC foo.FooService/Bar under "/something/foo.FooService/Bar".
   * Note that many gRPC client implementations do not allow for prefixes.
   */
  requestPathPrefix?: string;
  /**
   * If none of the handler request paths match, a 404 is served. This option
   * can provide a custom fallback for this case.
   */
  fallback?: NodeHandler;
}

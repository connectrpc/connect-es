/**
 * Creates headers for a gRPC-web request.
 */
export function grpcWebCreateRequestHeader(
  timeoutMs: number | undefined,
  userProvidedHeaders: HeadersInit | undefined
): Headers {
  const result = new Headers(userProvidedHeaders ?? {});
  // We provide the most explicit description for our content type.
  // Note that we do not support the grpc-web-text format.
  // https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md#protocol-differences-vs-grpc-over-http2
  result.set("Content-Type", "application/grpc-web+proto");
  // Some servers may rely on the request header `X-Grpc-Web` to identify
  // gRPC-web requests. For example the proxy by improbable:
  // https://github.com/improbable-eng/grpc-web/blob/53aaf4cdc0fede7103c1b06f0cfc560c003a5c41/go/grpcweb/wrapper.go#L231
  result.set("X-Grpc-Web", "1");
  // Note that we do not comply with recommended structure for the
  // user-agent string.
  // https://github.com/grpc/grpc/blob/c462bb8d485fc1434ecfae438823ca8d14cf3154/doc/PROTOCOL-HTTP2.md#user-agents
  result.set("X-User-Agent", "@bufbuild/connect-web");
  if (timeoutMs !== undefined) {
    result.set("Grpc-Timeout", `${timeoutMs}m`);
  }
  return result;
}

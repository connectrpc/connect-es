import type { RpcMetadata } from "./rpc-metadata";

/**
 * An error that occurred while calling a RPC method.
 */
export class RpcError extends Error {
  /**
   * A status code as string. The value depends on the `RpcTransport` being
   * used.
   *
   * For gRPC, it will be the string value of a StatusCode enum value
   * https://github.com/grpc/grpc/blob/a19d8dcfb50caa81cddc25bc1a6afdd7a2f497b7/include/grpcpp/impl/codegen/status_code_enum.h#L24
   *
   * For Twirp, it will be one of the Twirp error codes as string:
   * https://twitchtv.github.io/twirp/docs/spec_v5.html#error-codes
   */
  code: string;

  /**
   * Metadata related to the failed call.
   */
  meta: RpcMetadata;

  /**
   * The name of the RPC method that was called as declared in .proto
   */
  methodName?: string;

  /**
   * The name of the RPC service that was called as declared in .proto
   *
   * It will be in the form of:
   * - package name
   * - dot "."
   * - service name
   *
   * If the service was declared without a package, the package name and dot
   * are omitted.
   */
  serviceName?: string;

  override name = "RpcError";

  constructor(message: string, code = "UNKNOWN", meta?: RpcMetadata) {
    super(message);
    // see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#example
    Object.setPrototypeOf(this, new.target.prototype);
    this.code = code;
    this.meta = meta ?? {};
  }

  override toString() {
    const l = [this.name + ": " + this.message];
    if (this.code) {
      l.push("");
      l.push("Code: " + this.code);
    }
    if (this.serviceName && this.methodName) {
      l.push("Method: " + this.serviceName + "/" + this.methodName);
    }
    let m = Object.entries(this.meta);
    if (m.length) {
      l.push("");
      l.push("Meta:");
      for (let [k, v] of m) {
        l.push(`  ${k}: ${v}`);
      }
    }
    return l.join("\n");
  }
}

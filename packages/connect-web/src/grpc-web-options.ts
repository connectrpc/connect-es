import type { BinaryReadOptions, BinaryWriteOptions } from "@bufbuild/protobuf";
import type { RpcMetadata } from "./rpc-metadata";

/**
 * RPC options for the grpc-web transport.
 */
export interface GrpcWebOptions {
  /**
   * Base URI for all HTTP requests.
   *
   * Requests will be made to <baseUrl>/<package>.<service>/method
   *
   * Example: `baseUrl: "https://example.com/my-api"`
   *
   * This will make a `POST /my-api/my_package.MyService/Foo` to
   * `example.com` via HTTPS.
   */
  baseUrl: string;

  /**
   * Send binary or text format?
   * Defaults to text.
   */
  format?: "text" | "binary";

  /**
   * Extra options to pass through to the fetch when doing a request.
   *
   * Example: `fetchInit: { credentials: 'include' }`
   *
   * This will make requests include cookies for cross-origin calls.
   */
  fetchInit?: Omit<RequestInit, "body" | "headers" | "method" | "signal">;

  /**
   * Meta data for the call.
   *
   * RPC meta data are simple key-value pairs that usually translate
   * directly to HTTP request headers.
   *
   * If a key ends with `-bin`, it should contain binary data in base64
   * encoding, allowing you to send serialized messages.
   */
  meta?: RpcMetadata;

  /**
   * Timeout for calls in milliseconds.
   */
  timeout?: number;

  /**
   * Options for the binary wire format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;
}

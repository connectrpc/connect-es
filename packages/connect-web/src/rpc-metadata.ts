/**
 * RPC metadata provide optional additional information about a request or
 * response.
 *
 * They can be transmitted at:
 * - the start of a request (a.k.a. request headers)
 * - the start of a response (a.k.a. response headers)
 * - the end of a response (a.k.a. response trailers)
 *
 * Keys should only contain the characters a-z 0-9 _ . -
 *
 * Values can be US ASCII or binary. If a key ends with `-bin`, it contains
 * binary data in base64 encoding.
 *
 * You can encode protobuf messages as binary metadata values, including
 * `google.protobuf.Any`.
 */
export interface RpcMetadata {
  [key: string]: string | string[];
}

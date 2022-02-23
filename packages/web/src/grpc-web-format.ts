import { base64decode, base64encode } from "./base64";
import { GrpcStatusCode } from "./goog-grpc-status-code";
import { RpcError } from "./rpc-error";
import type { RpcMetadata } from "./rpc-metadata";

/**
 * Create fetch API headers for a grpc-web request.
 */
export function createGrpcWebRequestHeader(
  headers: Headers,
  format: GrpcWebFormat,
  timeout: Date | number | undefined,
  meta?: RpcMetadata,
  userAgent?: string
): Headers {
  // add meta as headers
  if (meta) {
    for (let [k, v] of Object.entries(meta)) {
      if (typeof v == "string") headers.append(k, v);
      else for (let i of v) headers.append(k, i);
    }
  }
  // set standard headers (possibly overwriting meta)
  headers.set(
    "Content-Type",
    format === "text"
      ? "application/grpc-web-text"
      : "application/grpc-web+proto"
  );
  if (format == "text") {
    // The client library should indicate to the server via the "Accept" header that
    // the response stream needs to be text encoded e.g. when XHR is used or due to
    // security policies with XHR
    headers.set("Accept", "application/grpc-web-text");
  }
  headers.set("X-Grpc-Web", "1");
  if (userAgent) headers.set("X-User-Agent", userAgent);

  if (typeof timeout === "number") {
    if (timeout <= 0) {
      // we raise an error ourselves because header "grpc-timeout" must be a positive integer
      throw new RpcError(
        `timeout ${timeout} ms exceeded`,
        GrpcStatusCode[GrpcStatusCode.DEADLINE_EXCEEDED]
      );
    }
    headers.set("grpc-timeout", `${timeout}m`);
  } else if (timeout) {
    const deadline = timeout.getTime();
    const now = Date.now();
    if (deadline <= now) {
      // we raise an error ourselves because header "grpc-timeout" must be a positive integer
      throw new RpcError(
        `deadline ${timeout} exceeded`,
        GrpcStatusCode[GrpcStatusCode.DEADLINE_EXCEEDED]
      );
    }
    headers.set("grpc-timeout", `${deadline - now}m`);
  }

  return headers;
}

/**
 * Create a fetch API request body for a grpc-web request.
 *
 * Packs the serialized message into a data frame, and base64 encodes if
 * format is "text".
 */
export function createGrpcWebRequestBody(
  message: Uint8Array,
  format: GrpcWebFormat
): Uint8Array | string;
export function createGrpcWebRequestBody(
  message: Uint8Array,
  format: "text"
): string;
export function createGrpcWebRequestBody(
  message: Uint8Array,
  format: "binary"
): Uint8Array;
export function createGrpcWebRequestBody(
  message: Uint8Array,
  format: GrpcWebFormat
): Uint8Array | string {
  let body = new Uint8Array(5 + message.length); // we need 5 bytes for frame type + message length
  body[0] = GrpcWebFrame.DATA; // first byte is frame type

  // 4 bytes message length
  for (let msgLen = message.length, i = 4; i > 0; i--) {
    body[i] = msgLen % 256;
    msgLen >>>= 8;
  }

  body.set(message, 5); // reset is message

  return format === "binary" ? body : base64encode(body);
}

/**
 * Parses a grpc status (code and optional text) and meta data from response
 * headers.
 *
 * If given a fetch response, checks for fetch-specific error information
 * ("type" property) and whether the "body" is null and throws a RpcError.
 */
export function readGrpcWebResponseHeader(
  fetchResponse: Response
): [GrpcStatusCode, string | undefined, RpcMetadata];
export function readGrpcWebResponseHeader(
  headers: HttpHeaders,
  httpStatus: number,
  httpStatusText: string
): [GrpcStatusCode, string | undefined, RpcMetadata];
export function readGrpcWebResponseHeader(
  headersOrFetchResponse: HttpHeaders | Response,
  httpStatus?: number,
  httpStatusText?: string
): [GrpcStatusCode, string | undefined, RpcMetadata] {
  if (arguments.length === 1) {
    let fetchResponse = headersOrFetchResponse as Response;
    switch (fetchResponse.type) {
      case "error":
      case "opaque":
      case "opaqueredirect":
        // see https://developer.mozilla.org/en-US/docs/Web/API/Response/type
        throw new RpcError(
          `fetch response type ${fetchResponse.type}`,
          GrpcStatusCode[GrpcStatusCode.UNKNOWN]
        );
    }
    return readGrpcWebResponseHeader(
      fetchHeadersToHttp(fetchResponse.headers),
      fetchResponse.status,
      fetchResponse.statusText
    );
  }
  let headers = headersOrFetchResponse as HttpHeaders,
    httpOk = httpStatus! >= 200 && httpStatus! < 300,
    responseMeta = parseMetadata(headers),
    [statusCode, statusDetail] = parseStatus(headers);

  if (statusCode === GrpcStatusCode.OK && !httpOk) {
    statusCode = httpStatusToGrpc(httpStatus!);
    statusDetail = httpStatusText;
  }
  return [statusCode, statusDetail, responseMeta];
}

/**
 * Parses a grpc status (code and optional text) and meta data from response
 * trailers.
 *
 * Response trailers are expected as a byte array, but are actually just an
 * ASCII string with HTTP headers. Just pass the data of a grpc-web trailer
 * frame.
 */
export function readGrpcWebResponseTrailer(
  data: Uint8Array
): [GrpcStatusCode, string | undefined, RpcMetadata] {
  let headers = parseTrailer(data),
    [code, detail] = parseStatus(headers),
    meta = parseMetadata(headers);
  return [code, detail, meta];
}

/**
 * A grpc-frame type. Can be used to determine type of frame emitted by
 * `readGrpcWebResponseBody()`.
 */
export enum GrpcWebFrame {
  DATA = 0x00,
  TRAILER = 0x80,
}

/**
 * Parses a grpc-web response (unary or server streaming) from a fetch API
 * stream.
 *
 * Emits grpc-web frames.
 *
 * The returned promise resolves when the response is complete.
 */
export async function readGrpcWebResponseBody(
  stream: ReadableStream<Uint8Array>,
  contentType: string | undefined | null,
  onFrame: FrameHandler
): Promise<void> {
  const format = parseFormat(contentType);
  const reader = stream.getReader();
  let byteQueue = new Uint8Array(0);
  let base64queue = "";

  while (true) {
    let result = await reader.read();

    if (result.value !== undefined) {
      if (format === "text") {
        // the statements below just decode base64 and append to `bytesUnread`

        // add incoming base64 to queue
        for (let i = 0; i < result.value.length; i++)
          base64queue += String.fromCharCode(result.value[i]);

        // if the base64 queue is not a multiple of 4,
        // we have to wait for more data
        let safeLen = base64queue.length - (base64queue.length % 4);
        if (safeLen === 0) continue;

        // decode safe chunk of base64 and add to byte queue
        byteQueue = concatBytes(
          byteQueue,
          base64decode(base64queue.substring(0, safeLen))
        );
        base64queue = base64queue.substring(safeLen);
      } else {
        byteQueue = concatBytes(byteQueue, result.value);
      }

      // read all fully available data frames
      while (byteQueue.length >= 5 && byteQueue[0] === GrpcWebFrame.DATA) {
        let msgLen = 0;
        for (let i = 1; i < 5; i++) msgLen = (msgLen << 8) + byteQueue[i];

        if (byteQueue.length - 5 >= msgLen) {
          // we have the entire message
          onFrame(GrpcWebFrame.DATA, byteQueue.subarray(5, 5 + msgLen));
          byteQueue = byteQueue.subarray(5 + msgLen);
        } else break; //  wait for more data
      }
    }

    // exit, but emit trailer if exists
    if (result.done) {
      if (byteQueue.length === 0) break;
      if (byteQueue[0] !== GrpcWebFrame.TRAILER || byteQueue.length < 5)
        throw new RpcError(
          "premature EOF",
          GrpcStatusCode[GrpcStatusCode.DATA_LOSS]
        );
      onFrame(GrpcWebFrame.TRAILER, byteQueue.subarray(5));
      break;
    }
  }
}

interface FrameHandler {
  (type: GrpcWebFrame, data: Uint8Array): void;
}

// internal
type GrpcWebFormat = "text" | "binary";

// internal short cut type for http headers
type HttpHeaders = { [key: string]: string | string[] };

// internal
function concatBytes(a: Uint8Array, b: Uint8Array): Uint8Array {
  let n = new Uint8Array(a.length + b.length);
  n.set(a);
  n.set(b, a.length);
  return n;
}

// determines format from response "content-type" value.
// throws if value is unknown or missing.
function parseFormat(contentType: string | undefined | null): GrpcWebFormat {
  // > the sender *should* always specify the message format, e.g. +proto, +json
  //
  // > the receiver should assume the default is "+proto" when the message format is
  // > missing in Content-Type (as "application/grpc-web")
  //
  // see https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md
  switch (contentType) {
    case "application/grpc-web-text":
    case "application/grpc-web-text+proto":
      return "text";
    case "application/grpc-web":
    case "application/grpc-web+proto":
      return "binary";
    case undefined:
    case null:
      throw new RpcError(
        "missing response content type",
        GrpcStatusCode[GrpcStatusCode.INTERNAL]
      );
    default:
      throw new RpcError(
        "unexpected response content type: " + contentType,
        GrpcStatusCode[GrpcStatusCode.INTERNAL]
      );
  }
}

// returns error code on parse failure, uses OK as default code
function parseStatus(
  headers: HttpHeaders
): [GrpcStatusCode, string | undefined] {
  let code = GrpcStatusCode.OK,
    message: string | undefined;
  let m = headers["grpc-message"];
  if (m !== undefined) {
    if (Array.isArray(m))
      return [GrpcStatusCode.INTERNAL, "invalid grpc-web message"];
    message = m;
  }
  let s = headers["grpc-status"];
  if (s !== undefined) {
    if (Array.isArray(s))
      return [GrpcStatusCode.INTERNAL, "invalid grpc-web status"];
    code = parseInt(s, 10);
    if (GrpcStatusCode[code] === undefined)
      return [GrpcStatusCode.INTERNAL, "invalid grpc-web status"];
  }
  return [code, message];
}

// skips grpc-web headers
function parseMetadata(headers: HttpHeaders): RpcMetadata {
  let meta: RpcMetadata = {};
  for (let [k, v] of Object.entries(headers))
    switch (k) {
      case "grpc-message":
      case "grpc-status":
      case "content-type":
        break;
      default:
        meta[k] = v;
    }
  return meta;
}

// parse trailer data (ASCII) to our headers rep
function parseTrailer(trailerData: Uint8Array): HttpHeaders {
  let headers: HttpHeaders = {};
  for (let chunk of String.fromCharCode
    .apply(String, trailerData as unknown as number[])
    .trim()
    .split("\r\n")) {
    if (chunk == "") continue;
    let [key, ...val] = chunk.split(":");
    const value = val.join(":").trim();
    key = key.trim();
    let e = headers[key];
    if (typeof e == "string") headers[key] = [e, value];
    else if (Array.isArray(e)) e.push(value);
    else headers[key] = value;
  }
  return headers;
}

// fetch API to our headers rep
function fetchHeadersToHttp(fetchHeaders: Headers): HttpHeaders {
  let headers: HttpHeaders = {};
  fetchHeaders.forEach((value, key) => {
    let e = headers[key];
    if (typeof e == "string") headers[key] = [e, value];
    else if (Array.isArray(e)) e.push(value);
    else headers[key] = value;
  });
  return headers;
}

// internal
function httpStatusToGrpc(httpStatus: number): GrpcStatusCode {
  switch (httpStatus) {
    case 200:
      return GrpcStatusCode.OK;
    case 400:
      return GrpcStatusCode.INVALID_ARGUMENT;
    case 401:
      return GrpcStatusCode.UNAUTHENTICATED;
    case 403:
      return GrpcStatusCode.PERMISSION_DENIED;
    case 404:
      return GrpcStatusCode.NOT_FOUND;
    case 409:
      return GrpcStatusCode.ABORTED;
    case 412:
      return GrpcStatusCode.FAILED_PRECONDITION;
    case 429:
      return GrpcStatusCode.RESOURCE_EXHAUSTED;
    case 499:
      return GrpcStatusCode.CANCELLED;
    case 500:
      return GrpcStatusCode.UNKNOWN;
    case 501:
      return GrpcStatusCode.UNIMPLEMENTED;
    case 503:
      return GrpcStatusCode.UNAVAILABLE;
    case 504:
      return GrpcStatusCode.DEADLINE_EXCEEDED;
    default:
      return GrpcStatusCode.UNKNOWN;
  }
}

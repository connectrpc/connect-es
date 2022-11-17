import type { StreamingConn } from "@bufbuild/connect-core";
import {
  Code,
  ConnectError,
  connectErrorFromReason,
  createClientMethodSerializers,
  createMethodUrl,
  decodeBinaryHeader,
  encodeEnvelope,
  GrpcStatus,
  grpcWebCodeFromHttpStatus,
  grpcWebCreateRequestHeader,
  grpcWebExpectContentType,
  grpcWebTrailerParse,
  Interceptor,
  runStreaming,
  runUnary,
  Transport,
  UnaryRequest,
  UnaryResponse,
} from "@bufbuild/connect-core";
import type {
  AnyMessage,
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
  Message,
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import * as http2 from "http2";
import type { ReadableStreamReadResultLike } from "./lib.dom.streams.js";
import { defer } from "./private/defer.js";
import { end, readEnvelope, write } from "./private/io.js";
import {
  nodeHeaderToWebHeader,
  webHeaderToNodeHeaders,
} from "./private/web-header-to-node-headers.js";

const trailerFlag = 0b10000000;

export interface GrpcWebHttp2TransportOptions {
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
   * By default, connect-node clients use the binary format.
   */
  useBinaryFormat?: boolean;

  // TODO document
  http2Options?: http2.ClientSessionOptions | http2.SecureClientSessionOptions;

  /**
   * Interceptors that should be applied to all calls running through
   * this transport. See the Interceptor type for details.
   */
  interceptors?: Interceptor[];

  /**
   * Options for the JSON format.
   */
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;

  /**
   * Options for the binary wire format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;
}

/**
 * Create a Transport for the gRPC-web protocol.
 *
 */
export function createGrpcWebHttp2Transport(
  options: GrpcWebHttp2TransportOptions
): Transport {
  const useBinaryFormat = options.useBinaryFormat ?? false;
  return {
    async unary<
      I extends Message<I> = AnyMessage,
      O extends Message<O> = AnyMessage
    >(
      service: ServiceType,
      method: MethodInfo<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: HeadersInit | undefined,
      message: PartialMessage<I>
    ): Promise<UnaryResponse<O>> {
      const { normalize, serialize, parse } = createClientMethodSerializers(
        method,
        useBinaryFormat,
        undefined,
        options.binaryOptions
      );
      try {
        return await runUnary<I, O>(
          {
            stream: false,
            service,
            method,
            url: createMethodUrl(options.baseUrl, service, method).toString(),
            init: {},
            header: grpcWebCreateRequestHeader(timeoutMs, header),
            message: normalize(message),
            signal: signal ?? new AbortController().signal,
          },
          async (req: UnaryRequest<I>): Promise<UnaryResponse<O>> => {
            const session: http2.ClientHttp2Session =
              await new Promise<http2.ClientHttp2Session>((resolve, reject) => {
                const s = http2.connect(
                  // Userinfo (user ID and password), path, querystring, and fragment details in the URL will be ignored.
                  // See https://nodejs.org/api/http2.html#http2connectauthority-options-listener
                  req.url,
                  options.http2Options,
                  (s) => resolve(s)
                );
                s.on("error", (err) => reject(err));
              });
            const stream = session.request(
              {
                ...webHeaderToNodeHeaders(req.header),
                ":method": "POST",
                ":path": new URL(req.url).pathname,
              },
              {
                signal: req.signal,
              }
            );

            const headersPromise = responseHeadersPromise(stream);
            const envelope = encodeEnvelope(0b00000000, serialize(req.message));
            await write(stream, envelope);
            await end(stream);

            const [responseCode, responseHeader] = await headersPromise;
            validateResponse(useBinaryFormat, responseCode, responseHeader);

            const messageOrTrailerResult = await readEnvelope(stream);

            if (messageOrTrailerResult.done) {
              throw "premature eof";
            }

            if (messageOrTrailerResult.value.flags === trailerFlag) {
              // Unary responses require exactly one response message, but in
              // case of an error, it is perfectly valid to have a response body
              // that only contains error trailers.
              validateGrpcStatus(
                grpcWebTrailerParse(messageOrTrailerResult.value.data)
              );
              // At this point, we received trailers only, but the trailers did
              // not have an error status code.
              throw "unexpected trailer";
            }

            const trailerResult = await readEnvelope(stream);

            if (trailerResult.done) {
              throw "missing trailer";
            }
            if (trailerResult.value.flags !== trailerFlag) {
              throw "missing trailer";
            }

            const trailer = grpcWebTrailerParse(trailerResult.value.data);
            validateGrpcStatus(trailer);

            const eofResult = await readEnvelope(stream);
            if (!eofResult.done) {
              throw "extraneous data";
            }

            return <UnaryResponse<O>>{
              stream: false,
              service,
              method,
              header: responseHeader,
              message: parse(messageOrTrailerResult.value.data),
              trailer,
            };
          },
          options.interceptors
        );
      } catch (e) {
        throw connectErrorFromReason(e, Code.Internal);
      }
    },
    async stream<
      I extends Message<I> = AnyMessage,
      O extends Message<O> = AnyMessage
    >(
      service: ServiceType,
      method: MethodInfo<I, O>,
      signal: AbortSignal | undefined,
      timeoutMs: number | undefined,
      header: HeadersInit | undefined
    ): Promise<StreamingConn<I, O>> {
      const { normalize, serialize, parse } = createClientMethodSerializers(
        method,
        useBinaryFormat,
        options.jsonOptions,
        options.binaryOptions
      );
      return runStreaming<I, O>(
        {
          stream: true,
          service,
          method,
          url: createMethodUrl(options.baseUrl, service, method).toString(),
          init: {
            method: "POST",
            redirect: "error",
            mode: "cors",
          },
          signal: signal ?? new AbortController().signal,
          header: grpcWebCreateRequestHeader(timeoutMs, header),
        },
        async (req) => {
          // eslint-disable-next-line no-useless-catch
          try {
            const session: http2.ClientHttp2Session =
              await new Promise<http2.ClientHttp2Session>((resolve, reject) => {
                const s = http2.connect(req.url, options.http2Options, (s) =>
                  resolve(s)
                );
                s.on("error", (err) => reject(err));
              });
            const stream = session.request(
              {
                ...webHeaderToNodeHeaders(req.header),
                ":method": "POST",
                ":path": new URL(req.url).pathname,
              },
              {
                signal: req.signal,
              }
            );
            const headersPromise = responseHeadersPromise(stream);
            let endStreamReceived = false;
            let messageReceived = false;
            const responseTrailer = defer<Headers>();
            const conn: StreamingConn<I, O> = {
              ...req,
              responseHeader: headersPromise.then(([, header]) => header),
              responseTrailer,
              closed: false,
              async send(message: PartialMessage<I>): Promise<void> {
                if (stream.writableEnded) {
                  throw new ConnectError(
                    "cannot send, stream is already closed"
                  );
                }
                const enveloped = encodeEnvelope(
                  0b00000000,
                  serialize(normalize(message))
                );
                await write(stream, enveloped);
              },
              async close(): Promise<void> {
                if (stream.writableEnded) {
                  throw new ConnectError(
                    "cannot close, stream is already closed"
                  );
                }
                this.closed = true;
                await end(stream);
              },
              async read(): Promise<ReadableStreamReadResultLike<O>> {
                const [responseStatus, responseHeader] = await headersPromise;
                validateResponse(
                  useBinaryFormat,
                  responseStatus,
                  responseHeader
                );

                // eslint-disable-next-line no-useless-catch
                try {
                  const result = await readEnvelope(stream);
                  if (result.done) {
                    if (messageReceived && !endStreamReceived) {
                      throw new ConnectError("missing trailers");
                    }
                    return {
                      done: true,
                      value: undefined,
                    };
                  }
                  if ((result.value.flags & trailerFlag) === trailerFlag) {
                    endStreamReceived = true;
                    const trailer = grpcWebTrailerParse(result.value.data);
                    validateGrpcStatus(trailer);
                    responseTrailer.resolve(trailer);
                    return {
                      done: true,
                      value: undefined,
                    };
                  }
                  messageReceived = true;
                  return {
                    done: false,
                    value: parse(result.value.data),
                  };
                } catch (err) {
                  throw err;
                }
              },
            };
            return Promise.resolve(conn);
          } catch (e) {
            // throw connectErrorFromNodeReason(e);
            throw e;
          }
        },
        options.interceptors
      );
    },
  };
}

function validateResponse(
  binaryFormat: boolean,
  status: number,
  headers: Headers
) {
  const code = grpcWebCodeFromHttpStatus(status);
  if (code != null) {
    throw new ConnectError(
      decodeURIComponent(headers.get("grpc-message") ?? ""),
      code
    );
  }
  grpcWebExpectContentType(binaryFormat, headers.get("Content-Type"));
  validateGrpcStatus(headers);
}

function validateGrpcStatus(headerOrTrailer: Headers) {
  // Prefer the protobuf-encoded data to the grpc-status header.
  const grpcStatusDetailsBin = headerOrTrailer.get("grpc-status-details-bin");
  if (grpcStatusDetailsBin != null) {
    const status = decodeBinaryHeader(grpcStatusDetailsBin, GrpcStatus);
    // Prefer the protobuf-encoded data to the headers.
    if (status.code == 0) {
      return;
    }
    const error = new ConnectError(
      status.message,
      status.code,
      headerOrTrailer
    );
    error.details = status.details.map(
      (any: { typeUrl: string; value: Uint8Array }) => ({
        type: any.typeUrl.substring(any.typeUrl.lastIndexOf("/") + 1),
        value: any.value,
      })
    );
    throw error;
  }
  const grpcStatus = headerOrTrailer.get("grpc-status");
  if (grpcStatus != null) {
    const code = parseInt(grpcStatus);
    if (code === 0) {
      return;
    }
    if (!(code in Code)) {
      throw new ConnectError(
        `invalid grpc-status: ${grpcStatus}`,
        Code.Internal
      );
    }
    throw new ConnectError(
      decodeURIComponent(headerOrTrailer.get("grpc-message") ?? ""),
      code,
      headerOrTrailer
    );
  }
}

// make a util?
function responseHeadersPromise(
  stream: http2.ClientHttp2Stream
): Promise<[number, Headers]> {
  return new Promise<[number, Headers]>((resolve, reject) => {
    if (stream.errored) {
      return reject(stream.errored);
    }
    stream.once("error", reject);
    function parse(
      headers: http2.IncomingHttpHeaders & http2.IncomingHttpStatusHeader
    ) {
      stream.off("error", reject);
      resolve([headers[":status"] ?? 0, nodeHeaderToWebHeader(headers)]);
    }
    stream.once("response", parse);
  });
}

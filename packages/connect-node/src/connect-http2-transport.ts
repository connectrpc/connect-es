import {
  appendHeaders,
  Code,
  connectCodeFromHttpStatus,
  connectCreateRequestHeader,
  connectEndStreamFlag,
  connectEndStreamFromJson,
  ConnectError,
  connectErrorFromJson,
  connectErrorFromReason,
  connectExpectContentType,
  connectTrailerDemux,
  createClientMethodSerializers,
  createMethodUrl,
  encodeEnvelope,
  Interceptor,
  runStreaming,
  runUnary,
  StreamingConn,
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
import type { ReadableStreamReadResultLike } from "./lib.dom.streams.js";
import * as http2 from "http2";
import {
  nodeHeaderToWebHeader,
  webHeaderToNodeHeaders,
} from "./private/web-header-to-node-headers.js";
import { defer } from "./private/defer.js";
import { jsonParse, readEnvelope, readToEnd, write } from "./private/io.js";

/**
 * Options used to configure the Connect transport.
 */
export interface ConnectHttp2TransportOptions {
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
 * Create a Transport for the Connect protocol, which makes unary and
 * server-streaming methods available to web browsers. It uses the fetch
 * API to make HTTP requests.
 */
export function createConnectHttp2Transport(
  options: ConnectHttp2TransportOptions
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
        options.jsonOptions,
        options.binaryOptions
      );
      const validateContentType = connectExpectContentType.bind(
        null,
        method.kind,
        useBinaryFormat
      );
      const createRequestHeader = connectCreateRequestHeader.bind(
        null,
        method.kind,
        useBinaryFormat
      );
      try {
        return await runUnary<I, O>(
          {
            stream: false,
            service,
            method,
            url: createMethodUrl(options.baseUrl, service, method).toString(),
            init: {},
            header: createRequestHeader(timeoutMs, header),
            message: normalize(message),
            signal: signal ?? new AbortController().signal,
          },
          async (req: UnaryRequest<I>): Promise<UnaryResponse<O>> => {
            // TODO We create a new session for every request - we should share a connection instead,
            //      and offer control over connection state via methods / properties on the transport.
            const session: http2.ClientHttp2Session = http2.connect(
              // Userinfo (user ID and password), path, querystring, and fragment details in the URL will be ignored.
              // See https://nodejs.org/api/http2.html#http2connectauthority-options-listener
              req.url,
              options.http2Options
            );
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

            await write(stream, serialize(req.message));
            stream.end();

            const [responseStatus, responseHeader] = await headersPromise;
            await validateResponseHeader(
              responseStatus,
              responseHeader,
              stream
            );
            validateContentType(responseHeader.get("Content-Type"));

            const [header, trailer] = connectTrailerDemux(responseHeader);
            return <UnaryResponse<O>>{
              stream: false,
              service,
              method,
              header,
              message: parse(await readToEnd(stream)),
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
      const validateContentType = connectExpectContentType.bind(
        null,
        method.kind,
        useBinaryFormat
      );
      const createRequestHeader = connectCreateRequestHeader.bind(
        null,
        method.kind,
        useBinaryFormat
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
          header: createRequestHeader(timeoutMs, header),
        },
        async (req) => {
          // TODO We create a new session for every request - we should share a connection instead,
          //      and offer control over connection state via methods / properties on the transport.
          const session: http2.ClientHttp2Session = http2.connect(
            // Userinfo (user ID and password), path, querystring, and fragment details in the URL will be ignored.
            // See https://nodejs.org/api/http2.html#http2connectauthority-options-listener
            req.url,
            options.http2Options
          );
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
          const responseTrailer = defer<Headers>();
          const conn: StreamingConn<I, O> = {
            ...req,
            responseHeader: headersPromise.then(([, header]) => header),
            responseTrailer,
            closed: false,
            async send(message: PartialMessage<I>): Promise<void> {
              if (stream.writableEnded) {
                throw new ConnectError("cannot send, stream is already closed");
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
              return new Promise<void>((resolve) => stream.end(resolve));
            },
            async read(): Promise<ReadableStreamReadResultLike<O>> {
              const [responseStatus, responseHeader] = await headersPromise;
              await validateResponseHeader(
                responseStatus,
                responseHeader,
                stream
              );
              validateContentType(responseHeader.get("Content-Type"));
              try {
                const result = await readEnvelope(stream);
                if (result.done) {
                  if (!endStreamReceived) {
                    throw new ConnectError("missing EndStreamResponse");
                  }
                  return {
                    done: true,
                  };
                }
                if (
                  (result.value.flags & connectEndStreamFlag) ===
                  connectEndStreamFlag
                ) {
                  endStreamReceived = true;
                  const endStream = connectEndStreamFromJson(result.value.data);
                  responseTrailer.resolve(endStream.metadata);
                  if (endStream.error) {
                    throw endStream.error;
                  }
                  return {
                    done: true,
                  };
                }
                return {
                  done: false,
                  value: parse(result.value.data),
                };
              } catch (e) {
                throw connectErrorFromReason(e);
              }
            },
          };
          return Promise.resolve(conn);
        },
        options.interceptors
      );
    },
  };
}

async function validateResponseHeader(
  status: number,
  headers: Headers,
  stream: http2.ClientHttp2Stream
) {
  const type = headers.get("Content-Type") ?? "";
  if (status != 200) {
    if (type == "application/json") {
      throw connectErrorFromJson(
        jsonParse(await readToEnd(stream)),
        appendHeaders(...connectTrailerDemux(headers))
      );
    }
    throw new ConnectError(`HTTP ${status}`, connectCodeFromHttpStatus(status));
  }
}

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

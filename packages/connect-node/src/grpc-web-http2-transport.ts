import {
  Code,
  connectErrorFromReason,
  createClientMethodSerializers,
  createMethodUrl,
  encodeEnvelope,
  grpcWebCreateRequestHeader,
  grpcWebTrailerParse,
  Interceptor,
  runUnary,
  Transport,
  UnaryRequest,
  UnaryResponse,
} from "@bufbuild/connect-core";
import type {
  AnyMessage,
  BinaryReadOptions,
  BinaryWriteOptions,
  Message,
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import * as http2 from "http2";
import { write } from "./private/client-io.js";
import { createEnvelopeReader } from "./private/create-envelope-reader.js";
import { webHeaderToNodeHeaders } from "./private/web-header-to-node-headers.js";

const trailerFlag = 0b10000000;

//TODO
// check with Timo to see if thee options between connect and grpc web are shared so we can make a reusable interface
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
   * Controls what the fetch client will do with credentials, such as
   * Cookies. The default value is "same-origin". For reference, see
   * https://fetch.spec.whatwg.org/#concept-request-credentials-mode
   */
  credentials?: RequestCredentials;

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
  // TODO remove Partial
): Partial<Transport> {
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
            const session = http2.connect(req.url, options.http2Options);
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

            const envelope = encodeEnvelope(0b00000000, serialize(req.message));
            await write(stream, envelope);
            stream.end();

            const reader = createEnvelopeReader(stream);
            const messageOrTrailerResult = await reader();

            if (messageOrTrailerResult.done) {
              throw "premature eof";
            }

            if (messageOrTrailerResult.value.flags === trailerFlag) {
              // Unary responses require exactly one response message, but in
              // case of an error, it is perfectly valid to have a response body
              // that only contains error trailers.
              // validateGrpcStatus(
              //   grpcWebTrailerParse(messageOrTrailerResult.value.data)
              // );
              // At this point, we received trailers only, but the trailers did
              // not have an error status code.
              throw "unexpected trailer";
            }

            const trailer = grpcWebTrailerParse(
              messageOrTrailerResult.value.data
            );

            return <UnaryResponse<O>>{
              stream: false,
              service,
              method,
              header,
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
    // async stream<
    //   I extends Message<I> = AnyMessage,
    //   O extends Message<O> = AnyMessage
    // >(): Promise<StreamingConn<I, O>> {},
  };
}

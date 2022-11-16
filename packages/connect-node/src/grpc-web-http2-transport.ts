import {
  Code,
  connectErrorFromReason,
  createClientMethodSerializers,
  createMethodUrl,
  grpcWebCreateRequestHeader,
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
import { write, readToEnd } from "./private/client-io.js";
import {
  webHeaderToNodeHeaders,
  nodeHeaderToWebHeader,
} from "./private/web-header-to-node-headers.js";

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
        true,
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
            const session = http2.connect(req.url);
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

            await write(stream, serialize(req.message));
            stream.end();

            const [, responseHeader] = await responseHeadersPromise(stream);
            console.log("responseHeader", responseHeader);
            return <UnaryResponse<O>>{
              stream: false,
              service,
              method,
              header,
              message: parse(await readToEnd(stream)),
              trailer: responseHeader,
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

// make this a util func
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

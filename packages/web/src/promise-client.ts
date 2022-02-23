import type {
  Message,
  MethodInfo,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
import { MethodKind } from "@bufbuild/protobuf";
import type { GrpcWebOptions } from "./grpc-web-options";
import {
  createGrpcWebRequestBody,
  createGrpcWebRequestHeader,
  GrpcWebFrame,
  readGrpcWebResponseBody,
  readGrpcWebResponseHeader,
  readGrpcWebResponseTrailer,
} from "./grpc-web-format";
import { GrpcStatusCode } from "./goog-grpc-status-code";
import type { RpcMetadata } from "./rpc-metadata";
import { RpcError } from "./rpc-error";
import type {
  MethodInfoUnary,
  MethodInfoServerStreaming,
} from "@bufbuild/protobuf";

// prettier-ignore
export type PromiseClient<T extends ServiceType> = {
  [P in keyof T["methods"]]:
    T["methods"][P] extends MethodInfoUnary<infer I, infer O>           ? (request: I) => Promise<O>
  : T["methods"][P] extends MethodInfoServerStreaming<infer I, infer O> ? (request: I) => AsyncIterable<O>
  : never;
};

// prettier-ignore
export type PromiseClientWithPartialArguments<T extends ServiceType> = {
  [P in keyof T["methods"]]:
    T["methods"][P] extends MethodInfoUnary<infer I, infer O>           ? (request: PartialMessage<I>) => Promise<O>
  : T["methods"][P] extends MethodInfoServerStreaming<infer I, infer O> ? (request: PartialMessage<I>) => AsyncIterable<O>
  : never;
};

export function makePromiseClientWithPartialArguments<T extends ServiceType>(
  service: T,
  options: GrpcWebOptions
): PromiseClientWithPartialArguments<T> {
  const client = makePromiseClient(service, options);
  const clientWPA = {} as any;
  for (const [localName, method] of Object.entries(service.methods)) {
    clientWPA[localName] = (input: PartialMessage<Message>) => {
      return client[localName](new method.I(input));
    };
  }
  return clientWPA;
}

export function makePromiseClient<T extends ServiceType>(
  service: T,
  options: GrpcWebOptions
): PromiseClient<T> {
  const client = {} as any;
  for (const [localName, method] of Object.entries(service.methods)) {
    switch (method.kind) {
      case MethodKind.Unary:
        client[localName] = async (input: Message): Promise<Message> => {
          const abort = new AbortController();
          try {
            let responseMessage: Message | undefined;
            await makeRequest(
              makeUrl(service, method, options),
              options.fetchInit ?? {},
              input.toBinary(options.binaryOptions),
              options.format ?? "text",
              true,
              options.timeout,
              options.meta ?? {},
              abort.signal,
              (code, message, meta) => {
                // TODO
                console.log("onResponseHeaderReceived", code, message, meta);
              },
              (data) => {
                responseMessage = method.O.fromBinary(
                  data,
                  options.binaryOptions
                );
              },
              (code, message, meta) => {
                // TODO
                console.log("onResponseTrailerReceived", code, message, meta);
              }
            );
            return responseMessage!;
          } catch (reason) {
            let error: RpcError;
            if (reason instanceof RpcError) {
              error = reason;
            } else if (
              reason instanceof Error &&
              reason.name === "AbortError"
            ) {
              // aborted
              error = new RpcError(
                reason.message,
                GrpcStatusCode[GrpcStatusCode.CANCELLED]
              );
            } else {
              // RpcErrors are thrown by us, everything else is an internal error
              error = new RpcError(
                reason instanceof Error ? reason.message : String(reason),
                GrpcStatusCode[GrpcStatusCode.INTERNAL]
              );
            }
            throw error;
          }
        };
        break;

      case MethodKind.ServerStreaming:
        // TODO
        break;

      case MethodKind.ClientStreaming:
        break;

      case MethodKind.BiDiStreaming:
        break;
    }
  }
  return client as PromiseClient<T>;
}

function makeUrl(
  service: ServiceType,
  method: MethodInfo,
  options: GrpcWebOptions
): string {
  let base = options.baseUrl;
  if (base.endsWith("/")) {
    base = base.substring(0, base.length - 1);
  }
  return `${base}/${service.typeName}/${method.name}`;
}

async function makeRequest(
  url: string,
  fetchInit: RequestInit,
  inputBytes: Uint8Array,
  format: "text" | "binary",
  unary: boolean,
  timeout: number | undefined,
  requestMetadata: RpcMetadata,
  abortSignal: AbortSignal,
  onResponseHeaderReceived: (
    code: GrpcStatusCode,
    message: string | undefined,
    meta: RpcMetadata
  ) => void,
  onResponseMessageReceived: (data: Uint8Array) => void,
  onResponseTrailerReceived: (
    code: GrpcStatusCode,
    message: string | undefined,
    meta: RpcMetadata
  ) => void
): Promise<void> {
  const fetchResponse = await globalThis.fetch(url, {
    ...fetchInit,
    method: "POST",
    headers: createGrpcWebRequestHeader(
      new globalThis.Headers(),
      format,
      timeout,
      requestMetadata
    ),
    body: createGrpcWebRequestBody(inputBytes, format),
    signal: abortSignal,
  });
  let [responseCode, responseMessage, responseMetadata] =
    readGrpcWebResponseHeader(fetchResponse);
  if (responseCode !== GrpcStatusCode.OK) {
    throw new RpcError(
      responseMessage ?? GrpcStatusCode[responseCode],
      GrpcStatusCode[responseCode],
      responseMetadata
    );
  }

  onResponseHeaderReceived(responseCode, responseMessage, responseMetadata);

  if (!fetchResponse.body) {
    throw new RpcError(
      "missing response body",
      GrpcStatusCode[GrpcStatusCode.INTERNAL]
    );
  }

  let messagesReceived = 0;
  let trailerReceived = false;

  await readGrpcWebResponseBody(
    fetchResponse.body,
    fetchResponse.headers.get("content-type"),
    (type, data) => {
      switch (type) {
        case GrpcWebFrame.DATA:
          // TODO this does not validate that at least one message is received - IIRC the spec is unclear
          messagesReceived++;
          if (unary && messagesReceived > 2) {
            throw new RpcError(
              "received second message for unary call",
              GrpcStatusCode[GrpcStatusCode.INTERNAL]
            );
          }
          onResponseMessageReceived(data);
          break;
        case GrpcWebFrame.TRAILER:
          if (trailerReceived) {
            throw new RpcError(
              "received second trailer",
              GrpcStatusCode[GrpcStatusCode.INTERNAL]
            );
          }
          trailerReceived = true;
          const [trailerCode, trailerMessage, trailerMetadata] =
            readGrpcWebResponseTrailer(data);
          if (trailerCode !== GrpcStatusCode.OK) {
            throw new RpcError(
              trailerMessage ?? GrpcStatusCode[trailerCode],
              GrpcStatusCode[trailerCode],
              trailerMetadata
            );
          }
          onResponseTrailerReceived(
            trailerCode,
            trailerMessage,
            trailerMetadata
          );
          break;
      }
    }
  );
  if (!trailerReceived) {
    throw new RpcError(
      "did not receive trailer",
      GrpcStatusCode[GrpcStatusCode.INTERNAL]
    );
  }
}

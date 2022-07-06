import {
    AnyClient,
    CallOptions,
    makeAnyClient,
    Transport,
    StreamResponse,
} from '@bufbuild/connect-web'
import {
    ServiceType,
    PartialMessage,
    MethodInfoServerStreaming,
    MethodInfo,
    MethodInfoUnary,
    MethodKind,
    Message,
} from '@bufbuild/protobuf'
import { Observable, Subscriber } from 'rxjs'

export type ObservableClient<T extends ServiceType> = {
    [P in keyof T['methods']]: T['methods'][P] extends MethodInfoUnary<
        infer I,
        infer O
    >
        ? UnaryFn<I, O>
        : T['methods'][P] extends MethodInfoServerStreaming<infer I, infer O>
        ? ServerStreamingFn<I, O>
        : never
}

export function createObservableClient<T extends ServiceType>(
    service: T,
    transport: Transport
) {
    return makeAnyClient(service, (method) => {
        switch (method.kind) {
            case MethodKind.Unary:
                return createUnaryFn(transport, service, method)
            case MethodKind.ServerStreaming:
                return createServerStreamingFn(transport, service, method)
            default:
                return null
        }
    }) as ObservableClient<T>
}

type UnaryFn<I extends Message<I>, O extends Message<O>> = (
    request: PartialMessage<I>,
    options?: CallOptions
) => Observable<O>

function createUnaryFn<I extends Message<I>, O extends Message<O>>(
    transport: Transport,
    service: ServiceType,
    method: MethodInfo<I, O>
): UnaryFn<I, O> {
    return function (requestMessage, options) {
        return new Observable<O>((subscriber) => {
            transport
                .unary(
                    service,
                    method,
                    options?.signal,
                    options?.timeoutMs,
                    options?.headers,
                    requestMessage
                )
                .then(
                    (response) => {
                        options?.onHeader?.(response.header)
                        subscriber.next(response.message)
                        options?.onTrailer?.(response.trailer)
                    },
                    (err) => {
                        subscriber.error(err)
                    }
                )
                .finally(() => {
                    subscriber.complete()
                })
        })
    }
}

type ServerStreamingFn<I extends Message<I>, O extends Message<O>> = (
    request: PartialMessage<I>,
    options?: CallOptions
) => Observable<O>

function createServerStreamingFn<I extends Message<I>, O extends Message<O>>(
    transport: Transport,
    service: ServiceType,
    method: MethodInfo<I, O>
): ServerStreamingFn<I, O> {
    return function (requestMessage, options) {
        return new Observable<O>((subscriber) => {
            transport
                .serverStream(
                    service,
                    method,
                    options?.signal,
                    options?.timeoutMs,
                    options?.headers,
                    requestMessage
                )
                .then(
                    (streamResponse) => {
                        options?.onHeader?.(streamResponse.header)
                        readStreamResponse(streamResponse, subscriber, options)
                    },
                    (err) => {
                        subscriber.error(err)
                    }
                )
        })
    }
}

function readStreamResponse<T extends Message<T>>(
    streamResponse: StreamResponse<T>,
    subscriber: Subscriber<T>,
    options?: CallOptions
) {
    streamResponse.read().then(
        (result) => {
            if (result.done) {
                options?.onTrailer?.(streamResponse.trailer)
                subscriber.complete()
                return
            }
            subscriber.next(result.value)
            readStreamResponse(streamResponse, subscriber, options)
        },
        (err) => {
            subscriber.error(err)
        }
    )
}

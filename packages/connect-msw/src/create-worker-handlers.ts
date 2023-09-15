import { MethodIdempotency } from "@bufbuild/protobuf";
import type { ConnectRouter } from "@connectrpc/connect";
import type { UniversalHandler } from "@connectrpc/connect/protocol";
import { http, HttpResponse } from "msw";
import type { RequestHandler, ResponseResolver } from "msw";

function createResponseResolver(handler: UniversalHandler): ResponseResolver {
  return async ({ request }) => {
    const bodyGenerator = streamToAsyncIterator(request.body);

    const universalResult = await handler({
      body: bodyGenerator,
      header: request.headers,
      httpVersion: "2.0",
      method: request.method,
      signal: request.signal,
      url: request.url,
    });

    return new HttpResponse(
      universalResult.body === undefined
        ? undefined
        : asyncIterableToStream(universalResult.body),
      { status: universalResult.status, headers: universalResult.header }
    );
  };
}

export interface Options {
  baseUrl: string;
}

export function createWorkerHandlers(
  router: ConnectRouter,
  options: Options
): RequestHandler[] {
  const sanitizedBaseUrl = options.baseUrl.replace(/\/+$/g, "");
  return router.handlers.flatMap((handler) => {
    const handlers: RequestHandler[] = [
      http.post(
        `${sanitizedBaseUrl}${handler.requestPath}`,
        createResponseResolver(handler)
      ),
    ];

    // TODO: We could simplify to use http.all if we don't mind that it'll mock
    // some endpoints that don't exist (delete, patch, etc.). We also don't know
    // if they configured useHttpGet so the get might be superfluous.
    if (handler.method.idempotency === MethodIdempotency.NoSideEffects) {
      handlers.push(
        http.get(
          `${sanitizedBaseUrl}${handler.requestPath}`,
          createResponseResolver(handler)
        )
      );
    }
    return handlers;
  });
}

async function* streamToAsyncIterator<T>(
  stream: ReadableStream<T> | undefined | null
): AsyncGenerator<T> {
  if (stream === undefined || stream === null) {
    return;
  }
  const reader = stream.getReader();

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

function asyncIterableToStream<T>(input: AsyncIterable<T>): ReadableStream<T> {
  const stream = new ReadableStream<T>({
    async start(controller) {
      try {
        for await (const chunk of input) {
          controller.enqueue(chunk);
        }
      } finally {
        controller.close();
      }
    },
  });
  return stream;
}

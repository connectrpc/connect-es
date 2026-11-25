// Copyright 2021-2026 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { createRegistry } from "@bufbuild/protobuf";
import {
  Codec,
  HTTPVersion,
  Protocol,
  Compression as ConformanceCompression,
  UnaryRequestSchema,
  ServerStreamRequestSchema,
  ClientStreamRequestSchema,
  BidiStreamRequestSchema,
  IdempotentUnaryRequestSchema,
} from "@connectrpc/connect-conformance";
import type { ClientCompatRequest } from "@connectrpc/connect-conformance";
import { createTransport as createConnectTransport } from "@connectrpc/connect/protocol-connect";
import { createTransport as createGrpcWebTransport } from "@connectrpc/connect/protocol-grpc-web";
import { createFetchClient } from "@connectrpc/connect/protocol";
import type { Compression } from "@connectrpc/connect/protocol";
import type { RequestInitCfProperties } from "@cloudflare/workers-types";
import { compressionDeflate, compressionGzip } from "./compression.js";

/**
 * Cloudflare-specific fetch() init type.
 */
type CloudflareRequestInit = RequestInit & {
  cf?: RequestInitCfProperties;
};

function createWorkerHttpClient(cf?: RequestInitCfProperties) {
  return createFetchClient(async (input, init) => {
    const cfInit: CloudflareRequestInit | undefined =
      cf === undefined ? init : { ...init, cf };
    const signal = (input as Request).signal;
    const t0 = Date.now();
    const events: string[] = [];
    const note = (s: string) => events.push(`+${Date.now() - t0}ms ${s}`);
    signal.addEventListener("abort", () => note("fetch-signal-aborted"));
    const annotate = (phase: string, err: unknown) => {
      const name = err instanceof Error ? err.name : typeof err;
      const message = err instanceof Error ? err.message : String(err);
      const stack = err instanceof Error ? (err.stack ?? "").split("\n").slice(1, 4).map((l) => l.trim()).join(" < ") : "";
      note(`${phase}-error ${name}:${message} sigAborted=${signal.aborted} stack=${stack}`);
      const annotated = new Error(`${message} FETCHDIAG[${events.join(" | ")}]`);
      annotated.name = name;
      return annotated;
    };
    let res: Response;
    try {
      res = await fetch(input, cfInit);
    } catch (e) {
      throw annotate("fetch", e);
    }
    const headerNames: string[] = [];
    res.headers.forEach((_, k) => headerNames.push(k));
    note(`response status=${res.status} headers=${headerNames.join(",")}`);
    let body: ReadableStream<Uint8Array> | null = null;
    if (res.body !== null) {
      const reader = res.body.getReader();
      let bytes = 0;
      body = new ReadableStream<Uint8Array>({
        async pull(controller) {
          let r: ReadableStreamReadResult<Uint8Array>;
          try {
            r = await reader.read();
          } catch (e) {
            controller.error(annotate("read", e));
            return;
          }
          if (r.done) {
            note(`read-eof bytes=${bytes}`);
            controller.close();
            return;
          }
          bytes += r.value.byteLength;
          const head = Array.from(r.value.subarray(0, 8)).map((b) => b.toString(16).padStart(2, "0")).join("");
          note(`read len=${r.value.byteLength} head=${head}`);
          controller.enqueue(r.value);
        },
        cancel(reason) {
          note(`body-cancel ${reason instanceof Error ? reason.name : String(reason)}`);
          return reader.cancel(reason);
        },
      });
    }
    // Cloudflare decompresses the response, but retains the original content-encoding and
    // content-length headers.
    //
    // https://github.com/WinterTC55/fetch/issues/23
    const headers = new Headers(res.headers);
    if (headers.has("content-encoding")) {
      headers.delete("content-encoding");
      headers.delete("content-length");
    }
    return new Response(body, {
      headers,
      status: res.status,
      statusText: res.statusText,
    });
  });
}

/**
 * Configure a transport for a client running as a Cloudflare Worker under test.
 *
 * The conformance test runner Schemaribes the call we should make in the
 * message connectrpc.conformance.v1.ClientCompatRequest. We create a transport
 * for the call, with the corresponding protocol, HTTP version, compression, and
 * other details. If a configuration is not supported, we raise an error.
 */
export function createTransport(req: ClientCompatRequest) {
  let scheme = "https://";
  if (req.serverTlsCert.length > 0) {
    scheme = "https://";
  }
  const baseUrl = `${scheme}${req.host}`;
  switch (req.httpVersion) {
    case HTTPVersion.HTTP_VERSION_1:
    case HTTPVersion.HTTP_VERSION_2:
      break;
    case HTTPVersion.HTTP_VERSION_3:
      throw new Error("HTTP/3 is not supported");
    default:
      throw new Error("Unknown HTTP version");
  }
  let sendCompression: Compression | null = null;
  switch (req.compression) {
    case ConformanceCompression.GZIP:
      sendCompression = compressionGzip;
      break;
    case ConformanceCompression.DEFLATE:
      sendCompression = compressionDeflate;
      break;
    case ConformanceCompression.BR:
    case ConformanceCompression.SNAPPY:
    case ConformanceCompression.ZSTD:
      throw new Error("Unsupported compression");
    case ConformanceCompression.UNSPECIFIED:
    case ConformanceCompression.IDENTITY:
      break;
  }

  if (req.clientTlsCreds !== undefined) {
    throw new Error("Client TLS is not supported");
  }

  const sharedOptions = {
    baseUrl,
    httpClient: createWorkerHttpClient(),
    useBinaryFormat: req.codec === Codec.PROTO,
    interceptors: [],
    acceptCompression: sendCompression !== null ? [sendCompression] : [],
    sendCompression,
    readMaxBytes: 0xffffffff,
    writeMaxBytes: 0xffffffff,
    defaultTimeoutMs: req.timeoutMs,
    compressMinBytes: -1, // To account for empty messages
    jsonOptions: {
      registry: createRegistry(
        UnaryRequestSchema,
        ServerStreamRequestSchema,
        ClientStreamRequestSchema,
        BidiStreamRequestSchema,
        IdempotentUnaryRequestSchema,
      ),
    },
  } satisfies Parameters<typeof createConnectTransport>[0];
  switch (req.protocol) {
    case Protocol.CONNECT:
      return createConnectTransport({
        ...sharedOptions,
        useHttpGet: req.useGetHttpMethod,
      });
    case Protocol.GRPC:
      // Send gRPC-Web and let Cloudflare convert it to gRPC.
      return createGrpcWebTransport({
        ...sharedOptions,
        httpClient: createWorkerHttpClient({ grpcWeb: "convert" }),
      });
    case Protocol.GRPC_WEB:
      return createGrpcWebTransport(sharedOptions);
    default:
      throw new Error("Unknown protocol");
  }
}

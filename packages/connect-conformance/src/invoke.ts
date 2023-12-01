// Copyright 2021-2023 The Connect Authors
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

import {
  createPromiseClient,
  PromiseClient,
  ConnectError,
} from "@connectrpc/connect";
import type { Transport } from "@connectrpc/connect";
import {
  ClientCompatRequest,
  ClientResponseResult,
} from "./gen/connectrpc/conformance/v1/client_compat_pb.js";
import {
  UnaryRequest,
  Header as ConformanceHeader,
  ClientStreamRequest,
  ServerStreamRequest,
  ConformancePayload,
  BidiStreamRequest,
  UnimplementedRequest,
} from "./gen/connectrpc/conformance/v1/service_pb.js";
import {
  convertToProtoError,
  convertToProtoHeaders,
  appendProtoHeaders,
  wait,
} from "./protocol.js";
import { ConformanceService } from "./gen/connectrpc/conformance/v1/service_connect.js";
import { createWritableIterable } from "@connectrpc/connect/protocol";
import { StreamType } from "./gen/connectrpc/conformance/v1/config_pb.js";

type ConformanceClient = PromiseClient<typeof ConformanceService>;

async function unary(client: ConformanceClient, req: ClientCompatRequest) {
  if (req.requestMessages.length !== 1) {
    throw new Error("Unary method requires exactly one request message");
  }
  const msg = req.requestMessages[0];
  const uReq = new UnaryRequest();
  if (!msg.unpackTo(uReq)) {
    throw new Error("Could not unpack request message to unary request");
  }
  const reqHeader = new Headers();
  appendProtoHeaders(reqHeader, req.requestHeaders);
  let error: ConnectError | undefined = undefined;
  let resHeaders: ConformanceHeader[] = [];
  let resTrailers: ConformanceHeader[] = [];
  const payloads: ConformancePayload[] = [];
  try {
    const uRes = await client.unary(uReq, {
      headers: reqHeader,
      onHeader(headers) {
        resHeaders = convertToProtoHeaders(headers);
      },
      onTrailer(trailers) {
        resTrailers = convertToProtoHeaders(trailers);
      },
    });
    payloads.push(uRes.payload!);
  } catch (e) {
    error = ConnectError.from(e);
    resHeaders = convertToProtoHeaders(error.metadata);
    resTrailers = convertToProtoHeaders(error.metadata);
  }
  return new ClientResponseResult({
    payloads: payloads,
    responseHeaders: resHeaders,
    responseTrailers: resTrailers,
    error: convertToProtoError(error),
  });
}

async function serverStream(
  client: ConformanceClient,
  req: ClientCompatRequest,
) {
  if (req.requestMessages.length !== 1) {
    throw new Error("ServerStream method requires exactly one request message");
  }
  const msg = req.requestMessages[0];
  const uReq = new ServerStreamRequest();
  if (!msg.unpackTo(uReq)) {
    throw new Error(
      "Could not unpack request message to server stream request",
    );
  }
  const reqHeader = new Headers();
  appendProtoHeaders(reqHeader, req.requestHeaders);
  let error: ConnectError | undefined = undefined;
  let resHeaders: ConformanceHeader[] = [];
  let resTrailers: ConformanceHeader[] = [];
  const payloads: ConformancePayload[] = [];
  try {
    for await (const msg of client.serverStream(uReq, {
      headers: reqHeader,
      onHeader(headers) {
        resHeaders = convertToProtoHeaders(headers);
      },
      onTrailer(trailers) {
        resTrailers = convertToProtoHeaders(trailers);
      },
    })) {
      payloads.push(msg.payload!);
    }
  } catch (e) {
    error = ConnectError.from(e);
    resHeaders = convertToProtoHeaders(error.metadata);
    resTrailers = convertToProtoHeaders(error.metadata);
  }
  return new ClientResponseResult({
    responseHeaders: resHeaders,
    responseTrailers: resTrailers,
    payloads: payloads,
    error: convertToProtoError(error),
  });
}

async function clientStream(
  client: ConformanceClient,
  req: ClientCompatRequest,
) {
  const reqHeaders = new Headers();
  appendProtoHeaders(reqHeaders, req.requestHeaders);
  let error: ConnectError | undefined = undefined;
  let resHeaders: ConformanceHeader[] = [];
  let resTrailers: ConformanceHeader[] = [];
  const payloads: ConformancePayload[] = [];
  try {
    const csRes = await client.clientStream(
      (async function* () {
        for (const msg of req.requestMessages) {
          const csReq = new ClientStreamRequest();
          if (!msg.unpackTo(csReq)) {
            throw new Error(
              "Could not unpack request message to client stream request",
            );
          }
          await wait(req.requestDelayMs);
          yield csReq;
        }
      })(),
      {
        headers: reqHeaders,
        onHeader(headers) {
          resHeaders = convertToProtoHeaders(headers);
        },
        onTrailer(trailers) {
          resTrailers = convertToProtoHeaders(trailers);
        },
      },
    );
    payloads.push(csRes.payload!);
  } catch (e) {
    error = ConnectError.from(e);
    resHeaders = convertToProtoHeaders(error.metadata);
    resTrailers = convertToProtoHeaders(error.metadata);
  }
  return new ClientResponseResult({
    responseHeaders: resHeaders,
    responseTrailers: resTrailers,
    payloads: payloads,
    error: convertToProtoError(error),
  });
}

async function bidiStream(client: ConformanceClient, req: ClientCompatRequest) {
  const reqHeaders = new Headers();
  appendProtoHeaders(reqHeaders, req.requestHeaders);
  let error: ConnectError | undefined = undefined;
  let resHeaders: ConformanceHeader[] = [];
  let resTrailers: ConformanceHeader[] = [];
  const payloads: ConformancePayload[] = [];
  try {
    const reqIt = createWritableIterable<BidiStreamRequest>();
    const sRes = client.bidiStream(reqIt, {
      headers: reqHeaders,
      onHeader(headers) {
        resHeaders = convertToProtoHeaders(headers);
      },
      onTrailer(trailers) {
        resTrailers = convertToProtoHeaders(trailers);
      },
    });
    const resIt = sRes[Symbol.asyncIterator]();
    for (const msg of req.requestMessages) {
      const bdReq = new BidiStreamRequest();
      if (!msg.unpackTo(bdReq)) {
        throw new Error(
          "Could not unpack request message to client stream request",
        );
      }
      await wait(req.requestDelayMs);
      await reqIt.write(bdReq);
      if (req.streamType === StreamType.FULL_DUPLEX_BIDI_STREAM) {
        const next = await resIt.next();
        if (next.done === true) {
          continue;
        }
        payloads.push(next.value.payload!);
      }
    }
    reqIt.close();
    // Drain the response iterator
    for (;;) {
      const next = await resIt.next();
      if (next.done === true) {
        break;
      }
      payloads.push(next.value.payload!);
    }
  } catch (e) {
    error = ConnectError.from(e);
    resHeaders = convertToProtoHeaders(error.metadata);
    resTrailers = convertToProtoHeaders(error.metadata);
  }
  return new ClientResponseResult({
    responseHeaders: resHeaders,
    responseTrailers: resTrailers,
    payloads: payloads,
    error: convertToProtoError(error),
  });
}

async function unimplemented(
  client: ConformanceClient,
  req: ClientCompatRequest,
) {
  const msg = req.requestMessages[0];
  const unReq = new UnimplementedRequest();
  if (!msg.unpackTo(unReq)) {
    throw new Error("Could not unpack request message to unary request");
  }
  const reqHeader = new Headers();
  appendProtoHeaders(reqHeader, req.requestHeaders);
  let error: ConnectError | undefined = undefined;
  let resHeaders: ConformanceHeader[] = [];
  let resTrailers: ConformanceHeader[] = [];
  try {
    await client.unimplemented(unReq, {
      headers: reqHeader,
      onHeader(headers) {
        resHeaders = convertToProtoHeaders(headers);
      },
      onTrailer(trailers) {
        resTrailers = convertToProtoHeaders(trailers);
      },
    });
  } catch (e) {
    error = ConnectError.from(e);
    resHeaders = convertToProtoHeaders(error.metadata);
    resTrailers = convertToProtoHeaders(error.metadata);
  }
  return new ClientResponseResult({
    responseHeaders: resHeaders,
    responseTrailers: resTrailers,
    error: convertToProtoError(error),
  });
}

export default (transport: Transport, req: ClientCompatRequest) => {
  const client = createPromiseClient(ConformanceService, transport);
  switch (req.method) {
    case ConformanceService.methods.unary.name:
      return unary(client, req);
    case ConformanceService.methods.serverStream.name:
      return serverStream(client, req);
    case ConformanceService.methods.clientStream.name:
      return clientStream(client, req);
    case ConformanceService.methods.bidiStream.name:
      return bidiStream(client, req);
    case ConformanceService.methods.unimplemented.name:
      return unimplemented(client, req);
    default:
      throw new Error(`Unknown method: ${req.method}`);
  }
};

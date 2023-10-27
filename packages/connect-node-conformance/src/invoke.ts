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
} from "./gen/connectrpc/conformance/v1/service_pb.js";
import {
  convertToProtoError,
  convertToProtoHeaders,
  appendProtoHeaders,
  wait,
} from "./protocol.js";
import { ConformanceService } from "./gen/connectrpc/conformance/v1/service_connect.js";

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
  let resHeaders: ConformanceHeader[], resTrailers: ConformanceHeader[];
  const payloads: ConformancePayload[] = [];
  let error: ConnectError | undefined = undefined;
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
  }
  return new ClientResponseResult({
    responseHeaders: resHeaders!,
    responseTrailers: resTrailers!,
    error: convertToProtoError(error),
  });
}

async function serverStream(
  client: ConformanceClient,
  req: ClientCompatRequest
) {
  if (req.requestMessages.length !== 1) {
    throw new Error("ServerStream method requires exactly one request message");
  }
  const msg = req.requestMessages[0];
  const uReq = new ServerStreamRequest();
  if (!msg.unpackTo(uReq)) {
    throw new Error(
      "Could not unpack request message to server stream request"
    );
  }
  const reqHeader = new Headers();
  appendProtoHeaders(reqHeader, req.requestHeaders);
  let resHeaders: ConformanceHeader[], resTrailers: ConformanceHeader[];
  const payloads: ConformancePayload[] = [];
  let error: ConnectError | undefined = undefined;
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
  }
  return new ClientResponseResult({
    responseHeaders: resHeaders!,
    responseTrailers: resTrailers!,
    payloads: payloads,
    error: convertToProtoError(error),
  });
}

async function clientStream(
  client: ConformanceClient,
  req: ClientCompatRequest
) {
  const reqHeaders = new Headers();
  appendProtoHeaders(reqHeaders, req.requestHeaders);
  let resHeaders: ConformanceHeader[], resTrailers: ConformanceHeader[];
  const payloads: ConformancePayload[] = [];
  let error: ConnectError | undefined = undefined;
  try {
    const csRes = await client.clientStream(
      (async function* () {
        for (const msg of req.requestMessages) {
          const csReq = new ClientStreamRequest();
          if (!msg.unpackTo(csReq)) {
            throw new Error(
              "Could not unpack request message to client stream request"
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
      }
    );
    payloads.push(csRes.payload!);
  } catch (e) {
    error = ConnectError.from(e);
  }
  return new ClientResponseResult({
    responseHeaders: resHeaders!,
    responseTrailers: resTrailers!,
    payloads: payloads,
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
      throw new Error("Function not implemented.");
    default:
      throw new Error(`Unknown method: ${req.method}`);
  }
};

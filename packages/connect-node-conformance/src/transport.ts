import { ClientCompatRequest } from "./gen/connectrpc/conformance/v1/client_compat_pb.js";
import {
  Codec,
  HTTPVersion,
  Protocol,
  Compression as ConformanceCompression,
} from "./gen/connectrpc/conformance/v1/config_pb.js";
import {
  createConnectTransport,
  createGrpcTransport,
  compressionGzip,
  compressionBrotli,
  createGrpcWebTransport,
} from "@connectrpc/connect-node";
import { Compression } from "@connectrpc/connect/protocol";

export function createTransport(req: ClientCompatRequest) {
  let scheme = "http://";
  if (req.serverTlsCert.length > 0) {
    scheme = "https://";
  }
  const baseUrl = `${scheme}${req.host}:${req.port}`;

  let httpVersion: "1.1" | "2";
  switch (req.httpVersion) {
    case HTTPVersion.HTTP_VERSION_1:
      httpVersion = "1.1";
      break;
    case HTTPVersion.HTTP_VERSION_2:
      httpVersion = "2";
      break;
    case HTTPVersion.HTTP_VERSION_3:
      throw new Error("HTTP/3 is not supported");
    default:
      throw new Error("Unknown HTTP version");
  }

  let sendCompression: Compression | undefined = undefined;

  switch (req.compression) {
    case ConformanceCompression.GZIP:
      sendCompression = compressionGzip;
      break;
    case ConformanceCompression.BR:
      sendCompression = compressionBrotli;
      break;
    case ConformanceCompression.DEFLATE:
    case ConformanceCompression.SNAPPY:
    case ConformanceCompression.ZSTD:
      throw new Error("Unsupported compression");
    case ConformanceCompression.UNSPECIFIED:
    case ConformanceCompression.IDENTITY:
      break;
  }

  const sharedOptions = {
    baseUrl,
    httpVersion,
    useBinaryFormat: req.codec === Codec.PROTO,
    sendCompression,
    defaultTimeoutMs: req.timeoutMs,
  };

  switch (req.protocol) {
    case Protocol.CONNECT:
      return createConnectTransport({
        ...sharedOptions,
        useHttpGet: req.useGetHttpMethod,
      });
    case Protocol.GRPC:
      return createGrpcTransport({ ...sharedOptions });
    case Protocol.GRPC_WEB:
      return createGrpcWebTransport({ ...sharedOptions });
    default:
      throw new Error("Unknown protocol");
  }
}

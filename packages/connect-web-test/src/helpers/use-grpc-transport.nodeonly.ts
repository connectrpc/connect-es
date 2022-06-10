import {
  baseUrl,
  clientCert,
  clientKey,
  crosstestTransports,
} from "../util/crosstestserver.js";
import { createGrpcTransport } from "../util/grpc-transport.nodeonly.js";
import * as grpc from "@grpc/grpc-js";
import * as tls from "tls";
import type { UnaryInterceptor } from "@bufbuild/connect-web";

// add the gRPC transport - but only when running in node
crosstestTransports["gRPC transport"] = (
  unaryInterceptors?: UnaryInterceptor[]
) =>
  createGrpcTransport({
    address: baseUrl.substring("https://".length),
    channelCredentials: grpc.ChannelCredentials.createFromSecureContext(
      tls.createSecureContext({
        cert: clientCert,
        key: clientKey,
      })
    ),
    unaryInterceptors,
  });

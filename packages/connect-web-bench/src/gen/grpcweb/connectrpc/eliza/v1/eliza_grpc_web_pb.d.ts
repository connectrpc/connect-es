import * as grpcWeb from 'grpc-web';

import * as connectrpc_eliza_v1_eliza_pb from '../../../connectrpc/eliza/v1/eliza_pb'; // proto import: "connectrpc/eliza/v1/eliza.proto"


export class ElizaServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  say(
    request: connectrpc_eliza_v1_eliza_pb.SayRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: connectrpc_eliza_v1_eliza_pb.SayResponse) => void
  ): grpcWeb.ClientReadableStream<connectrpc_eliza_v1_eliza_pb.SayResponse>;

  introduce(
    request: connectrpc_eliza_v1_eliza_pb.IntroduceRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<connectrpc_eliza_v1_eliza_pb.IntroduceResponse>;

}

export class ElizaServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  say(
    request: connectrpc_eliza_v1_eliza_pb.SayRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<connectrpc_eliza_v1_eliza_pb.SayResponse>;

  introduce(
    request: connectrpc_eliza_v1_eliza_pb.IntroduceRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<connectrpc_eliza_v1_eliza_pb.IntroduceResponse>;

}


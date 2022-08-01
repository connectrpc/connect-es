import * as grpcWeb from 'grpc-web';

import * as buf_connect_demo_eliza_v1_eliza_pb from '../../../../../buf/connect/demo/eliza/v1/eliza_pb';


export class ElizaServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  say(
    request: buf_connect_demo_eliza_v1_eliza_pb.SayRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_connect_demo_eliza_v1_eliza_pb.SayResponse) => void
  ): grpcWeb.ClientReadableStream<buf_connect_demo_eliza_v1_eliza_pb.SayResponse>;

  introduce(
    request: buf_connect_demo_eliza_v1_eliza_pb.IntroduceRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<buf_connect_demo_eliza_v1_eliza_pb.IntroduceResponse>;

}

export class ElizaServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  say(
    request: buf_connect_demo_eliza_v1_eliza_pb.SayRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_connect_demo_eliza_v1_eliza_pb.SayResponse>;

  introduce(
    request: buf_connect_demo_eliza_v1_eliza_pb.IntroduceRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<buf_connect_demo_eliza_v1_eliza_pb.IntroduceResponse>;

}


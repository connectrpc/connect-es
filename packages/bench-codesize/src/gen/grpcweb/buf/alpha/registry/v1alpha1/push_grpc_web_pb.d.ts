import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_push_pb from '../../../../buf/alpha/registry/v1alpha1/push_pb';


export class PushServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  push(
    request: buf_alpha_registry_v1alpha1_push_pb.PushRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_push_pb.PushResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_push_pb.PushResponse>;

}

export class PushServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  push(
    request: buf_alpha_registry_v1alpha1_push_pb.PushRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_push_pb.PushResponse>;

}


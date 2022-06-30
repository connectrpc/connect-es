import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_owner_pb from '../../../../buf/alpha/registry/v1alpha1/owner_pb';


export class OwnerServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getOwnerByName(
    request: buf_alpha_registry_v1alpha1_owner_pb.GetOwnerByNameRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_owner_pb.GetOwnerByNameResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_owner_pb.GetOwnerByNameResponse>;

}

export class OwnerServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getOwnerByName(
    request: buf_alpha_registry_v1alpha1_owner_pb.GetOwnerByNameRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_owner_pb.GetOwnerByNameResponse>;

}


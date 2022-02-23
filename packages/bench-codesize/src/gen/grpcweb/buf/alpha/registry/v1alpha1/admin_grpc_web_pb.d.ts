import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_admin_pb from '../../../../buf/alpha/registry/v1alpha1/admin_pb';


export class AdminServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  forceDeleteUser(
    request: buf_alpha_registry_v1alpha1_admin_pb.ForceDeleteUserRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_admin_pb.ForceDeleteUserResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_admin_pb.ForceDeleteUserResponse>;

}

export class AdminServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  forceDeleteUser(
    request: buf_alpha_registry_v1alpha1_admin_pb.ForceDeleteUserRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_admin_pb.ForceDeleteUserResponse>;

}


import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_authn_pb from '../../../../buf/alpha/registry/v1alpha1/authn_pb';


export class AuthnServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getCurrentUser(
    request: buf_alpha_registry_v1alpha1_authn_pb.GetCurrentUserRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authn_pb.GetCurrentUserResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authn_pb.GetCurrentUserResponse>;

  getCurrentUserSubject(
    request: buf_alpha_registry_v1alpha1_authn_pb.GetCurrentUserSubjectRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_authn_pb.GetCurrentUserSubjectResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_authn_pb.GetCurrentUserSubjectResponse>;

}

export class AuthnServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getCurrentUser(
    request: buf_alpha_registry_v1alpha1_authn_pb.GetCurrentUserRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authn_pb.GetCurrentUserResponse>;

  getCurrentUserSubject(
    request: buf_alpha_registry_v1alpha1_authn_pb.GetCurrentUserSubjectRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_authn_pb.GetCurrentUserSubjectResponse>;

}


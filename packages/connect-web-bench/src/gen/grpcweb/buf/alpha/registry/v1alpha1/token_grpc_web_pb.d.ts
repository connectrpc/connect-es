import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_token_pb from '../../../../buf/alpha/registry/v1alpha1/token_pb';


export class TokenServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  createToken(
    request: buf_alpha_registry_v1alpha1_token_pb.CreateTokenRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_token_pb.CreateTokenResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_token_pb.CreateTokenResponse>;

  getToken(
    request: buf_alpha_registry_v1alpha1_token_pb.GetTokenRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_token_pb.GetTokenResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_token_pb.GetTokenResponse>;

  listTokens(
    request: buf_alpha_registry_v1alpha1_token_pb.ListTokensRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_token_pb.ListTokensResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_token_pb.ListTokensResponse>;

  deleteToken(
    request: buf_alpha_registry_v1alpha1_token_pb.DeleteTokenRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_token_pb.DeleteTokenResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_token_pb.DeleteTokenResponse>;

}

export class TokenServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  createToken(
    request: buf_alpha_registry_v1alpha1_token_pb.CreateTokenRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_token_pb.CreateTokenResponse>;

  getToken(
    request: buf_alpha_registry_v1alpha1_token_pb.GetTokenRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_token_pb.GetTokenResponse>;

  listTokens(
    request: buf_alpha_registry_v1alpha1_token_pb.ListTokensRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_token_pb.ListTokensResponse>;

  deleteToken(
    request: buf_alpha_registry_v1alpha1_token_pb.DeleteTokenRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_token_pb.DeleteTokenResponse>;

}


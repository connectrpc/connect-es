import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_resolve_pb from '../../../../buf/alpha/registry/v1alpha1/resolve_pb';


export class ResolveServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getModulePins(
    request: buf_alpha_registry_v1alpha1_resolve_pb.GetModulePinsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_resolve_pb.GetModulePinsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_resolve_pb.GetModulePinsResponse>;

}

export class LocalResolveServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getLocalModulePins(
    request: buf_alpha_registry_v1alpha1_resolve_pb.GetLocalModulePinsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_resolve_pb.GetLocalModulePinsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_resolve_pb.GetLocalModulePinsResponse>;

}

export class ResolveServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getModulePins(
    request: buf_alpha_registry_v1alpha1_resolve_pb.GetModulePinsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_resolve_pb.GetModulePinsResponse>;

}

export class LocalResolveServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getLocalModulePins(
    request: buf_alpha_registry_v1alpha1_resolve_pb.GetLocalModulePinsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_resolve_pb.GetLocalModulePinsResponse>;

}


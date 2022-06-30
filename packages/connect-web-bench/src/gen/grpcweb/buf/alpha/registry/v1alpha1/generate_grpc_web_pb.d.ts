import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_generate_pb from '../../../../buf/alpha/registry/v1alpha1/generate_pb';


export class GenerateServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  generatePlugins(
    request: buf_alpha_registry_v1alpha1_generate_pb.GeneratePluginsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_generate_pb.GeneratePluginsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_generate_pb.GeneratePluginsResponse>;

  generateTemplate(
    request: buf_alpha_registry_v1alpha1_generate_pb.GenerateTemplateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_generate_pb.GenerateTemplateResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_generate_pb.GenerateTemplateResponse>;

}

export class GenerateServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  generatePlugins(
    request: buf_alpha_registry_v1alpha1_generate_pb.GeneratePluginsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_generate_pb.GeneratePluginsResponse>;

  generateTemplate(
    request: buf_alpha_registry_v1alpha1_generate_pb.GenerateTemplateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_generate_pb.GenerateTemplateResponse>;

}


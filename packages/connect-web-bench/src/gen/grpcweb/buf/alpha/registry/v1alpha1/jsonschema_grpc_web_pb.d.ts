import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_jsonschema_pb from '../../../../buf/alpha/registry/v1alpha1/jsonschema_pb';


export class JSONSchemaServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getJSONSchema(
    request: buf_alpha_registry_v1alpha1_jsonschema_pb.GetJSONSchemaRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_jsonschema_pb.GetJSONSchemaResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_jsonschema_pb.GetJSONSchemaResponse>;

}

export class JSONSchemaServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getJSONSchema(
    request: buf_alpha_registry_v1alpha1_jsonschema_pb.GetJSONSchemaRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_jsonschema_pb.GetJSONSchemaResponse>;

}


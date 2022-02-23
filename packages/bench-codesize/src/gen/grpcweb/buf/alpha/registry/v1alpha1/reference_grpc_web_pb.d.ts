import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_reference_pb from '../../../../buf/alpha/registry/v1alpha1/reference_pb';


export class ReferenceServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getReferenceByName(
    request: buf_alpha_registry_v1alpha1_reference_pb.GetReferenceByNameRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_reference_pb.GetReferenceByNameResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_reference_pb.GetReferenceByNameResponse>;

}

export class ReferenceServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getReferenceByName(
    request: buf_alpha_registry_v1alpha1_reference_pb.GetReferenceByNameRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_reference_pb.GetReferenceByNameResponse>;

}


import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_search_pb from '../../../../buf/alpha/registry/v1alpha1/search_pb';


export class SearchServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  search(
    request: buf_alpha_registry_v1alpha1_search_pb.SearchRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_search_pb.SearchResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_search_pb.SearchResponse>;

}

export class SearchServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  search(
    request: buf_alpha_registry_v1alpha1_search_pb.SearchRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_search_pb.SearchResponse>;

}


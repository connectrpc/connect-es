import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_repository_tag_pb from '../../../../buf/alpha/registry/v1alpha1/repository_tag_pb';


export class RepositoryTagServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  createRepositoryTag(
    request: buf_alpha_registry_v1alpha1_repository_tag_pb.CreateRepositoryTagRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_tag_pb.CreateRepositoryTagResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_tag_pb.CreateRepositoryTagResponse>;

  listRepositoryTags(
    request: buf_alpha_registry_v1alpha1_repository_tag_pb.ListRepositoryTagsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_tag_pb.ListRepositoryTagsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_tag_pb.ListRepositoryTagsResponse>;

}

export class RepositoryTagServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  createRepositoryTag(
    request: buf_alpha_registry_v1alpha1_repository_tag_pb.CreateRepositoryTagRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_tag_pb.CreateRepositoryTagResponse>;

  listRepositoryTags(
    request: buf_alpha_registry_v1alpha1_repository_tag_pb.ListRepositoryTagsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_tag_pb.ListRepositoryTagsResponse>;

}


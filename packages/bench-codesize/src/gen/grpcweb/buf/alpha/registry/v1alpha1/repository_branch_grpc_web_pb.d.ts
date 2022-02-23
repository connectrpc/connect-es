import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_repository_branch_pb from '../../../../buf/alpha/registry/v1alpha1/repository_branch_pb';


export class RepositoryBranchServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  createRepositoryBranch(
    request: buf_alpha_registry_v1alpha1_repository_branch_pb.CreateRepositoryBranchRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_branch_pb.CreateRepositoryBranchResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_branch_pb.CreateRepositoryBranchResponse>;

  listRepositoryBranches(
    request: buf_alpha_registry_v1alpha1_repository_branch_pb.ListRepositoryBranchesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_branch_pb.ListRepositoryBranchesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_branch_pb.ListRepositoryBranchesResponse>;

}

export class RepositoryBranchServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  createRepositoryBranch(
    request: buf_alpha_registry_v1alpha1_repository_branch_pb.CreateRepositoryBranchRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_branch_pb.CreateRepositoryBranchResponse>;

  listRepositoryBranches(
    request: buf_alpha_registry_v1alpha1_repository_branch_pb.ListRepositoryBranchesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_branch_pb.ListRepositoryBranchesResponse>;

}


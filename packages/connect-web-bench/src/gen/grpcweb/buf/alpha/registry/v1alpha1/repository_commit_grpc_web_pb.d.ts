import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_repository_commit_pb from '../../../../buf/alpha/registry/v1alpha1/repository_commit_pb';


export class RepositoryCommitServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  listRepositoryCommitsByBranch(
    request: buf_alpha_registry_v1alpha1_repository_commit_pb.ListRepositoryCommitsByBranchRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_commit_pb.ListRepositoryCommitsByBranchResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_commit_pb.ListRepositoryCommitsByBranchResponse>;

  listRepositoryCommitsByReference(
    request: buf_alpha_registry_v1alpha1_repository_commit_pb.ListRepositoryCommitsByReferenceRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_commit_pb.ListRepositoryCommitsByReferenceResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_commit_pb.ListRepositoryCommitsByReferenceResponse>;

  getRepositoryCommitByReference(
    request: buf_alpha_registry_v1alpha1_repository_commit_pb.GetRepositoryCommitByReferenceRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_commit_pb.GetRepositoryCommitByReferenceResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_commit_pb.GetRepositoryCommitByReferenceResponse>;

  getRepositoryCommitBySequenceId(
    request: buf_alpha_registry_v1alpha1_repository_commit_pb.GetRepositoryCommitBySequenceIdRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_commit_pb.GetRepositoryCommitBySequenceIdResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_commit_pb.GetRepositoryCommitBySequenceIdResponse>;

}

export class RepositoryCommitServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  listRepositoryCommitsByBranch(
    request: buf_alpha_registry_v1alpha1_repository_commit_pb.ListRepositoryCommitsByBranchRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_commit_pb.ListRepositoryCommitsByBranchResponse>;

  listRepositoryCommitsByReference(
    request: buf_alpha_registry_v1alpha1_repository_commit_pb.ListRepositoryCommitsByReferenceRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_commit_pb.ListRepositoryCommitsByReferenceResponse>;

  getRepositoryCommitByReference(
    request: buf_alpha_registry_v1alpha1_repository_commit_pb.GetRepositoryCommitByReferenceRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_commit_pb.GetRepositoryCommitByReferenceResponse>;

  getRepositoryCommitBySequenceId(
    request: buf_alpha_registry_v1alpha1_repository_commit_pb.GetRepositoryCommitBySequenceIdRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_commit_pb.GetRepositoryCommitBySequenceIdResponse>;

}


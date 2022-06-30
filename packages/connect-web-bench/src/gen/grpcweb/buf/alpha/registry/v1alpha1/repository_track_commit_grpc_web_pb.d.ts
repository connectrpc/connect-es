import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_repository_track_commit_pb from '../../../../buf/alpha/registry/v1alpha1/repository_track_commit_pb';


export class RepositoryTrackCommitServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getRepositoryTrackCommitByRepositoryCommit(
    request: buf_alpha_registry_v1alpha1_repository_track_commit_pb.GetRepositoryTrackCommitByRepositoryCommitRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_track_commit_pb.GetRepositoryTrackCommitByRepositoryCommitResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_track_commit_pb.GetRepositoryTrackCommitByRepositoryCommitResponse>;

  listRepositoryTrackCommitsByRepositoryTrack(
    request: buf_alpha_registry_v1alpha1_repository_track_commit_pb.ListRepositoryTrackCommitsByRepositoryTrackRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_track_commit_pb.ListRepositoryTrackCommitsByRepositoryTrackResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_track_commit_pb.ListRepositoryTrackCommitsByRepositoryTrackResponse>;

  getRepositoryTrackCommitByReference(
    request: buf_alpha_registry_v1alpha1_repository_track_commit_pb.GetRepositoryTrackCommitByReferenceRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_track_commit_pb.GetRepositoryTrackCommitByReferenceResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_track_commit_pb.GetRepositoryTrackCommitByReferenceResponse>;

}

export class RepositoryTrackCommitServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getRepositoryTrackCommitByRepositoryCommit(
    request: buf_alpha_registry_v1alpha1_repository_track_commit_pb.GetRepositoryTrackCommitByRepositoryCommitRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_track_commit_pb.GetRepositoryTrackCommitByRepositoryCommitResponse>;

  listRepositoryTrackCommitsByRepositoryTrack(
    request: buf_alpha_registry_v1alpha1_repository_track_commit_pb.ListRepositoryTrackCommitsByRepositoryTrackRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_track_commit_pb.ListRepositoryTrackCommitsByRepositoryTrackResponse>;

  getRepositoryTrackCommitByReference(
    request: buf_alpha_registry_v1alpha1_repository_track_commit_pb.GetRepositoryTrackCommitByReferenceRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_track_commit_pb.GetRepositoryTrackCommitByReferenceResponse>;

}


import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_repository_track_pb from '../../../../buf/alpha/registry/v1alpha1/repository_track_pb';


export class RepositoryTrackServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  createRepositoryTrack(
    request: buf_alpha_registry_v1alpha1_repository_track_pb.CreateRepositoryTrackRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_track_pb.CreateRepositoryTrackResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_track_pb.CreateRepositoryTrackResponse>;

  listRepositoryTracks(
    request: buf_alpha_registry_v1alpha1_repository_track_pb.ListRepositoryTracksRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_track_pb.ListRepositoryTracksResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_track_pb.ListRepositoryTracksResponse>;

  deleteRepositoryTrackByName(
    request: buf_alpha_registry_v1alpha1_repository_track_pb.DeleteRepositoryTrackByNameRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_track_pb.DeleteRepositoryTrackByNameResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_track_pb.DeleteRepositoryTrackByNameResponse>;

  getRepositoryTrackByName(
    request: buf_alpha_registry_v1alpha1_repository_track_pb.GetRepositoryTrackByNameRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_track_pb.GetRepositoryTrackByNameResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_track_pb.GetRepositoryTrackByNameResponse>;

}

export class RepositoryTrackServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  createRepositoryTrack(
    request: buf_alpha_registry_v1alpha1_repository_track_pb.CreateRepositoryTrackRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_track_pb.CreateRepositoryTrackResponse>;

  listRepositoryTracks(
    request: buf_alpha_registry_v1alpha1_repository_track_pb.ListRepositoryTracksRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_track_pb.ListRepositoryTracksResponse>;

  deleteRepositoryTrackByName(
    request: buf_alpha_registry_v1alpha1_repository_track_pb.DeleteRepositoryTrackByNameRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_track_pb.DeleteRepositoryTrackByNameResponse>;

  getRepositoryTrackByName(
    request: buf_alpha_registry_v1alpha1_repository_track_pb.GetRepositoryTrackByNameRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_track_pb.GetRepositoryTrackByNameResponse>;

}


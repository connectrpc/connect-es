import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_repository_pb from '../../../../buf/alpha/registry/v1alpha1/repository_pb';


export class RepositoryServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getRepository(
    request: buf_alpha_registry_v1alpha1_repository_pb.GetRepositoryRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_pb.GetRepositoryResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_pb.GetRepositoryResponse>;

  getRepositoryByFullName(
    request: buf_alpha_registry_v1alpha1_repository_pb.GetRepositoryByFullNameRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_pb.GetRepositoryByFullNameResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_pb.GetRepositoryByFullNameResponse>;

  listRepositories(
    request: buf_alpha_registry_v1alpha1_repository_pb.ListRepositoriesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_pb.ListRepositoriesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_pb.ListRepositoriesResponse>;

  listUserRepositories(
    request: buf_alpha_registry_v1alpha1_repository_pb.ListUserRepositoriesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_pb.ListUserRepositoriesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_pb.ListUserRepositoriesResponse>;

  listRepositoriesUserCanAccess(
    request: buf_alpha_registry_v1alpha1_repository_pb.ListRepositoriesUserCanAccessRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_pb.ListRepositoriesUserCanAccessResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_pb.ListRepositoriesUserCanAccessResponse>;

  listOrganizationRepositories(
    request: buf_alpha_registry_v1alpha1_repository_pb.ListOrganizationRepositoriesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_pb.ListOrganizationRepositoriesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_pb.ListOrganizationRepositoriesResponse>;

  createRepositoryByFullName(
    request: buf_alpha_registry_v1alpha1_repository_pb.CreateRepositoryByFullNameRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_pb.CreateRepositoryByFullNameResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_pb.CreateRepositoryByFullNameResponse>;

  deleteRepository(
    request: buf_alpha_registry_v1alpha1_repository_pb.DeleteRepositoryRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_pb.DeleteRepositoryResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_pb.DeleteRepositoryResponse>;

  deleteRepositoryByFullName(
    request: buf_alpha_registry_v1alpha1_repository_pb.DeleteRepositoryByFullNameRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_pb.DeleteRepositoryByFullNameResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_pb.DeleteRepositoryByFullNameResponse>;

  deprecateRepositoryByName(
    request: buf_alpha_registry_v1alpha1_repository_pb.DeprecateRepositoryByNameRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_pb.DeprecateRepositoryByNameResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_pb.DeprecateRepositoryByNameResponse>;

  undeprecateRepositoryByName(
    request: buf_alpha_registry_v1alpha1_repository_pb.UndeprecateRepositoryByNameRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_pb.UndeprecateRepositoryByNameResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_pb.UndeprecateRepositoryByNameResponse>;

  getRepositoriesByFullName(
    request: buf_alpha_registry_v1alpha1_repository_pb.GetRepositoriesByFullNameRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_pb.GetRepositoriesByFullNameResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_pb.GetRepositoriesByFullNameResponse>;

  setRepositoryContributor(
    request: buf_alpha_registry_v1alpha1_repository_pb.SetRepositoryContributorRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_pb.SetRepositoryContributorResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_pb.SetRepositoryContributorResponse>;

  listRepositoryContributors(
    request: buf_alpha_registry_v1alpha1_repository_pb.ListRepositoryContributorsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_pb.ListRepositoryContributorsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_pb.ListRepositoryContributorsResponse>;

  getRepositorySettings(
    request: buf_alpha_registry_v1alpha1_repository_pb.GetRepositorySettingsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_repository_pb.GetRepositorySettingsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_repository_pb.GetRepositorySettingsResponse>;

}

export class RepositoryServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getRepository(
    request: buf_alpha_registry_v1alpha1_repository_pb.GetRepositoryRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_pb.GetRepositoryResponse>;

  getRepositoryByFullName(
    request: buf_alpha_registry_v1alpha1_repository_pb.GetRepositoryByFullNameRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_pb.GetRepositoryByFullNameResponse>;

  listRepositories(
    request: buf_alpha_registry_v1alpha1_repository_pb.ListRepositoriesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_pb.ListRepositoriesResponse>;

  listUserRepositories(
    request: buf_alpha_registry_v1alpha1_repository_pb.ListUserRepositoriesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_pb.ListUserRepositoriesResponse>;

  listRepositoriesUserCanAccess(
    request: buf_alpha_registry_v1alpha1_repository_pb.ListRepositoriesUserCanAccessRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_pb.ListRepositoriesUserCanAccessResponse>;

  listOrganizationRepositories(
    request: buf_alpha_registry_v1alpha1_repository_pb.ListOrganizationRepositoriesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_pb.ListOrganizationRepositoriesResponse>;

  createRepositoryByFullName(
    request: buf_alpha_registry_v1alpha1_repository_pb.CreateRepositoryByFullNameRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_pb.CreateRepositoryByFullNameResponse>;

  deleteRepository(
    request: buf_alpha_registry_v1alpha1_repository_pb.DeleteRepositoryRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_pb.DeleteRepositoryResponse>;

  deleteRepositoryByFullName(
    request: buf_alpha_registry_v1alpha1_repository_pb.DeleteRepositoryByFullNameRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_pb.DeleteRepositoryByFullNameResponse>;

  deprecateRepositoryByName(
    request: buf_alpha_registry_v1alpha1_repository_pb.DeprecateRepositoryByNameRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_pb.DeprecateRepositoryByNameResponse>;

  undeprecateRepositoryByName(
    request: buf_alpha_registry_v1alpha1_repository_pb.UndeprecateRepositoryByNameRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_pb.UndeprecateRepositoryByNameResponse>;

  getRepositoriesByFullName(
    request: buf_alpha_registry_v1alpha1_repository_pb.GetRepositoriesByFullNameRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_pb.GetRepositoriesByFullNameResponse>;

  setRepositoryContributor(
    request: buf_alpha_registry_v1alpha1_repository_pb.SetRepositoryContributorRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_pb.SetRepositoryContributorResponse>;

  listRepositoryContributors(
    request: buf_alpha_registry_v1alpha1_repository_pb.ListRepositoryContributorsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_pb.ListRepositoryContributorsResponse>;

  getRepositorySettings(
    request: buf_alpha_registry_v1alpha1_repository_pb.GetRepositorySettingsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_repository_pb.GetRepositorySettingsResponse>;

}


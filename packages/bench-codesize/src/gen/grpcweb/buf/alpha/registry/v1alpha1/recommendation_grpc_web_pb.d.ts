import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_recommendation_pb from '../../../../buf/alpha/registry/v1alpha1/recommendation_pb';


export class RecommendationServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  recommendedRepositories(
    request: buf_alpha_registry_v1alpha1_recommendation_pb.RecommendedRepositoriesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_recommendation_pb.RecommendedRepositoriesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_recommendation_pb.RecommendedRepositoriesResponse>;

  recommendedTemplates(
    request: buf_alpha_registry_v1alpha1_recommendation_pb.RecommendedTemplatesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_recommendation_pb.RecommendedTemplatesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_recommendation_pb.RecommendedTemplatesResponse>;

  listRecommendedRepositories(
    request: buf_alpha_registry_v1alpha1_recommendation_pb.ListRecommendedRepositoriesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_recommendation_pb.ListRecommendedRepositoriesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_recommendation_pb.ListRecommendedRepositoriesResponse>;

  listRecommendedTemplates(
    request: buf_alpha_registry_v1alpha1_recommendation_pb.ListRecommendedTemplatesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_recommendation_pb.ListRecommendedTemplatesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_recommendation_pb.ListRecommendedTemplatesResponse>;

  setRecommendedRepositories(
    request: buf_alpha_registry_v1alpha1_recommendation_pb.SetRecommendedRepositoriesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_recommendation_pb.SetRecommendedRepositoriesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_recommendation_pb.SetRecommendedRepositoriesResponse>;

  setRecommendedTemplates(
    request: buf_alpha_registry_v1alpha1_recommendation_pb.SetRecommendedTemplatesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_recommendation_pb.SetRecommendedTemplatesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_recommendation_pb.SetRecommendedTemplatesResponse>;

}

export class RecommendationServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  recommendedRepositories(
    request: buf_alpha_registry_v1alpha1_recommendation_pb.RecommendedRepositoriesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_recommendation_pb.RecommendedRepositoriesResponse>;

  recommendedTemplates(
    request: buf_alpha_registry_v1alpha1_recommendation_pb.RecommendedTemplatesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_recommendation_pb.RecommendedTemplatesResponse>;

  listRecommendedRepositories(
    request: buf_alpha_registry_v1alpha1_recommendation_pb.ListRecommendedRepositoriesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_recommendation_pb.ListRecommendedRepositoriesResponse>;

  listRecommendedTemplates(
    request: buf_alpha_registry_v1alpha1_recommendation_pb.ListRecommendedTemplatesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_recommendation_pb.ListRecommendedTemplatesResponse>;

  setRecommendedRepositories(
    request: buf_alpha_registry_v1alpha1_recommendation_pb.SetRecommendedRepositoriesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_recommendation_pb.SetRecommendedRepositoriesResponse>;

  setRecommendedTemplates(
    request: buf_alpha_registry_v1alpha1_recommendation_pb.SetRecommendedTemplatesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_recommendation_pb.SetRecommendedTemplatesResponse>;

}


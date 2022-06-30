import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_doc_pb from '../../../../buf/alpha/registry/v1alpha1/doc_pb';


export class DocServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getSourceDirectoryInfo(
    request: buf_alpha_registry_v1alpha1_doc_pb.GetSourceDirectoryInfoRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_doc_pb.GetSourceDirectoryInfoResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_doc_pb.GetSourceDirectoryInfoResponse>;

  getSourceFile(
    request: buf_alpha_registry_v1alpha1_doc_pb.GetSourceFileRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_doc_pb.GetSourceFileResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_doc_pb.GetSourceFileResponse>;

  getModulePackages(
    request: buf_alpha_registry_v1alpha1_doc_pb.GetModulePackagesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_doc_pb.GetModulePackagesResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_doc_pb.GetModulePackagesResponse>;

  getModuleDocumentation(
    request: buf_alpha_registry_v1alpha1_doc_pb.GetModuleDocumentationRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_doc_pb.GetModuleDocumentationResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_doc_pb.GetModuleDocumentationResponse>;

  getPackageDocumentation(
    request: buf_alpha_registry_v1alpha1_doc_pb.GetPackageDocumentationRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_doc_pb.GetPackageDocumentationResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_doc_pb.GetPackageDocumentationResponse>;

}

export class DocServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getSourceDirectoryInfo(
    request: buf_alpha_registry_v1alpha1_doc_pb.GetSourceDirectoryInfoRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_doc_pb.GetSourceDirectoryInfoResponse>;

  getSourceFile(
    request: buf_alpha_registry_v1alpha1_doc_pb.GetSourceFileRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_doc_pb.GetSourceFileResponse>;

  getModulePackages(
    request: buf_alpha_registry_v1alpha1_doc_pb.GetModulePackagesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_doc_pb.GetModulePackagesResponse>;

  getModuleDocumentation(
    request: buf_alpha_registry_v1alpha1_doc_pb.GetModuleDocumentationRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_doc_pb.GetModuleDocumentationResponse>;

  getPackageDocumentation(
    request: buf_alpha_registry_v1alpha1_doc_pb.GetPackageDocumentationRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_doc_pb.GetPackageDocumentationResponse>;

}


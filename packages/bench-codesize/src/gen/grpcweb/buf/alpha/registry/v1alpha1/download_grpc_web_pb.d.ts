import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_download_pb from '../../../../buf/alpha/registry/v1alpha1/download_pb';


export class DownloadServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  download(
    request: buf_alpha_registry_v1alpha1_download_pb.DownloadRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_download_pb.DownloadResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_download_pb.DownloadResponse>;

}

export class DownloadServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  download(
    request: buf_alpha_registry_v1alpha1_download_pb.DownloadRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_download_pb.DownloadResponse>;

}


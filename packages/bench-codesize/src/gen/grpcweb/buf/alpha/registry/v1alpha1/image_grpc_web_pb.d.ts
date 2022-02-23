import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_image_pb from '../../../../buf/alpha/registry/v1alpha1/image_pb';


export class ImageServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getImage(
    request: buf_alpha_registry_v1alpha1_image_pb.GetImageRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_image_pb.GetImageResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_image_pb.GetImageResponse>;

}

export class ImageServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getImage(
    request: buf_alpha_registry_v1alpha1_image_pb.GetImageRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_image_pb.GetImageResponse>;

}


import * as jspb from 'google-protobuf'

import * as buf_alpha_module_v1alpha1_module_pb from '../../../../buf/alpha/module/v1alpha1/module_pb';


export class DownloadRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): DownloadRequest;

  getRepository(): string;
  setRepository(value: string): DownloadRequest;

  getReference(): string;
  setReference(value: string): DownloadRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DownloadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DownloadRequest): DownloadRequest.AsObject;
  static serializeBinaryToWriter(message: DownloadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DownloadRequest;
  static deserializeBinaryFromReader(message: DownloadRequest, reader: jspb.BinaryReader): DownloadRequest;
}

export namespace DownloadRequest {
  export type AsObject = {
    owner: string,
    repository: string,
    reference: string,
  }
}

export class DownloadResponse extends jspb.Message {
  getModule(): buf_alpha_module_v1alpha1_module_pb.Module | undefined;
  setModule(value?: buf_alpha_module_v1alpha1_module_pb.Module): DownloadResponse;
  hasModule(): boolean;
  clearModule(): DownloadResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DownloadResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DownloadResponse): DownloadResponse.AsObject;
  static serializeBinaryToWriter(message: DownloadResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DownloadResponse;
  static deserializeBinaryFromReader(message: DownloadResponse, reader: jspb.BinaryReader): DownloadResponse;
}

export namespace DownloadResponse {
  export type AsObject = {
    module?: buf_alpha_module_v1alpha1_module_pb.Module.AsObject,
  }
}


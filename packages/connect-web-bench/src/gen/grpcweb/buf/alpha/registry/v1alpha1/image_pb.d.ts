import * as jspb from 'google-protobuf'

import * as buf_alpha_image_v1_image_pb from '../../../../buf/alpha/image/v1/image_pb';


export class GetImageRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): GetImageRequest;

  getRepository(): string;
  setRepository(value: string): GetImageRequest;

  getReference(): string;
  setReference(value: string): GetImageRequest;

  getExcludeImports(): boolean;
  setExcludeImports(value: boolean): GetImageRequest;

  getExcludeSourceInfo(): boolean;
  setExcludeSourceInfo(value: boolean): GetImageRequest;

  getTypesList(): Array<string>;
  setTypesList(value: Array<string>): GetImageRequest;
  clearTypesList(): GetImageRequest;
  addTypes(value: string, index?: number): GetImageRequest;

  getIncludeMaskList(): Array<ImageMask>;
  setIncludeMaskList(value: Array<ImageMask>): GetImageRequest;
  clearIncludeMaskList(): GetImageRequest;
  addIncludeMask(value: ImageMask, index?: number): GetImageRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetImageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetImageRequest): GetImageRequest.AsObject;
  static serializeBinaryToWriter(message: GetImageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetImageRequest;
  static deserializeBinaryFromReader(message: GetImageRequest, reader: jspb.BinaryReader): GetImageRequest;
}

export namespace GetImageRequest {
  export type AsObject = {
    owner: string,
    repository: string,
    reference: string,
    excludeImports: boolean,
    excludeSourceInfo: boolean,
    typesList: Array<string>,
    includeMaskList: Array<ImageMask>,
  }
}

export class GetImageResponse extends jspb.Message {
  getImage(): buf_alpha_image_v1_image_pb.Image | undefined;
  setImage(value?: buf_alpha_image_v1_image_pb.Image): GetImageResponse;
  hasImage(): boolean;
  clearImage(): GetImageResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetImageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetImageResponse): GetImageResponse.AsObject;
  static serializeBinaryToWriter(message: GetImageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetImageResponse;
  static deserializeBinaryFromReader(message: GetImageResponse, reader: jspb.BinaryReader): GetImageResponse;
}

export namespace GetImageResponse {
  export type AsObject = {
    image?: buf_alpha_image_v1_image_pb.Image.AsObject,
  }
}

export enum ImageMask { 
  IMAGE_MASK_UNSPECIFIED = 0,
  IMAGE_MASK_MESSAGES = 1,
  IMAGE_MASK_ENUMS = 2,
  IMAGE_MASK_SERVICES = 3,
}

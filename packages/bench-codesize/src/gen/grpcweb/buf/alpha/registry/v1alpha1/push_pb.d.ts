import * as jspb from 'google-protobuf'

import * as buf_alpha_module_v1alpha1_module_pb from '../../../../buf/alpha/module/v1alpha1/module_pb';
import * as buf_alpha_registry_v1alpha1_module_pb from '../../../../buf/alpha/registry/v1alpha1/module_pb';


export class PushRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): PushRequest;

  getRepository(): string;
  setRepository(value: string): PushRequest;

  getBranch(): string;
  setBranch(value: string): PushRequest;

  getModule(): buf_alpha_module_v1alpha1_module_pb.Module | undefined;
  setModule(value?: buf_alpha_module_v1alpha1_module_pb.Module): PushRequest;
  hasModule(): boolean;
  clearModule(): PushRequest;

  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): PushRequest;
  clearTagsList(): PushRequest;
  addTags(value: string, index?: number): PushRequest;

  getTracksList(): Array<string>;
  setTracksList(value: Array<string>): PushRequest;
  clearTracksList(): PushRequest;
  addTracks(value: string, index?: number): PushRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PushRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PushRequest): PushRequest.AsObject;
  static serializeBinaryToWriter(message: PushRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PushRequest;
  static deserializeBinaryFromReader(message: PushRequest, reader: jspb.BinaryReader): PushRequest;
}

export namespace PushRequest {
  export type AsObject = {
    owner: string,
    repository: string,
    branch: string,
    module?: buf_alpha_module_v1alpha1_module_pb.Module.AsObject,
    tagsList: Array<string>,
    tracksList: Array<string>,
  }
}

export class PushResponse extends jspb.Message {
  getLocalModulePin(): buf_alpha_registry_v1alpha1_module_pb.LocalModulePin | undefined;
  setLocalModulePin(value?: buf_alpha_registry_v1alpha1_module_pb.LocalModulePin): PushResponse;
  hasLocalModulePin(): boolean;
  clearLocalModulePin(): PushResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PushResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PushResponse): PushResponse.AsObject;
  static serializeBinaryToWriter(message: PushResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PushResponse;
  static deserializeBinaryFromReader(message: PushResponse, reader: jspb.BinaryReader): PushResponse;
}

export namespace PushResponse {
  export type AsObject = {
    localModulePin?: buf_alpha_registry_v1alpha1_module_pb.LocalModulePin.AsObject,
  }
}


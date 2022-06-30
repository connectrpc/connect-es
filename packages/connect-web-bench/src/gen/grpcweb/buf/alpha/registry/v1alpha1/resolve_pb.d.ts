import * as jspb from 'google-protobuf'

import * as buf_alpha_module_v1alpha1_module_pb from '../../../../buf/alpha/module/v1alpha1/module_pb';
import * as buf_alpha_registry_v1alpha1_module_pb from '../../../../buf/alpha/registry/v1alpha1/module_pb';


export class GetModulePinsRequest extends jspb.Message {
  getModuleReferencesList(): Array<buf_alpha_module_v1alpha1_module_pb.ModuleReference>;
  setModuleReferencesList(value: Array<buf_alpha_module_v1alpha1_module_pb.ModuleReference>): GetModulePinsRequest;
  clearModuleReferencesList(): GetModulePinsRequest;
  addModuleReferences(value?: buf_alpha_module_v1alpha1_module_pb.ModuleReference, index?: number): buf_alpha_module_v1alpha1_module_pb.ModuleReference;

  getCurrentModulePinsList(): Array<buf_alpha_module_v1alpha1_module_pb.ModulePin>;
  setCurrentModulePinsList(value: Array<buf_alpha_module_v1alpha1_module_pb.ModulePin>): GetModulePinsRequest;
  clearCurrentModulePinsList(): GetModulePinsRequest;
  addCurrentModulePins(value?: buf_alpha_module_v1alpha1_module_pb.ModulePin, index?: number): buf_alpha_module_v1alpha1_module_pb.ModulePin;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetModulePinsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetModulePinsRequest): GetModulePinsRequest.AsObject;
  static serializeBinaryToWriter(message: GetModulePinsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetModulePinsRequest;
  static deserializeBinaryFromReader(message: GetModulePinsRequest, reader: jspb.BinaryReader): GetModulePinsRequest;
}

export namespace GetModulePinsRequest {
  export type AsObject = {
    moduleReferencesList: Array<buf_alpha_module_v1alpha1_module_pb.ModuleReference.AsObject>,
    currentModulePinsList: Array<buf_alpha_module_v1alpha1_module_pb.ModulePin.AsObject>,
  }
}

export class GetModulePinsResponse extends jspb.Message {
  getModulePinsList(): Array<buf_alpha_module_v1alpha1_module_pb.ModulePin>;
  setModulePinsList(value: Array<buf_alpha_module_v1alpha1_module_pb.ModulePin>): GetModulePinsResponse;
  clearModulePinsList(): GetModulePinsResponse;
  addModulePins(value?: buf_alpha_module_v1alpha1_module_pb.ModulePin, index?: number): buf_alpha_module_v1alpha1_module_pb.ModulePin;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetModulePinsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetModulePinsResponse): GetModulePinsResponse.AsObject;
  static serializeBinaryToWriter(message: GetModulePinsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetModulePinsResponse;
  static deserializeBinaryFromReader(message: GetModulePinsResponse, reader: jspb.BinaryReader): GetModulePinsResponse;
}

export namespace GetModulePinsResponse {
  export type AsObject = {
    modulePinsList: Array<buf_alpha_module_v1alpha1_module_pb.ModulePin.AsObject>,
  }
}

export class GetLocalModulePinsRequest extends jspb.Message {
  getLocalModuleReferencesList(): Array<buf_alpha_registry_v1alpha1_module_pb.LocalModuleReference>;
  setLocalModuleReferencesList(value: Array<buf_alpha_registry_v1alpha1_module_pb.LocalModuleReference>): GetLocalModulePinsRequest;
  clearLocalModuleReferencesList(): GetLocalModulePinsRequest;
  addLocalModuleReferences(value?: buf_alpha_registry_v1alpha1_module_pb.LocalModuleReference, index?: number): buf_alpha_registry_v1alpha1_module_pb.LocalModuleReference;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLocalModulePinsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetLocalModulePinsRequest): GetLocalModulePinsRequest.AsObject;
  static serializeBinaryToWriter(message: GetLocalModulePinsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLocalModulePinsRequest;
  static deserializeBinaryFromReader(message: GetLocalModulePinsRequest, reader: jspb.BinaryReader): GetLocalModulePinsRequest;
}

export namespace GetLocalModulePinsRequest {
  export type AsObject = {
    localModuleReferencesList: Array<buf_alpha_registry_v1alpha1_module_pb.LocalModuleReference.AsObject>,
  }
}

export class LocalModuleResolveResult extends jspb.Message {
  getReference(): buf_alpha_registry_v1alpha1_module_pb.LocalModuleReference | undefined;
  setReference(value?: buf_alpha_registry_v1alpha1_module_pb.LocalModuleReference): LocalModuleResolveResult;
  hasReference(): boolean;
  clearReference(): LocalModuleResolveResult;

  getPin(): buf_alpha_registry_v1alpha1_module_pb.LocalModulePin | undefined;
  setPin(value?: buf_alpha_registry_v1alpha1_module_pb.LocalModulePin): LocalModuleResolveResult;
  hasPin(): boolean;
  clearPin(): LocalModuleResolveResult;

  getResolvedReferenceType(): ResolvedReferenceType;
  setResolvedReferenceType(value: ResolvedReferenceType): LocalModuleResolveResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LocalModuleResolveResult.AsObject;
  static toObject(includeInstance: boolean, msg: LocalModuleResolveResult): LocalModuleResolveResult.AsObject;
  static serializeBinaryToWriter(message: LocalModuleResolveResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LocalModuleResolveResult;
  static deserializeBinaryFromReader(message: LocalModuleResolveResult, reader: jspb.BinaryReader): LocalModuleResolveResult;
}

export namespace LocalModuleResolveResult {
  export type AsObject = {
    reference?: buf_alpha_registry_v1alpha1_module_pb.LocalModuleReference.AsObject,
    pin?: buf_alpha_registry_v1alpha1_module_pb.LocalModulePin.AsObject,
    resolvedReferenceType: ResolvedReferenceType,
  }
}

export class GetLocalModulePinsResponse extends jspb.Message {
  getLocalModuleResolveResultsList(): Array<LocalModuleResolveResult>;
  setLocalModuleResolveResultsList(value: Array<LocalModuleResolveResult>): GetLocalModulePinsResponse;
  clearLocalModuleResolveResultsList(): GetLocalModulePinsResponse;
  addLocalModuleResolveResults(value?: LocalModuleResolveResult, index?: number): LocalModuleResolveResult;

  getDependenciesList(): Array<buf_alpha_module_v1alpha1_module_pb.ModulePin>;
  setDependenciesList(value: Array<buf_alpha_module_v1alpha1_module_pb.ModulePin>): GetLocalModulePinsResponse;
  clearDependenciesList(): GetLocalModulePinsResponse;
  addDependencies(value?: buf_alpha_module_v1alpha1_module_pb.ModulePin, index?: number): buf_alpha_module_v1alpha1_module_pb.ModulePin;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLocalModulePinsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetLocalModulePinsResponse): GetLocalModulePinsResponse.AsObject;
  static serializeBinaryToWriter(message: GetLocalModulePinsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLocalModulePinsResponse;
  static deserializeBinaryFromReader(message: GetLocalModulePinsResponse, reader: jspb.BinaryReader): GetLocalModulePinsResponse;
}

export namespace GetLocalModulePinsResponse {
  export type AsObject = {
    localModuleResolveResultsList: Array<LocalModuleResolveResult.AsObject>,
    dependenciesList: Array<buf_alpha_module_v1alpha1_module_pb.ModulePin.AsObject>,
  }
}

export enum ResolvedReferenceType { 
  RESOLVED_REFERENCE_TYPE_UNSPECIFIED = 0,
  RESOLVED_REFERENCE_TYPE_COMMIT = 1,
  RESOLVED_REFERENCE_TYPE_BRANCH = 2,
  RESOLVED_REFERENCE_TYPE_TAG = 3,
  RESOLVED_REFERENCE_TYPE_TRACK = 4,
}

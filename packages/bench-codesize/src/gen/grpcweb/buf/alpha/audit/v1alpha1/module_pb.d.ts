import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class BufAlphaRegistryV1Alpha1LocalModulePin extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): BufAlphaRegistryV1Alpha1LocalModulePin;

  getRepository(): string;
  setRepository(value: string): BufAlphaRegistryV1Alpha1LocalModulePin;

  getBranch(): string;
  setBranch(value: string): BufAlphaRegistryV1Alpha1LocalModulePin;

  getCommit(): string;
  setCommit(value: string): BufAlphaRegistryV1Alpha1LocalModulePin;

  getDigest(): string;
  setDigest(value: string): BufAlphaRegistryV1Alpha1LocalModulePin;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): BufAlphaRegistryV1Alpha1LocalModulePin;
  hasCreateTime(): boolean;
  clearCreateTime(): BufAlphaRegistryV1Alpha1LocalModulePin;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BufAlphaRegistryV1Alpha1LocalModulePin.AsObject;
  static toObject(includeInstance: boolean, msg: BufAlphaRegistryV1Alpha1LocalModulePin): BufAlphaRegistryV1Alpha1LocalModulePin.AsObject;
  static serializeBinaryToWriter(message: BufAlphaRegistryV1Alpha1LocalModulePin, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BufAlphaRegistryV1Alpha1LocalModulePin;
  static deserializeBinaryFromReader(message: BufAlphaRegistryV1Alpha1LocalModulePin, reader: jspb.BinaryReader): BufAlphaRegistryV1Alpha1LocalModulePin;
}

export namespace BufAlphaRegistryV1Alpha1LocalModulePin {
  export type AsObject = {
    owner: string,
    repository: string,
    branch: string,
    commit: string,
    digest: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class BufAlphaRegistryV1Alpha1LocalModuleReference extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): BufAlphaRegistryV1Alpha1LocalModuleReference;

  getRepository(): string;
  setRepository(value: string): BufAlphaRegistryV1Alpha1LocalModuleReference;

  getReference(): string;
  setReference(value: string): BufAlphaRegistryV1Alpha1LocalModuleReference;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BufAlphaRegistryV1Alpha1LocalModuleReference.AsObject;
  static toObject(includeInstance: boolean, msg: BufAlphaRegistryV1Alpha1LocalModuleReference): BufAlphaRegistryV1Alpha1LocalModuleReference.AsObject;
  static serializeBinaryToWriter(message: BufAlphaRegistryV1Alpha1LocalModuleReference, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BufAlphaRegistryV1Alpha1LocalModuleReference;
  static deserializeBinaryFromReader(message: BufAlphaRegistryV1Alpha1LocalModuleReference, reader: jspb.BinaryReader): BufAlphaRegistryV1Alpha1LocalModuleReference;
}

export namespace BufAlphaRegistryV1Alpha1LocalModuleReference {
  export type AsObject = {
    owner: string,
    repository: string,
    reference: string,
  }
}

export class BufAlphaRegistryV1Alpha1LocalModuleResolveResult extends jspb.Message {
  getReference(): BufAlphaRegistryV1Alpha1LocalModuleReference | undefined;
  setReference(value?: BufAlphaRegistryV1Alpha1LocalModuleReference): BufAlphaRegistryV1Alpha1LocalModuleResolveResult;
  hasReference(): boolean;
  clearReference(): BufAlphaRegistryV1Alpha1LocalModuleResolveResult;

  getPin(): BufAlphaRegistryV1Alpha1LocalModulePin | undefined;
  setPin(value?: BufAlphaRegistryV1Alpha1LocalModulePin): BufAlphaRegistryV1Alpha1LocalModuleResolveResult;
  hasPin(): boolean;
  clearPin(): BufAlphaRegistryV1Alpha1LocalModuleResolveResult;

  getResolvedReferenceType(): BufAlphaRegistryV1Alpha1ResolvedReferenceType;
  setResolvedReferenceType(value: BufAlphaRegistryV1Alpha1ResolvedReferenceType): BufAlphaRegistryV1Alpha1LocalModuleResolveResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BufAlphaRegistryV1Alpha1LocalModuleResolveResult.AsObject;
  static toObject(includeInstance: boolean, msg: BufAlphaRegistryV1Alpha1LocalModuleResolveResult): BufAlphaRegistryV1Alpha1LocalModuleResolveResult.AsObject;
  static serializeBinaryToWriter(message: BufAlphaRegistryV1Alpha1LocalModuleResolveResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BufAlphaRegistryV1Alpha1LocalModuleResolveResult;
  static deserializeBinaryFromReader(message: BufAlphaRegistryV1Alpha1LocalModuleResolveResult, reader: jspb.BinaryReader): BufAlphaRegistryV1Alpha1LocalModuleResolveResult;
}

export namespace BufAlphaRegistryV1Alpha1LocalModuleResolveResult {
  export type AsObject = {
    reference?: BufAlphaRegistryV1Alpha1LocalModuleReference.AsObject,
    pin?: BufAlphaRegistryV1Alpha1LocalModulePin.AsObject,
    resolvedReferenceType: BufAlphaRegistryV1Alpha1ResolvedReferenceType,
  }
}

export enum BufAlphaRegistryV1Alpha1ResolvedReferenceType { 
  BUF_ALPHA_REGISTRY_V1_ALPHA1_RESOLVED_REFERENCE_TYPE_UNSPECIFIED = 0,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_RESOLVED_REFERENCE_TYPE_COMMIT = 1,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_RESOLVED_REFERENCE_TYPE_BRANCH = 2,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_RESOLVED_REFERENCE_TYPE_TAG = 3,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_RESOLVED_REFERENCE_TYPE_TRACK = 4,
}

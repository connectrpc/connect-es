import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class LocalModuleReference extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): LocalModuleReference;

  getRepository(): string;
  setRepository(value: string): LocalModuleReference;

  getReference(): string;
  setReference(value: string): LocalModuleReference;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LocalModuleReference.AsObject;
  static toObject(includeInstance: boolean, msg: LocalModuleReference): LocalModuleReference.AsObject;
  static serializeBinaryToWriter(message: LocalModuleReference, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LocalModuleReference;
  static deserializeBinaryFromReader(message: LocalModuleReference, reader: jspb.BinaryReader): LocalModuleReference;
}

export namespace LocalModuleReference {
  export type AsObject = {
    owner: string,
    repository: string,
    reference: string,
  }
}

export class LocalModulePin extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): LocalModulePin;

  getRepository(): string;
  setRepository(value: string): LocalModulePin;

  getBranch(): string;
  setBranch(value: string): LocalModulePin;

  getCommit(): string;
  setCommit(value: string): LocalModulePin;

  getDigest(): string;
  setDigest(value: string): LocalModulePin;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): LocalModulePin;
  hasCreateTime(): boolean;
  clearCreateTime(): LocalModulePin;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LocalModulePin.AsObject;
  static toObject(includeInstance: boolean, msg: LocalModulePin): LocalModulePin.AsObject;
  static serializeBinaryToWriter(message: LocalModulePin, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LocalModulePin;
  static deserializeBinaryFromReader(message: LocalModulePin, reader: jspb.BinaryReader): LocalModulePin;
}

export namespace LocalModulePin {
  export type AsObject = {
    owner: string,
    repository: string,
    branch: string,
    commit: string,
    digest: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}


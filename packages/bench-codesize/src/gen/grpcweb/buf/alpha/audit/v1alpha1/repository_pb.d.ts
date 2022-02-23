import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class BufAlphaRegistryV1Alpha1RepositoryBranch extends jspb.Message {
  getId(): string;
  setId(value: string): BufAlphaRegistryV1Alpha1RepositoryBranch;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): BufAlphaRegistryV1Alpha1RepositoryBranch;
  hasCreateTime(): boolean;
  clearCreateTime(): BufAlphaRegistryV1Alpha1RepositoryBranch;

  getName(): string;
  setName(value: string): BufAlphaRegistryV1Alpha1RepositoryBranch;

  getRepositoryId(): string;
  setRepositoryId(value: string): BufAlphaRegistryV1Alpha1RepositoryBranch;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BufAlphaRegistryV1Alpha1RepositoryBranch.AsObject;
  static toObject(includeInstance: boolean, msg: BufAlphaRegistryV1Alpha1RepositoryBranch): BufAlphaRegistryV1Alpha1RepositoryBranch.AsObject;
  static serializeBinaryToWriter(message: BufAlphaRegistryV1Alpha1RepositoryBranch, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BufAlphaRegistryV1Alpha1RepositoryBranch;
  static deserializeBinaryFromReader(message: BufAlphaRegistryV1Alpha1RepositoryBranch, reader: jspb.BinaryReader): BufAlphaRegistryV1Alpha1RepositoryBranch;
}

export namespace BufAlphaRegistryV1Alpha1RepositoryBranch {
  export type AsObject = {
    id: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    name: string,
    repositoryId: string,
  }
}

export class BufAlphaRegistryV1Alpha1RepositoryTag extends jspb.Message {
  getId(): string;
  setId(value: string): BufAlphaRegistryV1Alpha1RepositoryTag;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): BufAlphaRegistryV1Alpha1RepositoryTag;
  hasCreateTime(): boolean;
  clearCreateTime(): BufAlphaRegistryV1Alpha1RepositoryTag;

  getName(): string;
  setName(value: string): BufAlphaRegistryV1Alpha1RepositoryTag;

  getCommitName(): string;
  setCommitName(value: string): BufAlphaRegistryV1Alpha1RepositoryTag;

  getAuthor(): string;
  setAuthor(value: string): BufAlphaRegistryV1Alpha1RepositoryTag;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BufAlphaRegistryV1Alpha1RepositoryTag.AsObject;
  static toObject(includeInstance: boolean, msg: BufAlphaRegistryV1Alpha1RepositoryTag): BufAlphaRegistryV1Alpha1RepositoryTag.AsObject;
  static serializeBinaryToWriter(message: BufAlphaRegistryV1Alpha1RepositoryTag, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BufAlphaRegistryV1Alpha1RepositoryTag;
  static deserializeBinaryFromReader(message: BufAlphaRegistryV1Alpha1RepositoryTag, reader: jspb.BinaryReader): BufAlphaRegistryV1Alpha1RepositoryTag;
}

export namespace BufAlphaRegistryV1Alpha1RepositoryTag {
  export type AsObject = {
    id: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    name: string,
    commitName: string,
    author: string,
  }
}

export class BufAlphaRegistryV1Alpha1RepositoryCommit extends jspb.Message {
  getId(): string;
  setId(value: string): BufAlphaRegistryV1Alpha1RepositoryCommit;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): BufAlphaRegistryV1Alpha1RepositoryCommit;
  hasCreateTime(): boolean;
  clearCreateTime(): BufAlphaRegistryV1Alpha1RepositoryCommit;

  getDigest(): string;
  setDigest(value: string): BufAlphaRegistryV1Alpha1RepositoryCommit;

  getName(): string;
  setName(value: string): BufAlphaRegistryV1Alpha1RepositoryCommit;

  getBranch(): string;
  setBranch(value: string): BufAlphaRegistryV1Alpha1RepositoryCommit;

  getCommitSequenceId(): number;
  setCommitSequenceId(value: number): BufAlphaRegistryV1Alpha1RepositoryCommit;

  getAuthor(): string;
  setAuthor(value: string): BufAlphaRegistryV1Alpha1RepositoryCommit;

  getTagsList(): Array<BufAlphaRegistryV1Alpha1RepositoryTag>;
  setTagsList(value: Array<BufAlphaRegistryV1Alpha1RepositoryTag>): BufAlphaRegistryV1Alpha1RepositoryCommit;
  clearTagsList(): BufAlphaRegistryV1Alpha1RepositoryCommit;
  addTags(value?: BufAlphaRegistryV1Alpha1RepositoryTag, index?: number): BufAlphaRegistryV1Alpha1RepositoryTag;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BufAlphaRegistryV1Alpha1RepositoryCommit.AsObject;
  static toObject(includeInstance: boolean, msg: BufAlphaRegistryV1Alpha1RepositoryCommit): BufAlphaRegistryV1Alpha1RepositoryCommit.AsObject;
  static serializeBinaryToWriter(message: BufAlphaRegistryV1Alpha1RepositoryCommit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BufAlphaRegistryV1Alpha1RepositoryCommit;
  static deserializeBinaryFromReader(message: BufAlphaRegistryV1Alpha1RepositoryCommit, reader: jspb.BinaryReader): BufAlphaRegistryV1Alpha1RepositoryCommit;
}

export namespace BufAlphaRegistryV1Alpha1RepositoryCommit {
  export type AsObject = {
    id: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    digest: string,
    name: string,
    branch: string,
    commitSequenceId: number,
    author: string,
    tagsList: Array<BufAlphaRegistryV1Alpha1RepositoryTag.AsObject>,
  }
}

export class BufAlphaRegistryV1Alpha1RepositoryTrack extends jspb.Message {
  getId(): string;
  setId(value: string): BufAlphaRegistryV1Alpha1RepositoryTrack;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): BufAlphaRegistryV1Alpha1RepositoryTrack;
  hasCreateTime(): boolean;
  clearCreateTime(): BufAlphaRegistryV1Alpha1RepositoryTrack;

  getName(): string;
  setName(value: string): BufAlphaRegistryV1Alpha1RepositoryTrack;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BufAlphaRegistryV1Alpha1RepositoryTrack.AsObject;
  static toObject(includeInstance: boolean, msg: BufAlphaRegistryV1Alpha1RepositoryTrack): BufAlphaRegistryV1Alpha1RepositoryTrack.AsObject;
  static serializeBinaryToWriter(message: BufAlphaRegistryV1Alpha1RepositoryTrack, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BufAlphaRegistryV1Alpha1RepositoryTrack;
  static deserializeBinaryFromReader(message: BufAlphaRegistryV1Alpha1RepositoryTrack, reader: jspb.BinaryReader): BufAlphaRegistryV1Alpha1RepositoryTrack;
}

export namespace BufAlphaRegistryV1Alpha1RepositoryTrack {
  export type AsObject = {
    id: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    name: string,
  }
}

export enum BufAlphaRegistryV1Alpha1Visibility { 
  BUF_ALPHA_REGISTRY_V1_ALPHA1_VISIBILITY_UNSPECIFIED = 0,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_VISIBILITY_PUBLIC = 1,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_VISIBILITY_PRIVATE = 2,
}

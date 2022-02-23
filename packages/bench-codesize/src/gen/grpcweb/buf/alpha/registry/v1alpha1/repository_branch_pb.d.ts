import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class RepositoryBranch extends jspb.Message {
  getId(): string;
  setId(value: string): RepositoryBranch;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): RepositoryBranch;
  hasCreateTime(): boolean;
  clearCreateTime(): RepositoryBranch;

  getName(): string;
  setName(value: string): RepositoryBranch;

  getRepositoryId(): string;
  setRepositoryId(value: string): RepositoryBranch;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RepositoryBranch.AsObject;
  static toObject(includeInstance: boolean, msg: RepositoryBranch): RepositoryBranch.AsObject;
  static serializeBinaryToWriter(message: RepositoryBranch, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RepositoryBranch;
  static deserializeBinaryFromReader(message: RepositoryBranch, reader: jspb.BinaryReader): RepositoryBranch;
}

export namespace RepositoryBranch {
  export type AsObject = {
    id: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    name: string,
    repositoryId: string,
  }
}

export class CreateRepositoryBranchRequest extends jspb.Message {
  getRepositoryId(): string;
  setRepositoryId(value: string): CreateRepositoryBranchRequest;

  getName(): string;
  setName(value: string): CreateRepositoryBranchRequest;

  getParentBranch(): string;
  setParentBranch(value: string): CreateRepositoryBranchRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRepositoryBranchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRepositoryBranchRequest): CreateRepositoryBranchRequest.AsObject;
  static serializeBinaryToWriter(message: CreateRepositoryBranchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRepositoryBranchRequest;
  static deserializeBinaryFromReader(message: CreateRepositoryBranchRequest, reader: jspb.BinaryReader): CreateRepositoryBranchRequest;
}

export namespace CreateRepositoryBranchRequest {
  export type AsObject = {
    repositoryId: string,
    name: string,
    parentBranch: string,
  }
}

export class CreateRepositoryBranchResponse extends jspb.Message {
  getRepositoryBranch(): RepositoryBranch | undefined;
  setRepositoryBranch(value?: RepositoryBranch): CreateRepositoryBranchResponse;
  hasRepositoryBranch(): boolean;
  clearRepositoryBranch(): CreateRepositoryBranchResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRepositoryBranchResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRepositoryBranchResponse): CreateRepositoryBranchResponse.AsObject;
  static serializeBinaryToWriter(message: CreateRepositoryBranchResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRepositoryBranchResponse;
  static deserializeBinaryFromReader(message: CreateRepositoryBranchResponse, reader: jspb.BinaryReader): CreateRepositoryBranchResponse;
}

export namespace CreateRepositoryBranchResponse {
  export type AsObject = {
    repositoryBranch?: RepositoryBranch.AsObject,
  }
}

export class ListRepositoryBranchesRequest extends jspb.Message {
  getRepositoryId(): string;
  setRepositoryId(value: string): ListRepositoryBranchesRequest;

  getPageSize(): number;
  setPageSize(value: number): ListRepositoryBranchesRequest;

  getPageToken(): string;
  setPageToken(value: string): ListRepositoryBranchesRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListRepositoryBranchesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRepositoryBranchesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListRepositoryBranchesRequest): ListRepositoryBranchesRequest.AsObject;
  static serializeBinaryToWriter(message: ListRepositoryBranchesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRepositoryBranchesRequest;
  static deserializeBinaryFromReader(message: ListRepositoryBranchesRequest, reader: jspb.BinaryReader): ListRepositoryBranchesRequest;
}

export namespace ListRepositoryBranchesRequest {
  export type AsObject = {
    repositoryId: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListRepositoryBranchesResponse extends jspb.Message {
  getRepositoryBranchesList(): Array<RepositoryBranch>;
  setRepositoryBranchesList(value: Array<RepositoryBranch>): ListRepositoryBranchesResponse;
  clearRepositoryBranchesList(): ListRepositoryBranchesResponse;
  addRepositoryBranches(value?: RepositoryBranch, index?: number): RepositoryBranch;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListRepositoryBranchesResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRepositoryBranchesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListRepositoryBranchesResponse): ListRepositoryBranchesResponse.AsObject;
  static serializeBinaryToWriter(message: ListRepositoryBranchesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRepositoryBranchesResponse;
  static deserializeBinaryFromReader(message: ListRepositoryBranchesResponse, reader: jspb.BinaryReader): ListRepositoryBranchesResponse;
}

export namespace ListRepositoryBranchesResponse {
  export type AsObject = {
    repositoryBranchesList: Array<RepositoryBranch.AsObject>,
    nextPageToken: string,
  }
}


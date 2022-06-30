import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class RepositoryTag extends jspb.Message {
  getId(): string;
  setId(value: string): RepositoryTag;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): RepositoryTag;
  hasCreateTime(): boolean;
  clearCreateTime(): RepositoryTag;

  getName(): string;
  setName(value: string): RepositoryTag;

  getCommitName(): string;
  setCommitName(value: string): RepositoryTag;

  getAuthor(): string;
  setAuthor(value: string): RepositoryTag;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RepositoryTag.AsObject;
  static toObject(includeInstance: boolean, msg: RepositoryTag): RepositoryTag.AsObject;
  static serializeBinaryToWriter(message: RepositoryTag, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RepositoryTag;
  static deserializeBinaryFromReader(message: RepositoryTag, reader: jspb.BinaryReader): RepositoryTag;
}

export namespace RepositoryTag {
  export type AsObject = {
    id: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    name: string,
    commitName: string,
    author: string,
  }
}

export class CreateRepositoryTagRequest extends jspb.Message {
  getRepositoryId(): string;
  setRepositoryId(value: string): CreateRepositoryTagRequest;

  getName(): string;
  setName(value: string): CreateRepositoryTagRequest;

  getCommitName(): string;
  setCommitName(value: string): CreateRepositoryTagRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRepositoryTagRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRepositoryTagRequest): CreateRepositoryTagRequest.AsObject;
  static serializeBinaryToWriter(message: CreateRepositoryTagRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRepositoryTagRequest;
  static deserializeBinaryFromReader(message: CreateRepositoryTagRequest, reader: jspb.BinaryReader): CreateRepositoryTagRequest;
}

export namespace CreateRepositoryTagRequest {
  export type AsObject = {
    repositoryId: string,
    name: string,
    commitName: string,
  }
}

export class CreateRepositoryTagResponse extends jspb.Message {
  getRepositoryTag(): RepositoryTag | undefined;
  setRepositoryTag(value?: RepositoryTag): CreateRepositoryTagResponse;
  hasRepositoryTag(): boolean;
  clearRepositoryTag(): CreateRepositoryTagResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRepositoryTagResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRepositoryTagResponse): CreateRepositoryTagResponse.AsObject;
  static serializeBinaryToWriter(message: CreateRepositoryTagResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRepositoryTagResponse;
  static deserializeBinaryFromReader(message: CreateRepositoryTagResponse, reader: jspb.BinaryReader): CreateRepositoryTagResponse;
}

export namespace CreateRepositoryTagResponse {
  export type AsObject = {
    repositoryTag?: RepositoryTag.AsObject,
  }
}

export class ListRepositoryTagsRequest extends jspb.Message {
  getRepositoryId(): string;
  setRepositoryId(value: string): ListRepositoryTagsRequest;

  getPageSize(): number;
  setPageSize(value: number): ListRepositoryTagsRequest;

  getPageToken(): string;
  setPageToken(value: string): ListRepositoryTagsRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListRepositoryTagsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRepositoryTagsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListRepositoryTagsRequest): ListRepositoryTagsRequest.AsObject;
  static serializeBinaryToWriter(message: ListRepositoryTagsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRepositoryTagsRequest;
  static deserializeBinaryFromReader(message: ListRepositoryTagsRequest, reader: jspb.BinaryReader): ListRepositoryTagsRequest;
}

export namespace ListRepositoryTagsRequest {
  export type AsObject = {
    repositoryId: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListRepositoryTagsResponse extends jspb.Message {
  getRepositoryTagsList(): Array<RepositoryTag>;
  setRepositoryTagsList(value: Array<RepositoryTag>): ListRepositoryTagsResponse;
  clearRepositoryTagsList(): ListRepositoryTagsResponse;
  addRepositoryTags(value?: RepositoryTag, index?: number): RepositoryTag;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListRepositoryTagsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRepositoryTagsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListRepositoryTagsResponse): ListRepositoryTagsResponse.AsObject;
  static serializeBinaryToWriter(message: ListRepositoryTagsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRepositoryTagsResponse;
  static deserializeBinaryFromReader(message: ListRepositoryTagsResponse, reader: jspb.BinaryReader): ListRepositoryTagsResponse;
}

export namespace ListRepositoryTagsResponse {
  export type AsObject = {
    repositoryTagsList: Array<RepositoryTag.AsObject>,
    nextPageToken: string,
  }
}


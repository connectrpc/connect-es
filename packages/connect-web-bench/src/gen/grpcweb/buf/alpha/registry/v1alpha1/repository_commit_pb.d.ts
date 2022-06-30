import * as jspb from 'google-protobuf'

import * as buf_alpha_registry_v1alpha1_repository_tag_pb from '../../../../buf/alpha/registry/v1alpha1/repository_tag_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class RepositoryCommit extends jspb.Message {
  getId(): string;
  setId(value: string): RepositoryCommit;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): RepositoryCommit;
  hasCreateTime(): boolean;
  clearCreateTime(): RepositoryCommit;

  getDigest(): string;
  setDigest(value: string): RepositoryCommit;

  getName(): string;
  setName(value: string): RepositoryCommit;

  getBranch(): string;
  setBranch(value: string): RepositoryCommit;

  getCommitSequenceId(): number;
  setCommitSequenceId(value: number): RepositoryCommit;

  getAuthor(): string;
  setAuthor(value: string): RepositoryCommit;

  getTagsList(): Array<buf_alpha_registry_v1alpha1_repository_tag_pb.RepositoryTag>;
  setTagsList(value: Array<buf_alpha_registry_v1alpha1_repository_tag_pb.RepositoryTag>): RepositoryCommit;
  clearTagsList(): RepositoryCommit;
  addTags(value?: buf_alpha_registry_v1alpha1_repository_tag_pb.RepositoryTag, index?: number): buf_alpha_registry_v1alpha1_repository_tag_pb.RepositoryTag;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RepositoryCommit.AsObject;
  static toObject(includeInstance: boolean, msg: RepositoryCommit): RepositoryCommit.AsObject;
  static serializeBinaryToWriter(message: RepositoryCommit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RepositoryCommit;
  static deserializeBinaryFromReader(message: RepositoryCommit, reader: jspb.BinaryReader): RepositoryCommit;
}

export namespace RepositoryCommit {
  export type AsObject = {
    id: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    digest: string,
    name: string,
    branch: string,
    commitSequenceId: number,
    author: string,
    tagsList: Array<buf_alpha_registry_v1alpha1_repository_tag_pb.RepositoryTag.AsObject>,
  }
}

export class ListRepositoryCommitsByBranchRequest extends jspb.Message {
  getRepositoryOwner(): string;
  setRepositoryOwner(value: string): ListRepositoryCommitsByBranchRequest;

  getRepositoryName(): string;
  setRepositoryName(value: string): ListRepositoryCommitsByBranchRequest;

  getRepositoryBranchName(): string;
  setRepositoryBranchName(value: string): ListRepositoryCommitsByBranchRequest;

  getPageSize(): number;
  setPageSize(value: number): ListRepositoryCommitsByBranchRequest;

  getPageToken(): string;
  setPageToken(value: string): ListRepositoryCommitsByBranchRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListRepositoryCommitsByBranchRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRepositoryCommitsByBranchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListRepositoryCommitsByBranchRequest): ListRepositoryCommitsByBranchRequest.AsObject;
  static serializeBinaryToWriter(message: ListRepositoryCommitsByBranchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRepositoryCommitsByBranchRequest;
  static deserializeBinaryFromReader(message: ListRepositoryCommitsByBranchRequest, reader: jspb.BinaryReader): ListRepositoryCommitsByBranchRequest;
}

export namespace ListRepositoryCommitsByBranchRequest {
  export type AsObject = {
    repositoryOwner: string,
    repositoryName: string,
    repositoryBranchName: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListRepositoryCommitsByBranchResponse extends jspb.Message {
  getRepositoryCommitsList(): Array<RepositoryCommit>;
  setRepositoryCommitsList(value: Array<RepositoryCommit>): ListRepositoryCommitsByBranchResponse;
  clearRepositoryCommitsList(): ListRepositoryCommitsByBranchResponse;
  addRepositoryCommits(value?: RepositoryCommit, index?: number): RepositoryCommit;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListRepositoryCommitsByBranchResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRepositoryCommitsByBranchResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListRepositoryCommitsByBranchResponse): ListRepositoryCommitsByBranchResponse.AsObject;
  static serializeBinaryToWriter(message: ListRepositoryCommitsByBranchResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRepositoryCommitsByBranchResponse;
  static deserializeBinaryFromReader(message: ListRepositoryCommitsByBranchResponse, reader: jspb.BinaryReader): ListRepositoryCommitsByBranchResponse;
}

export namespace ListRepositoryCommitsByBranchResponse {
  export type AsObject = {
    repositoryCommitsList: Array<RepositoryCommit.AsObject>,
    nextPageToken: string,
  }
}

export class ListRepositoryCommitsByReferenceRequest extends jspb.Message {
  getRepositoryOwner(): string;
  setRepositoryOwner(value: string): ListRepositoryCommitsByReferenceRequest;

  getRepositoryName(): string;
  setRepositoryName(value: string): ListRepositoryCommitsByReferenceRequest;

  getReference(): string;
  setReference(value: string): ListRepositoryCommitsByReferenceRequest;

  getPageSize(): number;
  setPageSize(value: number): ListRepositoryCommitsByReferenceRequest;

  getPageToken(): string;
  setPageToken(value: string): ListRepositoryCommitsByReferenceRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListRepositoryCommitsByReferenceRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRepositoryCommitsByReferenceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListRepositoryCommitsByReferenceRequest): ListRepositoryCommitsByReferenceRequest.AsObject;
  static serializeBinaryToWriter(message: ListRepositoryCommitsByReferenceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRepositoryCommitsByReferenceRequest;
  static deserializeBinaryFromReader(message: ListRepositoryCommitsByReferenceRequest, reader: jspb.BinaryReader): ListRepositoryCommitsByReferenceRequest;
}

export namespace ListRepositoryCommitsByReferenceRequest {
  export type AsObject = {
    repositoryOwner: string,
    repositoryName: string,
    reference: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListRepositoryCommitsByReferenceResponse extends jspb.Message {
  getRepositoryCommitsList(): Array<RepositoryCommit>;
  setRepositoryCommitsList(value: Array<RepositoryCommit>): ListRepositoryCommitsByReferenceResponse;
  clearRepositoryCommitsList(): ListRepositoryCommitsByReferenceResponse;
  addRepositoryCommits(value?: RepositoryCommit, index?: number): RepositoryCommit;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListRepositoryCommitsByReferenceResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRepositoryCommitsByReferenceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListRepositoryCommitsByReferenceResponse): ListRepositoryCommitsByReferenceResponse.AsObject;
  static serializeBinaryToWriter(message: ListRepositoryCommitsByReferenceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRepositoryCommitsByReferenceResponse;
  static deserializeBinaryFromReader(message: ListRepositoryCommitsByReferenceResponse, reader: jspb.BinaryReader): ListRepositoryCommitsByReferenceResponse;
}

export namespace ListRepositoryCommitsByReferenceResponse {
  export type AsObject = {
    repositoryCommitsList: Array<RepositoryCommit.AsObject>,
    nextPageToken: string,
  }
}

export class GetRepositoryCommitByReferenceRequest extends jspb.Message {
  getRepositoryOwner(): string;
  setRepositoryOwner(value: string): GetRepositoryCommitByReferenceRequest;

  getRepositoryName(): string;
  setRepositoryName(value: string): GetRepositoryCommitByReferenceRequest;

  getReference(): string;
  setReference(value: string): GetRepositoryCommitByReferenceRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepositoryCommitByReferenceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepositoryCommitByReferenceRequest): GetRepositoryCommitByReferenceRequest.AsObject;
  static serializeBinaryToWriter(message: GetRepositoryCommitByReferenceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepositoryCommitByReferenceRequest;
  static deserializeBinaryFromReader(message: GetRepositoryCommitByReferenceRequest, reader: jspb.BinaryReader): GetRepositoryCommitByReferenceRequest;
}

export namespace GetRepositoryCommitByReferenceRequest {
  export type AsObject = {
    repositoryOwner: string,
    repositoryName: string,
    reference: string,
  }
}

export class GetRepositoryCommitByReferenceResponse extends jspb.Message {
  getRepositoryCommit(): RepositoryCommit | undefined;
  setRepositoryCommit(value?: RepositoryCommit): GetRepositoryCommitByReferenceResponse;
  hasRepositoryCommit(): boolean;
  clearRepositoryCommit(): GetRepositoryCommitByReferenceResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepositoryCommitByReferenceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepositoryCommitByReferenceResponse): GetRepositoryCommitByReferenceResponse.AsObject;
  static serializeBinaryToWriter(message: GetRepositoryCommitByReferenceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepositoryCommitByReferenceResponse;
  static deserializeBinaryFromReader(message: GetRepositoryCommitByReferenceResponse, reader: jspb.BinaryReader): GetRepositoryCommitByReferenceResponse;
}

export namespace GetRepositoryCommitByReferenceResponse {
  export type AsObject = {
    repositoryCommit?: RepositoryCommit.AsObject,
  }
}

export class GetRepositoryCommitBySequenceIdRequest extends jspb.Message {
  getRepositoryOwner(): string;
  setRepositoryOwner(value: string): GetRepositoryCommitBySequenceIdRequest;

  getRepositoryName(): string;
  setRepositoryName(value: string): GetRepositoryCommitBySequenceIdRequest;

  getRepositoryBranchName(): string;
  setRepositoryBranchName(value: string): GetRepositoryCommitBySequenceIdRequest;

  getCommitSequenceId(): number;
  setCommitSequenceId(value: number): GetRepositoryCommitBySequenceIdRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepositoryCommitBySequenceIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepositoryCommitBySequenceIdRequest): GetRepositoryCommitBySequenceIdRequest.AsObject;
  static serializeBinaryToWriter(message: GetRepositoryCommitBySequenceIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepositoryCommitBySequenceIdRequest;
  static deserializeBinaryFromReader(message: GetRepositoryCommitBySequenceIdRequest, reader: jspb.BinaryReader): GetRepositoryCommitBySequenceIdRequest;
}

export namespace GetRepositoryCommitBySequenceIdRequest {
  export type AsObject = {
    repositoryOwner: string,
    repositoryName: string,
    repositoryBranchName: string,
    commitSequenceId: number,
  }
}

export class GetRepositoryCommitBySequenceIdResponse extends jspb.Message {
  getRepositoryCommit(): RepositoryCommit | undefined;
  setRepositoryCommit(value?: RepositoryCommit): GetRepositoryCommitBySequenceIdResponse;
  hasRepositoryCommit(): boolean;
  clearRepositoryCommit(): GetRepositoryCommitBySequenceIdResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepositoryCommitBySequenceIdResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepositoryCommitBySequenceIdResponse): GetRepositoryCommitBySequenceIdResponse.AsObject;
  static serializeBinaryToWriter(message: GetRepositoryCommitBySequenceIdResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepositoryCommitBySequenceIdResponse;
  static deserializeBinaryFromReader(message: GetRepositoryCommitBySequenceIdResponse, reader: jspb.BinaryReader): GetRepositoryCommitBySequenceIdResponse;
}

export namespace GetRepositoryCommitBySequenceIdResponse {
  export type AsObject = {
    repositoryCommit?: RepositoryCommit.AsObject,
  }
}


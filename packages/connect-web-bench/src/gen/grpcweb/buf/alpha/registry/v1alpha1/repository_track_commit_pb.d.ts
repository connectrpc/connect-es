import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class RepositoryTrackCommit extends jspb.Message {
  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): RepositoryTrackCommit;
  hasCreateTime(): boolean;
  clearCreateTime(): RepositoryTrackCommit;

  getRepositoryTrackId(): string;
  setRepositoryTrackId(value: string): RepositoryTrackCommit;

  getRepositoryCommitId(): string;
  setRepositoryCommitId(value: string): RepositoryTrackCommit;

  getSequenceId(): number;
  setSequenceId(value: number): RepositoryTrackCommit;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RepositoryTrackCommit.AsObject;
  static toObject(includeInstance: boolean, msg: RepositoryTrackCommit): RepositoryTrackCommit.AsObject;
  static serializeBinaryToWriter(message: RepositoryTrackCommit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RepositoryTrackCommit;
  static deserializeBinaryFromReader(message: RepositoryTrackCommit, reader: jspb.BinaryReader): RepositoryTrackCommit;
}

export namespace RepositoryTrackCommit {
  export type AsObject = {
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    repositoryTrackId: string,
    repositoryCommitId: string,
    sequenceId: number,
  }
}

export class GetRepositoryTrackCommitByRepositoryCommitRequest extends jspb.Message {
  getRepositoryTrackId(): string;
  setRepositoryTrackId(value: string): GetRepositoryTrackCommitByRepositoryCommitRequest;

  getRepositoryCommitId(): string;
  setRepositoryCommitId(value: string): GetRepositoryTrackCommitByRepositoryCommitRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepositoryTrackCommitByRepositoryCommitRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepositoryTrackCommitByRepositoryCommitRequest): GetRepositoryTrackCommitByRepositoryCommitRequest.AsObject;
  static serializeBinaryToWriter(message: GetRepositoryTrackCommitByRepositoryCommitRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepositoryTrackCommitByRepositoryCommitRequest;
  static deserializeBinaryFromReader(message: GetRepositoryTrackCommitByRepositoryCommitRequest, reader: jspb.BinaryReader): GetRepositoryTrackCommitByRepositoryCommitRequest;
}

export namespace GetRepositoryTrackCommitByRepositoryCommitRequest {
  export type AsObject = {
    repositoryTrackId: string,
    repositoryCommitId: string,
  }
}

export class GetRepositoryTrackCommitByRepositoryCommitResponse extends jspb.Message {
  getRepositoryTrackCommit(): RepositoryTrackCommit | undefined;
  setRepositoryTrackCommit(value?: RepositoryTrackCommit): GetRepositoryTrackCommitByRepositoryCommitResponse;
  hasRepositoryTrackCommit(): boolean;
  clearRepositoryTrackCommit(): GetRepositoryTrackCommitByRepositoryCommitResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepositoryTrackCommitByRepositoryCommitResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepositoryTrackCommitByRepositoryCommitResponse): GetRepositoryTrackCommitByRepositoryCommitResponse.AsObject;
  static serializeBinaryToWriter(message: GetRepositoryTrackCommitByRepositoryCommitResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepositoryTrackCommitByRepositoryCommitResponse;
  static deserializeBinaryFromReader(message: GetRepositoryTrackCommitByRepositoryCommitResponse, reader: jspb.BinaryReader): GetRepositoryTrackCommitByRepositoryCommitResponse;
}

export namespace GetRepositoryTrackCommitByRepositoryCommitResponse {
  export type AsObject = {
    repositoryTrackCommit?: RepositoryTrackCommit.AsObject,
  }
}

export class ListRepositoryTrackCommitsByRepositoryTrackRequest extends jspb.Message {
  getRepositoryTrackId(): string;
  setRepositoryTrackId(value: string): ListRepositoryTrackCommitsByRepositoryTrackRequest;

  getPageSize(): number;
  setPageSize(value: number): ListRepositoryTrackCommitsByRepositoryTrackRequest;

  getPageToken(): string;
  setPageToken(value: string): ListRepositoryTrackCommitsByRepositoryTrackRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListRepositoryTrackCommitsByRepositoryTrackRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRepositoryTrackCommitsByRepositoryTrackRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListRepositoryTrackCommitsByRepositoryTrackRequest): ListRepositoryTrackCommitsByRepositoryTrackRequest.AsObject;
  static serializeBinaryToWriter(message: ListRepositoryTrackCommitsByRepositoryTrackRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRepositoryTrackCommitsByRepositoryTrackRequest;
  static deserializeBinaryFromReader(message: ListRepositoryTrackCommitsByRepositoryTrackRequest, reader: jspb.BinaryReader): ListRepositoryTrackCommitsByRepositoryTrackRequest;
}

export namespace ListRepositoryTrackCommitsByRepositoryTrackRequest {
  export type AsObject = {
    repositoryTrackId: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListRepositoryTrackCommitsByRepositoryTrackResponse extends jspb.Message {
  getRepositoryTrackCommitsList(): Array<RepositoryTrackCommit>;
  setRepositoryTrackCommitsList(value: Array<RepositoryTrackCommit>): ListRepositoryTrackCommitsByRepositoryTrackResponse;
  clearRepositoryTrackCommitsList(): ListRepositoryTrackCommitsByRepositoryTrackResponse;
  addRepositoryTrackCommits(value?: RepositoryTrackCommit, index?: number): RepositoryTrackCommit;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListRepositoryTrackCommitsByRepositoryTrackResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRepositoryTrackCommitsByRepositoryTrackResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListRepositoryTrackCommitsByRepositoryTrackResponse): ListRepositoryTrackCommitsByRepositoryTrackResponse.AsObject;
  static serializeBinaryToWriter(message: ListRepositoryTrackCommitsByRepositoryTrackResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRepositoryTrackCommitsByRepositoryTrackResponse;
  static deserializeBinaryFromReader(message: ListRepositoryTrackCommitsByRepositoryTrackResponse, reader: jspb.BinaryReader): ListRepositoryTrackCommitsByRepositoryTrackResponse;
}

export namespace ListRepositoryTrackCommitsByRepositoryTrackResponse {
  export type AsObject = {
    repositoryTrackCommitsList: Array<RepositoryTrackCommit.AsObject>,
    nextPageToken: string,
  }
}

export class GetRepositoryTrackCommitByReferenceRequest extends jspb.Message {
  getRepositoryOwner(): string;
  setRepositoryOwner(value: string): GetRepositoryTrackCommitByReferenceRequest;

  getRepositoryName(): string;
  setRepositoryName(value: string): GetRepositoryTrackCommitByReferenceRequest;

  getTrack(): string;
  setTrack(value: string): GetRepositoryTrackCommitByReferenceRequest;

  getReference(): string;
  setReference(value: string): GetRepositoryTrackCommitByReferenceRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepositoryTrackCommitByReferenceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepositoryTrackCommitByReferenceRequest): GetRepositoryTrackCommitByReferenceRequest.AsObject;
  static serializeBinaryToWriter(message: GetRepositoryTrackCommitByReferenceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepositoryTrackCommitByReferenceRequest;
  static deserializeBinaryFromReader(message: GetRepositoryTrackCommitByReferenceRequest, reader: jspb.BinaryReader): GetRepositoryTrackCommitByReferenceRequest;
}

export namespace GetRepositoryTrackCommitByReferenceRequest {
  export type AsObject = {
    repositoryOwner: string,
    repositoryName: string,
    track: string,
    reference: string,
  }
}

export class GetRepositoryTrackCommitByReferenceResponse extends jspb.Message {
  getRepositoryTrackCommit(): RepositoryTrackCommit | undefined;
  setRepositoryTrackCommit(value?: RepositoryTrackCommit): GetRepositoryTrackCommitByReferenceResponse;
  hasRepositoryTrackCommit(): boolean;
  clearRepositoryTrackCommit(): GetRepositoryTrackCommitByReferenceResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepositoryTrackCommitByReferenceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepositoryTrackCommitByReferenceResponse): GetRepositoryTrackCommitByReferenceResponse.AsObject;
  static serializeBinaryToWriter(message: GetRepositoryTrackCommitByReferenceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepositoryTrackCommitByReferenceResponse;
  static deserializeBinaryFromReader(message: GetRepositoryTrackCommitByReferenceResponse, reader: jspb.BinaryReader): GetRepositoryTrackCommitByReferenceResponse;
}

export namespace GetRepositoryTrackCommitByReferenceResponse {
  export type AsObject = {
    repositoryTrackCommit?: RepositoryTrackCommit.AsObject,
  }
}


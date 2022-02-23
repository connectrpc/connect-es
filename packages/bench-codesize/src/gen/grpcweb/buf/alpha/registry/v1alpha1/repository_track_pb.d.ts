import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class RepositoryTrack extends jspb.Message {
  getId(): string;
  setId(value: string): RepositoryTrack;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): RepositoryTrack;
  hasCreateTime(): boolean;
  clearCreateTime(): RepositoryTrack;

  getName(): string;
  setName(value: string): RepositoryTrack;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RepositoryTrack.AsObject;
  static toObject(includeInstance: boolean, msg: RepositoryTrack): RepositoryTrack.AsObject;
  static serializeBinaryToWriter(message: RepositoryTrack, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RepositoryTrack;
  static deserializeBinaryFromReader(message: RepositoryTrack, reader: jspb.BinaryReader): RepositoryTrack;
}

export namespace RepositoryTrack {
  export type AsObject = {
    id: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    name: string,
  }
}

export class CreateRepositoryTrackRequest extends jspb.Message {
  getRepositoryId(): string;
  setRepositoryId(value: string): CreateRepositoryTrackRequest;

  getName(): string;
  setName(value: string): CreateRepositoryTrackRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRepositoryTrackRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRepositoryTrackRequest): CreateRepositoryTrackRequest.AsObject;
  static serializeBinaryToWriter(message: CreateRepositoryTrackRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRepositoryTrackRequest;
  static deserializeBinaryFromReader(message: CreateRepositoryTrackRequest, reader: jspb.BinaryReader): CreateRepositoryTrackRequest;
}

export namespace CreateRepositoryTrackRequest {
  export type AsObject = {
    repositoryId: string,
    name: string,
  }
}

export class CreateRepositoryTrackResponse extends jspb.Message {
  getRepositoryTrack(): RepositoryTrack | undefined;
  setRepositoryTrack(value?: RepositoryTrack): CreateRepositoryTrackResponse;
  hasRepositoryTrack(): boolean;
  clearRepositoryTrack(): CreateRepositoryTrackResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRepositoryTrackResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRepositoryTrackResponse): CreateRepositoryTrackResponse.AsObject;
  static serializeBinaryToWriter(message: CreateRepositoryTrackResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRepositoryTrackResponse;
  static deserializeBinaryFromReader(message: CreateRepositoryTrackResponse, reader: jspb.BinaryReader): CreateRepositoryTrackResponse;
}

export namespace CreateRepositoryTrackResponse {
  export type AsObject = {
    repositoryTrack?: RepositoryTrack.AsObject,
  }
}

export class ListRepositoryTracksRequest extends jspb.Message {
  getRepositoryId(): string;
  setRepositoryId(value: string): ListRepositoryTracksRequest;

  getPageSize(): number;
  setPageSize(value: number): ListRepositoryTracksRequest;

  getPageToken(): string;
  setPageToken(value: string): ListRepositoryTracksRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListRepositoryTracksRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRepositoryTracksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListRepositoryTracksRequest): ListRepositoryTracksRequest.AsObject;
  static serializeBinaryToWriter(message: ListRepositoryTracksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRepositoryTracksRequest;
  static deserializeBinaryFromReader(message: ListRepositoryTracksRequest, reader: jspb.BinaryReader): ListRepositoryTracksRequest;
}

export namespace ListRepositoryTracksRequest {
  export type AsObject = {
    repositoryId: string,
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListRepositoryTracksResponse extends jspb.Message {
  getRepositoryTracksList(): Array<RepositoryTrack>;
  setRepositoryTracksList(value: Array<RepositoryTrack>): ListRepositoryTracksResponse;
  clearRepositoryTracksList(): ListRepositoryTracksResponse;
  addRepositoryTracks(value?: RepositoryTrack, index?: number): RepositoryTrack;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListRepositoryTracksResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRepositoryTracksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListRepositoryTracksResponse): ListRepositoryTracksResponse.AsObject;
  static serializeBinaryToWriter(message: ListRepositoryTracksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRepositoryTracksResponse;
  static deserializeBinaryFromReader(message: ListRepositoryTracksResponse, reader: jspb.BinaryReader): ListRepositoryTracksResponse;
}

export namespace ListRepositoryTracksResponse {
  export type AsObject = {
    repositoryTracksList: Array<RepositoryTrack.AsObject>,
    nextPageToken: string,
  }
}

export class DeleteRepositoryTrackByNameRequest extends jspb.Message {
  getOwnerName(): string;
  setOwnerName(value: string): DeleteRepositoryTrackByNameRequest;

  getRepositoryName(): string;
  setRepositoryName(value: string): DeleteRepositoryTrackByNameRequest;

  getName(): string;
  setName(value: string): DeleteRepositoryTrackByNameRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteRepositoryTrackByNameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteRepositoryTrackByNameRequest): DeleteRepositoryTrackByNameRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteRepositoryTrackByNameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteRepositoryTrackByNameRequest;
  static deserializeBinaryFromReader(message: DeleteRepositoryTrackByNameRequest, reader: jspb.BinaryReader): DeleteRepositoryTrackByNameRequest;
}

export namespace DeleteRepositoryTrackByNameRequest {
  export type AsObject = {
    ownerName: string,
    repositoryName: string,
    name: string,
  }
}

export class DeleteRepositoryTrackByNameResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteRepositoryTrackByNameResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteRepositoryTrackByNameResponse): DeleteRepositoryTrackByNameResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteRepositoryTrackByNameResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteRepositoryTrackByNameResponse;
  static deserializeBinaryFromReader(message: DeleteRepositoryTrackByNameResponse, reader: jspb.BinaryReader): DeleteRepositoryTrackByNameResponse;
}

export namespace DeleteRepositoryTrackByNameResponse {
  export type AsObject = {
  }
}

export class GetRepositoryTrackByNameRequest extends jspb.Message {
  getOwnerName(): string;
  setOwnerName(value: string): GetRepositoryTrackByNameRequest;

  getRepositoryName(): string;
  setRepositoryName(value: string): GetRepositoryTrackByNameRequest;

  getName(): string;
  setName(value: string): GetRepositoryTrackByNameRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepositoryTrackByNameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepositoryTrackByNameRequest): GetRepositoryTrackByNameRequest.AsObject;
  static serializeBinaryToWriter(message: GetRepositoryTrackByNameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepositoryTrackByNameRequest;
  static deserializeBinaryFromReader(message: GetRepositoryTrackByNameRequest, reader: jspb.BinaryReader): GetRepositoryTrackByNameRequest;
}

export namespace GetRepositoryTrackByNameRequest {
  export type AsObject = {
    ownerName: string,
    repositoryName: string,
    name: string,
  }
}

export class GetRepositoryTrackByNameResponse extends jspb.Message {
  getRepositoryTrack(): RepositoryTrack | undefined;
  setRepositoryTrack(value?: RepositoryTrack): GetRepositoryTrackByNameResponse;
  hasRepositoryTrack(): boolean;
  clearRepositoryTrack(): GetRepositoryTrackByNameResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRepositoryTrackByNameResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRepositoryTrackByNameResponse): GetRepositoryTrackByNameResponse.AsObject;
  static serializeBinaryToWriter(message: GetRepositoryTrackByNameResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRepositoryTrackByNameResponse;
  static deserializeBinaryFromReader(message: GetRepositoryTrackByNameResponse, reader: jspb.BinaryReader): GetRepositoryTrackByNameResponse;
}

export namespace GetRepositoryTrackByNameResponse {
  export type AsObject = {
    repositoryTrack?: RepositoryTrack.AsObject,
  }
}


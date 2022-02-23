import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class Token extends jspb.Message {
  getId(): string;
  setId(value: string): Token;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): Token;
  hasCreateTime(): boolean;
  clearCreateTime(): Token;

  getExpireTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setExpireTime(value?: google_protobuf_timestamp_pb.Timestamp): Token;
  hasExpireTime(): boolean;
  clearExpireTime(): Token;

  getNote(): string;
  setNote(value: string): Token;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Token.AsObject;
  static toObject(includeInstance: boolean, msg: Token): Token.AsObject;
  static serializeBinaryToWriter(message: Token, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Token;
  static deserializeBinaryFromReader(message: Token, reader: jspb.BinaryReader): Token;
}

export namespace Token {
  export type AsObject = {
    id: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    expireTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    note: string,
  }
}

export class CreateTokenRequest extends jspb.Message {
  getNote(): string;
  setNote(value: string): CreateTokenRequest;

  getExpireTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setExpireTime(value?: google_protobuf_timestamp_pb.Timestamp): CreateTokenRequest;
  hasExpireTime(): boolean;
  clearExpireTime(): CreateTokenRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTokenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTokenRequest): CreateTokenRequest.AsObject;
  static serializeBinaryToWriter(message: CreateTokenRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTokenRequest;
  static deserializeBinaryFromReader(message: CreateTokenRequest, reader: jspb.BinaryReader): CreateTokenRequest;
}

export namespace CreateTokenRequest {
  export type AsObject = {
    note: string,
    expireTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class CreateTokenResponse extends jspb.Message {
  getToken(): string;
  setToken(value: string): CreateTokenResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTokenResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTokenResponse): CreateTokenResponse.AsObject;
  static serializeBinaryToWriter(message: CreateTokenResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTokenResponse;
  static deserializeBinaryFromReader(message: CreateTokenResponse, reader: jspb.BinaryReader): CreateTokenResponse;
}

export namespace CreateTokenResponse {
  export type AsObject = {
    token: string,
  }
}

export class GetTokenRequest extends jspb.Message {
  getTokenId(): string;
  setTokenId(value: string): GetTokenRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTokenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTokenRequest): GetTokenRequest.AsObject;
  static serializeBinaryToWriter(message: GetTokenRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTokenRequest;
  static deserializeBinaryFromReader(message: GetTokenRequest, reader: jspb.BinaryReader): GetTokenRequest;
}

export namespace GetTokenRequest {
  export type AsObject = {
    tokenId: string,
  }
}

export class GetTokenResponse extends jspb.Message {
  getToken(): Token | undefined;
  setToken(value?: Token): GetTokenResponse;
  hasToken(): boolean;
  clearToken(): GetTokenResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTokenResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTokenResponse): GetTokenResponse.AsObject;
  static serializeBinaryToWriter(message: GetTokenResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTokenResponse;
  static deserializeBinaryFromReader(message: GetTokenResponse, reader: jspb.BinaryReader): GetTokenResponse;
}

export namespace GetTokenResponse {
  export type AsObject = {
    token?: Token.AsObject,
  }
}

export class ListTokensRequest extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): ListTokensRequest;

  getPageToken(): string;
  setPageToken(value: string): ListTokensRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListTokensRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListTokensRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListTokensRequest): ListTokensRequest.AsObject;
  static serializeBinaryToWriter(message: ListTokensRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListTokensRequest;
  static deserializeBinaryFromReader(message: ListTokensRequest, reader: jspb.BinaryReader): ListTokensRequest;
}

export namespace ListTokensRequest {
  export type AsObject = {
    pageSize: number,
    pageToken: string,
    reverse: boolean,
  }
}

export class ListTokensResponse extends jspb.Message {
  getTokensList(): Array<Token>;
  setTokensList(value: Array<Token>): ListTokensResponse;
  clearTokensList(): ListTokensResponse;
  addTokens(value?: Token, index?: number): Token;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListTokensResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListTokensResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListTokensResponse): ListTokensResponse.AsObject;
  static serializeBinaryToWriter(message: ListTokensResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListTokensResponse;
  static deserializeBinaryFromReader(message: ListTokensResponse, reader: jspb.BinaryReader): ListTokensResponse;
}

export namespace ListTokensResponse {
  export type AsObject = {
    tokensList: Array<Token.AsObject>,
    nextPageToken: string,
  }
}

export class DeleteTokenRequest extends jspb.Message {
  getTokenId(): string;
  setTokenId(value: string): DeleteTokenRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteTokenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteTokenRequest): DeleteTokenRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteTokenRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteTokenRequest;
  static deserializeBinaryFromReader(message: DeleteTokenRequest, reader: jspb.BinaryReader): DeleteTokenRequest;
}

export namespace DeleteTokenRequest {
  export type AsObject = {
    tokenId: string,
  }
}

export class DeleteTokenResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteTokenResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteTokenResponse): DeleteTokenResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteTokenResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteTokenResponse;
  static deserializeBinaryFromReader(message: DeleteTokenResponse, reader: jspb.BinaryReader): DeleteTokenResponse;
}

export namespace DeleteTokenResponse {
  export type AsObject = {
  }
}


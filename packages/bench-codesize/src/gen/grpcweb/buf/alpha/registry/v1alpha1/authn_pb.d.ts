import * as jspb from 'google-protobuf'

import * as buf_alpha_registry_v1alpha1_user_pb from '../../../../buf/alpha/registry/v1alpha1/user_pb';


export class GetCurrentUserRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCurrentUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCurrentUserRequest): GetCurrentUserRequest.AsObject;
  static serializeBinaryToWriter(message: GetCurrentUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCurrentUserRequest;
  static deserializeBinaryFromReader(message: GetCurrentUserRequest, reader: jspb.BinaryReader): GetCurrentUserRequest;
}

export namespace GetCurrentUserRequest {
  export type AsObject = {
  }
}

export class GetCurrentUserResponse extends jspb.Message {
  getUser(): buf_alpha_registry_v1alpha1_user_pb.User | undefined;
  setUser(value?: buf_alpha_registry_v1alpha1_user_pb.User): GetCurrentUserResponse;
  hasUser(): boolean;
  clearUser(): GetCurrentUserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCurrentUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetCurrentUserResponse): GetCurrentUserResponse.AsObject;
  static serializeBinaryToWriter(message: GetCurrentUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCurrentUserResponse;
  static deserializeBinaryFromReader(message: GetCurrentUserResponse, reader: jspb.BinaryReader): GetCurrentUserResponse;
}

export namespace GetCurrentUserResponse {
  export type AsObject = {
    user?: buf_alpha_registry_v1alpha1_user_pb.User.AsObject,
  }
}

export class GetCurrentUserSubjectRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCurrentUserSubjectRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCurrentUserSubjectRequest): GetCurrentUserSubjectRequest.AsObject;
  static serializeBinaryToWriter(message: GetCurrentUserSubjectRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCurrentUserSubjectRequest;
  static deserializeBinaryFromReader(message: GetCurrentUserSubjectRequest, reader: jspb.BinaryReader): GetCurrentUserSubjectRequest;
}

export namespace GetCurrentUserSubjectRequest {
  export type AsObject = {
  }
}

export class GetCurrentUserSubjectResponse extends jspb.Message {
  getSubject(): string;
  setSubject(value: string): GetCurrentUserSubjectResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCurrentUserSubjectResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetCurrentUserSubjectResponse): GetCurrentUserSubjectResponse.AsObject;
  static serializeBinaryToWriter(message: GetCurrentUserSubjectResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCurrentUserSubjectResponse;
  static deserializeBinaryFromReader(message: GetCurrentUserSubjectResponse, reader: jspb.BinaryReader): GetCurrentUserSubjectResponse;
}

export namespace GetCurrentUserSubjectResponse {
  export type AsObject = {
    subject: string,
  }
}


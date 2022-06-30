import * as jspb from 'google-protobuf'

import * as buf_alpha_registry_v1alpha1_user_pb from '../../../../buf/alpha/registry/v1alpha1/user_pb';
import * as buf_alpha_registry_v1alpha1_organization_pb from '../../../../buf/alpha/registry/v1alpha1/organization_pb';


export class Owner extends jspb.Message {
  getUser(): buf_alpha_registry_v1alpha1_user_pb.User | undefined;
  setUser(value?: buf_alpha_registry_v1alpha1_user_pb.User): Owner;
  hasUser(): boolean;
  clearUser(): Owner;

  getOrganization(): buf_alpha_registry_v1alpha1_organization_pb.Organization | undefined;
  setOrganization(value?: buf_alpha_registry_v1alpha1_organization_pb.Organization): Owner;
  hasOrganization(): boolean;
  clearOrganization(): Owner;

  getOwnerCase(): Owner.OwnerCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Owner.AsObject;
  static toObject(includeInstance: boolean, msg: Owner): Owner.AsObject;
  static serializeBinaryToWriter(message: Owner, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Owner;
  static deserializeBinaryFromReader(message: Owner, reader: jspb.BinaryReader): Owner;
}

export namespace Owner {
  export type AsObject = {
    user?: buf_alpha_registry_v1alpha1_user_pb.User.AsObject,
    organization?: buf_alpha_registry_v1alpha1_organization_pb.Organization.AsObject,
  }

  export enum OwnerCase { 
    OWNER_NOT_SET = 0,
    USER = 1,
    ORGANIZATION = 2,
  }
}

export class GetOwnerByNameRequest extends jspb.Message {
  getName(): string;
  setName(value: string): GetOwnerByNameRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOwnerByNameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetOwnerByNameRequest): GetOwnerByNameRequest.AsObject;
  static serializeBinaryToWriter(message: GetOwnerByNameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOwnerByNameRequest;
  static deserializeBinaryFromReader(message: GetOwnerByNameRequest, reader: jspb.BinaryReader): GetOwnerByNameRequest;
}

export namespace GetOwnerByNameRequest {
  export type AsObject = {
    name: string,
  }
}

export class GetOwnerByNameResponse extends jspb.Message {
  getOwner(): Owner | undefined;
  setOwner(value?: Owner): GetOwnerByNameResponse;
  hasOwner(): boolean;
  clearOwner(): GetOwnerByNameResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOwnerByNameResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetOwnerByNameResponse): GetOwnerByNameResponse.AsObject;
  static serializeBinaryToWriter(message: GetOwnerByNameResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOwnerByNameResponse;
  static deserializeBinaryFromReader(message: GetOwnerByNameResponse, reader: jspb.BinaryReader): GetOwnerByNameResponse;
}

export namespace GetOwnerByNameResponse {
  export type AsObject = {
    owner?: Owner.AsObject,
  }
}


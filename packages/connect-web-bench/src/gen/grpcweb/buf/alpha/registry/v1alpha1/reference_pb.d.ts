import * as jspb from 'google-protobuf'

import * as buf_alpha_registry_v1alpha1_repository_branch_pb from '../../../../buf/alpha/registry/v1alpha1/repository_branch_pb';
import * as buf_alpha_registry_v1alpha1_repository_commit_pb from '../../../../buf/alpha/registry/v1alpha1/repository_commit_pb';
import * as buf_alpha_registry_v1alpha1_repository_tag_pb from '../../../../buf/alpha/registry/v1alpha1/repository_tag_pb';
import * as buf_alpha_registry_v1alpha1_repository_track_pb from '../../../../buf/alpha/registry/v1alpha1/repository_track_pb';


export class Reference extends jspb.Message {
  getBranch(): buf_alpha_registry_v1alpha1_repository_branch_pb.RepositoryBranch | undefined;
  setBranch(value?: buf_alpha_registry_v1alpha1_repository_branch_pb.RepositoryBranch): Reference;
  hasBranch(): boolean;
  clearBranch(): Reference;

  getTag(): buf_alpha_registry_v1alpha1_repository_tag_pb.RepositoryTag | undefined;
  setTag(value?: buf_alpha_registry_v1alpha1_repository_tag_pb.RepositoryTag): Reference;
  hasTag(): boolean;
  clearTag(): Reference;

  getCommit(): buf_alpha_registry_v1alpha1_repository_commit_pb.RepositoryCommit | undefined;
  setCommit(value?: buf_alpha_registry_v1alpha1_repository_commit_pb.RepositoryCommit): Reference;
  hasCommit(): boolean;
  clearCommit(): Reference;

  getTrack(): buf_alpha_registry_v1alpha1_repository_track_pb.RepositoryTrack | undefined;
  setTrack(value?: buf_alpha_registry_v1alpha1_repository_track_pb.RepositoryTrack): Reference;
  hasTrack(): boolean;
  clearTrack(): Reference;

  getReferenceCase(): Reference.ReferenceCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Reference.AsObject;
  static toObject(includeInstance: boolean, msg: Reference): Reference.AsObject;
  static serializeBinaryToWriter(message: Reference, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Reference;
  static deserializeBinaryFromReader(message: Reference, reader: jspb.BinaryReader): Reference;
}

export namespace Reference {
  export type AsObject = {
    branch?: buf_alpha_registry_v1alpha1_repository_branch_pb.RepositoryBranch.AsObject,
    tag?: buf_alpha_registry_v1alpha1_repository_tag_pb.RepositoryTag.AsObject,
    commit?: buf_alpha_registry_v1alpha1_repository_commit_pb.RepositoryCommit.AsObject,
    track?: buf_alpha_registry_v1alpha1_repository_track_pb.RepositoryTrack.AsObject,
  }

  export enum ReferenceCase { 
    REFERENCE_NOT_SET = 0,
    BRANCH = 1,
    TAG = 2,
    COMMIT = 3,
    TRACK = 4,
  }
}

export class GetReferenceByNameRequest extends jspb.Message {
  getName(): string;
  setName(value: string): GetReferenceByNameRequest;

  getOwner(): string;
  setOwner(value: string): GetReferenceByNameRequest;

  getRepositoryName(): string;
  setRepositoryName(value: string): GetReferenceByNameRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetReferenceByNameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetReferenceByNameRequest): GetReferenceByNameRequest.AsObject;
  static serializeBinaryToWriter(message: GetReferenceByNameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetReferenceByNameRequest;
  static deserializeBinaryFromReader(message: GetReferenceByNameRequest, reader: jspb.BinaryReader): GetReferenceByNameRequest;
}

export namespace GetReferenceByNameRequest {
  export type AsObject = {
    name: string,
    owner: string,
    repositoryName: string,
  }
}

export class GetReferenceByNameResponse extends jspb.Message {
  getReference(): Reference | undefined;
  setReference(value?: Reference): GetReferenceByNameResponse;
  hasReference(): boolean;
  clearReference(): GetReferenceByNameResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetReferenceByNameResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetReferenceByNameResponse): GetReferenceByNameResponse.AsObject;
  static serializeBinaryToWriter(message: GetReferenceByNameResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetReferenceByNameResponse;
  static deserializeBinaryFromReader(message: GetReferenceByNameResponse, reader: jspb.BinaryReader): GetReferenceByNameResponse;
}

export namespace GetReferenceByNameResponse {
  export type AsObject = {
    reference?: Reference.AsObject,
  }
}


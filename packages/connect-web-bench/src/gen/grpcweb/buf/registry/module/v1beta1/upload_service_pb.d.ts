// Copyright 2021-2025 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as jspb from 'google-protobuf'

import * as buf_registry_module_v1beta1_commit_pb from '../../../../buf/registry/module/v1beta1/commit_pb'; // proto import: "buf/registry/module/v1beta1/commit.proto"
import * as buf_registry_module_v1beta1_file_pb from '../../../../buf/registry/module/v1beta1/file_pb'; // proto import: "buf/registry/module/v1beta1/file.proto"
import * as buf_registry_module_v1beta1_label_pb from '../../../../buf/registry/module/v1beta1/label_pb'; // proto import: "buf/registry/module/v1beta1/label.proto"
import * as buf_registry_module_v1beta1_module_pb from '../../../../buf/registry/module/v1beta1/module_pb'; // proto import: "buf/registry/module/v1beta1/module.proto"
import * as buf_validate_validate_pb from '../../../../buf/validate/validate_pb'; // proto import: "buf/validate/validate.proto"


export class UploadRequest extends jspb.Message {
  getContentsList(): Array<UploadRequest.Content>;
  setContentsList(value: Array<UploadRequest.Content>): UploadRequest;
  clearContentsList(): UploadRequest;
  addContents(value?: UploadRequest.Content, index?: number): UploadRequest.Content;

  getDepRefsList(): Array<UploadRequest.DepRef>;
  setDepRefsList(value: Array<UploadRequest.DepRef>): UploadRequest;
  clearDepRefsList(): UploadRequest;
  addDepRefs(value?: UploadRequest.DepRef, index?: number): UploadRequest.DepRef;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UploadRequest): UploadRequest.AsObject;
  static serializeBinaryToWriter(message: UploadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadRequest;
  static deserializeBinaryFromReader(message: UploadRequest, reader: jspb.BinaryReader): UploadRequest;
}

export namespace UploadRequest {
  export type AsObject = {
    contentsList: Array<UploadRequest.Content.AsObject>,
    depRefsList: Array<UploadRequest.DepRef.AsObject>,
  }

  export class DepRef extends jspb.Message {
    getCommitId(): string;
    setCommitId(value: string): DepRef;

    getRegistry(): string;
    setRegistry(value: string): DepRef;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DepRef.AsObject;
    static toObject(includeInstance: boolean, msg: DepRef): DepRef.AsObject;
    static serializeBinaryToWriter(message: DepRef, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DepRef;
    static deserializeBinaryFromReader(message: DepRef, reader: jspb.BinaryReader): DepRef;
  }

  export namespace DepRef {
    export type AsObject = {
      commitId: string,
      registry: string,
    }
  }


  export class Content extends jspb.Message {
    getModuleRef(): buf_registry_module_v1beta1_module_pb.ModuleRef | undefined;
    setModuleRef(value?: buf_registry_module_v1beta1_module_pb.ModuleRef): Content;
    hasModuleRef(): boolean;
    clearModuleRef(): Content;

    getFilesList(): Array<buf_registry_module_v1beta1_file_pb.File>;
    setFilesList(value: Array<buf_registry_module_v1beta1_file_pb.File>): Content;
    clearFilesList(): Content;
    addFiles(value?: buf_registry_module_v1beta1_file_pb.File, index?: number): buf_registry_module_v1beta1_file_pb.File;

    getScopedLabelRefsList(): Array<buf_registry_module_v1beta1_label_pb.ScopedLabelRef>;
    setScopedLabelRefsList(value: Array<buf_registry_module_v1beta1_label_pb.ScopedLabelRef>): Content;
    clearScopedLabelRefsList(): Content;
    addScopedLabelRefs(value?: buf_registry_module_v1beta1_label_pb.ScopedLabelRef, index?: number): buf_registry_module_v1beta1_label_pb.ScopedLabelRef;

    getSourceControlUrl(): string;
    setSourceControlUrl(value: string): Content;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Content.AsObject;
    static toObject(includeInstance: boolean, msg: Content): Content.AsObject;
    static serializeBinaryToWriter(message: Content, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Content;
    static deserializeBinaryFromReader(message: Content, reader: jspb.BinaryReader): Content;
  }

  export namespace Content {
    export type AsObject = {
      moduleRef?: buf_registry_module_v1beta1_module_pb.ModuleRef.AsObject,
      filesList: Array<buf_registry_module_v1beta1_file_pb.File.AsObject>,
      scopedLabelRefsList: Array<buf_registry_module_v1beta1_label_pb.ScopedLabelRef.AsObject>,
      sourceControlUrl: string,
    }
  }

}

export class UploadResponse extends jspb.Message {
  getCommitsList(): Array<buf_registry_module_v1beta1_commit_pb.Commit>;
  setCommitsList(value: Array<buf_registry_module_v1beta1_commit_pb.Commit>): UploadResponse;
  clearCommitsList(): UploadResponse;
  addCommits(value?: buf_registry_module_v1beta1_commit_pb.Commit, index?: number): buf_registry_module_v1beta1_commit_pb.Commit;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UploadResponse): UploadResponse.AsObject;
  static serializeBinaryToWriter(message: UploadResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadResponse;
  static deserializeBinaryFromReader(message: UploadResponse, reader: jspb.BinaryReader): UploadResponse;
}

export namespace UploadResponse {
  export type AsObject = {
    commitsList: Array<buf_registry_module_v1beta1_commit_pb.Commit.AsObject>,
  }
}


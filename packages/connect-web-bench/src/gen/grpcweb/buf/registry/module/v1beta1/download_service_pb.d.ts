// Copyright 2021-2024 The Connect Authors
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
import * as buf_registry_module_v1beta1_digest_pb from '../../../../buf/registry/module/v1beta1/digest_pb'; // proto import: "buf/registry/module/v1beta1/digest.proto"
import * as buf_registry_module_v1beta1_file_pb from '../../../../buf/registry/module/v1beta1/file_pb'; // proto import: "buf/registry/module/v1beta1/file.proto"
import * as buf_registry_module_v1beta1_resource_pb from '../../../../buf/registry/module/v1beta1/resource_pb'; // proto import: "buf/registry/module/v1beta1/resource.proto"
import * as buf_validate_validate_pb from '../../../../buf/validate/validate_pb'; // proto import: "buf/validate/validate.proto"


export class DownloadRequest extends jspb.Message {
  getValuesList(): Array<DownloadRequest.Value>;
  setValuesList(value: Array<DownloadRequest.Value>): DownloadRequest;
  clearValuesList(): DownloadRequest;
  addValues(value?: DownloadRequest.Value, index?: number): DownloadRequest.Value;

  getDigestType(): buf_registry_module_v1beta1_digest_pb.DigestType;
  setDigestType(value: buf_registry_module_v1beta1_digest_pb.DigestType): DownloadRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DownloadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DownloadRequest): DownloadRequest.AsObject;
  static serializeBinaryToWriter(message: DownloadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DownloadRequest;
  static deserializeBinaryFromReader(message: DownloadRequest, reader: jspb.BinaryReader): DownloadRequest;
}

export namespace DownloadRequest {
  export type AsObject = {
    valuesList: Array<DownloadRequest.Value.AsObject>,
    digestType: buf_registry_module_v1beta1_digest_pb.DigestType,
  }

  export class Value extends jspb.Message {
    getResourceRef(): buf_registry_module_v1beta1_resource_pb.ResourceRef | undefined;
    setResourceRef(value?: buf_registry_module_v1beta1_resource_pb.ResourceRef): Value;
    hasResourceRef(): boolean;
    clearResourceRef(): Value;

    getFileTypesList(): Array<buf_registry_module_v1beta1_file_pb.FileType>;
    setFileTypesList(value: Array<buf_registry_module_v1beta1_file_pb.FileType>): Value;
    clearFileTypesList(): Value;
    addFileTypes(value: buf_registry_module_v1beta1_file_pb.FileType, index?: number): Value;

    getPathsList(): Array<string>;
    setPathsList(value: Array<string>): Value;
    clearPathsList(): Value;
    addPaths(value: string, index?: number): Value;

    getPathsAllowNotExist(): boolean;
    setPathsAllowNotExist(value: boolean): Value;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Value.AsObject;
    static toObject(includeInstance: boolean, msg: Value): Value.AsObject;
    static serializeBinaryToWriter(message: Value, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Value;
    static deserializeBinaryFromReader(message: Value, reader: jspb.BinaryReader): Value;
  }

  export namespace Value {
    export type AsObject = {
      resourceRef?: buf_registry_module_v1beta1_resource_pb.ResourceRef.AsObject,
      fileTypesList: Array<buf_registry_module_v1beta1_file_pb.FileType>,
      pathsList: Array<string>,
      pathsAllowNotExist: boolean,
    }
  }

}

export class DownloadResponse extends jspb.Message {
  getContentsList(): Array<DownloadResponse.Content>;
  setContentsList(value: Array<DownloadResponse.Content>): DownloadResponse;
  clearContentsList(): DownloadResponse;
  addContents(value?: DownloadResponse.Content, index?: number): DownloadResponse.Content;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DownloadResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DownloadResponse): DownloadResponse.AsObject;
  static serializeBinaryToWriter(message: DownloadResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DownloadResponse;
  static deserializeBinaryFromReader(message: DownloadResponse, reader: jspb.BinaryReader): DownloadResponse;
}

export namespace DownloadResponse {
  export type AsObject = {
    contentsList: Array<DownloadResponse.Content.AsObject>,
  }

  export class Content extends jspb.Message {
    getCommit(): buf_registry_module_v1beta1_commit_pb.Commit | undefined;
    setCommit(value?: buf_registry_module_v1beta1_commit_pb.Commit): Content;
    hasCommit(): boolean;
    clearCommit(): Content;

    getFilesList(): Array<buf_registry_module_v1beta1_file_pb.File>;
    setFilesList(value: Array<buf_registry_module_v1beta1_file_pb.File>): Content;
    clearFilesList(): Content;
    addFiles(value?: buf_registry_module_v1beta1_file_pb.File, index?: number): buf_registry_module_v1beta1_file_pb.File;

    getV1BufYamlFile(): buf_registry_module_v1beta1_file_pb.File | undefined;
    setV1BufYamlFile(value?: buf_registry_module_v1beta1_file_pb.File): Content;
    hasV1BufYamlFile(): boolean;
    clearV1BufYamlFile(): Content;

    getV1BufLockFile(): buf_registry_module_v1beta1_file_pb.File | undefined;
    setV1BufLockFile(value?: buf_registry_module_v1beta1_file_pb.File): Content;
    hasV1BufLockFile(): boolean;
    clearV1BufLockFile(): Content;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Content.AsObject;
    static toObject(includeInstance: boolean, msg: Content): Content.AsObject;
    static serializeBinaryToWriter(message: Content, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Content;
    static deserializeBinaryFromReader(message: Content, reader: jspb.BinaryReader): Content;
  }

  export namespace Content {
    export type AsObject = {
      commit?: buf_registry_module_v1beta1_commit_pb.Commit.AsObject,
      filesList: Array<buf_registry_module_v1beta1_file_pb.File.AsObject>,
      v1BufYamlFile?: buf_registry_module_v1beta1_file_pb.File.AsObject,
      v1BufLockFile?: buf_registry_module_v1beta1_file_pb.File.AsObject,
    }
  }

}


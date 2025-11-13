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

import * as buf_registry_module_v1_commit_pb from '../../../../buf/registry/module/v1/commit_pb'; // proto import: "buf/registry/module/v1/commit.proto"
import * as buf_registry_module_v1_label_pb from '../../../../buf/registry/module/v1/label_pb'; // proto import: "buf/registry/module/v1/label.proto"
import * as buf_registry_module_v1_module_pb from '../../../../buf/registry/module/v1/module_pb'; // proto import: "buf/registry/module/v1/module.proto"
import * as buf_registry_priv_extension_v1beta1_extension_pb from '../../../../buf/registry/priv/extension/v1beta1/extension_pb'; // proto import: "buf/registry/priv/extension/v1beta1/extension.proto"
import * as buf_validate_validate_pb from '../../../../buf/validate/validate_pb'; // proto import: "buf/validate/validate.proto"


export class Resource extends jspb.Message {
  getModule(): buf_registry_module_v1_module_pb.Module | undefined;
  setModule(value?: buf_registry_module_v1_module_pb.Module): Resource;
  hasModule(): boolean;
  clearModule(): Resource;

  getLabel(): buf_registry_module_v1_label_pb.Label | undefined;
  setLabel(value?: buf_registry_module_v1_label_pb.Label): Resource;
  hasLabel(): boolean;
  clearLabel(): Resource;

  getCommit(): buf_registry_module_v1_commit_pb.Commit | undefined;
  setCommit(value?: buf_registry_module_v1_commit_pb.Commit): Resource;
  hasCommit(): boolean;
  clearCommit(): Resource;

  getValueCase(): Resource.ValueCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Resource.AsObject;
  static toObject(includeInstance: boolean, msg: Resource): Resource.AsObject;
  static serializeBinaryToWriter(message: Resource, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Resource;
  static deserializeBinaryFromReader(message: Resource, reader: jspb.BinaryReader): Resource;
}

export namespace Resource {
  export type AsObject = {
    module?: buf_registry_module_v1_module_pb.Module.AsObject;
    label?: buf_registry_module_v1_label_pb.Label.AsObject;
    commit?: buf_registry_module_v1_commit_pb.Commit.AsObject;
  };

  export enum ValueCase {
    VALUE_NOT_SET = 0,
    MODULE = 1,
    LABEL = 2,
    COMMIT = 3,
  }
}

export class ResourceRef extends jspb.Message {
  getId(): string;
  setId(value: string): ResourceRef;
  hasId(): boolean;
  clearId(): ResourceRef;

  getName(): ResourceRef.Name | undefined;
  setName(value?: ResourceRef.Name): ResourceRef;
  hasName(): boolean;
  clearName(): ResourceRef;

  getValueCase(): ResourceRef.ValueCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResourceRef.AsObject;
  static toObject(includeInstance: boolean, msg: ResourceRef): ResourceRef.AsObject;
  static serializeBinaryToWriter(message: ResourceRef, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResourceRef;
  static deserializeBinaryFromReader(message: ResourceRef, reader: jspb.BinaryReader): ResourceRef;
}

export namespace ResourceRef {
  export type AsObject = {
    id?: string;
    name?: ResourceRef.Name.AsObject;
  };

  export class Name extends jspb.Message {
    getOwner(): string;
    setOwner(value: string): Name;

    getModule(): string;
    setModule(value: string): Name;

    getLabelName(): string;
    setLabelName(value: string): Name;
    hasLabelName(): boolean;
    clearLabelName(): Name;

    getRef(): string;
    setRef(value: string): Name;
    hasRef(): boolean;
    clearRef(): Name;

    getChildCase(): Name.ChildCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Name.AsObject;
    static toObject(includeInstance: boolean, msg: Name): Name.AsObject;
    static serializeBinaryToWriter(message: Name, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Name;
    static deserializeBinaryFromReader(message: Name, reader: jspb.BinaryReader): Name;
  }

  export namespace Name {
    export type AsObject = {
      owner: string;
      module: string;
      labelName?: string;
      ref?: string;
    };

    export enum ChildCase {
      CHILD_NOT_SET = 0,
      LABEL_NAME = 3,
      REF = 4,
    }
  }


  export enum ValueCase {
    VALUE_NOT_SET = 0,
    ID = 1,
    NAME = 2,
  }
}


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

import * as buf_registry_priv_extension_v1beta1_extension_pb from '../../../../buf/registry/priv/extension/v1beta1/extension_pb'; // proto import: "buf/registry/priv/extension/v1beta1/extension.proto"
import * as buf_validate_validate_pb from '../../../../buf/validate/validate_pb'; // proto import: "buf/validate/validate.proto"
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"


export class Module extends jspb.Message {
  getId(): string;
  setId(value: string): Module;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): Module;
  hasCreateTime(): boolean;
  clearCreateTime(): Module;

  getUpdateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setUpdateTime(value?: google_protobuf_timestamp_pb.Timestamp): Module;
  hasUpdateTime(): boolean;
  clearUpdateTime(): Module;

  getName(): string;
  setName(value: string): Module;

  getOwnerId(): string;
  setOwnerId(value: string): Module;

  getVisibility(): ModuleVisibility;
  setVisibility(value: ModuleVisibility): Module;

  getState(): ModuleState;
  setState(value: ModuleState): Module;

  getDescription(): string;
  setDescription(value: string): Module;

  getUrl(): string;
  setUrl(value: string): Module;

  getDefaultLabelName(): string;
  setDefaultLabelName(value: string): Module;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Module.AsObject;
  static toObject(includeInstance: boolean, msg: Module): Module.AsObject;
  static serializeBinaryToWriter(message: Module, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Module;
  static deserializeBinaryFromReader(message: Module, reader: jspb.BinaryReader): Module;
}

export namespace Module {
  export type AsObject = {
    id: string;
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject;
    updateTime?: google_protobuf_timestamp_pb.Timestamp.AsObject;
    name: string;
    ownerId: string;
    visibility: ModuleVisibility;
    state: ModuleState;
    description: string;
    url: string;
    defaultLabelName: string;
  };
}

export class ModuleRef extends jspb.Message {
  getId(): string;
  setId(value: string): ModuleRef;
  hasId(): boolean;
  clearId(): ModuleRef;

  getName(): ModuleRef.Name | undefined;
  setName(value?: ModuleRef.Name): ModuleRef;
  hasName(): boolean;
  clearName(): ModuleRef;

  getValueCase(): ModuleRef.ValueCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ModuleRef.AsObject;
  static toObject(includeInstance: boolean, msg: ModuleRef): ModuleRef.AsObject;
  static serializeBinaryToWriter(message: ModuleRef, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ModuleRef;
  static deserializeBinaryFromReader(message: ModuleRef, reader: jspb.BinaryReader): ModuleRef;
}

export namespace ModuleRef {
  export type AsObject = {
    id?: string;
    name?: ModuleRef.Name.AsObject;
  };

  export class Name extends jspb.Message {
    getOwner(): string;
    setOwner(value: string): Name;

    getModule(): string;
    setModule(value: string): Name;

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
    };
  }


  export enum ValueCase {
    VALUE_NOT_SET = 0,
    ID = 1,
    NAME = 2,
  }
}

export enum ModuleVisibility {
  MODULE_VISIBILITY_UNSPECIFIED = 0,
  MODULE_VISIBILITY_PUBLIC = 1,
  MODULE_VISIBILITY_PRIVATE = 2,
}
export enum ModuleState {
  MODULE_STATE_UNSPECIFIED = 0,
  MODULE_STATE_ACTIVE = 1,
  MODULE_STATE_DEPRECATED = 2,
}

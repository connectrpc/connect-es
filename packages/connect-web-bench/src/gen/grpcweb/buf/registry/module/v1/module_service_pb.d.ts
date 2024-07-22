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

import * as buf_registry_module_v1_module_pb from '../../../../buf/registry/module/v1/module_pb'; // proto import: "buf/registry/module/v1/module.proto"
import * as buf_registry_owner_v1_owner_pb from '../../../../buf/registry/owner/v1/owner_pb'; // proto import: "buf/registry/owner/v1/owner.proto"
import * as buf_validate_validate_pb from '../../../../buf/validate/validate_pb'; // proto import: "buf/validate/validate.proto"


export class GetModulesRequest extends jspb.Message {
  getModuleRefsList(): Array<buf_registry_module_v1_module_pb.ModuleRef>;
  setModuleRefsList(value: Array<buf_registry_module_v1_module_pb.ModuleRef>): GetModulesRequest;
  clearModuleRefsList(): GetModulesRequest;
  addModuleRefs(value?: buf_registry_module_v1_module_pb.ModuleRef, index?: number): buf_registry_module_v1_module_pb.ModuleRef;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetModulesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetModulesRequest): GetModulesRequest.AsObject;
  static serializeBinaryToWriter(message: GetModulesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetModulesRequest;
  static deserializeBinaryFromReader(message: GetModulesRequest, reader: jspb.BinaryReader): GetModulesRequest;
}

export namespace GetModulesRequest {
  export type AsObject = {
    moduleRefsList: Array<buf_registry_module_v1_module_pb.ModuleRef.AsObject>,
  }
}

export class GetModulesResponse extends jspb.Message {
  getModulesList(): Array<buf_registry_module_v1_module_pb.Module>;
  setModulesList(value: Array<buf_registry_module_v1_module_pb.Module>): GetModulesResponse;
  clearModulesList(): GetModulesResponse;
  addModules(value?: buf_registry_module_v1_module_pb.Module, index?: number): buf_registry_module_v1_module_pb.Module;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetModulesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetModulesResponse): GetModulesResponse.AsObject;
  static serializeBinaryToWriter(message: GetModulesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetModulesResponse;
  static deserializeBinaryFromReader(message: GetModulesResponse, reader: jspb.BinaryReader): GetModulesResponse;
}

export namespace GetModulesResponse {
  export type AsObject = {
    modulesList: Array<buf_registry_module_v1_module_pb.Module.AsObject>,
  }
}

export class ListModulesRequest extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): ListModulesRequest;

  getPageToken(): string;
  setPageToken(value: string): ListModulesRequest;

  getOwnerRefsList(): Array<buf_registry_owner_v1_owner_pb.OwnerRef>;
  setOwnerRefsList(value: Array<buf_registry_owner_v1_owner_pb.OwnerRef>): ListModulesRequest;
  clearOwnerRefsList(): ListModulesRequest;
  addOwnerRefs(value?: buf_registry_owner_v1_owner_pb.OwnerRef, index?: number): buf_registry_owner_v1_owner_pb.OwnerRef;

  getOrder(): ListModulesRequest.Order;
  setOrder(value: ListModulesRequest.Order): ListModulesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListModulesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListModulesRequest): ListModulesRequest.AsObject;
  static serializeBinaryToWriter(message: ListModulesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListModulesRequest;
  static deserializeBinaryFromReader(message: ListModulesRequest, reader: jspb.BinaryReader): ListModulesRequest;
}

export namespace ListModulesRequest {
  export type AsObject = {
    pageSize: number,
    pageToken: string,
    ownerRefsList: Array<buf_registry_owner_v1_owner_pb.OwnerRef.AsObject>,
    order: ListModulesRequest.Order,
  }

  export enum Order { 
    ORDER_UNSPECIFIED = 0,
    ORDER_CREATE_TIME_DESC = 1,
    ORDER_CREATE_TIME_ASC = 2,
  }
}

export class ListModulesResponse extends jspb.Message {
  getNextPageToken(): string;
  setNextPageToken(value: string): ListModulesResponse;

  getModulesList(): Array<buf_registry_module_v1_module_pb.Module>;
  setModulesList(value: Array<buf_registry_module_v1_module_pb.Module>): ListModulesResponse;
  clearModulesList(): ListModulesResponse;
  addModules(value?: buf_registry_module_v1_module_pb.Module, index?: number): buf_registry_module_v1_module_pb.Module;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListModulesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListModulesResponse): ListModulesResponse.AsObject;
  static serializeBinaryToWriter(message: ListModulesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListModulesResponse;
  static deserializeBinaryFromReader(message: ListModulesResponse, reader: jspb.BinaryReader): ListModulesResponse;
}

export namespace ListModulesResponse {
  export type AsObject = {
    nextPageToken: string,
    modulesList: Array<buf_registry_module_v1_module_pb.Module.AsObject>,
  }
}

export class CreateModulesRequest extends jspb.Message {
  getValuesList(): Array<CreateModulesRequest.Value>;
  setValuesList(value: Array<CreateModulesRequest.Value>): CreateModulesRequest;
  clearValuesList(): CreateModulesRequest;
  addValues(value?: CreateModulesRequest.Value, index?: number): CreateModulesRequest.Value;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateModulesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateModulesRequest): CreateModulesRequest.AsObject;
  static serializeBinaryToWriter(message: CreateModulesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateModulesRequest;
  static deserializeBinaryFromReader(message: CreateModulesRequest, reader: jspb.BinaryReader): CreateModulesRequest;
}

export namespace CreateModulesRequest {
  export type AsObject = {
    valuesList: Array<CreateModulesRequest.Value.AsObject>,
  }

  export class Value extends jspb.Message {
    getOwnerRef(): buf_registry_owner_v1_owner_pb.OwnerRef | undefined;
    setOwnerRef(value?: buf_registry_owner_v1_owner_pb.OwnerRef): Value;
    hasOwnerRef(): boolean;
    clearOwnerRef(): Value;

    getName(): string;
    setName(value: string): Value;

    getVisibility(): buf_registry_module_v1_module_pb.ModuleVisibility;
    setVisibility(value: buf_registry_module_v1_module_pb.ModuleVisibility): Value;

    getDescription(): string;
    setDescription(value: string): Value;

    getUrl(): string;
    setUrl(value: string): Value;

    getDefaultLabelName(): string;
    setDefaultLabelName(value: string): Value;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Value.AsObject;
    static toObject(includeInstance: boolean, msg: Value): Value.AsObject;
    static serializeBinaryToWriter(message: Value, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Value;
    static deserializeBinaryFromReader(message: Value, reader: jspb.BinaryReader): Value;
  }

  export namespace Value {
    export type AsObject = {
      ownerRef?: buf_registry_owner_v1_owner_pb.OwnerRef.AsObject,
      name: string,
      visibility: buf_registry_module_v1_module_pb.ModuleVisibility,
      description: string,
      url: string,
      defaultLabelName: string,
    }
  }

}

export class CreateModulesResponse extends jspb.Message {
  getModulesList(): Array<buf_registry_module_v1_module_pb.Module>;
  setModulesList(value: Array<buf_registry_module_v1_module_pb.Module>): CreateModulesResponse;
  clearModulesList(): CreateModulesResponse;
  addModules(value?: buf_registry_module_v1_module_pb.Module, index?: number): buf_registry_module_v1_module_pb.Module;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateModulesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateModulesResponse): CreateModulesResponse.AsObject;
  static serializeBinaryToWriter(message: CreateModulesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateModulesResponse;
  static deserializeBinaryFromReader(message: CreateModulesResponse, reader: jspb.BinaryReader): CreateModulesResponse;
}

export namespace CreateModulesResponse {
  export type AsObject = {
    modulesList: Array<buf_registry_module_v1_module_pb.Module.AsObject>,
  }
}

export class UpdateModulesRequest extends jspb.Message {
  getValuesList(): Array<UpdateModulesRequest.Value>;
  setValuesList(value: Array<UpdateModulesRequest.Value>): UpdateModulesRequest;
  clearValuesList(): UpdateModulesRequest;
  addValues(value?: UpdateModulesRequest.Value, index?: number): UpdateModulesRequest.Value;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateModulesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateModulesRequest): UpdateModulesRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateModulesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateModulesRequest;
  static deserializeBinaryFromReader(message: UpdateModulesRequest, reader: jspb.BinaryReader): UpdateModulesRequest;
}

export namespace UpdateModulesRequest {
  export type AsObject = {
    valuesList: Array<UpdateModulesRequest.Value.AsObject>,
  }

  export class Value extends jspb.Message {
    getModuleRef(): buf_registry_module_v1_module_pb.ModuleRef | undefined;
    setModuleRef(value?: buf_registry_module_v1_module_pb.ModuleRef): Value;
    hasModuleRef(): boolean;
    clearModuleRef(): Value;

    getVisibility(): buf_registry_module_v1_module_pb.ModuleVisibility;
    setVisibility(value: buf_registry_module_v1_module_pb.ModuleVisibility): Value;
    hasVisibility(): boolean;
    clearVisibility(): Value;

    getState(): buf_registry_module_v1_module_pb.ModuleState;
    setState(value: buf_registry_module_v1_module_pb.ModuleState): Value;
    hasState(): boolean;
    clearState(): Value;

    getDescription(): string;
    setDescription(value: string): Value;
    hasDescription(): boolean;
    clearDescription(): Value;

    getUrl(): string;
    setUrl(value: string): Value;
    hasUrl(): boolean;
    clearUrl(): Value;

    getDefaultLabelName(): string;
    setDefaultLabelName(value: string): Value;
    hasDefaultLabelName(): boolean;
    clearDefaultLabelName(): Value;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Value.AsObject;
    static toObject(includeInstance: boolean, msg: Value): Value.AsObject;
    static serializeBinaryToWriter(message: Value, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Value;
    static deserializeBinaryFromReader(message: Value, reader: jspb.BinaryReader): Value;
  }

  export namespace Value {
    export type AsObject = {
      moduleRef?: buf_registry_module_v1_module_pb.ModuleRef.AsObject,
      visibility?: buf_registry_module_v1_module_pb.ModuleVisibility,
      state?: buf_registry_module_v1_module_pb.ModuleState,
      description?: string,
      url?: string,
      defaultLabelName?: string,
    }

    export enum VisibilityCase { 
      _VISIBILITY_NOT_SET = 0,
      VISIBILITY = 3,
    }

    export enum StateCase { 
      _STATE_NOT_SET = 0,
      STATE = 4,
    }

    export enum DescriptionCase { 
      _DESCRIPTION_NOT_SET = 0,
      DESCRIPTION = 5,
    }

    export enum UrlCase { 
      _URL_NOT_SET = 0,
      URL = 6,
    }

    export enum DefaultLabelNameCase { 
      _DEFAULT_LABEL_NAME_NOT_SET = 0,
      DEFAULT_LABEL_NAME = 7,
    }
  }

}

export class UpdateModulesResponse extends jspb.Message {
  getModulesList(): Array<buf_registry_module_v1_module_pb.Module>;
  setModulesList(value: Array<buf_registry_module_v1_module_pb.Module>): UpdateModulesResponse;
  clearModulesList(): UpdateModulesResponse;
  addModules(value?: buf_registry_module_v1_module_pb.Module, index?: number): buf_registry_module_v1_module_pb.Module;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateModulesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateModulesResponse): UpdateModulesResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateModulesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateModulesResponse;
  static deserializeBinaryFromReader(message: UpdateModulesResponse, reader: jspb.BinaryReader): UpdateModulesResponse;
}

export namespace UpdateModulesResponse {
  export type AsObject = {
    modulesList: Array<buf_registry_module_v1_module_pb.Module.AsObject>,
  }
}

export class DeleteModulesRequest extends jspb.Message {
  getModuleRefsList(): Array<buf_registry_module_v1_module_pb.ModuleRef>;
  setModuleRefsList(value: Array<buf_registry_module_v1_module_pb.ModuleRef>): DeleteModulesRequest;
  clearModuleRefsList(): DeleteModulesRequest;
  addModuleRefs(value?: buf_registry_module_v1_module_pb.ModuleRef, index?: number): buf_registry_module_v1_module_pb.ModuleRef;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteModulesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteModulesRequest): DeleteModulesRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteModulesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteModulesRequest;
  static deserializeBinaryFromReader(message: DeleteModulesRequest, reader: jspb.BinaryReader): DeleteModulesRequest;
}

export namespace DeleteModulesRequest {
  export type AsObject = {
    moduleRefsList: Array<buf_registry_module_v1_module_pb.ModuleRef.AsObject>,
  }
}

export class DeleteModulesResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteModulesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteModulesResponse): DeleteModulesResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteModulesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteModulesResponse;
  static deserializeBinaryFromReader(message: DeleteModulesResponse, reader: jspb.BinaryReader): DeleteModulesResponse;
}

export namespace DeleteModulesResponse {
  export type AsObject = {
  }
}


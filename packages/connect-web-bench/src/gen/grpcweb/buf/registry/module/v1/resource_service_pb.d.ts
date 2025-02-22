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

import * as buf_registry_module_v1_resource_pb from '../../../../buf/registry/module/v1/resource_pb'; // proto import: "buf/registry/module/v1/resource.proto"
import * as buf_validate_validate_pb from '../../../../buf/validate/validate_pb'; // proto import: "buf/validate/validate.proto"


export class GetResourcesRequest extends jspb.Message {
  getResourceRefsList(): Array<buf_registry_module_v1_resource_pb.ResourceRef>;
  setResourceRefsList(value: Array<buf_registry_module_v1_resource_pb.ResourceRef>): GetResourcesRequest;
  clearResourceRefsList(): GetResourcesRequest;
  addResourceRefs(value?: buf_registry_module_v1_resource_pb.ResourceRef, index?: number): buf_registry_module_v1_resource_pb.ResourceRef;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetResourcesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetResourcesRequest): GetResourcesRequest.AsObject;
  static serializeBinaryToWriter(message: GetResourcesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetResourcesRequest;
  static deserializeBinaryFromReader(message: GetResourcesRequest, reader: jspb.BinaryReader): GetResourcesRequest;
}

export namespace GetResourcesRequest {
  export type AsObject = {
    resourceRefsList: Array<buf_registry_module_v1_resource_pb.ResourceRef.AsObject>,
  }
}

export class GetResourcesResponse extends jspb.Message {
  getResourcesList(): Array<buf_registry_module_v1_resource_pb.Resource>;
  setResourcesList(value: Array<buf_registry_module_v1_resource_pb.Resource>): GetResourcesResponse;
  clearResourcesList(): GetResourcesResponse;
  addResources(value?: buf_registry_module_v1_resource_pb.Resource, index?: number): buf_registry_module_v1_resource_pb.Resource;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetResourcesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetResourcesResponse): GetResourcesResponse.AsObject;
  static serializeBinaryToWriter(message: GetResourcesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetResourcesResponse;
  static deserializeBinaryFromReader(message: GetResourcesResponse, reader: jspb.BinaryReader): GetResourcesResponse;
}

export namespace GetResourcesResponse {
  export type AsObject = {
    resourcesList: Array<buf_registry_module_v1_resource_pb.Resource.AsObject>,
  }
}


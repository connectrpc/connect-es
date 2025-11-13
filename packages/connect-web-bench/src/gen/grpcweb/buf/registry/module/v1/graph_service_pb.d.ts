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

import * as buf_registry_module_v1_graph_pb from '../../../../buf/registry/module/v1/graph_pb'; // proto import: "buf/registry/module/v1/graph.proto"
import * as buf_registry_module_v1_resource_pb from '../../../../buf/registry/module/v1/resource_pb'; // proto import: "buf/registry/module/v1/resource.proto"
import * as buf_validate_validate_pb from '../../../../buf/validate/validate_pb'; // proto import: "buf/validate/validate.proto"


export class GetGraphRequest extends jspb.Message {
  getResourceRefsList(): Array<buf_registry_module_v1_resource_pb.ResourceRef>;
  setResourceRefsList(value: Array<buf_registry_module_v1_resource_pb.ResourceRef>): GetGraphRequest;
  clearResourceRefsList(): GetGraphRequest;
  addResourceRefs(value?: buf_registry_module_v1_resource_pb.ResourceRef, index?: number): buf_registry_module_v1_resource_pb.ResourceRef;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetGraphRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetGraphRequest): GetGraphRequest.AsObject;
  static serializeBinaryToWriter(message: GetGraphRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetGraphRequest;
  static deserializeBinaryFromReader(message: GetGraphRequest, reader: jspb.BinaryReader): GetGraphRequest;
}

export namespace GetGraphRequest {
  export type AsObject = {
    resourceRefsList: Array<buf_registry_module_v1_resource_pb.ResourceRef.AsObject>;
  };
}

export class GetGraphResponse extends jspb.Message {
  getGraph(): buf_registry_module_v1_graph_pb.Graph | undefined;
  setGraph(value?: buf_registry_module_v1_graph_pb.Graph): GetGraphResponse;
  hasGraph(): boolean;
  clearGraph(): GetGraphResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetGraphResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetGraphResponse): GetGraphResponse.AsObject;
  static serializeBinaryToWriter(message: GetGraphResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetGraphResponse;
  static deserializeBinaryFromReader(message: GetGraphResponse, reader: jspb.BinaryReader): GetGraphResponse;
}

export namespace GetGraphResponse {
  export type AsObject = {
    graph?: buf_registry_module_v1_graph_pb.Graph.AsObject;
  };
}


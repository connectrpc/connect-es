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

import * as buf_registry_owner_v1_owner_pb from '../../../../buf/registry/owner/v1/owner_pb'; // proto import: "buf/registry/owner/v1/owner.proto"
import * as buf_validate_validate_pb from '../../../../buf/validate/validate_pb'; // proto import: "buf/validate/validate.proto"


export class GetOwnersRequest extends jspb.Message {
  getOwnerRefsList(): Array<buf_registry_owner_v1_owner_pb.OwnerRef>;
  setOwnerRefsList(value: Array<buf_registry_owner_v1_owner_pb.OwnerRef>): GetOwnersRequest;
  clearOwnerRefsList(): GetOwnersRequest;
  addOwnerRefs(value?: buf_registry_owner_v1_owner_pb.OwnerRef, index?: number): buf_registry_owner_v1_owner_pb.OwnerRef;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOwnersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetOwnersRequest): GetOwnersRequest.AsObject;
  static serializeBinaryToWriter(message: GetOwnersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOwnersRequest;
  static deserializeBinaryFromReader(message: GetOwnersRequest, reader: jspb.BinaryReader): GetOwnersRequest;
}

export namespace GetOwnersRequest {
  export type AsObject = {
    ownerRefsList: Array<buf_registry_owner_v1_owner_pb.OwnerRef.AsObject>,
  }
}

export class GetOwnersResponse extends jspb.Message {
  getOwnersList(): Array<buf_registry_owner_v1_owner_pb.Owner>;
  setOwnersList(value: Array<buf_registry_owner_v1_owner_pb.Owner>): GetOwnersResponse;
  clearOwnersList(): GetOwnersResponse;
  addOwners(value?: buf_registry_owner_v1_owner_pb.Owner, index?: number): buf_registry_owner_v1_owner_pb.Owner;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOwnersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetOwnersResponse): GetOwnersResponse.AsObject;
  static serializeBinaryToWriter(message: GetOwnersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOwnersResponse;
  static deserializeBinaryFromReader(message: GetOwnersResponse, reader: jspb.BinaryReader): GetOwnersResponse;
}

export namespace GetOwnersResponse {
  export type AsObject = {
    ownersList: Array<buf_registry_owner_v1_owner_pb.Owner.AsObject>,
  }
}


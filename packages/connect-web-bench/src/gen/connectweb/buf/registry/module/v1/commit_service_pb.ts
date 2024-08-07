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

// @generated by protoc-gen-es v1.10.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/registry/module/v1/commit_service.proto (package buf.registry.module.v1, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { ResourceRef } from "./resource_pb.js";
import { Commit } from "./commit_pb.js";

/**
 * @generated from message buf.registry.module.v1.GetCommitsRequest
 */
export class GetCommitsRequest extends Message<GetCommitsRequest> {
  /**
   * References to request a Commit for.
   *
   * See the documentation on ResourceRef for resource resolution details.
   *
   * Resolution is as follows:
   *   - If a Module is referenced, the Commit of the default Label is returned.
   *   - If a Label is referenced, the Commit of this Label is returned.
   *   - If a Commit is referenced, this Commit is returned.
   *
   * @generated from field: repeated buf.registry.module.v1.ResourceRef resource_refs = 1;
   */
  resourceRefs: ResourceRef[] = [];

  constructor(data?: PartialMessage<GetCommitsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.registry.module.v1.GetCommitsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "resource_refs", kind: "message", T: ResourceRef, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetCommitsRequest {
    return new GetCommitsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetCommitsRequest {
    return new GetCommitsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetCommitsRequest {
    return new GetCommitsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetCommitsRequest | PlainMessage<GetCommitsRequest> | undefined, b: GetCommitsRequest | PlainMessage<GetCommitsRequest> | undefined): boolean {
    return proto3.util.equals(GetCommitsRequest, a, b);
  }
}

/**
 * @generated from message buf.registry.module.v1.GetCommitsResponse
 */
export class GetCommitsResponse extends Message<GetCommitsResponse> {
  /**
   * The found Commits in the same order as requested.
   *
   * @generated from field: repeated buf.registry.module.v1.Commit commits = 1;
   */
  commits: Commit[] = [];

  constructor(data?: PartialMessage<GetCommitsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.registry.module.v1.GetCommitsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "commits", kind: "message", T: Commit, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetCommitsResponse {
    return new GetCommitsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetCommitsResponse {
    return new GetCommitsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetCommitsResponse {
    return new GetCommitsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetCommitsResponse | PlainMessage<GetCommitsResponse> | undefined, b: GetCommitsResponse | PlainMessage<GetCommitsResponse> | undefined): boolean {
    return proto3.util.equals(GetCommitsResponse, a, b);
  }
}

/**
 * @generated from message buf.registry.module.v1.ListCommitsRequest
 */
export class ListCommitsRequest extends Message<ListCommitsRequest> {
  /**
   * The maximum number of items to return.
   *
   * The default value is 10.
   *
   * @generated from field: uint32 page_size = 1;
   */
  pageSize = 0;

  /**
   * The page to start from.
   *
   * If empty, the first page is returned,
   *
   * @generated from field: string page_token = 2;
   */
  pageToken = "";

  /**
   * The reference to list Commits for.
   *
   * See the documentation on Ref for resource resolution details.
   *
   * Once the resource is resolved, the following Commits are listed (subject to any additional filters in the request):
   *   - If a Module is referenced, all Commits for the Module are returned.
   *   - If a Label is referenced, the Commit the Label points to is returned.
   *     Use ListLabelHistory to get the history of Commits for a Label.
   *   - If a Commit is referenced, this Commit is returned.
   *
   * @generated from field: buf.registry.module.v1.ResourceRef resource_ref = 3;
   */
  resourceRef?: ResourceRef;

  /**
   * The order to return the Commits.
   *
   * If not specified, defaults to ORDER_CREATE_TIME_DESC.
   *
   * @generated from field: buf.registry.module.v1.ListCommitsRequest.Order order = 4;
   */
  order = ListCommitsRequest_Order.UNSPECIFIED;

  /**
   * Only return Commits with an id that contains this string using a case-insensitive comparison.
   *
   * @generated from field: string id_query = 5;
   */
  idQuery = "";

  constructor(data?: PartialMessage<ListCommitsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.registry.module.v1.ListCommitsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "page_size", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "page_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "resource_ref", kind: "message", T: ResourceRef },
    { no: 4, name: "order", kind: "enum", T: proto3.getEnumType(ListCommitsRequest_Order) },
    { no: 5, name: "id_query", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListCommitsRequest {
    return new ListCommitsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListCommitsRequest {
    return new ListCommitsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListCommitsRequest {
    return new ListCommitsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListCommitsRequest | PlainMessage<ListCommitsRequest> | undefined, b: ListCommitsRequest | PlainMessage<ListCommitsRequest> | undefined): boolean {
    return proto3.util.equals(ListCommitsRequest, a, b);
  }
}

/**
 * The list order.
 *
 * @generated from enum buf.registry.module.v1.ListCommitsRequest.Order
 */
export enum ListCommitsRequest_Order {
  /**
   * @generated from enum value: ORDER_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Order by create_time newest to oldest.
   *
   * @generated from enum value: ORDER_CREATE_TIME_DESC = 1;
   */
  CREATE_TIME_DESC = 1,

  /**
   * Order by create_time oldest to newest.
   *
   * @generated from enum value: ORDER_CREATE_TIME_ASC = 2;
   */
  CREATE_TIME_ASC = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(ListCommitsRequest_Order)
proto3.util.setEnumType(ListCommitsRequest_Order, "buf.registry.module.v1.ListCommitsRequest.Order", [
  { no: 0, name: "ORDER_UNSPECIFIED" },
  { no: 1, name: "ORDER_CREATE_TIME_DESC" },
  { no: 2, name: "ORDER_CREATE_TIME_ASC" },
]);

/**
 * @generated from message buf.registry.module.v1.ListCommitsResponse
 */
export class ListCommitsResponse extends Message<ListCommitsResponse> {
  /**
   * The next page token.
   *
   * If empty, there are no more pages.
   *
   * @generated from field: string next_page_token = 1;
   */
  nextPageToken = "";

  /**
   * The listed Commits.
   *
   * @generated from field: repeated buf.registry.module.v1.Commit commits = 2;
   */
  commits: Commit[] = [];

  constructor(data?: PartialMessage<ListCommitsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.registry.module.v1.ListCommitsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "next_page_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "commits", kind: "message", T: Commit, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListCommitsResponse {
    return new ListCommitsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListCommitsResponse {
    return new ListCommitsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListCommitsResponse {
    return new ListCommitsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListCommitsResponse | PlainMessage<ListCommitsResponse> | undefined, b: ListCommitsResponse | PlainMessage<ListCommitsResponse> | undefined): boolean {
    return proto3.util.equals(ListCommitsResponse, a, b);
  }
}


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
// @generated from file buf/registry/module/v1/upload_service.proto (package buf.registry.module.v1, syntax proto3)
/* eslint-disable */

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { ModuleRef } from "./module_pb.js";
import { File } from "./file_pb.js";
import { ScopedLabelRef } from "./label_pb.js";
import { Commit } from "./commit_pb.js";

/**
 * @generated from message buf.registry.module.v1.UploadRequest
 */
export class UploadRequest extends Message<UploadRequest> {
  /**
   * The Contents of all references.
   *
   * @generated from field: repeated buf.registry.module.v1.UploadRequest.Content contents = 1;
   */
  contents: UploadRequest_Content[] = [];

  /**
   * The dependencies of the references specified by Contents.
   *
   * Dependencies between Contents are implicit and do not need to be specified. The BSR will detect
   * dependencies between Contenta via .proto imports.
   *
   * This will include all transitive dependencies.
   *
   * Commits should be unique by Module, that is no two dep_commit_ids should have the same Module but
   * different Commit IDs.
   *
   * @generated from field: repeated string dep_commit_ids = 2;
   */
  depCommitIds: string[] = [];

  constructor(data?: PartialMessage<UploadRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.registry.module.v1.UploadRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "contents", kind: "message", T: UploadRequest_Content, repeated: true },
    { no: 2, name: "dep_commit_ids", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UploadRequest {
    return new UploadRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UploadRequest {
    return new UploadRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UploadRequest {
    return new UploadRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UploadRequest | PlainMessage<UploadRequest> | undefined, b: UploadRequest | PlainMessage<UploadRequest> | undefined): boolean {
    return proto3.util.equals(UploadRequest, a, b);
  }
}

/**
 * Content to upload for a given reference.
 *
 * @generated from message buf.registry.module.v1.UploadRequest.Content
 */
export class UploadRequest_Content extends Message<UploadRequest_Content> {
  /**
   * The Module of the reference.
   *
   * @generated from field: buf.registry.module.v1.ModuleRef module_ref = 1;
   */
  moduleRef?: ModuleRef;

  /**
   * The Files of the Content.
   *
   * This will consist of the .proto files, license files, and documentation files.
   *
   * @generated from field: repeated buf.registry.module.v1.File files = 2;
   */
  files: File[] = [];

  /**
   * The labels to associate with the Commit for the Content.
   *
   * If an id is set, this id must represent a Label that already exists and is
   * owned by the Module. The Label will point to the newly-created Commits for the References,
   * or will be updated to point to the pre-existing Commit for the Reference.
   *
   * If no labels are referenced, the default Label for the Module is used.
   *
   * If the Labels do not exist, they will be created.
   * If the Labels were archived, they will be unarchived.
   *
   * @generated from field: repeated buf.registry.module.v1.ScopedLabelRef scoped_label_refs = 3;
   */
  scopedLabelRefs: ScopedLabelRef[] = [];

  /**
   * The URL of the source control commit to associate with the Commit for this Content.
   *
   * BSR users can navigate to this link to find source control information that is relevant to this Commit
   * (e.g. commit description, PR discussion, authors, approvers, etc.).
   *
   * @generated from field: string source_control_url = 4;
   */
  sourceControlUrl = "";

  constructor(data?: PartialMessage<UploadRequest_Content>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.registry.module.v1.UploadRequest.Content";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "module_ref", kind: "message", T: ModuleRef },
    { no: 2, name: "files", kind: "message", T: File, repeated: true },
    { no: 3, name: "scoped_label_refs", kind: "message", T: ScopedLabelRef, repeated: true },
    { no: 4, name: "source_control_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UploadRequest_Content {
    return new UploadRequest_Content().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UploadRequest_Content {
    return new UploadRequest_Content().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UploadRequest_Content {
    return new UploadRequest_Content().fromJsonString(jsonString, options);
  }

  static equals(a: UploadRequest_Content | PlainMessage<UploadRequest_Content> | undefined, b: UploadRequest_Content | PlainMessage<UploadRequest_Content> | undefined): boolean {
    return proto3.util.equals(UploadRequest_Content, a, b);
  }
}

/**
 * @generated from message buf.registry.module.v1.UploadResponse
 */
export class UploadResponse extends Message<UploadResponse> {
  /**
   * The Commits for each reference in the same order as given on the request.
   *
   * A single Commit will be returned for each reference. These Commits may or may not be new.
   * If nothing changed for a given reference, the existing Commit will be returned.
   *
   * @generated from field: repeated buf.registry.module.v1.Commit commits = 1;
   */
  commits: Commit[] = [];

  constructor(data?: PartialMessage<UploadResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "buf.registry.module.v1.UploadResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "commits", kind: "message", T: Commit, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UploadResponse {
    return new UploadResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UploadResponse {
    return new UploadResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UploadResponse {
    return new UploadResponse().fromJsonString(jsonString, options);
  }

  static equals(a: UploadResponse | PlainMessage<UploadResponse> | undefined, b: UploadResponse | PlainMessage<UploadResponse> | undefined): boolean {
    return proto3.util.equals(UploadResponse, a, b);
  }
}


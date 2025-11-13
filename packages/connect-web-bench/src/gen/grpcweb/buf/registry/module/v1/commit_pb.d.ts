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

import * as buf_registry_module_v1_digest_pb from '../../../../buf/registry/module/v1/digest_pb'; // proto import: "buf/registry/module/v1/digest.proto"
import * as buf_registry_priv_extension_v1beta1_extension_pb from '../../../../buf/registry/priv/extension/v1beta1/extension_pb'; // proto import: "buf/registry/priv/extension/v1beta1/extension.proto"
import * as buf_validate_validate_pb from '../../../../buf/validate/validate_pb'; // proto import: "buf/validate/validate.proto"
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"


export class Commit extends jspb.Message {
  getId(): string;
  setId(value: string): Commit;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): Commit;
  hasCreateTime(): boolean;
  clearCreateTime(): Commit;

  getOwnerId(): string;
  setOwnerId(value: string): Commit;

  getModuleId(): string;
  setModuleId(value: string): Commit;

  getDigest(): buf_registry_module_v1_digest_pb.Digest | undefined;
  setDigest(value?: buf_registry_module_v1_digest_pb.Digest): Commit;
  hasDigest(): boolean;
  clearDigest(): Commit;

  getCreatedByUserId(): string;
  setCreatedByUserId(value: string): Commit;

  getSourceControlUrl(): string;
  setSourceControlUrl(value: string): Commit;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Commit.AsObject;
  static toObject(includeInstance: boolean, msg: Commit): Commit.AsObject;
  static serializeBinaryToWriter(message: Commit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Commit;
  static deserializeBinaryFromReader(message: Commit, reader: jspb.BinaryReader): Commit;
}

export namespace Commit {
  export type AsObject = {
    id: string;
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject;
    ownerId: string;
    moduleId: string;
    digest?: buf_registry_module_v1_digest_pb.Digest.AsObject;
    createdByUserId: string;
    sourceControlUrl: string;
  };
}


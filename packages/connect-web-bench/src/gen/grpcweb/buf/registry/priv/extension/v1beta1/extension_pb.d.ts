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

import * as google_protobuf_descriptor_pb from 'google-protobuf/google/protobuf/descriptor_pb'; // proto import: "google/protobuf/descriptor.proto"


export class MessageConstraints extends jspb.Message {
  getRequestOnly(): boolean;
  setRequestOnly(value: boolean): MessageConstraints;

  getResponseOnly(): boolean;
  setResponseOnly(value: boolean): MessageConstraints;

  getNoSideEffectsOnly(): boolean;
  setNoSideEffectsOnly(value: boolean): MessageConstraints;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageConstraints.AsObject;
  static toObject(includeInstance: boolean, msg: MessageConstraints): MessageConstraints.AsObject;
  static serializeBinaryToWriter(message: MessageConstraints, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageConstraints;
  static deserializeBinaryFromReader(message: MessageConstraints, reader: jspb.BinaryReader): MessageConstraints;
}

export namespace MessageConstraints {
  export type AsObject = {
    requestOnly: boolean,
    responseOnly: boolean,
    noSideEffectsOnly: boolean,
  }
}


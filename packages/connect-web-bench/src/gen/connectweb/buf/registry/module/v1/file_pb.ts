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

// @generated by protoc-gen-es v2.1.0 with parameter "target=ts"
// @generated from file buf/registry/module/v1/file.proto (package buf.registry.module.v1, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import { file_buf_validate_validate } from "../../../validate/validate_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file buf/registry/module/v1/file.proto.
 */
export const file_buf_registry_module_v1_file: GenFile = /*@__PURE__*/
  fileDesc("CiFidWYvcmVnaXN0cnkvbW9kdWxlL3YxL2ZpbGUucHJvdG8SFmJ1Zi5yZWdpc3RyeS5tb2R1bGUudjEifAoERmlsZRJjCgRwYXRoGAEgASgJQlW6SFLIAQFyTRiAIDJEXihbXi8uXVteL10/fFteL11bXi8uXXxbXi9dezMsfSkoLyhbXi8uXVteL10/fFteL11bXi8uXXxbXi9dezMsfSkpKiS6AQFcEg8KB2NvbnRlbnQYAiABKAwqZAoIRmlsZVR5cGUSGQoVRklMRV9UWVBFX1VOU1BFQ0lGSUVEEAASEwoPRklMRV9UWVBFX1BST1RPEAESEQoNRklMRV9UWVBFX0RPQxACEhUKEUZJTEVfVFlQRV9MSUNFTlNFEANCTlpMYnVmLmJ1aWxkL2dlbi9nby9idWZidWlsZC9yZWdpc3RyeS9wcm90b2NvbGJ1ZmZlcnMvZ28vYnVmL3JlZ2lzdHJ5L21vZHVsZS92MWIGcHJvdG8z", [file_buf_validate_validate]);

/**
 * A file that can be read or written to from disk.
 *
 * A File includes a path and associated content.
 * Files are purposefully simple, and do not include attributes such as permissions.
 *
 * @generated from message buf.registry.module.v1.File
 */
export type File = Message<"buf.registry.module.v1.File"> & {
  /**
   * The path of the File.
   *
   * The path must be relative, and cannot contain any "." or ".." components.
   * The separator "/" must be used.
   *
   * @generated from field: string path = 1;
   */
  path: string;

  /**
   * The content of the File.
   *
   * May be empty.
   *
   * @generated from field: bytes content = 2;
   */
  content: Uint8Array;
};

/**
 * Describes the message buf.registry.module.v1.File.
 * Use `create(FileSchema)` to create a new message.
 */
export const FileSchema: GenMessage<File> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_file, 0);

/**
 * A specific file type.
 *
 * @generated from enum buf.registry.module.v1.FileType
 */
export enum FileType {
  /**
   * @generated from enum value: FILE_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * A .proto file.
   *
   * @generated from enum value: FILE_TYPE_PROTO = 1;
   */
  PROTO = 1,

  /**
   * A documentation file.
   *
   * Documentation files are always named README.md, README.markdown, or buf.md.
   *
   * @generated from enum value: FILE_TYPE_DOC = 2;
   */
  DOC = 2,

  /**
   * A license file.
   *
   * License files are always named LICENSE.
   *
   * @generated from enum value: FILE_TYPE_LICENSE = 3;
   */
  LICENSE = 3,
}

/**
 * Describes the enum buf.registry.module.v1.FileType.
 */
export const FileTypeSchema: GenEnum<FileType> = /*@__PURE__*/
  enumDesc(file_buf_registry_module_v1_file, 0);


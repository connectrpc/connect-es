// Copyright 2021-2022 Buf Technologies, Inc.
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

import type { FieldInfo, OneofInfo } from "./field.js";

/**
 * Provides convenient access to field information of a message type.
 */
export interface FieldList {
  /**
   * Find field information by field name or json_name.
   */
  findJsonName(jsonName: string): FieldInfo | undefined;

  /**
   * Find field information by proto field number.
   */
  find(fieldNo: number): FieldInfo | undefined;

  /**
   * Return field information in the order they appear in the source.
   */
  list(): readonly FieldInfo[];

  /**
   * Return field information ordered by field number ascending.
   */
  byNumber(): readonly FieldInfo[];

  /**
   * In order of appearance in the source, list fields and
   * oneof groups.
   */
  byMember(): readonly (FieldInfo | OneofInfo)[];
}

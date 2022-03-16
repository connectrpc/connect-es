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

/**
 * Reflection information for a protobuf enum.
 */
export interface EnumType {
  /**
   * The fully qualified name of the enum.
   */
  readonly typeName: string;

  readonly values: readonly EnumValueInfo[];

  /**
   * Find an enum value by its (protobuf) name.
   */
  findName(name: string): EnumValueInfo | undefined;

  /**
   * Find an enum value by its number.
   */
  findNumber(no: number): EnumValueInfo | undefined;

  // We do not surface options at this time
  // readonly options: OptionsMap;
}

/**
 * Reflection information for a protobuf enum value.
 */
export interface EnumValueInfo {
  /**
   * The number of the value as specified in proto.
   */
  readonly no: number;

  /**
   * The name of the value as specified in proto.
   */
  readonly name: string;

  // We do not surface options at this time
  // readonly options: OptionsMap;
}

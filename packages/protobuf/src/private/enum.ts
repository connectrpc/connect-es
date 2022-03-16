// Copyright 2020-2022 Buf Technologies, Inc.
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

import type { EnumType, EnumValueInfo } from "../enum.js";
import { assert } from "./assert.js";

/**
 * Represents a generated enum.
 */
export interface EnumObject {
  [key: number]: string;

  [k: string]: number | string;
}

const enumTypeSymbol = Symbol("@bufbuild/protobuf/enum-type");

/**
 * Get reflection information from a generated enum.
 * If this function is called on something other than a generated
 * enum, it raises an error.
 */
export function getEnumType(enumObject: EnumObject): EnumType {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
  const t = (enumObject as any)[enumTypeSymbol];
  assert(t, "missing enum type on enum object");
  return t; // eslint-disable-line @typescript-eslint/no-unsafe-return
}

/**
 * Sets reflection information on a generated enum.
 */
export function setEnumType(
  enumObject: EnumObject,
  typeName: string,
  values: EnumValueInfo[]
  // We do not surface options at this time
  // opt?: {
  // options?: { readonly [extensionName: string]: JsonValue };
  // },
): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  (enumObject as any)[enumTypeSymbol] = makeEnumType(typeName, values);
}

// We do not surface options at this time
// export type PartialEnumValue = Omit<EnumValueInfo, 'options'> & Partial<Pick<EnumValueInfo, "options">>;

/**
 * Create a new EnumType with the given values.
 */
export function makeEnumType(
  typeName: string,
  values: EnumValueInfo[]
  // We do not surface options at this time
  // opt?: {
  // options?: { readonly [extensionName: string]: JsonValue };
  // },
): EnumType {
  const names = Object.create(null) as Record<string, EnumValueInfo>;
  const numbers = Object.create(null) as Record<number, EnumValueInfo>;
  const normalValues: EnumValueInfo[] = [];
  for (const value of values) {
    // We do not surface options at this time
    // const value: EnumValueInfo = {...v, options: v.options ?? emptyReadonlyObject};
    normalValues.push(value);
    names[value.name] = value;
    numbers[value.no] = value;
  }
  return {
    typeName,
    values: normalValues,
    // We do not surface options at this time
    // options: opt?.options ?? Object.create(null),
    findName(name: string): EnumValueInfo | undefined {
      return names[name];
    },
    findNumber(no: number): EnumValueInfo | undefined {
      return numbers[no];
    },
  };
}

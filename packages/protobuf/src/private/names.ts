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
 * Returns the JSON name for a protobuf field, exactly like protoc does.
 */
export function makeJsonName(protoName: string) {
  return protoCamelCase(protoName);
}

/**
 * Returns the local name of a field, exactly like protoc-gen-es does.
 */
export function makeFieldName(protoName: string, inOneof: boolean) {
  const n = protoCamelCase(protoName);
  if (inOneof) {
    return n;
  }
  return rProp[n] ? n + escapeChar : n;
}

/**
 * Returns the local name of a oneof group, exactly like protoc-gen-es does.
 */
export function makeOneofName(protoName: string): string {
  return makeFieldName(protoName, false);
}

/**
 * Returns the local name of a rpc, exactly like protoc-gen-es does.
 */
export function makeMethodName(protoName: string): string {
  if (protoName.length == 0) {
    return protoName;
  }
  return protoName[0].toLowerCase() + protoName.substring(1);
}

// Converts snake_case to protoCamelCase according to the convention
// used by protoc to convert a field name to a JSON name.
function protoCamelCase(snakeCase: string): string {
  let capNext = false;
  const b = [];
  for (let i = 0; i < snakeCase.length; i++) {
    let c = snakeCase.charAt(i);
    switch (c) {
      case "_":
        capNext = true;
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        b.push(c);
        capNext = false;
        break;
      default:
        if (capNext) {
          capNext = false;
          c = c.toUpperCase();
        }
        b.push(c);
        break;
    }
  }
  return b.join("");
}

// escapeChar must be appended to a reserved name.
// We choose '$' because it is invalid in proto identifiers.
const escapeChar = "$";

// Names that cannot be used for object properties.
// See buf_es/protoc-gen-es/internal/protoplugin/names.go
const rProp: { [k: string]: boolean } = {
  // names reserved by JavaScript
  constructor: true,
  toString: true,
  toJSON: true,
  valueOf: true,

  // names reserved by the runtime
  getType: true,
  clone: true,
  equals: true,
  fromBinary: true,
  fromJson: true,
  fromJsonString: true,
  toBinary: true,
  toJson: true,
  toJsonString: true,

  // names reserved by the runtime for the future
  toObject: true,
};

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

import type { FieldInfo, OneofInfo, PartialFieldInfo } from "../field.js";
import type { FieldList } from "../field-list.js";

export type FieldListSource =
  | readonly PartialFieldInfo[]
  | readonly FieldInfo[]
  | (() => readonly PartialFieldInfo[])
  | (() => readonly FieldInfo[]);

export class InternalFieldList implements FieldList {
  private readonly _fields: FieldListSource;
  private readonly _normalizer: (p: FieldListSource) => FieldInfo[];
  private all?: readonly FieldInfo[];
  private numbersAsc?: readonly FieldInfo[];
  private jsonNames?: { readonly [jsonName: string]: FieldInfo };
  private numbers?: { readonly [fieldNo: number]: FieldInfo };
  private members?: (FieldInfo | OneofInfo)[];

  constructor(
    fields: FieldListSource,
    normalizer: (p: FieldListSource) => FieldInfo[]
  ) {
    this._fields = fields;
    this._normalizer = normalizer;
  }

  findJsonName(jsonName: string): FieldInfo | undefined {
    if (!this.jsonNames) {
      const t: { [jsonName: string]: FieldInfo } = {};
      for (const f of this.list()) {
        t[f.jsonName] = t[f.name] = f;
      }
      this.jsonNames = t;
    }
    return this.jsonNames[jsonName];
  }

  find(fieldNo: number): FieldInfo | undefined {
    if (!this.numbers) {
      const t: { [fieldNo: number]: FieldInfo } = {};
      for (const f of this.list()) {
        t[f.no] = f;
      }
      this.numbers = t;
    }
    return this.numbers[fieldNo];
  }

  list(): readonly FieldInfo[] {
    if (!this.all) {
      this.all = this._normalizer(this._fields);
    }
    return this.all;
  }

  byNumber(): readonly FieldInfo[] {
    if (!this.numbersAsc) {
      this.numbersAsc = this.list()
        .concat()
        .sort((a, b) => a.no - b.no);
    }
    return this.numbersAsc;
  }

  byMember(): readonly (FieldInfo | OneofInfo)[] {
    if (!this.members) {
      this.members = [];
      const a = this.members;
      let o: OneofInfo | undefined;
      for (const f of this.list()) {
        if (f.oneof) {
          if (f.oneof !== o) {
            o = f.oneof;
            a.push(o);
          }
        } else {
          a.push(f);
        }
      }
    }
    return this.members;
  }
}

import type { FieldInfo, OneofInfo } from "../field.js";
import { makeOneofName } from "./names.js";
import { assert } from "./assert.js";

export class InternalOneofInfo implements OneofInfo {
  readonly kind = "oneof";
  readonly name: string;
  readonly localName: string;
  readonly repeated = false;
  readonly packed = false;
  readonly opt = false;
  readonly default = undefined;
  readonly fields: FieldInfo[] = [];
  private _lookup?: { [localName: string]: FieldInfo | undefined };

  constructor(name: string) {
    this.name = name;
    this.localName = makeOneofName(name);
  }

  addField(field: FieldInfo) {
    assert(field.oneof === this, `field ${field.name} not one of ${this.name}`);
    this.fields.push(field);
  }

  findField(localName: string): FieldInfo | undefined {
    if (!this._lookup) {
      this._lookup = Object.create(null) as {
        [localName: string]: FieldInfo | undefined;
      };
      for (let i = 0; i < this.fields.length; i++) {
        this._lookup[this.fields[i].localName] = this.fields[i];
      }
    }
    return this._lookup[localName];
  }
}

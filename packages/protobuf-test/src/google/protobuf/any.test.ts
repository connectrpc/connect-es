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

import { Any, Struct, TypeRegistry, Value } from "@bufbuild/protobuf";

describe(Any.typeName, () => {
  const typeRegistry = TypeRegistry.fromTypes(Struct, Value);

  test(`encodes ${Struct.typeName} to JSON`, () => {
    const str = new Struct({
      fields: {
        foo: { kind: { case: "numberValue", value: 1 } },
      },
    });
    const got = Any.pack(str).toJson({
      typeRegistry,
    });
    expect(got).toStrictEqual({
      "@type": "type.googleapis.com/google.protobuf.Struct",
      value: { foo: 1 },
    });
  });

  test(`encodes ${Value.typeName} to JSON`, () => {
    const val = new Value({
      kind: { case: "numberValue", value: 1 },
    });
    const got = Any.pack(val).toJson({
      typeRegistry,
    });
    expect(got).toStrictEqual({
      "@type": "type.googleapis.com/google.protobuf.Value",
      value: 1,
    });
  });

  test(`encodes ${Value.typeName} with ${Struct.typeName} to JSON`, () => {
    const want = {
      "@type": "type.googleapis.com/google.protobuf.Value",
      value: {
        foo: 1,
      },
    };
    const got = Any.pack(
      new Value({
        kind: {
          case: "structValue",
          value: new Struct({
            fields: {
              foo: { kind: { case: "numberValue", value: 1 } },
            },
          }),
        },
      })
    ).toJson({ typeRegistry });
    expect(got).toStrictEqual(want);
  });

  test(`decodes ${Value.typeName} from JSON`, () => {
    const want = new Value({
      kind: { case: "numberValue", value: 1 },
    });
    const any = Any.fromJson(
      {
        "@type": "type.googleapis.com/google.protobuf.Value",
        value: 1,
      },
      { typeRegistry }
    );
    const got = new Value();
    expect(any.unpackTo(got)).toBe(true);
    expect(got).toStrictEqual(want);
  });
});

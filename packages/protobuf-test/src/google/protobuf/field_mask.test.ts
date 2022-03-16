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

import { FieldMask } from "@bufbuild/protobuf";

describe(FieldMask.typeName, () => {
  const fieldMask = new FieldMask({
    paths: ["user.display_name", "photo"],
  });
  const json = "user.displayName,photo";
  test("encodes to JSON", () => {
    expect(fieldMask.toJson()).toBe(json);
  });
  test("decodes from JSON", () => {
    const want = new FieldMask({
      paths: ["user.display_name", "photo"],
    });
    expect(FieldMask.fromJson(json)).toStrictEqual(want);
  });
});

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

import { create, fromBinary, toBinary } from "@bufbuild/protobuf";
import { Int64ValueSchema } from "@bufbuild/protobuf/wkt";

describe("bigint", () => {
  it("survives binary roundtrip", () => {
    expect(
      String(
        fromBinary(
          Int64ValueSchema,
          toBinary(
            Int64ValueSchema,
            //@ts-expect-error TODO: fix the typescript error.
            create(Int64ValueSchema, { value: "3409819015" }),
          ),
        ).value,
      ),
    ).toBe("3409819015");
  });
});

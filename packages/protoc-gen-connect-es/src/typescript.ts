// Copyright 2021-2023 Buf Technologies, Inc.
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

import type { DescService } from "@bufbuild/protobuf";
import { MethodIdempotency, MethodKind } from "@bufbuild/protobuf";
import type { GeneratedFile, Schema } from "@bufbuild/protoplugin/ecmascript";
import {
  literalString,
  makeJsDoc,
  localName,
} from "@bufbuild/protoplugin/ecmascript";

export function generateTs(schema: Schema) {
  for (const protoFile of schema.files) {
    if (protoFile.services.length == 0) {
      continue;
    }
    const file = schema.generateFile(protoFile.name + "_connect.ts");
    file.preamble(protoFile);
    for (const service of protoFile.services) {
      generateService(schema, file, service);
    }
  }
}

// prettier-ignore
function generateService(
  schema: Schema,
  f: GeneratedFile,
  service: DescService
) {
  const { MethodKind: rtMethodKind, MethodIdempotency: rtMethodIdempotency } =
    schema.runtime;
  f.print(makeJsDoc(service));
  f.print("export const ", localName(service), " = {");
  f.print(`  typeName: `, literalString(service.typeName), `,`);
  f.print("  methods: {");
  for (const method of service.methods) {
    f.print(makeJsDoc(method, "    "));
    f.print("    ", localName(method), ": {");
    f.print(`      name: `, literalString(method.name), `,`);
    f.print("      I: ", method.input, ",");
    f.print("      O: ", method.output, ",");
    f.print(
      "      kind: ",
      rtMethodKind,
      ".",
      MethodKind[method.methodKind],
      ","
    );
    if (method.idempotency !== undefined) {
      f.print(
        "    idempotency: ",
        rtMethodIdempotency,
        ".",
        MethodIdempotency[method.idempotency],
        ","
      );
    }
    // In case we start supporting options, we have to surface them here
    f.print("    },");
  }
  f.print("  }");
  f.print("} as const;");
  f.print();
}

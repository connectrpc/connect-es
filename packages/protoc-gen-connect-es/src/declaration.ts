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

import type { DescService } from "@bufbuild/protobuf";
import { MethodIdempotency, MethodKind } from "@bufbuild/protobuf";
import type { GeneratedFile, Schema } from "@bufbuild/protoplugin/ecmascript";
import { localName } from "@bufbuild/protoplugin/ecmascript";

export function generateDts(schema: Schema) {
  for (const protoFile of schema.files) {
    const file = schema.generateFile(protoFile.name + "_connect.d.ts");
    file.preamble(protoFile);
    for (const service of protoFile.services) {
      generateService(schema, file, service);
    }
  }
}

// prettier-ignore
function generateService(schema: Schema, f: GeneratedFile, service: DescService) {
  const { MethodKind: rtMethodKind, MethodIdempotency: rtMethodIdempotency } = schema.runtime;
  f.print(f.jsDoc(service));
  f.print(f.exportDecl("declare const", localName(service)), ": {");
  f.print(`  readonly typeName: `, f.string(service.typeName), `,`);
  f.print("  readonly methods: {");
  for (const method of service.methods) {
    f.print(f.jsDoc(method, "    "));
    f.print("    readonly ", localName(method), ": {");
    f.print(`      readonly name: `, f.string(method.name), `,`);
    f.print("      readonly I: typeof ", method.input, ",");
    f.print("      readonly O: typeof ", method.output, ",");
    f.print("      readonly kind: ", rtMethodKind, ".", MethodKind[method.methodKind], ",");
    if (method.idempotency !== undefined) {
      f.print("      readonly idempotency: ", rtMethodIdempotency, ".", MethodIdempotency[method.idempotency], ",");
    }
    // In case we start supporting options, we have to surface them here
    f.print("    },");
  }
  f.print("  }");
  f.print("};");
  f.print();
}

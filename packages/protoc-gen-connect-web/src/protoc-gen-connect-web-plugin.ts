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

import type { DescService } from "@bufbuild/protobuf";
import { MethodIdempotency, MethodKind } from "@bufbuild/protobuf";
import type { GeneratedFile, Schema } from "@bufbuild/protoplugin/ecmascript";
import {
  literalString,
  makeJsDoc,
  localName,
} from "@bufbuild/protoplugin/ecmascript";
import { createEcmaScriptPlugin } from "@bufbuild/protoplugin";
import { version } from "../package.json";

export const protocGenConnectWeb = createEcmaScriptPlugin(
  {
    name: "protoc-gen-connect-web",
    version: `v${String(version)}`,
  },
  (schema) => {
    const targets = [typescript, javascript, declaration].filter((gen) =>
      schema.targets.includes(gen.target)
    );
    for (const protoFile of schema.files) {
      if (protoFile.services.length == 0) {
        continue;
      }
      for (const target of targets) {
        const file = schema.generateFile(protoFile.name + target.extension);
        file.preamble(protoFile);
        for (const service of protoFile.services) {
          target.generateService(schema, file, service);
        }
      }
    }
  }
);

const typescript = {
  target: "ts",
  extension: "_connectweb.ts",
  // prettier-ignore
  generateService(schema: Schema, f: GeneratedFile, service: DescService) {
    const { MethodKind: rtMethodKind, MethodIdempotency: rtMethodIdempotency } = schema.runtime;
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
      f.print("      kind: ", rtMethodKind, ".", MethodKind[method.methodKind], ",");
      if (method.idempotency !== undefined) {
        f.print("    idempotency: ", rtMethodIdempotency, ".", MethodIdempotency[method.idempotency], ",");
      }
      // In case we start supporting options, we have to surface them here
      f.print("    },");
    }
    f.print("  }");
    f.print("} as const;");
    f.print();
  },
} as const;

const javascript = {
  target: "js",
  extension: "_connectweb.js",
  // prettier-ignore
  generateService(schema: Schema, f: GeneratedFile, service: DescService) {
    const { MethodKind: rtMethodKind, MethodIdempotency: rtMethodIdempotency } = schema.runtime;
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
      f.print("      kind: ", rtMethodKind, ".", MethodKind[method.methodKind], ",");
      if (method.idempotency !== undefined) {
        f.print("      idempotency: ", rtMethodIdempotency, ".", MethodIdempotency[method.idempotency], ",");
      }
      // In case we start supporting options, we have to surface them here
      f.print("    },");
    }
    f.print("  }");
    f.print("};");
    f.print();
  },
} as const;

const declaration = {
  target: "dts",
  extension: "_connectweb.d.ts",
  // prettier-ignore
  generateService(schema: Schema, f: GeneratedFile, service: DescService) {
    const { MethodKind: rtMethodKind, MethodIdempotency: rtMethodIdempotency } = schema.runtime;
    f.print(makeJsDoc(service));
    f.print("export declare const ", localName(service), ": {");
    f.print(`  readonly typeName: `, literalString(service.typeName), `,`);
    f.print("  readonly methods: {");
    for (const method of service.methods) {
      f.print(makeJsDoc(method, "    "));
      f.print("    readonly ", localName(method), ": {");
      f.print(`      readonly name: `, literalString(method.name), `,`);
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
  },
} as const;

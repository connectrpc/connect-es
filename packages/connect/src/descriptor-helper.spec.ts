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

import { create } from "@bufbuild/protobuf";
import type { DescFile, DescMethod, DescService } from "@bufbuild/protobuf";
import type { GenService } from "@bufbuild/protobuf/codegenv1";
import {
  Edition,
  FileDescriptorProtoSchema,
  MethodDescriptorProtoSchema,
  MethodOptions_IdempotencyLevel,
  ServiceDescriptorProtoSchema,
} from "@bufbuild/protobuf/wkt";

interface ServiceType {
  readonly typeName: string;
  readonly method: Record<
    string,
    Pick<DescMethod, "methodKind" | "input" | "output"> &
      Partial<Pick<DescMethod, "idempotency">>
  >;
}

/**
 * Helper to create a minimal `DescService` that is sufficient for connect.
 */
export function createServiceDesc<T extends ServiceType>(
  service: T,
): GenService<T["method"]> {
  const file = {
    kind: "file",
    dependencies: [],
    deprecated: false,
    edition: Edition.EDITION_2023,
    enums: [],
    extensions: [],
    messages: [],
    name: "test.proto",
    proto: create(FileDescriptorProtoSchema), // We don't use it so we set it to a default
    services: [] as DescService[],
  } satisfies DescFile;
  const i = service.typeName.lastIndexOf(".");
  const methods: DescMethod[] = [];
  const serviceDesc = {} as DescService;
  for (const [localName, method] of Object.entries(service.method)) {
    methods.push({
      deprecated: false,
      kind: "rpc",
      name: localName[0].toUpperCase() + localName.substring(1),
      localName: localName,
      parent: serviceDesc,
      methodKind: method.methodKind,
      input: method.input,
      output: method.output,
      idempotency:
        method.idempotency ??
        MethodOptions_IdempotencyLevel.IDEMPOTENCY_UNKNOWN,
      proto: create(MethodDescriptorProtoSchema),
    });
  }
  Object.assign(serviceDesc, {
    file,
    kind: "service",
    deprecated: false,
    name: i < 0 ? service.typeName : service.typeName.substring(i + 1),
    typeName: service.typeName,
    method: Object.fromEntries(methods.map((m) => [m.localName, m])),
    methods: methods,
    proto: create(ServiceDescriptorProtoSchema),
  });
  file.services.push(serviceDesc);
  return file.services[0] as GenService<T["method"]>;
}

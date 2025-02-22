#!/usr/bin/env -S npx tsx

// Copyright 2021-2025 The Connect Authors
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

import {
  createEcmaScriptPlugin,
  runNodeJs,
  type GeneratedFile,
  type Schema,
  safeIdentifier,
} from "@bufbuild/protoplugin";
import { DescMethod, DescService } from "@bufbuild/protobuf";
import { sizes } from "./constants";

runNodeJs(
  createEcmaScriptPlugin({
    name: "protoc-gen-entrypoints",
    version: `v0`,
    generateTs(schema: Schema) {
      const methods: DescMethod[] = [];
      for (const file of schema.files) {
        for (const service of file.services) {
          for (const method of service.methods) {
            methods.push(method);
          }
        }
      }
      for (const size of sizes) {
        generateConnectWeb(
          schema.generateFile(`connectweb/entry-${size}.ts`),
          methods.slice(0, size),
        );
        generateGrpcWeb(
          schema.generateFile(`grpcweb/entry-${size}.ts`),
          methods.slice(0, size),
        );
      }
    },
  }),
);

// prettier-ignore
function generateConnectWeb(f: GeneratedFile, methods: DescMethod[]) {
  f.print("/* eslint-disable no-console */");
  f.print();
  const createClient = f.import("createClient", "@connectrpc/connect");
  const createConnectTransport = f.import("createConnectTransport", "@connectrpc/connect-web");
  let lastService: DescService | undefined = undefined;
  f.print(f.jsDoc(`Calls ${methods.length} RPCs with Connect-Web`));
  f.print("export async function call() {");
  f.print("  const transport = ", createConnectTransport, "({");
  f.print(`    baseUrl: "https://buf.build/",`);
  f.print("  });");
  for (const method of methods) {
    const service = method.parent;
    const clientName = getClientName(service);
    if (lastService !== service) {
      const serviceSchema = f.import(
        service.name,
        "./connectweb/" + service.file.name + "_pb.js",
      );
      f.print("  const ", clientName, " = ", createClient, "(", serviceSchema, ", transport);");
      lastService = method.parent;
    }
    f.print("  console.log(await ", clientName, ".", method.localName, "({}));");
  }
  f.print("}");
}

// prettier-ignore
function generateGrpcWeb(f: GeneratedFile, methods: DescMethod[]) {
  f.print("/* eslint-disable no-console */");
  f.print();
  let lastService: DescService | undefined = undefined;
  f.print(f.jsDoc(`Calls ${methods.length} RPCs with gRPC-Web`));
  f.print("export async function call() {");
  f.print(`  const hostname = "https://buf.build/";`);
  for (const method of methods) {
    const service = method.parent;
    const clientName = getClientName(service);
    if (lastService !== service) {
      const clientClass = f.import(
        service.name + "PromiseClient",
        "./grpcweb/" + service.file.name + "_grpc_web_pb.js",
      );
      f.print("  const ", clientName, " = new ", clientClass, "(hostname);");
      lastService = method.parent;
    }
    const requestClass = f.import(
      method.input.name,
      "./grpcweb/" + service.file.name + "_pb.js",
    );
    f.print("  console.log(await ", clientName, ".", method.localName, "(new ", requestClass, "()));");
  }
  f.print("}");
}

function getClientName(service: DescService) {
  let name = service.name;
  name = name[0].toLowerCase() + name.substring(1);
  if (name.endsWith("Service")) {
    name = name.substring(0, name.length - "Service".length);
  }
  name += "Client";
  return safeIdentifier(name);
}

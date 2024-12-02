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

import j from "jscodeshift";

const bufbuildProtobufPackage = "@bufbuild/protobuf";

/**
 * Replace imports for a message class with a schema import, and update
 * - "new" expressions
 * - isMessage calls
 *
 * When the identifier is used elsewhere, add a type import for the message type.
 * When the message is a well-known type, update to import from @bufbuild/protobuf/wkt.
 */
const transform: j.Transform = (file, { j }, options) => {
  const root = j(file.source);

  // Identifiers imported from generated protos
  const pbNames = new Set<string>();

  // Identifiers we'll need to import from @bufbuild/protobuf
  const needBufbuildProtobufImports = new Set<string>();

  // Replace wkt imports from @bufbuild/protobuf to @bufbuild/protobuf/wkt
  root
    .find(j.ImportDeclaration, {
      specifiers: [
        {
          type: "ImportSpecifier",
        },
      ],
      source: {
        type: "StringLiteral",
        value: bufbuildProtobufPackage,
      },
      importKind: "value",
    })
    .forEach((path) => {
      const specifiers = path.value.specifiers ?? [];
      const specifiersWkt = specifiers.filter(
        (specifier) =>
          specifier.type === "ImportSpecifier" &&
          isWktMessage(specifier.imported.name),
      );
      const specifiersRest = specifiers.filter(
        (specifier) => !specifiersWkt.includes(specifier),
      );
      if (specifiersWkt.length > 0) {
        path.insertAfter(
          j.importDeclaration(
            specifiersWkt,
            j.stringLiteral(bufbuildProtobufPackage + "/wkt"),
          ),
        );
        if (specifiersRest.length > 0) {
          path.replace(j.importDeclaration(specifiersRest, path.value.source));
        } else {
          path.replace();
        }
      }
    });

  // Replace `new Foo()` -> `create(FooSchema)`
  root
    .find(j.NewExpression, {
      callee: {
        type: "Identifier",
      },
    })
    .filter((path) => {
      const name = (path.node.callee as j.Identifier).name;
      return findPbImports(name, root).size() > 0;
    })
    .forEach((path) => {
      const name = (path.node.callee as j.Identifier).name;
      path.replace(
        j.callExpression(j.identifier("create"), [
          j.identifier(name + "Schema"),
          ...path.node.arguments,
        ]),
      );
      pbNames.add(name);
      needBufbuildProtobufImports.add("create");
    });

  // Replace `isMessage(foo, Foo)` -> `isMessage(foo, FooSchema)`
  root
    .find(j.CallExpression, {
      callee: {
        type: "Identifier",
      },
    })
    .filter((path) => {
      const fnName = (path.node.callee as j.Identifier).name;
      if (fnName !== "isMessage") {
        return false;
      }
      if (path.node.arguments.length !== 2) {
        return false;
      }
      const ident = path.node.arguments[1];
      if (ident.type !== "Identifier") {
        return false;
      }
      return findPbImports(ident.name, root).size() > 0;
    })
    .forEach((path) => {
      const ident = path.node.arguments[1] as j.Identifier;
      path.replace(
        j.callExpression(path.node.callee, [
          path.node.arguments[0],
          j.identifier(ident.name + "Schema"),
        ]),
      );
      pbNames.add(ident.name);
    });

  // Replace `Foo.fromBinary(x, y)` -> `fromBinary(FooSchema, x, y)`
  replaceStaticMethodCall(
    "fromBinary",
    pbNames,
    needBufbuildProtobufImports,
    root,
  );
  replaceStaticMethodCall(
    "fromJson",
    pbNames,
    needBufbuildProtobufImports,
    root,
  );
  replaceStaticMethodCall(
    "fromJsonString",
    pbNames,
    needBufbuildProtobufImports,
    root,
  );

  // Replace `import {Foo}` -> `import {FooSchema}`
  for (const name of pbNames) {
    findPbImports(name, root).forEach((path) => {
      path.replace(
        j.importDeclaration(
          path.value.specifiers?.map((specifier) =>
            specifier.type === "ImportSpecifier" &&
            specifier.imported.name === name
              ? j.importSpecifier(j.identifier(name + "Schema"))
              : specifier,
          ),
          path.value.source,
          path.value.importKind,
        ),
      );
    });
  }

  // Add type import when the name was used outside of new and isMessage()
  if (file.path.endsWith(".ts")) {
    for (const name of pbNames) {
      if (root.find(j.Identifier, { name }).size() > 0) {
        const pbImports = findPbImports(name + "Schema", root);
        const firstImport = pbImports.at(0);
        const from = (firstImport.get() as j.ASTPath<j.ImportDeclaration>).value
          .source;
        firstImport.insertAfter(
          j.importDeclaration(
            [j.importSpecifier(j.identifier(name))],
            from,
            "type",
          ),
        );
      }
    }
  }

  // Add `import {create} from "@bufbuild/protobuf"`
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- linter is wrong
  if (needBufbuildProtobufImports.size > 0) {
    const needSpecifiers = Array.from(needBufbuildProtobufImports).map((name) =>
      j.importSpecifier(j.identifier(name)),
    );
    // Find existing import
    const importBufbuildProtobuf = root.find(j.ImportDeclaration, {
      specifiers: [
        {
          type: "ImportSpecifier",
        },
      ],
      source: {
        type: "StringLiteral",
        value: bufbuildProtobufPackage,
      },
      importKind: "value",
    });
    if (importBufbuildProtobuf.size() > 0) {
      // Add to existing import
      importBufbuildProtobuf
        .at(0)
        .replaceWith((path) =>
          j.importDeclaration(
            [...(path.value.specifiers ?? []), ...needSpecifiers],
            path.value.source,
            path.value.importKind,
          ),
        );
    } else {
      // Add new import
      root
        .find(j.ImportDeclaration, {
          specifiers: [
            {
              type: "ImportSpecifier",
            },
          ],
        })
        .at(0)
        .insertAfter(
          j.importDeclaration(
            needSpecifiers,
            j.stringLiteral(bufbuildProtobufPackage),
          ),
        );
    }
  }

  return root.toSource(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- passing the printOptions onto toSource is safe
    options.printOptions ?? {
      quote: determineQuoteStyle(root.find(j.ImportDeclaration)),
    },
  );
};

function findPbImports(name: string, root: j.Collection) {
  const nameMinusSchema = name.endsWith("Schema")
    ? name.substring(0, name.length - 6)
    : name;
  return root
    .find(j.ImportDeclaration, {
      specifiers: [
        {
          type: "ImportSpecifier",
        },
      ],
    })
    .filter((path) => {
      const containsName =
        path.value.specifiers?.some(
          (specifier) =>
            (specifier as j.ImportSpecifier).imported.name === name,
        ) ?? false;
      if (!containsName) {
        return false;
      }
      const from = path.value.source.value;
      if (typeof from !== "string") {
        return false;
      }
      const fromIsWkt =
        (from === bufbuildProtobufPackage ||
          from === bufbuildProtobufPackage + "/wkt") &&
        (isWktMessage(name) || isWktMessage(nameMinusSchema));
      const fromIsPb =
        from.endsWith("_pb") ||
        from.endsWith("_pb.js") ||
        from.endsWith("_pb.ts");
      return fromIsPb || fromIsWkt;
    });
}

function replaceStaticMethodCall(
  methodName: string,
  pbNames: Set<string>,
  needBufbuildProtobufImports: Set<string>,
  root: j.Collection,
): void {
  root
    .find(j.CallExpression, {
      callee: {
        type: "MemberExpression",
        object: {
          type: "Identifier",
        },
        property: {
          type: "Identifier",
          name: methodName,
        },
      },
    })
    .forEach((path) => {
      const callee = path.value.callee as j.MemberExpression;
      const object = callee.object as j.Identifier;
      const pbImports = findPbImports(object.name, root);
      if (pbImports.size() === 0) {
        return;
      }
      path.replace(
        j.callExpression(j.identifier(methodName), [
          j.identifier(object.name + "Schema"),
          ...path.value.arguments,
        ]),
      );
      pbNames.add(object.name);
      needBufbuildProtobufImports.add(methodName);
    });
}

function determineQuoteStyle(
  importPaths: j.Collection<j.ImportDeclaration>,
): "double" | "single" {
  let nodePath: unknown;
  if (importPaths.length > 0) {
    nodePath = importPaths.get("source", "extra", "raw") as unknown;
  }
  if (
    typeof nodePath == "object" &&
    nodePath != null &&
    "value" in nodePath &&
    typeof nodePath.value == "string"
  ) {
    return nodePath.value.startsWith("'") ? "single" : "double";
  }
  return "double";
}

function isWktMessage(name: string): boolean {
  return [
    "Any",
    "Duration",
    "Timestamp",
    "DoubleValue",
    "FloatValue",
    "Int64Value",
    "UInt64Value",
    "Int32Value",
    "UInt32Value",
    "BoolValue",
    "StringValue",
    "BytesValue",
    "Struct",
    "Value",
    "ListValue",
    "FieldMask",
    "Empty",
    "SourceContext",
    "Type",
    "Field",
    "Enum",
    "EnumValue",
    "Option",
    "Api",
    "Method",
    "Mixin",
    "FileDescriptorSet",
    "FileDescriptorProto",
    "DescriptorProto",
    "DescriptorProto_ExtensionRange",
    "DescriptorProto_ReservedRange",
    "ExtensionRangeOptions",
    "ExtensionRangeOptions_Declaration",
    "FieldDescriptorProto",
    "OneofDescriptorProto",
    "EnumDescriptorProto",
    "EnumDescriptorProto_EnumReservedRange",
    "EnumValueDescriptorProto",
    "ServiceDescriptorProto",
    "MethodDescriptorProto",
    "FileOptions",
    "MessageOptions",
    "FieldOptions",
    "FieldOptions_EditionDefault",
    "FieldOptions_FeatureSupport",
    "OneofOptions",
    "EnumOptions",
    "EnumValueOptions",
    "ServiceOptions",
    "MethodOptions",
    "UninterpretedOption",
    "UninterpretedOption_NamePart",
    "FeatureSet",
    "FeatureSetDefaults",
    "FeatureSetDefaults_FeatureSetEditionDefault",
    "SourceCodeInfo",
    "SourceCodeInfo_Location",
    "GeneratedCodeInfo",
    "GeneratedCodeInfo_Annotation",
    "Version",
    "CodeGeneratorRequest",
    "CodeGeneratorResponse",
    "CodeGeneratorResponse_File",
  ].includes(name);
}

export default transform;

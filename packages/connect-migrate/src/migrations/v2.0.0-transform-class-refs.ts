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
          path.value.specifiers?.map((specifier) => {
            if (
              specifier.type !== "ImportSpecifier" ||
              !namesEqual(name, specifier)
            ) {
              return specifier;
            }
            return j.importSpecifier(
              j.identifier(`${specifier.imported.name}Schema`),
              j.identifier(`${specifier.local?.name}Schema`),
            );
          }),
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
        const from = firstImport.get() as j.ASTPath<j.ImportDeclaration>;
        const fromSource = from.value.source;

        // Search and see if this name is in the root yet. If it is, replace it.
        // If not, insert it
        // This is so we end up with:
        //  import type { Foo, Bar } from “./x.js”;
        // instead of:
        //  import type { Foo } from “./x.js”;
        //  import type { Bar } from “./x.js”;
        const typeImports = root.find(j.ImportDeclaration, {
          source: {
            type: "StringLiteral",
            value: fromSource.value as string,
          },
          importKind: "type",
        });
        // If the type import for this source file isn't in the root yet, add it
        const importDecl = findImportByName(name + "Schema", root);
        if (importDecl !== undefined) {
          const importSpecs =
            importDecl.value.specifiers?.map((specifier) => {
              if (specifier.type !== "ImportSpecifier") {
                return specifier;
              }
              const localMinusSchema = removeSchemaSuffix(
                specifier.local?.name,
              );
              const importedMinusSchema = removeSchemaSuffix(
                specifier.imported.name,
              );

              return j.importSpecifier(
                j.identifier(`${importedMinusSchema}`),
                j.identifier(`${localMinusSchema}`),
              );
            }) ?? [];

          if (typeImports.length === 0) {
            firstImport.insertAfter(
              j.importDeclaration(importSpecs, fromSource, "type"),
            );
          } else {
            typeImports.forEach((path) => {
              const specs =
                path.value.specifiers?.map((specifier) => {
                  if (specifier.type !== "ImportSpecifier") {
                    return specifier;
                  }
                  return j.importSpecifier(
                    j.identifier(`${specifier.imported.name}`),
                    j.identifier(`${specifier.local?.name}`),
                  );
                }) ?? [];

              specs.concat(importSpecs);

              path.replace(
                j.importDeclaration(specs, path.value.source, "type"),
              );
            });
          }
        }
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

function findImportByName(name: string, root: j.Collection) {
  const result = root
    .find(j.ImportDeclaration, {
      specifiers: [
        {
          type: "ImportSpecifier",
        },
      ],
    })
    .filter((path) => {
      return (
        path.value.specifiers?.some((specifier) =>
          namesEqual(name, specifier as j.ImportSpecifier),
        ) ?? false
      );
    });
  if (result.length === 0) {
    return undefined;
  }
  return result.at(0).get() as j.ASTPath<j.ImportDeclaration>;
}

function namesEqual(name: string, importSpecifier: j.ImportSpecifier) {
  if (importSpecifier.local?.name !== importSpecifier.imported.name) {
    // This is an import alias, so use the localName for comparison
    return importSpecifier.local?.name === name;
  }

  return importSpecifier.imported.name === name;
}

function removeSchemaSuffix(name: string | undefined) {
  if (name === undefined) {
    return "";
  }
  return name.endsWith("Schema") ? name.substring(0, name.length - 6) : name;
}

function findPbImports(name: string, root: j.Collection) {
  return root
    .find(j.ImportDeclaration, {
      specifiers: [
        {
          type: "ImportSpecifier",
        },
      ],
    })
    .filter((path) => {
      // First make sure that the given name is in the root doc
      const found = path.value.specifiers?.find((specifier) => {
        return namesEqual(name, specifier as j.ImportSpecifier);
      });
      if (!found) {
        return false;
      }
      const from = path.value.source.value;
      if (typeof from !== "string") {
        return false;
      }

      // The given name may be an alias, so to test whether this is fromWkt,
      // we need to use the imported name to compare against the list of wkt
      // imports
      const importedName = (found as j.ImportSpecifier).imported.name;
      const importedNameMinusSchema = removeSchemaSuffix(importedName);
      const fromIsWkt =
        (from === bufbuildProtobufPackage ||
          from === bufbuildProtobufPackage + "/wkt") &&
        (isWktMessage(importedName) || isWktMessage(importedNameMinusSchema));
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

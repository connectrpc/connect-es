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

package protoplugin

import (
	"bytes"
	"path/filepath"
	"strings"
)

// escapeChar must be appended to a reserved name.
// We choose '$' because it is invalid in proto identifiers.
const escapeChar = "$"

var (
	// reservedIdentifiers cannot be used for classes or other types,
	// but _can_ be used for object properties.
	reservedIdentifiers = map[string]struct{}{
		// ECMAScript 2015 keywords
		"break":      {},
		"case":       {},
		"catch":      {},
		"class":      {},
		"const":      {},
		"continue":   {},
		"debugger":   {},
		"default":    {},
		"delete":     {},
		"do":         {},
		"else":       {},
		"export":     {},
		"extends":    {},
		"false":      {},
		"finally":    {},
		"for":        {},
		"function":   {},
		"if":         {},
		"import":     {},
		"in":         {},
		"instanceof": {},
		"new":        {},
		"null":       {},
		"return":     {},
		"super":      {},
		"switch":     {},
		"this":       {},
		"throw":      {},
		"true":       {},
		"try":        {},
		"typeof":     {},
		"var":        {},
		"void":       {},
		"while":      {},
		"with":       {},
		"yield":      {},

		// ECMAScript 2015 future reserved keywords
		"enum":       {},
		"implements": {},
		"interface":  {},
		"let":        {},
		"package":    {},
		"private":    {},
		"protected":  {},
		"public":     {},
		"static":     {},

		// Class name cannot be 'Object' when targeting ES5 with module CommonJS
		"Object": {},

		// TypeScript keywords that cannot be used for types (as opposed to variables)
		"bigint":  {},
		"number":  {},
		"boolean": {},
		"string":  {},
		"object":  {},

		// Identifiers reserved for the runtime, so we can generate legible code
		"globalThis": {},
		"Uint8Array": {},
		"Partial":    {},
	}

	// reservedObjectProperties are names that cannot be used for object
	// properties.
	reservedObjectProperties = map[string]struct{}{
		// names reserved by JavaScript
		"constructor": {},
		"toString":    {},
		"toJSON":      {},
		"valueOf":     {},

		// names reserved by the runtime
		"getType":        {},
		"clone":          {},
		"equals":         {},
		"fromBinary":     {},
		"fromJson":       {},
		"fromJsonString": {},
		"toBinary":       {},
		"toJson":         {},
		"toJsonString":   {},

		// names reserved by the runtime for the future
		"toObject": {},
	}
)

var (
	// runtimeImportPath points to the protobuf runtime library.
	runtimeImportPath = "@bufbuild/protobuf"

	// runtimeImportPath points to the protobuf runtime library when
	// bootstrapping the well-known types.
	runtimeImportPathBootstrapWKT = "./index.js"

	// wktSourceToImportPath maps from the path of a well-known types proto
	// file to the JavaScript import path for the runtime package.
	wktSourceToImportPath = map[string]string{
		"google/protobuf/compiler/plugin.proto": "@bufbuild/protobuf",
		"google/protobuf/any.proto":             "@bufbuild/protobuf",
		"google/protobuf/api.proto":             "@bufbuild/protobuf",
		"google/protobuf/descriptor.proto":      "@bufbuild/protobuf",
		"google/protobuf/duration.proto":        "@bufbuild/protobuf",
		"google/protobuf/empty.proto":           "@bufbuild/protobuf",
		"google/protobuf/field_mask.proto":      "@bufbuild/protobuf",
		"google/protobuf/source_context.proto":  "@bufbuild/protobuf",
		"google/protobuf/struct.proto":          "@bufbuild/protobuf",
		"google/protobuf/timestamp.proto":       "@bufbuild/protobuf",
		"google/protobuf/type.proto":            "@bufbuild/protobuf",
		"google/protobuf/wrappers.proto":        "@bufbuild/protobuf",
	}

	// knownExtensions are file extensions for which we automatically derive an
	// import path.
	knownExtensions = []string{".d.ts", ".ts", ".ts", ".js", ".mjs", ".cjs"}
)

// makePBImportPath returns the import path for message and enum types generated
// by the type generator.
func makePBImportPath(file *File, bootstrapWkt bool) string {
	// Well-known types are published with the runtime package. We usually want
	// the generated code to import them from the runtime package, with the
	// following exceptions:
	// 1. We are bootstrapping the runtime package via the plugin option
	//    "bootstrap_wkt". In that case, we cannot refer to the runtime package
	//    itself.
	// 2. We were explicitly asked to generate the well-known type.
	if jsWktImportPath, isWkt := wktSourceToImportPath[file.Proto.GetName()]; isWkt && !bootstrapWkt && !file.Generate {
		return jsWktImportPath
	}
	return "./" + file.Name + "_pb.js"
}

// deriveImportPath returns an import path "./foo/bar_x.js" for file name
// "foo/bar_x.ts". If the file name does not have any of the known
// extensions, it is returned as is.
func deriveImportPath(filename string) string {
	for _, ke := range knownExtensions {
		if strings.HasSuffix(filename, ke) {
			importPath := strings.TrimSuffix(filename, ke) + ".js"
			if !strings.HasPrefix(importPath, "./") && !strings.HasPrefix(importPath, "../") {
				importPath = "./" + importPath
			}
			return importPath
		}
	}
	return filename
}

// makeImportPathRelative makes an import path relative to the file importing
// it. For example, consider the following files:
// - foo/foo.js
// - baz.js
// If foo.js wants to import baz.js, we return ../baz.js
func makeImportPathRelative(importer string, importPath string) string {
	if !strings.HasPrefix(importPath, "./") && !strings.HasPrefix(importPath, "../") {
		return importPath
	}
	dir := filepath.Dir(importer)
	rel, _ := filepath.Rel(dir, importPath)
	if rel != "" {
		importPath = filepath.ToSlash(rel)
		if !strings.HasPrefix(importPath, "./") && !strings.HasPrefix(importPath, "../") {
			importPath = "./" + importPath
		}
	}
	return importPath
}

func makeMessageName(message *Message) string {
	nestedName := strings.TrimPrefix(message.protoTypeName, "."+message.File.Proto.GetPackage()+".")
	name := strings.ReplaceAll(nestedName, ".", "_")
	if _, reserved := reservedIdentifiers[name]; reserved {
		return name + escapeChar
	}
	return name
}

func makeEnumName(enum *Enum) (string, string) {
	screamingSnakeCase := func(upperCamelCase string) string {
		var snakeNext = false
		var b strings.Builder
		for i := 0; i < len(upperCamelCase); i++ {
			c := upperCamelCase[i]
			switch {
			case 'A' <= c && c <= 'Z':
				if snakeNext {
					b.WriteByte('_')
					snakeNext = false
				}
			case 'a' <= c && c <= 'z':
				snakeNext = true
				c -= 'a' - 'A'
			case c == '_':
				snakeNext = false
			}
			b.WriteByte(c)
		}
		return b.String()
	}
	sharedPrefix := screamingSnakeCase(enum.Proto.GetName()) + "_"
	for _, v := range enum.Proto.Value {
		if !strings.HasPrefix(v.GetName(), sharedPrefix) {
			sharedPrefix = ""
			break
		}
		valueName := strings.TrimPrefix(v.GetName(), sharedPrefix)
		if valueName == "" {
			sharedPrefix = ""
			break
		}
		f := valueName[0]
		if '0' <= f && f <= '9' {
			// identifiers must not start with numbers
			sharedPrefix = ""
			break
		}
	}
	nestedName := strings.TrimPrefix(enum.protoTypeName, "."+enum.File.Proto.GetPackage()+".")
	name := strings.ReplaceAll(nestedName, ".", "_")
	if _, reserved := reservedIdentifiers[name]; reserved {
		name += escapeChar
	}
	return name, sharedPrefix
}

func makeEnumValueName(protoName string, sharedPrefix string) string {
	return strings.TrimPrefix(protoName, sharedPrefix)
}

func makeFieldName(protoName string, inOneof bool) string {
	name := protoCamelCase(protoName)
	if inOneof {
		return name
	}
	if _, reserved := reservedObjectProperties[name]; reserved {
		return name + escapeChar
	}
	return name
}

func makeOneofName(protoName string) string {
	return makeFieldName(protoName, false)
}

func makeServiceName(protoName string) string {
	if _, reserved := reservedIdentifiers[protoName]; reserved {
		return protoName + escapeChar
	}
	return protoName
}

func makeMethodName(protoName string) string {
	if len(protoName) == 0 {
		return protoName
	}
	b := []byte(protoName)
	return string(append(bytes.ToLower(b[:1]), b[1:]...))
}

// protoCamelCase converts snake_case to protoCamelCase according to the
// convention used by protoc to convert a field name to a JSON name.
func protoCamelCase(snakeCase string) string {
	var capNext = false
	var b strings.Builder
	b.Grow(len(snakeCase))
	for i := 0; i < len(snakeCase); i++ {
		c := snakeCase[i]
		switch c {
		case '_':
			capNext = true
		case '0', '1', '2', '3', '4', '5', '6', '7', '8', '9':
			b.WriteByte(c)
			capNext = false
		default:
			if capNext {
				capNext = false
				// convert lowercase to uppercase
				if 'a' <= c && c <= 'z' {
					c -= 'a' - 'A'
				}
			}
			b.WriteByte(c)
		}
	}
	return b.String()
}

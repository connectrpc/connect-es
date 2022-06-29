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

package main

import (
	"github.com/bufbuild/protobuf-es/private/protoplugin"
	"google.golang.org/protobuf/types/descriptorpb"
	"google.golang.org/protobuf/types/pluginpb"
)

const version = "v0.0.9"

func main() {
	protoplugin.Options{
		Name:    "protoc-gen-connect-web",
		Version: version,
	}.Pipe(func(gen *protoplugin.Generator) error {
		gen.SupportedFeatures = uint64(pluginpb.CodeGeneratorResponse_FEATURE_PROTO3_OPTIONAL)
		for _, file := range gen.Files {
			if !file.Generate {
				continue
			}
			if len(file.Services) == 0 {
				continue
			}
			for _, target := range gen.Targets {
				switch target {
				case protoplugin.TargetTypeScript:
					generateFile(gen, file, generateServiceTS, ".ts")
				case protoplugin.TargetJavaScript:
					generateFile(gen, file, generateServiceJS, ".js")
				case protoplugin.TargetTypeDeclaration:
					generateFile(gen, file, generateServiceDTS, ".d.ts")
				}
			}
		}
		return nil
	})
}

func generateFile(
	gen *protoplugin.Generator,
	file *protoplugin.File,
	generateService func(*protoplugin.GeneratedFile, *protoplugin.Service),
	extension string,
) {
	if len(file.Services) == 0 {
		return
	}
	f := gen.NewGeneratedFile(file.Name + "_connectweb" + extension)
	f.H(file.Preamble)
	for _, service := range file.Services {
		generateService(f, service)
	}
}

func generateServiceJS(f *protoplugin.GeneratedFile, service *protoplugin.Service) {
	rt := service.File.RuntimeSymbols
	f.P(service.JSDoc(""))
	f.P("export const ", service.LocalName, " = {")
	f.P(`  typeName: "`, service.TypeName, `",`)
	f.P("  methods: {")
	for _, method := range service.Methods {
		f.P(method.JSDoc("    "))
		f.P("    ", method.LocalName, ": {")
		f.P(`      name: "`, method.Proto.GetName(), `",`)
		f.P("      I: ", method.Input.Symbol, ",")
		f.P("      O: ", method.Output.Symbol, ",")
		switch {
		case method.Proto.GetClientStreaming() && method.Proto.GetServerStreaming():
			f.P("      kind: ", rt.MethodKind, ".BiDiStreaming,")
		case method.Proto.GetClientStreaming():
			f.P("      kind: ", rt.MethodKind, ".ClientStreaming,")
		case method.Proto.GetServerStreaming():
			f.P("      kind: ", rt.MethodKind, ".ServerStreaming,")
		default:
			f.P("      kind: ", rt.MethodKind, ".Unary,")
		}
		switch method.Proto.Options.GetIdempotencyLevel() {
		case descriptorpb.MethodOptions_NO_SIDE_EFFECTS:
			f.P("      idempotency: ", rt.MethodIdempotency, ".NoSideEffects,")
		case descriptorpb.MethodOptions_IDEMPOTENT:
			f.P("      idempotency: ", rt.MethodIdempotency, ".Idempotent,")
		}
		f.P("    },")
	}
	f.P("  }")
	f.P("};")
	f.P()
}

func generateServiceTS(f *protoplugin.GeneratedFile, service *protoplugin.Service) {
	rt := service.File.RuntimeSymbols
	f.P(service.JSDoc(""))
	f.P("export const ", service.LocalName, " = {")
	f.P(`  typeName: "`, service.TypeName, `",`)
	f.P("  methods: {")
	for _, method := range service.Methods {
		f.P(method.JSDoc("    "))
		f.P("    ", method.LocalName, ": {")
		f.P(`      name: "`, method.Proto.GetName(), `",`)
		f.P("      I: ", method.Input.Symbol, ",")
		f.P("      O: ", method.Output.Symbol, ",")
		switch {
		case method.Proto.GetClientStreaming() && method.Proto.GetServerStreaming():
			f.P("      kind: ", rt.MethodKind, ".BiDiStreaming,")
		case method.Proto.GetClientStreaming():
			f.P("      kind: ", rt.MethodKind, ".ClientStreaming,")
		case method.Proto.GetServerStreaming():
			f.P("      kind: ", rt.MethodKind, ".ServerStreaming,")
		default:
			f.P("      kind: ", rt.MethodKind, ".Unary,")
		}
		switch method.Proto.Options.GetIdempotencyLevel() {
		case descriptorpb.MethodOptions_NO_SIDE_EFFECTS:
			f.P("      idempotency: ", rt.MethodIdempotency, ".NoSideEffects,")
		case descriptorpb.MethodOptions_IDEMPOTENT:
			f.P("      idempotency: ", rt.MethodIdempotency, ".Idempotent,")
		}
		f.P("    },")
	}
	f.P("  }")
	f.P("} as const;")
	f.P()
}

func generateServiceDTS(f *protoplugin.GeneratedFile, service *protoplugin.Service) {
	rt := service.File.RuntimeSymbols
	f.P(service.JSDoc(""))
	f.P("export declare const ", service.LocalName, ": {")
	f.P(`  readonly typeName: "`, service.TypeName, `",`)
	f.P("  readonly methods: {")
	for _, method := range service.Methods {
		f.P(method.JSDoc("    "))
		f.P("    readonly ", method.LocalName, ": {")
		f.P(`      readonly name: "`, method.Proto.GetName(), `",`)
		f.P("      readonly I: typeof ", method.Input.Symbol, ",")
		f.P("      readonly O: typeof ", method.Output.Symbol, ",")
		switch {
		case method.Proto.GetClientStreaming() && method.Proto.GetServerStreaming():
			f.P("      readonly kind: ", rt.MethodKind, ".BiDiStreaming,")
		case method.Proto.GetClientStreaming():
			f.P("      readonly kind: ", rt.MethodKind, ".ClientStreaming,")
		case method.Proto.GetServerStreaming():
			f.P("      readonly kind: ", rt.MethodKind, ".ServerStreaming,")
		default:
			f.P("      readonly kind: ", rt.MethodKind, ".Unary,")
		}
		switch method.Proto.Options.GetIdempotencyLevel() {
		case descriptorpb.MethodOptions_NO_SIDE_EFFECTS:
			f.P("      readonly idempotency: ", rt.MethodIdempotency, ".NoSideEffects,")
		case descriptorpb.MethodOptions_IDEMPOTENT:
			f.P("      readonly idempotency: ", rt.MethodIdempotency, ".Idempotent,")
			f.P("      readonly idempotency: ", rt.MethodIdempotency, ".Idempotent,")
		}
		f.P("    },")
	}
	f.P("  }")
	f.P("};")
	f.P()
}

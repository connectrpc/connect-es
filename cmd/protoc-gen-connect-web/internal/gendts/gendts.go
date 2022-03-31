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

package gendts

import (
	"github.com/bufbuild/protobuf-es/private/protoplugin"
	"google.golang.org/protobuf/types/descriptorpb"
)

func GenerateFile(gen *protoplugin.Generator, file *protoplugin.File) {
	if len(file.Services) == 0 {
		return
	}
	f := gen.NewGeneratedFile(file.Name + "_connectweb.d.ts")
	f.H(file.Preamble)

	for _, service := range file.Services {
		generateService(f, service)
	}
}

func generateService(f *protoplugin.GeneratedFile, service *protoplugin.Service) {
	rt := service.File.RuntimeSymbols
	f.P(service.JSDoc(""))
	f.P("export declare const ", service.LocalName, ": {")
	f.P(`  readonly typeName: "`, service.TypeName, `",`)
	f.P("  readonly methods: {")
	for _, method := range service.Methods {
		f.P(method.JSDoc("    "))
		f.P("    readonly ", method.LocalName, ": {")
		f.P(`      readonly name: "`, method.Proto.GetName(), `",`)
		f.P("      readonly I: ", method.Input.Symbol, ",")
		f.P("      readonly O: ", method.Output.Symbol, ",")
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
		}
		f.P("    },")
	}
	f.P("  }")
	f.P("};")
}

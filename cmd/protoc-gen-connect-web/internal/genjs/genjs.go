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

package genjs

import (
	"github.com/bufbuild/protobuf-es/private/protoplugin"
	"google.golang.org/protobuf/types/descriptorpb"
)

func GenerateFile(gen *protoplugin.Generator, file *protoplugin.File) {
	if len(file.Services) == 0 {
		return
	}
	f := gen.NewGeneratedFile(file.Name + "_connectweb.js")
	f.H(file.Preamble)

	for _, service := range file.Services {
		generateService(f, service)
	}
}

func generateService(file *protoplugin.GeneratedFile, service *protoplugin.Service) {
	runtime := service.File.RuntimeSymbols
	file.P(service.JSDoc(""))
	file.P("export const ", service.LocalName, " = {")
	file.P(`  typeName: "`, service.TypeName, `",`)
	file.P("  methods: {")
	for _, method := range service.Methods {
		file.P(method.JSDoc("    "))
		file.P("    ", method.LocalName, ": {")
		file.P(`      name: "`, method.Proto.GetName(), `",`)
		file.P("      I: ", method.Input.Symbol, ",")
		file.P("      O: ", method.Output.Symbol, ",")
		switch {
		case method.Proto.GetClientStreaming() && method.Proto.GetServerStreaming():
			file.P("      kind: ", runtime.MethodKind, ".BiDiStreaming,")
		case method.Proto.GetClientStreaming():
			file.P("      kind: ", runtime.MethodKind, ".ClientStreaming,")
		case method.Proto.GetServerStreaming():
			file.P("      kind: ", runtime.MethodKind, ".ServerStreaming,")
		default:
			file.P("      kind: ", runtime.MethodKind, ".Unary,")
		}
		switch method.Proto.Options.GetIdempotencyLevel() {
		case descriptorpb.MethodOptions_NO_SIDE_EFFECTS:
			file.P("      idempotency: ", runtime.MethodIdempotency, ".NoSideEffects,")
		case descriptorpb.MethodOptions_IDEMPOTENT:
			file.P("      idempotency: ", runtime.MethodIdempotency, ".Idempotent,")
		case descriptorpb.MethodOptions_IDEMPOTENCY_UNKNOWN:
			// undefined
		}
		file.P("    },")
	}
	file.P("  }")
	file.P("};")
	file.P()
}

package connectweb_generator

import (
	protoplugin2 "github.com/bufbuild/connect-web/internal/protoplugin"
	"google.golang.org/protobuf/types/descriptorpb"
)

func GenerateFile(gen *protoplugin2.Generator, file *protoplugin2.File) {
	if len(file.Services) == 0 {
		return
	}
	f := gen.NewGeneratedFile(file.Name + "_connectweb.ts")
	f.H(file.Preamble)

	for _, service := range file.Services {
		generateService(f, service)
		f.P()
	}
}

func generateService(f *protoplugin2.GeneratedFile, service *protoplugin2.Service) {
	rt := service.File.RuntimeSymbols
	f.P(service.JSDoc(""))
	f.P("export const ", service.LocalName, " = {")
	f.P(`    typeName: "`, service.TypeName, `",`)
	f.P("    methods: {")
	for _, method := range service.Methods {
		f.P(method.JSDoc("        "))
		f.P("        ", method.LocalName, ": {")
		f.P(`            name: "`, method.Proto.GetName(), `",`)
		f.P("            I: ", method.Input.Symbol, ",")
		f.P("            O: ", method.Output.Symbol, ",")
		switch {
		case method.Proto.GetClientStreaming() && method.Proto.GetServerStreaming():
			f.P("            kind: ", rt.MethodKind, ".BiDiStreaming,")
		case method.Proto.GetClientStreaming():
			f.P("            kind: ", rt.MethodKind, ".ClientStreaming,")
		case method.Proto.GetServerStreaming():
			f.P("            kind: ", rt.MethodKind, ".ServerStreaming,")
		default:
			f.P("            kind: ", rt.MethodKind, ".Unary,")
		}
		switch method.Proto.Options.GetIdempotencyLevel() {
		case descriptorpb.MethodOptions_NO_SIDE_EFFECTS:
			f.P("            idempotency: ", rt.MethodIdempotency, ".NoSideEffects,")
		case descriptorpb.MethodOptions_IDEMPOTENT:
			f.P("            idempotency: ", rt.MethodIdempotency, ".Idempotent,")
		}
		f.P("        },")
	}
	f.P("    }")
	f.P("} as const;")
}

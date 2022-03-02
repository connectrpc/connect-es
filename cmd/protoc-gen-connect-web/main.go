package main

import (
	"github.com/bufbuild/connect-web/internal/genconnectweb"
	"github.com/bufbuild/connect-web/internal/protoplugin"
	"google.golang.org/protobuf/types/pluginpb"
)

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
			genconnectweb.GenerateFile(gen, file)
		}
		return nil
	})
}

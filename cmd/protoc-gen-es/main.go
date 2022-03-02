package main

import (
	"github.com/bufbuild/connect-web/internal/genpb"
	"github.com/bufbuild/connect-web/internal/protoplugin"
	"google.golang.org/protobuf/types/pluginpb"
)

func main() {
	protoplugin.Options{
		Name:    "protoc-gen-es",
		Version: version,
	}.Pipe(func(gen *protoplugin.Generator) error {
		gen.SupportedFeatures = uint64(pluginpb.CodeGeneratorResponse_FEATURE_PROTO3_OPTIONAL)
		for _, file := range gen.Files {
			if !file.Generate {
				continue
			}
			genpb.GenerateFile(gen, file)
		}
		return nil
	})
}

package main

import (
	"github.com/bufconnect/connect-web/internal/pb_generator"
	"github.com/bufconnect/connect-web/internal/protoplugin"
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
			pb_generator.GenerateFile(gen, file)
		}
		return nil
	})
}

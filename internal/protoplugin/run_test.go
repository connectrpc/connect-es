package protoplugin

import (
	"errors"
	"os"
	"testing"

	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/descriptorpb"
	"google.golang.org/protobuf/types/pluginpb"
)

func TestRun(t *testing.T) {
	t.Run("basic run", func(t *testing.T) {
		req := makeCodeGeneratorRequest(t, "../../packages/test/descriptorset.bin", "")
		res, err := Options{
			Version:   "0.0.1",
			ParamFunc: nil,
		}.Run(req, func(gen *Generator) error {
			var got = len(gen.Files)
			var want = len(req.ProtoFile)
			if got != want {
				t.Errorf("want %d files, got %d", want, got)
			}
			f := gen.NewGeneratedFile("x.js")
			f.SkipIfEmpty = false
			return nil
		})
		if err != nil {
			t.Errorf("unexpected err: %v", err)
			return
		}
		if len(res.File) != 1 {
			t.Errorf("unexpected files")
		}
		if res.Error != nil {
			t.Errorf("unexpected err: %s", res.GetError())
		}
	})
	t.Run("generator error is response error", func(t *testing.T) {
		req := &pluginpb.CodeGeneratorRequest{}
		res, err := Options{}.Run(req, func(gen *Generator) error {
			return errors.New("sad")
		})
		if err != nil {
			t.Errorf("unexpected err: %v", err)
			t.FailNow()
		}
		if len(res.File) != 0 {
			t.Errorf("unexpected files")
		}
		if res.Error == nil {
			t.Errorf("expected err: %s", res.GetError())
		}
		if res.GetError() != "sad" {
			t.Errorf("missing error. want %q got %q", "sad", res.GetError())
		}
	})
	t.Run("invalid request is run error", func(t *testing.T) {
		req := &pluginpb.CodeGeneratorRequest{
			FileToGenerate: []string{"a.proto"},
		}
		_, err := Options{}.Run(req, func(gen *Generator) error {
			return nil
		})
		if err == nil {
			t.FailNow()
		}
		const want = "invalid request: no descriptor for file to generate: a.proto"
		var got = err.Error()
		if got != want {
			t.Errorf("want %q got %q", want, got)
		}
	})
}

func makeCodeGeneratorRequest(t *testing.T, imagePath string, parameter string, filesToGenerate ...string) *pluginpb.CodeGeneratorRequest {
	imageBytes, err := os.ReadFile(imagePath)
	if err != nil {
		t.Error(err)
	}
	image := &descriptorpb.FileDescriptorSet{}
	err = proto.Unmarshal(imageBytes, image)
	if err != nil {
		t.Error(err)
	}
	if len(filesToGenerate) == 0 {
		for _, f := range image.GetFile() {
			filesToGenerate = append(filesToGenerate, f.GetName())
		}
	}
	return &pluginpb.CodeGeneratorRequest{
		FileToGenerate:  filesToGenerate,
		Parameter:       &parameter,
		ProtoFile:       image.File,
		CompilerVersion: nil,
	}
}

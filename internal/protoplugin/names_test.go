package protoplugin

import (
	"bytes"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"testing"

	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/descriptorpb"
)

func TestMakeMethodName(t *testing.T) {
	const want = "getImage"
	got := makeMethodName("GetImage")
	if got != want {
		t.Errorf("expected %q but got %q", want, got)
	}
}

func TestDeriveImportPath(t *testing.T) {
	const want = "./extra/name-clash_connectweb.js"
	got := deriveImportPath("extra/name-clash_connectweb.ts")
	if got != want {
		t.Errorf("expected %q but got %q", want, got)
	}
}

func TestMakeImportPathRelative(t *testing.T) {
	assertMakeRelativeImportPathReturns(t, "./extra/name-clash_connectweb.js", "./extra/name-clash_pb.js", "./name-clash_pb.js")
}

func assertMakeRelativeImportPathReturns(t *testing.T, importer string, importPath string, want string) {
	got := makeImportPathRelative(importer, importPath)
	if got != want {
		t.Errorf("expected %q but got %q with importer %q and importPath %q", want, got, importer, importPath)
	}
}

func TestProtoCamelCaseEqualsProtocJsonName(t *testing.T) {
	assertProtoCamelCaseEqualsProtocJSONName(t, "FooBar")
	assertProtoCamelCaseEqualsProtocJSONName(t, "foo_bar")
	assertProtoCamelCaseEqualsProtocJSONName(t, "__proto__")
	assertProtoCamelCaseEqualsProtocJSONName(t, "fieldname1")
	assertProtoCamelCaseEqualsProtocJSONName(t, "field_name2")
	assertProtoCamelCaseEqualsProtocJSONName(t, "_field_name3")
	assertProtoCamelCaseEqualsProtocJSONName(t, "field__name4_")
	assertProtoCamelCaseEqualsProtocJSONName(t, "field0name5")
	assertProtoCamelCaseEqualsProtocJSONName(t, "field_0_name6")
	assertProtoCamelCaseEqualsProtocJSONName(t, "fieldName7")
	assertProtoCamelCaseEqualsProtocJSONName(t, "FieldName8")
	assertProtoCamelCaseEqualsProtocJSONName(t, "field_Name9")
	assertProtoCamelCaseEqualsProtocJSONName(t, "Field_Name10")
	assertProtoCamelCaseEqualsProtocJSONName(t, "FIELD_NAME11")
	assertProtoCamelCaseEqualsProtocJSONName(t, "FIELD_name12")
	assertProtoCamelCaseEqualsProtocJSONName(t, "__field_name13")
	assertProtoCamelCaseEqualsProtocJSONName(t, "__Field_name14")
	assertProtoCamelCaseEqualsProtocJSONName(t, "field__name15")
	assertProtoCamelCaseEqualsProtocJSONName(t, "field__Name16")
	assertProtoCamelCaseEqualsProtocJSONName(t, "field_name17__")
	assertProtoCamelCaseEqualsProtocJSONName(t, "Field_name18__")
}

// assertProtoCamelCaseEqualsProtocJSONName takes the given proto field name
// and runs it through protoc to get the JSON name.
// The result is compared to our own implementation of the algorithm.
// It is important that the implementations in JS and Go match the protoc
// implementation.
func assertProtoCamelCaseEqualsProtocJSONName(t *testing.T, name string) {
	got := protoCamelCase(name)
	want, err := getProtocJSONName(name)
	if err != nil {
		if errors.Is(err, errInvalidProtoFieldName) {
			return
		}
		t.Error(err.Error())
		return
	}
	if got != want {
		t.Errorf("want protoCamelCase(%q) to be %q, got %q", name, want, got)
	}
}

var errInvalidProtoFieldName = errors.New("proto field name is invalid")

// getProtocJSONName runs protoc to get the "json name" for a field
func getProtocJSONName(protoName string) (string, error) {
	if strings.TrimSpace(protoName) != protoName {
		return "", errInvalidProtoFieldName
	}
	tempDir, err := os.MkdirTemp("", "golang-protoc-workdir-*")
	if err != nil {
		return "", err
	}
	inFilename := filepath.Join(tempDir, "i.proto")
	outFilename := filepath.Join(tempDir, "o")
	var in bytes.Buffer
	in.WriteString("syntax = \"proto3\";\n")
	in.WriteString("message I {\n")
	in.WriteString(fmt.Sprintf("  int32 %s = 1;\n", protoName))
	in.WriteString("}\n")
	err = os.WriteFile(inFilename, in.Bytes(), 0600)
	if err != nil {
		return "", err
	}
	cmd := exec.Command("protoc", "-I", tempDir, inFilename, "--descriptor_set_out", outFilename)
	var b bytes.Buffer
	cmd.Stderr = &b
	err = cmd.Run()
	if err != nil {
		stderr := b.String()
		if strings.Contains(stderr, "Expected field name.") {
			return "", errInvalidProtoFieldName
		}
		if strings.Contains(stderr, "Expected field number.") {
			return "", errInvalidProtoFieldName
		}
		if strings.Contains(stderr, "Expected \";\".") {
			return "", errInvalidProtoFieldName
		}
		if strings.Contains(stderr, "Missing field number.") {
			return "", errInvalidProtoFieldName
		}
		if strings.Contains(stderr, "Invalid control characters encountered in text.") {
			return "", errInvalidProtoFieldName
		}
		if stderr != "" {
			return "", errors.New(stderr)
		}
		return "", err
	}
	out, err := os.ReadFile(outFilename)
	if err != nil {
		return "", err
	}
	fds := &descriptorpb.FileDescriptorSet{}
	if err := proto.Unmarshal(out, fds); err != nil {
		return "", err
	}
	return fds.GetFile()[0].GetMessageType()[0].GetField()[0].GetJsonName(), nil
}

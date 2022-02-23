package protoplugin

import (
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"

	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/descriptorpb"
	"google.golang.org/protobuf/types/pluginpb"
)

var ErrInvalidOption = errors.New("invalid option")

type Options struct {
	Name      string // name of this code generator
	Version   string // version of this code generator
	ParamFunc func(key string, value string) error
}

func (o Options) Run(request *pluginpb.CodeGeneratorRequest, gen func(gen *Generator) error) (*pluginpb.CodeGeneratorResponse, error) {
	g, err := NewGenerator(o, request)
	if err != nil {
		return nil, err
	}
	err = gen(g)
	resPb := &pluginpb.CodeGeneratorResponse{
		SupportedFeatures: &g.SupportedFeatures,
	}
	if err != nil {
		errString := err.Error()
		resPb.Error = &errString
		return resPb, nil
	}
	g.toResponse(resPb)
	return resPb, nil
}

func (o Options) Pipe(gen func(gen *Generator) error) {
	exit := func(err error) {
		fmt.Fprintf(os.Stderr, "X%s: %v\n", filepath.Base(os.Args[0]), err)
		os.Exit(1)
	}
	if len(os.Args) > 1 {
		if os.Args[1] == "--version" {
			fmt.Fprintf(os.Stderr, "%s\n", o.Version)
			os.Exit(1)
			return
		}
		exit(errors.New("this command accepts a google.protobuf.compiler.CodeGeneratorRequest on stdin and writes a CodeGeneratorResponse to stdout"))
		return
	}
	in, err := ioutil.ReadAll(os.Stdin)
	if err != nil {
		exit(err)
		return
	}
	reqPb := &pluginpb.CodeGeneratorRequest{}
	if err := proto.Unmarshal(in, reqPb); err != nil {
		exit(err)
		return
	}
	resPb, err := o.Run(reqPb, gen)
	if err != nil {
		errString := err.Error()
		resPb = &pluginpb.CodeGeneratorResponse{Error: &errString}
	}
	out, err := proto.Marshal(resPb)
	if err != nil {
		exit(err)
		return
	}
	if _, err := os.Stdout.Write(out); err != nil {
		exit(err)
		return
	}
	return
}

type Generator struct {
	Options           Options
	Request           *pluginpb.CodeGeneratorRequest
	Files             []*File
	SupportedFeatures uint64
	BootstrapWKT      bool
	TSNoCheck         bool
	ESLintDisable     bool
	symbolPool        *symbolPool
	filesByPath       map[string]*File
	enumsByName       map[string]*Enum
	messagesByName    map[string]*Message
	servicesByName    map[string]*Service
	generatedFiles    []*GeneratedFile
	runtimeImportPath string
}

func NewGenerator(options Options, request *pluginpb.CodeGeneratorRequest) (*Generator, error) {
	g := &Generator{
		Options:           options,
		Request:           request,
		ESLintDisable:     true,
		TSNoCheck:         true,
		symbolPool:        &symbolPool{},
		filesByPath:       make(map[string]*File),
		enumsByName:       make(map[string]*Enum),
		messagesByName:    make(map[string]*Message),
		servicesByName:    make(map[string]*Service),
		runtimeImportPath: runtimeImportPath,
	}
	err := g.parseParameter(request.GetParameter())
	if err != nil {
		return nil, err
	}
	filenameToGenerate := make(map[string]bool)
	for _, filename := range g.Request.FileToGenerate {
		filenameToGenerate[filename] = true
	}
	for _, protoFile := range request.ProtoFile {
		f, err := g.newFile(protoFile, filenameToGenerate[protoFile.GetName()])
		if err != nil {
			return nil, err
		}
		g.filesByPath[protoFile.GetName()] = f
		g.Files = append(g.Files, f)
	}
	for _, file := range g.Files {
		err := file.resolveReferences(g)
		if err != nil {
			return nil, err
		}
	}
	for _, filename := range g.Request.FileToGenerate {
		_, ok := g.filesByPath[filename]
		if !ok {
			return nil, fmt.Errorf("invalid request: no descriptor for file to generate: %s", filename)
		}
	}
	return g, nil
}

func (g *Generator) NewGeneratedFile(name string) *GeneratedFile {
	f := newGeneratedFile(g.symbolPool, name, deriveImportPath(name))
	g.generatedFiles = append(g.generatedFiles, f)
	return f
}

func (g *Generator) parseParameter(parameter string) error {
	if len(parameter) == 0 {
		return nil
	}
	var err error
	var key string
	for _, key = range strings.Split(parameter, ",") {
		var value string
		if i := strings.Index(key, "="); i >= 0 {
			value = key[i+1:]
			key = key[0:i]
		}
		switch key {
		case "bootstrap_wkt":
			switch value {
			case "true", "1":
				g.BootstrapWKT = true
				g.runtimeImportPath = runtimeImportPathBootstrapWKT
			case "false", "0":
				g.BootstrapWKT = false
			default:
				return ErrInvalidOption
			}
		case "ts_nocheck":
			switch value {
			case "true", "1":
				g.TSNoCheck = true
			case "false", "0":
				g.TSNoCheck = false
			default:
				return ErrInvalidOption
			}
		case "eslint_disable":
			switch value {
			case "true", "1":
				g.ESLintDisable = true
			case "false", "0":
				g.ESLintDisable = false
			default:
				return ErrInvalidOption
			}
		default:
			if g.Options.ParamFunc != nil {
				if err = g.Options.ParamFunc(key, value); err != nil {
					break
				}
				continue
			}
			err = ErrInvalidOption
			break
		}
	}
	if err != nil {
		return fmt.Errorf("%w %q", ErrInvalidOption, key)
	}
	return nil
}

func (g *Generator) toResponse(response *pluginpb.CodeGeneratorResponse) {
	for _, f := range g.generatedFiles {
		name := f.GetName()
		if f.SkipIfEmpty && f.IsEmpty() {
			continue
		}
		content := f.GetContent()
		fP := &pluginpb.CodeGeneratorResponse_File{
			Name:              &name,
			InsertionPoint:    nil,
			Content:           &content,
			GeneratedCodeInfo: nil,
		}
		response.File = append(response.File, fP)
	}
}

type ProtoSyntax int

const (
	ProtoSyntaxUnknown ProtoSyntax = iota
	ProtoSyntax2
	ProtoSyntax3
)

func (p ProtoSyntax) String() string {
	switch p {
	case ProtoSyntax2:
		return "proto2"
	case ProtoSyntax3:
		return "proto3"
	default:
		return "unknown"
	}
}

type File struct {
	Proto              *descriptorpb.FileDescriptorProto
	Syntax             ProtoSyntax
	Name               string // name of the file, excluding the .proto suffix
	StandardImportPath string // the standard import path for the type generator (suffix _pb.js)
	RuntimeSymbols     *Runtime
	Enums              []*Enum
	Messages           []*Message // excluding synthetic messages like map entries
	Extensions         []*Extension
	Services           []*Service
	Deprecated         bool       // deprecated with the file level option "deprecated = true"
	Generate           bool       // whether this file was requested to be generated
	allMessages        []*Message // including synthetic messages like map entries
	// TODO expose comments
}

func (g *Generator) newFile(proto *descriptorpb.FileDescriptorProto, generate bool) (*File, error) {
	f := &File{
		Proto:      proto,
		Name:       strings.TrimSuffix(proto.GetName(), ".proto"),
		Deprecated: proto.GetOptions().GetDeprecated(),
		Generate:   generate,
	}
	f.StandardImportPath = makePBImportPath(f, g.BootstrapWKT)
	switch proto.GetSyntax() {
	case "proto3":
		f.Syntax = ProtoSyntax3
	case "":
		f.Syntax = ProtoSyntax2
	default:
		return nil, fmt.Errorf("unsupported syntax: %s", proto.GetSyntax())
	}
	f.RuntimeSymbols = newRuntime(g.symbolPool, g.runtimeImportPath, f.Syntax)
	for _, x := range proto.GetEnumType() {
		f.Enums = append(f.Enums, g.newEnum(x, f))
	}
	for _, x := range proto.GetMessageType() {
		newMessage, err := g.newMessage(x, f)
		if err != nil {
			return nil, err
		}
		f.allMessages = append(f.allMessages, newMessage)
		if !newMessage.Proto.GetOptions().GetMapEntry() {
			f.Messages = append(f.Messages, newMessage)
		}
	}
	for _, x := range proto.GetExtension() {
		newExtension, err := g.newExtension(x, f, nil)
		if err != nil {
			return nil, err
		}
		f.Extensions = append(f.Extensions, newExtension)
	}
	for _, x := range proto.GetService() {
		f.Services = append(f.Services, g.newService(x, f))
	}
	return f, nil
}

func (f *File) String() string {
	return fmt.Sprintf("file %s", f.Proto.GetName())
}

func (f *File) resolveReferences(gen *Generator) error {
	for _, message := range f.Messages {
		if err := message.resolveReferences(gen); err != nil {
			return err
		}
	}
	for _, extension := range f.Extensions {
		if err := extension.resolveReferences(gen); err != nil {
			return err
		}
	}
	for _, service := range f.Services {
		for _, method := range service.Methods {
			if err := method.resolveReferences(gen); err != nil {
				return err
			}
		}
	}
	return nil
}

type Enum struct {
	File          *File
	Proto         *descriptorpb.EnumDescriptorProto
	TypeName      string // fully qualified name
	Symbol        *Symbol
	Values        []*EnumValue
	Deprecated    bool   // deprecated with the enum option "deprecated = true", or implicitly with the file level option
	sharedPrefix  string // MY_ENUM_ for `enum MyEnum {MY_ENUM_A=0; MY_ENUM_B=1;}`, or blank string
	protoTypeName string // fully qualified name with a leading dot
	// TODO expose comments
}

func (g *Generator) newEnum(proto *descriptorpb.EnumDescriptorProto, parentMessageOrFile interface{}) *Enum {
	e := &Enum{
		Proto: proto,
	}
	switch p := parentMessageOrFile.(type) {
	case *Message:
		e.protoTypeName = fmt.Sprintf("%s.%s", p.protoTypeName, proto.GetName())
		e.File = p.File
	case *File:
		if p.Proto.GetPackage() != "" {
			e.protoTypeName = fmt.Sprintf(".%s.%s", p.Proto.GetPackage(), proto.GetName())
		} else {
			e.protoTypeName = fmt.Sprintf(".%s", proto.GetName())
		}
		e.File = p
	}
	e.TypeName = strings.TrimPrefix(e.protoTypeName, ".")
	e.Deprecated = proto.GetOptions().GetDeprecated() || e.File.Deprecated
	localName, sharedPrefix := makeEnumName(e)
	e.sharedPrefix = sharedPrefix
	e.Symbol = g.symbolPool.new(localName, e.File.StandardImportPath)
	g.enumsByName[e.protoTypeName] = e
	for _, v := range proto.Value {
		e.Values = append(e.Values, g.newEnumValue(v, e))
	}
	return e
}

func (e *Enum) FindValueByNumber(number int32) *EnumValue {
	for _, v := range e.Values {
		if v.Proto.GetNumber() == number {
			return v
		}
	}
	return nil
}

func (e *Enum) FindValueByName(name string) *EnumValue {
	for _, v := range e.Values {
		if v.Proto.GetName() == name {
			return v
		}
	}
	return nil
}

func (e *Enum) String() string {
	return fmt.Sprintf("enum %s", e.TypeName)
}

type EnumValue struct {
	Proto      *descriptorpb.EnumValueDescriptorProto
	Parent     *Enum
	LocalName  string
	Deprecated bool // deprecated with the enum value option "deprecated = true"
	// TODO expose comments
}

func (g *Generator) newEnumValue(proto *descriptorpb.EnumValueDescriptorProto, parent *Enum) *EnumValue {
	v := &EnumValue{
		Proto:      proto,
		Parent:     parent,
		Deprecated: proto.GetOptions().GetDeprecated(),
	}
	v.LocalName = makeEnumValueName(v)
	return v
}

func (v *EnumValue) String() string {
	return fmt.Sprintf("enum value %s.%s", v.Parent.TypeName, v.Proto.GetName())
}

func (v *EnumValue) GetDeclarationString() string {
	d := fmt.Sprintf("%s = %d", v.Proto.GetName(), v.Proto.GetNumber())
	if v.Proto.GetOptions().GetDeprecated() {
		return d + " [deprecated = true]"
	}
	return d
}

type Message struct {
	File              *File
	Proto             *descriptorpb.DescriptorProto
	TypeName          string // fully qualified type name
	Symbol            *Symbol
	Members           []*Member
	Fields            []*Field
	Oneofs            []*Oneof // excluding synthetic oneofs for proto3 optional
	NestedEnums       []*Enum
	NestedMessages    []*Message // excluding synthetic messages like map entries
	NestedExtensions  []*Extension
	Deprecated        bool       // deprecated with the message option "deprecated = true", or implicitly with the file level option
	allNestedMessages []*Message // including synthetic messages like map entries
	allOneofs         []*Oneof   // including synthetic oneofs for proto3 optional
	protoTypeName     string     // fully qualified name with a leading dot
	// TODO expose comments
}

func (g *Generator) newMessage(proto *descriptorpb.DescriptorProto, parentMessageOrFile interface{}) (*Message, error) {
	message := &Message{
		Proto: proto,
	}
	switch p := parentMessageOrFile.(type) {
	case *Message:
		message.protoTypeName = fmt.Sprintf("%s.%s", p.protoTypeName, proto.GetName())
		message.File = p.File
	case *File:
		if p.Proto.GetPackage() != "" {
			message.protoTypeName = fmt.Sprintf(".%s.%s", p.Proto.GetPackage(), proto.GetName())
		} else {
			message.protoTypeName = fmt.Sprintf(".%s", proto.GetName())
		}
		message.File = p
	}
	message.TypeName = strings.TrimPrefix(message.protoTypeName, ".")
	message.Symbol = g.symbolPool.new(makeMessageName(message), message.File.StandardImportPath)
	message.Deprecated = proto.GetOptions().GetDeprecated() || message.File.Deprecated
	g.messagesByName[message.protoTypeName] = message
	for _, d := range proto.GetEnumType() {
		message.NestedEnums = append(message.NestedEnums, g.newEnum(d, message))
	}
	for _, d := range proto.GetNestedType() {
		newMessage, err := g.newMessage(d, message)
		if err != nil {
			return nil, err
		}
		message.allNestedMessages = append(message.allNestedMessages, newMessage)
		if !newMessage.Proto.GetOptions().GetMapEntry() {
			message.NestedMessages = append(message.NestedMessages, newMessage)
		}
	}
	for _, d := range proto.GetOneofDecl() {
		message.allOneofs = append(message.allOneofs, g.newOneof(d, message))
	}
	for _, d := range proto.GetField() {
		newField, err := g.newField(d, message)
		if err != nil {
			return nil, err
		}
		message.Fields = append(message.Fields, newField)
	}
	for _, d := range proto.GetExtension() {
		newExtension, err := g.newExtension(d, message.File, message)
		if err != nil {
			return nil, err
		}
		message.NestedExtensions = append(message.NestedExtensions, newExtension)
	}
	for _, field := range message.Fields {
		if field.Proto.OneofIndex == nil {
			continue
		}
		oneofIndex := field.Proto.GetOneofIndex()
		if oneofIndex < 0 || oneofIndex >= int32(len(message.allOneofs)) {
			return nil, fmt.Errorf("invalid request: oneof declaration index %d specified by %s not found", oneofIndex, field)
		}
		oneof := message.allOneofs[oneofIndex]
		oneof.Fields = append(oneof.Fields, field)
		if !field.Proto.GetProto3Optional() {
			// ignore synthetic oneofs
			field.Oneof = oneof
		}
	}
	for _, oneof := range message.allOneofs {
		if len(oneof.Fields) == 1 && oneof.Fields[0].Proto.GetProto3Optional() {
			// ignore synthetic oneofs
			continue
		}
		message.Oneofs = append(message.Oneofs, oneof)
	}
	return message, nil
}

func (m *Message) String() string {
	return fmt.Sprintf("message %s", strings.TrimPrefix(m.TypeName, "."))
}

func (m *Message) resolveReferences(gen *Generator) error {
	for _, message := range m.allNestedMessages {
		if err := message.resolveReferences(gen); err != nil {
			return err
		}
	}
	for _, extension := range m.NestedExtensions {
		if err := extension.resolveReferences(gen); err != nil {
			return err
		}
	}
	oneofSeen := make(map[*Oneof]bool)
	for _, field := range m.Fields {
		if err := field.resolveReferences(gen); err != nil {
			return err
		}
		if field.Oneof != nil {
			if oneofSeen[field.Oneof] {
				continue
			}
			oneofSeen[field.Oneof] = true
			m.Members = append(m.Members, &Member{
				Kind:  MemberKindOneof,
				Oneof: field.Oneof,
			})
		} else {
			m.Members = append(m.Members, &Member{
				Kind:  MemberKindField,
				Field: field,
			})
		}
	}
	return nil
}

type MemberKind int

const (
	MemberKindField MemberKind = iota
	MemberKindOneof
)

type Member struct {
	Kind  MemberKind
	Field *Field
	Oneof *Oneof
}

type FieldKind int

const (
	FieldKindScalar FieldKind = iota + 1
	FieldKindEnum
	FieldKindMessage
	FieldKindMap
)

type Field struct {
	Proto           *descriptorpb.FieldDescriptorProto
	LocalName       string // name of the property on the message
	JsonName        string // blank if the user did not specify the option json_name
	Parent          *Message
	Oneof           *Oneof // nil if not member of a oneof
	Optional        bool   // whether the field is optional, regardless of syntax
	Deprecated      bool   // deprecated with the field option `[deprecated = true]`
	Repeated        bool   // a true repeated field, i.e. the user specified `repeated ...`
	Packed          bool   // pack this repeated field? true in case of `[packed = true]` and if packed by default because of proto3 semantics
	PackedByDefault bool   // packed by default because of proto3 semantics?
	Kind            FieldKind
	Scalar          descriptorpb.FieldDescriptorProto_Type
	Enum            *Enum    // type for enum fields; nil otherwise
	Message         *Message // type for message or group fields; nil otherwise
	Map             *Map     // type for map fields; nil otherwise

	// TODO expose comments
}

func (g *Generator) newField(desc *descriptorpb.FieldDescriptorProto, parent *Message) (*Field, error) {
	if desc.Extendee != nil {
		return nil, fmt.Errorf("invalid request: regular field must not have a extendee")
	}
	f := &Field{
		Proto:      desc,
		Parent:     parent,
		Deprecated: desc.GetOptions().GetDeprecated(),
	}
	f.LocalName = makeFieldName(desc.GetName(), f.Proto.OneofIndex != nil)
	if protoCamelCase(f.Proto.GetName()) != desc.GetJsonName() {
		f.JsonName = desc.GetJsonName()
	}
	switch f.Parent.File.Syntax {
	case ProtoSyntax3:
		f.Optional = f.Proto.GetProto3Optional()
	case ProtoSyntax2:
		f.Optional = f.Proto.OneofIndex == nil && f.Proto.GetLabel() == descriptorpb.FieldDescriptorProto_LABEL_OPTIONAL
	}
	return f, nil
}

func (f *Field) String() string {
	return fmt.Sprintf("field %s.%s", f.Parent.TypeName, f.Proto.GetName())
}

func (f *Field) GetDeclarationString() string {
	scalarDeclarationString := func(scalarType descriptorpb.FieldDescriptorProto_Type) string {
		return strings.ToLower(strings.TrimPrefix(scalarType.String(), "TYPE_"))
	}
	var labels, options []string
	if f.Repeated {
		labels = append(labels, "repeated")
	}
	if f.Optional {
		labels = append(labels, "optional")
	}
	if f.Parent.File.Syntax == ProtoSyntax2 && f.Proto.GetLabel() == descriptorpb.FieldDescriptorProto_LABEL_REQUIRED {
		labels = append(labels, "required")
	}
	if f.Proto.GetOptions() != nil && f.Proto.GetOptions().Packed != nil {
		switch f.Proto.GetOptions().GetPacked() {
		case true:
			options = append(options, "packed = true")
		case false:
			options = append(options, "packed = false")
		}
	}
	if f.Proto.DefaultValue != nil {
		value := f.Proto.GetDefaultValue()
		switch f.Proto.GetType() {
		case descriptorpb.FieldDescriptorProto_TYPE_STRING, descriptorpb.FieldDescriptorProto_TYPE_BYTES:
			value = `"` + strings.ReplaceAll(value, `"`, `\"`) + `"`
		}
		options = append(options, fmt.Sprintf("default = %s", value))
	}
	if f.JsonName != "" {
		options = append(options, fmt.Sprintf("json_name = %q", f.JsonName))
	}
	if f.Proto.GetOptions().GetDeprecated() {
		options = append(options, "deprecated = true")
	}
	var t string
	switch f.Kind {
	case FieldKindScalar:
		t = scalarDeclarationString(f.Scalar)
	case FieldKindEnum:
		t = strings.TrimPrefix(f.Enum.protoTypeName, ".")
	case FieldKindMessage:
		t = strings.TrimPrefix(f.Message.protoTypeName, ".")
	case FieldKindMap:
		k := scalarDeclarationString(f.Map.Key)
		v := ""
		switch f.Map.ValueKind {
		case FieldKindEnum:
			v = strings.TrimPrefix(f.Map.ValueEnum.protoTypeName, ".")
		case FieldKindMessage:
			v = strings.TrimPrefix(f.Map.ValueMessage.protoTypeName, ".")
		case FieldKindScalar:
			v = scalarDeclarationString(f.Map.ValueScalar)
		}
		t = fmt.Sprintf("map<%s, %s>", k, v)
	}
	var sb strings.Builder
	if len(labels) > 0 {
		sb.WriteString(strings.Join(labels, " "))
		sb.WriteRune(' ')
	}
	sb.WriteString(fmt.Sprintf("%s %s = %d", t, f.Proto.GetName(), f.Proto.GetNumber()))
	if len(options) > 0 {
		sb.WriteString(" [")
		sb.WriteString(strings.Join(options, ", "))
		sb.WriteRune(']')
	}
	return sb.String()
}

func (f *Field) resolveReferences(gen *Generator) error {
	refName := f.Proto.GetTypeName()
	switch f.Proto.GetType() {
	case descriptorpb.FieldDescriptorProto_TYPE_ENUM:
		ref, ok := gen.enumsByName[refName]
		if !ok {
			return fmt.Errorf("invalid request: enum %q specified by %s not found", refName, f)
		}
		f.Enum = ref
		f.Kind = FieldKindEnum
	case descriptorpb.FieldDescriptorProto_TYPE_MESSAGE, descriptorpb.FieldDescriptorProto_TYPE_GROUP:
		ref, ok := gen.messagesByName[refName]
		if !ok {
			return fmt.Errorf("invalid request: message %q specified by %s not found", refName, f)
		}
		if ref.Proto.GetOptions().GetMapEntry() {
			newMap, err := gen.newMap(f)
			if err != nil {
				return err
			}
			f.Map = newMap
			f.Kind = FieldKindMap
		} else {
			f.Message = ref
			f.Kind = FieldKindMessage
		}
	default:
		f.Kind = FieldKindScalar
		f.Scalar = f.Proto.GetType()
	}
	if f.Proto.GetLabel() == descriptorpb.FieldDescriptorProto_LABEL_REPEATED && f.Kind != FieldKindMap {
		f.Repeated = true
		if f.Parent.File.Syntax == ProtoSyntax3 {
			switch f.Proto.GetType() {
			case descriptorpb.FieldDescriptorProto_TYPE_DOUBLE,
				descriptorpb.FieldDescriptorProto_TYPE_FLOAT,
				descriptorpb.FieldDescriptorProto_TYPE_INT64,
				descriptorpb.FieldDescriptorProto_TYPE_UINT64,
				descriptorpb.FieldDescriptorProto_TYPE_INT32,
				descriptorpb.FieldDescriptorProto_TYPE_FIXED64,
				descriptorpb.FieldDescriptorProto_TYPE_FIXED32,
				descriptorpb.FieldDescriptorProto_TYPE_UINT32,
				descriptorpb.FieldDescriptorProto_TYPE_SFIXED32,
				descriptorpb.FieldDescriptorProto_TYPE_SFIXED64,
				descriptorpb.FieldDescriptorProto_TYPE_SINT32,
				descriptorpb.FieldDescriptorProto_TYPE_SINT64,
				descriptorpb.FieldDescriptorProto_TYPE_BOOL,
				descriptorpb.FieldDescriptorProto_TYPE_ENUM:
				// From the proto3 language guide:
				// > In proto3, repeated fields of scalar numeric types are packed by default.
				// This information is incomplete - according to the conformance tests, BOOL
				// and ENUM are packed by default as well. This means only STRING and BYTES
				// are not packed by default, which makes sense because they are length-delimited.
				f.Packed = true
				f.PackedByDefault = true
			}
		}
		if f.Proto.GetOptions() != nil && f.Proto.GetOptions().Packed != nil {
			f.Packed = f.Proto.GetOptions().GetPacked()
		}
	}
	return nil
}

type Map struct {
	Parent       *Field
	Key          descriptorpb.FieldDescriptorProto_Type
	ValueKind    FieldKind
	ValueScalar  descriptorpb.FieldDescriptorProto_Type
	ValueEnum    *Enum
	ValueMessage *Message
}

func (g *Generator) newMap(parent *Field) (*Map, error) {
	refName := parent.Proto.GetTypeName()
	mapEntry, ok := g.messagesByName[refName]
	if !ok {
		return nil, fmt.Errorf("invalid request: map entry %q specified by %s not found", refName, parent)
	}
	if !mapEntry.Proto.GetOptions().GetMapEntry() {
		return nil, fmt.Errorf("invalid request: message %q specified by %s is not a map entry", refName, parent)
	}
	if len(mapEntry.Fields) != 2 {
		return nil, fmt.Errorf("invalid request: map entry %q specified by %s has %d fields", refName, parent, len(mapEntry.Fields))
	}
	var keyField *Field
	var valueField *Field
	for _, f := range mapEntry.Fields {
		switch f.Proto.GetNumber() {
		case 1:
			keyField = f
		case 2:
			valueField = f
		}
	}
	if keyField == nil {
		return nil, fmt.Errorf("invalid request: map entry %q specified by %s is missing key field", refName, parent)
	}
	if keyField.Kind != FieldKindScalar {
		return nil, fmt.Errorf("invalid request: map entry %q specified by %s has unexpected key kind %q", refName, parent, keyField.Kind)
	}
	switch keyField.Proto.GetType() {
	case
		descriptorpb.FieldDescriptorProto_TYPE_INT64,
		descriptorpb.FieldDescriptorProto_TYPE_UINT64,
		descriptorpb.FieldDescriptorProto_TYPE_INT32,
		descriptorpb.FieldDescriptorProto_TYPE_FIXED64,
		descriptorpb.FieldDescriptorProto_TYPE_FIXED32,
		descriptorpb.FieldDescriptorProto_TYPE_BOOL,
		descriptorpb.FieldDescriptorProto_TYPE_STRING,
		descriptorpb.FieldDescriptorProto_TYPE_UINT32,
		descriptorpb.FieldDescriptorProto_TYPE_SFIXED32,
		descriptorpb.FieldDescriptorProto_TYPE_SFIXED64,
		descriptorpb.FieldDescriptorProto_TYPE_SINT32,
		descriptorpb.FieldDescriptorProto_TYPE_SINT64:
	default:
		return nil, fmt.Errorf("invalid request: map entry %q specified by %s has unexpected key type %q", refName, parent, keyField.Proto.GetType())
	}
	if valueField == nil {
		return nil, fmt.Errorf("invalid request: map entry %q specified by %s is missing value field", refName, parent)
	}
	m := &Map{
		Parent:       parent,
		Key:          keyField.Scalar,
		ValueKind:    valueField.Kind,
		ValueScalar:  valueField.Scalar,
		ValueEnum:    valueField.Enum,
		ValueMessage: valueField.Message,
	}
	return m, nil
}

type Oneof struct {
	Proto     *descriptorpb.OneofDescriptorProto
	LocalName string
	Parent    *Message // message in which this oneof is declared
	Fields    []*Field // fields that are part of this oneof
	// TODO expose comments
}

func (g *Generator) newOneof(desc *descriptorpb.OneofDescriptorProto, parent *Message) *Oneof {
	o := &Oneof{
		Proto:  desc,
		Parent: parent,
	}
	o.LocalName = makeOneofName(desc.GetName())
	return o
}

func (o *Oneof) String() string {
	return fmt.Sprintf("oneof %s.%s", o.Parent.TypeName, o.Proto.GetName())
}

type Extension struct {
	// TODO figure out symbol / local name
	Proto      *descriptorpb.FieldDescriptorProto
	File       *File
	Parent     *Message // nil if top-level extension
	Extendee   *Message
	Enum       *Enum    // type for enum fields; nil otherwise
	Message    *Message // type for message or group fields; nil otherwise
	Deprecated bool     // deprecated with the field option "deprecated = true", or implicitly with the file level option
	// TODO expose comments
}

func (g *Generator) newExtension(desc *descriptorpb.FieldDescriptorProto, file *File, parentMessageOrNil *Message) (*Extension, error) {
	if desc.Extendee == nil {
		return nil, fmt.Errorf("invalid request: extension is missing extendee")
	}
	f := &Extension{
		Proto:      desc,
		Parent:     parentMessageOrNil,
		Deprecated: desc.GetOptions().GetDeprecated() || file.Deprecated,
	}
	return f, nil
}

func (e *Extension) String() string {
	return fmt.Sprintf("extension %s.%s",
		strings.TrimPrefix(e.Proto.GetExtendee(), "."),
		e.Proto.GetName(),
	)
}

func (e *Extension) resolveReferences(gen *Generator) error {
	if e.Proto.Extendee != nil {
		typeName := e.Proto.GetExtendee()
		ref, ok := gen.messagesByName[typeName]
		if !ok {
			return fmt.Errorf("invalid request: message %q specified by %s not found", typeName, e)
		}
		e.Extendee = ref
	}
	return nil
}

type Service struct {
	File          *File
	Proto         *descriptorpb.ServiceDescriptorProto
	TypeName      string // fully qualified name
	LocalName     string
	Methods       []*Method
	Deprecated    bool   // deprecated with the service option "deprecated = true", or implicitly with the file level option
	protoTypeName string // fully qualified name with a leading dot

	// TODO expose comments
}

func (g *Generator) newService(proto *descriptorpb.ServiceDescriptorProto, parent *File) *Service {
	s := &Service{
		File:          parent,
		Proto:         proto,
		protoTypeName: fmt.Sprintf("%s.%s", parent.Proto.GetPackage(), proto.GetName()),
		Methods:       nil,
	}
	s.TypeName = strings.TrimPrefix(s.protoTypeName, ".")
	s.Deprecated = proto.GetOptions().GetDeprecated() || s.File.Deprecated
	s.LocalName = makeServiceName(proto.GetName())
	for _, x := range proto.GetMethod() {
		s.Methods = append(s.Methods, g.newMethod(x, s))
	}
	return s
}

func (s *Service) String() string {
	return fmt.Sprintf("service %s", s.TypeName)
}

type Method struct {
	Proto      *descriptorpb.MethodDescriptorProto
	LocalName  string
	Deprecated bool // deprecated with the method option "deprecated = true", or implicitly with the file level option
	Parent     *Service
	Input      *Message
	Output     *Message
	// TODO expose comments
}

func (g *Generator) newMethod(proto *descriptorpb.MethodDescriptorProto, parent *Service) *Method {
	m := &Method{
		Proto:      proto,
		Parent:     parent,
		LocalName:  makeMethodName(proto.GetName()),
		Deprecated: proto.GetOptions().GetDeprecated() || parent.File.Deprecated,
	}
	return m
}

func (m *Method) resolveReferences(gen *Generator) error {
	name := m.Proto.GetInputType()
	ref, ok := gen.messagesByName[name]
	if !ok {
		return fmt.Errorf("invalid request: input type %q specified by %s not found", name, m)
	}
	m.Input = ref
	name = m.Proto.GetOutputType()
	ref, ok = gen.messagesByName[name]
	if !ok {
		return fmt.Errorf("invalid request: output type %q specified by %s not found", name, m)
	}
	m.Output = ref
	return nil
}

func (m *Method) String() string {
	return fmt.Sprintf("rpc %s.%s", m.Parent.TypeName, m.Proto.GetName())
}

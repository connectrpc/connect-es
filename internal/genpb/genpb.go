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

package genpb

import (
	"fmt"
	"strings"

	"github.com/bufbuild/connect-web/internal/protoplugin"
	"github.com/bufbuild/connect-web/internal/ts"
	"google.golang.org/protobuf/types/descriptorpb"
)

func GenerateFile(gen *protoplugin.Generator, file *protoplugin.File) {
	f := gen.NewGeneratedFile(file.Name + "_pb.ts")
	f.ImportPath = file.StandardImportPath
	f.H(file.Preamble)
	for _, enum := range file.Enums {
		generateEnum(f, enum)
		f.P()
	}
	for _, message := range file.Messages {
		generateMessage(f, message)
		f.P()
	}
	// We do not generate anything for services, and we do not support extensions at this time
}

func generateEnum(f *protoplugin.GeneratedFile, enum *protoplugin.Enum) {
	rt := enum.File.RuntimeSymbols
	f.P(enum.JSDoc(""))
	f.P("export enum ", enum.Symbol, " {")
	f.P()
	for _, value := range enum.Values {
		f.P(value.JSDoc("    "))
		f.P("    ", value.LocalName, " = ", value.Proto.GetNumber(), ",")
		f.P()
	}
	f.P("}")
	f.P()
	switch enum.File.Syntax {
	case protoplugin.ProtoSyntax2:
		f.P("// Retrieve enum metadata with: proto2.getEnumType(", enum.Symbol, ")")
	case protoplugin.ProtoSyntax3:
		f.P("// Retrieve enum metadata with: proto3.getEnumType(", enum.Symbol, ")")
	}
	f.P(rt.ProtoN, `.util.setEnumType(`, enum.Symbol, `, "`, enum.TypeName, `", [`)
	for _, value := range enum.Values {
		f.P("    {no: ", value.Proto.GetNumber(), ", name: \"", value.Proto.GetName(), "\"},")
	}
	f.P("]);")
}

func generateMessage(f *protoplugin.GeneratedFile, message *protoplugin.Message) {
	rt := message.File.RuntimeSymbols
	f.P(message.JSDoc(""))
	f.P("export class ", message.Symbol, " extends ", rt.Message, "<", message.Symbol, "> {")
	f.P()
	for _, member := range message.Members {
		switch member.Kind {
		case protoplugin.MemberKindOneof:
			generateOneof(f, member.Oneof)
		case protoplugin.MemberKindField:
			generateField(f, member.Field)
		}
		f.P()
	}
	f.P("    constructor(data?: ", rt.PartialMessage, "<", message.Symbol, ">) {")
	f.P("        super();")
	f.P("        ", rt.ProtoN, ".util.initPartial(data, this);")
	f.P("    }")
	f.P()
	GenWktMethods(f, message)
	f.P("    static readonly runtime = ", rt.ProtoN, ";")
	f.P("    static readonly typeName = \"", message.TypeName, "\";")
	f.P("    static readonly fields: ", rt.FieldList, " = ", rt.ProtoN, ".util.newFieldList(() => [")
	for _, field := range message.Fields {
		generateFieldInfo(f, field)
	}
	f.P("    ]);")
	// In case we start supporting options, we have to surface them here
	//f.P("    static readonly options: { readonly [extensionName: string]: ", rt.JsonValue, " } = {};")
	f.P()
	GenWktStaticMethods(f, message)
	f.P("    static fromBinary(bytes: Uint8Array, options?: Partial<", rt.BinaryReadOptions, ">): ", message.Symbol, " {")
	f.P("        return new ", message.Symbol, "().fromBinary(bytes, options);")
	f.P("    }")
	f.P()
	f.P("    static fromJson(jsonValue: ", rt.JsonValue, ", options?: Partial<", rt.JsonReadOptions, ">): ", message.Symbol, " {")
	f.P("        return new ", message.Symbol, "().fromJson(jsonValue, options);")
	f.P("    }")
	f.P()
	f.P("    static fromJsonString(jsonString: string, options?: Partial<", rt.JsonReadOptions, ">): ", message.Symbol, " {")
	f.P("        return new ", message.Symbol, "().fromJsonString(jsonString, options);")
	f.P("    }")
	f.P()
	f.P("    static equals(a: ", message.Symbol, " | ", rt.PlainMessage, "<", message.Symbol, "> | undefined, b: ", message.Symbol, " | ", rt.PlainMessage, "<", message.Symbol, "> | undefined): boolean {")
	f.P("        return ", rt.ProtoN, ".util.equals(", message.Symbol, ", a, b);")
	f.P("    }")
	f.P()
	f.P("}")
	f.P()
	for _, nestedEnum := range message.NestedEnums {
		generateEnum(f, nestedEnum)
		f.P()
	}
	for _, nestedMessage := range message.NestedMessages {
		generateMessage(f, nestedMessage)
		f.P()
	}
	// We do not support extensions at this time
}

func generateFieldInfo(f *protoplugin.GeneratedFile, field *protoplugin.Field) {
	rt := field.Parent.File.RuntimeSymbols

	e := make([]interface{}, 0)
	e = append(e, "        {no: ", field.Proto.GetNumber(), `, name: "`, field.Proto.GetName(), `", `)

	if field.JSONName != "" {
		e = append(e, `jsonName: "`, field.JSONName, `", `)
	}

	switch field.Kind {
	case protoplugin.FieldKindScalar:
		t := strings.TrimPrefix(field.Scalar.String(), "TYPE_")
		e = append(e, `kind: "scalar", T: `, int32(field.Scalar), ` /* ScalarType.`, t, ` */, `)

	case protoplugin.FieldKindMap:
		t := strings.TrimPrefix(field.Map.Key.String(), "TYPE_")
		e = append(e, `kind: "map", K: `, int32(field.Map.Key), ` /* ScalarType.`, t, ` */, `)
		switch field.Map.ValueKind {
		case protoplugin.FieldKindScalar:
			t := strings.TrimPrefix(field.Scalar.String(), "TYPE_")
			e = append(e, `V: {kind: "scalar", T: `, int32(field.Map.ValueScalar), ` /* ScalarType.`, t, ` */}, `)
		case protoplugin.FieldKindMessage:
			e = append(e, `V: {kind: "message", T: `, field.Map.ValueMessage.Symbol, `}, `)
		case protoplugin.FieldKindEnum:
			e = append(e, `V: {kind: "enum", T: `, rt.ProtoN, `.getEnumType(`, field.Map.ValueEnum.Symbol, `)}, `)
		}

	case protoplugin.FieldKindMessage:
		e = append(e, `kind: "message", T: `, field.Message.Symbol, `, `)

	case protoplugin.FieldKindEnum:
		e = append(e, `kind: "enum", T: `, rt.ProtoN, `.getEnumType(`, field.Enum.Symbol, `), `)
	}

	if field.Repeated {
		e = append(e, `repeated: true, `)
		if field.Packed != field.PackedByDefault {
			e = append(e, `packed: `, field.Packed, `, `)
		}
	}

	if field.Optional {
		e = append(e, `opt: true, `)
	}

	if expr, _ := getFieldExplicitDefaultValue(field); expr != nil {
		e = append(e, `default: `, expr, `, `)
	}

	if field.Oneof != nil {
		e = append(e, `oneof: "`, field.Oneof.Proto.GetName(), `", `)
	}

	if l, ok := e[len(e)-1].(string); ok && strings.HasSuffix(l, ", ") {
		e = append(e[:len(e)-1], strings.TrimSuffix(l, ", ")) // remove trailing ", "
	}
	e = append(e, "},")
	f.P(e...)
}

func generateOneof(f *protoplugin.GeneratedFile, oneof *protoplugin.Oneof) {
	f.P(oneof.JSDoc("    "))
	f.P("    ", oneof.LocalName, ": {")
	for i, field := range oneof.Fields {
		if i > 0 {
			f.P(`    } | {`)
		}
		f.P(field.JSDoc("        "))
		t, _ := getFieldTyping(field)
		f.P(`        value: `, t, `;`)
		f.P(`        case: "`, field.LocalName, `";`)
	}
	f.P(`    } | { case: undefined; value?: undefined } = { case: undefined };`)
}

func generateField(f *protoplugin.GeneratedFile, field *protoplugin.Field) {
	f.P(field.JSDoc("    "))
	var expr []interface{}
	expr = append(expr, "    ", field.LocalName)
	defaultValue, typingInferrable := getFieldIntrinsicDefaultValue(field)
	typing, optional := getFieldTyping(field)
	if optional || defaultValue == nil {
		expr = append(expr, "?: ", typing)
	} else if !typingInferrable {
		expr = append(expr, ": ", typing)
	}
	if defaultValue != nil {
		expr = append(expr, " = ", defaultValue)
	}
	expr = append(expr, ";")
	f.P(expr...)
}

func getFieldTyping(field *protoplugin.Field) (expr []interface{}, optional bool) {
	switch field.Kind {
	case protoplugin.FieldKindScalar:
		expr = append(expr, ts.ScalarTypeScriptType(field.Scalar))
		optional = field.Optional

	case protoplugin.FieldKindMessage:
		if unwrapped, ok := GetUnwrappedFieldType(field); ok {
			expr = append(expr, ts.ScalarTypeScriptType(unwrapped))
		} else {
			expr = append(expr, field.Message.Symbol.ToTypeOnly())
		}
		optional = true

	case protoplugin.FieldKindEnum:
		expr = append(expr, field.Enum.Symbol.ToTypeOnly())
		optional = field.Optional

	case protoplugin.FieldKindMap:
		var keyType string
		switch field.Map.Key {
		case
			descriptorpb.FieldDescriptorProto_TYPE_INT32,
			descriptorpb.FieldDescriptorProto_TYPE_FIXED32,
			descriptorpb.FieldDescriptorProto_TYPE_UINT32,
			descriptorpb.FieldDescriptorProto_TYPE_SFIXED32,
			descriptorpb.FieldDescriptorProto_TYPE_SINT32:
			keyType = "number"
		default:
			keyType = "string"
		}
		var valueType interface{}
		switch field.Map.ValueKind {
		case protoplugin.FieldKindScalar:
			valueType = ts.ScalarTypeScriptType(field.Map.ValueScalar)
		case protoplugin.FieldKindMessage:
			valueType = field.Map.ValueMessage.Symbol.ToTypeOnly()
		case protoplugin.FieldKindEnum:
			valueType = field.Map.ValueEnum.Symbol.ToTypeOnly()
		}
		expr = append(expr, "{ [key: ", keyType, "]: ", valueType, " }")
		optional = false
	}

	if field.Repeated {
		expr = append(expr, "[]")
		optional = false
	}

	return expr, optional
}

// getFieldExplicitDefaultValue returns an expression for the default value
// specified via `[ default = 123 ]`, and a bool that indicates whether the
// TypeScript type of the value can be trivially inferred from the value.
// If the field has no explicit default value, the expression is nil.
func getFieldExplicitDefaultValue(field *protoplugin.Field) (expr []interface{}, typingInferrable bool) {
	rt := field.Parent.File.RuntimeSymbols
	if field.Parent.File.Syntax != protoplugin.ProtoSyntax2 {
		return nil, false
	}
	value := field.Proto.GetDefaultValue()
	if value == "" {
		return nil, true
	}
	switch field.Kind {
	case protoplugin.FieldKindEnum:
		enumValue := field.Enum.FindValueByName(field.Proto.GetDefaultValue())
		expr = append(expr, field.Enum.Symbol, ".", enumValue.LocalName)
		return expr, true
	case protoplugin.FieldKindScalar:
		switch field.Scalar {
		case descriptorpb.FieldDescriptorProto_TYPE_STRING:
			expr = append(expr, `"`+strings.ReplaceAll(value, `"`, `\"`)+`"`)
		case descriptorpb.FieldDescriptorProto_TYPE_BYTES:
			bytes, err := unescapeBytesDefaultValue(value)
			if err != nil {
				return nil, false
			}
			expr = append(expr, "new Uint8Array([")
			for _, b := range bytes {
				expr = append(expr, fmt.Sprintf("0x%02X, ", b))
			}
			expr = append(expr, "])")
		case
			descriptorpb.FieldDescriptorProto_TYPE_INT64,
			descriptorpb.FieldDescriptorProto_TYPE_SFIXED64,
			descriptorpb.FieldDescriptorProto_TYPE_SINT64:
			str := `"` + strings.ReplaceAll(value, `"`, `\"`) + `"`
			expr = append(expr, rt.ProtoInt64, ".parse(", str, ")")
		case descriptorpb.FieldDescriptorProto_TYPE_UINT64,
			descriptorpb.FieldDescriptorProto_TYPE_FIXED64:
			str := `"` + strings.ReplaceAll(value, `"`, `\"`) + `"`
			expr = append(expr, rt.ProtoInt64, ".uParse(", str, ")")
		case descriptorpb.FieldDescriptorProto_TYPE_DOUBLE,
			descriptorpb.FieldDescriptorProto_TYPE_FLOAT:
			switch value {
			case "inf":
				expr = append(expr, "globalThis.Number.POSITIVE_INFINITY")
			case "-inf":
				expr = append(expr, "globalThis.Number.NEGATIVE_INFINITY")
			case "nan":
				expr = append(expr, "globalThis.Number.NaN")
			default:
				expr = append(expr, value)
			}
		case descriptorpb.FieldDescriptorProto_TYPE_INT32,
			descriptorpb.FieldDescriptorProto_TYPE_UINT32,
			descriptorpb.FieldDescriptorProto_TYPE_SINT32,
			descriptorpb.FieldDescriptorProto_TYPE_FIXED32,
			descriptorpb.FieldDescriptorProto_TYPE_SFIXED32:
			expr = append(expr, value)
		case descriptorpb.FieldDescriptorProto_TYPE_BOOL:
			switch value {
			case "true", "false":
				expr = append(expr, value)
			}
		}
		return expr, true
	}
	return nil, false
}

// getFieldIntrinsicDefaultValue returns an expression for the intrinsic
// default value for a field, and a bool that indicates whether the
// TypeScript type of the value can be trivially inferred from the value.
// If the field has no intrinsic default value, the expression is nil.
func getFieldIntrinsicDefaultValue(field *protoplugin.Field) (expr []interface{}, typingInferrable bool) {
	rt := field.Parent.File.RuntimeSymbols
	if field.Repeated {
		expr = append(expr, "[]")
		return expr, false
	}
	if field.Kind == protoplugin.FieldKindMap {
		expr = append(expr, "{}")
		return expr, false
	}
	if field.Parent.File.Syntax != protoplugin.ProtoSyntax3 {
		return nil, false
	}
	switch field.Kind {
	case protoplugin.FieldKindEnum:
		if !field.Optional {
			enumValue := field.Enum.FindValueByNumber(0)
			expr = append(expr, field.Enum.Symbol, ".", enumValue.LocalName)
			return expr, true
		}
	case protoplugin.FieldKindScalar:
		if !field.Optional {
			switch field.Scalar {
			case descriptorpb.FieldDescriptorProto_TYPE_STRING:
				expr = append(expr, `""`)
			case descriptorpb.FieldDescriptorProto_TYPE_BOOL:
				expr = append(expr, false)
			case
				descriptorpb.FieldDescriptorProto_TYPE_UINT64,
				descriptorpb.FieldDescriptorProto_TYPE_SFIXED64,
				descriptorpb.FieldDescriptorProto_TYPE_FIXED64,
				descriptorpb.FieldDescriptorProto_TYPE_SINT64,
				descriptorpb.FieldDescriptorProto_TYPE_INT64:
				expr = append(expr, rt.ProtoInt64, ".zero")
			case descriptorpb.FieldDescriptorProto_TYPE_BYTES:
				expr = append(expr, "new Uint8Array(0)")
			default:
				expr = append(expr, "0")
			}
			return expr, true
		}
	}
	return nil, false
}

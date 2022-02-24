package pb_generator

import (
	"errors"
	"fmt"
	protoplugin2 "github.com/bufbuild/connect-web/internal/protoplugin"
	"google.golang.org/protobuf/types/descriptorpb"
)

type wktStruct struct {
	typeName      string
	fieldNoFields int32
}

func (g wktStruct) matches(message *protoplugin2.Message) bool {
	_, err := g.getFields(message)
	return err == nil
}

func (g wktStruct) getFields(message *protoplugin2.Message) (fieldFields *protoplugin2.Field, err error) {
	if message.TypeName != g.typeName {
		return nil, errors.New("type name")
	}
	if message.File.Syntax != protoplugin2.ProtoSyntax3 {
		return nil, errors.New("syntax")
	}
	for _, f := range message.Fields {
		switch f.Proto.GetNumber() {
		case g.fieldNoFields:
			fieldFields = f
		}
	}
	if fieldFields == nil {
		return nil, fmt.Errorf("missing field %d", g.fieldNoFields)
	}
	if fieldFields.Kind != protoplugin2.FieldKindMap {
		return nil, fmt.Errorf("wrong field kind")
	}
	if fieldFields.Map.Key != descriptorpb.FieldDescriptorProto_TYPE_STRING {
		return nil, fmt.Errorf("wrong map key type")
	}
	if fieldFields.Map.ValueKind != protoplugin2.FieldKindMessage {
		return nil, fmt.Errorf("wrong map value kind")
	}
	return
}

func (g wktStruct) genWktMethods(f *protoplugin2.GeneratedFile, message *protoplugin2.Message) {
	rt := message.File.RuntimeSymbols
	fieldFields, err := g.getFields(message)
	if err != nil {
		return
	}
	valueMessage := fieldFields.Map.ValueMessage
	f.P("    override toJson(options?: Partial<", rt.JsonWriteOptions, ">): ", rt.JsonValue, " {")
	f.P("        const json: ", rt.JsonObject, " = {}")
	f.P("        for (const [k, v] of Object.entries(this.", fieldFields.LocalName, ")) {")
	f.P("            json[k] = v.toJson(options);")
	f.P("        }")
	f.P("        return json;")
	f.P("    }")
	f.P()
	f.P("    override fromJson(json: ", rt.JsonValue, ", options?: Partial<", rt.JsonReadOptions, ">): this {")
	f.P(`        if (typeof json != "object" || json == null || Array.isArray(json)) {`)
	f.P(`            throw new Error("cannot decode `, message.TypeName, ` from JSON " + `, rt.ProtoN, `.json.debug(json));`)
	f.P("        }")
	f.P("        for (const [k, v] of Object.entries(json)) {")
	f.P("            this.", fieldFields.LocalName, "[k] = ", valueMessage.Symbol, ".fromJson(v);")
	f.P("        }")
	f.P("        return this;")
	f.P("    }")
	f.P()
}

func (g wktStruct) genWktStaticMethods(f *protoplugin2.GeneratedFile, message *protoplugin2.Message) {
}

type wktValue struct {
	typeName             string
	fieldNoNullValue     int32
	fieldTypeNullValue   descriptorpb.FieldDescriptorProto_Type
	fieldNoNumberValue   int32
	fieldTypeNumberValue descriptorpb.FieldDescriptorProto_Type
	fieldNoStringValue   int32
	fieldTypeStringValue descriptorpb.FieldDescriptorProto_Type
	fieldNoBoolValue     int32
	fieldTypeBoolValue   descriptorpb.FieldDescriptorProto_Type
	fieldNoStructValue   int32
	fieldTypeStructValue descriptorpb.FieldDescriptorProto_Type
	fieldNoListValue     int32
	fieldTypeListValue   descriptorpb.FieldDescriptorProto_Type
}

func (g wktValue) matches(message *protoplugin2.Message) bool {
	_, _, _, _, _, _, err := g.getFields(message)
	return err == nil
}

func (g wktValue) getFields(message *protoplugin2.Message) (
	fieldNullValue *protoplugin2.Field,
	fieldNumberValue *protoplugin2.Field,
	fieldStringValue *protoplugin2.Field,
	fieldBoolValue *protoplugin2.Field,
	fieldStructValue *protoplugin2.Field,
	fieldListValue *protoplugin2.Field,
	err error) {
	if message.TypeName != g.typeName {
		return nil, nil, nil, nil, nil, nil, errors.New("type name")
	}
	if message.File.Syntax != protoplugin2.ProtoSyntax3 {
		return nil, nil, nil, nil, nil, nil, errors.New("syntax")
	}
	for _, f := range message.Fields {
		switch f.Proto.GetNumber() {
		case g.fieldNoNullValue:
			fieldNullValue = f
		case g.fieldNoNumberValue:
			fieldNumberValue = f
		case g.fieldNoStringValue:
			fieldStringValue = f
		case g.fieldNoBoolValue:
			fieldBoolValue = f
		case g.fieldNoStructValue:
			fieldStructValue = f
		case g.fieldNoListValue:
			fieldListValue = f
		}
	}
	if len(message.Oneofs) != 1 {
		return nil, nil, nil, nil, nil, nil, errors.New("missing oneof")
	}
	if fieldNullValue == nil {
		return nil, nil, nil, nil, nil, nil, fmt.Errorf("missing field %d", g.fieldNoNullValue)
	}
	if fieldNumberValue == nil {
		return nil, nil, nil, nil, nil, nil, fmt.Errorf("missing field %d", g.fieldNoNumberValue)
	}
	if fieldStringValue == nil {
		return nil, nil, nil, nil, nil, nil, fmt.Errorf("missing field %d", g.fieldNoStringValue)
	}
	if fieldBoolValue == nil {
		return nil, nil, nil, nil, nil, nil, fmt.Errorf("missing field %d", g.fieldNoBoolValue)
	}
	if fieldStructValue == nil {
		return nil, nil, nil, nil, nil, nil, fmt.Errorf("missing field %d", g.fieldNoStructValue)
	}
	if fieldListValue == nil {
		return nil, nil, nil, nil, nil, nil, fmt.Errorf("missing field %d", g.fieldNoListValue)
	}
	if fieldNullValue.Proto.GetType() != g.fieldTypeNullValue {
		return nil, nil, nil, nil, nil, nil, fmt.Errorf("want field %d type %q, got %q", g.fieldNoNullValue, g.fieldTypeNullValue, fieldNullValue.Proto.GetType())
	}
	if len(fieldNullValue.Enum.Values) != 1 {
		return nil, nil, nil, nil, nil, nil, errors.New("enum NullValue value count")
	}
	if fieldNumberValue.Proto.GetType() != g.fieldTypeNumberValue {
		return nil, nil, nil, nil, nil, nil, fmt.Errorf("want field %d type %q, got %q", g.fieldNoNumberValue, g.fieldTypeNumberValue, fieldNumberValue.Proto.GetType())
	}
	if fieldStringValue.Proto.GetType() != g.fieldTypeStringValue {
		return nil, nil, nil, nil, nil, nil, fmt.Errorf("want field %d type %q, got %q", g.fieldNoStringValue, g.fieldTypeStringValue, fieldStringValue.Proto.GetType())
	}
	if fieldBoolValue.Proto.GetType() != g.fieldTypeBoolValue {
		return nil, nil, nil, nil, nil, nil, fmt.Errorf("want field %d type %q, got %q", g.fieldNoBoolValue, g.fieldTypeBoolValue, fieldBoolValue.Proto.GetType())
	}
	if fieldStructValue.Proto.GetType() != g.fieldTypeStructValue {
		return nil, nil, nil, nil, nil, nil, fmt.Errorf("want field %d type %q, got %q", g.fieldNoStructValue, g.fieldTypeStructValue, fieldStructValue.Proto.GetType())
	}
	if fieldListValue.Proto.GetType() != g.fieldTypeListValue {
		return nil, nil, nil, nil, nil, nil, fmt.Errorf("want field %d type %q, got %q", g.fieldNoListValue, g.fieldTypeListValue, fieldListValue.Proto.GetType())
	}
	return
}

func (g wktValue) genWktMethods(f *protoplugin2.GeneratedFile, message *protoplugin2.Message) {
	rt := message.File.RuntimeSymbols
	fieldNullValue, fieldNumberValue, fieldStringValue, fieldBoolValue, fieldStructValue, fieldListValue, err := g.getFields(message)
	if err != nil {
		return
	}
	oneofKind := message.Oneofs[0]
	f.P("    override toJson(options?: Partial<", rt.JsonWriteOptions, ">): ", rt.JsonValue, " {")
	f.P("        switch (this.", oneofKind.LocalName, ".case) {")
	f.P(`            case "`, fieldNullValue.LocalName, `":`)
	f.P("                return null;")
	f.P(`            case "`, fieldBoolValue.LocalName, `":`)
	f.P(`            case "`, fieldNumberValue.LocalName, `":`)
	f.P(`            case "`, fieldStringValue.LocalName, `":`)
	f.P("                return this.", oneofKind.LocalName, ".value;")
	f.P(`            case "`, fieldStructValue.LocalName, `":`)
	f.P(`            case "`, fieldListValue.LocalName, `":`)
	f.P(`                return this.`, oneofKind.LocalName, `.value.toJson({...options, emitDefaultValues: true});`)
	f.P("        }")
	f.P(`        throw new Error("`, message.TypeName, ` must have a value");`)
	f.P("    }")
	f.P()
	f.P("    override fromJson(json: JsonValue, options?: Partial<", rt.JsonReadOptions, ">): this {")
	f.P("        switch (typeof json) {")
	f.P(`            case "number":`)
	f.P(`                this.kind = { case: "`, fieldNumberValue.LocalName, `", value: json };`)
	f.P("                break;")
	f.P(`            case "string":`)
	f.P(`                this.kind = { case: "`, fieldStringValue.LocalName, `", value: json };`)
	f.P("                break;")
	f.P(`            case "boolean":`)
	f.P(`                this.kind = { case: "`, fieldBoolValue.LocalName, `", value: json };`)
	f.P("                break;")
	f.P(`            case "object":`)
	f.P("                if (json === null) {")
	f.P(`                    this.kind = { case: "`, fieldNullValue.LocalName, `", value: `, fieldNullValue.Enum.Symbol, `.`, fieldNullValue.Enum.Values[0].LocalName, ` };`)
	f.P("                } else if (Array.isArray(json)) {")
	f.P(`                    this.kind = { case: "`, fieldListValue.LocalName, `", value: `, fieldListValue.Message.Symbol, `.fromJson(json) };`)
	f.P("                } else {")
	f.P(`                    this.kind = { case: "`, fieldStructValue.LocalName, `", value: `, fieldStructValue.Message.Symbol, `.fromJson(json) };`)
	f.P("                }")
	f.P("                break;")
	f.P("            default:")
	f.P(`                throw new Error("cannot decode `, message.TypeName, ` from JSON " + `, rt.ProtoN, `.json.debug(json));`)
	f.P("        }")
	f.P("        return this;")
	f.P("    }")
	f.P()
}

func (g wktValue) genWktStaticMethods(f *protoplugin2.GeneratedFile, message *protoplugin2.Message) {
}

type wktListValue struct {
	typeName string
}

func (g wktListValue) matches(message *protoplugin2.Message) bool {
	_, err := g.getFields(message)
	return err == nil
}

func (g wktListValue) getFields(message *protoplugin2.Message) (*protoplugin2.Field, error) {
	if message.TypeName != g.typeName {
		return nil, errors.New("type name")
	}
	if message.File.Syntax != protoplugin2.ProtoSyntax3 {
		return nil, errors.New("syntax")
	}
	var fieldValues *protoplugin2.Field
	for _, f := range message.Fields {
		switch f.Proto.GetNumber() {
		case 1:
			fieldValues = f
		}
	}
	if fieldValues == nil {
		return nil, errors.New("missing field")
	}
	if fieldValues.Kind != protoplugin2.FieldKindMessage {
		return nil, fmt.Errorf("wrong field kind")
	}
	return fieldValues, nil
}

func (g wktListValue) genWktMethods(f *protoplugin2.GeneratedFile, message *protoplugin2.Message) {
	rt := message.File.RuntimeSymbols
	fieldValues, err := g.getFields(message)
	if err != nil {
		return
	}
	f.P(`    override toJson(options?: Partial<`, rt.JsonWriteOptions, `>): `, rt.JsonValue, ` {`)
	f.P(`        return this.`, fieldValues.LocalName, `.map(v => v.toJson());`)
	f.P(`    }`)
	f.P()
	f.P(`    override fromJson(json: `, rt.JsonValue, `, options?: Partial<`, rt.JsonReadOptions, `>): this {`)
	f.P(`        if (!Array.isArray(json)) {`)
	f.P(`            throw new Error("cannot decode `, message.TypeName, ` from JSON " + `, rt.ProtoN, `.json.debug(json));`)
	f.P(`        }`)
	f.P(`        for (let e of json) {`)
	f.P(`            this.`, fieldValues.LocalName, `.push(`, fieldValues.Message.Symbol, `.fromJson(e));`)
	f.P(`        }`)
	f.P(`        return this;`)
	f.P(`    }`)
	f.P()
}

func (g wktListValue) genWktStaticMethods(f *protoplugin2.GeneratedFile, message *protoplugin2.Message) {
}

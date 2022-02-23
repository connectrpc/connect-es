package pb_generator

import (
	"errors"
	"fmt"
	protoplugin2 "github.com/bufconnect/connect-web/internal/protoplugin"
	"github.com/bufconnect/connect-web/internal/ts"
	"strings"
)

type wktWrappers struct {
	fieldCount   int
	fieldNoValue int32
	typeNames    []string
}

func (g wktWrappers) matches(message *protoplugin2.Message) bool {
	_, err := g.getFields(message)
	return err == nil
}

func (g wktWrappers) getFields(message *protoplugin2.Message) (value *protoplugin2.Field, err error) {
	var ok = false
	for _, tn := range g.typeNames {
		if tn == message.TypeName {
			ok = true
			break
		}
	}
	if !ok {
		return nil, errors.New("type name")
	}
	if message.File.Syntax != protoplugin2.ProtoSyntax3 {
		return nil, errors.New("syntax")
	}
	if len(message.Fields) != g.fieldCount {
		return nil, errors.New("field count")
	}
	for _, f := range message.Fields {
		switch f.Proto.GetNumber() {
		case g.fieldNoValue:
			value = f
		}
	}
	if value == nil {
		return nil, fmt.Errorf("missing field %d", g.fieldNoValue)
	}
	return value, nil
}

func (g wktWrappers) genWktMethods(f *protoplugin2.GeneratedFile, message *protoplugin2.Message) {
	rt := message.File.RuntimeSymbols
	valueField, _ := g.getFields(message)
	t := strings.TrimPrefix(valueField.Scalar.String(), "TYPE_")
	f.P("    override toJson(options?: Partial<", rt.JsonWriteOptions, ">): ", rt.JsonValue, " {")
	f.P("        return proto3.json.writeScalar(", rt.ScalarType, ".", t, ", this.value, true)!;")
	f.P("    }")
	f.P()
	f.P("    override fromJson(json: ", rt.JsonValue, ", options?: Partial<", rt.JsonReadOptions, ">): this {")
	f.P("        try {")
	f.P("            this.value = ", rt.ProtoN, ".json.readScalar(", rt.ScalarType, ".", t, ", json);")
	f.P("        } catch (e) {")
	f.P("            let m = `cannot decode message ", message.TypeName, " from JSON\"`;")
	f.P("            if (e instanceof Error && e.message.length > 0) {")
	f.P("                m += `: ${e.message}`")
	f.P("            }")
	f.P("            throw new Error(m);")
	f.P("        }")
	f.P("        return this;")
	f.P("    }")
	f.P()
}

func (g wktWrappers) genWktStaticMethods(f *protoplugin2.GeneratedFile, message *protoplugin2.Message) {
	valueField, _ := g.getFields(message)
	t := ts.ScalarTypeScriptType(message.Fields[0].Scalar)
	f.P("    static readonly fieldWrapper = {")
	f.P("        wrapField(value: ", t, " | ", message.Symbol, "): ", message.Symbol, " {")
	f.P("            return value instanceof ", message.Symbol, " ? value : new ", message.Symbol, "({value});")
	f.P("        },")
	f.P("        unwrapField(value: ", message.Symbol, "): ", t, " {")
	f.P("            return value.", valueField.LocalName, ";")
	f.P("        }")
	f.P("    };")
	f.P()
}

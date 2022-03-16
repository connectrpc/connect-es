// Copyright 2020-2022 Buf Technologies, Inc.
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
	"errors"
	"fmt"
	"strings"

	"github.com/bufbuild/connect-web/internal/protoplugin"
	"github.com/bufbuild/connect-web/internal/ts"
)

type wktWrappers struct {
	fieldCount   int
	fieldNoValue int32
	typeNames    []string
}

func (g wktWrappers) matches(message *protoplugin.Message) bool {
	_, err := g.getFields(message)
	return err == nil
}

func (g wktWrappers) getFields(message *protoplugin.Message) (value *protoplugin.Field, err error) {
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
	if message.File.Syntax != protoplugin.ProtoSyntax3 {
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

func (g wktWrappers) genWktMethods(f *protoplugin.GeneratedFile, message *protoplugin.Message) {
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

func (g wktWrappers) genWktStaticMethods(f *protoplugin.GeneratedFile, message *protoplugin.Message) {
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

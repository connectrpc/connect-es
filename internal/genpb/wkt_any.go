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
	"errors"
	"fmt"

	"github.com/bufbuild/connect-web/internal/protoplugin"
	"google.golang.org/protobuf/types/descriptorpb"
)

type wktAny struct {
	typeName         string
	fieldCount       int
	fieldNoTypeURL   int32
	fieldNoValue     int32
	fieldTypeTypeURL descriptorpb.FieldDescriptorProto_Type
	fieldTypeValue   descriptorpb.FieldDescriptorProto_Type
}

func (g wktAny) matches(message *protoplugin.Message) bool {
	_, _, err := g.getFields(message)
	return err == nil
}

func (g wktAny) getFields(message *protoplugin.Message) (typeURL *protoplugin.Field, value *protoplugin.Field, err error) {
	if message.TypeName != g.typeName {
		return nil, nil, errors.New("type name")
	}
	if message.File.Syntax != protoplugin.ProtoSyntax3 {
		return nil, nil, errors.New("syntax")
	}
	if len(message.Fields) != g.fieldCount {
		return nil, nil, errors.New("field count")
	}
	for _, f := range message.Fields {
		switch f.Proto.GetNumber() {
		case g.fieldNoTypeURL:
			typeURL = f
		case g.fieldNoValue:
			value = f
		}
	}
	if typeURL == nil {
		return nil, nil, fmt.Errorf("missing field %d", g.fieldNoTypeURL)
	}
	if value == nil {
		return nil, nil, fmt.Errorf("missing field %d", g.fieldNoValue)
	}
	if typeURL.Proto.GetType() != g.fieldTypeTypeURL {
		return nil, nil, fmt.Errorf("want field %d type %s, got %s", g.fieldNoTypeURL, g.fieldTypeTypeURL, typeURL.Proto.GetType())
	}
	if value.Proto.GetType() != g.fieldTypeValue {
		return nil, nil, fmt.Errorf("want field %d type %s, got %s", g.fieldNoValue, g.fieldTypeValue, value.Proto.GetType())
	}
	return typeURL, value, nil
}

func (g wktAny) genWktMethods(f *protoplugin.GeneratedFile, message *protoplugin.Message) {
	rt := message.File.RuntimeSymbols
	typeURL, value, _ := g.getFields(message)
	f.P("    override toJson(options?: Partial<", rt.JsonWriteOptions, ">): ", rt.JsonValue, " {")
	f.P(`        if (this.`, typeURL.LocalName, ` === "") {`)
	f.P("            return {};")
	f.P("        }")
	f.P("        const typeName = this.typeUrlToName(this.", typeURL.LocalName, ");")
	f.P("        const messageType = options?.typeRegistry?.findMessage(typeName);")
	f.P("        if (!messageType) {")
	f.P("            throw new Error(`cannot encode message ", message.TypeName, " to JSON: \"${this.", typeURL.LocalName, "}\" is not in the type registry`);")
	f.P("        }")
	f.P("        const message = messageType.fromBinary(this.", value.LocalName, ");")
	f.P("        let json = message.toJson(options);")
	f.P(`        if (typeName.startsWith("google.protobuf.") || (json === null || Array.isArray(json) || typeof json !== "object")) {`)
	f.P("            json = {value: json};")
	f.P("        }")
	f.P(`        json["@type"] = this.`, typeURL.LocalName, `;`)
	f.P("        return json;")
	f.P("    }")
	f.P()
	f.P("    override fromJson(json: ", rt.JsonValue, ", options?: Partial<", rt.JsonReadOptions, ">): this {")
	f.P(`        if (json === null || Array.isArray(json) || typeof json != "object") {`)
	f.P("            throw new Error(`cannot decode message ", message.TypeName, " from JSON: expected object but got ${json === null ? \"null\" : Array.isArray(json) ? \"array\" : typeof json}`);")
	f.P("        }")
	f.P(`        const typeUrl = json["@type"];`)
	f.P(`        if (typeof typeUrl != "string" || typeUrl == "") {`)
	f.P("            throw new Error(`cannot decode message ", message.TypeName, " from JSON: \"@type\" is empty`);")
	f.P("        }")
	f.P("        const typeName = this.typeUrlToName(typeUrl), messageType = options?.typeRegistry?.findMessage(typeName);")
	f.P("        if (!messageType) {")
	f.P("            throw new Error(`cannot decode message ", message.TypeName, " from JSON: ${typeUrl} is not in the type registry`);")
	f.P("        }")
	f.P("        let message;")
	f.P(`        if (typeName.startsWith("google.protobuf.") &&  Object.prototype.hasOwnProperty.call(json, "value")) {`)
	f.P(`            message = messageType.fromJson(json["value"], options);`)
	f.P("        } else {")
	f.P("            const copy = Object.assign({}, json);")
	f.P(`            delete copy["@type"];`)
	f.P("            message = messageType.fromJson(copy, options);")
	f.P("        }")
	f.P("        this.packFrom(message);")
	f.P("        return this;")
	f.P("    }")
	f.P()
	f.P("    packFrom(message: Message): void {")
	f.P("        this.", value.LocalName, " = message.toBinary();")
	f.P("        this.", typeURL.LocalName, " = this.typeNameToUrl(message.getType().typeName);")
	f.P("    }")
	f.P()
	f.P("    unpackTo(target: Message): boolean {")
	f.P("        if (!this.is(target.getType())) {")
	f.P("            return false;")
	f.P("        }")
	f.P("        target.fromBinary(this.", value.LocalName, ");")
	f.P("        return true;")
	f.P("    }")
	f.P()
	f.P("    is(type: ", rt.MessageType, "): boolean {")
	f.P("        return this.", typeURL.LocalName, " === this.typeNameToUrl(type.typeName);")
	f.P("    }")
	f.P()
	f.P("    private typeNameToUrl(name: string): string {")
	f.P("        return `type.googleapis.com/${name}`;")
	f.P("    }")
	f.P()
	f.P("    private typeUrlToName(url: string): string {")
	f.P("        if (!url.length) {")
	f.P("            throw new Error(`invalid type url: ${url}`);")
	f.P("        }")
	f.P(`        const slash = url.lastIndexOf("/");`)
	f.P("        const name = slash > 0 ? url.substring(slash + 1) : url;")
	f.P("        if (!name.length) {")
	f.P("            throw new Error(`invalid type url: ${url}`);")
	f.P("        }")
	f.P("        return name;")
	f.P("    }")
	f.P()
}

func (g wktAny) genWktStaticMethods(f *protoplugin.GeneratedFile, message *protoplugin.Message) {
	f.P("    static pack(message: Message): ", message.Symbol, " {")
	f.P("        const any = new ", message.Symbol, "();")
	f.P("        any.packFrom(message);")
	f.P("        return any;")
	f.P("    }")
	f.P()
}

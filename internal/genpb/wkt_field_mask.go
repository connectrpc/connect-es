package genpb

import (
	"errors"

	"github.com/bufbuild/connect-web/internal/protoplugin"
	"google.golang.org/protobuf/types/descriptorpb"
)

type wktFieldMask struct {
	typeName string
}

func (g wktFieldMask) matches(message *protoplugin.Message) bool {
	_, err := g.getFields(message)
	return err == nil
}

func (g wktFieldMask) getFields(message *protoplugin.Message) (*protoplugin.Field, error) {
	if message.TypeName != g.typeName {
		return nil, errors.New("type name")
	}
	if message.File.Syntax != protoplugin.ProtoSyntax3 {
		return nil, errors.New("syntax")
	}
	var fieldPaths *protoplugin.Field
	for _, f := range message.Fields {
		switch f.Proto.GetNumber() {
		case 1:
			fieldPaths = f
		}
	}
	if fieldPaths == nil {
		return nil, errors.New("missing field")
	}
	if fieldPaths.Proto.GetType() != descriptorpb.FieldDescriptorProto_TYPE_STRING {
		return nil, errors.New("wrong field type")
	}
	if !fieldPaths.Repeated {
		return nil, errors.New("wrong field type")
	}
	return fieldPaths, nil
}

func (g wktFieldMask) genWktMethods(f *protoplugin.GeneratedFile, message *protoplugin.Message) {
	rt := message.File.RuntimeSymbols
	fieldPaths, err := g.getFields(message)
	if err != nil {
		return
	}
	f.P(`    override toJson(options?: Partial<`, rt.JsonWriteOptions, `>): `, rt.JsonValue, ` {`)
	f.P(`        // Converts snake_case to protoCamelCase according to the convention`)
	f.P(`        // used by protoc to convert a field name to a JSON name.`)
	f.P(`        function protoCamelCase(snakeCase: string): string {`)
	f.P(`            let capNext = false;`)
	f.P(`            const b = [];`)
	f.P(`            for (let i = 0; i < snakeCase.length; i++) {`)
	f.P(`                let c = snakeCase.charAt(i);`)
	f.P(`                switch (c) {`)
	f.P(`                    case '_':`)
	f.P(`                        capNext = true;`)
	f.P(`                        break;`)
	f.P(`                    case '0':`)
	f.P(`                    case '1':`)
	f.P(`                    case '2':`)
	f.P(`                    case '3':`)
	f.P(`                    case '4':`)
	f.P(`                    case '5':`)
	f.P(`                    case '6':`)
	f.P(`                    case '7':`)
	f.P(`                    case '8':`)
	f.P(`                    case '9':`)
	f.P(`                        b.push(c);`)
	f.P(`                        capNext = false;`)
	f.P(`                        break;`)
	f.P(`                    default:`)
	f.P(`                        if (capNext) {`)
	f.P(`                            capNext = false;`)
	f.P(`                            c = c.toUpperCase();`)
	f.P(`                        }`)
	f.P(`                        b.push(c);`)
	f.P(`                        break;`)
	f.P(`                }`)
	f.P(`            }`)
	f.P(`            return b.join('');`)
	f.P(`        }`)
	f.P(`        return this.`, fieldPaths.LocalName, `.map(p => {`)
	f.P(`            if (p.match(/_[0-9]?_/g) || p.match(/[A-Z]/g)) {`)
	f.P(`                throw new Error("cannot decode `, message.TypeName, ` from JSON: lowerCamelCase of path name \"" + p + "\" is irreversible");`)
	f.P(`            }`)
	f.P(`            return protoCamelCase(p);`)
	f.P(`        }).join(",");`)
	f.P(`    }`)
	f.P()
	f.P(`    override fromJson(json: `, rt.JsonValue, `, options?: Partial<`, rt.JsonReadOptions, `>): this {`)
	f.P(`        if (typeof json !== "string") {`)
	f.P(`            throw new Error("cannot decode `, message.TypeName, ` from JSON: " + proto3.json.debug(json));`)
	f.P(`        }`)
	f.P(`        if (json === "") {`)
	f.P(`            return this;`)
	f.P(`        }`)
	f.P(`        function camelToSnake (str: string) {`)
	f.P(`            if (str.includes("_")) {`)
	f.P(`                throw new Error("cannot decode `, message.TypeName, ` from JSON: path names must be lowerCamelCase");`)
	f.P(`            }`)
	f.P(`            const sc = str.replace(/[A-Z]/g, letter => "_" + letter.toLowerCase());`)
	f.P(`            return (sc[0] === "_") ? sc.substring(1) : sc;`)
	f.P(`        }`)
	f.P(`        this.`, fieldPaths.LocalName, ` = json.split(",").map(camelToSnake);`)
	f.P(`        return this;`)
	f.P(`    }`)
	f.P()
}

func (g wktFieldMask) genWktStaticMethods(f *protoplugin.GeneratedFile, message *protoplugin.Message) {
}

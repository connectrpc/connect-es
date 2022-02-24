package pb_generator

import (
	"errors"
	"fmt"
	protoplugin2 "github.com/bufbuild/connect-web/internal/protoplugin"
	"google.golang.org/protobuf/types/descriptorpb"
)

type wktTimestamp struct {
	typeName         string
	fieldCount       int
	fieldNoSeconds   int32
	fieldNoNanos     int32
	fieldTypeSeconds descriptorpb.FieldDescriptorProto_Type
	fieldTypeNanos   descriptorpb.FieldDescriptorProto_Type
}

func (g wktTimestamp) matches(message *protoplugin2.Message) bool {
	_, _, err := g.getFields(message)
	return err == nil
}

func (g wktTimestamp) getFields(message *protoplugin2.Message) (seconds *protoplugin2.Field, nanos *protoplugin2.Field, err error) {
	if message.TypeName != g.typeName {
		return nil, nil, errors.New("type name")
	}
	if message.File.Syntax != protoplugin2.ProtoSyntax3 {
		return nil, nil, errors.New("syntax")
	}
	if len(message.Fields) != g.fieldCount {
		return nil, nil, errors.New("field count")
	}
	for _, f := range message.Fields {
		switch f.Proto.GetNumber() {
		case g.fieldNoSeconds:
			seconds = f
		case g.fieldNoNanos:
			nanos = f
		}
	}
	if seconds == nil {
		return nil, nil, fmt.Errorf("missing field %d", g.fieldNoSeconds)
	}
	if nanos == nil {
		return nil, nil, fmt.Errorf("missing field %d", g.fieldNoNanos)
	}
	if seconds.Proto.GetType() != g.fieldTypeSeconds {
		return nil, nil, fmt.Errorf("want field %d type %q, got %q", g.fieldNoSeconds, g.fieldTypeSeconds, seconds.Proto.GetType())
	}
	if nanos.Proto.GetType() != g.fieldTypeNanos {
		return nil, nil, fmt.Errorf("want field %d type %q, got %q", g.fieldNoNanos, g.fieldTypeNanos, nanos.Proto.GetType())
	}
	return seconds, nanos, nil
}

func (g wktTimestamp) genWktMethods(f *protoplugin2.GeneratedFile, message *protoplugin2.Message) {
	rt := message.File.RuntimeSymbols
	seconds, nanos, _ := g.getFields(message)
	f.P("    override fromJson(json: JsonValue, options?: Partial<", rt.JsonReadOptions, ">): this {")
	f.P(`        if (typeof json !== "string") {`)
	f.P("            throw new Error(`cannot decode ", message.TypeName, " from JSON: ${", rt.ProtoN, ".json.debug(json)}`);")
	f.P("        }")
	f.P(`        const matches = json.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:Z|\.([0-9]{3,9})Z|([+-][0-9][0-9]:[0-9][0-9]))$/);`)
	f.P("        if (!matches) {")
	f.P("            throw new Error(`cannot decode ", message.TypeName, " from JSON: invalid RFC 3339 string`);")
	f.P("        }")
	f.P(`        const ms = Date.parse(matches[1] + "-" + matches[2] + "-" + matches[3] + "T" + matches[4] + ":" + matches[5] + ":" + matches[6] + (matches[8] ? matches[8] : "Z"));`)
	f.P("        if (Number.isNaN(ms)) {")
	f.P("            throw new Error(`cannot decode ", message.TypeName, " from JSON: invalid RFC 3339 string`);")
	f.P("        }")
	f.P(`        if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) {`)
	f.P("            throw new Error(`cannot decode message ", message.TypeName, " from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);")
	f.P("        }")
	f.P("        this.", seconds.LocalName, " = ", rt.ProtoInt64, ".parse(ms / 1000);")
	f.P("        this.", nanos.LocalName, " = 0;")
	f.P("        if (matches[7]) {")
	f.P(`            this.`, nanos.LocalName, ` = (parseInt("1" + matches[7] + "0".repeat(9 - matches[7].length)) - 1000000000);`)
	f.P("        }")
	f.P("        return this;")
	f.P("    }")
	f.P()
	f.P("    override toJson(options?: Partial<", rt.JsonWriteOptions, ">): JsonValue {")
	f.P("        const ms = Number(this.", seconds.LocalName, ") * 1000;")
	f.P(`        if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) {`)
	f.P("            throw new Error(`cannot encode ", message.TypeName, " to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);")
	f.P("        }")
	f.P("        if (this.", nanos.LocalName, " < 0) {")
	f.P("            throw new Error(`cannot encode ", message.TypeName, " to JSON: nanos must not be negative`);")
	f.P("        }")
	f.P(`        let z = "Z";`)
	f.P("        if (this.", nanos.LocalName, " > 0) {")
	f.P("            const nanosStr = (this.", nanos.LocalName, " + 1000000000).toString().substring(1);")
	f.P(`            if (nanosStr.substring(3) === "000000") {`)
	f.P(`                z = "." + nanosStr.substring(0, 3) + "Z";`)
	f.P(`            } else if (nanosStr.substring(6) === "000") {`)
	f.P(`                z = "." + nanosStr.substring(0, 6) + "Z";`)
	f.P("            } else {")
	f.P(`                z = "." + nanosStr + "Z";`)
	f.P("            }")
	f.P("        }")
	f.P(`        return new Date(ms).toISOString().replace(".000Z", z);`)
	f.P("    }")
	f.P()
	f.P("    toDate(): Date {")
	f.P("        return new Date(Number(this.", seconds.LocalName, ") * 1000 + Math.ceil(this.", nanos.LocalName, " / 1000000));")
	f.P("    }")
	f.P()
}

func (g wktTimestamp) genWktStaticMethods(f *protoplugin2.GeneratedFile, message *protoplugin2.Message) {
	rt := message.File.RuntimeSymbols
	seconds, nanos, _ := g.getFields(message)
	f.P("    static now(): ", message.Symbol, " {")
	f.P("        return ", message.Symbol, ".fromDate(new Date())")
	f.P("    }")
	f.P("")
	f.P("    static fromDate(date: Date): ", message.Symbol, " {")
	f.P("        const ms = date.getTime();")
	f.P("        return new ", message.Symbol, "({")
	f.P("            ", seconds.LocalName, ": ", rt.ProtoInt64, ".parse(Math.floor(ms / 1000)),")
	f.P("            ", nanos.LocalName, ": (ms % 1000) * 1000000,")
	f.P("        });")
	f.P("    }")
	f.P()
}

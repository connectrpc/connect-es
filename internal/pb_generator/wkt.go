package pb_generator

import (
	protoplugin2 "github.com/bufbuild/connect-web/internal/protoplugin"
	"google.golang.org/protobuf/types/descriptorpb"
)

var generators = []wktGenerator{
	wktAny{
		typeName:         "google.protobuf.Any",
		fieldCount:       2,
		fieldNoTypeUrl:   1,
		fieldNoValue:     2,
		fieldTypeTypeUrl: descriptorpb.FieldDescriptorProto_TYPE_STRING,
		fieldTypeValue:   descriptorpb.FieldDescriptorProto_TYPE_BYTES,
	},
	wktDuration{
		typeName:         "google.protobuf.Duration",
		fieldCount:       2,
		fieldNoSeconds:   1,
		fieldNoNanos:     2,
		fieldTypeSeconds: descriptorpb.FieldDescriptorProto_TYPE_INT64,
		fieldTypeNanos:   descriptorpb.FieldDescriptorProto_TYPE_INT32,
	},
	wktTimestamp{
		typeName:         "google.protobuf.Timestamp",
		fieldCount:       2,
		fieldNoSeconds:   1,
		fieldNoNanos:     2,
		fieldTypeSeconds: descriptorpb.FieldDescriptorProto_TYPE_INT64,
		fieldTypeNanos:   descriptorpb.FieldDescriptorProto_TYPE_INT32,
	},
	wktStruct{
		typeName:      "google.protobuf.Struct",
		fieldNoFields: 1,
	},
	wktValue{
		typeName:             "google.protobuf.Value",
		fieldNoNullValue:     1,
		fieldTypeNullValue:   descriptorpb.FieldDescriptorProto_TYPE_ENUM,
		fieldNoNumberValue:   2,
		fieldTypeNumberValue: descriptorpb.FieldDescriptorProto_TYPE_DOUBLE,
		fieldNoStringValue:   3,
		fieldTypeStringValue: descriptorpb.FieldDescriptorProto_TYPE_STRING,
		fieldNoBoolValue:     4,
		fieldTypeBoolValue:   descriptorpb.FieldDescriptorProto_TYPE_BOOL,
		fieldNoStructValue:   5,
		fieldTypeStructValue: descriptorpb.FieldDescriptorProto_TYPE_MESSAGE,
		fieldNoListValue:     6,
		fieldTypeListValue:   descriptorpb.FieldDescriptorProto_TYPE_MESSAGE,
	},
	wktListValue{
		typeName: "google.protobuf.ListValue",
	},
	wktFieldMask{
		typeName: "google.protobuf.FieldMask",
	},
	wktWrappers{
		fieldCount:   1,
		fieldNoValue: 1,
		typeNames: []string{
			"google.protobuf.DoubleValue",
			"google.protobuf.FloatValue",
			"google.protobuf.Int64Value",
			"google.protobuf.UInt64Value",
			"google.protobuf.Int32Value",
			"google.protobuf.UInt32Value",
			"google.protobuf.BoolValue",
			"google.protobuf.StringValue",
			"google.protobuf.BytesValue",
		},
	},
}

var wrapperToBaseType = map[string]descriptorpb.FieldDescriptorProto_Type{
	"google.protobuf.DoubleValue": descriptorpb.FieldDescriptorProto_TYPE_DOUBLE,
	"google.protobuf.FloatValue":  descriptorpb.FieldDescriptorProto_TYPE_FLOAT,
	"google.protobuf.Int64Value":  descriptorpb.FieldDescriptorProto_TYPE_INT64,
	"google.protobuf.UInt64Value": descriptorpb.FieldDescriptorProto_TYPE_UINT64,
	"google.protobuf.Int32Value":  descriptorpb.FieldDescriptorProto_TYPE_INT32,
	"google.protobuf.UInt32Value": descriptorpb.FieldDescriptorProto_TYPE_UINT32,
	"google.protobuf.BoolValue":   descriptorpb.FieldDescriptorProto_TYPE_BOOL,
	"google.protobuf.StringValue": descriptorpb.FieldDescriptorProto_TYPE_STRING,
	"google.protobuf.BytesValue":  descriptorpb.FieldDescriptorProto_TYPE_BYTES,
}

func GetUnwrappedFieldType(field *protoplugin2.Field) (scalarType descriptorpb.FieldDescriptorProto_Type, ok bool) {
	if field.Kind != protoplugin2.FieldKindMessage {
		return 0, false
	}
	if field.Repeated {
		return 0, false
	}
	scalarType, ok = wrapperToBaseType[field.Message.TypeName]
	return scalarType, ok
}

type wktGenerator interface {
	matches(message *protoplugin2.Message) bool
	genWktMethods(f *protoplugin2.GeneratedFile, message *protoplugin2.Message)
	genWktStaticMethods(f *protoplugin2.GeneratedFile, message *protoplugin2.Message)
}

func GenWktMethods(f *protoplugin2.GeneratedFile, message *protoplugin2.Message) {
	for _, g := range generators {
		if g.matches(message) {
			g.genWktMethods(f, message)
		}
	}
}

func GenWktStaticMethods(f *protoplugin2.GeneratedFile, message *protoplugin2.Message) {
	for _, g := range generators {
		if g.matches(message) {
			g.genWktStaticMethods(f, message)
		}
	}
}

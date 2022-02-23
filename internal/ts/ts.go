package ts

import "google.golang.org/protobuf/types/descriptorpb"

func ScalarTypeScriptType(scalarType descriptorpb.FieldDescriptorProto_Type) string {
	switch scalarType {
	case descriptorpb.FieldDescriptorProto_TYPE_STRING:
		return "string"
	case descriptorpb.FieldDescriptorProto_TYPE_BOOL:
		return "boolean"
	case
		descriptorpb.FieldDescriptorProto_TYPE_UINT64,
		descriptorpb.FieldDescriptorProto_TYPE_SFIXED64,
		descriptorpb.FieldDescriptorProto_TYPE_FIXED64,
		descriptorpb.FieldDescriptorProto_TYPE_SINT64,
		descriptorpb.FieldDescriptorProto_TYPE_INT64:
		return "bigint"
	case descriptorpb.FieldDescriptorProto_TYPE_BYTES:
		return "Uint8Array"
	default:
		return "number"
	}
}

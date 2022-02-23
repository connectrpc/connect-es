package protoplugin

type Runtime struct {
	ProtoN             *Symbol
	Message            *Symbol
	PartialMessage     *Symbol
	PlainMessage       *Symbol
	FieldList          *Symbol
	MessageType        *Symbol
	BinaryReadOptions  *Symbol
	BinaryWriteOptions *Symbol
	JsonReadOptions    *Symbol
	JsonWriteOptions   *Symbol
	JsonValue          *Symbol
	JsonObject         *Symbol
	ProtoInt64         *Symbol
	ScalarType         *Symbol
	MethodKind         *Symbol
	MethodIdempotency  *Symbol
}

func newRuntime(symbolPool *symbolPool, runtimeImportPath string, syntax ProtoSyntax) *Runtime {
	return &Runtime{
		ProtoN:             symbolPool.new(syntax.String(), runtimeImportPath),
		Message:            symbolPool.new("Message", runtimeImportPath),
		PartialMessage:     symbolPool.new("PartialMessage", runtimeImportPath).ToTypeOnly(),
		PlainMessage:       symbolPool.new("PlainMessage", runtimeImportPath).ToTypeOnly(),
		FieldList:          symbolPool.new("FieldList", runtimeImportPath).ToTypeOnly(),
		MessageType:        symbolPool.new("MessageType", runtimeImportPath).ToTypeOnly(),
		BinaryReadOptions:  symbolPool.new("BinaryReadOptions", runtimeImportPath).ToTypeOnly(),
		BinaryWriteOptions: symbolPool.new("BinaryWriteOptions", runtimeImportPath).ToTypeOnly(),
		JsonReadOptions:    symbolPool.new("JsonReadOptions", runtimeImportPath).ToTypeOnly(),
		JsonWriteOptions:   symbolPool.new("JsonWriteOptions", runtimeImportPath).ToTypeOnly(),
		JsonValue:          symbolPool.new("JsonValue", runtimeImportPath).ToTypeOnly(),
		JsonObject:         symbolPool.new("JsonObject", runtimeImportPath).ToTypeOnly(),
		ProtoInt64:         symbolPool.new("protoInt64", runtimeImportPath),
		ScalarType:         symbolPool.new("ScalarType", runtimeImportPath),
		MethodKind:         symbolPool.new("MethodKind", runtimeImportPath),
		MethodIdempotency:  symbolPool.new("MethodIdempotency", runtimeImportPath),
	}
}

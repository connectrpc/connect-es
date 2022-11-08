import type {
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
  Message,
  MethodInfo,
  PartialMessage,
} from "@bufbuild/protobuf";

/**
 * Returns functions to normalize and serialize the input message
 * of an RPC, and to parse the output message of an RPC.
 */
export function createClientMethodSerializers<
  I extends Message<I>,
  O extends Message<O>
>(
  method: MethodInfo<I, O>,
  useBinaryFormat: boolean,
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>,
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>
) {
  function normalize(input: PartialMessage<I>): I {
    return input instanceof method.I ? input : new method.I(input);
  }

  function serialize(message: I): Uint8Array {
    return useBinaryFormat
      ? message.toBinary(binaryOptions)
      : new TextEncoder().encode(message.toJsonString(jsonOptions));
  }

  function parse(data: Uint8Array | ArrayBuffer): O {
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
    return useBinaryFormat
      ? method.O.fromBinary(bytes, binaryOptions)
      : method.O.fromJsonString(new TextDecoder().decode(bytes), jsonOptions);
  }

  return { normalize, parse, serialize };
}

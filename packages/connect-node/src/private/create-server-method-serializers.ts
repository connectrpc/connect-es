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
 * Returns functions to normalize and serialize the output message
 * of an RPC, and to parse the input message of an RPC.
 */
export function createServerMethodSerializers<
  I extends Message<I>,
  O extends Message<O>
>(
  jsonOptions: Partial<JsonReadOptions & JsonWriteOptions> | undefined,
  binaryOptions: Partial<BinaryReadOptions & BinaryWriteOptions> | undefined,
  method: MethodInfo<I, O>,
  useBinaryFormat: boolean
) {
  function normalize(output: O | PartialMessage<O>): O {
    return output instanceof method.O
      ? output
      : new method.O(output as PartialMessage<O>);
  }

  function serialize(message: O): Uint8Array {
    return useBinaryFormat
      ? message.toBinary(binaryOptions)
      : new TextEncoder().encode(message.toJsonString(jsonOptions));
  }

  function parse(data: Uint8Array | ArrayBuffer): I {
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
    return useBinaryFormat
      ? method.I.fromBinary(bytes, binaryOptions)
      : method.I.fromJsonString(new TextDecoder().decode(bytes), jsonOptions);
  }

  return { normalize, parse, serialize };
}

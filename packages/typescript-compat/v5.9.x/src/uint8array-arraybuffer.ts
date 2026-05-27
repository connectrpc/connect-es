import { encodeEnvelope } from "@connectrpc/connect/protocol";
import { trailerSerialize } from "@connectrpc/connect/protocol-grpc-web";

export function testEncodeEnvelope() {
  const infer = encodeEnvelope(0, new Uint8Array([0]));
  const uint8Arr: Uint8Array = encodeEnvelope(0, new Uint8Array([0]));
  const uint8ArrBuff: Uint8Array<ArrayBuffer> = encodeEnvelope(0, new Uint8Array([0]));
  return [infer, uint8Arr, uint8ArrBuff] as const;
}

export function testTrailerSerialize() {
  const infer = trailerSerialize(new Headers());
  const uint8Arr: Uint8Array = trailerSerialize(new Headers());
  const uint8ArrBuff: Uint8Array<ArrayBuffer> = trailerSerialize(new Headers());
  return [infer, uint8Arr, uint8ArrBuff] as const;
}

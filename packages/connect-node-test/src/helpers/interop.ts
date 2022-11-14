import {
  ErrorDetail,
  Payload,
  PayloadType,
} from "../gen/grpc/testing/messages_pb.js";

export const interop = {
  /**
   * readable non-ASCII
   */
  nonASCIIErrMsg: "soirée 🎉",

  /**
   * An error detail to be included in an error.
   */
  errorDetail: new ErrorDetail({
    reason: "soirée 🎉",
    domain: "connect-crosstest",
  }),

  leadingMetadataKey: "x-grpc-test-echo-initial",
  trailingMetadataKey: "x-grpc-test-echo-trailing-bin",

  makeServerPayload(payloadType: PayloadType, size: number): Payload {
    switch (payloadType) {
      case PayloadType.COMPRESSABLE:
        return new Payload({
          body: new Uint8Array(size),
          type: PayloadType.COMPRESSABLE,
        });
      default:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`unsupported payload type: ${payloadType}`);
    }
  },
};

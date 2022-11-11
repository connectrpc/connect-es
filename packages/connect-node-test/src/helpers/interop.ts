import { ErrorDetail } from "../gen/grpc/testing/messages_pb.js";

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
};

import { Code } from "./code.js";

/**
 * Returns a HTTP status code for the given Connect code.
 * See https://connect.build/docs/protocol#error-codes
 */
export function connectCodeToHttpStatus(code: Code): number {
  switch (code) {
    case Code.Canceled:
      return 408; // Request Timeout
    case Code.Unknown:
      return 500; // Internal Server Error
    case Code.InvalidArgument:
      return 400; // Bad Request
    case Code.DeadlineExceeded:
      return 408; // Request Timeout
    case Code.NotFound:
      return 404; // Not Found
    case Code.AlreadyExists:
      return 409; // Conflict
    case Code.PermissionDenied:
      return 403; // Forbidden
    case Code.ResourceExhausted:
      return 429; // Too Many Requests
    case Code.FailedPrecondition:
      return 412; // Precondition Failed
    case Code.Aborted:
      return 409; // Conflict
    case Code.OutOfRange:
      return 400; // Bad Request
    case Code.Unimplemented:
      return 404; // Not Found
    case Code.Internal:
      return 500; // Internal Server Error
    case Code.Unavailable:
      return 503; // Service Unavailable
    case Code.DataLoss:
      return 500; // Internal Server Error
    case Code.Unauthenticated:
      return 401; // Unauthorized
    default:
      return 500; // same as CodeUnknown
  }
}

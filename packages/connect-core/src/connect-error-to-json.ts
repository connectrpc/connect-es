import {
  JsonObject,
  JsonValue,
  JsonWriteOptions,
  Message,
  protoBase64,
} from "@bufbuild/protobuf";
import type { ConnectError } from "./connect-error.js";
import { codeToString } from "./code.js";

/**
 * Serialize the given error to JSON.
 *
 * The JSON serialization options are required to produce the optional
 * human-readable representation in the "debug" key if the detail uses
 * google.protobuf.Any. If serialization of the "debug" value fails, it
 * is silently disregarded.
 *
 * See https://connect.build/docs/protocol#error-end-stream
 */
export function connectErrorToJson(
  error: ConnectError,
  jsonWriteOptions?: Partial<JsonWriteOptions>
): JsonObject {
  const o: JsonObject = {
    code: codeToString(error.code),
  };
  if (error.rawMessage.length > 0) {
    o.message = error.rawMessage;
  }
  if (error.details.length > 0) {
    type IncomingDetail = {
      type: string;
      value: Uint8Array;
      debug?: JsonValue;
    };
    o.details = error.details
      .map((value) => {
        if (value instanceof Message) {
          const i: IncomingDetail = {
            type: value.getType().typeName,
            value: value.toBinary(),
          };
          try {
            i.debug = value.toJson(jsonWriteOptions);
          } catch (e) {
            // We deliberately ignore errors that may occur when serializing
            // a message to JSON (the message contains an Any).
            // The rationale is that we are only trying to provide optional
            // debug information.
          }
          return i;
        }
        return value;
      })
      .map(({ value, ...rest }) => ({
        ...rest,
        value: protoBase64.enc(value),
      }));
  }
  return o;
}

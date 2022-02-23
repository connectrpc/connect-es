import {
  ConformanceRequest,
  ConformanceResponse,
  FailureSet,
  TestCategory,
  WireFormat,
} from "./gen/conformance/conformance_pb.js";
import { TestAllTypesProto3 } from "./gen/google/protobuf/test_messages_proto3_pb.js";
import { TestAllTypesProto2 } from "./gen/google/protobuf/test_messages_proto2_pb.js";
import { readSync, writeSync } from "fs";
import {
  Any,
  Duration,
  FieldMask,
  Int32Value,
  Message,
  Struct,
  Timestamp,
  TypeRegistry,
  Value,
} from "@bufbuild/protobuf";

const typeRegistry = TypeRegistry.fromTypes(
  Value,
  Struct,
  FieldMask,
  Timestamp,
  Duration,
  Int32Value,
  TestAllTypesProto3,
  TestAllTypesProto2,
  Any
);

function main() {
  let testCount = 0;
  try {
    while (testIo(test)) {
      testCount += 1;
    }
  } catch (e) {
    process.stderr.write(
      `conformance.ts: exiting after ${testCount} tests: ${String(e)}`
    );
    process.exit(1);
  }
}

function test(request: ConformanceRequest): ConformanceResponse["result"] {
  if (request.messageType === FailureSet.typeName) {
    // > The conformance runner will request a list of failures as the first request.
    // > This will be known by message_type == "conformance.FailureSet", a conformance
    // > test should return a serialized FailureSet in protobuf_payload.
    const failureSet = new FailureSet();
    return { case: "protobufPayload", value: failureSet.toBinary() };
  }

  const payloadType = typeRegistry.findMessage(request.messageType);
  if (!payloadType) {
    return {
      case: "runtimeError",
      value: `unknown request message type ${request.messageType}`,
    };
  }

  let payload: Message;

  try {
    switch (request.payload.case) {
      case "protobufPayload":
        payload = payloadType.fromBinary(request.payload.value);
        break;

      case "jsonPayload":
        payload = payloadType.fromJsonString(request.payload.value, {
          ignoreUnknownFields:
            request.testCategory ===
            TestCategory.JSON_IGNORE_UNKNOWN_PARSING_TEST,
          typeRegistry,
        });
        break;

      default:
        // We use a failure list instead of skipping, because that is more transparent.
        return {
          case: "runtimeError",
          value: `${request.payload.case ?? "?"} not supported`,
        };
    }
  } catch (err) {
    // > This string should be set to indicate parsing failed.  The string can
    // > provide more information about the parse error if it is available.
    // >
    // > Setting this string does not necessarily mean the testee failed the
    // > test.  Some of the test cases are intentionally invalid input.
    return { case: "parseError", value: String(err) };
  }

  try {
    switch (request.requestedOutputFormat) {
      case WireFormat.PROTOBUF:
        return {
          case: "protobufPayload",
          value: payload.toBinary(),
        };

      case WireFormat.JSON:
        return {
          case: "jsonPayload",
          value: payload.toJsonString({
            typeRegistry,
          }),
        };

      case WireFormat.JSPB:
        return { case: "skipped", value: "JSPB not supported." };

      case WireFormat.TEXT_FORMAT:
        return { case: "skipped", value: "Text format not supported." };

      default:
        return {
          case: "runtimeError",
          value: `unknown requested output format ${request.requestedOutputFormat}`,
        };
    }
  } catch (err) {
    // > If the input was successfully parsed but errors occurred when
    // > serializing it to the requested output format, set the error message in
    // > this field.
    return { case: "serializeError", value: String(err) };
  }
}

// Returns true if the test ran successfully, false on legitimate EOF.
// If EOF is encountered in an unexpected place, raises IOError.
function testIo(
  test: (request: ConformanceRequest) => ConformanceResponse["result"]
): boolean {
  setBlockingStdout();
  const requestLengthBuf = readBuffer(4);
  if (requestLengthBuf === "EOF") {
    return false;
  }
  const requestLength = requestLengthBuf.readInt32LE(0);
  const serializedRequest = readBuffer(requestLength);
  if (serializedRequest === "EOF") {
    throw "Failed to read request.";
  }
  const request = ConformanceRequest.fromBinary(serializedRequest);
  const response = new ConformanceResponse();
  response.result = test(request);
  const serializedResponse = response.toBinary();
  const responseLengthBuf = Buffer.alloc(4);
  responseLengthBuf.writeInt32LE(serializedResponse.length, 0);
  writeBuffer(responseLengthBuf);
  writeBuffer(Buffer.from(serializedResponse));
  return true;
}

// Read a buffer of N bytes from stdin.
function readBuffer(bytes: number): Buffer | "EOF" {
  const buf = Buffer.alloc(bytes);
  let read = 0;
  try {
    read = readSync(0, buf, 0, bytes, null);
  } catch (e) {
    throw `failed to read from stdin: ${String(e)}`;
  }
  if (read !== bytes) {
    if (read === 0) {
      return "EOF";
    }
    throw "premature EOF on stdin.";
  }
  return buf;
}

// Write a buffer to stdout.
function writeBuffer(buffer: Buffer): void {
  let totalWritten = 0;
  while (totalWritten < buffer.length) {
    totalWritten += writeSync(
      1,
      buffer,
      totalWritten,
      buffer.length - totalWritten
    );
  }
}

// Fixes https://github.com/timostamm/protobuf-ts/issues/134
// Node is buffering chunks to stdout, meaning that for big generated
// files the CodeGeneratorResponse will not reach protoc completely.
// To fix this, we set stdout to block using the internal private
// method setBlocking(true)
function setBlockingStdout(): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment
  const stdoutHandle = (process.stdout as any)._handle;
  if (stdoutHandle !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    stdoutHandle.setBlocking(true);
  }
}

main();

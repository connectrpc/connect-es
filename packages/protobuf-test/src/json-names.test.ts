import { mkdtempSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { spawnSync } from "child_process";
import { FileDescriptorSet, proto3, ScalarType } from "@bufbuild/protobuf";

test("JSON names equal protoc", () => {
  expect(getProtocJsonName("foo_bar")).toBe("fooBar");
  expectRuntimeJsonNameEqualsProtocJsonName("foo_bar");
  expectRuntimeJsonNameEqualsProtocJsonName("__proto__");
  expectRuntimeJsonNameEqualsProtocJsonName("fieldname1");
  expectRuntimeJsonNameEqualsProtocJsonName("field_name2");
  expectRuntimeJsonNameEqualsProtocJsonName("_field_name3");
  expectRuntimeJsonNameEqualsProtocJsonName("field__name4_");
  expectRuntimeJsonNameEqualsProtocJsonName("field0name5");
  expectRuntimeJsonNameEqualsProtocJsonName("field_0_name6");
  expectRuntimeJsonNameEqualsProtocJsonName("fieldName7");
  expectRuntimeJsonNameEqualsProtocJsonName("FieldName8");
  expectRuntimeJsonNameEqualsProtocJsonName("field_Name9");
  expectRuntimeJsonNameEqualsProtocJsonName("Field_Name10");
  expectRuntimeJsonNameEqualsProtocJsonName("FIELD_NAME11");
  expectRuntimeJsonNameEqualsProtocJsonName("FIELD_name12");
  expectRuntimeJsonNameEqualsProtocJsonName("__field_name13");
  expectRuntimeJsonNameEqualsProtocJsonName("__Field_name14");
  expectRuntimeJsonNameEqualsProtocJsonName("field__name15");
  expectRuntimeJsonNameEqualsProtocJsonName("field__Name16");
  expectRuntimeJsonNameEqualsProtocJsonName("field_name17__");
  expectRuntimeJsonNameEqualsProtocJsonName("Field_name18__");
});

// expectRuntimeJsonNameEqualsProtocJsonName takes the given proto field name
// and runs it through protoc to get the JSON name.
// The result is compared to our own implementation of the algorithm.
// It is important that the implementations in JS and Go match the protoc
// implementation.
export function expectRuntimeJsonNameEqualsProtocJsonName(protoName: string) {
  const want = getProtocJsonName(protoName);
  const got = getRuntimeJsonName(protoName);
  if (want === false) {
    return;
  }
  expect(want).toBe(got);
}

function getRuntimeJsonName(name: string): string {
  const mt = proto3.makeMessageType("Fuzz", [
    { no: 1, kind: "scalar", T: ScalarType.BOOL, name: name },
  ]);
  const fi = mt.fields.find(1);
  if (!fi) {
    throw new Error();
  }
  return fi.jsonName;
}

// getProtocJsonName runs protoc to get the "json name" for a field
function getProtocJsonName(protoName: string): string | false {
  if (protoName.trim() !== protoName) {
    return false;
  }
  const tempDir = mkdtempSync(join(tmpdir(), "node-protoc-workdir-"));
  const inFilename = join(tempDir, "i.proto");
  const outFilename = join(tempDir, "o");
  const inData = [
    `syntax = "proto3";`,
    `message I {`,
    `    int32 ${protoName} = 1;`,
    `}`,
  ].join("\n");
  writeFileSync(inFilename, inData, { encoding: "utf-8" });
  const result = spawnSync(
    "protoc",
    ["-I", tempDir, inFilename, "--descriptor_set_out", outFilename],
    {
      encoding: "utf-8",
    }
  );
  if (result.stderr.length > 0) {
    if (result.stderr.indexOf("Expected field name.") >= 0) {
      return false;
    }
    if (result.stderr.indexOf("Expected field number.") >= 0) {
      return false;
    }
    if (result.stderr.indexOf('Expected ";".') >= 0) {
      return false;
    }
    if (result.stderr.indexOf("Missing field number.") >= 0) {
      return false;
    }
    if (
      result.stderr.indexOf(
        "Invalid control characters encountered in text."
      ) >= 0
    ) {
      return false;
    }
    throw new Error(result.stderr);
  }
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error("exit code " + String(result.status));
  }
  const fds = FileDescriptorSet.fromBinary(readFileSync(outFilename));
  const jsonName = fds.file[0].messageType[0].field[0].jsonName;
  if (jsonName === undefined) {
    throw new Error("missing json name");
  }
  return jsonName;
}

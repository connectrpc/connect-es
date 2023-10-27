import {
  ClientCompatRequest,
  ClientCompatResponse,
  ClientErrorResult,
} from "./gen/connectrpc/conformance/v1/client_compat_pb.js";
import invoke from "./invoke.js";
import { createTransport } from "./transport.js";

export async function run() {
  let resolveReady: () => void;
  const ready = new Promise<void>((resolve) => (resolveReady = resolve));
  process.stdin.once("readable", () => {
    resolveReady();
  });
  await ready;
  for (;;) {
    const size = process.stdin.read(4) as Buffer | null;
    if (size === null) {
      break;
    }
    const reqData = process.stdin.read(size.readUInt32BE()) as Buffer | null;
    if (reqData === null) {
      throw new Error("Unexpected EOF");
    }
    const req = ClientCompatRequest.fromBinary(reqData);
    const res = new ClientCompatResponse({
      testName: req.testName,
    });
    try {
      const invokeResult = await invoke(createTransport(req), req);
      res.result = { case: "response", value: invokeResult };
    } catch (e) {
      res.result = {
        case: "error",
        value: new ClientErrorResult({ message: (e as Error).message }),
      };
    }
    const resData = res.toBinary();
    const resSize = Buffer.alloc(4);
    resSize.writeUInt32BE(resData.length);
    process.stdout.write(resSize);
    process.stdout.write(resData);
  }
}

run();

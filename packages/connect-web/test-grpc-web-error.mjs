import { createGrpcWebTransport } from "/Users/ajeet/ws/connect-es/packages/connect-web/dist/esm/grpc-web-transport.js";
import { ConnectError } from "/Users/ajeet/ws/connect-es/packages/connect/dist/esm/index.js";
import { create } from "@bufbuild/protobuf";
import {
  ConformanceService,
  ServerStreamRequestSchema,
} from "@connectrpc/connect-conformance";

// Simulate a successful gRPC-web response with NO trailer (which should trigger "missing trailer").
// gRPC-web trailer is signaled by setting the high bit of the flags byte.
// We send a message envelope but never a trailer envelope.
const messageBytes = new Uint8Array([0, 0, 0, 0, 0]); // 5-byte envelope: flags=0, length=0

const response = new Response(messageBytes, {
  status: 200,
  headers: {
    "Content-Type": "application/grpc-web+proto",
  },
});

const transport = createGrpcWebTransport({
  baseUrl: "https://example.com",
  fetch: () => Promise.resolve(response),
});

try {
  const stream = transport.stream(
    ConformanceService.method.serverStream,
    undefined,
    undefined,
    undefined,
    (async function* () {
      yield create(ServerStreamRequestSchema);
    })(),
    undefined,
  );
  const res = await stream;
  for await (const msg of res.message) {
    console.log("got message", msg);
  }
  console.log("stream ended OK");
} catch (e) {
  console.log("typeof error:", typeof e);
  console.log("is ConnectError:", e instanceof ConnectError);
  console.log("is Error:", e instanceof Error);
  console.log("error value:", e);
  if (e instanceof Error) {
    console.log("error.message:", e.message);
    if ("code" in e) console.log("error.code:", e.code);
  }
}

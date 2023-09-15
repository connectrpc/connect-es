import { setupServer } from "msw/node";
import { service } from "./service.js";
import { ElizaService } from "@buf/connectrpc_eliza.connectrpc_es/connectrpc/eliza/v1/eliza_connect.js";
import {
  createConnectTransport,
  createGrpcWebTransport,
} from "@connectrpc/connect-web";
import type {
  GrpcWebTransportOptions,
  ConnectTransportOptions,
} from "@connectrpc/connect-web";
import { createPromiseClient } from "@connectrpc/connect";

type MockConnectTransportOptions = Omit<ConnectTransportOptions, "baseUrl">;
type ConnectTestDef = {
  name: string;
  transportOptions?: MockConnectTransportOptions;
};

type MockGRPCTransportOptions = Omit<GrpcWebTransportOptions, "baseUrl">;
type GRPCWebTestDef = {
  name: string;
  transportOptions?: MockGRPCTransportOptions;
};

function createElizaMock({
  transportOptions = {},
  streamDelay,
  protocol,
}:
  | {
      protocol: "connect";
      transportOptions?: MockConnectTransportOptions;
      streamDelay?: number;
    }
  | {
      protocol: "grpc-web";
      transportOptions?: MockGRPCTransportOptions;
      streamDelay?: number;
    }) {
  const baseUrl = "https://example.com/api";
  const server = setupServer(
    ...service(
      ElizaService,
      {
        baseUrl,
      },
      {
        say: () => {
          return { sentence: "Hello and welcome!" };
        },
        introduce: async function* () {
          yield {
            sentence: "Hello and welcome!",
          };
          await new Promise((resolve) =>
            setTimeout(resolve, streamDelay ?? 1000)
          );
          yield {
            sentence: "How are you?",
          };
        },
      }
    )
  );
  const client = createPromiseClient(
    ElizaService,
    protocol === "connect"
      ? createConnectTransport({
          baseUrl,
          ...transportOptions,
        })
      : createGrpcWebTransport({
          baseUrl,
          ...transportOptions,
        })
  );
  server.listen({ onUnhandledRequest: "error" });
  // Would love to use the `using` keyword but it doesn't seem to be supported in esbuild yet 😢
  return {
    dispose: () => {
      server.close();
      server.resetHandlers();
    },
    client,
  };
}

const baseConnectTestDefs: ConnectTestDef[] = [
  { name: "json" },
  { name: "binary", transportOptions: { useBinaryFormat: true } },
  { name: "get requests", transportOptions: { useHttpGet: true } },
];

const baseGRPCWebTestDefs: GRPCWebTestDef[] = [
  { name: "json" },
  { name: "binary", transportOptions: { useBinaryFormat: true } },
];

const allTestCases = [
  {
    protocol: "connect",
    testDefs: baseConnectTestDefs,
  },
  {
    protocol: "grpc-web",
    testDefs: baseGRPCWebTestDefs,
  },
] as const;

for (const testCase of allTestCases) {
  describe(testCase.protocol, () => {
    describe("unary calls", () => {
      testCase.testDefs.forEach(({ name, transportOptions }) => {
        it(`handles ${name}`, async () => {
          const { dispose, client } = createElizaMock({
            transportOptions,
            protocol: testCase.protocol,
          });
          try {
            const response = await client.say({ sentence: "Hello" });
            expect(response.sentence).toBe("Hello and welcome!");
          } finally {
            dispose();
          }
        });
      });
    });
    describe("server streaming calls", () => {
      testCase.testDefs.forEach(({ name, transportOptions }) => {
        it(`handles ${name}`, async () => {
          const { dispose, client } = createElizaMock({
            transportOptions,
            streamDelay: 0,
            protocol: "connect",
          });
          try {
            const stream = client.introduce({ name: "Test name" });
            const expected = ["Hello and welcome!", "How are you?"];
            for await (const response of stream) {
              expect(response.sentence).toBe(expected.shift() ?? "");
            }
          } finally {
            dispose();
          }
        });
      });
    });
  });
}

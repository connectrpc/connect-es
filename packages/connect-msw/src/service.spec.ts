import { setupServer } from "msw/node";
import { service } from "./service.js";
import { ElizaService } from "@buf/connectrpc_eliza.connectrpc_es/connectrpc/eliza/v1/eliza_connect.js";
import {
  SayRequest,
  SayResponse,
  IntroduceResponse,
} from "@buf/connectrpc_eliza.bufbuild_es/connectrpc/eliza/v1/eliza_pb.js";
import {
  createConnectTransport,
  createGrpcWebTransport,
} from "@connectrpc/connect-web";
import type {
  GrpcWebTransportOptions,
  ConnectTransportOptions,
} from "@connectrpc/connect-web";
import { Code, ConnectError, createPromiseClient } from "@connectrpc/connect";
import type { ServiceImpl } from "@connectrpc/connect";
import { createBypassOptions, passthrough } from "./create-worker-handlers.js";

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
  additionalMethods = {},
}:
  | {
      protocol: "connect";
      transportOptions?: MockConnectTransportOptions;
      streamDelay?: number;
      additionalMethods?: Partial<ServiceImpl<typeof ElizaService>>;
    }
  | {
      protocol: "grpc-web";
      transportOptions?: MockGRPCTransportOptions;
      streamDelay?: number;
      additionalMethods?: Partial<ServiceImpl<typeof ElizaService>>;
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
        ...additionalMethods,
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
        describe(`with config ${name}`, () => {
          it(`responds with proper result`, async () => {
            const { dispose, client } = createElizaMock({
              transportOptions,
              protocol: testCase.protocol,
            });
            try {
              const response = await client.say({ sentence: "Hello" });
              expect(response).toBeInstanceOf(SayResponse);
              expect(response.sentence).toBe("Hello and welcome!");
            } finally {
              dispose();
            }
          });

          it(`has access to the request object of the proper type`, async () => {
            const { dispose, client } = createElizaMock({
              transportOptions,
              protocol: testCase.protocol,
              additionalMethods: {
                say: (req) => {
                  expect(req).toBeInstanceOf(SayRequest);
                  return {
                    sentence: `Parrot says: ${req.sentence}`,
                  };
                },
              },
            });
            try {
              const result = await client.say({ sentence: "Echo!" });
              expect(result.sentence).toBe("Parrot says: Echo!");
            } finally {
              dispose();
            }
          });
        });
      });
    });
    describe("server streaming calls", () => {
      testCase.testDefs.forEach(({ name, transportOptions }) => {
        it(`handles ${name}`, async () => {
          const { dispose, client } = createElizaMock({
            transportOptions,
            streamDelay: 0,
            protocol: testCase.protocol,
          });
          try {
            const stream = client.introduce({ name: "Test name" });
            const expected = ["Hello and welcome!", "How are you?"];
            for await (const response of stream) {
              expect(response).toBeInstanceOf(IntroduceResponse);
              expect(response.sentence).toBe(expected.shift() ?? "");
            }
          } finally {
            dispose();
          }
        });
      });
    });
    describe("throwing errors", () => {
      testCase.testDefs.forEach(({ name, transportOptions }) => {
        it(`handles ${name}`, async () => {
          const { dispose, client } = createElizaMock({
            transportOptions,
            protocol: testCase.protocol,
            additionalMethods: {
              say: () => {
                throw new ConnectError("Test error", Code.Internal);
              },
            },
          });
          try {
            await expectAsync(
              client.say({ sentence: "Test name" })
            ).toBeRejectedWithError("[internal] Test error");
          } finally {
            dispose();
          }
        });
      });
    });
  });
}

it("handles bypassing the mock", async () => {
  const { dispose, client } = createElizaMock({
    protocol: "connect",
    additionalMethods: {
      say: () => {
        return {
          sentence: "Faked response",
        };
      },
    },
  });
  try {
    // Expect this to fail since the mock is bypassed. And will hit the real transport (and fail due to timeout)
    await expectAsync(
      client.say(
        { sentence: "Bypassing msw mock" },
        createBypassOptions({
          timeoutMs: 10,
        })
      )
    ).toBeRejectedWithError(ConnectError, /\[deadline_exceeded\]/);
  } finally {
    dispose();
  }
});

it("handles passthrough", async () => {
  const { dispose, client } = createElizaMock({
    protocol: "connect",
    additionalMethods: {
      say: (req, ctx) => {
        if (req.sentence === "Passthrough") {
          return passthrough(ctx);
        }
        return {
          sentence: "Hello again",
        };
      },
    },
  });
  try {
    // Expect this to fail since the mock triggers a passthrough. The passthrough will cause it to hit the real server without an
    // additional request.
    await expectAsync(
      client.say(
        { sentence: "Passthrough" },
        {
          timeoutMs: 10,
        }
      )
    ).toBeRejectedWithError(ConnectError, /\[deadline_exceeded\]/);
    const response = await client.say({ sentence: "Hello" });
    expect(response.sentence).toBe("Hello again");
  } finally {
    dispose();
  }
});

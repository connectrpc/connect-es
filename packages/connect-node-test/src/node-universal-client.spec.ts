// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { TestService } from "./gen/grpc/testing/test_connectweb.js";
import {
  StreamingOutputCallRequest,
  StreamingOutputCallResponse,
} from "./gen/grpc/testing/messages_pb.js";
import { createTestServers } from "./helpers/testserver.js";
import {
  createJsonSerialization,
  createMethodUrl,
  pipe,
  pipeTo,
  transformJoinEnvelopes,
  transformParseEnvelope,
  transformSerializeEnvelope,
  transformSplitEnvelope,
} from "@bufbuild/connect-core";
import {
  createTrailerSerialization,
  trailerFlag,
} from "@bufbuild/connect-core/protocol-grpc-web";
import {
  createNodeHttp1Client,
  createNodeHttp2Client,
} from "@bufbuild/connect-node";

// TODO remove after migrating node transports to this pattern
describe("node client requests against", () => {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  servers.describeServers(
    [
      "@bufbuild/connect-node (h1)",
      "@bufbuild/connect-node (h1 + tls)",
      "connect-go (h1)",
    ],
    (server) => {
      describe("with gRPC-web server-streaming", function () {
        const method = TestService.methods.streamingOutputCall;
        it("should return expected result", async function () {
          const inputLog: string[] = [];
          const outputLog: string[] = [];
          // eslint-disable-next-line @typescript-eslint/require-await
          async function* input() {
            try {
              inputLog.push("yield size 1");
              yield new StreamingOutputCallRequest({
                responseParameters: [{ size: 1 }],
              });
            } catch (e) {
              inputLog.push("saw " + String(e));
            } finally {
              inputLog.push("finally");
            }
          }
          const client = createNodeHttp1Client({
            rejectUnauthorized: false,
          });
          const res = await client({
            url: createMethodUrl(server.getUrl(), TestService, method),
            method: "POST",
            header: new Headers({
              "Content-Type": "application/grpc-web+json",
            }),
            body: pipe(
              input(),
              transformSerializeEnvelope(
                createJsonSerialization(method.I, {}),
                Number.MAX_SAFE_INTEGER
              ),
              transformJoinEnvelopes(),
              {
                propagateDownStreamError: true,
              }
            ),
          });
          expect(res.status).toBe(200);
          await pipeTo(
            res.body,
            transformSplitEnvelope(Number.MAX_SAFE_INTEGER),
            transformParseEnvelope<StreamingOutputCallResponse, Headers>(
              createJsonSerialization(method.O, {}),
              trailerFlag,
              createTrailerSerialization()
            ),
            async (iterable) => {
              for await (const chunk of iterable) {
                if (!chunk.end) {
                  outputLog.push(
                    `received size ${
                      chunk.value.payload?.body.byteLength ?? "?"
                    }`
                  );
                } else {
                  outputLog.push("received end-stream");
                }
              }
            },
            {
              propagateDownStreamError: false,
            }
          );
          expect(listHeaderKeys(res.trailer).length).toBe(0);
          expect(inputLog).toEqual(["yield size 1", "finally"]);
          expect(outputLog).toEqual(["received size 1", "received end-stream"]);
        });
      });
    }
  );

  servers.describeServers(
    [
      "@bufbuild/connect-node (h2c)",
      "@bufbuild/connect-node (h2)",
      "connect-go (h2)",
    ],
    (server) => {
      describe("with gRPC-web bidi-streaming", function () {
        const method = TestService.methods.fullDuplexCall;
        it("should return expected result", async function () {
          const inputLog: string[] = [];
          const outputLog: string[] = [];
          // eslint-disable-next-line @typescript-eslint/require-await
          async function* input() {
            try {
              inputLog.push("yield size 1");
              yield new StreamingOutputCallRequest({
                responseParameters: [{ size: 1 }],
              });
              inputLog.push("yield size 2");
              yield new StreamingOutputCallRequest({
                responseParameters: [{ size: 2 }],
              });
              inputLog.push("yield size 3");
              yield new StreamingOutputCallRequest({
                responseParameters: [{ size: 3 }],
              });
            } catch (e) {
              inputLog.push("saw " + String(e));
            } finally {
              inputLog.push("finally");
            }
          }
          const client = createNodeHttp2Client(server.getUrl(), true, {
            rejectUnauthorized: false,
          });
          const res = await client({
            url: createMethodUrl(server.getUrl(), TestService, method),
            method: "POST",
            header: new Headers({
              "Content-Type": "application/grpc-web+json",
            }),
            body: pipe(
              input(),
              transformSerializeEnvelope(
                createJsonSerialization(method.I, {}),
                Number.MAX_SAFE_INTEGER
              ),
              transformJoinEnvelopes(),
              {
                propagateDownStreamError: true,
              }
            ),
          });
          expect(res.status).toBe(200);
          await pipeTo(
            res.body,
            transformSplitEnvelope(Number.MAX_SAFE_INTEGER),
            transformParseEnvelope<StreamingOutputCallResponse, Headers>(
              createJsonSerialization(method.O, {}),
              trailerFlag,
              createTrailerSerialization()
            ),
            async (iterable) => {
              for await (const chunk of iterable) {
                if (!chunk.end) {
                  outputLog.push(
                    `received size ${
                      chunk.value.payload?.body.byteLength ?? "?"
                    }`
                  );
                } else {
                  outputLog.push("received end-stream");
                }
              }
            },
            {
              propagateDownStreamError: false,
            }
          );
          expect(listHeaderKeys(res.trailer).length).toBe(0);
          expect(inputLog).toEqual([
            "yield size 1",
            "yield size 2",
            "yield size 3",
            "finally",
          ]);
          expect(outputLog).toEqual([
            "received size 1",
            "received size 2",
            "received size 3",
            "received end-stream",
          ]);
        });
      });
    }
  );

  afterAll(async () => await servers.stop());
});

function listHeaderKeys(header: Headers): string[] {
  const keys: string[] = [];
  header.forEach((_, key) => keys.push(key));
  return keys;
}

// Copyright 2021-2022 Buf Technologies, Inc.
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

import { baseUrl } from "../util/crosstestserver.js";
import { TestService } from "../gen/grpc/testing/test_connectweb.js";
import { encodeEnvelopes } from "@bufbuild/connect-web";

describe("fetch API", () => {
  const unaryUrl = `${baseUrl}/${TestService.typeName}/${TestService.methods.unaryCall.name}`;
  const serverStreamingUrl = `${baseUrl}/${TestService.typeName}/${TestService.methods.streamingOutputCall.name}`;
  it("should be available", async () => {
    const response = await fetch(unaryUrl, {
      method: "POST",
      body: "{}",
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(response.status).toBe(200);
    const bodyText = await response.text();
    expect(bodyText).toBe(`{"payload":{}}`);
  });
  xit("unsupported unary request content encoding raises HTTP 500 with explanatory error message", async () => {
    const response = await fetch(unaryUrl, {
      method: "POST",
      body: "{}",
      headers: {
        "Content-Type": "application/json",
        "Content-Encoding": "WRONG",
      },
    });
    expect(response.status).toBe(500);
    const bodyText = await response.text();
    expect(bodyText).toBe(
      `{"code":"unimplemented","message":"unknown compression \\"WRONG\\": supported encodings are gzip"}`
    );
  });
  xit("unsupported server streaming request content encoding raises HTTP 500 with explanatory error message", async () => {
    const response = await fetch(serverStreamingUrl, {
      method: "POST",
      body: encodeEnvelopes({
        data: new TextEncoder().encode("{}"),
        flags: 0,
      }),
      headers: {
        "Content-Type": "application/connect+json",
        "connect-content-encoding": "WRONG",
      },
    });
    expect(response.status).toBe(500);
    const bodyText = await response.text();
    expect(bodyText).toBe(`???`);
  });
  it("unexpected request content type for unary is 415 response", async () => {
    const response = await fetch(unaryUrl, {
      method: "POST",
      body: "{}",
      headers: {
        "Content-Type": "application/WRONG",
      },
    });
    expect(response.status).toBe(415);
    const bodyText = await response.text();
    expect(bodyText).toBe("");
  });
});

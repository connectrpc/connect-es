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

import { Int32Value, MethodKind, StringValue } from "@bufbuild/protobuf";
import { ConnectError, connectErrorFromReason } from "./connect-error.js";
import {
  createBiDiStreamingFn,
  createClientStreamingFn,
  createServerStreamingFn,
} from "./promise-client.js";
import { Code } from "./code.js";
import { stubTransport } from "./transport-stub.js";

const TestService = {
  typeName: "handwritten.TestService",
  methods: {
    clientStream: {
      name: "ClientStream",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.ClientStreaming,
    },
    serverStream: {
      name: "ServerStream",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.ServerStreaming,
    },
    bidiStream: {
      name: "BidiStream",
      I: Int32Value,
      O: StringValue,
      kind: MethodKind.BiDiStreaming,
    },
  },
} as const;

describe("createClientStreamingFn()", function () {
  it("works as expected on the happy path", async () => {
    const transport = stubTransport({});
    const fn = createClientStreamingFn(
      transport,
      TestService,
      TestService.methods.clientStream
    );
    const call = await fn();

    let sendOk = await call.send(new Int32Value({ value: 123 }));
    expect(sendOk).toBe(true);
    expect(call.sendError).toBeUndefined();

    sendOk = await call.close();
    expect(sendOk).toBe(true);
    expect(call.sendError).toBeUndefined();

    const res = await call.receive();
    expect(res).toBeDefined();
  });
  it("works as expected on early close on the server", async () => {
    const transport = stubTransport({
      streamSend: [
        null,
        new ConnectError("stream ended, cannot write", Code.Aborted),
      ],
      streamClose: new ConnectError("stream ended, cannot close", Code.Aborted),
      streamRead: [new ConnectError("server message", Code.ResourceExhausted)],
    });
    const fn = createClientStreamingFn(
      transport,
      TestService,
      TestService.methods.clientStream
    );
    const call = await fn();

    let sendOk = await call.send(new Int32Value({ value: 123 }));
    expect(sendOk).toBe(true);
    expect(call.sendError).toBeUndefined();

    sendOk = await call.send(new Int32Value({ value: 123 }));
    expect(sendOk).toBe(false);
    expect(call.sendError).toBeDefined();
    expect(call.sendError?.code).toBe(Code.Aborted);
    expect(call.sendError?.message).toBe(
      "[aborted] stream ended, cannot write"
    );

    sendOk = await call.close();
    expect(sendOk).toBe(false);
    expect(call.sendError).toBeDefined();
    expect(call.sendError?.code).toBe(Code.Aborted);
    expect(call.sendError?.message).toBe(
      "[aborted] stream ended, cannot close"
    );

    try {
      await call.receive();
      fail("expected error");
    } catch (e) {
      expect(e).toBeInstanceOf(ConnectError);
      const err = connectErrorFromReason(e);
      expect(err.message).toBe("[resource_exhausted] server message");
    }
  });
});

describe("createServerStreamingFn()", function () {
  it("works as expected on the happy path", async () => {
    const transport = stubTransport({
      streamRead: [null, null, null],
    });
    const fn = createServerStreamingFn(
      transport,
      TestService,
      TestService.methods.serverStream
    );
    const receivedMessages: StringValue[] = [];
    for await (const res of fn(new Int32Value({ value: 123 }))) {
      receivedMessages.push(res);
    }
    expect(receivedMessages.length).toBe(3);
  });
  it("works as expected on early close on the server", async () => {
    const transport = stubTransport({
      streamSend: [
        new ConnectError("stream ended, cannot write", Code.Aborted),
      ],
      streamClose: new ConnectError("stream ended, cannot close", Code.Aborted),
      streamRead: [new ConnectError("server message", Code.ResourceExhausted)],
    });
    const fn = createServerStreamingFn(
      transport,
      TestService,
      TestService.methods.serverStream
    );
    try {
      for await (const res of fn(new Int32Value({ value: 123 }))) {
        fail("expected error");
        expect(res).toBeDefined(); // only to satisfy type checks
      }
    } catch (e) {
      expect(e).toBeInstanceOf(ConnectError);
      const err = connectErrorFromReason(e);
      expect(err.message).toBe("[resource_exhausted] server message");
    }
  });
  it("does not ignore send errors other than Code.Aborted", async () => {
    const transport = stubTransport({
      streamSend: [new ConnectError("client message", Code.InvalidArgument)],
    });
    const fn = createServerStreamingFn(
      transport,
      TestService,
      TestService.methods.serverStream
    );
    try {
      for await (const res of fn(new Int32Value({ value: 123 }))) {
        fail("expected error");
        expect(res).toBeDefined(); // only to satisfy type checks
      }
    } catch (e) {
      expect(e).toBeInstanceOf(ConnectError);
      const err = connectErrorFromReason(e);
      expect(err.message).toBe("[invalid_argument] client message");
    }
  });
  it("does not ignore close errors other than Code.Aborted", async () => {
    const transport = stubTransport({
      streamClose: new ConnectError("client message", Code.InvalidArgument),
    });
    const fn = createServerStreamingFn(
      transport,
      TestService,
      TestService.methods.serverStream
    );
    try {
      for await (const res of fn(new Int32Value({ value: 123 }))) {
        fail("expected error");
        expect(res).toBeDefined(); // only to satisfy type checks
      }
    } catch (e) {
      expect(e).toBeInstanceOf(ConnectError);
      const err = connectErrorFromReason(e);
      expect(err.message).toBe("[invalid_argument] client message");
    }
  });
});

describe("createBiDiStreamingFn()", () => {
  it("works as expected on the happy path", async () => {
    const transport = stubTransport({
      streamSend: [null, null, null],
      streamRead: [null, null, null],
    });
    const fn = createBiDiStreamingFn(
      transport,
      TestService,
      TestService.methods.bidiStream
    );
    const call = await fn();

    let sendOk = await call.send(new Int32Value({ value: 123 }));
    expect(sendOk).toBe(true);
    expect(call.sendError).toBeUndefined();

    let res = await call.receive();
    expect(res).toBeInstanceOf(StringValue);

    sendOk = await call.send(new Int32Value({ value: 123 }));
    expect(sendOk).toBe(true);
    expect(call.sendError).toBeUndefined();

    res = await call.receive();
    expect(res).toBeInstanceOf(StringValue);

    sendOk = await call.close();
    expect(sendOk).toBe(true);
    expect(call.sendError).toBeUndefined();

    res = await call.receive();
    expect(res).toBeInstanceOf(StringValue);

    res = await call.receive();
    expect(res).toBeNull();
  });
  it("works as expected on early close on the server", async () => {
    const transport = stubTransport({
      streamSend: [
        null,
        new ConnectError("stream ended, cannot write", Code.Aborted),
      ],
      streamClose: new ConnectError("stream ended, cannot close", Code.Aborted),
      streamRead: [new ConnectError("server message", Code.ResourceExhausted)],
    });
    const fn = createBiDiStreamingFn(
      transport,
      TestService,
      TestService.methods.bidiStream
    );
    const call = await fn();

    let sendOk = await call.send(new Int32Value({ value: 123 }));
    expect(sendOk).toBe(true);
    expect(call.sendError).toBeUndefined();

    sendOk = await call.send(new Int32Value({ value: 123 }));
    expect(sendOk).toBe(false);
    expect(call.sendError).toBeDefined();
    expect(call.sendError?.code).toBe(Code.Aborted);
    expect(call.sendError?.message).toBe(
      "[aborted] stream ended, cannot write"
    );

    sendOk = await call.close();
    expect(sendOk).toBe(false);
    expect(call.sendError).toBeDefined();
    expect(call.sendError?.code).toBe(Code.Aborted);
    expect(call.sendError?.message).toBe(
      "[aborted] stream ended, cannot close"
    );

    try {
      await call.receive();
      fail("expected error");
    } catch (e) {
      expect(e).toBeInstanceOf(ConnectError);
      const err = connectErrorFromReason(e);
      expect(err.message).toBe("[resource_exhausted] server message");
    }
  });
});

// Copyright 2021-2024 The Connect Authors
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

import { ConformanceService } from "@connectrpc/connect-conformance";
import * as grpc from "@grpc/grpc-js";
import { addGrpcService } from "./add-grpc-service.js";

/* eslint-disable @typescript-eslint/no-unused-vars */

describe("addGrpcService()", () => {
  it("should not raise errors when adding the service", (done) => {
    const server = new grpc.Server();
    addGrpcService(server, ConformanceService, {
      unimplemented(call) {
        //
      },
      idempotentUnary(call, callback) {
        //
      },
      bidiStream(call) {
        //
      },
      clientStream(call, callback) {
        //
      },
      serverStream(call) {
        //
      },
      unary(call, callback) {
        //
      },
    });
    server.bindAsync(
      "0.0.0.0:8099",
      grpc.ServerCredentials.createInsecure(),
      (err: Error | null) => {
        if (err) {
          fail(err);
        } else {
          server.start();
          server.forceShutdown();
          done();
        }
      },
    );
  });
});

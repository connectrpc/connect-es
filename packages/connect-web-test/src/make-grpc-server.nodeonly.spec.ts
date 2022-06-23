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

import { TestService } from "./gen/grpc/testing/test_connectweb.js";
import * as grpc from "@grpc/grpc-js";
import { addGrpcService } from "./util/make-grpc-server.nodeonly.js";

/* eslint-disable @typescript-eslint/no-unused-vars */

describe("addGrpcService()", () => {
  it("should not raise errors when adding the service", (done) => {
    const server = new grpc.Server();
    addGrpcService(server, TestService, {
      cacheableUnaryCall(call, callback) {
        //
      },
      emptyCall(call, callback) {
        //
      },
      failStreamingOutputCall(call) {
        //
      },
      failUnaryCall(call, callback) {
        //
      },
      fullDuplexCall(call) {
        //
      },
      halfDuplexCall(call) {
        //
      },
      streamingInputCall(call, callback) {
        //
      },
      streamingOutputCall(call) {
        //
      },
      unaryCall(call, callback) {
        //
      },
      unimplementedCall(call, callback) {
        //
      },
      unimplementedStreamingOutputCall(call) {
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
      }
    );
  });
});

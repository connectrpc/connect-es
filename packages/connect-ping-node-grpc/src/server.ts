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

import * as grpc from "@grpc/grpc-js";
import {
  CountUpResponse,
  CumSumRequest,
  CumSumResponse,
  FailResponse,
  PingResponse,
  SumRequest,
  SumResponse,
} from "./gen/connect/ping/v1/ping_pb.js";
import { PingService } from "./gen/connect/ping/v1/ping_connectweb.js";
import { addGrpcService } from "./make-grpc-server.js";

const server = new grpc.Server();

addGrpcService(server, PingService, {
  ping(call, callback) {
    const trailers = new grpc.Metadata();
    trailers.add("foo", "bar");
    call.sendMetadata(trailers);
    const error: grpc.ServerErrorResponse | Partial<grpc.StatusObject> | null =
      null;
    const value: PingResponse | null = new PingResponse({
      number: call.request.number,
      text: call.request.text,
    });
    const trailer: grpc.Metadata | undefined = undefined;
    const flags: number | undefined = undefined;
    callback(error, value, trailer, flags);
  },
  fail(call, callback) {
    const metadata = new grpc.Metadata();
    metadata.add("foo", "bar");
    const error: grpc.ServerErrorResponse | Partial<grpc.StatusObject> | null =
      {
        code: call.request.code,
        details: "exemplary failure message",
        metadata,
      };
    const value: FailResponse | null = null;
    const trailer: grpc.Metadata | undefined = undefined;
    const flags: number | undefined = undefined;
    callback(error, value, trailer, flags);
  },
  sum(call, callback) {
    let sum = 0n;
    call.on("error", (args) => {
      process.stderr.write(
        `@grpc/grpc-js gave us a call error: ${String(args)}\n`
      );
    });
    call.on("data", (args) => {
      if (args instanceof SumRequest) {
        sum += args.number;
      } else {
        process.stderr.write(
          `expected @grpc/grpc-js to give us a SumRequest, but got something else instead\n`
        );
      }
    });
    call.on("end", () => {
      const error:
        | grpc.ServerErrorResponse
        | Partial<grpc.StatusObject>
        | null = null;
      const value: SumResponse | null = new SumResponse({
        sum: sum,
      });
      const trailer: grpc.Metadata | undefined = undefined;
      const flags: number | undefined = undefined;
      callback(error, value, trailer, flags);
    });
  },
  countUp(call) {
    let number = 0n;
    function send() {
      number++;
      const response = new CountUpResponse({
        number,
      });
      call.write(response, () => {
        if (number >= call.request.number) {
          call.end();
        } else {
          send();
        }
      });
    }
    send();
  },
  cumSum(call) {
    let sum = 0n;
    call.on("error", (args) => {
      process.stderr.write(
        `@grpc/grpc-js gave us a call error: ${String(args)}\n`
      );
    });
    call.on("data", (args) => {
      if (!(args instanceof CumSumRequest)) {
        process.stderr.write(
          `expected @grpc/grpc-js to give us a SumRequest, but got something else instead\n`
        );
        return;
      }
      sum += args.number;
      call.write(
        new CumSumResponse({
          sum,
        })
      );
    });
    call.on("end", () => {
      //
      call.end();
    });
  },
});

server.bindAsync(
  "0.0.0.0:5002",
  grpc.ServerCredentials.createInsecure(),
  (err: Error | null, port: number) => {
    if (err) {
      process.stderr.write(`Server failed to bind: ${err.message}\n`);
    } else {
      process.stderr.write(`Server bound on port: ${port}\n`);
      server.start();
    }
  }
);

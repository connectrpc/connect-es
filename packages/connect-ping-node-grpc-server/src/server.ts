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
  CountUpRequest,
  CountUpResponse,
  CumSumRequest,
  CumSumResponse,
  FailRequest,
  FailResponse,
  PingRequest,
  PingResponse,
  SumRequest,
  SumResponse,
} from "./gen/proto/connect/ping/v1/ping_pb.js";
import { PingService } from "./gen/proto/connect/ping/v1/ping_connectweb.js";

const server = new grpc.Server();

const pingServiceImplementation = {
  ping(
    call: grpc.ServerUnaryCall<PingRequest, PingResponse>,
    callback: grpc.sendUnaryData<PingResponse>
  ): void {
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
  fail(
    call: grpc.ServerUnaryCall<FailRequest, FailResponse>,
    callback: grpc.sendUnaryData<FailResponse>
  ): void {
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
  sum(
    call: grpc.ServerReadableStream<SumRequest, SumResponse>,
    callback: grpc.sendUnaryData<SumResponse>
  ): void {
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
  countUp(
    call: grpc.ServerWritableStream<CountUpRequest, CountUpResponse>
  ): void {
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
  cumSum(call: grpc.ServerDuplexStream<CumSumRequest, CumSumResponse>): void {
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
};

export const pingServiceDefinition: grpc.ServiceDefinition<
  typeof pingServiceImplementation
> = {
  ping: {
    path: `/${PingService.typeName}/${PingService.methods.ping.name}`,
    originalName: PingService.methods.ping.name,
    requestStream: false,
    responseStream: false,
    responseDeserialize: (bytes) => {
      return PingService.methods.ping.O.fromBinary(bytes);
    },
    requestDeserialize: (bytes) => {
      return PingService.methods.ping.I.fromBinary(bytes);
    },
    responseSerialize: (value) => {
      if (value instanceof PingService.methods.ping.O) {
        return Buffer.from(value.toBinary());
      }
      throw new Error("cannot responseSerialize");
    },
    requestSerialize: (value) => {
      if (value instanceof PingService.methods.ping.I) {
        return Buffer.from(value.toBinary());
      }
      throw new Error("cannot requestSerialize");
    },
  },
  fail: {
    path: `/${PingService.typeName}/${PingService.methods.fail.name}`,
    originalName: PingService.methods.fail.name,
    requestStream: false,
    responseStream: false,
    responseDeserialize: (bytes) => {
      return PingService.methods.fail.O.fromBinary(bytes);
    },
    requestDeserialize: (bytes) => {
      return PingService.methods.fail.I.fromBinary(bytes);
    },
    responseSerialize: (value) => {
      if (value instanceof PingService.methods.fail.O) {
        return Buffer.from(value.toBinary());
      }
      throw new Error("cannot responseSerialize");
    },
    requestSerialize: (value) => {
      if (value instanceof PingService.methods.fail.I) {
        return Buffer.from(value.toBinary());
      }
      throw new Error("cannot requestSerialize");
    },
  },
  sum: {
    path: `/${PingService.typeName}/${PingService.methods.sum.name}`,
    originalName: PingService.methods.sum.name,
    requestStream: true,
    responseStream: false,
    responseDeserialize: (bytes) => {
      return PingService.methods.sum.O.fromBinary(bytes);
    },
    requestDeserialize: (bytes) => {
      return PingService.methods.sum.I.fromBinary(bytes);
    },
    responseSerialize: (value) => {
      if (value instanceof PingService.methods.sum.O) {
        return Buffer.from(value.toBinary());
      }
      throw new Error("cannot responseSerialize");
    },
    requestSerialize: (value) => {
      if (value instanceof PingService.methods.sum.I) {
        return Buffer.from(value.toBinary());
      }
      throw new Error("cannot requestSerialize");
    },
  },
  countUp: {
    path: `/${PingService.typeName}/${PingService.methods.countUp.name}`,
    originalName: PingService.methods.countUp.name,
    requestStream: false,
    responseStream: true,
    responseDeserialize: (bytes) => {
      return PingService.methods.countUp.O.fromBinary(bytes);
    },
    requestDeserialize: (bytes) => {
      return PingService.methods.countUp.I.fromBinary(bytes);
    },
    responseSerialize: (value) => {
      if (value instanceof PingService.methods.countUp.O) {
        return Buffer.from(value.toBinary());
      }
      throw new Error("cannot responseSerialize");
    },
    requestSerialize: (value) => {
      if (value instanceof PingService.methods.countUp.I) {
        return Buffer.from(value.toBinary());
      }
      throw new Error("cannot requestSerialize");
    },
  },
  cumSum: {
    path: `/${PingService.typeName}/${PingService.methods.cumSum.name}`,
    originalName: PingService.methods.cumSum.name,
    requestStream: true,
    responseStream: true,
    responseDeserialize: (bytes) => {
      return PingService.methods.cumSum.O.fromBinary(bytes);
    },
    requestDeserialize: (bytes) => {
      return PingService.methods.cumSum.I.fromBinary(bytes);
    },
    responseSerialize: (value) => {
      if (value instanceof PingService.methods.cumSum.O) {
        return Buffer.from(value.toBinary());
      }
      throw new Error("cannot responseSerialize");
    },
    requestSerialize: (value) => {
      if (value instanceof PingService.methods.cumSum.I) {
        return Buffer.from(value.toBinary());
      }
      throw new Error("cannot requestSerialize");
    },
  },
};

server.addService(pingServiceDefinition, pingServiceImplementation);

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

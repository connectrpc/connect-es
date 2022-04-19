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

import { PingService } from "./gen/connect/ping/v1/ping_connectweb.js";
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
} from "./gen/connect/ping/v1/ping_pb.js";
import { StatusCode } from "@bufbuild/connect-web";
import { makeGrpcClient } from "./make-grpc-client.js";

const grpcClient = makeGrpcClient(PingService, {
  address: "localhost:5002",
  channelCredentials: grpc.ChannelCredentials.createInsecure(),
  clientOptions: {},
  binaryOptions: {},
});

// grpcClient2.ping()

async function callEveryMethod() {
  await ping();
  await fail();
  await sum();
  await countUp();
  await cumSum();
}

callEveryMethod().catch((e) => {
  process.stderr.write(`${e instanceof Error ? e.message : String(e)}\n`);
  process.exit(1);
});

function ping(): Promise<void> {
  process.stdout.write(`ping()\n`);
  return new Promise<void>((resolve, reject) => {
    const req = new PingRequest({
      number: 123n,
      text: "foo",
    });

    const callback: grpc.requestCallback<PingResponse> = (
      err: grpc.ServiceError | null,
      value?: PingResponse
    ) => {
      if (err !== null) {
        reject(`ping() callback error: ${err.message}`);
      } else if (value === undefined) {
        reject(`ping() callback missing value`);
      } else {
        process.stdout.write(
          `ping() callback value: ${value.toJsonString()}\n`
        );
        resolve();
      }
    };

    // grpcClient.ping(req, callback);
    // grpcClient.ping(req, new grpc.Metadata(), callback);
    grpcClient.ping(
      req,
      new grpc.Metadata(),
      {} /*grpc.CallOptions*/,
      callback
    );
  });
}

function fail(): Promise<void> {
  process.stdout.write(`fail()\n`);
  return new Promise<void>((resolve, reject) => {
    const req = new FailRequest({
      code: StatusCode.FailedPrecondition,
    });

    const callback: grpc.requestCallback<FailResponse> = (
      err: grpc.ServiceError | null,
      _value?: FailResponse
    ) => {
      if (err === null) {
        reject("fail() expected to fail but it didn't");
        return;
      }
      if (err.code !== (StatusCode.FailedPrecondition as number)) {
        reject(
          `fail() expected fail to fail with ${
            StatusCode[StatusCode.FailedPrecondition]
          } (${StatusCode.FailedPrecondition}), but got ${err.code}`
        );
        return;
      }
      process.stdout.write(`fail() callback got expected error\n`);
      resolve();
    };

    grpcClient.fail(
      req,
      new grpc.Metadata(),
      {} /*grpc.CallOptions*/,
      callback
    );
  });
}

function sum(): Promise<void> {
  process.stdout.write(`sum()\n`);
  return new Promise<void>((resolve, reject) => {
    const callback: grpc.requestCallback<SumResponse> = (
      err: grpc.ServiceError | null,
      value?: SumResponse
    ) => {
      if (err !== null) {
        process.stderr.write(`sum() callback error: ${err.message}\n`);
        reject(err);
      } else if (value === undefined) {
        process.stdout.write(`sum() callback missing value\n`);
        reject();
      } else {
        process.stdout.write(`sum() callback value: ${value.toJsonString()}\n`);
        resolve();
      }
    };

    const call = grpcClient.sum(
      new grpc.Metadata(),
      {} /* grpc.CallOptions*/,
      callback
    );

    process.stdout.write(`sum() sending message\n`);
    call.write(
      new SumRequest({
        number: 1n,
      }),
      () => {
        process.stdout.write(`sum() sending message\n`);
        call.write(
          new SumRequest({
            number: 2n,
          }),
          () => {
            process.stdout.write(`sum() sending message\n`);
            call.write(
              new SumRequest({
                number: 3n,
              }),
              () => {
                process.stdout.write(`sum() ending stream\n`);
                call.end();
              }
            );
          }
        );
      }
    );
  });
}

function countUp(): Promise<void> {
  process.stdout.write(`countUp()\n`);
  return new Promise((resolve, reject) => {
    const request = new CountUpRequest({
      number: 5n,
    });

    const call = grpcClient.countUp(
      request,
      new grpc.Metadata(),
      {} /* grpc.CallOptions*/
    );

    call.on("data", (arg1) => {
      if (arg1 instanceof CountUpResponse) {
        process.stdout.write(`countUp() data ${arg1.toJsonString()}\n`);
      } else {
        reject(`countUp() data has unexpected type`);
      }
    });

    call.on("error", (arg1) => {
      reject(`countUp() error ${String(arg1)}`);
    });

    call.on("end", () => {
      process.stdout.write(`countUp() end\n`);
      resolve();
    });
  });
}

function cumSum(): Promise<void> {
  process.stdout.write(`cumSum()\n`);
  return new Promise((resolve, reject) => {
    const call = grpcClient.cumSum(
      new grpc.Metadata(),
      {} /* grpc.CallOptions*/
    );

    call.on("data", (arg1) => {
      if (arg1 instanceof CumSumResponse) {
        process.stdout.write(`cumSum() data ${arg1.toJsonString()}\n`);
      } else {
        reject(`cumSum() data has unexpected type`);
      }
    });

    call.on("error", (arg1) => {
      reject(`cumSum() error ${String(arg1)}`);
    });

    call.on("end", () => {
      process.stdout.write(`cumSum() end\n`);
      resolve();
    });

    process.stdout.write(`cumSum() sending message\n`);
    call.write(
      new CumSumRequest({
        number: 1n,
      }),
      () => {
        process.stdout.write(`cumSum() sending message\n`);
        call.write(
          new CumSumRequest({
            number: 2n,
          }),
          () => {
            process.stdout.write(`cumSum() end()\n`);
            call.end();
          }
        );
      }
    );
  });
}

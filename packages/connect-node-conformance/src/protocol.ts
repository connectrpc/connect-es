// Copyright 2021-2023 The Connect Authors
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

import { ConnectError } from "@connectrpc/connect";
import {
  Error as ConformanceError,
  Header as ConformanceHeader,
  ConformancePayload_RequestInfo,
} from "./gen/connectrpc/conformance/v1/service_pb.js";
import { createRegistry, Any, Message } from "@bufbuild/protobuf";

const detailsRegitry = createRegistry(ConformancePayload_RequestInfo);

export function connectErrorFromProto(err: ConformanceError) {
  // The ConnectError constructor accepts messages for details.
  // The conformance error details are the raw google.protobuf.Any messages.
  // We need to unpack the Any messages for connect to represent them accurately.
  return new ConnectError(
    err.message ?? "",
    err.code,
    undefined,
    err.details.map((d) => {
      const m = d.unpack(detailsRegitry);
      if (m === undefined) {
        throw new Error(`Cannot unpack ${d.typeUrl}`);
      }
      return m;
    }),
  );
}

export function convertToProtoError(err: ConnectError | undefined) {
  if (err === undefined) {
    return undefined;
  }
  const details: Any[] = [];
  for (const detail of err.details) {
    if (detail instanceof Message) {
      details.push(Any.pack(detail));
    } else {
      details.push(
        new Any({
          typeUrl: "type.googleapis.com/" + detail.type,
          value: detail.value,
        }),
      );
    }
  }
  return new ConformanceError({
    code: err.code,
    message: err.rawMessage,
    details,
  });
}

export function convertToProtoHeaders(headers: Headers): ConformanceHeader[] {
  const result: ConformanceHeader[] = [];
  headers.forEach((value, key) => {
    result.push(
      new ConformanceHeader({
        name: key,
        value: [value],
      }),
    );
  });
  return result;
}

export function appendProtoHeaders(
  headers: Headers,
  protoHeaders: ConformanceHeader[],
) {
  for (const header of protoHeaders) {
    for (const value of header.value) {
      headers.append(header.name, value);
    }
  }
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

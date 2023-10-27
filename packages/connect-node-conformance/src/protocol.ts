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
} from "./gen/connectrpc/conformance/v1alpha1/service_pb.js";

export function connectErrorFromProto(err: ConformanceError) {
  return new ConnectError(err.message, err.code, undefined, err.details);
}

export function protoHeadersFromHeaders(headers: Headers): ConformanceHeader[] {
  const result: ConformanceHeader[] = [];
  headers.forEach((value, key) => {
    result.push(
      new ConformanceHeader({
        name: key,
        value: value.split(",").map((e) => e.trim()),
      }),
    );
  });
  return result;
}

export function appendHeadersFromProtoHeaders(
  headers: Headers,
  protoHeaders: ConformanceHeader[],
) {
  for (const header of protoHeaders) {
    for (const value of header.value) {
      headers.append(header.name, value);
    }
  }
}

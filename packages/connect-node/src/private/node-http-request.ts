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
import {
  createClientMethodSerializers,
  UnaryRequest,
} from "@bufbuild/connect-core";
import type {
  AnyMessage,
  BinaryReadOptions,
  BinaryWriteOptions,
  JsonReadOptions,
  JsonWriteOptions,
  Message,
} from "@bufbuild/protobuf";
import * as http from "http";
import { webHeaderToNodeHeaders } from "./web-header-to-node-headers.js";

interface NodeRequestOptions<
  I extends Message<I> = AnyMessage,
  O extends Message<O> = AnyMessage
> {
  useBinaryFormat: boolean;

  req: UnaryRequest<I>;

  /**
   * Options for the JSON format.
   */
  jsonOptions?: Partial<JsonReadOptions & JsonWriteOptions>;

  /**
   * Options for the binary wire format.
   */
  binaryOptions?: Partial<BinaryReadOptions & BinaryWriteOptions>;
}

export async function nodeRequest(options: NodeRequestOptions) {
  return new Promise<http.IncomingMessage>((resolve, reject) => {
    const { serialize } = createClientMethodSerializers(
      options.req.method,
      options.useBinaryFormat,
      options.jsonOptions,
      options.binaryOptions
    );

    const endpoint = new URL(options.req.url);
    const encoding = options.useBinaryFormat ? "binary" : "utf8";

    if (endpoint.protocol.includes("https")) {
      throw new Error("Invalid protocol, must use https not http");
    }

    const request = http.request(options.req.url, {
      host: endpoint.hostname,
      port: +endpoint.port,
      headers: webHeaderToNodeHeaders(options.req.header),
      method: "POST",
      path: endpoint.pathname,
      signal: options.req.signal,
      protocol: endpoint.protocol,
    });

    request.on("error", (err) => {
      reject(`request failed ${String(err)}`);
    });

    request.on("response", (res) => {
      return resolve(res);
    });

    request.write(serialize(options.req.message), encoding);
    request.end();
  });
}

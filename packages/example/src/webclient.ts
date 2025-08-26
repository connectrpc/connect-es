// Copyright 2021-2025 The Connect Authors
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

import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { ElizaService } from "./gen/eliza_pb.js";
import { DateSchema } from "./gen/google/type/date_pb.js";
import { create, createRegistry } from "@bufbuild/protobuf";

// Alternatively, use createGrpcWebTransport here for the gRPC-web
// protocol.
const transport = createConnectTransport({
  baseUrl: "/",
  jsonOptions: {
    alwaysEmitImplicit: false,
    ignoreUnknownFields: true,
    useProtoFieldName: true,
    registry: createRegistry(),
  },
  useHttpGet: true,
});

void (async () => {
  const client = createClient(ElizaService, transport);
  const sentence = "hello";
  const date = create(DateSchema, {
    year: 2010,
    month: 8,
    day: 26,
  });
  console.log({ date });
  const res = await client.say({ sentence, date: date });
  console.log({ res });
})();

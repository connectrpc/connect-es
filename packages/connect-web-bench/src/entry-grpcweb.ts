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

import { ElizaServiceClient } from "./gen/grpcweb/connectrpc/eliza/v1/eliza_grpc_web_pb.js";

const client = new ElizaServiceClient("https://demo.connectrpc.com");

// eslint-disable-next-line no-console -- log statement makes sure the variable is in use
console.log(client);

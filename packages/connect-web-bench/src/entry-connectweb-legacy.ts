// Copyright 2021-2023 Buf Technologies, Inc.
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
  createPromiseClient,
  createConnectTransport,
} from "@bufbuild/connect-web";
import { ElizaService } from "./gen/connectweb/buf/connect/demo/eliza/v1/eliza_connectweb.js";

const client = createPromiseClient(
  ElizaService,
  createConnectTransport({
    baseUrl: "https://demo.connect.build",
  })
);

// eslint-disable-next-line no-console -- log statement makes sure the variable is in use
console.log(client);

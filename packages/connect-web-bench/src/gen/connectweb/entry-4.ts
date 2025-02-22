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

import { createConnectTransport } from "@connectrpc/connect-web";
import { createClient } from "@connectrpc/connect";
import { CommitService } from "./buf/registry/module/v1/commit_service_pb";
import { DownloadService } from "./buf/registry/module/v1/download_service_pb";
import { GraphService } from "./buf/registry/module/v1/graph_service_pb";

/* eslint-disable no-console */

/**
 * Calls 4 RPCs with Connect-Web
 */
export async function call() {
  const transport = createConnectTransport({
    baseUrl: "https://buf.build/",
  });
  const commitClient = createClient(CommitService, transport);
  console.log(await commitClient.getCommits({}));
  console.log(await commitClient.listCommits({}));
  const downloadClient = createClient(DownloadService, transport);
  console.log(await downloadClient.download({}));
  const graphClient = createClient(GraphService, transport);
  console.log(await graphClient.getGraph({}));
}

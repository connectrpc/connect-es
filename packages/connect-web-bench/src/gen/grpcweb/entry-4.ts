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

import { CommitServicePromiseClient } from "./buf/registry/module/v1/commit_service_grpc_web_pb";
import { GetCommitsRequest, ListCommitsRequest } from "./buf/registry/module/v1/commit_service_pb";
import { DownloadServicePromiseClient } from "./buf/registry/module/v1/download_service_grpc_web_pb";
import { DownloadRequest } from "./buf/registry/module/v1/download_service_pb";
import { GraphServicePromiseClient } from "./buf/registry/module/v1/graph_service_grpc_web_pb";
import { GetGraphRequest } from "./buf/registry/module/v1/graph_service_pb";

/* eslint-disable no-console */

/**
 * Calls 4 RPCs with gRPC-Web
 */
export async function call() {
  const hostname = "https://buf.build/";
  const commitClient = new CommitServicePromiseClient(hostname);
  console.log(await commitClient.getCommits(new GetCommitsRequest()));
  console.log(await commitClient.listCommits(new ListCommitsRequest()));
  const downloadClient = new DownloadServicePromiseClient(hostname);
  console.log(await downloadClient.download(new DownloadRequest()));
  const graphClient = new GraphServicePromiseClient(hostname);
  console.log(await graphClient.getGraph(new GetGraphRequest()));
}

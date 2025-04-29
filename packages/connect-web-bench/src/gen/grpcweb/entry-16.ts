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
import { LabelServicePromiseClient } from "./buf/registry/module/v1/label_service_grpc_web_pb";
import { ArchiveLabelsRequest, CreateOrUpdateLabelsRequest, GetLabelsRequest, ListLabelHistoryRequest, ListLabelsRequest, UnarchiveLabelsRequest } from "./buf/registry/module/v1/label_service_pb";
import { ModuleServicePromiseClient } from "./buf/registry/module/v1/module_service_grpc_web_pb";
import { CreateModulesRequest, DeleteModulesRequest, GetModulesRequest, ListModulesRequest, UpdateModulesRequest } from "./buf/registry/module/v1/module_service_pb";
import { ResourceServicePromiseClient } from "./buf/registry/module/v1/resource_service_grpc_web_pb";
import { GetResourcesRequest } from "./buf/registry/module/v1/resource_service_pb";

/**
 * Calls 16 RPCs with gRPC-Web
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
  const labelClient = new LabelServicePromiseClient(hostname);
  console.log(await labelClient.getLabels(new GetLabelsRequest()));
  console.log(await labelClient.listLabels(new ListLabelsRequest()));
  console.log(await labelClient.listLabelHistory(new ListLabelHistoryRequest()));
  console.log(await labelClient.createOrUpdateLabels(new CreateOrUpdateLabelsRequest()));
  console.log(await labelClient.archiveLabels(new ArchiveLabelsRequest()));
  console.log(await labelClient.unarchiveLabels(new UnarchiveLabelsRequest()));
  const moduleClient = new ModuleServicePromiseClient(hostname);
  console.log(await moduleClient.getModules(new GetModulesRequest()));
  console.log(await moduleClient.listModules(new ListModulesRequest()));
  console.log(await moduleClient.createModules(new CreateModulesRequest()));
  console.log(await moduleClient.updateModules(new UpdateModulesRequest()));
  console.log(await moduleClient.deleteModules(new DeleteModulesRequest()));
  const resourceClient = new ResourceServicePromiseClient(hostname);
  console.log(await resourceClient.getResources(new GetResourcesRequest()));
}

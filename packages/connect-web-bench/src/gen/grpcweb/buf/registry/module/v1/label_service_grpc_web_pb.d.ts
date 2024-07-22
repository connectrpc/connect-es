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

import * as grpcWeb from 'grpc-web';

import * as buf_registry_module_v1_label_service_pb from '../../../../buf/registry/module/v1/label_service_pb'; // proto import: "buf/registry/module/v1/label_service.proto"


export class LabelServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getLabels(
    request: buf_registry_module_v1_label_service_pb.GetLabelsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_registry_module_v1_label_service_pb.GetLabelsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_registry_module_v1_label_service_pb.GetLabelsResponse>;

  listLabels(
    request: buf_registry_module_v1_label_service_pb.ListLabelsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_registry_module_v1_label_service_pb.ListLabelsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_registry_module_v1_label_service_pb.ListLabelsResponse>;

  listLabelHistory(
    request: buf_registry_module_v1_label_service_pb.ListLabelHistoryRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_registry_module_v1_label_service_pb.ListLabelHistoryResponse) => void
  ): grpcWeb.ClientReadableStream<buf_registry_module_v1_label_service_pb.ListLabelHistoryResponse>;

  createOrUpdateLabels(
    request: buf_registry_module_v1_label_service_pb.CreateOrUpdateLabelsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_registry_module_v1_label_service_pb.CreateOrUpdateLabelsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_registry_module_v1_label_service_pb.CreateOrUpdateLabelsResponse>;

  archiveLabels(
    request: buf_registry_module_v1_label_service_pb.ArchiveLabelsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_registry_module_v1_label_service_pb.ArchiveLabelsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_registry_module_v1_label_service_pb.ArchiveLabelsResponse>;

  unarchiveLabels(
    request: buf_registry_module_v1_label_service_pb.UnarchiveLabelsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_registry_module_v1_label_service_pb.UnarchiveLabelsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_registry_module_v1_label_service_pb.UnarchiveLabelsResponse>;

}

export class LabelServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getLabels(
    request: buf_registry_module_v1_label_service_pb.GetLabelsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_registry_module_v1_label_service_pb.GetLabelsResponse>;

  listLabels(
    request: buf_registry_module_v1_label_service_pb.ListLabelsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_registry_module_v1_label_service_pb.ListLabelsResponse>;

  listLabelHistory(
    request: buf_registry_module_v1_label_service_pb.ListLabelHistoryRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_registry_module_v1_label_service_pb.ListLabelHistoryResponse>;

  createOrUpdateLabels(
    request: buf_registry_module_v1_label_service_pb.CreateOrUpdateLabelsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_registry_module_v1_label_service_pb.CreateOrUpdateLabelsResponse>;

  archiveLabels(
    request: buf_registry_module_v1_label_service_pb.ArchiveLabelsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_registry_module_v1_label_service_pb.ArchiveLabelsResponse>;

  unarchiveLabels(
    request: buf_registry_module_v1_label_service_pb.UnarchiveLabelsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_registry_module_v1_label_service_pb.UnarchiveLabelsResponse>;

}


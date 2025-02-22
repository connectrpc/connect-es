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

import * as grpcWeb from 'grpc-web';

import * as buf_registry_owner_v1_owner_service_pb from '../../../../buf/registry/owner/v1/owner_service_pb'; // proto import: "buf/registry/owner/v1/owner_service.proto"


export class OwnerServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getOwners(
    request: buf_registry_owner_v1_owner_service_pb.GetOwnersRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_registry_owner_v1_owner_service_pb.GetOwnersResponse) => void
  ): grpcWeb.ClientReadableStream<buf_registry_owner_v1_owner_service_pb.GetOwnersResponse>;

}

export class OwnerServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getOwners(
    request: buf_registry_owner_v1_owner_service_pb.GetOwnersRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_registry_owner_v1_owner_service_pb.GetOwnersResponse>;

}


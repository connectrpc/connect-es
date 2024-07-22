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

import * as jspb from 'google-protobuf'

import * as buf_registry_module_v1beta1_commit_pb from '../../../../buf/registry/module/v1beta1/commit_pb'; // proto import: "buf/registry/module/v1beta1/commit.proto"
import * as buf_registry_priv_extension_v1beta1_extension_pb from '../../../../buf/registry/priv/extension/v1beta1/extension_pb'; // proto import: "buf/registry/priv/extension/v1beta1/extension.proto"
import * as buf_validate_validate_pb from '../../../../buf/validate/validate_pb'; // proto import: "buf/validate/validate.proto"


export class Graph extends jspb.Message {
  getCommitsList(): Array<Graph.Commit>;
  setCommitsList(value: Array<Graph.Commit>): Graph;
  clearCommitsList(): Graph;
  addCommits(value?: Graph.Commit, index?: number): Graph.Commit;

  getEdgesList(): Array<Graph.Edge>;
  setEdgesList(value: Array<Graph.Edge>): Graph;
  clearEdgesList(): Graph;
  addEdges(value?: Graph.Edge, index?: number): Graph.Edge;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Graph.AsObject;
  static toObject(includeInstance: boolean, msg: Graph): Graph.AsObject;
  static serializeBinaryToWriter(message: Graph, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Graph;
  static deserializeBinaryFromReader(message: Graph, reader: jspb.BinaryReader): Graph;
}

export namespace Graph {
  export type AsObject = {
    commitsList: Array<Graph.Commit.AsObject>,
    edgesList: Array<Graph.Edge.AsObject>,
  }

  export class Commit extends jspb.Message {
    getCommit(): buf_registry_module_v1beta1_commit_pb.Commit | undefined;
    setCommit(value?: buf_registry_module_v1beta1_commit_pb.Commit): Commit;
    hasCommit(): boolean;
    clearCommit(): Commit;

    getRegistry(): string;
    setRegistry(value: string): Commit;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Commit.AsObject;
    static toObject(includeInstance: boolean, msg: Commit): Commit.AsObject;
    static serializeBinaryToWriter(message: Commit, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Commit;
    static deserializeBinaryFromReader(message: Commit, reader: jspb.BinaryReader): Commit;
  }

  export namespace Commit {
    export type AsObject = {
      commit?: buf_registry_module_v1beta1_commit_pb.Commit.AsObject,
      registry: string,
    }
  }


  export class Node extends jspb.Message {
    getCommitId(): string;
    setCommitId(value: string): Node;

    getRegistry(): string;
    setRegistry(value: string): Node;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Node.AsObject;
    static toObject(includeInstance: boolean, msg: Node): Node.AsObject;
    static serializeBinaryToWriter(message: Node, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Node;
    static deserializeBinaryFromReader(message: Node, reader: jspb.BinaryReader): Node;
  }

  export namespace Node {
    export type AsObject = {
      commitId: string,
      registry: string,
    }
  }


  export class Edge extends jspb.Message {
    getFromNode(): Graph.Node | undefined;
    setFromNode(value?: Graph.Node): Edge;
    hasFromNode(): boolean;
    clearFromNode(): Edge;

    getToNode(): Graph.Node | undefined;
    setToNode(value?: Graph.Node): Edge;
    hasToNode(): boolean;
    clearToNode(): Edge;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Edge.AsObject;
    static toObject(includeInstance: boolean, msg: Edge): Edge.AsObject;
    static serializeBinaryToWriter(message: Edge, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Edge;
    static deserializeBinaryFromReader(message: Edge, reader: jspb.BinaryReader): Edge;
  }

  export namespace Edge {
    export type AsObject = {
      fromNode?: Graph.Node.AsObject,
      toNode?: Graph.Node.AsObject,
    }
  }

}


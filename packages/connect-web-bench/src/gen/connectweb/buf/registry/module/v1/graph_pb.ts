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

// @generated by protoc-gen-es v2.6.0 with parameter "target=ts"
// @generated from file buf/registry/module/v1/graph.proto (package buf.registry.module.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv2";
import type { Commit } from "./commit_pb";
import { file_buf_registry_module_v1_commit } from "./commit_pb";
import { file_buf_registry_priv_extension_v1beta1_extension } from "../../priv/extension/v1beta1/extension_pb";
import { file_buf_validate_validate } from "../../../validate/validate_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file buf/registry/module/v1/graph.proto.
 */
export const file_buf_registry_module_v1_graph: GenFile = /*@__PURE__*/
  fileDesc("CiJidWYvcmVnaXN0cnkvbW9kdWxlL3YxL2dyYXBoLnByb3RvEhZidWYucmVnaXN0cnkubW9kdWxlLnYxIqoCCgVHcmFwaBI5Cgdjb21taXRzGAEgAygLMh4uYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5Db21taXRCCLpIBZIBAggBEjEKBWVkZ2VzGAIgAygLMiIuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5HcmFwaC5FZGdlGiYKBE5vZGUSHgoJY29tbWl0X2lkGAEgASgJQgu6SAjIAQFyA4gCARqCAQoERWRnZRI9Cglmcm9tX25vZGUYASABKAsyIi5idWYucmVnaXN0cnkubW9kdWxlLnYxLkdyYXBoLk5vZGVCBrpIA8gBARI7Cgd0b19ub2RlGAIgASgLMiIuYnVmLnJlZ2lzdHJ5Lm1vZHVsZS52MS5HcmFwaC5Ob2RlQga6SAPIAQE6BurFKwIQAUJOWkxidWYuYnVpbGQvZ2VuL2dvL2J1ZmJ1aWxkL3JlZ2lzdHJ5L3Byb3RvY29sYnVmZmVycy9nby9idWYvcmVnaXN0cnkvbW9kdWxlL3YxYgZwcm90bzM", [file_buf_registry_module_v1_commit, file_buf_registry_priv_extension_v1beta1_extension, file_buf_validate_validate]);

/**
 * A dependency graph.
 *
 * @generated from message buf.registry.module.v1.Graph
 */
export type Graph = Message<"buf.registry.module.v1.Graph"> & {
  /**
   * The nodes of the graph, each of which are Commits.
   *
   * @generated from field: repeated buf.registry.module.v1.Commit commits = 1;
   */
  commits: Commit[];

  /**
   * The edges of the graph.
   *
   * @generated from field: repeated buf.registry.module.v1.Graph.Edge edges = 2;
   */
  edges: Graph_Edge[];
};

/**
 * Describes the message buf.registry.module.v1.Graph.
 * Use `create(GraphSchema)` to create a new message.
 */
export const GraphSchema: GenMessage<Graph> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_graph, 0);

/**
 * A node in the dependency graph.
 *
 * @generated from message buf.registry.module.v1.Graph.Node
 */
export type Graph_Node = Message<"buf.registry.module.v1.Graph.Node"> & {
  /**
   * The commit of the node.
   *
   * @generated from field: string commit_id = 1;
   */
  commitId: string;
};

/**
 * Describes the message buf.registry.module.v1.Graph.Node.
 * Use `create(Graph_NodeSchema)` to create a new message.
 */
export const Graph_NodeSchema: GenMessage<Graph_Node> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_graph, 0, 0);

/**
 * An edge in the dependency graph.
 *
 * @generated from message buf.registry.module.v1.Graph.Edge
 */
export type Graph_Edge = Message<"buf.registry.module.v1.Graph.Edge"> & {
  /**
   * The Node of the start of the edge.
   *
   * @generated from field: buf.registry.module.v1.Graph.Node from_node = 1;
   */
  fromNode?: Graph_Node;

  /**
   * The Node of the end of the edge.
   *
   * @generated from field: buf.registry.module.v1.Graph.Node to_node = 2;
   */
  toNode?: Graph_Node;
};

/**
 * Describes the message buf.registry.module.v1.Graph.Edge.
 * Use `create(Graph_EdgeSchema)` to create a new message.
 */
export const Graph_EdgeSchema: GenMessage<Graph_Edge> = /*@__PURE__*/
  messageDesc(file_buf_registry_module_v1_graph, 0, 1);


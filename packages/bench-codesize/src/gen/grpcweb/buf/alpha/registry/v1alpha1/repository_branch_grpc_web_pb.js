/**
 * @fileoverview gRPC-Web generated client stub for buf.alpha.registry.v1alpha1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')
const proto = {};
proto.buf = {};
proto.buf.alpha = {};
proto.buf.alpha.registry = {};
proto.buf.alpha.registry.v1alpha1 = require('./repository_branch_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.RepositoryBranchServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.RepositoryBranchServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.CreateRepositoryBranchRequest,
 *   !proto.buf.alpha.registry.v1alpha1.CreateRepositoryBranchResponse>}
 */
const methodDescriptor_RepositoryBranchService_CreateRepositoryBranch = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryBranchService/CreateRepositoryBranch',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.CreateRepositoryBranchRequest,
  proto.buf.alpha.registry.v1alpha1.CreateRepositoryBranchResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryBranchRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.CreateRepositoryBranchResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryBranchRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.CreateRepositoryBranchResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.CreateRepositoryBranchResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryBranchServiceClient.prototype.createRepositoryBranch =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryBranchService/CreateRepositoryBranch',
      request,
      metadata || {},
      methodDescriptor_RepositoryBranchService_CreateRepositoryBranch,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryBranchRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.CreateRepositoryBranchResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryBranchServicePromiseClient.prototype.createRepositoryBranch =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryBranchService/CreateRepositoryBranch',
      request,
      metadata || {},
      methodDescriptor_RepositoryBranchService_CreateRepositoryBranch);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListRepositoryBranchesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListRepositoryBranchesResponse>}
 */
const methodDescriptor_RepositoryBranchService_ListRepositoryBranches = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryBranchService/ListRepositoryBranches',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListRepositoryBranchesRequest,
  proto.buf.alpha.registry.v1alpha1.ListRepositoryBranchesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryBranchesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListRepositoryBranchesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryBranchesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListRepositoryBranchesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListRepositoryBranchesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryBranchServiceClient.prototype.listRepositoryBranches =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryBranchService/ListRepositoryBranches',
      request,
      metadata || {},
      methodDescriptor_RepositoryBranchService_ListRepositoryBranches,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryBranchesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListRepositoryBranchesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryBranchServicePromiseClient.prototype.listRepositoryBranches =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryBranchService/ListRepositoryBranches',
      request,
      metadata || {},
      methodDescriptor_RepositoryBranchService_ListRepositoryBranches);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


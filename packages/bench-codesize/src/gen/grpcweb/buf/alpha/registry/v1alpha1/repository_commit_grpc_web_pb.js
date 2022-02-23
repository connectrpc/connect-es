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


var buf_alpha_registry_v1alpha1_repository_tag_pb = require('../../../../buf/alpha/registry/v1alpha1/repository_tag_pb.js')

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')
const proto = {};
proto.buf = {};
proto.buf.alpha = {};
proto.buf.alpha.registry = {};
proto.buf.alpha.registry.v1alpha1 = require('./repository_commit_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.RepositoryCommitServiceClient =
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
proto.buf.alpha.registry.v1alpha1.RepositoryCommitServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchResponse>}
 */
const methodDescriptor_RepositoryCommitService_ListRepositoryCommitsByBranch = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryCommitService/ListRepositoryCommitsByBranch',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchRequest,
  proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryCommitServiceClient.prototype.listRepositoryCommitsByBranch =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryCommitService/ListRepositoryCommitsByBranch',
      request,
      metadata || {},
      methodDescriptor_RepositoryCommitService_ListRepositoryCommitsByBranch,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByBranchResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryCommitServicePromiseClient.prototype.listRepositoryCommitsByBranch =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryCommitService/ListRepositoryCommitsByBranch',
      request,
      metadata || {},
      methodDescriptor_RepositoryCommitService_ListRepositoryCommitsByBranch);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceResponse>}
 */
const methodDescriptor_RepositoryCommitService_ListRepositoryCommitsByReference = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryCommitService/ListRepositoryCommitsByReference',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceRequest,
  proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryCommitServiceClient.prototype.listRepositoryCommitsByReference =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryCommitService/ListRepositoryCommitsByReference',
      request,
      metadata || {},
      methodDescriptor_RepositoryCommitService_ListRepositoryCommitsByReference,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListRepositoryCommitsByReferenceResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryCommitServicePromiseClient.prototype.listRepositoryCommitsByReference =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryCommitService/ListRepositoryCommitsByReference',
      request,
      metadata || {},
      methodDescriptor_RepositoryCommitService_ListRepositoryCommitsByReference);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceResponse>}
 */
const methodDescriptor_RepositoryCommitService_GetRepositoryCommitByReference = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryCommitService/GetRepositoryCommitByReference',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceRequest,
  proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryCommitServiceClient.prototype.getRepositoryCommitByReference =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryCommitService/GetRepositoryCommitByReference',
      request,
      metadata || {},
      methodDescriptor_RepositoryCommitService_GetRepositoryCommitByReference,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitByReferenceResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryCommitServicePromiseClient.prototype.getRepositoryCommitByReference =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryCommitService/GetRepositoryCommitByReference',
      request,
      metadata || {},
      methodDescriptor_RepositoryCommitService_GetRepositoryCommitByReference);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdResponse>}
 */
const methodDescriptor_RepositoryCommitService_GetRepositoryCommitBySequenceId = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryCommitService/GetRepositoryCommitBySequenceId',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdRequest,
  proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryCommitServiceClient.prototype.getRepositoryCommitBySequenceId =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryCommitService/GetRepositoryCommitBySequenceId',
      request,
      metadata || {},
      methodDescriptor_RepositoryCommitService_GetRepositoryCommitBySequenceId,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetRepositoryCommitBySequenceIdResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryCommitServicePromiseClient.prototype.getRepositoryCommitBySequenceId =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryCommitService/GetRepositoryCommitBySequenceId',
      request,
      metadata || {},
      methodDescriptor_RepositoryCommitService_GetRepositoryCommitBySequenceId);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


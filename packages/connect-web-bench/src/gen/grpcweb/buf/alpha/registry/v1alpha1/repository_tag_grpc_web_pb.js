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
proto.buf.alpha.registry.v1alpha1 = require('./repository_tag_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTagServiceClient =
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
proto.buf.alpha.registry.v1alpha1.RepositoryTagServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.CreateRepositoryTagRequest,
 *   !proto.buf.alpha.registry.v1alpha1.CreateRepositoryTagResponse>}
 */
const methodDescriptor_RepositoryTagService_CreateRepositoryTag = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryTagService/CreateRepositoryTag',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.CreateRepositoryTagRequest,
  proto.buf.alpha.registry.v1alpha1.CreateRepositoryTagResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryTagRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.CreateRepositoryTagResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryTagRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.CreateRepositoryTagResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.CreateRepositoryTagResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTagServiceClient.prototype.createRepositoryTag =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryTagService/CreateRepositoryTag',
      request,
      metadata || {},
      methodDescriptor_RepositoryTagService_CreateRepositoryTag,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryTagRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.CreateRepositoryTagResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTagServicePromiseClient.prototype.createRepositoryTag =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryTagService/CreateRepositoryTag',
      request,
      metadata || {},
      methodDescriptor_RepositoryTagService_CreateRepositoryTag);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListRepositoryTagsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListRepositoryTagsResponse>}
 */
const methodDescriptor_RepositoryTagService_ListRepositoryTags = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryTagService/ListRepositoryTags',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListRepositoryTagsRequest,
  proto.buf.alpha.registry.v1alpha1.ListRepositoryTagsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryTagsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListRepositoryTagsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryTagsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListRepositoryTagsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListRepositoryTagsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTagServiceClient.prototype.listRepositoryTags =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryTagService/ListRepositoryTags',
      request,
      metadata || {},
      methodDescriptor_RepositoryTagService_ListRepositoryTags,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryTagsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListRepositoryTagsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTagServicePromiseClient.prototype.listRepositoryTags =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryTagService/ListRepositoryTags',
      request,
      metadata || {},
      methodDescriptor_RepositoryTagService_ListRepositoryTags);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


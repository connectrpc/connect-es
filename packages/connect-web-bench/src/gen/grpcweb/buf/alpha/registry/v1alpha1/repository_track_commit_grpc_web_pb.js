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
proto.buf.alpha.registry.v1alpha1 = require('./repository_track_commit_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTrackCommitServiceClient =
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
proto.buf.alpha.registry.v1alpha1.RepositoryTrackCommitServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByRepositoryCommitRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByRepositoryCommitResponse>}
 */
const methodDescriptor_RepositoryTrackCommitService_GetRepositoryTrackCommitByRepositoryCommit = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryTrackCommitService/GetRepositoryTrackCommitByRepositoryCommit',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByRepositoryCommitRequest,
  proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByRepositoryCommitResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByRepositoryCommitRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByRepositoryCommitResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByRepositoryCommitRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByRepositoryCommitResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByRepositoryCommitResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTrackCommitServiceClient.prototype.getRepositoryTrackCommitByRepositoryCommit =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryTrackCommitService/GetRepositoryTrackCommitByRepositoryCommit',
      request,
      metadata || {},
      methodDescriptor_RepositoryTrackCommitService_GetRepositoryTrackCommitByRepositoryCommit,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByRepositoryCommitRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByRepositoryCommitResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTrackCommitServicePromiseClient.prototype.getRepositoryTrackCommitByRepositoryCommit =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryTrackCommitService/GetRepositoryTrackCommitByRepositoryCommit',
      request,
      metadata || {},
      methodDescriptor_RepositoryTrackCommitService_GetRepositoryTrackCommitByRepositoryCommit);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListRepositoryTrackCommitsByRepositoryTrackRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListRepositoryTrackCommitsByRepositoryTrackResponse>}
 */
const methodDescriptor_RepositoryTrackCommitService_ListRepositoryTrackCommitsByRepositoryTrack = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryTrackCommitService/ListRepositoryTrackCommitsByRepositoryTrack',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListRepositoryTrackCommitsByRepositoryTrackRequest,
  proto.buf.alpha.registry.v1alpha1.ListRepositoryTrackCommitsByRepositoryTrackResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryTrackCommitsByRepositoryTrackRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListRepositoryTrackCommitsByRepositoryTrackResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryTrackCommitsByRepositoryTrackRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListRepositoryTrackCommitsByRepositoryTrackResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListRepositoryTrackCommitsByRepositoryTrackResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTrackCommitServiceClient.prototype.listRepositoryTrackCommitsByRepositoryTrack =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryTrackCommitService/ListRepositoryTrackCommitsByRepositoryTrack',
      request,
      metadata || {},
      methodDescriptor_RepositoryTrackCommitService_ListRepositoryTrackCommitsByRepositoryTrack,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryTrackCommitsByRepositoryTrackRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListRepositoryTrackCommitsByRepositoryTrackResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTrackCommitServicePromiseClient.prototype.listRepositoryTrackCommitsByRepositoryTrack =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryTrackCommitService/ListRepositoryTrackCommitsByRepositoryTrack',
      request,
      metadata || {},
      methodDescriptor_RepositoryTrackCommitService_ListRepositoryTrackCommitsByRepositoryTrack);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByReferenceRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByReferenceResponse>}
 */
const methodDescriptor_RepositoryTrackCommitService_GetRepositoryTrackCommitByReference = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryTrackCommitService/GetRepositoryTrackCommitByReference',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByReferenceRequest,
  proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByReferenceResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByReferenceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByReferenceResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByReferenceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByReferenceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByReferenceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTrackCommitServiceClient.prototype.getRepositoryTrackCommitByReference =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryTrackCommitService/GetRepositoryTrackCommitByReference',
      request,
      metadata || {},
      methodDescriptor_RepositoryTrackCommitService_GetRepositoryTrackCommitByReference,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByReferenceRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackCommitByReferenceResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTrackCommitServicePromiseClient.prototype.getRepositoryTrackCommitByReference =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryTrackCommitService/GetRepositoryTrackCommitByReference',
      request,
      metadata || {},
      methodDescriptor_RepositoryTrackCommitService_GetRepositoryTrackCommitByReference);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


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
proto.buf.alpha.registry.v1alpha1 = require('./repository_track_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTrackServiceClient =
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
proto.buf.alpha.registry.v1alpha1.RepositoryTrackServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.CreateRepositoryTrackRequest,
 *   !proto.buf.alpha.registry.v1alpha1.CreateRepositoryTrackResponse>}
 */
const methodDescriptor_RepositoryTrackService_CreateRepositoryTrack = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryTrackService/CreateRepositoryTrack',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.CreateRepositoryTrackRequest,
  proto.buf.alpha.registry.v1alpha1.CreateRepositoryTrackResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryTrackRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.CreateRepositoryTrackResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryTrackRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.CreateRepositoryTrackResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.CreateRepositoryTrackResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTrackServiceClient.prototype.createRepositoryTrack =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryTrackService/CreateRepositoryTrack',
      request,
      metadata || {},
      methodDescriptor_RepositoryTrackService_CreateRepositoryTrack,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryTrackRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.CreateRepositoryTrackResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTrackServicePromiseClient.prototype.createRepositoryTrack =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryTrackService/CreateRepositoryTrack',
      request,
      metadata || {},
      methodDescriptor_RepositoryTrackService_CreateRepositoryTrack);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListRepositoryTracksRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListRepositoryTracksResponse>}
 */
const methodDescriptor_RepositoryTrackService_ListRepositoryTracks = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryTrackService/ListRepositoryTracks',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListRepositoryTracksRequest,
  proto.buf.alpha.registry.v1alpha1.ListRepositoryTracksResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryTracksRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListRepositoryTracksResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryTracksRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListRepositoryTracksResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListRepositoryTracksResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTrackServiceClient.prototype.listRepositoryTracks =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryTrackService/ListRepositoryTracks',
      request,
      metadata || {},
      methodDescriptor_RepositoryTrackService_ListRepositoryTracks,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryTracksRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListRepositoryTracksResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTrackServicePromiseClient.prototype.listRepositoryTracks =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryTrackService/ListRepositoryTracks',
      request,
      metadata || {},
      methodDescriptor_RepositoryTrackService_ListRepositoryTracks);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.DeleteRepositoryTrackByNameRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DeleteRepositoryTrackByNameResponse>}
 */
const methodDescriptor_RepositoryTrackService_DeleteRepositoryTrackByName = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryTrackService/DeleteRepositoryTrackByName',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DeleteRepositoryTrackByNameRequest,
  proto.buf.alpha.registry.v1alpha1.DeleteRepositoryTrackByNameResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryTrackByNameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DeleteRepositoryTrackByNameResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryTrackByNameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DeleteRepositoryTrackByNameResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryTrackByNameResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTrackServiceClient.prototype.deleteRepositoryTrackByName =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryTrackService/DeleteRepositoryTrackByName',
      request,
      metadata || {},
      methodDescriptor_RepositoryTrackService_DeleteRepositoryTrackByName,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryTrackByNameRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryTrackByNameResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTrackServicePromiseClient.prototype.deleteRepositoryTrackByName =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryTrackService/DeleteRepositoryTrackByName',
      request,
      metadata || {},
      methodDescriptor_RepositoryTrackService_DeleteRepositoryTrackByName);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackByNameRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackByNameResponse>}
 */
const methodDescriptor_RepositoryTrackService_GetRepositoryTrackByName = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryTrackService/GetRepositoryTrackByName',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackByNameRequest,
  proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackByNameResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackByNameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackByNameResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackByNameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackByNameResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackByNameResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTrackServiceClient.prototype.getRepositoryTrackByName =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryTrackService/GetRepositoryTrackByName',
      request,
      metadata || {},
      methodDescriptor_RepositoryTrackService_GetRepositoryTrackByName,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackByNameRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetRepositoryTrackByNameResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryTrackServicePromiseClient.prototype.getRepositoryTrackByName =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryTrackService/GetRepositoryTrackByName',
      request,
      metadata || {},
      methodDescriptor_RepositoryTrackService_GetRepositoryTrackByName);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


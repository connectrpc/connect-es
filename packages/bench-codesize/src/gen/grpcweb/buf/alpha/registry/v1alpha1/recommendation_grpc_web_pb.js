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
proto.buf.alpha.registry.v1alpha1 = require('./recommendation_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.RecommendationServiceClient =
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
proto.buf.alpha.registry.v1alpha1.RecommendationServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.RecommendedRepositoriesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.RecommendedRepositoriesResponse>}
 */
const methodDescriptor_RecommendationService_RecommendedRepositories = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RecommendationService/RecommendedRepositories',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.RecommendedRepositoriesRequest,
  proto.buf.alpha.registry.v1alpha1.RecommendedRepositoriesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.RecommendedRepositoriesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.RecommendedRepositoriesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.RecommendedRepositoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.RecommendedRepositoriesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.RecommendedRepositoriesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RecommendationServiceClient.prototype.recommendedRepositories =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RecommendationService/RecommendedRepositories',
      request,
      metadata || {},
      methodDescriptor_RecommendationService_RecommendedRepositories,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.RecommendedRepositoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.RecommendedRepositoriesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RecommendationServicePromiseClient.prototype.recommendedRepositories =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RecommendationService/RecommendedRepositories',
      request,
      metadata || {},
      methodDescriptor_RecommendationService_RecommendedRepositories);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.RecommendedTemplatesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.RecommendedTemplatesResponse>}
 */
const methodDescriptor_RecommendationService_RecommendedTemplates = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RecommendationService/RecommendedTemplates',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.RecommendedTemplatesRequest,
  proto.buf.alpha.registry.v1alpha1.RecommendedTemplatesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.RecommendedTemplatesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.RecommendedTemplatesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.RecommendedTemplatesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.RecommendedTemplatesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.RecommendedTemplatesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RecommendationServiceClient.prototype.recommendedTemplates =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RecommendationService/RecommendedTemplates',
      request,
      metadata || {},
      methodDescriptor_RecommendationService_RecommendedTemplates,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.RecommendedTemplatesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.RecommendedTemplatesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RecommendationServicePromiseClient.prototype.recommendedTemplates =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RecommendationService/RecommendedTemplates',
      request,
      metadata || {},
      methodDescriptor_RecommendationService_RecommendedTemplates);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListRecommendedRepositoriesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListRecommendedRepositoriesResponse>}
 */
const methodDescriptor_RecommendationService_ListRecommendedRepositories = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RecommendationService/ListRecommendedRepositories',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListRecommendedRepositoriesRequest,
  proto.buf.alpha.registry.v1alpha1.ListRecommendedRepositoriesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListRecommendedRepositoriesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListRecommendedRepositoriesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRecommendedRepositoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListRecommendedRepositoriesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListRecommendedRepositoriesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RecommendationServiceClient.prototype.listRecommendedRepositories =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RecommendationService/ListRecommendedRepositories',
      request,
      metadata || {},
      methodDescriptor_RecommendationService_ListRecommendedRepositories,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRecommendedRepositoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListRecommendedRepositoriesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RecommendationServicePromiseClient.prototype.listRecommendedRepositories =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RecommendationService/ListRecommendedRepositories',
      request,
      metadata || {},
      methodDescriptor_RecommendationService_ListRecommendedRepositories);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListRecommendedTemplatesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListRecommendedTemplatesResponse>}
 */
const methodDescriptor_RecommendationService_ListRecommendedTemplates = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RecommendationService/ListRecommendedTemplates',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListRecommendedTemplatesRequest,
  proto.buf.alpha.registry.v1alpha1.ListRecommendedTemplatesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListRecommendedTemplatesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListRecommendedTemplatesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRecommendedTemplatesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListRecommendedTemplatesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListRecommendedTemplatesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RecommendationServiceClient.prototype.listRecommendedTemplates =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RecommendationService/ListRecommendedTemplates',
      request,
      metadata || {},
      methodDescriptor_RecommendationService_ListRecommendedTemplates,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRecommendedTemplatesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListRecommendedTemplatesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RecommendationServicePromiseClient.prototype.listRecommendedTemplates =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RecommendationService/ListRecommendedTemplates',
      request,
      metadata || {},
      methodDescriptor_RecommendationService_ListRecommendedTemplates);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.SetRecommendedRepositoriesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.SetRecommendedRepositoriesResponse>}
 */
const methodDescriptor_RecommendationService_SetRecommendedRepositories = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RecommendationService/SetRecommendedRepositories',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.SetRecommendedRepositoriesRequest,
  proto.buf.alpha.registry.v1alpha1.SetRecommendedRepositoriesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.SetRecommendedRepositoriesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.SetRecommendedRepositoriesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.SetRecommendedRepositoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.SetRecommendedRepositoriesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.SetRecommendedRepositoriesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RecommendationServiceClient.prototype.setRecommendedRepositories =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RecommendationService/SetRecommendedRepositories',
      request,
      metadata || {},
      methodDescriptor_RecommendationService_SetRecommendedRepositories,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.SetRecommendedRepositoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.SetRecommendedRepositoriesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RecommendationServicePromiseClient.prototype.setRecommendedRepositories =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RecommendationService/SetRecommendedRepositories',
      request,
      metadata || {},
      methodDescriptor_RecommendationService_SetRecommendedRepositories);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.SetRecommendedTemplatesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.SetRecommendedTemplatesResponse>}
 */
const methodDescriptor_RecommendationService_SetRecommendedTemplates = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RecommendationService/SetRecommendedTemplates',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.SetRecommendedTemplatesRequest,
  proto.buf.alpha.registry.v1alpha1.SetRecommendedTemplatesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.SetRecommendedTemplatesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.SetRecommendedTemplatesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.SetRecommendedTemplatesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.SetRecommendedTemplatesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.SetRecommendedTemplatesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RecommendationServiceClient.prototype.setRecommendedTemplates =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RecommendationService/SetRecommendedTemplates',
      request,
      metadata || {},
      methodDescriptor_RecommendationService_SetRecommendedTemplates,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.SetRecommendedTemplatesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.SetRecommendedTemplatesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RecommendationServicePromiseClient.prototype.setRecommendedTemplates =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RecommendationService/SetRecommendedTemplates',
      request,
      metadata || {},
      methodDescriptor_RecommendationService_SetRecommendedTemplates);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


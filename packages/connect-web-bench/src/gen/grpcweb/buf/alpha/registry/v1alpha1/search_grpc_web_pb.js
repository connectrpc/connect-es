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


var buf_alpha_registry_v1alpha1_repository_pb = require('../../../../buf/alpha/registry/v1alpha1/repository_pb.js')

var buf_alpha_registry_v1alpha1_plugin_pb = require('../../../../buf/alpha/registry/v1alpha1/plugin_pb.js')
const proto = {};
proto.buf = {};
proto.buf.alpha = {};
proto.buf.alpha.registry = {};
proto.buf.alpha.registry.v1alpha1 = require('./search_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.SearchServiceClient =
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
proto.buf.alpha.registry.v1alpha1.SearchServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.SearchRequest,
 *   !proto.buf.alpha.registry.v1alpha1.SearchResponse>}
 */
const methodDescriptor_SearchService_Search = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.SearchService/Search',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.SearchRequest,
  proto.buf.alpha.registry.v1alpha1.SearchResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.SearchRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.SearchResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.SearchRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.SearchResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.SearchResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.SearchServiceClient.prototype.search =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.SearchService/Search',
      request,
      metadata || {},
      methodDescriptor_SearchService_Search,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.SearchRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.SearchResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.SearchServicePromiseClient.prototype.search =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.SearchService/Search',
      request,
      metadata || {},
      methodDescriptor_SearchService_Search);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


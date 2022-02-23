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


var google_protobuf_compiler_plugin_pb = require('google-protobuf/google/protobuf/compiler/plugin_pb.js')

var buf_alpha_image_v1_image_pb = require('../../../../buf/alpha/image/v1/image_pb.js')
const proto = {};
proto.buf = {};
proto.buf.alpha = {};
proto.buf.alpha.registry = {};
proto.buf.alpha.registry.v1alpha1 = require('./generate_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.GenerateServiceClient =
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
proto.buf.alpha.registry.v1alpha1.GenerateServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.GeneratePluginsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GeneratePluginsResponse>}
 */
const methodDescriptor_GenerateService_GeneratePlugins = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.GenerateService/GeneratePlugins',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GeneratePluginsRequest,
  proto.buf.alpha.registry.v1alpha1.GeneratePluginsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GeneratePluginsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GeneratePluginsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GeneratePluginsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GeneratePluginsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GeneratePluginsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.GenerateServiceClient.prototype.generatePlugins =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.GenerateService/GeneratePlugins',
      request,
      metadata || {},
      methodDescriptor_GenerateService_GeneratePlugins,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GeneratePluginsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GeneratePluginsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.GenerateServicePromiseClient.prototype.generatePlugins =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.GenerateService/GeneratePlugins',
      request,
      metadata || {},
      methodDescriptor_GenerateService_GeneratePlugins);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GenerateTemplateRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GenerateTemplateResponse>}
 */
const methodDescriptor_GenerateService_GenerateTemplate = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.GenerateService/GenerateTemplate',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GenerateTemplateRequest,
  proto.buf.alpha.registry.v1alpha1.GenerateTemplateResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GenerateTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GenerateTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GenerateTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GenerateTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GenerateTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.GenerateServiceClient.prototype.generateTemplate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.GenerateService/GenerateTemplate',
      request,
      metadata || {},
      methodDescriptor_GenerateService_GenerateTemplate,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GenerateTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GenerateTemplateResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.GenerateServicePromiseClient.prototype.generateTemplate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.GenerateService/GenerateTemplate',
      request,
      metadata || {},
      methodDescriptor_GenerateService_GenerateTemplate);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


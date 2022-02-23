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


var buf_alpha_module_v1alpha1_module_pb = require('../../../../buf/alpha/module/v1alpha1/module_pb.js')

var buf_alpha_registry_v1alpha1_module_pb = require('../../../../buf/alpha/registry/v1alpha1/module_pb.js')
const proto = {};
proto.buf = {};
proto.buf.alpha = {};
proto.buf.alpha.registry = {};
proto.buf.alpha.registry.v1alpha1 = require('./resolve_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.ResolveServiceClient =
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
proto.buf.alpha.registry.v1alpha1.ResolveServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.GetModulePinsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetModulePinsResponse>}
 */
const methodDescriptor_ResolveService_GetModulePins = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.ResolveService/GetModulePins',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetModulePinsRequest,
  proto.buf.alpha.registry.v1alpha1.GetModulePinsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetModulePinsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetModulePinsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetModulePinsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetModulePinsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetModulePinsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.ResolveServiceClient.prototype.getModulePins =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.ResolveService/GetModulePins',
      request,
      metadata || {},
      methodDescriptor_ResolveService_GetModulePins,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetModulePinsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetModulePinsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.ResolveServicePromiseClient.prototype.getModulePins =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.ResolveService/GetModulePins',
      request,
      metadata || {},
      methodDescriptor_ResolveService_GetModulePins);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.LocalResolveServiceClient =
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
proto.buf.alpha.registry.v1alpha1.LocalResolveServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.GetLocalModulePinsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetLocalModulePinsResponse>}
 */
const methodDescriptor_LocalResolveService_GetLocalModulePins = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.LocalResolveService/GetLocalModulePins',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetLocalModulePinsRequest,
  proto.buf.alpha.registry.v1alpha1.GetLocalModulePinsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetLocalModulePinsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetLocalModulePinsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetLocalModulePinsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetLocalModulePinsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetLocalModulePinsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.LocalResolveServiceClient.prototype.getLocalModulePins =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.LocalResolveService/GetLocalModulePins',
      request,
      metadata || {},
      methodDescriptor_LocalResolveService_GetLocalModulePins,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetLocalModulePinsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetLocalModulePinsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.LocalResolveServicePromiseClient.prototype.getLocalModulePins =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.LocalResolveService/GetLocalModulePins',
      request,
      metadata || {},
      methodDescriptor_LocalResolveService_GetLocalModulePins);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


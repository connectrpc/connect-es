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
proto.buf.alpha.registry.v1alpha1 = require('./push_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.PushServiceClient =
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
proto.buf.alpha.registry.v1alpha1.PushServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.PushRequest,
 *   !proto.buf.alpha.registry.v1alpha1.PushResponse>}
 */
const methodDescriptor_PushService_Push = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PushService/Push',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.PushRequest,
  proto.buf.alpha.registry.v1alpha1.PushResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.PushRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.PushResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.PushRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.PushResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.PushResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PushServiceClient.prototype.push =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PushService/Push',
      request,
      metadata || {},
      methodDescriptor_PushService_Push,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.PushRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.PushResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PushServicePromiseClient.prototype.push =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PushService/Push',
      request,
      metadata || {},
      methodDescriptor_PushService_Push);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


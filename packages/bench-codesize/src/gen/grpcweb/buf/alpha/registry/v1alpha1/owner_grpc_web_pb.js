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


var buf_alpha_registry_v1alpha1_user_pb = require('../../../../buf/alpha/registry/v1alpha1/user_pb.js')

var buf_alpha_registry_v1alpha1_organization_pb = require('../../../../buf/alpha/registry/v1alpha1/organization_pb.js')
const proto = {};
proto.buf = {};
proto.buf.alpha = {};
proto.buf.alpha.registry = {};
proto.buf.alpha.registry.v1alpha1 = require('./owner_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.OwnerServiceClient =
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
proto.buf.alpha.registry.v1alpha1.OwnerServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.GetOwnerByNameRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetOwnerByNameResponse>}
 */
const methodDescriptor_OwnerService_GetOwnerByName = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.OwnerService/GetOwnerByName',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetOwnerByNameRequest,
  proto.buf.alpha.registry.v1alpha1.GetOwnerByNameResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetOwnerByNameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetOwnerByNameResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetOwnerByNameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetOwnerByNameResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetOwnerByNameResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.OwnerServiceClient.prototype.getOwnerByName =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OwnerService/GetOwnerByName',
      request,
      metadata || {},
      methodDescriptor_OwnerService_GetOwnerByName,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetOwnerByNameRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetOwnerByNameResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.OwnerServicePromiseClient.prototype.getOwnerByName =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OwnerService/GetOwnerByName',
      request,
      metadata || {},
      methodDescriptor_OwnerService_GetOwnerByName);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


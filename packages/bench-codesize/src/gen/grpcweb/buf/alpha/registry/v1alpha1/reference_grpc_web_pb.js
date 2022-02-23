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


var buf_alpha_registry_v1alpha1_repository_branch_pb = require('../../../../buf/alpha/registry/v1alpha1/repository_branch_pb.js')

var buf_alpha_registry_v1alpha1_repository_commit_pb = require('../../../../buf/alpha/registry/v1alpha1/repository_commit_pb.js')

var buf_alpha_registry_v1alpha1_repository_tag_pb = require('../../../../buf/alpha/registry/v1alpha1/repository_tag_pb.js')

var buf_alpha_registry_v1alpha1_repository_track_pb = require('../../../../buf/alpha/registry/v1alpha1/repository_track_pb.js')
const proto = {};
proto.buf = {};
proto.buf.alpha = {};
proto.buf.alpha.registry = {};
proto.buf.alpha.registry.v1alpha1 = require('./reference_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.ReferenceServiceClient =
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
proto.buf.alpha.registry.v1alpha1.ReferenceServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.GetReferenceByNameRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetReferenceByNameResponse>}
 */
const methodDescriptor_ReferenceService_GetReferenceByName = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.ReferenceService/GetReferenceByName',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetReferenceByNameRequest,
  proto.buf.alpha.registry.v1alpha1.GetReferenceByNameResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetReferenceByNameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetReferenceByNameResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetReferenceByNameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetReferenceByNameResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetReferenceByNameResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.ReferenceServiceClient.prototype.getReferenceByName =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.ReferenceService/GetReferenceByName',
      request,
      metadata || {},
      methodDescriptor_ReferenceService_GetReferenceByName,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetReferenceByNameRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetReferenceByNameResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.ReferenceServicePromiseClient.prototype.getReferenceByName =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.ReferenceService/GetReferenceByName',
      request,
      metadata || {},
      methodDescriptor_ReferenceService_GetReferenceByName);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


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
const proto = {};
proto.buf = {};
proto.buf.alpha = {};
proto.buf.alpha.registry = {};
proto.buf.alpha.registry.v1alpha1 = require('./authn_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.AuthnServiceClient =
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
proto.buf.alpha.registry.v1alpha1.AuthnServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.GetCurrentUserRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetCurrentUserResponse>}
 */
const methodDescriptor_AuthnService_GetCurrentUser = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthnService/GetCurrentUser',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetCurrentUserRequest,
  proto.buf.alpha.registry.v1alpha1.GetCurrentUserResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetCurrentUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetCurrentUserResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetCurrentUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetCurrentUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetCurrentUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthnServiceClient.prototype.getCurrentUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthnService/GetCurrentUser',
      request,
      metadata || {},
      methodDescriptor_AuthnService_GetCurrentUser,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetCurrentUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetCurrentUserResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthnServicePromiseClient.prototype.getCurrentUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthnService/GetCurrentUser',
      request,
      metadata || {},
      methodDescriptor_AuthnService_GetCurrentUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetCurrentUserSubjectRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetCurrentUserSubjectResponse>}
 */
const methodDescriptor_AuthnService_GetCurrentUserSubject = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthnService/GetCurrentUserSubject',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetCurrentUserSubjectRequest,
  proto.buf.alpha.registry.v1alpha1.GetCurrentUserSubjectResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetCurrentUserSubjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetCurrentUserSubjectResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetCurrentUserSubjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetCurrentUserSubjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetCurrentUserSubjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthnServiceClient.prototype.getCurrentUserSubject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthnService/GetCurrentUserSubject',
      request,
      metadata || {},
      methodDescriptor_AuthnService_GetCurrentUserSubject,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetCurrentUserSubjectRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetCurrentUserSubjectResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthnServicePromiseClient.prototype.getCurrentUserSubject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthnService/GetCurrentUserSubject',
      request,
      metadata || {},
      methodDescriptor_AuthnService_GetCurrentUserSubject);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


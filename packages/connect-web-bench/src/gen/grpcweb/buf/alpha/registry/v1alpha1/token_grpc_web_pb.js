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
proto.buf.alpha.registry.v1alpha1 = require('./token_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.TokenServiceClient =
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
proto.buf.alpha.registry.v1alpha1.TokenServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.CreateTokenRequest,
 *   !proto.buf.alpha.registry.v1alpha1.CreateTokenResponse>}
 */
const methodDescriptor_TokenService_CreateToken = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.TokenService/CreateToken',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.CreateTokenRequest,
  proto.buf.alpha.registry.v1alpha1.CreateTokenResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.CreateTokenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.CreateTokenResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.CreateTokenResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.CreateTokenResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.TokenServiceClient.prototype.createToken =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.TokenService/CreateToken',
      request,
      metadata || {},
      methodDescriptor_TokenService_CreateToken,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.CreateTokenResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.TokenServicePromiseClient.prototype.createToken =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.TokenService/CreateToken',
      request,
      metadata || {},
      methodDescriptor_TokenService_CreateToken);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetTokenRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetTokenResponse>}
 */
const methodDescriptor_TokenService_GetToken = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.TokenService/GetToken',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetTokenRequest,
  proto.buf.alpha.registry.v1alpha1.GetTokenResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetTokenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetTokenResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetTokenResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetTokenResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.TokenServiceClient.prototype.getToken =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.TokenService/GetToken',
      request,
      metadata || {},
      methodDescriptor_TokenService_GetToken,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetTokenResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.TokenServicePromiseClient.prototype.getToken =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.TokenService/GetToken',
      request,
      metadata || {},
      methodDescriptor_TokenService_GetToken);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListTokensRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListTokensResponse>}
 */
const methodDescriptor_TokenService_ListTokens = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.TokenService/ListTokens',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListTokensRequest,
  proto.buf.alpha.registry.v1alpha1.ListTokensResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListTokensRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListTokensResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTokensRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListTokensResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListTokensResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.TokenServiceClient.prototype.listTokens =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.TokenService/ListTokens',
      request,
      metadata || {},
      methodDescriptor_TokenService_ListTokens,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTokensRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListTokensResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.TokenServicePromiseClient.prototype.listTokens =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.TokenService/ListTokens',
      request,
      metadata || {},
      methodDescriptor_TokenService_ListTokens);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.DeleteTokenRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DeleteTokenResponse>}
 */
const methodDescriptor_TokenService_DeleteToken = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.TokenService/DeleteToken',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DeleteTokenRequest,
  proto.buf.alpha.registry.v1alpha1.DeleteTokenResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DeleteTokenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DeleteTokenResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DeleteTokenResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DeleteTokenResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.TokenServiceClient.prototype.deleteToken =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.TokenService/DeleteToken',
      request,
      metadata || {},
      methodDescriptor_TokenService_DeleteToken,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DeleteTokenResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.TokenServicePromiseClient.prototype.deleteToken =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.TokenService/DeleteToken',
      request,
      metadata || {},
      methodDescriptor_TokenService_DeleteToken);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


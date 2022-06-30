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
const proto = {};
proto.buf = {};
proto.buf.alpha = {};
proto.buf.alpha.registry = {};
proto.buf.alpha.registry.v1alpha1 = require('./download_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.DownloadServiceClient =
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
proto.buf.alpha.registry.v1alpha1.DownloadServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.DownloadRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DownloadResponse>}
 */
const methodDescriptor_DownloadService_Download = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.DownloadService/Download',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DownloadRequest,
  proto.buf.alpha.registry.v1alpha1.DownloadResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DownloadRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DownloadResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DownloadRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DownloadResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DownloadResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.DownloadServiceClient.prototype.download =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DownloadService/Download',
      request,
      metadata || {},
      methodDescriptor_DownloadService_Download,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DownloadRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DownloadResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.DownloadServicePromiseClient.prototype.download =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DownloadService/Download',
      request,
      metadata || {},
      methodDescriptor_DownloadService_Download);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


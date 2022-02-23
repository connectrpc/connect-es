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

var buf_alpha_audit_v1alpha1_envelope_pb = require('../../../../buf/alpha/audit/v1alpha1/envelope_pb.js')
const proto = {};
proto.buf = {};
proto.buf.alpha = {};
proto.buf.alpha.registry = {};
proto.buf.alpha.registry.v1alpha1 = require('./audit_logs_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.AuditLogsServiceClient =
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
proto.buf.alpha.registry.v1alpha1.AuditLogsServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.ListAuditLogsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListAuditLogsResponse>}
 */
const methodDescriptor_AuditLogsService_ListAuditLogs = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuditLogsService/ListAuditLogs',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListAuditLogsRequest,
  proto.buf.alpha.registry.v1alpha1.ListAuditLogsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListAuditLogsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListAuditLogsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListAuditLogsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListAuditLogsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListAuditLogsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuditLogsServiceClient.prototype.listAuditLogs =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuditLogsService/ListAuditLogs',
      request,
      metadata || {},
      methodDescriptor_AuditLogsService_ListAuditLogs,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListAuditLogsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListAuditLogsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuditLogsServicePromiseClient.prototype.listAuditLogs =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuditLogsService/ListAuditLogs',
      request,
      metadata || {},
      methodDescriptor_AuditLogsService_ListAuditLogs);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


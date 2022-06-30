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

const proto = {};
proto.buf = {};
proto.buf.alpha = {};
proto.buf.alpha.registry = {};
proto.buf.alpha.registry.v1alpha1 = require('./doc_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.DocServiceClient =
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
proto.buf.alpha.registry.v1alpha1.DocServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.GetSourceDirectoryInfoRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetSourceDirectoryInfoResponse>}
 */
const methodDescriptor_DocService_GetSourceDirectoryInfo = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.DocService/GetSourceDirectoryInfo',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetSourceDirectoryInfoRequest,
  proto.buf.alpha.registry.v1alpha1.GetSourceDirectoryInfoResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetSourceDirectoryInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetSourceDirectoryInfoResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetSourceDirectoryInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetSourceDirectoryInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetSourceDirectoryInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.DocServiceClient.prototype.getSourceDirectoryInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DocService/GetSourceDirectoryInfo',
      request,
      metadata || {},
      methodDescriptor_DocService_GetSourceDirectoryInfo,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetSourceDirectoryInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetSourceDirectoryInfoResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.DocServicePromiseClient.prototype.getSourceDirectoryInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DocService/GetSourceDirectoryInfo',
      request,
      metadata || {},
      methodDescriptor_DocService_GetSourceDirectoryInfo);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetSourceFileRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetSourceFileResponse>}
 */
const methodDescriptor_DocService_GetSourceFile = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.DocService/GetSourceFile',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetSourceFileRequest,
  proto.buf.alpha.registry.v1alpha1.GetSourceFileResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetSourceFileRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetSourceFileResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetSourceFileRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetSourceFileResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetSourceFileResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.DocServiceClient.prototype.getSourceFile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DocService/GetSourceFile',
      request,
      metadata || {},
      methodDescriptor_DocService_GetSourceFile,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetSourceFileRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetSourceFileResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.DocServicePromiseClient.prototype.getSourceFile =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DocService/GetSourceFile',
      request,
      metadata || {},
      methodDescriptor_DocService_GetSourceFile);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetModulePackagesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetModulePackagesResponse>}
 */
const methodDescriptor_DocService_GetModulePackages = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.DocService/GetModulePackages',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetModulePackagesRequest,
  proto.buf.alpha.registry.v1alpha1.GetModulePackagesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetModulePackagesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetModulePackagesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetModulePackagesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetModulePackagesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetModulePackagesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.DocServiceClient.prototype.getModulePackages =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DocService/GetModulePackages',
      request,
      metadata || {},
      methodDescriptor_DocService_GetModulePackages,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetModulePackagesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetModulePackagesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.DocServicePromiseClient.prototype.getModulePackages =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DocService/GetModulePackages',
      request,
      metadata || {},
      methodDescriptor_DocService_GetModulePackages);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetModuleDocumentationRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetModuleDocumentationResponse>}
 */
const methodDescriptor_DocService_GetModuleDocumentation = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.DocService/GetModuleDocumentation',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetModuleDocumentationRequest,
  proto.buf.alpha.registry.v1alpha1.GetModuleDocumentationResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetModuleDocumentationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetModuleDocumentationResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetModuleDocumentationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetModuleDocumentationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetModuleDocumentationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.DocServiceClient.prototype.getModuleDocumentation =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DocService/GetModuleDocumentation',
      request,
      metadata || {},
      methodDescriptor_DocService_GetModuleDocumentation,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetModuleDocumentationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetModuleDocumentationResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.DocServicePromiseClient.prototype.getModuleDocumentation =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DocService/GetModuleDocumentation',
      request,
      metadata || {},
      methodDescriptor_DocService_GetModuleDocumentation);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetPackageDocumentationRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetPackageDocumentationResponse>}
 */
const methodDescriptor_DocService_GetPackageDocumentation = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.DocService/GetPackageDocumentation',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetPackageDocumentationRequest,
  proto.buf.alpha.registry.v1alpha1.GetPackageDocumentationResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetPackageDocumentationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetPackageDocumentationResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetPackageDocumentationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetPackageDocumentationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetPackageDocumentationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.DocServiceClient.prototype.getPackageDocumentation =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DocService/GetPackageDocumentation',
      request,
      metadata || {},
      methodDescriptor_DocService_GetPackageDocumentation,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetPackageDocumentationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetPackageDocumentationResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.DocServicePromiseClient.prototype.getPackageDocumentation =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DocService/GetPackageDocumentation',
      request,
      metadata || {},
      methodDescriptor_DocService_GetPackageDocumentation);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


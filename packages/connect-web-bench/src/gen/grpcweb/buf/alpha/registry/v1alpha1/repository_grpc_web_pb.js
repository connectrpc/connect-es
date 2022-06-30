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


var buf_alpha_registry_v1alpha1_role_pb = require('../../../../buf/alpha/registry/v1alpha1/role_pb.js')

var buf_alpha_registry_v1alpha1_user_pb = require('../../../../buf/alpha/registry/v1alpha1/user_pb.js')

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')
const proto = {};
proto.buf = {};
proto.buf.alpha = {};
proto.buf.alpha.registry = {};
proto.buf.alpha.registry.v1alpha1 = require('./repository_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServiceClient =
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
proto.buf.alpha.registry.v1alpha1.RepositoryServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse>}
 */
const methodDescriptor_RepositoryService_GetRepository = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryService/GetRepository',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest,
  proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServiceClient.prototype.getRepository =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/GetRepository',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_GetRepository,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetRepositoryResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServicePromiseClient.prototype.getRepository =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/GetRepository',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_GetRepository);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse>}
 */
const methodDescriptor_RepositoryService_GetRepositoryByFullName = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryService/GetRepositoryByFullName',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest,
  proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServiceClient.prototype.getRepositoryByFullName =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/GetRepositoryByFullName',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_GetRepositoryByFullName,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetRepositoryByFullNameResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServicePromiseClient.prototype.getRepositoryByFullName =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/GetRepositoryByFullName',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_GetRepositoryByFullName);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse>}
 */
const methodDescriptor_RepositoryService_ListRepositories = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryService/ListRepositories',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest,
  proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServiceClient.prototype.listRepositories =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/ListRepositories',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_ListRepositories,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListRepositoriesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServicePromiseClient.prototype.listRepositories =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/ListRepositories',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_ListRepositories);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse>}
 */
const methodDescriptor_RepositoryService_ListUserRepositories = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryService/ListUserRepositories',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest,
  proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServiceClient.prototype.listUserRepositories =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/ListUserRepositories',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_ListUserRepositories,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListUserRepositoriesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServicePromiseClient.prototype.listUserRepositories =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/ListUserRepositories',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_ListUserRepositories);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse>}
 */
const methodDescriptor_RepositoryService_ListRepositoriesUserCanAccess = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryService/ListRepositoriesUserCanAccess',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest,
  proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServiceClient.prototype.listRepositoriesUserCanAccess =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/ListRepositoriesUserCanAccess',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_ListRepositoriesUserCanAccess,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListRepositoriesUserCanAccessResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServicePromiseClient.prototype.listRepositoriesUserCanAccess =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/ListRepositoriesUserCanAccess',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_ListRepositoriesUserCanAccess);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse>}
 */
const methodDescriptor_RepositoryService_ListOrganizationRepositories = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryService/ListOrganizationRepositories',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest,
  proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServiceClient.prototype.listOrganizationRepositories =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/ListOrganizationRepositories',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_ListOrganizationRepositories,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListOrganizationRepositoriesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServicePromiseClient.prototype.listOrganizationRepositories =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/ListOrganizationRepositories',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_ListOrganizationRepositories);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest,
 *   !proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse>}
 */
const methodDescriptor_RepositoryService_CreateRepositoryByFullName = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryService/CreateRepositoryByFullName',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest,
  proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServiceClient.prototype.createRepositoryByFullName =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/CreateRepositoryByFullName',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_CreateRepositoryByFullName,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.CreateRepositoryByFullNameResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServicePromiseClient.prototype.createRepositoryByFullName =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/CreateRepositoryByFullName',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_CreateRepositoryByFullName);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse>}
 */
const methodDescriptor_RepositoryService_DeleteRepository = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryService/DeleteRepository',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest,
  proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServiceClient.prototype.deleteRepository =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/DeleteRepository',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_DeleteRepository,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServicePromiseClient.prototype.deleteRepository =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/DeleteRepository',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_DeleteRepository);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse>}
 */
const methodDescriptor_RepositoryService_DeleteRepositoryByFullName = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryService/DeleteRepositoryByFullName',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest,
  proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServiceClient.prototype.deleteRepositoryByFullName =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/DeleteRepositoryByFullName',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_DeleteRepositoryByFullName,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DeleteRepositoryByFullNameResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServicePromiseClient.prototype.deleteRepositoryByFullName =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/DeleteRepositoryByFullName',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_DeleteRepositoryByFullName);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse>}
 */
const methodDescriptor_RepositoryService_DeprecateRepositoryByName = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryService/DeprecateRepositoryByName',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest,
  proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServiceClient.prototype.deprecateRepositoryByName =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/DeprecateRepositoryByName',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_DeprecateRepositoryByName,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DeprecateRepositoryByNameResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServicePromiseClient.prototype.deprecateRepositoryByName =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/DeprecateRepositoryByName',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_DeprecateRepositoryByName);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse>}
 */
const methodDescriptor_RepositoryService_UndeprecateRepositoryByName = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryService/UndeprecateRepositoryByName',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest,
  proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServiceClient.prototype.undeprecateRepositoryByName =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/UndeprecateRepositoryByName',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_UndeprecateRepositoryByName,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UndeprecateRepositoryByNameResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServicePromiseClient.prototype.undeprecateRepositoryByName =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/UndeprecateRepositoryByName',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_UndeprecateRepositoryByName);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse>}
 */
const methodDescriptor_RepositoryService_GetRepositoriesByFullName = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryService/GetRepositoriesByFullName',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest,
  proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServiceClient.prototype.getRepositoriesByFullName =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/GetRepositoriesByFullName',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_GetRepositoriesByFullName,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetRepositoriesByFullNameResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServicePromiseClient.prototype.getRepositoriesByFullName =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/GetRepositoriesByFullName',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_GetRepositoriesByFullName);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest,
 *   !proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse>}
 */
const methodDescriptor_RepositoryService_SetRepositoryContributor = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryService/SetRepositoryContributor',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest,
  proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServiceClient.prototype.setRepositoryContributor =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/SetRepositoryContributor',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_SetRepositoryContributor,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.SetRepositoryContributorResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServicePromiseClient.prototype.setRepositoryContributor =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/SetRepositoryContributor',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_SetRepositoryContributor);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse>}
 */
const methodDescriptor_RepositoryService_ListRepositoryContributors = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryService/ListRepositoryContributors',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest,
  proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServiceClient.prototype.listRepositoryContributors =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/ListRepositoryContributors',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_ListRepositoryContributors,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListRepositoryContributorsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServicePromiseClient.prototype.listRepositoryContributors =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/ListRepositoryContributors',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_ListRepositoryContributors);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse>}
 */
const methodDescriptor_RepositoryService_GetRepositorySettings = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.RepositoryService/GetRepositorySettings',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest,
  proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServiceClient.prototype.getRepositorySettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/GetRepositorySettings',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_GetRepositorySettings,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetRepositorySettingsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.RepositoryServicePromiseClient.prototype.getRepositorySettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.RepositoryService/GetRepositorySettings',
      request,
      metadata || {},
      methodDescriptor_RepositoryService_GetRepositorySettings);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


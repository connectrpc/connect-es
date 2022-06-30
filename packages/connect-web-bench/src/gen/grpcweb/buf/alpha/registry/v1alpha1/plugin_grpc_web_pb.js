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

var buf_alpha_registry_v1alpha1_generate_pb = require('../../../../buf/alpha/registry/v1alpha1/generate_pb.js')
const proto = {};
proto.buf = {};
proto.buf.alpha = {};
proto.buf.alpha.registry = {};
proto.buf.alpha.registry.v1alpha1 = require('./plugin_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient =
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
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.ListPluginsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListPluginsResponse>}
 */
const methodDescriptor_PluginService_ListPlugins = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/ListPlugins',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListPluginsRequest,
  proto.buf.alpha.registry.v1alpha1.ListPluginsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListPluginsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListPluginsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.listPlugins =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListPlugins',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListPlugins,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListPluginsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.listPlugins =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListPlugins',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListPlugins);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse>}
 */
const methodDescriptor_PluginService_ListUserPlugins = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/ListUserPlugins',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest,
  proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.listUserPlugins =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListUserPlugins',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListUserPlugins,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.listUserPlugins =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListUserPlugins',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListUserPlugins);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse>}
 */
const methodDescriptor_PluginService_ListOrganizationPlugins = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/ListOrganizationPlugins',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest,
  proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.listOrganizationPlugins =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListOrganizationPlugins',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListOrganizationPlugins,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.listOrganizationPlugins =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListOrganizationPlugins',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListOrganizationPlugins);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse>}
 */
const methodDescriptor_PluginService_GetPluginVersion = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/GetPluginVersion',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest,
  proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.getPluginVersion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/GetPluginVersion',
      request,
      metadata || {},
      methodDescriptor_PluginService_GetPluginVersion,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.getPluginVersion =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/GetPluginVersion',
      request,
      metadata || {},
      methodDescriptor_PluginService_GetPluginVersion);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse>}
 */
const methodDescriptor_PluginService_ListPluginVersions = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/ListPluginVersions',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest,
  proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.listPluginVersions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListPluginVersions',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListPluginVersions,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.listPluginVersions =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListPluginVersions',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListPluginVersions);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.CreatePluginRequest,
 *   !proto.buf.alpha.registry.v1alpha1.CreatePluginResponse>}
 */
const methodDescriptor_PluginService_CreatePlugin = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/CreatePlugin',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.CreatePluginRequest,
  proto.buf.alpha.registry.v1alpha1.CreatePluginResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.CreatePluginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.CreatePluginResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreatePluginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.CreatePluginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.CreatePluginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.createPlugin =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/CreatePlugin',
      request,
      metadata || {},
      methodDescriptor_PluginService_CreatePlugin,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreatePluginRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.CreatePluginResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.createPlugin =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/CreatePlugin',
      request,
      metadata || {},
      methodDescriptor_PluginService_CreatePlugin);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetPluginRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetPluginResponse>}
 */
const methodDescriptor_PluginService_GetPlugin = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/GetPlugin',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetPluginRequest,
  proto.buf.alpha.registry.v1alpha1.GetPluginResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetPluginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetPluginResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetPluginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetPluginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetPluginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.getPlugin =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/GetPlugin',
      request,
      metadata || {},
      methodDescriptor_PluginService_GetPlugin,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetPluginRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetPluginResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.getPlugin =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/GetPlugin',
      request,
      metadata || {},
      methodDescriptor_PluginService_GetPlugin);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.DeletePluginRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DeletePluginResponse>}
 */
const methodDescriptor_PluginService_DeletePlugin = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/DeletePlugin',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DeletePluginRequest,
  proto.buf.alpha.registry.v1alpha1.DeletePluginResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DeletePluginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DeletePluginResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeletePluginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DeletePluginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DeletePluginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.deletePlugin =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/DeletePlugin',
      request,
      metadata || {},
      methodDescriptor_PluginService_DeletePlugin,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeletePluginRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DeletePluginResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.deletePlugin =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/DeletePlugin',
      request,
      metadata || {},
      methodDescriptor_PluginService_DeletePlugin);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest,
 *   !proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse>}
 */
const methodDescriptor_PluginService_SetPluginContributor = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/SetPluginContributor',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest,
  proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.setPluginContributor =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/SetPluginContributor',
      request,
      metadata || {},
      methodDescriptor_PluginService_SetPluginContributor,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.setPluginContributor =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/SetPluginContributor',
      request,
      metadata || {},
      methodDescriptor_PluginService_SetPluginContributor);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse>}
 */
const methodDescriptor_PluginService_ListPluginContributors = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/ListPluginContributors',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest,
  proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.listPluginContributors =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListPluginContributors',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListPluginContributors,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.listPluginContributors =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListPluginContributors',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListPluginContributors);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse>}
 */
const methodDescriptor_PluginService_DeprecatePlugin = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/DeprecatePlugin',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest,
  proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.deprecatePlugin =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/DeprecatePlugin',
      request,
      metadata || {},
      methodDescriptor_PluginService_DeprecatePlugin,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.deprecatePlugin =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/DeprecatePlugin',
      request,
      metadata || {},
      methodDescriptor_PluginService_DeprecatePlugin);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse>}
 */
const methodDescriptor_PluginService_UndeprecatePlugin = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/UndeprecatePlugin',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest,
  proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.undeprecatePlugin =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/UndeprecatePlugin',
      request,
      metadata || {},
      methodDescriptor_PluginService_UndeprecatePlugin,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.undeprecatePlugin =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/UndeprecatePlugin',
      request,
      metadata || {},
      methodDescriptor_PluginService_UndeprecatePlugin);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetTemplateRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetTemplateResponse>}
 */
const methodDescriptor_PluginService_GetTemplate = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/GetTemplate',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetTemplateRequest,
  proto.buf.alpha.registry.v1alpha1.GetTemplateResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.getTemplate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/GetTemplate',
      request,
      metadata || {},
      methodDescriptor_PluginService_GetTemplate,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetTemplateResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.getTemplate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/GetTemplate',
      request,
      metadata || {},
      methodDescriptor_PluginService_GetTemplate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse>}
 */
const methodDescriptor_PluginService_ListTemplates = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/ListTemplates',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest,
  proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.listTemplates =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListTemplates',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListTemplates,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.listTemplates =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListTemplates',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListTemplates);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse>}
 */
const methodDescriptor_PluginService_ListUserTemplates = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/ListUserTemplates',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest,
  proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.listUserTemplates =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListUserTemplates',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListUserTemplates,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.listUserTemplates =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListUserTemplates',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListUserTemplates);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse>}
 */
const methodDescriptor_PluginService_ListOrganizationTemplates = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/ListOrganizationTemplates',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest,
  proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.listOrganizationTemplates =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListOrganizationTemplates',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListOrganizationTemplates,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.listOrganizationTemplates =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListOrganizationTemplates',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListOrganizationTemplates);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse>}
 */
const methodDescriptor_PluginService_GetTemplateVersion = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/GetTemplateVersion',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest,
  proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.getTemplateVersion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/GetTemplateVersion',
      request,
      metadata || {},
      methodDescriptor_PluginService_GetTemplateVersion,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.getTemplateVersion =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/GetTemplateVersion',
      request,
      metadata || {},
      methodDescriptor_PluginService_GetTemplateVersion);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse>}
 */
const methodDescriptor_PluginService_ListTemplateVersions = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/ListTemplateVersions',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest,
  proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.listTemplateVersions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListTemplateVersions',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListTemplateVersions,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.listTemplateVersions =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListTemplateVersions',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListTemplateVersions);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest,
 *   !proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse>}
 */
const methodDescriptor_PluginService_CreateTemplate = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/CreateTemplate',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest,
  proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.createTemplate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/CreateTemplate',
      request,
      metadata || {},
      methodDescriptor_PluginService_CreateTemplate,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.createTemplate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/CreateTemplate',
      request,
      metadata || {},
      methodDescriptor_PluginService_CreateTemplate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse>}
 */
const methodDescriptor_PluginService_DeleteTemplate = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/DeleteTemplate',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest,
  proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.deleteTemplate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/DeleteTemplate',
      request,
      metadata || {},
      methodDescriptor_PluginService_DeleteTemplate,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.deleteTemplate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/DeleteTemplate',
      request,
      metadata || {},
      methodDescriptor_PluginService_DeleteTemplate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest,
 *   !proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse>}
 */
const methodDescriptor_PluginService_CreateTemplateVersion = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/CreateTemplateVersion',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest,
  proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.createTemplateVersion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/CreateTemplateVersion',
      request,
      metadata || {},
      methodDescriptor_PluginService_CreateTemplateVersion,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.createTemplateVersion =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/CreateTemplateVersion',
      request,
      metadata || {},
      methodDescriptor_PluginService_CreateTemplateVersion);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest,
 *   !proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse>}
 */
const methodDescriptor_PluginService_SetTemplateContributor = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/SetTemplateContributor',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest,
  proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.setTemplateContributor =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/SetTemplateContributor',
      request,
      metadata || {},
      methodDescriptor_PluginService_SetTemplateContributor,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.setTemplateContributor =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/SetTemplateContributor',
      request,
      metadata || {},
      methodDescriptor_PluginService_SetTemplateContributor);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse>}
 */
const methodDescriptor_PluginService_ListTemplateContributors = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/ListTemplateContributors',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest,
  proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.listTemplateContributors =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListTemplateContributors',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListTemplateContributors,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.listTemplateContributors =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/ListTemplateContributors',
      request,
      metadata || {},
      methodDescriptor_PluginService_ListTemplateContributors);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse>}
 */
const methodDescriptor_PluginService_DeprecateTemplate = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/DeprecateTemplate',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest,
  proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.deprecateTemplate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/DeprecateTemplate',
      request,
      metadata || {},
      methodDescriptor_PluginService_DeprecateTemplate,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.deprecateTemplate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/DeprecateTemplate',
      request,
      metadata || {},
      methodDescriptor_PluginService_DeprecateTemplate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse>}
 */
const methodDescriptor_PluginService_UndeprecateTemplate = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.PluginService/UndeprecateTemplate',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest,
  proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.PluginServiceClient.prototype.undeprecateTemplate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/UndeprecateTemplate',
      request,
      metadata || {},
      methodDescriptor_PluginService_UndeprecateTemplate,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.PluginServicePromiseClient.prototype.undeprecateTemplate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.PluginService/UndeprecateTemplate',
      request,
      metadata || {},
      methodDescriptor_PluginService_UndeprecateTemplate);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


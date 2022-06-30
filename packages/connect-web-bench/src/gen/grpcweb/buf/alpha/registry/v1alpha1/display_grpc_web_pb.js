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
const proto = {};
proto.buf = {};
proto.buf.alpha = {};
proto.buf.alpha.registry = {};
proto.buf.alpha.registry.v1alpha1 = require('./display_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.DisplayServiceClient =
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
proto.buf.alpha.registry.v1alpha1.DisplayServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.DisplayOrganizationElementsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DisplayOrganizationElementsResponse>}
 */
const methodDescriptor_DisplayService_DisplayOrganizationElements = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.DisplayService/DisplayOrganizationElements',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DisplayOrganizationElementsRequest,
  proto.buf.alpha.registry.v1alpha1.DisplayOrganizationElementsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DisplayOrganizationElementsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DisplayOrganizationElementsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DisplayOrganizationElementsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DisplayOrganizationElementsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DisplayOrganizationElementsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.DisplayServiceClient.prototype.displayOrganizationElements =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/DisplayOrganizationElements',
      request,
      metadata || {},
      methodDescriptor_DisplayService_DisplayOrganizationElements,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DisplayOrganizationElementsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DisplayOrganizationElementsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.DisplayServicePromiseClient.prototype.displayOrganizationElements =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/DisplayOrganizationElements',
      request,
      metadata || {},
      methodDescriptor_DisplayService_DisplayOrganizationElements);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.DisplayRepositoryElementsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DisplayRepositoryElementsResponse>}
 */
const methodDescriptor_DisplayService_DisplayRepositoryElements = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.DisplayService/DisplayRepositoryElements',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DisplayRepositoryElementsRequest,
  proto.buf.alpha.registry.v1alpha1.DisplayRepositoryElementsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DisplayRepositoryElementsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DisplayRepositoryElementsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DisplayRepositoryElementsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DisplayRepositoryElementsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DisplayRepositoryElementsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.DisplayServiceClient.prototype.displayRepositoryElements =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/DisplayRepositoryElements',
      request,
      metadata || {},
      methodDescriptor_DisplayService_DisplayRepositoryElements,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DisplayRepositoryElementsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DisplayRepositoryElementsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.DisplayServicePromiseClient.prototype.displayRepositoryElements =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/DisplayRepositoryElements',
      request,
      metadata || {},
      methodDescriptor_DisplayService_DisplayRepositoryElements);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.DisplayPluginElementsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DisplayPluginElementsResponse>}
 */
const methodDescriptor_DisplayService_DisplayPluginElements = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.DisplayService/DisplayPluginElements',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DisplayPluginElementsRequest,
  proto.buf.alpha.registry.v1alpha1.DisplayPluginElementsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DisplayPluginElementsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DisplayPluginElementsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DisplayPluginElementsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DisplayPluginElementsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DisplayPluginElementsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.DisplayServiceClient.prototype.displayPluginElements =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/DisplayPluginElements',
      request,
      metadata || {},
      methodDescriptor_DisplayService_DisplayPluginElements,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DisplayPluginElementsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DisplayPluginElementsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.DisplayServicePromiseClient.prototype.displayPluginElements =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/DisplayPluginElements',
      request,
      metadata || {},
      methodDescriptor_DisplayService_DisplayPluginElements);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.DisplayTemplateElementsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DisplayTemplateElementsResponse>}
 */
const methodDescriptor_DisplayService_DisplayTemplateElements = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.DisplayService/DisplayTemplateElements',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DisplayTemplateElementsRequest,
  proto.buf.alpha.registry.v1alpha1.DisplayTemplateElementsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DisplayTemplateElementsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DisplayTemplateElementsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DisplayTemplateElementsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DisplayTemplateElementsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DisplayTemplateElementsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.DisplayServiceClient.prototype.displayTemplateElements =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/DisplayTemplateElements',
      request,
      metadata || {},
      methodDescriptor_DisplayService_DisplayTemplateElements,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DisplayTemplateElementsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DisplayTemplateElementsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.DisplayServicePromiseClient.prototype.displayTemplateElements =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/DisplayTemplateElements',
      request,
      metadata || {},
      methodDescriptor_DisplayService_DisplayTemplateElements);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.DisplayUserElementsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DisplayUserElementsResponse>}
 */
const methodDescriptor_DisplayService_DisplayUserElements = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.DisplayService/DisplayUserElements',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DisplayUserElementsRequest,
  proto.buf.alpha.registry.v1alpha1.DisplayUserElementsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DisplayUserElementsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DisplayUserElementsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DisplayUserElementsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DisplayUserElementsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DisplayUserElementsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.DisplayServiceClient.prototype.displayUserElements =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/DisplayUserElements',
      request,
      metadata || {},
      methodDescriptor_DisplayService_DisplayUserElements,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DisplayUserElementsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DisplayUserElementsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.DisplayServicePromiseClient.prototype.displayUserElements =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/DisplayUserElements',
      request,
      metadata || {},
      methodDescriptor_DisplayService_DisplayUserElements);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.DisplayServerElementsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DisplayServerElementsResponse>}
 */
const methodDescriptor_DisplayService_DisplayServerElements = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.DisplayService/DisplayServerElements',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DisplayServerElementsRequest,
  proto.buf.alpha.registry.v1alpha1.DisplayServerElementsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DisplayServerElementsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DisplayServerElementsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DisplayServerElementsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DisplayServerElementsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DisplayServerElementsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.DisplayServiceClient.prototype.displayServerElements =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/DisplayServerElements',
      request,
      metadata || {},
      methodDescriptor_DisplayService_DisplayServerElements,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DisplayServerElementsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DisplayServerElementsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.DisplayServicePromiseClient.prototype.displayServerElements =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/DisplayServerElements',
      request,
      metadata || {},
      methodDescriptor_DisplayService_DisplayServerElements);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListManageableRepositoryRolesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListManageableRepositoryRolesResponse>}
 */
const methodDescriptor_DisplayService_ListManageableRepositoryRoles = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.DisplayService/ListManageableRepositoryRoles',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListManageableRepositoryRolesRequest,
  proto.buf.alpha.registry.v1alpha1.ListManageableRepositoryRolesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListManageableRepositoryRolesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListManageableRepositoryRolesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListManageableRepositoryRolesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListManageableRepositoryRolesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListManageableRepositoryRolesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.DisplayServiceClient.prototype.listManageableRepositoryRoles =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/ListManageableRepositoryRoles',
      request,
      metadata || {},
      methodDescriptor_DisplayService_ListManageableRepositoryRoles,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListManageableRepositoryRolesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListManageableRepositoryRolesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.DisplayServicePromiseClient.prototype.listManageableRepositoryRoles =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/ListManageableRepositoryRoles',
      request,
      metadata || {},
      methodDescriptor_DisplayService_ListManageableRepositoryRoles);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListManageableUserRepositoryRolesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListManageableUserRepositoryRolesResponse>}
 */
const methodDescriptor_DisplayService_ListManageableUserRepositoryRoles = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.DisplayService/ListManageableUserRepositoryRoles',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListManageableUserRepositoryRolesRequest,
  proto.buf.alpha.registry.v1alpha1.ListManageableUserRepositoryRolesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListManageableUserRepositoryRolesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListManageableUserRepositoryRolesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListManageableUserRepositoryRolesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListManageableUserRepositoryRolesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListManageableUserRepositoryRolesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.DisplayServiceClient.prototype.listManageableUserRepositoryRoles =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/ListManageableUserRepositoryRoles',
      request,
      metadata || {},
      methodDescriptor_DisplayService_ListManageableUserRepositoryRoles,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListManageableUserRepositoryRolesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListManageableUserRepositoryRolesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.DisplayServicePromiseClient.prototype.listManageableUserRepositoryRoles =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/ListManageableUserRepositoryRoles',
      request,
      metadata || {},
      methodDescriptor_DisplayService_ListManageableUserRepositoryRoles);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListManageablePluginRolesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListManageablePluginRolesResponse>}
 */
const methodDescriptor_DisplayService_ListManageablePluginRoles = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.DisplayService/ListManageablePluginRoles',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListManageablePluginRolesRequest,
  proto.buf.alpha.registry.v1alpha1.ListManageablePluginRolesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListManageablePluginRolesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListManageablePluginRolesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListManageablePluginRolesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListManageablePluginRolesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListManageablePluginRolesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.DisplayServiceClient.prototype.listManageablePluginRoles =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/ListManageablePluginRoles',
      request,
      metadata || {},
      methodDescriptor_DisplayService_ListManageablePluginRoles,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListManageablePluginRolesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListManageablePluginRolesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.DisplayServicePromiseClient.prototype.listManageablePluginRoles =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/ListManageablePluginRoles',
      request,
      metadata || {},
      methodDescriptor_DisplayService_ListManageablePluginRoles);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListManageableUserPluginRolesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListManageableUserPluginRolesResponse>}
 */
const methodDescriptor_DisplayService_ListManageableUserPluginRoles = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.DisplayService/ListManageableUserPluginRoles',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListManageableUserPluginRolesRequest,
  proto.buf.alpha.registry.v1alpha1.ListManageableUserPluginRolesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListManageableUserPluginRolesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListManageableUserPluginRolesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListManageableUserPluginRolesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListManageableUserPluginRolesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListManageableUserPluginRolesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.DisplayServiceClient.prototype.listManageableUserPluginRoles =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/ListManageableUserPluginRoles',
      request,
      metadata || {},
      methodDescriptor_DisplayService_ListManageableUserPluginRoles,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListManageableUserPluginRolesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListManageableUserPluginRolesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.DisplayServicePromiseClient.prototype.listManageableUserPluginRoles =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/ListManageableUserPluginRoles',
      request,
      metadata || {},
      methodDescriptor_DisplayService_ListManageableUserPluginRoles);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListManageableTemplateRolesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListManageableTemplateRolesResponse>}
 */
const methodDescriptor_DisplayService_ListManageableTemplateRoles = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.DisplayService/ListManageableTemplateRoles',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListManageableTemplateRolesRequest,
  proto.buf.alpha.registry.v1alpha1.ListManageableTemplateRolesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListManageableTemplateRolesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListManageableTemplateRolesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListManageableTemplateRolesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListManageableTemplateRolesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListManageableTemplateRolesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.DisplayServiceClient.prototype.listManageableTemplateRoles =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/ListManageableTemplateRoles',
      request,
      metadata || {},
      methodDescriptor_DisplayService_ListManageableTemplateRoles,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListManageableTemplateRolesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListManageableTemplateRolesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.DisplayServicePromiseClient.prototype.listManageableTemplateRoles =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/ListManageableTemplateRoles',
      request,
      metadata || {},
      methodDescriptor_DisplayService_ListManageableTemplateRoles);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListManageableUserTemplateRolesRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListManageableUserTemplateRolesResponse>}
 */
const methodDescriptor_DisplayService_ListManageableUserTemplateRoles = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.DisplayService/ListManageableUserTemplateRoles',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListManageableUserTemplateRolesRequest,
  proto.buf.alpha.registry.v1alpha1.ListManageableUserTemplateRolesResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListManageableUserTemplateRolesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListManageableUserTemplateRolesResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListManageableUserTemplateRolesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListManageableUserTemplateRolesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListManageableUserTemplateRolesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.DisplayServiceClient.prototype.listManageableUserTemplateRoles =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/ListManageableUserTemplateRoles',
      request,
      metadata || {},
      methodDescriptor_DisplayService_ListManageableUserTemplateRoles,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListManageableUserTemplateRolesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListManageableUserTemplateRolesResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.DisplayServicePromiseClient.prototype.listManageableUserTemplateRoles =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.DisplayService/ListManageableUserTemplateRoles',
      request,
      metadata || {},
      methodDescriptor_DisplayService_ListManageableUserTemplateRoles);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


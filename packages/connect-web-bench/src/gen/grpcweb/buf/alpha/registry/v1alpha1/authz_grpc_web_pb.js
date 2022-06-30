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
proto.buf.alpha.registry.v1alpha1 = require('./authz_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient =
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
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationRepositoryRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationRepositoryResponse>}
 */
const methodDescriptor_AuthzService_UserCanCreateOrganizationRepository = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanCreateOrganizationRepository',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationRepositoryRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationRepositoryResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationRepositoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationRepositoryResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationRepositoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationRepositoryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationRepositoryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanCreateOrganizationRepository =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanCreateOrganizationRepository',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanCreateOrganizationRepository,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationRepositoryRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationRepositoryResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanCreateOrganizationRepository =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanCreateOrganizationRepository',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanCreateOrganizationRepository);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanSeeRepositorySettingsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanSeeRepositorySettingsResponse>}
 */
const methodDescriptor_AuthzService_UserCanSeeRepositorySettings = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanSeeRepositorySettings',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanSeeRepositorySettingsRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanSeeRepositorySettingsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanSeeRepositorySettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanSeeRepositorySettingsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanSeeRepositorySettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanSeeRepositorySettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanSeeRepositorySettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanSeeRepositorySettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanSeeRepositorySettings',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanSeeRepositorySettings,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanSeeRepositorySettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanSeeRepositorySettingsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanSeeRepositorySettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanSeeRepositorySettings',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanSeeRepositorySettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanSeeOrganizationSettingsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanSeeOrganizationSettingsResponse>}
 */
const methodDescriptor_AuthzService_UserCanSeeOrganizationSettings = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanSeeOrganizationSettings',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanSeeOrganizationSettingsRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanSeeOrganizationSettingsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanSeeOrganizationSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanSeeOrganizationSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanSeeOrganizationSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanSeeOrganizationSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanSeeOrganizationSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanSeeOrganizationSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanSeeOrganizationSettings',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanSeeOrganizationSettings,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanSeeOrganizationSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanSeeOrganizationSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanSeeOrganizationSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanSeeOrganizationSettings',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanSeeOrganizationSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanReadPluginRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanReadPluginResponse>}
 */
const methodDescriptor_AuthzService_UserCanReadPlugin = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanReadPlugin',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanReadPluginRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanReadPluginResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanReadPluginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanReadPluginResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanReadPluginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanReadPluginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanReadPluginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanReadPlugin =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanReadPlugin',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanReadPlugin,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanReadPluginRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanReadPluginResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanReadPlugin =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanReadPlugin',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanReadPlugin);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanCreatePluginVersionRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanCreatePluginVersionResponse>}
 */
const methodDescriptor_AuthzService_UserCanCreatePluginVersion = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanCreatePluginVersion',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanCreatePluginVersionRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanCreatePluginVersionResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanCreatePluginVersionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanCreatePluginVersionResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanCreatePluginVersionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanCreatePluginVersionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanCreatePluginVersionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanCreatePluginVersion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanCreatePluginVersion',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanCreatePluginVersion,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanCreatePluginVersionRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanCreatePluginVersionResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanCreatePluginVersion =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanCreatePluginVersion',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanCreatePluginVersion);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanCreateTemplateVersionRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanCreateTemplateVersionResponse>}
 */
const methodDescriptor_AuthzService_UserCanCreateTemplateVersion = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanCreateTemplateVersion',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanCreateTemplateVersionRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanCreateTemplateVersionResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanCreateTemplateVersionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanCreateTemplateVersionResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanCreateTemplateVersionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanCreateTemplateVersionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanCreateTemplateVersionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanCreateTemplateVersion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanCreateTemplateVersion',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanCreateTemplateVersion,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanCreateTemplateVersionRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanCreateTemplateVersionResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanCreateTemplateVersion =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanCreateTemplateVersion',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanCreateTemplateVersion);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationPluginRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationPluginResponse>}
 */
const methodDescriptor_AuthzService_UserCanCreateOrganizationPlugin = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanCreateOrganizationPlugin',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationPluginRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationPluginResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationPluginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationPluginResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationPluginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationPluginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationPluginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanCreateOrganizationPlugin =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanCreateOrganizationPlugin',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanCreateOrganizationPlugin,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationPluginRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationPluginResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanCreateOrganizationPlugin =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanCreateOrganizationPlugin',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanCreateOrganizationPlugin);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationTemplateRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationTemplateResponse>}
 */
const methodDescriptor_AuthzService_UserCanCreateOrganizationTemplate = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanCreateOrganizationTemplate',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationTemplateRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationTemplateResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanCreateOrganizationTemplate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanCreateOrganizationTemplate',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanCreateOrganizationTemplate,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanCreateOrganizationTemplateResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanCreateOrganizationTemplate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanCreateOrganizationTemplate',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanCreateOrganizationTemplate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanSeePluginSettingsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanSeePluginSettingsResponse>}
 */
const methodDescriptor_AuthzService_UserCanSeePluginSettings = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanSeePluginSettings',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanSeePluginSettingsRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanSeePluginSettingsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanSeePluginSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanSeePluginSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanSeePluginSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanSeePluginSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanSeePluginSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanSeePluginSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanSeePluginSettings',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanSeePluginSettings,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanSeePluginSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanSeePluginSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanSeePluginSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanSeePluginSettings',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanSeePluginSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanSeeTemplateSettingsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanSeeTemplateSettingsResponse>}
 */
const methodDescriptor_AuthzService_UserCanSeeTemplateSettings = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanSeeTemplateSettings',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanSeeTemplateSettingsRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanSeeTemplateSettingsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanSeeTemplateSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanSeeTemplateSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanSeeTemplateSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanSeeTemplateSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanSeeTemplateSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanSeeTemplateSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanSeeTemplateSettings',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanSeeTemplateSettings,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanSeeTemplateSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanSeeTemplateSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanSeeTemplateSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanSeeTemplateSettings',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanSeeTemplateSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanAddOrganizationMemberRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanAddOrganizationMemberResponse>}
 */
const methodDescriptor_AuthzService_UserCanAddOrganizationMember = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanAddOrganizationMember',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanAddOrganizationMemberRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanAddOrganizationMemberResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanAddOrganizationMemberRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanAddOrganizationMemberResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanAddOrganizationMemberRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanAddOrganizationMemberResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanAddOrganizationMemberResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanAddOrganizationMember =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanAddOrganizationMember',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanAddOrganizationMember,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanAddOrganizationMemberRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanAddOrganizationMemberResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanAddOrganizationMember =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanAddOrganizationMember',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanAddOrganizationMember);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanUpdateOrganizationMemberRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanUpdateOrganizationMemberResponse>}
 */
const methodDescriptor_AuthzService_UserCanUpdateOrganizationMember = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanUpdateOrganizationMember',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanUpdateOrganizationMemberRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanUpdateOrganizationMemberResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanUpdateOrganizationMemberRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanUpdateOrganizationMemberResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanUpdateOrganizationMemberRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanUpdateOrganizationMemberResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanUpdateOrganizationMemberResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanUpdateOrganizationMember =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanUpdateOrganizationMember',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanUpdateOrganizationMember,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanUpdateOrganizationMemberRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanUpdateOrganizationMemberResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanUpdateOrganizationMember =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanUpdateOrganizationMember',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanUpdateOrganizationMember);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanRemoveOrganizationMemberRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanRemoveOrganizationMemberResponse>}
 */
const methodDescriptor_AuthzService_UserCanRemoveOrganizationMember = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanRemoveOrganizationMember',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanRemoveOrganizationMemberRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanRemoveOrganizationMemberResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanRemoveOrganizationMemberRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanRemoveOrganizationMemberResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanRemoveOrganizationMemberRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanRemoveOrganizationMemberResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanRemoveOrganizationMemberResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanRemoveOrganizationMember =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanRemoveOrganizationMember',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanRemoveOrganizationMember,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanRemoveOrganizationMemberRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanRemoveOrganizationMemberResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanRemoveOrganizationMember =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanRemoveOrganizationMember',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanRemoveOrganizationMember);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanDeleteOrganizationRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanDeleteOrganizationResponse>}
 */
const methodDescriptor_AuthzService_UserCanDeleteOrganization = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanDeleteOrganization',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanDeleteOrganizationRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanDeleteOrganizationResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanDeleteOrganizationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanDeleteOrganizationResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanDeleteOrganizationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanDeleteOrganizationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanDeleteOrganizationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanDeleteOrganization =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanDeleteOrganization',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanDeleteOrganization,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanDeleteOrganizationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanDeleteOrganizationResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanDeleteOrganization =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanDeleteOrganization',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanDeleteOrganization);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanDeleteRepositoryRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanDeleteRepositoryResponse>}
 */
const methodDescriptor_AuthzService_UserCanDeleteRepository = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanDeleteRepository',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanDeleteRepositoryRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanDeleteRepositoryResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanDeleteRepositoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanDeleteRepositoryResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanDeleteRepositoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanDeleteRepositoryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanDeleteRepositoryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanDeleteRepository =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanDeleteRepository',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanDeleteRepository,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanDeleteRepositoryRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanDeleteRepositoryResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanDeleteRepository =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanDeleteRepository',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanDeleteRepository);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanDeleteTemplateRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanDeleteTemplateResponse>}
 */
const methodDescriptor_AuthzService_UserCanDeleteTemplate = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanDeleteTemplate',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanDeleteTemplateRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanDeleteTemplateResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanDeleteTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanDeleteTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanDeleteTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanDeleteTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanDeleteTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanDeleteTemplate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanDeleteTemplate',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanDeleteTemplate,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanDeleteTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanDeleteTemplateResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanDeleteTemplate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanDeleteTemplate',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanDeleteTemplate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanDeletePluginRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanDeletePluginResponse>}
 */
const methodDescriptor_AuthzService_UserCanDeletePlugin = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanDeletePlugin',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanDeletePluginRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanDeletePluginResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanDeletePluginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanDeletePluginResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanDeletePluginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanDeletePluginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanDeletePluginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanDeletePlugin =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanDeletePlugin',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanDeletePlugin,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanDeletePluginRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanDeletePluginResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanDeletePlugin =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanDeletePlugin',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanDeletePlugin);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanDeleteUserRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanDeleteUserResponse>}
 */
const methodDescriptor_AuthzService_UserCanDeleteUser = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanDeleteUser',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanDeleteUserRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanDeleteUserResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanDeleteUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanDeleteUserResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanDeleteUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanDeleteUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanDeleteUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanDeleteUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanDeleteUser',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanDeleteUser,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanDeleteUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanDeleteUserResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanDeleteUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanDeleteUser',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanDeleteUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanSeeServerAdminPanelRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanSeeServerAdminPanelResponse>}
 */
const methodDescriptor_AuthzService_UserCanSeeServerAdminPanel = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanSeeServerAdminPanel',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanSeeServerAdminPanelRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanSeeServerAdminPanelResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanSeeServerAdminPanelRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanSeeServerAdminPanelResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanSeeServerAdminPanelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanSeeServerAdminPanelResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanSeeServerAdminPanelResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanSeeServerAdminPanel =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanSeeServerAdminPanel',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanSeeServerAdminPanel,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanSeeServerAdminPanelRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanSeeServerAdminPanelResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanSeeServerAdminPanel =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanSeeServerAdminPanel',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanSeeServerAdminPanel);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanManageRepositoryContributorsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanManageRepositoryContributorsResponse>}
 */
const methodDescriptor_AuthzService_UserCanManageRepositoryContributors = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanManageRepositoryContributors',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanManageRepositoryContributorsRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanManageRepositoryContributorsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanManageRepositoryContributorsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanManageRepositoryContributorsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanManageRepositoryContributorsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanManageRepositoryContributorsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanManageRepositoryContributorsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanManageRepositoryContributors =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanManageRepositoryContributors',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanManageRepositoryContributors,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanManageRepositoryContributorsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanManageRepositoryContributorsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanManageRepositoryContributors =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanManageRepositoryContributors',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanManageRepositoryContributors);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanManagePluginContributorsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanManagePluginContributorsResponse>}
 */
const methodDescriptor_AuthzService_UserCanManagePluginContributors = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanManagePluginContributors',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanManagePluginContributorsRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanManagePluginContributorsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanManagePluginContributorsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanManagePluginContributorsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanManagePluginContributorsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanManagePluginContributorsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanManagePluginContributorsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanManagePluginContributors =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanManagePluginContributors',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanManagePluginContributors,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanManagePluginContributorsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanManagePluginContributorsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanManagePluginContributors =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanManagePluginContributors',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanManagePluginContributors);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UserCanManageTemplateContributorsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UserCanManageTemplateContributorsResponse>}
 */
const methodDescriptor_AuthzService_UserCanManageTemplateContributors = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.AuthzService/UserCanManageTemplateContributors',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UserCanManageTemplateContributorsRequest,
  proto.buf.alpha.registry.v1alpha1.UserCanManageTemplateContributorsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UserCanManageTemplateContributorsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UserCanManageTemplateContributorsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanManageTemplateContributorsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UserCanManageTemplateContributorsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UserCanManageTemplateContributorsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.AuthzServiceClient.prototype.userCanManageTemplateContributors =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanManageTemplateContributors',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanManageTemplateContributors,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UserCanManageTemplateContributorsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UserCanManageTemplateContributorsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.AuthzServicePromiseClient.prototype.userCanManageTemplateContributors =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.AuthzService/UserCanManageTemplateContributors',
      request,
      metadata || {},
      methodDescriptor_AuthzService_UserCanManageTemplateContributors);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


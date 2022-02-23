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

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')
const proto = {};
proto.buf = {};
proto.buf.alpha = {};
proto.buf.alpha.registry = {};
proto.buf.alpha.registry.v1alpha1 = require('./organization_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServiceClient =
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
proto.buf.alpha.registry.v1alpha1.OrganizationServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.GetOrganizationRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetOrganizationResponse>}
 */
const methodDescriptor_OrganizationService_GetOrganization = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.OrganizationService/GetOrganization',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetOrganizationRequest,
  proto.buf.alpha.registry.v1alpha1.GetOrganizationResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetOrganizationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetOrganizationResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetOrganizationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetOrganizationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetOrganizationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServiceClient.prototype.getOrganization =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/GetOrganization',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_GetOrganization,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetOrganizationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetOrganizationResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServicePromiseClient.prototype.getOrganization =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/GetOrganization',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_GetOrganization);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetOrganizationByNameRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetOrganizationByNameResponse>}
 */
const methodDescriptor_OrganizationService_GetOrganizationByName = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.OrganizationService/GetOrganizationByName',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetOrganizationByNameRequest,
  proto.buf.alpha.registry.v1alpha1.GetOrganizationByNameResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetOrganizationByNameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetOrganizationByNameResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetOrganizationByNameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetOrganizationByNameResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetOrganizationByNameResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServiceClient.prototype.getOrganizationByName =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/GetOrganizationByName',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_GetOrganizationByName,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetOrganizationByNameRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetOrganizationByNameResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServicePromiseClient.prototype.getOrganizationByName =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/GetOrganizationByName',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_GetOrganizationByName);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListOrganizationsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListOrganizationsResponse>}
 */
const methodDescriptor_OrganizationService_ListOrganizations = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.OrganizationService/ListOrganizations',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListOrganizationsRequest,
  proto.buf.alpha.registry.v1alpha1.ListOrganizationsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListOrganizationsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListOrganizationsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListOrganizationsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServiceClient.prototype.listOrganizations =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/ListOrganizations',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_ListOrganizations,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListOrganizationsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServicePromiseClient.prototype.listOrganizations =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/ListOrganizations',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_ListOrganizations);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListUserOrganizationsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListUserOrganizationsResponse>}
 */
const methodDescriptor_OrganizationService_ListUserOrganizations = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.OrganizationService/ListUserOrganizations',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListUserOrganizationsRequest,
  proto.buf.alpha.registry.v1alpha1.ListUserOrganizationsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListUserOrganizationsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListUserOrganizationsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserOrganizationsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListUserOrganizationsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListUserOrganizationsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServiceClient.prototype.listUserOrganizations =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/ListUserOrganizations',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_ListUserOrganizations,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserOrganizationsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListUserOrganizationsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServicePromiseClient.prototype.listUserOrganizations =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/ListUserOrganizations',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_ListUserOrganizations);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.CreateOrganizationRequest,
 *   !proto.buf.alpha.registry.v1alpha1.CreateOrganizationResponse>}
 */
const methodDescriptor_OrganizationService_CreateOrganization = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.OrganizationService/CreateOrganization',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.CreateOrganizationRequest,
  proto.buf.alpha.registry.v1alpha1.CreateOrganizationResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.CreateOrganizationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.CreateOrganizationResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateOrganizationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.CreateOrganizationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.CreateOrganizationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServiceClient.prototype.createOrganization =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/CreateOrganization',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_CreateOrganization,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateOrganizationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.CreateOrganizationResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServicePromiseClient.prototype.createOrganization =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/CreateOrganization',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_CreateOrganization);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.DeleteOrganizationRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DeleteOrganizationResponse>}
 */
const methodDescriptor_OrganizationService_DeleteOrganization = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.OrganizationService/DeleteOrganization',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DeleteOrganizationRequest,
  proto.buf.alpha.registry.v1alpha1.DeleteOrganizationResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DeleteOrganizationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DeleteOrganizationResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteOrganizationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DeleteOrganizationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DeleteOrganizationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServiceClient.prototype.deleteOrganization =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/DeleteOrganization',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_DeleteOrganization,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteOrganizationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DeleteOrganizationResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServicePromiseClient.prototype.deleteOrganization =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/DeleteOrganization',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_DeleteOrganization);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.DeleteOrganizationByNameRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DeleteOrganizationByNameResponse>}
 */
const methodDescriptor_OrganizationService_DeleteOrganizationByName = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.OrganizationService/DeleteOrganizationByName',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DeleteOrganizationByNameRequest,
  proto.buf.alpha.registry.v1alpha1.DeleteOrganizationByNameResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DeleteOrganizationByNameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DeleteOrganizationByNameResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteOrganizationByNameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DeleteOrganizationByNameResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DeleteOrganizationByNameResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServiceClient.prototype.deleteOrganizationByName =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/DeleteOrganizationByName',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_DeleteOrganizationByName,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteOrganizationByNameRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DeleteOrganizationByNameResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServicePromiseClient.prototype.deleteOrganizationByName =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/DeleteOrganizationByName',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_DeleteOrganizationByName);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.AddOrganizationMemberRequest,
 *   !proto.buf.alpha.registry.v1alpha1.AddOrganizationMemberResponse>}
 */
const methodDescriptor_OrganizationService_AddOrganizationMember = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.OrganizationService/AddOrganizationMember',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.AddOrganizationMemberRequest,
  proto.buf.alpha.registry.v1alpha1.AddOrganizationMemberResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.AddOrganizationMemberRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.AddOrganizationMemberResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.AddOrganizationMemberRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.AddOrganizationMemberResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.AddOrganizationMemberResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServiceClient.prototype.addOrganizationMember =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/AddOrganizationMember',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_AddOrganizationMember,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.AddOrganizationMemberRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.AddOrganizationMemberResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServicePromiseClient.prototype.addOrganizationMember =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/AddOrganizationMember',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_AddOrganizationMember);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UpdateOrganizationMemberRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UpdateOrganizationMemberResponse>}
 */
const methodDescriptor_OrganizationService_UpdateOrganizationMember = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.OrganizationService/UpdateOrganizationMember',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UpdateOrganizationMemberRequest,
  proto.buf.alpha.registry.v1alpha1.UpdateOrganizationMemberResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UpdateOrganizationMemberRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UpdateOrganizationMemberResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UpdateOrganizationMemberRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UpdateOrganizationMemberResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UpdateOrganizationMemberResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServiceClient.prototype.updateOrganizationMember =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/UpdateOrganizationMember',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_UpdateOrganizationMember,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UpdateOrganizationMemberRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UpdateOrganizationMemberResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServicePromiseClient.prototype.updateOrganizationMember =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/UpdateOrganizationMember',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_UpdateOrganizationMember);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.RemoveOrganizationMemberRequest,
 *   !proto.buf.alpha.registry.v1alpha1.RemoveOrganizationMemberResponse>}
 */
const methodDescriptor_OrganizationService_RemoveOrganizationMember = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.OrganizationService/RemoveOrganizationMember',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.RemoveOrganizationMemberRequest,
  proto.buf.alpha.registry.v1alpha1.RemoveOrganizationMemberResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.RemoveOrganizationMemberRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.RemoveOrganizationMemberResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.RemoveOrganizationMemberRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.RemoveOrganizationMemberResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.RemoveOrganizationMemberResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServiceClient.prototype.removeOrganizationMember =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/RemoveOrganizationMember',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_RemoveOrganizationMember,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.RemoveOrganizationMemberRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.RemoveOrganizationMemberResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServicePromiseClient.prototype.removeOrganizationMember =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/RemoveOrganizationMember',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_RemoveOrganizationMember);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.SetOrganizationMemberRequest,
 *   !proto.buf.alpha.registry.v1alpha1.SetOrganizationMemberResponse>}
 */
const methodDescriptor_OrganizationService_SetOrganizationMember = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.OrganizationService/SetOrganizationMember',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.SetOrganizationMemberRequest,
  proto.buf.alpha.registry.v1alpha1.SetOrganizationMemberResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.SetOrganizationMemberRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.SetOrganizationMemberResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.SetOrganizationMemberRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.SetOrganizationMemberResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.SetOrganizationMemberResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServiceClient.prototype.setOrganizationMember =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/SetOrganizationMember',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_SetOrganizationMember,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.SetOrganizationMemberRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.SetOrganizationMemberResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServicePromiseClient.prototype.setOrganizationMember =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/SetOrganizationMember',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_SetOrganizationMember);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetOrganizationSettingsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetOrganizationSettingsResponse>}
 */
const methodDescriptor_OrganizationService_GetOrganizationSettings = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.OrganizationService/GetOrganizationSettings',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetOrganizationSettingsRequest,
  proto.buf.alpha.registry.v1alpha1.GetOrganizationSettingsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetOrganizationSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetOrganizationSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetOrganizationSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetOrganizationSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetOrganizationSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServiceClient.prototype.getOrganizationSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/GetOrganizationSettings',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_GetOrganizationSettings,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetOrganizationSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetOrganizationSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServicePromiseClient.prototype.getOrganizationSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/GetOrganizationSettings',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_GetOrganizationSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UpdateOrganizationSettingsRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UpdateOrganizationSettingsResponse>}
 */
const methodDescriptor_OrganizationService_UpdateOrganizationSettings = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.OrganizationService/UpdateOrganizationSettings',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UpdateOrganizationSettingsRequest,
  proto.buf.alpha.registry.v1alpha1.UpdateOrganizationSettingsResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UpdateOrganizationSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UpdateOrganizationSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UpdateOrganizationSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UpdateOrganizationSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UpdateOrganizationSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServiceClient.prototype.updateOrganizationSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/UpdateOrganizationSettings',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_UpdateOrganizationSettings,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UpdateOrganizationSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UpdateOrganizationSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.OrganizationServicePromiseClient.prototype.updateOrganizationSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.OrganizationService/UpdateOrganizationSettings',
      request,
      metadata || {},
      methodDescriptor_OrganizationService_UpdateOrganizationSettings);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


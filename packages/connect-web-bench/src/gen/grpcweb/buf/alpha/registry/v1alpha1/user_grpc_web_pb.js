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
proto.buf.alpha.registry.v1alpha1 = require('./user_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.buf.alpha.registry.v1alpha1.UserServiceClient =
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
proto.buf.alpha.registry.v1alpha1.UserServicePromiseClient =
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
 *   !proto.buf.alpha.registry.v1alpha1.CreateUserRequest,
 *   !proto.buf.alpha.registry.v1alpha1.CreateUserResponse>}
 */
const methodDescriptor_UserService_CreateUser = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.UserService/CreateUser',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.CreateUserRequest,
  proto.buf.alpha.registry.v1alpha1.CreateUserResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.CreateUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.CreateUserResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.CreateUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.CreateUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.UserServiceClient.prototype.createUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.UserService/CreateUser',
      request,
      metadata || {},
      methodDescriptor_UserService_CreateUser,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.CreateUserResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.UserServicePromiseClient.prototype.createUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.UserService/CreateUser',
      request,
      metadata || {},
      methodDescriptor_UserService_CreateUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetUserRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetUserResponse>}
 */
const methodDescriptor_UserService_GetUser = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.UserService/GetUser',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetUserRequest,
  proto.buf.alpha.registry.v1alpha1.GetUserResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetUserResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.UserServiceClient.prototype.getUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.UserService/GetUser',
      request,
      metadata || {},
      methodDescriptor_UserService_GetUser,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetUserResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.UserServicePromiseClient.prototype.getUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.UserService/GetUser',
      request,
      metadata || {},
      methodDescriptor_UserService_GetUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.GetUserByUsernameRequest,
 *   !proto.buf.alpha.registry.v1alpha1.GetUserByUsernameResponse>}
 */
const methodDescriptor_UserService_GetUserByUsername = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.UserService/GetUserByUsername',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.GetUserByUsernameRequest,
  proto.buf.alpha.registry.v1alpha1.GetUserByUsernameResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.GetUserByUsernameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.GetUserByUsernameResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetUserByUsernameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.GetUserByUsernameResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.GetUserByUsernameResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.UserServiceClient.prototype.getUserByUsername =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.UserService/GetUserByUsername',
      request,
      metadata || {},
      methodDescriptor_UserService_GetUserByUsername,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.GetUserByUsernameRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.GetUserByUsernameResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.UserServicePromiseClient.prototype.getUserByUsername =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.UserService/GetUserByUsername',
      request,
      metadata || {},
      methodDescriptor_UserService_GetUserByUsername);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListUsersRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListUsersResponse>}
 */
const methodDescriptor_UserService_ListUsers = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.UserService/ListUsers',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListUsersRequest,
  proto.buf.alpha.registry.v1alpha1.ListUsersResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListUsersResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListUsersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListUsersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.UserServiceClient.prototype.listUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.UserService/ListUsers',
      request,
      metadata || {},
      methodDescriptor_UserService_ListUsers,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListUsersResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.UserServicePromiseClient.prototype.listUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.UserService/ListUsers',
      request,
      metadata || {},
      methodDescriptor_UserService_ListUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.ListOrganizationUsersRequest,
 *   !proto.buf.alpha.registry.v1alpha1.ListOrganizationUsersResponse>}
 */
const methodDescriptor_UserService_ListOrganizationUsers = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.UserService/ListOrganizationUsers',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.ListOrganizationUsersRequest,
  proto.buf.alpha.registry.v1alpha1.ListOrganizationUsersResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.ListOrganizationUsersResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.ListOrganizationUsersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.ListOrganizationUsersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.UserServiceClient.prototype.listOrganizationUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.UserService/ListOrganizationUsers',
      request,
      metadata || {},
      methodDescriptor_UserService_ListOrganizationUsers,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.ListOrganizationUsersResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.UserServicePromiseClient.prototype.listOrganizationUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.UserService/ListOrganizationUsers',
      request,
      metadata || {},
      methodDescriptor_UserService_ListOrganizationUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.DeleteUserRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DeleteUserResponse>}
 */
const methodDescriptor_UserService_DeleteUser = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.UserService/DeleteUser',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DeleteUserRequest,
  proto.buf.alpha.registry.v1alpha1.DeleteUserResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DeleteUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DeleteUserResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DeleteUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DeleteUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.UserServiceClient.prototype.deleteUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.UserService/DeleteUser',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteUser,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DeleteUserResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.UserServicePromiseClient.prototype.deleteUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.UserService/DeleteUser',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.DeactivateUserRequest,
 *   !proto.buf.alpha.registry.v1alpha1.DeactivateUserResponse>}
 */
const methodDescriptor_UserService_DeactivateUser = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.UserService/DeactivateUser',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.DeactivateUserRequest,
  proto.buf.alpha.registry.v1alpha1.DeactivateUserResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.DeactivateUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.DeactivateUserResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeactivateUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.DeactivateUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.DeactivateUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.UserServiceClient.prototype.deactivateUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.UserService/DeactivateUser',
      request,
      metadata || {},
      methodDescriptor_UserService_DeactivateUser,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.DeactivateUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.DeactivateUserResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.UserServicePromiseClient.prototype.deactivateUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.UserService/DeactivateUser',
      request,
      metadata || {},
      methodDescriptor_UserService_DeactivateUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.UpdateUserServerRoleRequest,
 *   !proto.buf.alpha.registry.v1alpha1.UpdateUserServerRoleResponse>}
 */
const methodDescriptor_UserService_UpdateUserServerRole = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.UserService/UpdateUserServerRole',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.UpdateUserServerRoleRequest,
  proto.buf.alpha.registry.v1alpha1.UpdateUserServerRoleResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.UpdateUserServerRoleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.UpdateUserServerRoleResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UpdateUserServerRoleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.UpdateUserServerRoleResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.UpdateUserServerRoleResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.UserServiceClient.prototype.updateUserServerRole =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.UserService/UpdateUserServerRole',
      request,
      metadata || {},
      methodDescriptor_UserService_UpdateUserServerRole,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.UpdateUserServerRoleRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.UpdateUserServerRoleResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.UserServicePromiseClient.prototype.updateUserServerRole =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.UserService/UpdateUserServerRole',
      request,
      metadata || {},
      methodDescriptor_UserService_UpdateUserServerRole);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.buf.alpha.registry.v1alpha1.CountUsersRequest,
 *   !proto.buf.alpha.registry.v1alpha1.CountUsersResponse>}
 */
const methodDescriptor_UserService_CountUsers = new grpc.web.MethodDescriptor(
  '/buf.alpha.registry.v1alpha1.UserService/CountUsers',
  grpc.web.MethodType.UNARY,
  proto.buf.alpha.registry.v1alpha1.CountUsersRequest,
  proto.buf.alpha.registry.v1alpha1.CountUsersResponse,
  /**
   * @param {!proto.buf.alpha.registry.v1alpha1.CountUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.buf.alpha.registry.v1alpha1.CountUsersResponse.deserializeBinary
);


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CountUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.buf.alpha.registry.v1alpha1.CountUsersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.buf.alpha.registry.v1alpha1.CountUsersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.buf.alpha.registry.v1alpha1.UserServiceClient.prototype.countUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.UserService/CountUsers',
      request,
      metadata || {},
      methodDescriptor_UserService_CountUsers,
      callback);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.CountUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.buf.alpha.registry.v1alpha1.CountUsersResponse>}
 *     Promise that resolves to the response
 */
proto.buf.alpha.registry.v1alpha1.UserServicePromiseClient.prototype.countUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/buf.alpha.registry.v1alpha1.UserService/CountUsers',
      request,
      metadata || {},
      methodDescriptor_UserService_CountUsers);
};


module.exports = proto.buf.alpha.registry.v1alpha1;


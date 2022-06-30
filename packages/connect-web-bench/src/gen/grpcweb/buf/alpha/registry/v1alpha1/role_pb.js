// source: buf/alpha/registry/v1alpha1/role.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.OrganizationRole', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.PluginRole', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.RepositoryRole', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ServerRole', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.TemplateRole', null, global);
/**
 * @enum {number}
 */
proto.buf.alpha.registry.v1alpha1.ServerRole = {
  SERVER_ROLE_UNSPECIFIED: 0,
  SERVER_ROLE_ADMIN: 1,
  SERVER_ROLE_MEMBER: 2
};

/**
 * @enum {number}
 */
proto.buf.alpha.registry.v1alpha1.OrganizationRole = {
  ORGANIZATION_ROLE_UNSPECIFIED: 0,
  ORGANIZATION_ROLE_OWNER: 1,
  ORGANIZATION_ROLE_ADMIN: 2,
  ORGANIZATION_ROLE_MEMBER: 3
};

/**
 * @enum {number}
 */
proto.buf.alpha.registry.v1alpha1.RepositoryRole = {
  REPOSITORY_ROLE_UNSPECIFIED: 0,
  REPOSITORY_ROLE_OWNER: 1,
  REPOSITORY_ROLE_ADMIN: 2,
  REPOSITORY_ROLE_WRITE: 3,
  REPOSITORY_ROLE_READ: 4
};

/**
 * @enum {number}
 */
proto.buf.alpha.registry.v1alpha1.TemplateRole = {
  TEMPLATE_ROLE_UNSPECIFIED: 0,
  TEMPLATE_ROLE_OWNER: 1,
  TEMPLATE_ROLE_ADMIN: 2,
  TEMPLATE_ROLE_WRITE: 3,
  TEMPLATE_ROLE_READ: 4
};

/**
 * @enum {number}
 */
proto.buf.alpha.registry.v1alpha1.PluginRole = {
  PLUGIN_ROLE_UNSPECIFIED: 0,
  PLUGIN_ROLE_OWNER: 1,
  PLUGIN_ROLE_ADMIN: 2,
  PLUGIN_ROLE_WRITE: 3,
  PLUGIN_ROLE_READ: 4
};

goog.object.extend(exports, proto.buf.alpha.registry.v1alpha1);

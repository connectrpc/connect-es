// source: buf/alpha/audit/v1alpha1/role.proto
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

goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1OrganizationRole', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginRole', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryRole', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1ServerRole', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1TemplateRole', null, global);
/**
 * @enum {number}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1ServerRole = {
  BUF_ALPHA_REGISTRY_V1_ALPHA1_SERVER_ROLE_UNSPECIFIED: 0,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_SERVER_ROLE_ADMIN: 1,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_SERVER_ROLE_MEMBER: 2
};

/**
 * @enum {number}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1OrganizationRole = {
  BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_ROLE_UNSPECIFIED: 0,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_ROLE_OWNER: 1,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_ROLE_ADMIN: 2,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_ROLE_MEMBER: 3
};

/**
 * @enum {number}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryRole = {
  BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_ROLE_UNSPECIFIED: 0,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_ROLE_OWNER: 1,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_ROLE_ADMIN: 2,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_ROLE_WRITE: 3,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_ROLE_READ: 4
};

/**
 * @enum {number}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1TemplateRole = {
  BUF_ALPHA_REGISTRY_V1_ALPHA1_TEMPLATE_ROLE_UNSPECIFIED: 0,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_TEMPLATE_ROLE_OWNER: 1,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_TEMPLATE_ROLE_ADMIN: 2,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_TEMPLATE_ROLE_WRITE: 3,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_TEMPLATE_ROLE_READ: 4
};

/**
 * @enum {number}
 */
proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginRole = {
  BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_ROLE_UNSPECIFIED: 0,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_ROLE_OWNER: 1,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_ROLE_ADMIN: 2,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_ROLE_WRITE: 3,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_ROLE_READ: 4
};

goog.object.extend(exports, proto.buf.alpha.audit.v1alpha1);

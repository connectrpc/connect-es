// source: buf/alpha/audit/v1alpha1/envelope.proto
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

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
goog.object.extend(proto, google_protobuf_timestamp_pb);
var buf_alpha_rpc_v1alpha1_error_pb = require('../../../../buf/alpha/rpc/v1alpha1/error_pb.js');
goog.object.extend(proto, buf_alpha_rpc_v1alpha1_error_pb);
var buf_alpha_module_v1alpha1_module_pb = require('../../../../buf/alpha/module/v1alpha1/module_pb.js');
goog.object.extend(proto, buf_alpha_module_v1alpha1_module_pb);
var buf_alpha_audit_v1alpha1_role_pb = require('../../../../buf/alpha/audit/v1alpha1/role_pb.js');
goog.object.extend(proto, buf_alpha_audit_v1alpha1_role_pb);
var buf_alpha_audit_v1alpha1_plugin_pb = require('../../../../buf/alpha/audit/v1alpha1/plugin_pb.js');
goog.object.extend(proto, buf_alpha_audit_v1alpha1_plugin_pb);
var buf_alpha_audit_v1alpha1_repository_pb = require('../../../../buf/alpha/audit/v1alpha1/repository_pb.js');
goog.object.extend(proto, buf_alpha_audit_v1alpha1_repository_pb);
var buf_alpha_audit_v1alpha1_module_pb = require('../../../../buf/alpha/audit/v1alpha1/module_pb.js');
goog.object.extend(proto, buf_alpha_audit_v1alpha1_module_pb);
var buf_alpha_audit_v1alpha1_search_pb = require('../../../../buf/alpha/audit/v1alpha1/search_pb.js');
goog.object.extend(proto, buf_alpha_audit_v1alpha1_search_pb);
var buf_alpha_audit_v1alpha1_user_pb = require('../../../../buf/alpha/audit/v1alpha1/user_pb.js');
goog.object.extend(proto, buf_alpha_audit_v1alpha1_user_pb);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.Action', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.ReferenceCase', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.Event', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.Event.ActionDetailsCase', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.Event.ActorCase', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.Object', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.Object.TypeCase', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.OrganizationObject', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.PluginObject', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.RepositoryObject', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.TemplateObject', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.TokenObject', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.UserActor', null, global);
goog.exportSymbol('proto.buf.alpha.audit.v1alpha1.UserObject', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.oneofGroups_);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema.displayName = 'proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.Event = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.audit.v1alpha1.Event.repeatedFields_, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.Event, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.Event.displayName = 'proto.buf.alpha.audit.v1alpha1.Event';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.UserActor = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.UserActor, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.UserActor.displayName = 'proto.buf.alpha.audit.v1alpha1.UserActor';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.UserObject = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.UserObject, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.UserObject.displayName = 'proto.buf.alpha.audit.v1alpha1.UserObject';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.OrganizationObject = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.OrganizationObject, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.OrganizationObject.displayName = 'proto.buf.alpha.audit.v1alpha1.OrganizationObject';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.RepositoryObject = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.RepositoryObject, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.RepositoryObject.displayName = 'proto.buf.alpha.audit.v1alpha1.RepositoryObject';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.PluginObject = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.PluginObject, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.PluginObject.displayName = 'proto.buf.alpha.audit.v1alpha1.PluginObject';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.TemplateObject = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.TemplateObject, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.TemplateObject.displayName = 'proto.buf.alpha.audit.v1alpha1.TemplateObject';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.TokenObject = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.TokenObject, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.TokenObject.displayName = 'proto.buf.alpha.audit.v1alpha1.TokenObject';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.buf.alpha.audit.v1alpha1.Object = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.buf.alpha.audit.v1alpha1.Object.oneofGroups_);
};
goog.inherits(proto.buf.alpha.audit.v1alpha1.Object, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.audit.v1alpha1.Object.displayName = 'proto.buf.alpha.audit.v1alpha1.Object';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    reference: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setReference(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getReference();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string reference = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo.prototype.getReference = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo.prototype.setReference = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    reference: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setReference(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getReference();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string reference = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo.prototype.getReference = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo.prototype.setReference = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    organizationId: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOrganizationId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOrganizationId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string organization_id = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo.prototype.getOrganizationId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo.prototype.setOrganizationId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    organizationId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    userId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    organizationRole: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOrganizationId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 3:
      var value = /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1OrganizationRole} */ (reader.readEnum());
      msg.setOrganizationRole(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOrganizationId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getOrganizationRole();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * optional string organization_id = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.prototype.getOrganizationId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.prototype.setOrganizationId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string user_id = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional BufAlphaRegistryV1Alpha1OrganizationRole organization_role = 3;
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1OrganizationRole}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.prototype.getOrganizationRole = function() {
  return /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1OrganizationRole} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1OrganizationRole} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.prototype.setOrganizationRole = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    organizationId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    userId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    organizationRole: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOrganizationId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 3:
      var value = /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1OrganizationRole} */ (reader.readEnum());
      msg.setOrganizationRole(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOrganizationId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getOrganizationRole();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * optional string organization_id = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.prototype.getOrganizationId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.prototype.setOrganizationId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string user_id = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional BufAlphaRegistryV1Alpha1OrganizationRole organization_role = 3;
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1OrganizationRole}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.prototype.getOrganizationRole = function() {
  return /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1OrganizationRole} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1OrganizationRole} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.prototype.setOrganizationRole = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    organizationId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    userId: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOrganizationId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOrganizationId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string organization_id = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.prototype.getOrganizationId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.prototype.setOrganizationId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string user_id = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    organizationId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    repositoryBaseRole: jspb.Message.getFieldWithDefault(msg, 2, 0),
    pluginBaseRole: jspb.Message.getFieldWithDefault(msg, 3, 0),
    templateBaseRole: jspb.Message.getFieldWithDefault(msg, 4, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOrganizationId(value);
      break;
    case 2:
      var value = /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryRole} */ (reader.readEnum());
      msg.setRepositoryBaseRole(value);
      break;
    case 3:
      var value = /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginRole} */ (reader.readEnum());
      msg.setPluginBaseRole(value);
      break;
    case 4:
      var value = /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1TemplateRole} */ (reader.readEnum());
      msg.setTemplateBaseRole(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOrganizationId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getRepositoryBaseRole();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getPluginBaseRole();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getTemplateBaseRole();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
};


/**
 * optional string organization_id = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.prototype.getOrganizationId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.prototype.setOrganizationId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional BufAlphaRegistryV1Alpha1RepositoryRole repository_base_role = 2;
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryRole}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.prototype.getRepositoryBaseRole = function() {
  return /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryRole} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryRole} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.prototype.setRepositoryBaseRole = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional BufAlphaRegistryV1Alpha1PluginRole plugin_base_role = 3;
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginRole}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.prototype.getPluginBaseRole = function() {
  return /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginRole} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginRole} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.prototype.setPluginBaseRole = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional BufAlphaRegistryV1Alpha1TemplateRole template_base_role = 4;
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1TemplateRole}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.prototype.getTemplateBaseRole = function() {
  return /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1TemplateRole} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1TemplateRole} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.prototype.setTemplateBaseRole = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    visibility: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwner(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVisibility} */ (reader.readEnum());
      msg.setVisibility(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwner();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getVisibility();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional BufAlphaRegistryV1Alpha1PluginVisibility visibility = 3;
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVisibility}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.prototype.getVisibility = function() {
  return /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVisibility} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVisibility} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.prototype.setVisibility = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwner(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwner();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    version: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVersion(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVersion();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string version = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo.prototype.getVersion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo.prototype.setVersion = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.repeatedFields_ = [4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    visibility: jspb.Message.getFieldWithDefault(msg, 3, 0),
    pluginConfigsList: jspb.Message.toObjectList(msg.getPluginConfigsList(),
    buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginConfig.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwner(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVisibility} */ (reader.readEnum());
      msg.setVisibility(value);
      break;
    case 4:
      var value = new buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginConfig;
      reader.readMessage(value,buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginConfig.deserializeBinaryFromReader);
      msg.addPluginConfigs(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwner();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getVisibility();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getPluginConfigsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional BufAlphaRegistryV1Alpha1PluginVisibility visibility = 3;
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVisibility}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.prototype.getVisibility = function() {
  return /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVisibility} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVisibility} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.prototype.setVisibility = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * repeated BufAlphaRegistryV1Alpha1PluginConfig plugin_configs = 4;
 * @return {!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig>}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.prototype.getPluginConfigsList = function() {
  return /** @type{!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig>} */ (
    jspb.Message.getRepeatedWrapperField(this, buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginConfig, 4));
};


/**
 * @param {!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig>} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo} returns this
*/
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.prototype.setPluginConfigsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.prototype.addPluginConfigs = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginConfig, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.prototype.clearPluginConfigsList = function() {
  return this.setPluginConfigsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwner(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwner();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.repeatedFields_ = [4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    templateOwner: jspb.Message.getFieldWithDefault(msg, 2, ""),
    templateName: jspb.Message.getFieldWithDefault(msg, 3, ""),
    pluginVersionsList: jspb.Message.toObjectList(msg.getPluginVersionsList(),
    buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionMapping.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTemplateOwner(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTemplateName(value);
      break;
    case 4:
      var value = new buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionMapping;
      reader.readMessage(value,buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionMapping.deserializeBinaryFromReader);
      msg.addPluginVersions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTemplateOwner();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTemplateName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getPluginVersionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionMapping.serializeBinaryToWriter
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string template_owner = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.prototype.getTemplateOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.prototype.setTemplateOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string template_name = 3;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.prototype.getTemplateName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.prototype.setTemplateName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * repeated BufAlphaRegistryV1Alpha1PluginVersionMapping plugin_versions = 4;
 * @return {!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping>}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.prototype.getPluginVersionsList = function() {
  return /** @type{!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping>} */ (
    jspb.Message.getRepeatedWrapperField(this, buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionMapping, 4));
};


/**
 * @param {!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping>} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo} returns this
*/
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.prototype.setPluginVersionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.prototype.addPluginVersions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionMapping, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.prototype.clearPluginVersionsList = function() {
  return this.setPluginVersionsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.repeatedFields_ = [4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    repository: jspb.Message.getFieldWithDefault(msg, 2, ""),
    branch: jspb.Message.getFieldWithDefault(msg, 3, ""),
    tagsList: (f = jspb.Message.getRepeatedField(msg, 4)) == null ? undefined : f,
    localModulePinBranch: jspb.Message.getFieldWithDefault(msg, 5, ""),
    localModulePinCommit: jspb.Message.getFieldWithDefault(msg, 6, ""),
    localModulePinDigest: jspb.Message.getFieldWithDefault(msg, 7, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwner(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setRepository(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setBranch(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.addTags(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setLocalModulePinBranch(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setLocalModulePinCommit(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setLocalModulePinDigest(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwner();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getRepository();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getBranch();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getTagsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      4,
      f
    );
  }
  f = message.getLocalModulePinBranch();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getLocalModulePinCommit();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getLocalModulePinDigest();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string repository = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.prototype.getRepository = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.prototype.setRepository = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string branch = 3;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.prototype.getBranch = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.prototype.setBranch = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * repeated string tags = 4;
 * @return {!Array<string>}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.prototype.getTagsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 4));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.prototype.setTagsList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.prototype.addTags = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.prototype.clearTagsList = function() {
  return this.setTagsList([]);
};


/**
 * optional string local_module_pin_branch = 5;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.prototype.getLocalModulePinBranch = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.prototype.setLocalModulePinBranch = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string local_module_pin_commit = 6;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.prototype.getLocalModulePinCommit = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.prototype.setLocalModulePinCommit = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string local_module_pin_digest = 7;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.prototype.getLocalModulePinDigest = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.prototype.setLocalModulePinDigest = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.oneofGroups_ = [[2,3,4,5]];

/**
 * @enum {number}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.ReferenceCase = {
  REFERENCE_NOT_SET: 0,
  BRANCH: 2,
  TAG: 3,
  COMMIT: 4,
  TRACK: 5
};

/**
 * @return {proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.ReferenceCase}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.getReferenceCase = function() {
  return /** @type {proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.ReferenceCase} */(jspb.Message.computeOneofCase(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    branch: (f = msg.getBranch()) && buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryBranch.toObject(includeInstance, f),
    tag: (f = msg.getTag()) && buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTag.toObject(includeInstance, f),
    commit: (f = msg.getCommit()) && buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryCommit.toObject(includeInstance, f),
    track: (f = msg.getTrack()) && buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTrack.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = new buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryBranch;
      reader.readMessage(value,buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryBranch.deserializeBinaryFromReader);
      msg.setBranch(value);
      break;
    case 3:
      var value = new buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTag;
      reader.readMessage(value,buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTag.deserializeBinaryFromReader);
      msg.setTag(value);
      break;
    case 4:
      var value = new buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryCommit;
      reader.readMessage(value,buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryCommit.deserializeBinaryFromReader);
      msg.setCommit(value);
      break;
    case 5:
      var value = new buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTrack;
      reader.readMessage(value,buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTrack.deserializeBinaryFromReader);
      msg.setTrack(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getBranch();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryBranch.serializeBinaryToWriter
    );
  }
  f = message.getTag();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTag.serializeBinaryToWriter
    );
  }
  f = message.getCommit();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryCommit.serializeBinaryToWriter
    );
  }
  f = message.getTrack();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTrack.serializeBinaryToWriter
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional BufAlphaRegistryV1Alpha1RepositoryBranch branch = 2;
 * @return {?proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryBranch}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.getBranch = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryBranch} */ (
    jspb.Message.getWrapperField(this, buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryBranch, 2));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryBranch|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo} returns this
*/
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.setBranch = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.clearBranch = function() {
  return this.setBranch(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.hasBranch = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional BufAlphaRegistryV1Alpha1RepositoryTag tag = 3;
 * @return {?proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryTag}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.getTag = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryTag} */ (
    jspb.Message.getWrapperField(this, buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTag, 3));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryTag|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo} returns this
*/
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.setTag = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.clearTag = function() {
  return this.setTag(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.hasTag = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional BufAlphaRegistryV1Alpha1RepositoryCommit commit = 4;
 * @return {?proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryCommit}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.getCommit = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryCommit} */ (
    jspb.Message.getWrapperField(this, buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryCommit, 4));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryCommit|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo} returns this
*/
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.setCommit = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.clearCommit = function() {
  return this.setCommit(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.hasCommit = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional BufAlphaRegistryV1Alpha1RepositoryTrack track = 5;
 * @return {?proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryTrack}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.getTrack = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryTrack} */ (
    jspb.Message.getWrapperField(this, buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTrack, 5));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryTrack|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo} returns this
*/
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.setTrack = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.clearTrack = function() {
  return this.setTrack(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.prototype.hasTrack = function() {
  return jspb.Message.getField(this, 5) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    parentBranch: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setParentBranch(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getParentBranch();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string parent_branch = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.prototype.getParentBranch = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.prototype.setParentBranch = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    repositoryBranchName: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setRepositoryBranchName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepositoryBranchName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string repository_branch_name = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo.prototype.getRepositoryBranchName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo.prototype.setRepositoryBranchName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    reference: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setReference(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getReference();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string reference = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo.prototype.getReference = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo.prototype.setReference = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    reference: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setReference(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getReference();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string reference = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo.prototype.getReference = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo.prototype.setReference = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    repositoryBranchName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    commitSequenceId: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setRepositoryBranchName(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCommitSequenceId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepositoryBranchName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getCommitSequenceId();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional string repository_branch_name = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.prototype.getRepositoryBranchName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.prototype.setRepositoryBranchName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional int64 commit_sequence_id = 2;
 * @return {number}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.prototype.getCommitSequenceId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.prototype.setCommitSequenceId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    repositoryId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    commitName: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setRepositoryId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setCommitName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepositoryId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getCommitName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string repository_id = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.prototype.getRepositoryId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.prototype.setRepositoryId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string commit_name = 3;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.prototype.getCommitName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.prototype.setCommitName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    fullName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    visibility: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFullName(value);
      break;
    case 2:
      var value = /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1Visibility} */ (reader.readEnum());
      msg.setVisibility(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFullName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getVisibility();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * optional string full_name = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.prototype.getFullName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.prototype.setFullName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional BufAlphaRegistryV1Alpha1Visibility visibility = 2;
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1Visibility}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.prototype.getVisibility = function() {
  return /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1Visibility} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1Visibility} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.prototype.setVisibility = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    repositoryId: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setRepositoryId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepositoryId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string repository_id = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo.prototype.getRepositoryId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo.prototype.setRepositoryId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    fullName: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFullName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFullName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string full_name = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo.prototype.getFullName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo.prototype.setFullName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    ownerName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    repositoryName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    deprecationMessage: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwnerName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setRepositoryName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeprecationMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwnerName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getRepositoryName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDeprecationMessage();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string owner_name = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.prototype.getOwnerName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.prototype.setOwnerName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string repository_name = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.prototype.getRepositoryName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.prototype.setRepositoryName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string deprecation_message = 3;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.prototype.getDeprecationMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.prototype.setDeprecationMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    ownerName: jspb.Message.getFieldWithDefault(msg, 1, ""),
    repositoryName: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwnerName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setRepositoryName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwnerName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getRepositoryName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string owner_name = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.prototype.getOwnerName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.prototype.setOwnerName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string repository_name = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.prototype.getRepositoryName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.prototype.setRepositoryName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.repeatedFields_ = [1,2,3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    moduleReferencesList: jspb.Message.toObjectList(msg.getModuleReferencesList(),
    buf_alpha_module_v1alpha1_module_pb.ModuleReference.toObject, includeInstance),
    currentModulePinsList: jspb.Message.toObjectList(msg.getCurrentModulePinsList(),
    buf_alpha_module_v1alpha1_module_pb.ModulePin.toObject, includeInstance),
    modulePinsResultsList: jspb.Message.toObjectList(msg.getModulePinsResultsList(),
    buf_alpha_module_v1alpha1_module_pb.ModulePin.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new buf_alpha_module_v1alpha1_module_pb.ModuleReference;
      reader.readMessage(value,buf_alpha_module_v1alpha1_module_pb.ModuleReference.deserializeBinaryFromReader);
      msg.addModuleReferences(value);
      break;
    case 2:
      var value = new buf_alpha_module_v1alpha1_module_pb.ModulePin;
      reader.readMessage(value,buf_alpha_module_v1alpha1_module_pb.ModulePin.deserializeBinaryFromReader);
      msg.addCurrentModulePins(value);
      break;
    case 3:
      var value = new buf_alpha_module_v1alpha1_module_pb.ModulePin;
      reader.readMessage(value,buf_alpha_module_v1alpha1_module_pb.ModulePin.deserializeBinaryFromReader);
      msg.addModulePinsResults(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getModuleReferencesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      buf_alpha_module_v1alpha1_module_pb.ModuleReference.serializeBinaryToWriter
    );
  }
  f = message.getCurrentModulePinsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      buf_alpha_module_v1alpha1_module_pb.ModulePin.serializeBinaryToWriter
    );
  }
  f = message.getModulePinsResultsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      buf_alpha_module_v1alpha1_module_pb.ModulePin.serializeBinaryToWriter
    );
  }
};


/**
 * repeated buf.alpha.module.v1alpha1.ModuleReference module_references = 1;
 * @return {!Array<!proto.buf.alpha.module.v1alpha1.ModuleReference>}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.prototype.getModuleReferencesList = function() {
  return /** @type{!Array<!proto.buf.alpha.module.v1alpha1.ModuleReference>} */ (
    jspb.Message.getRepeatedWrapperField(this, buf_alpha_module_v1alpha1_module_pb.ModuleReference, 1));
};


/**
 * @param {!Array<!proto.buf.alpha.module.v1alpha1.ModuleReference>} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo} returns this
*/
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.prototype.setModuleReferencesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.alpha.module.v1alpha1.ModuleReference=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.module.v1alpha1.ModuleReference}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.prototype.addModuleReferences = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.alpha.module.v1alpha1.ModuleReference, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.prototype.clearModuleReferencesList = function() {
  return this.setModuleReferencesList([]);
};


/**
 * repeated buf.alpha.module.v1alpha1.ModulePin current_module_pins = 2;
 * @return {!Array<!proto.buf.alpha.module.v1alpha1.ModulePin>}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.prototype.getCurrentModulePinsList = function() {
  return /** @type{!Array<!proto.buf.alpha.module.v1alpha1.ModulePin>} */ (
    jspb.Message.getRepeatedWrapperField(this, buf_alpha_module_v1alpha1_module_pb.ModulePin, 2));
};


/**
 * @param {!Array<!proto.buf.alpha.module.v1alpha1.ModulePin>} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo} returns this
*/
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.prototype.setCurrentModulePinsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.buf.alpha.module.v1alpha1.ModulePin=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.module.v1alpha1.ModulePin}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.prototype.addCurrentModulePins = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.buf.alpha.module.v1alpha1.ModulePin, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.prototype.clearCurrentModulePinsList = function() {
  return this.setCurrentModulePinsList([]);
};


/**
 * repeated buf.alpha.module.v1alpha1.ModulePin module_pins_results = 3;
 * @return {!Array<!proto.buf.alpha.module.v1alpha1.ModulePin>}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.prototype.getModulePinsResultsList = function() {
  return /** @type{!Array<!proto.buf.alpha.module.v1alpha1.ModulePin>} */ (
    jspb.Message.getRepeatedWrapperField(this, buf_alpha_module_v1alpha1_module_pb.ModulePin, 3));
};


/**
 * @param {!Array<!proto.buf.alpha.module.v1alpha1.ModulePin>} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo} returns this
*/
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.prototype.setModulePinsResultsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.buf.alpha.module.v1alpha1.ModulePin=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.module.v1alpha1.ModulePin}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.prototype.addModulePinsResults = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.buf.alpha.module.v1alpha1.ModulePin, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.prototype.clearModulePinsResultsList = function() {
  return this.setModulePinsResultsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.repeatedFields_ = [1,2,3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    localModuleReferencesList: jspb.Message.toObjectList(msg.getLocalModuleReferencesList(),
    buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleReference.toObject, includeInstance),
    localModuleResolveResultsList: jspb.Message.toObjectList(msg.getLocalModuleResolveResultsList(),
    buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleResolveResult.toObject, includeInstance),
    dependenciesList: jspb.Message.toObjectList(msg.getDependenciesList(),
    buf_alpha_module_v1alpha1_module_pb.ModulePin.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleReference;
      reader.readMessage(value,buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleReference.deserializeBinaryFromReader);
      msg.addLocalModuleReferences(value);
      break;
    case 2:
      var value = new buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleResolveResult;
      reader.readMessage(value,buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleResolveResult.deserializeBinaryFromReader);
      msg.addLocalModuleResolveResults(value);
      break;
    case 3:
      var value = new buf_alpha_module_v1alpha1_module_pb.ModulePin;
      reader.readMessage(value,buf_alpha_module_v1alpha1_module_pb.ModulePin.deserializeBinaryFromReader);
      msg.addDependencies(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLocalModuleReferencesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleReference.serializeBinaryToWriter
    );
  }
  f = message.getLocalModuleResolveResultsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleResolveResult.serializeBinaryToWriter
    );
  }
  f = message.getDependenciesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      buf_alpha_module_v1alpha1_module_pb.ModulePin.serializeBinaryToWriter
    );
  }
};


/**
 * repeated BufAlphaRegistryV1Alpha1LocalModuleReference local_module_references = 1;
 * @return {!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1LocalModuleReference>}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.prototype.getLocalModuleReferencesList = function() {
  return /** @type{!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1LocalModuleReference>} */ (
    jspb.Message.getRepeatedWrapperField(this, buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleReference, 1));
};


/**
 * @param {!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1LocalModuleReference>} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo} returns this
*/
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.prototype.setLocalModuleReferencesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1LocalModuleReference=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1LocalModuleReference}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.prototype.addLocalModuleReferences = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1LocalModuleReference, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.prototype.clearLocalModuleReferencesList = function() {
  return this.setLocalModuleReferencesList([]);
};


/**
 * repeated BufAlphaRegistryV1Alpha1LocalModuleResolveResult local_module_resolve_results = 2;
 * @return {!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1LocalModuleResolveResult>}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.prototype.getLocalModuleResolveResultsList = function() {
  return /** @type{!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1LocalModuleResolveResult>} */ (
    jspb.Message.getRepeatedWrapperField(this, buf_alpha_audit_v1alpha1_module_pb.BufAlphaRegistryV1Alpha1LocalModuleResolveResult, 2));
};


/**
 * @param {!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1LocalModuleResolveResult>} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo} returns this
*/
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.prototype.setLocalModuleResolveResultsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1LocalModuleResolveResult=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1LocalModuleResolveResult}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.prototype.addLocalModuleResolveResults = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1LocalModuleResolveResult, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.prototype.clearLocalModuleResolveResultsList = function() {
  return this.setLocalModuleResolveResultsList([]);
};


/**
 * repeated buf.alpha.module.v1alpha1.ModulePin dependencies = 3;
 * @return {!Array<!proto.buf.alpha.module.v1alpha1.ModulePin>}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.prototype.getDependenciesList = function() {
  return /** @type{!Array<!proto.buf.alpha.module.v1alpha1.ModulePin>} */ (
    jspb.Message.getRepeatedWrapperField(this, buf_alpha_module_v1alpha1_module_pb.ModulePin, 3));
};


/**
 * @param {!Array<!proto.buf.alpha.module.v1alpha1.ModulePin>} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo} returns this
*/
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.prototype.setDependenciesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.buf.alpha.module.v1alpha1.ModulePin=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.module.v1alpha1.ModulePin}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.prototype.addDependencies = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.buf.alpha.module.v1alpha1.ModulePin, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.prototype.clearDependenciesList = function() {
  return this.setDependenciesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    query: jspb.Message.getFieldWithDefault(msg, 1, ""),
    filtersList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setQuery(value);
      break;
    case 2:
      var values = /** @type {!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1SearchFilter>} */ (reader.isDelimited() ? reader.readPackedEnum() : [reader.readEnum()]);
      for (var i = 0; i < values.length; i++) {
        msg.addFilters(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getQuery();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFiltersList();
  if (f.length > 0) {
    writer.writePackedEnum(
      2,
      f
    );
  }
};


/**
 * optional string query = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.prototype.getQuery = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.prototype.setQuery = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated BufAlphaRegistryV1Alpha1SearchFilter filters = 2;
 * @return {!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1SearchFilter>}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.prototype.getFiltersList = function() {
  return /** @type {!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1SearchFilter>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1SearchFilter>} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.prototype.setFiltersList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1SearchFilter} value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.prototype.addFilters = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.prototype.clearFiltersList = function() {
  return this.setFiltersList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    note: jspb.Message.getFieldWithDefault(msg, 1, ""),
    expireTime: (f = msg.getExpireTime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setNote(value);
      break;
    case 2:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setExpireTime(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNote();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getExpireTime();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
};


/**
 * optional string note = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.prototype.getNote = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.prototype.setNote = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional google.protobuf.Timestamp expire_time = 2;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.prototype.getExpireTime = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 2));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo} returns this
*/
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.prototype.setExpireTime = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.prototype.clearExpireTime = function() {
  return this.setExpireTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.prototype.hasExpireTime = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    tokenId: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTokenId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTokenId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string token_id = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo.prototype.getTokenId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo.prototype.setTokenId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    username: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsername(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUsername();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string username = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo.prototype.getUsername = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo.prototype.setUsername = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    userStateFilter: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1UserState} */ (reader.readEnum());
      msg.setUserStateFilter(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserStateFilter();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
};


/**
 * optional BufAlphaRegistryV1Alpha1UserState user_state_filter = 1;
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1UserState}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo.prototype.getUserStateFilter = function() {
  return /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1UserState} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1UserState} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo.prototype.setUserStateFilter = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    serverRole: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1ServerRole} */ (reader.readEnum());
      msg.setServerRole(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getServerRole();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional BufAlphaRegistryV1Alpha1ServerRole server_role = 2;
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1ServerRole}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.prototype.getServerRole = function() {
  return /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1ServerRole} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1ServerRole} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.prototype.setServerRole = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    imageDigest: jspb.Message.getFieldWithDefault(msg, 2, ""),
    runtimeLibrariesList: jspb.Message.toObjectList(msg.getRuntimeLibrariesList(),
    buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setImageDigest(value);
      break;
    case 3:
      var value = new buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary;
      reader.readMessage(value,buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.deserializeBinaryFromReader);
      msg.addRuntimeLibraries(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getImageDigest();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getRuntimeLibrariesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.serializeBinaryToWriter
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string image_digest = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.prototype.getImageDigest = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.prototype.setImageDigest = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary runtime_libraries = 3;
 * @return {!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary>}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.prototype.getRuntimeLibrariesList = function() {
  return /** @type{!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary>} */ (
    jspb.Message.getRepeatedWrapperField(this, buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary, 3));
};


/**
 * @param {!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary>} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo} returns this
*/
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.prototype.setRuntimeLibrariesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.prototype.addRuntimeLibraries = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.prototype.clearRuntimeLibrariesList = function() {
  return this.setRuntimeLibrariesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    imageDigest: jspb.Message.getFieldWithDefault(msg, 2, ""),
    runtimeLibrariesList: jspb.Message.toObjectList(msg.getRuntimeLibrariesList(),
    buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setImageDigest(value);
      break;
    case 3:
      var value = new buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary;
      reader.readMessage(value,buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.deserializeBinaryFromReader);
      msg.addRuntimeLibraries(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getImageDigest();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getRuntimeLibrariesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.serializeBinaryToWriter
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string image_digest = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.prototype.getImageDigest = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.prototype.setImageDigest = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary runtime_libraries = 3;
 * @return {!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary>}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.prototype.getRuntimeLibrariesList = function() {
  return /** @type{!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary>} */ (
    jspb.Message.getRepeatedWrapperField(this, buf_alpha_audit_v1alpha1_plugin_pb.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary, 3));
};


/**
 * @param {!Array<!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary>} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo} returns this
*/
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.prototype.setRuntimeLibrariesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.prototype.addRuntimeLibraries = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.prototype.clearRuntimeLibrariesList = function() {
  return this.setRuntimeLibrariesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    repositoryRole: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryRole} */ (reader.readEnum());
      msg.setRepositoryRole(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRepositoryRole();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
};


/**
 * optional BufAlphaRegistryV1Alpha1RepositoryRole repository_role = 1;
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryRole}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo.prototype.getRepositoryRole = function() {
  return /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryRole} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryRole} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo.prototype.setRepositoryRole = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    pluginRole: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginRole} */ (reader.readEnum());
      msg.setPluginRole(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPluginRole();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
};


/**
 * optional BufAlphaRegistryV1Alpha1PluginRole plugin_role = 1;
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginRole}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo.prototype.getPluginRole = function() {
  return /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginRole} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1PluginRole} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo.prototype.setPluginRole = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    templateRole: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1TemplateRole} */ (reader.readEnum());
      msg.setTemplateRole(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTemplateRole();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
};


/**
 * optional BufAlphaRegistryV1Alpha1TemplateRole template_role = 1;
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1TemplateRole}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo.prototype.getTemplateRole = function() {
  return /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1TemplateRole} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1TemplateRole} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo.prototype.setTemplateRole = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    track: (f = msg.getTrack()) && buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTrack.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTrack;
      reader.readMessage(value,buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTrack.deserializeBinaryFromReader);
      msg.setTrack(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTrack();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTrack.serializeBinaryToWriter
    );
  }
};


/**
 * optional BufAlphaRegistryV1Alpha1RepositoryTrack track = 1;
 * @return {?proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryTrack}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.prototype.getTrack = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryTrack} */ (
    jspb.Message.getWrapperField(this, buf_alpha_audit_v1alpha1_repository_pb.BufAlphaRegistryV1Alpha1RepositoryTrack, 1));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1RepositoryTrack|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo} returns this
*/
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.prototype.setTrack = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.prototype.clearTrack = function() {
  return this.setTrack(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.prototype.hasTrack = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    organizationRole: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1OrganizationRole} */ (reader.readEnum());
      msg.setOrganizationRole(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOrganizationRole();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
};


/**
 * optional BufAlphaRegistryV1Alpha1OrganizationRole organization_role = 1;
 * @return {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1OrganizationRole}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo.prototype.getOrganizationRole = function() {
  return /** @type {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1OrganizationRole} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.BufAlphaRegistryV1Alpha1OrganizationRole} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo.prototype.setOrganizationRole = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema.toObject = function(includeInstance, msg) {
  var f, obj = {
    reference: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema;
  return proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setReference(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getReference();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string reference = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema.prototype.getReference = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema} returns this
 */
proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema.prototype.setReference = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.audit.v1alpha1.Event.repeatedFields_ = [8];

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_ = [[2],[12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57]];

/**
 * @enum {number}
 */
proto.buf.alpha.audit.v1alpha1.Event.ActorCase = {
  ACTOR_NOT_SET: 0,
  USER: 2
};

/**
 * @return {proto.buf.alpha.audit.v1alpha1.Event.ActorCase}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActorCase = function() {
  return /** @type {proto.buf.alpha.audit.v1alpha1.Event.ActorCase} */(jspb.Message.computeOneofCase(this, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[0]));
};

/**
 * @enum {number}
 */
proto.buf.alpha.audit.v1alpha1.Event.ActionDetailsCase = {
  ACTION_DETAILS_NOT_SET: 0,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DOWNLOAD_INFO: 12,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_GET_IMAGE_INFO: 13,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_ORGANIZATION_INFO: 14,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DELETE_ORGANIZATION_INFO: 15,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DELETE_ORGANIZATION_BY_NAME_INFO: 16,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_ADD_ORGANIZATION_MEMBER_INFO: 17,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_UPDATE_ORGANIZATION_MEMBER_INFO: 18,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_REMOVE_ORGANIZATION_MEMBER_INFO: 19,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_UPDATE_ORGANIZATION_SETTINGS_INFO: 20,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_PLUGIN_INFO: 21,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DELETE_PLUGIN_INFO: 22,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_GET_TEMPLATE_VERSION_INFO: 23,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_TEMPLATE_INFO: 24,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DELETE_TEMPLATE_INFO: 25,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_TEMPLATE_VERSION_INFO: 26,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_PUSH_INFO: 27,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_GET_REFERENCE_BY_NAME_INFO: 28,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_REPOSITORY_BRANCH_INFO: 29,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_LIST_REPOSITORY_COMMITS_BY_BRANCH_INFO: 30,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_LIST_REPOSITORY_COMMITS_BY_REFERENCE_INFO: 31,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_GET_REPOSITORY_COMMIT_BY_REFERENCE_INFO: 32,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_GET_REPOSITORY_COMMIT_BY_SEQUENCE_ID_INFO: 33,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_REPOSITORY_TAG_INFO: 34,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_REPOSITORY_BY_FULL_NAME_INFO: 35,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DELETE_REPOSITORY_INFO: 36,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DELETE_REPOSITORY_BY_FULL_NAME_INFO: 37,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DEPRECATE_REPOSITORY_BY_NAME_INFO: 38,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_UNDEPRECATE_REPOSITORY_BY_NAME_INFO: 39,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_GET_MODULE_PINS_INFO: 40,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_GET_LOCAL_MODULE_PINS_INFO: 41,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_SEARCH_INFO: 42,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_TOKEN_INFO: 43,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DELETE_TOKEN_INFO: 44,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_USER_INFO: 45,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_LIST_USERS_INFO: 46,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_DEACTIVATE_USER_INFO: 47,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_UPDATE_USER_SERVER_ROLE_INFO: 48,
  ACTION_BUF_ALPHA_REGISTRYINTERNAL_V1ALPHA1_CREATE_PLUGIN_VERSION_INFO: 49,
  ACTION_BUF_ALPHA_REGISTRYINTERNAL_V1ALPHA1_DELETE_PLUGIN_VERSION_INFO: 50,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_SET_REPOSITORY_CONTRIBUTOR_INFO: 51,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_SET_PLUGIN_CONTRIBUTOR_INFO: 52,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_SET_TEMPLATE_CONTRIBUTOR_INFO: 53,
  ACTION_BUF_ALPHA_REGISTRYINTERNAL_V1ALPHA1_CREATE_PLUGIN_VERSION_METADATA_INFO: 54,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_CREATE_REPOSITORY_TRACK_INFO: 55,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_SET_ORGANIZATION_MEMBER_INFO: 56,
  ACTION_BUF_ALPHA_REGISTRY_V1ALPHA1_GET_JSONSCHEMA: 57
};

/**
 * @return {proto.buf.alpha.audit.v1alpha1.Event.ActionDetailsCase}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionDetailsCase = function() {
  return /** @type {proto.buf.alpha.audit.v1alpha1.Event.ActionDetailsCase} */(jspb.Message.computeOneofCase(this, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.Event.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.Event} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.Event.toObject = function(includeInstance, msg) {
  var f, obj = {
    eventId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    user: (f = msg.getUser()) && proto.buf.alpha.audit.v1alpha1.UserActor.toObject(includeInstance, f),
    eventTime: (f = msg.getEventTime()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    service: jspb.Message.getFieldWithDefault(msg, 4, ""),
    method: jspb.Message.getFieldWithDefault(msg, 5, ""),
    traceId: jspb.Message.getFieldWithDefault(msg, 6, ""),
    spanId: jspb.Message.getFieldWithDefault(msg, 7, ""),
    objectsList: jspb.Message.toObjectList(msg.getObjectsList(),
    proto.buf.alpha.audit.v1alpha1.Object.toObject, includeInstance),
    errorMessage: jspb.Message.getFieldWithDefault(msg, 9, ""),
    errorCode: jspb.Message.getFieldWithDefault(msg, 10, 0),
    action: jspb.Message.getFieldWithDefault(msg, 11, 0),
    actionBufAlphaRegistryV1alpha1DownloadInfo: (f = msg.getActionBufAlphaRegistryV1alpha1DownloadInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1GetImageInfo: (f = msg.getActionBufAlphaRegistryV1alpha1GetImageInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1CreateOrganizationInfo: (f = msg.getActionBufAlphaRegistryV1alpha1CreateOrganizationInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1DeleteOrganizationInfo: (f = msg.getActionBufAlphaRegistryV1alpha1DeleteOrganizationInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1DeleteOrganizationByNameInfo: (f = msg.getActionBufAlphaRegistryV1alpha1DeleteOrganizationByNameInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1AddOrganizationMemberInfo: (f = msg.getActionBufAlphaRegistryV1alpha1AddOrganizationMemberInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1UpdateOrganizationMemberInfo: (f = msg.getActionBufAlphaRegistryV1alpha1UpdateOrganizationMemberInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1RemoveOrganizationMemberInfo: (f = msg.getActionBufAlphaRegistryV1alpha1RemoveOrganizationMemberInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1UpdateOrganizationSettingsInfo: (f = msg.getActionBufAlphaRegistryV1alpha1UpdateOrganizationSettingsInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1CreatePluginInfo: (f = msg.getActionBufAlphaRegistryV1alpha1CreatePluginInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1DeletePluginInfo: (f = msg.getActionBufAlphaRegistryV1alpha1DeletePluginInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1GetTemplateVersionInfo: (f = msg.getActionBufAlphaRegistryV1alpha1GetTemplateVersionInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1CreateTemplateInfo: (f = msg.getActionBufAlphaRegistryV1alpha1CreateTemplateInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1DeleteTemplateInfo: (f = msg.getActionBufAlphaRegistryV1alpha1DeleteTemplateInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1CreateTemplateVersionInfo: (f = msg.getActionBufAlphaRegistryV1alpha1CreateTemplateVersionInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1PushInfo: (f = msg.getActionBufAlphaRegistryV1alpha1PushInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1GetReferenceByNameInfo: (f = msg.getActionBufAlphaRegistryV1alpha1GetReferenceByNameInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1CreateRepositoryBranchInfo: (f = msg.getActionBufAlphaRegistryV1alpha1CreateRepositoryBranchInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1ListRepositoryCommitsByBranchInfo: (f = msg.getActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByBranchInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1ListRepositoryCommitsByReferenceInfo: (f = msg.getActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByReferenceInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1GetRepositoryCommitByReferenceInfo: (f = msg.getActionBufAlphaRegistryV1alpha1GetRepositoryCommitByReferenceInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1GetRepositoryCommitBySequenceIdInfo: (f = msg.getActionBufAlphaRegistryV1alpha1GetRepositoryCommitBySequenceIdInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1CreateRepositoryTagInfo: (f = msg.getActionBufAlphaRegistryV1alpha1CreateRepositoryTagInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1CreateRepositoryByFullNameInfo: (f = msg.getActionBufAlphaRegistryV1alpha1CreateRepositoryByFullNameInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1DeleteRepositoryInfo: (f = msg.getActionBufAlphaRegistryV1alpha1DeleteRepositoryInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1DeleteRepositoryByFullNameInfo: (f = msg.getActionBufAlphaRegistryV1alpha1DeleteRepositoryByFullNameInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1DeprecateRepositoryByNameInfo: (f = msg.getActionBufAlphaRegistryV1alpha1DeprecateRepositoryByNameInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1UndeprecateRepositoryByNameInfo: (f = msg.getActionBufAlphaRegistryV1alpha1UndeprecateRepositoryByNameInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1GetModulePinsInfo: (f = msg.getActionBufAlphaRegistryV1alpha1GetModulePinsInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1GetLocalModulePinsInfo: (f = msg.getActionBufAlphaRegistryV1alpha1GetLocalModulePinsInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1SearchInfo: (f = msg.getActionBufAlphaRegistryV1alpha1SearchInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1CreateTokenInfo: (f = msg.getActionBufAlphaRegistryV1alpha1CreateTokenInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1DeleteTokenInfo: (f = msg.getActionBufAlphaRegistryV1alpha1DeleteTokenInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1CreateUserInfo: (f = msg.getActionBufAlphaRegistryV1alpha1CreateUserInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1ListUsersInfo: (f = msg.getActionBufAlphaRegistryV1alpha1ListUsersInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1DeactivateUserInfo: (f = msg.getActionBufAlphaRegistryV1alpha1DeactivateUserInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1UpdateUserServerRoleInfo: (f = msg.getActionBufAlphaRegistryV1alpha1UpdateUserServerRoleInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryinternalV1alpha1CreatePluginVersionInfo: (f = msg.getActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryinternalV1alpha1DeletePluginVersionInfo: (f = msg.getActionBufAlphaRegistryinternalV1alpha1DeletePluginVersionInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1SetRepositoryContributorInfo: (f = msg.getActionBufAlphaRegistryV1alpha1SetRepositoryContributorInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1SetPluginContributorInfo: (f = msg.getActionBufAlphaRegistryV1alpha1SetPluginContributorInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1SetTemplateContributorInfo: (f = msg.getActionBufAlphaRegistryV1alpha1SetTemplateContributorInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryinternalV1alpha1CreatePluginVersionMetadataInfo: (f = msg.getActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionMetadataInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1CreateRepositoryTrackInfo: (f = msg.getActionBufAlphaRegistryV1alpha1CreateRepositoryTrackInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1SetOrganizationMemberInfo: (f = msg.getActionBufAlphaRegistryV1alpha1SetOrganizationMemberInfo()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo.toObject(includeInstance, f),
    actionBufAlphaRegistryV1alpha1GetJsonschema: (f = msg.getActionBufAlphaRegistryV1alpha1GetJsonschema()) && proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event}
 */
proto.buf.alpha.audit.v1alpha1.Event.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.Event;
  return proto.buf.alpha.audit.v1alpha1.Event.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.Event} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event}
 */
proto.buf.alpha.audit.v1alpha1.Event.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setEventId(value);
      break;
    case 2:
      var value = new proto.buf.alpha.audit.v1alpha1.UserActor;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.UserActor.deserializeBinaryFromReader);
      msg.setUser(value);
      break;
    case 3:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setEventTime(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setService(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setMethod(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setTraceId(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setSpanId(value);
      break;
    case 8:
      var value = new proto.buf.alpha.audit.v1alpha1.Object;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.Object.deserializeBinaryFromReader);
      msg.addObjects(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setErrorMessage(value);
      break;
    case 10:
      var value = /** @type {!proto.buf.alpha.rpc.v1alpha1.ErrorCode} */ (reader.readEnum());
      msg.setErrorCode(value);
      break;
    case 11:
      var value = /** @type {!proto.buf.alpha.audit.v1alpha1.Action} */ (reader.readEnum());
      msg.setAction(value);
      break;
    case 12:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1DownloadInfo(value);
      break;
    case 13:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1GetImageInfo(value);
      break;
    case 14:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1CreateOrganizationInfo(value);
      break;
    case 15:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1DeleteOrganizationInfo(value);
      break;
    case 16:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1DeleteOrganizationByNameInfo(value);
      break;
    case 17:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1AddOrganizationMemberInfo(value);
      break;
    case 18:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1UpdateOrganizationMemberInfo(value);
      break;
    case 19:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1RemoveOrganizationMemberInfo(value);
      break;
    case 20:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1UpdateOrganizationSettingsInfo(value);
      break;
    case 21:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1CreatePluginInfo(value);
      break;
    case 22:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1DeletePluginInfo(value);
      break;
    case 23:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1GetTemplateVersionInfo(value);
      break;
    case 24:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1CreateTemplateInfo(value);
      break;
    case 25:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1DeleteTemplateInfo(value);
      break;
    case 26:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1CreateTemplateVersionInfo(value);
      break;
    case 27:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1PushInfo(value);
      break;
    case 28:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1GetReferenceByNameInfo(value);
      break;
    case 29:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1CreateRepositoryBranchInfo(value);
      break;
    case 30:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByBranchInfo(value);
      break;
    case 31:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByReferenceInfo(value);
      break;
    case 32:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1GetRepositoryCommitByReferenceInfo(value);
      break;
    case 33:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1GetRepositoryCommitBySequenceIdInfo(value);
      break;
    case 34:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1CreateRepositoryTagInfo(value);
      break;
    case 35:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1CreateRepositoryByFullNameInfo(value);
      break;
    case 36:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1DeleteRepositoryInfo(value);
      break;
    case 37:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1DeleteRepositoryByFullNameInfo(value);
      break;
    case 38:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1DeprecateRepositoryByNameInfo(value);
      break;
    case 39:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1UndeprecateRepositoryByNameInfo(value);
      break;
    case 40:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1GetModulePinsInfo(value);
      break;
    case 41:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1GetLocalModulePinsInfo(value);
      break;
    case 42:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1SearchInfo(value);
      break;
    case 43:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1CreateTokenInfo(value);
      break;
    case 44:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1DeleteTokenInfo(value);
      break;
    case 45:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1CreateUserInfo(value);
      break;
    case 46:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1ListUsersInfo(value);
      break;
    case 47:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1DeactivateUserInfo(value);
      break;
    case 48:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1UpdateUserServerRoleInfo(value);
      break;
    case 49:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionInfo(value);
      break;
    case 50:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryinternalV1alpha1DeletePluginVersionInfo(value);
      break;
    case 51:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1SetRepositoryContributorInfo(value);
      break;
    case 52:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1SetPluginContributorInfo(value);
      break;
    case 53:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1SetTemplateContributorInfo(value);
      break;
    case 54:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionMetadataInfo(value);
      break;
    case 55:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1CreateRepositoryTrackInfo(value);
      break;
    case 56:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1SetOrganizationMemberInfo(value);
      break;
    case 57:
      var value = new proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema.deserializeBinaryFromReader);
      msg.setActionBufAlphaRegistryV1alpha1GetJsonschema(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.Event.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.Event} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.Event.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEventId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUser();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.buf.alpha.audit.v1alpha1.UserActor.serializeBinaryToWriter
    );
  }
  f = message.getEventTime();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getService();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getMethod();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getTraceId();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getSpanId();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getObjectsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.buf.alpha.audit.v1alpha1.Object.serializeBinaryToWriter
    );
  }
  f = message.getErrorMessage();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getErrorCode();
  if (f !== 0.0) {
    writer.writeEnum(
      10,
      f
    );
  }
  f = message.getAction();
  if (f !== 0.0) {
    writer.writeEnum(
      11,
      f
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1DownloadInfo();
  if (f != null) {
    writer.writeMessage(
      12,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1GetImageInfo();
  if (f != null) {
    writer.writeMessage(
      13,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1CreateOrganizationInfo();
  if (f != null) {
    writer.writeMessage(
      14,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1DeleteOrganizationInfo();
  if (f != null) {
    writer.writeMessage(
      15,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1DeleteOrganizationByNameInfo();
  if (f != null) {
    writer.writeMessage(
      16,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1AddOrganizationMemberInfo();
  if (f != null) {
    writer.writeMessage(
      17,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1UpdateOrganizationMemberInfo();
  if (f != null) {
    writer.writeMessage(
      18,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1RemoveOrganizationMemberInfo();
  if (f != null) {
    writer.writeMessage(
      19,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1UpdateOrganizationSettingsInfo();
  if (f != null) {
    writer.writeMessage(
      20,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1CreatePluginInfo();
  if (f != null) {
    writer.writeMessage(
      21,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1DeletePluginInfo();
  if (f != null) {
    writer.writeMessage(
      22,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1GetTemplateVersionInfo();
  if (f != null) {
    writer.writeMessage(
      23,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1CreateTemplateInfo();
  if (f != null) {
    writer.writeMessage(
      24,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1DeleteTemplateInfo();
  if (f != null) {
    writer.writeMessage(
      25,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1CreateTemplateVersionInfo();
  if (f != null) {
    writer.writeMessage(
      26,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1PushInfo();
  if (f != null) {
    writer.writeMessage(
      27,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1GetReferenceByNameInfo();
  if (f != null) {
    writer.writeMessage(
      28,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1CreateRepositoryBranchInfo();
  if (f != null) {
    writer.writeMessage(
      29,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByBranchInfo();
  if (f != null) {
    writer.writeMessage(
      30,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByReferenceInfo();
  if (f != null) {
    writer.writeMessage(
      31,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1GetRepositoryCommitByReferenceInfo();
  if (f != null) {
    writer.writeMessage(
      32,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1GetRepositoryCommitBySequenceIdInfo();
  if (f != null) {
    writer.writeMessage(
      33,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1CreateRepositoryTagInfo();
  if (f != null) {
    writer.writeMessage(
      34,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1CreateRepositoryByFullNameInfo();
  if (f != null) {
    writer.writeMessage(
      35,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1DeleteRepositoryInfo();
  if (f != null) {
    writer.writeMessage(
      36,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1DeleteRepositoryByFullNameInfo();
  if (f != null) {
    writer.writeMessage(
      37,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1DeprecateRepositoryByNameInfo();
  if (f != null) {
    writer.writeMessage(
      38,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1UndeprecateRepositoryByNameInfo();
  if (f != null) {
    writer.writeMessage(
      39,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1GetModulePinsInfo();
  if (f != null) {
    writer.writeMessage(
      40,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1GetLocalModulePinsInfo();
  if (f != null) {
    writer.writeMessage(
      41,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1SearchInfo();
  if (f != null) {
    writer.writeMessage(
      42,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1CreateTokenInfo();
  if (f != null) {
    writer.writeMessage(
      43,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1DeleteTokenInfo();
  if (f != null) {
    writer.writeMessage(
      44,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1CreateUserInfo();
  if (f != null) {
    writer.writeMessage(
      45,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1ListUsersInfo();
  if (f != null) {
    writer.writeMessage(
      46,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1DeactivateUserInfo();
  if (f != null) {
    writer.writeMessage(
      47,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1UpdateUserServerRoleInfo();
  if (f != null) {
    writer.writeMessage(
      48,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionInfo();
  if (f != null) {
    writer.writeMessage(
      49,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryinternalV1alpha1DeletePluginVersionInfo();
  if (f != null) {
    writer.writeMessage(
      50,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1SetRepositoryContributorInfo();
  if (f != null) {
    writer.writeMessage(
      51,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1SetPluginContributorInfo();
  if (f != null) {
    writer.writeMessage(
      52,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1SetTemplateContributorInfo();
  if (f != null) {
    writer.writeMessage(
      53,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionMetadataInfo();
  if (f != null) {
    writer.writeMessage(
      54,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1CreateRepositoryTrackInfo();
  if (f != null) {
    writer.writeMessage(
      55,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1SetOrganizationMemberInfo();
  if (f != null) {
    writer.writeMessage(
      56,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo.serializeBinaryToWriter
    );
  }
  f = message.getActionBufAlphaRegistryV1alpha1GetJsonschema();
  if (f != null) {
    writer.writeMessage(
      57,
      f,
      proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema.serializeBinaryToWriter
    );
  }
};


/**
 * optional string event_id = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getEventId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.setEventId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional UserActor user = 2;
 * @return {?proto.buf.alpha.audit.v1alpha1.UserActor}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getUser = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.UserActor} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.UserActor, 2));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.UserActor|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setUser = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearUser = function() {
  return this.setUser(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasUser = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional google.protobuf.Timestamp event_time = 3;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getEventTime = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 3));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setEventTime = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearEventTime = function() {
  return this.setEventTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasEventTime = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string service = 4;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getService = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.setService = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string method = 5;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getMethod = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.setMethod = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string trace_id = 6;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getTraceId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.setTraceId = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string span_id = 7;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getSpanId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.setSpanId = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * repeated Object objects = 8;
 * @return {!Array<!proto.buf.alpha.audit.v1alpha1.Object>}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getObjectsList = function() {
  return /** @type{!Array<!proto.buf.alpha.audit.v1alpha1.Object>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.audit.v1alpha1.Object, 8));
};


/**
 * @param {!Array<!proto.buf.alpha.audit.v1alpha1.Object>} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setObjectsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.Object=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.audit.v1alpha1.Object}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.addObjects = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.buf.alpha.audit.v1alpha1.Object, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearObjectsList = function() {
  return this.setObjectsList([]);
};


/**
 * optional string error_message = 9;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getErrorMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.setErrorMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};


/**
 * optional buf.alpha.rpc.v1alpha1.ErrorCode error_code = 10;
 * @return {!proto.buf.alpha.rpc.v1alpha1.ErrorCode}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getErrorCode = function() {
  return /** @type {!proto.buf.alpha.rpc.v1alpha1.ErrorCode} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {!proto.buf.alpha.rpc.v1alpha1.ErrorCode} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.setErrorCode = function(value) {
  return jspb.Message.setProto3EnumField(this, 10, value);
};


/**
 * optional Action action = 11;
 * @return {!proto.buf.alpha.audit.v1alpha1.Action}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getAction = function() {
  return /** @type {!proto.buf.alpha.audit.v1alpha1.Action} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {!proto.buf.alpha.audit.v1alpha1.Action} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.setAction = function(value) {
  return jspb.Message.setProto3EnumField(this, 11, value);
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1DownloadInfo action_buf_alpha_registry_v1alpha1_download_info = 12;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1DownloadInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo, 12));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DownloadInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1DownloadInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 12, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1DownloadInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1DownloadInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1DownloadInfo = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1GetImageInfo action_buf_alpha_registry_v1alpha1_get_image_info = 13;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1GetImageInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo, 13));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetImageInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1GetImageInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 13, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1GetImageInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1GetImageInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1GetImageInfo = function() {
  return jspb.Message.getField(this, 13) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo action_buf_alpha_registry_v1alpha1_create_organization_info = 14;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1CreateOrganizationInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo, 14));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateOrganizationInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1CreateOrganizationInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 14, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1CreateOrganizationInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1CreateOrganizationInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1CreateOrganizationInfo = function() {
  return jspb.Message.getField(this, 14) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo action_buf_alpha_registry_v1alpha1_delete_organization_info = 15;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1DeleteOrganizationInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo, 15));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1DeleteOrganizationInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 15, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1DeleteOrganizationInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1DeleteOrganizationInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1DeleteOrganizationInfo = function() {
  return jspb.Message.getField(this, 15) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo action_buf_alpha_registry_v1alpha1_delete_organization_by_name_info = 16;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1DeleteOrganizationByNameInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo, 16));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteOrganizationByNameInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1DeleteOrganizationByNameInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 16, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1DeleteOrganizationByNameInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1DeleteOrganizationByNameInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1DeleteOrganizationByNameInfo = function() {
  return jspb.Message.getField(this, 16) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo action_buf_alpha_registry_v1alpha1_add_organization_member_info = 17;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1AddOrganizationMemberInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo, 17));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1AddOrganizationMemberInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1AddOrganizationMemberInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 17, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1AddOrganizationMemberInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1AddOrganizationMemberInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1AddOrganizationMemberInfo = function() {
  return jspb.Message.getField(this, 17) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo action_buf_alpha_registry_v1alpha1_update_organization_member_info = 18;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1UpdateOrganizationMemberInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo, 18));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationMemberInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1UpdateOrganizationMemberInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 18, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1UpdateOrganizationMemberInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1UpdateOrganizationMemberInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1UpdateOrganizationMemberInfo = function() {
  return jspb.Message.getField(this, 18) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo action_buf_alpha_registry_v1alpha1_remove_organization_member_info = 19;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1RemoveOrganizationMemberInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo, 19));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1RemoveOrganizationMemberInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1RemoveOrganizationMemberInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 19, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1RemoveOrganizationMemberInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1RemoveOrganizationMemberInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1RemoveOrganizationMemberInfo = function() {
  return jspb.Message.getField(this, 19) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo action_buf_alpha_registry_v1alpha1_update_organization_settings_info = 20;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1UpdateOrganizationSettingsInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo, 20));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateOrganizationSettingsInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1UpdateOrganizationSettingsInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 20, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1UpdateOrganizationSettingsInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1UpdateOrganizationSettingsInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1UpdateOrganizationSettingsInfo = function() {
  return jspb.Message.getField(this, 20) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1CreatePluginInfo action_buf_alpha_registry_v1alpha1_create_plugin_info = 21;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1CreatePluginInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo, 21));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreatePluginInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1CreatePluginInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 21, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1CreatePluginInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1CreatePluginInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1CreatePluginInfo = function() {
  return jspb.Message.getField(this, 21) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1DeletePluginInfo action_buf_alpha_registry_v1alpha1_delete_plugin_info = 22;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1DeletePluginInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo, 22));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeletePluginInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1DeletePluginInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 22, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1DeletePluginInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1DeletePluginInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1DeletePluginInfo = function() {
  return jspb.Message.getField(this, 22) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo action_buf_alpha_registry_v1alpha1_get_template_version_info = 23;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1GetTemplateVersionInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo, 23));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetTemplateVersionInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1GetTemplateVersionInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 23, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1GetTemplateVersionInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1GetTemplateVersionInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1GetTemplateVersionInfo = function() {
  return jspb.Message.getField(this, 23) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo action_buf_alpha_registry_v1alpha1_create_template_info = 24;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1CreateTemplateInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo, 24));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1CreateTemplateInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 24, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1CreateTemplateInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1CreateTemplateInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1CreateTemplateInfo = function() {
  return jspb.Message.getField(this, 24) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo action_buf_alpha_registry_v1alpha1_delete_template_info = 25;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1DeleteTemplateInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo, 25));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTemplateInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1DeleteTemplateInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 25, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1DeleteTemplateInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1DeleteTemplateInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1DeleteTemplateInfo = function() {
  return jspb.Message.getField(this, 25) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo action_buf_alpha_registry_v1alpha1_create_template_version_info = 26;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1CreateTemplateVersionInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo, 26));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTemplateVersionInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1CreateTemplateVersionInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 26, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1CreateTemplateVersionInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1CreateTemplateVersionInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1CreateTemplateVersionInfo = function() {
  return jspb.Message.getField(this, 26) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1PushInfo action_buf_alpha_registry_v1alpha1_push_info = 27;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1PushInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo, 27));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1PushInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1PushInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 27, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1PushInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1PushInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1PushInfo = function() {
  return jspb.Message.getField(this, 27) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo action_buf_alpha_registry_v1alpha1_get_reference_by_name_info = 28;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1GetReferenceByNameInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo, 28));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetReferenceByNameInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1GetReferenceByNameInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 28, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1GetReferenceByNameInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1GetReferenceByNameInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1GetReferenceByNameInfo = function() {
  return jspb.Message.getField(this, 28) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo action_buf_alpha_registry_v1alpha1_create_repository_branch_info = 29;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1CreateRepositoryBranchInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo, 29));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryBranchInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1CreateRepositoryBranchInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 29, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1CreateRepositoryBranchInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1CreateRepositoryBranchInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1CreateRepositoryBranchInfo = function() {
  return jspb.Message.getField(this, 29) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo action_buf_alpha_registry_v1alpha1_list_repository_commits_by_branch_info = 30;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByBranchInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo, 30));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByBranchInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByBranchInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 30, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByBranchInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByBranchInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByBranchInfo = function() {
  return jspb.Message.getField(this, 30) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo action_buf_alpha_registry_v1alpha1_list_repository_commits_by_reference_info = 31;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByReferenceInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo, 31));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListRepositoryCommitsByReferenceInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByReferenceInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 31, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByReferenceInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByReferenceInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1ListRepositoryCommitsByReferenceInfo = function() {
  return jspb.Message.getField(this, 31) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo action_buf_alpha_registry_v1alpha1_get_repository_commit_by_reference_info = 32;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1GetRepositoryCommitByReferenceInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo, 32));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitByReferenceInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1GetRepositoryCommitByReferenceInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 32, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1GetRepositoryCommitByReferenceInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1GetRepositoryCommitByReferenceInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1GetRepositoryCommitByReferenceInfo = function() {
  return jspb.Message.getField(this, 32) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo action_buf_alpha_registry_v1alpha1_get_repository_commit_by_sequence_id_info = 33;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1GetRepositoryCommitBySequenceIdInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo, 33));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetRepositoryCommitBySequenceIDInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1GetRepositoryCommitBySequenceIdInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 33, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1GetRepositoryCommitBySequenceIdInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1GetRepositoryCommitBySequenceIdInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1GetRepositoryCommitBySequenceIdInfo = function() {
  return jspb.Message.getField(this, 33) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo action_buf_alpha_registry_v1alpha1_create_repository_tag_info = 34;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1CreateRepositoryTagInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo, 34));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTagInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1CreateRepositoryTagInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 34, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1CreateRepositoryTagInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1CreateRepositoryTagInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1CreateRepositoryTagInfo = function() {
  return jspb.Message.getField(this, 34) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo action_buf_alpha_registry_v1alpha1_create_repository_by_full_name_info = 35;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1CreateRepositoryByFullNameInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo, 35));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryByFullNameInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1CreateRepositoryByFullNameInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 35, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1CreateRepositoryByFullNameInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1CreateRepositoryByFullNameInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1CreateRepositoryByFullNameInfo = function() {
  return jspb.Message.getField(this, 35) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo action_buf_alpha_registry_v1alpha1_delete_repository_info = 36;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1DeleteRepositoryInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo, 36));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1DeleteRepositoryInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 36, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1DeleteRepositoryInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1DeleteRepositoryInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1DeleteRepositoryInfo = function() {
  return jspb.Message.getField(this, 36) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo action_buf_alpha_registry_v1alpha1_delete_repository_by_full_name_info = 37;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1DeleteRepositoryByFullNameInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo, 37));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteRepositoryByFullNameInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1DeleteRepositoryByFullNameInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 37, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1DeleteRepositoryByFullNameInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1DeleteRepositoryByFullNameInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1DeleteRepositoryByFullNameInfo = function() {
  return jspb.Message.getField(this, 37) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo action_buf_alpha_registry_v1alpha1_deprecate_repository_by_name_info = 38;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1DeprecateRepositoryByNameInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo, 38));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeprecateRepositoryByNameInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1DeprecateRepositoryByNameInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 38, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1DeprecateRepositoryByNameInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1DeprecateRepositoryByNameInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1DeprecateRepositoryByNameInfo = function() {
  return jspb.Message.getField(this, 38) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo action_buf_alpha_registry_v1alpha1_undeprecate_repository_by_name_info = 39;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1UndeprecateRepositoryByNameInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo, 39));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UndeprecateRepositoryByNameInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1UndeprecateRepositoryByNameInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 39, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1UndeprecateRepositoryByNameInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1UndeprecateRepositoryByNameInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1UndeprecateRepositoryByNameInfo = function() {
  return jspb.Message.getField(this, 39) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo action_buf_alpha_registry_v1alpha1_get_module_pins_info = 40;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1GetModulePinsInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo, 40));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetModulePinsInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1GetModulePinsInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 40, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1GetModulePinsInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1GetModulePinsInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1GetModulePinsInfo = function() {
  return jspb.Message.getField(this, 40) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo action_buf_alpha_registry_v1alpha1_get_local_module_pins_info = 41;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1GetLocalModulePinsInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo, 41));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetLocalModulePinsInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1GetLocalModulePinsInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 41, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1GetLocalModulePinsInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1GetLocalModulePinsInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1GetLocalModulePinsInfo = function() {
  return jspb.Message.getField(this, 41) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1SearchInfo action_buf_alpha_registry_v1alpha1_search_info = 42;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1SearchInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo, 42));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SearchInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1SearchInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 42, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1SearchInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1SearchInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1SearchInfo = function() {
  return jspb.Message.getField(this, 42) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1CreateTokenInfo action_buf_alpha_registry_v1alpha1_create_token_info = 43;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1CreateTokenInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo, 43));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateTokenInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1CreateTokenInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 43, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1CreateTokenInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1CreateTokenInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1CreateTokenInfo = function() {
  return jspb.Message.getField(this, 43) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo action_buf_alpha_registry_v1alpha1_delete_token_info = 44;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1DeleteTokenInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo, 44));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeleteTokenInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1DeleteTokenInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 44, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1DeleteTokenInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1DeleteTokenInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1DeleteTokenInfo = function() {
  return jspb.Message.getField(this, 44) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1CreateUserInfo action_buf_alpha_registry_v1alpha1_create_user_info = 45;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1CreateUserInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo, 45));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateUserInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1CreateUserInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 45, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1CreateUserInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1CreateUserInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1CreateUserInfo = function() {
  return jspb.Message.getField(this, 45) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1ListUsersInfo action_buf_alpha_registry_v1alpha1_list_users_info = 46;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1ListUsersInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo, 46));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1ListUsersInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1ListUsersInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 46, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1ListUsersInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1ListUsersInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1ListUsersInfo = function() {
  return jspb.Message.getField(this, 46) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo action_buf_alpha_registry_v1alpha1_deactivate_user_info = 47;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1DeactivateUserInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo, 47));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1DeactivateUserInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1DeactivateUserInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 47, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1DeactivateUserInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1DeactivateUserInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1DeactivateUserInfo = function() {
  return jspb.Message.getField(this, 47) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo action_buf_alpha_registry_v1alpha1_update_user_server_role_info = 48;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1UpdateUserServerRoleInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo, 48));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1UpdateUserServerRoleInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1UpdateUserServerRoleInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 48, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1UpdateUserServerRoleInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1UpdateUserServerRoleInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1UpdateUserServerRoleInfo = function() {
  return jspb.Message.getField(this, 48) != null;
};


/**
 * optional ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo action_buf_alpha_registryinternal_v1alpha1_create_plugin_version_info = 49;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo, 49));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 49, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionInfo = function() {
  return this.setActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionInfo = function() {
  return jspb.Message.getField(this, 49) != null;
};


/**
 * optional ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo action_buf_alpha_registryinternal_v1alpha1_delete_plugin_version_info = 50;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryinternalV1alpha1DeletePluginVersionInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo, 50));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1DeletePluginVersionInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryinternalV1alpha1DeletePluginVersionInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 50, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryinternalV1alpha1DeletePluginVersionInfo = function() {
  return this.setActionBufAlphaRegistryinternalV1alpha1DeletePluginVersionInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryinternalV1alpha1DeletePluginVersionInfo = function() {
  return jspb.Message.getField(this, 50) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo action_buf_alpha_registry_v1alpha1_set_repository_contributor_info = 51;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1SetRepositoryContributorInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo, 51));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetRepositoryContributorInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1SetRepositoryContributorInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 51, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1SetRepositoryContributorInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1SetRepositoryContributorInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1SetRepositoryContributorInfo = function() {
  return jspb.Message.getField(this, 51) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo action_buf_alpha_registry_v1alpha1_set_plugin_contributor_info = 52;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1SetPluginContributorInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo, 52));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetPluginContributorInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1SetPluginContributorInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 52, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1SetPluginContributorInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1SetPluginContributorInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1SetPluginContributorInfo = function() {
  return jspb.Message.getField(this, 52) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo action_buf_alpha_registry_v1alpha1_set_template_contributor_info = 53;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1SetTemplateContributorInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo, 53));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetTemplateContributorInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1SetTemplateContributorInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 53, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1SetTemplateContributorInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1SetTemplateContributorInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1SetTemplateContributorInfo = function() {
  return jspb.Message.getField(this, 53) != null;
};


/**
 * optional ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo action_buf_alpha_registryinternal_v1alpha1_create_plugin_version_metadata_info = 54;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionMetadataInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo, 54));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryinternalV1Alpha1CreatePluginVersionMetadataInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionMetadataInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 54, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionMetadataInfo = function() {
  return this.setActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionMetadataInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryinternalV1alpha1CreatePluginVersionMetadataInfo = function() {
  return jspb.Message.getField(this, 54) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo action_buf_alpha_registry_v1alpha1_create_repository_track_info = 55;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1CreateRepositoryTrackInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo, 55));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1CreateRepositoryTrackInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1CreateRepositoryTrackInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 55, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1CreateRepositoryTrackInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1CreateRepositoryTrackInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1CreateRepositoryTrackInfo = function() {
  return jspb.Message.getField(this, 55) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo action_buf_alpha_registry_v1alpha1_set_organization_member_info = 56;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1SetOrganizationMemberInfo = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo, 56));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1SetOrganizationMemberInfo|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1SetOrganizationMemberInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 56, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1SetOrganizationMemberInfo = function() {
  return this.setActionBufAlphaRegistryV1alpha1SetOrganizationMemberInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1SetOrganizationMemberInfo = function() {
  return jspb.Message.getField(this, 56) != null;
};


/**
 * optional ActionBufAlphaRegistryV1Alpha1GetJSONSchema action_buf_alpha_registry_v1alpha1_get_jsonschema = 57;
 * @return {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.getActionBufAlphaRegistryV1alpha1GetJsonschema = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema, 57));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.ActionBufAlphaRegistryV1Alpha1GetJSONSchema|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
*/
proto.buf.alpha.audit.v1alpha1.Event.prototype.setActionBufAlphaRegistryV1alpha1GetJsonschema = function(value) {
  return jspb.Message.setOneofWrapperField(this, 57, proto.buf.alpha.audit.v1alpha1.Event.oneofGroups_[1], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Event} returns this
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.clearActionBufAlphaRegistryV1alpha1GetJsonschema = function() {
  return this.setActionBufAlphaRegistryV1alpha1GetJsonschema(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Event.prototype.hasActionBufAlphaRegistryV1alpha1GetJsonschema = function() {
  return jspb.Message.getField(this, 57) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.UserActor.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.UserActor.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.UserActor} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.UserActor.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    username: jspb.Message.getFieldWithDefault(msg, 2, ""),
    sourceIp: jspb.Message.getFieldWithDefault(msg, 3, ""),
    anonymous: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    subject: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.UserActor}
 */
proto.buf.alpha.audit.v1alpha1.UserActor.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.UserActor;
  return proto.buf.alpha.audit.v1alpha1.UserActor.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.UserActor} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.UserActor}
 */
proto.buf.alpha.audit.v1alpha1.UserActor.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsername(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSourceIp(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAnonymous(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setSubject(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.UserActor.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.UserActor.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.UserActor} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.UserActor.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUsername();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSourceIp();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getAnonymous();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getSubject();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.UserActor.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.UserActor} returns this
 */
proto.buf.alpha.audit.v1alpha1.UserActor.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string username = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.UserActor.prototype.getUsername = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.UserActor} returns this
 */
proto.buf.alpha.audit.v1alpha1.UserActor.prototype.setUsername = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string source_ip = 3;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.UserActor.prototype.getSourceIp = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.UserActor} returns this
 */
proto.buf.alpha.audit.v1alpha1.UserActor.prototype.setSourceIp = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool anonymous = 4;
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.UserActor.prototype.getAnonymous = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.audit.v1alpha1.UserActor} returns this
 */
proto.buf.alpha.audit.v1alpha1.UserActor.prototype.setAnonymous = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional string subject = 5;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.UserActor.prototype.getSubject = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.UserActor} returns this
 */
proto.buf.alpha.audit.v1alpha1.UserActor.prototype.setSubject = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.UserObject.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.UserObject.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.UserObject} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.UserObject.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    username: jspb.Message.getFieldWithDefault(msg, 2, ""),
    subject: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.UserObject}
 */
proto.buf.alpha.audit.v1alpha1.UserObject.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.UserObject;
  return proto.buf.alpha.audit.v1alpha1.UserObject.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.UserObject} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.UserObject}
 */
proto.buf.alpha.audit.v1alpha1.UserObject.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsername(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSubject(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.UserObject.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.UserObject.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.UserObject} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.UserObject.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUsername();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSubject();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.UserObject.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.UserObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.UserObject.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string username = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.UserObject.prototype.getUsername = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.UserObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.UserObject.prototype.setUsername = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string subject = 3;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.UserObject.prototype.getSubject = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.UserObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.UserObject.prototype.setSubject = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.OrganizationObject.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.OrganizationObject.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.OrganizationObject} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.OrganizationObject.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.OrganizationObject}
 */
proto.buf.alpha.audit.v1alpha1.OrganizationObject.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.OrganizationObject;
  return proto.buf.alpha.audit.v1alpha1.OrganizationObject.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.OrganizationObject} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.OrganizationObject}
 */
proto.buf.alpha.audit.v1alpha1.OrganizationObject.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.OrganizationObject.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.OrganizationObject.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.OrganizationObject} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.OrganizationObject.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.OrganizationObject.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.OrganizationObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.OrganizationObject.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.OrganizationObject.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.OrganizationObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.OrganizationObject.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.RepositoryObject.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.RepositoryObject.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.RepositoryObject} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.RepositoryObject.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    ownerId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    ownerName: jspb.Message.getFieldWithDefault(msg, 4, ""),
    pb_public: jspb.Message.getBooleanFieldWithDefault(msg, 5, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.RepositoryObject}
 */
proto.buf.alpha.audit.v1alpha1.RepositoryObject.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.RepositoryObject;
  return proto.buf.alpha.audit.v1alpha1.RepositoryObject.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.RepositoryObject} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.RepositoryObject}
 */
proto.buf.alpha.audit.v1alpha1.RepositoryObject.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwnerId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwnerName(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setPublic(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.RepositoryObject.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.RepositoryObject.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.RepositoryObject} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.RepositoryObject.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getOwnerId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getOwnerName();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getPublic();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.RepositoryObject.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.RepositoryObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.RepositoryObject.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.RepositoryObject.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.RepositoryObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.RepositoryObject.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string owner_id = 3;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.RepositoryObject.prototype.getOwnerId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.RepositoryObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.RepositoryObject.prototype.setOwnerId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string owner_name = 4;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.RepositoryObject.prototype.getOwnerName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.RepositoryObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.RepositoryObject.prototype.setOwnerName = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional bool public = 5;
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.RepositoryObject.prototype.getPublic = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.audit.v1alpha1.RepositoryObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.RepositoryObject.prototype.setPublic = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.PluginObject.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.PluginObject.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.PluginObject} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.PluginObject.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    ownerId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    ownerName: jspb.Message.getFieldWithDefault(msg, 4, ""),
    pb_public: jspb.Message.getBooleanFieldWithDefault(msg, 5, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.PluginObject}
 */
proto.buf.alpha.audit.v1alpha1.PluginObject.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.PluginObject;
  return proto.buf.alpha.audit.v1alpha1.PluginObject.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.PluginObject} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.PluginObject}
 */
proto.buf.alpha.audit.v1alpha1.PluginObject.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwnerId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwnerName(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setPublic(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.PluginObject.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.PluginObject.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.PluginObject} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.PluginObject.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getOwnerId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getOwnerName();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getPublic();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.PluginObject.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.PluginObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.PluginObject.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.PluginObject.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.PluginObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.PluginObject.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string owner_id = 3;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.PluginObject.prototype.getOwnerId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.PluginObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.PluginObject.prototype.setOwnerId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string owner_name = 4;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.PluginObject.prototype.getOwnerName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.PluginObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.PluginObject.prototype.setOwnerName = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional bool public = 5;
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.PluginObject.prototype.getPublic = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.audit.v1alpha1.PluginObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.PluginObject.prototype.setPublic = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.TemplateObject.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.TemplateObject.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.TemplateObject} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.TemplateObject.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    ownerId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    ownerName: jspb.Message.getFieldWithDefault(msg, 4, ""),
    pb_public: jspb.Message.getBooleanFieldWithDefault(msg, 5, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.TemplateObject}
 */
proto.buf.alpha.audit.v1alpha1.TemplateObject.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.TemplateObject;
  return proto.buf.alpha.audit.v1alpha1.TemplateObject.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.TemplateObject} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.TemplateObject}
 */
proto.buf.alpha.audit.v1alpha1.TemplateObject.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwnerId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setOwnerName(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setPublic(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.TemplateObject.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.TemplateObject.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.TemplateObject} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.TemplateObject.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getOwnerId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getOwnerName();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getPublic();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.TemplateObject.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.TemplateObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.TemplateObject.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.TemplateObject.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.TemplateObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.TemplateObject.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string owner_id = 3;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.TemplateObject.prototype.getOwnerId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.TemplateObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.TemplateObject.prototype.setOwnerId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string owner_name = 4;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.TemplateObject.prototype.getOwnerName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.TemplateObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.TemplateObject.prototype.setOwnerName = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional bool public = 5;
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.TemplateObject.prototype.getPublic = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.audit.v1alpha1.TemplateObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.TemplateObject.prototype.setPublic = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.TokenObject.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.TokenObject.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.TokenObject} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.TokenObject.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.TokenObject}
 */
proto.buf.alpha.audit.v1alpha1.TokenObject.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.TokenObject;
  return proto.buf.alpha.audit.v1alpha1.TokenObject.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.TokenObject} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.TokenObject}
 */
proto.buf.alpha.audit.v1alpha1.TokenObject.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.TokenObject.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.TokenObject.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.TokenObject} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.TokenObject.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.buf.alpha.audit.v1alpha1.TokenObject.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.audit.v1alpha1.TokenObject} returns this
 */
proto.buf.alpha.audit.v1alpha1.TokenObject.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.buf.alpha.audit.v1alpha1.Object.oneofGroups_ = [[1,2,3,4,5,6]];

/**
 * @enum {number}
 */
proto.buf.alpha.audit.v1alpha1.Object.TypeCase = {
  TYPE_NOT_SET: 0,
  USER: 1,
  ORGANIZATION: 2,
  REPOSITORY: 3,
  PLUGIN: 4,
  TEMPLATE: 5,
  TOKEN: 6
};

/**
 * @return {proto.buf.alpha.audit.v1alpha1.Object.TypeCase}
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.getTypeCase = function() {
  return /** @type {proto.buf.alpha.audit.v1alpha1.Object.TypeCase} */(jspb.Message.computeOneofCase(this, proto.buf.alpha.audit.v1alpha1.Object.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.audit.v1alpha1.Object.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.audit.v1alpha1.Object} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.Object.toObject = function(includeInstance, msg) {
  var f, obj = {
    user: (f = msg.getUser()) && proto.buf.alpha.audit.v1alpha1.UserObject.toObject(includeInstance, f),
    organization: (f = msg.getOrganization()) && proto.buf.alpha.audit.v1alpha1.OrganizationObject.toObject(includeInstance, f),
    repository: (f = msg.getRepository()) && proto.buf.alpha.audit.v1alpha1.RepositoryObject.toObject(includeInstance, f),
    plugin: (f = msg.getPlugin()) && proto.buf.alpha.audit.v1alpha1.PluginObject.toObject(includeInstance, f),
    template: (f = msg.getTemplate()) && proto.buf.alpha.audit.v1alpha1.TemplateObject.toObject(includeInstance, f),
    token: (f = msg.getToken()) && proto.buf.alpha.audit.v1alpha1.TokenObject.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.buf.alpha.audit.v1alpha1.Object}
 */
proto.buf.alpha.audit.v1alpha1.Object.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.audit.v1alpha1.Object;
  return proto.buf.alpha.audit.v1alpha1.Object.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.audit.v1alpha1.Object} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.audit.v1alpha1.Object}
 */
proto.buf.alpha.audit.v1alpha1.Object.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.audit.v1alpha1.UserObject;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.UserObject.deserializeBinaryFromReader);
      msg.setUser(value);
      break;
    case 2:
      var value = new proto.buf.alpha.audit.v1alpha1.OrganizationObject;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.OrganizationObject.deserializeBinaryFromReader);
      msg.setOrganization(value);
      break;
    case 3:
      var value = new proto.buf.alpha.audit.v1alpha1.RepositoryObject;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.RepositoryObject.deserializeBinaryFromReader);
      msg.setRepository(value);
      break;
    case 4:
      var value = new proto.buf.alpha.audit.v1alpha1.PluginObject;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.PluginObject.deserializeBinaryFromReader);
      msg.setPlugin(value);
      break;
    case 5:
      var value = new proto.buf.alpha.audit.v1alpha1.TemplateObject;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.TemplateObject.deserializeBinaryFromReader);
      msg.setTemplate(value);
      break;
    case 6:
      var value = new proto.buf.alpha.audit.v1alpha1.TokenObject;
      reader.readMessage(value,proto.buf.alpha.audit.v1alpha1.TokenObject.deserializeBinaryFromReader);
      msg.setToken(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.audit.v1alpha1.Object.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.audit.v1alpha1.Object} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.audit.v1alpha1.Object.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUser();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.buf.alpha.audit.v1alpha1.UserObject.serializeBinaryToWriter
    );
  }
  f = message.getOrganization();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.buf.alpha.audit.v1alpha1.OrganizationObject.serializeBinaryToWriter
    );
  }
  f = message.getRepository();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.buf.alpha.audit.v1alpha1.RepositoryObject.serializeBinaryToWriter
    );
  }
  f = message.getPlugin();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.buf.alpha.audit.v1alpha1.PluginObject.serializeBinaryToWriter
    );
  }
  f = message.getTemplate();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.buf.alpha.audit.v1alpha1.TemplateObject.serializeBinaryToWriter
    );
  }
  f = message.getToken();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.buf.alpha.audit.v1alpha1.TokenObject.serializeBinaryToWriter
    );
  }
};


/**
 * optional UserObject user = 1;
 * @return {?proto.buf.alpha.audit.v1alpha1.UserObject}
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.getUser = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.UserObject} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.UserObject, 1));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.UserObject|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Object} returns this
*/
proto.buf.alpha.audit.v1alpha1.Object.prototype.setUser = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.buf.alpha.audit.v1alpha1.Object.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Object} returns this
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.clearUser = function() {
  return this.setUser(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.hasUser = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional OrganizationObject organization = 2;
 * @return {?proto.buf.alpha.audit.v1alpha1.OrganizationObject}
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.getOrganization = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.OrganizationObject} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.OrganizationObject, 2));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.OrganizationObject|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Object} returns this
*/
proto.buf.alpha.audit.v1alpha1.Object.prototype.setOrganization = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.buf.alpha.audit.v1alpha1.Object.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Object} returns this
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.clearOrganization = function() {
  return this.setOrganization(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.hasOrganization = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional RepositoryObject repository = 3;
 * @return {?proto.buf.alpha.audit.v1alpha1.RepositoryObject}
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.getRepository = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.RepositoryObject} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.RepositoryObject, 3));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.RepositoryObject|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Object} returns this
*/
proto.buf.alpha.audit.v1alpha1.Object.prototype.setRepository = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.buf.alpha.audit.v1alpha1.Object.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Object} returns this
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.clearRepository = function() {
  return this.setRepository(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.hasRepository = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional PluginObject plugin = 4;
 * @return {?proto.buf.alpha.audit.v1alpha1.PluginObject}
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.getPlugin = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.PluginObject} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.PluginObject, 4));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.PluginObject|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Object} returns this
*/
proto.buf.alpha.audit.v1alpha1.Object.prototype.setPlugin = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.buf.alpha.audit.v1alpha1.Object.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Object} returns this
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.clearPlugin = function() {
  return this.setPlugin(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.hasPlugin = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional TemplateObject template = 5;
 * @return {?proto.buf.alpha.audit.v1alpha1.TemplateObject}
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.getTemplate = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.TemplateObject} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.TemplateObject, 5));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.TemplateObject|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Object} returns this
*/
proto.buf.alpha.audit.v1alpha1.Object.prototype.setTemplate = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.buf.alpha.audit.v1alpha1.Object.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Object} returns this
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.clearTemplate = function() {
  return this.setTemplate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.hasTemplate = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional TokenObject token = 6;
 * @return {?proto.buf.alpha.audit.v1alpha1.TokenObject}
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.getToken = function() {
  return /** @type{?proto.buf.alpha.audit.v1alpha1.TokenObject} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.audit.v1alpha1.TokenObject, 6));
};


/**
 * @param {?proto.buf.alpha.audit.v1alpha1.TokenObject|undefined} value
 * @return {!proto.buf.alpha.audit.v1alpha1.Object} returns this
*/
proto.buf.alpha.audit.v1alpha1.Object.prototype.setToken = function(value) {
  return jspb.Message.setOneofWrapperField(this, 6, proto.buf.alpha.audit.v1alpha1.Object.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.audit.v1alpha1.Object} returns this
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.clearToken = function() {
  return this.setToken(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.audit.v1alpha1.Object.prototype.hasToken = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * @enum {number}
 */
proto.buf.alpha.audit.v1alpha1.Action = {
  ACTION_UNSPECIFIED: 0,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHN_SERVICE_GET_CURRENT_USER: 1,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHN_SERVICE_GET_CURRENT_USER_SUBJECT: 2,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_CREATE_ORGANIZATION_REPOSITORY: 3,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_SEE_REPOSITORY_SETTINGS: 4,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_SEE_ORGANIZATION_SETTINGS: 5,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_READ_PLUGIN: 6,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_CREATE_PLUGIN_VERSION: 7,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_CREATE_TEMPLATE_VERSION: 8,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_CREATE_ORGANIZATION_PLUGIN: 9,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_CREATE_ORGANIZATION_TEMPLATE: 10,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_SEE_PLUGIN_SETTINGS: 11,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_SEE_TEMPLATE_SETTINGS: 12,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_ADD_ORGANIZATION_MEMBER: 13,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_UPDATE_ORGANIZATION_MEMBER: 14,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_REMOVE_ORGANIZATION_MEMBER: 15,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_DELETE_ORGANIZATION: 16,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_DELETE_REPOSITORY: 17,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_DELETE_TEMPLATE: 18,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_DELETE_PLUGIN: 19,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_DELETE_USER: 20,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_SEE_SERVER_ADMIN_PANEL: 21,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DOC_SERVICE_GET_SOURCE_DIRECTORY_INFO: 22,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DOC_SERVICE_GET_SOURCE_FILE: 23,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DOC_SERVICE_GET_MODULE_PACKAGES: 24,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DOC_SERVICE_GET_MODULE_DOCUMENTATION: 25,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DOC_SERVICE_GET_PACKAGE_DOCUMENTATION: 26,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DOWNLOAD_SERVICE_DOWNLOAD: 27,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_GENERATE_SERVICE_GENERATE_PLUGINS: 28,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_GENERATE_SERVICE_GENERATE_TEMPLATE: 29,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_IMAGE_SERVICE_GET_IMAGE: 30,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_GET_ORGANIZATION: 31,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_GET_ORGANIZATION_BY_NAME: 32,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_LIST_ORGANIZATIONS: 33,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_LIST_USER_ORGANIZATIONS: 34,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_CREATE_ORGANIZATION: 35,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_DELETE_ORGANIZATION: 36,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_DELETE_ORGANIZATION_BY_NAME: 37,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_ADD_ORGANIZATION_MEMBER: 38,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_UPDATE_ORGANIZATION_MEMBER: 39,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_REMOVE_ORGANIZATION_MEMBER: 40,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_GET_ORGANIZATION_SETTINGS: 41,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_UPDATE_ORGANIZATION_SETTINGS: 42,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_OWNER_SERVICE_GET_OWNER_BY_NAME: 43,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_PLUGINS: 44,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_USER_PLUGINS: 45,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_ORGANIZATION_PLUGINS: 46,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_PLUGIN_VERSIONS: 47,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_CREATE_PLUGIN: 48,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_GET_PLUGIN: 49,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_DELETE_PLUGIN: 50,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_GET_TEMPLATE: 51,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_TEMPLATES: 52,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_USER_TEMPLATES: 53,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_ORGANIZATION_TEMPLATES: 54,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_GET_TEMPLATE_VERSION: 55,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_TEMPLATE_VERSIONS: 56,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_CREATE_TEMPLATE: 57,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_DELETE_TEMPLATE: 58,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_CREATE_TEMPLATE_VERSION: 59,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PUSH_SERVICE_PUSH: 60,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_RECOMMENDATION_SERVICE_RECOMMENDED_REPOSITORIES: 61,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_RECOMMENDATION_SERVICE_RECOMMENDED_TEMPLATES: 62,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_RECOMMENDATION_SERVICE_LIST_RECOMMENDED_REPOSITORIES: 63,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_RECOMMENDATION_SERVICE_LIST_RECOMMENDED_TEMPLATES: 64,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_RECOMMENDATION_SERVICE_SET_RECOMMENDED_REPOSITORIES: 65,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_RECOMMENDATION_SERVICE_SET_RECOMMENDED_TEMPLATES: 66,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REFERENCE_SERVICE_GET_REFERENCE_BY_NAME: 67,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_BRANCH_SERVICE_CREATE_REPOSITORY_BRANCH: 68,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_BRANCH_SERVICE_LIST_REPOSITORY_BRANCHES: 69,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_COMMIT_SERVICE_LIST_REPOSITORY_COMMITS_BY_BRANCH: 70,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_COMMIT_SERVICE_LIST_REPOSITORY_COMMITS_BY_REFERENCE: 71,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_COMMIT_SERVICE_GET_REPOSITORY_COMMIT_BY_REFERENCE: 72,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_COMMIT_SERVICE_GET_REPOSITORY_COMMIT_BY_SEQUENCE_ID: 73,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_TAG_SERVICE_CREATE_REPOSITORY_TAG: 74,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_TAG_SERVICE_LIST_REPOSITORY_TAGS: 75,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_GET_REPOSITORY: 76,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_GET_REPOSITORY_BY_FULL_NAME: 77,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_LIST_REPOSITORIES: 78,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_LIST_USER_REPOSITORIES: 79,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_LIST_REPOSITORIES_USER_CAN_ACCESS: 80,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_LIST_ORGANIZATION_REPOSITORIES: 81,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_CREATE_REPOSITORY_BY_FULL_NAME: 82,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_DELETE_REPOSITORY: 83,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_DELETE_REPOSITORY_BY_FULL_NAME: 84,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_DEPRECATE_REPOSITORY_BY_NAME: 85,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_UNDEPRECATE_REPOSITORY_BY_NAME: 86,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_GET_REPOSITORIES_BY_FULL_NAME: 87,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_RESOLVE_SERVICE_GET_MODULE_PINS: 88,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_LOCAL_RESOLVE_SERVICE_GET_LOCAL_MODULE_PINS: 89,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_SEARCH_SERVICE_SEARCH: 90,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_TOKEN_SERVICE_CREATE_TOKEN: 91,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_TOKEN_SERVICE_GET_TOKEN: 92,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_TOKEN_SERVICE_DELETE_TOKEN: 93,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_TOKEN_SERVICE_LIST_TOKENS: 94,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_USER_SERVICE_CREATE_USER: 95,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_USER_SERVICE_GET_USER: 96,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_USER_SERVICE_GET_USER_BY_USERNAME: 97,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_USER_SERVICE_LIST_USERS: 98,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_USER_SERVICE_LIST_ORGANIZATION_USERS: 99,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_USER_SERVICE_DELETE_USER: 100,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_USER_SERVICE_DEACTIVATE_USER: 101,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_USER_SERVICE_UPDATE_USER_SERVER_ROLE: 102,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_USER_SERVICE_COUNT_USERS: 103,
  ACTION_BUF_ALPHA_REGISTRYINTERNAL_V1_ALPHA1_INTERNAL_PLUGIN_SERVICE_CREATE_PLUGIN_VERSION: 104,
  ACTION_BUF_ALPHA_REGISTRYINTERNAL_V1_ALPHA1_INTERNAL_PLUGIN_SERVICE_DELETE_PLUGIN_VERSION: 105,
  ACTION_BUF_ALPHA_REGISTRYINTERNAL_V1_ALPHA1_INTERNAL_TOKEN_SERVICE_AUTHENTICATE_TOKEN: 106,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUDIT_LOGS_SERVICE_LIST_AUDIT_LOGS: 107,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_LIST_REPOSITORY_CONTRIBUTORS: 108,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_PLUGIN_CONTRIBUTORS: 109,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_LIST_TEMPLATE_CONTRIBUTORS: 110,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_SET_REPOSITORY_CONTRIBUTOR: 111,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_SET_PLUGIN_CONTRIBUTOR: 112,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_SET_TEMPLATE_CONTRIBUTOR: 113,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_MANAGE_REPOSITORY_CONTRIBUTORS: 114,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_MANAGE_PLUGIN_CONTRIBUTORS: 115,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_AUTHZ_SERVICE_USER_CAN_MANAGE_TEMPLATE_CONTRIBUTORS: 116,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_TRACK_SERVICE_CREATE_REPOSITORY_TRACK: 117,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_TRACK_SERVICE_LIST_REPOSITORY_TRACKS: 118,
  ACTION_BUF_ALPHA_REGISTRYINTERNAL_V1_ALPHA1_INTERNAL_PROVISION_SERVICE_ADD_USER_TO_ORGANIZATION: 119,
  ACTION_BUF_ALPHA_GOMODULE_V1_ALPHA1_GO_MODULE_SERVICE_DELETE_ALL_MODULES_FOR_REPOSITORY: 120,
  ACTION_BUF_ALPHA_SANDBOX_V1_ALPHA1_SANDBOX_SERVICE_REMOTE_BUILD: 121,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_LIST_MANAGEABLE_REPOSITORY_ROLES: 122,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_LIST_MANAGEABLE_USER_REPOSITORY_ROLES: 123,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_LIST_MANAGEABLE_PLUGIN_ROLES: 124,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_LIST_MANAGEABLE_USER_PLUGIN_ROLES: 125,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_LIST_MANAGEABLE_TEMPLATE_ROLES: 126,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_LIST_MANAGEABLE_USER_TEMPLATE_ROLES: 127,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_TRACK_SERVICE_DELETE_REPOSITORY_TRACK_BY_NAME: 128,
  ACTION_BUF_ALPHA_REGISTRYINTERNAL_V1_ALPHA1_INTERNAL_PLUGIN_SERVICE_CREATE_PLUGIN_VERSION_METADATA: 129,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_DISPLAY_ORGANIZATION_ELEMENTS: 130,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_DISPLAY_REPOSITORY_ELEMENTS: 131,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_DISPLAY_PLUGIN_ELEMENTS: 132,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_DISPLAY_TEMPLATE_ELEMENTS: 133,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_DISPLAY_USER_ELEMENTS: 134,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_DISPLAY_SERVICE_DISPLAY_SERVER_ELEMENTS: 135,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_DEPRECATE_PLUGIN: 136,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_UNDEPRECATE_PLUGIN: 137,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_DEPRECATE_TEMPLATE: 138,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_UNDEPRECATE_TEMPLATE: 139,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ORGANIZATION_SERVICE_SET_ORGANIZATION_MEMBER: 140,
  ACTION_BUF_ALPHA_GENREGISTRYINTERNAL_V1_ALPHA1_GENERATION_REGISTRY_SERVICE_DELETE_REPOSITORY: 141,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_SERVICE_GET_REPOSITORY_SETTINGS: 142,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_ADMIN_SERVICE_FORCE_DELETE_USER: 143,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_SERVICE_GET_PLUGIN_VERSION: 144,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_TRACK_COMMIT_SERVICE_GET_REPOSITORY_TRACK_COMMIT_BY_REPOSITORY_COMMIT: 145,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_TRACK_COMMIT_SERVICE_LIST_REPOSITORY_TRACK_COMMITS_BY_REPOSITORY_TRACK: 146,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_TRACK_SERVICE_GET_REPOSITORY_TRACK_BY_NAME: 147,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_JSON_SCHEMA_SERVICE_GET_JSON_SCHEMA: 148,
  ACTION_BUF_ALPHA_REGISTRY_V1_ALPHA1_REPOSITORY_TRACK_COMMIT_SERVICE_GET_REPOSITORY_TRACK_COMMIT_BY_REFERENCE: 149
};

goog.object.extend(exports, proto.buf.alpha.audit.v1alpha1);

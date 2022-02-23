// source: buf/alpha/registry/v1alpha1/plugin.proto
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

var buf_alpha_registry_v1alpha1_role_pb = require('../../../../buf/alpha/registry/v1alpha1/role_pb.js');
goog.object.extend(proto, buf_alpha_registry_v1alpha1_role_pb);
var buf_alpha_registry_v1alpha1_user_pb = require('../../../../buf/alpha/registry/v1alpha1/user_pb.js');
goog.object.extend(proto, buf_alpha_registry_v1alpha1_user_pb);
var buf_alpha_registry_v1alpha1_generate_pb = require('../../../../buf/alpha/registry/v1alpha1/generate_pb.js');
goog.object.extend(proto, buf_alpha_registry_v1alpha1_generate_pb);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.CreatePluginRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.CreatePluginResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.DeletePluginRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.DeletePluginResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.GetPluginRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.GetPluginResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.GetTemplateRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.GetTemplateResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListPluginsRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListPluginsResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.Plugin', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.PluginConfig', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.PluginContributor', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.PluginVersion', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.PluginVersionMapping', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.PluginVisibility', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.Template', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.TemplateContributor', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.TemplateVersion', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest', null, global);
goog.exportSymbol('proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse', null, global);
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
proto.buf.alpha.registry.v1alpha1.Plugin = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.Plugin, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.Plugin.displayName = 'proto.buf.alpha.registry.v1alpha1.Plugin';
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
proto.buf.alpha.registry.v1alpha1.PluginVersion = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.PluginVersion.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.PluginVersion, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.PluginVersion.displayName = 'proto.buf.alpha.registry.v1alpha1.PluginVersion';
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
proto.buf.alpha.registry.v1alpha1.Template = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.Template.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.Template, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.Template.displayName = 'proto.buf.alpha.registry.v1alpha1.Template';
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
proto.buf.alpha.registry.v1alpha1.PluginConfig = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.PluginConfig.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.PluginConfig, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.PluginConfig.displayName = 'proto.buf.alpha.registry.v1alpha1.PluginConfig';
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
proto.buf.alpha.registry.v1alpha1.TemplateVersion = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.TemplateVersion.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.TemplateVersion, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.TemplateVersion.displayName = 'proto.buf.alpha.registry.v1alpha1.TemplateVersion';
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
proto.buf.alpha.registry.v1alpha1.PluginVersionMapping = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.PluginVersionMapping, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.displayName = 'proto.buf.alpha.registry.v1alpha1.PluginVersionMapping';
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
proto.buf.alpha.registry.v1alpha1.PluginContributor = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.PluginContributor, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.PluginContributor.displayName = 'proto.buf.alpha.registry.v1alpha1.PluginContributor';
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
proto.buf.alpha.registry.v1alpha1.TemplateContributor = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.TemplateContributor, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.TemplateContributor.displayName = 'proto.buf.alpha.registry.v1alpha1.TemplateContributor';
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
proto.buf.alpha.registry.v1alpha1.ListPluginsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListPluginsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListPluginsRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.ListPluginsRequest';
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
proto.buf.alpha.registry.v1alpha1.ListPluginsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListPluginsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.ListPluginsResponse';
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
proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest';
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
proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse';
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
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest';
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
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse';
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
proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest';
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
proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse';
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
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest';
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
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse';
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
proto.buf.alpha.registry.v1alpha1.CreatePluginRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.CreatePluginRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.CreatePluginRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.CreatePluginRequest';
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
proto.buf.alpha.registry.v1alpha1.CreatePluginResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.CreatePluginResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.CreatePluginResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.CreatePluginResponse';
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
proto.buf.alpha.registry.v1alpha1.GetPluginRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.GetPluginRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.GetPluginRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.GetPluginRequest';
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
proto.buf.alpha.registry.v1alpha1.GetPluginResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.GetPluginResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.GetPluginResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.GetPluginResponse';
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
proto.buf.alpha.registry.v1alpha1.DeletePluginRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.DeletePluginRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.DeletePluginRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.DeletePluginRequest';
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
proto.buf.alpha.registry.v1alpha1.DeletePluginResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.DeletePluginResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.DeletePluginResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.DeletePluginResponse';
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
proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest';
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
proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse';
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
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest';
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
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse';
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
proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest';
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
proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse';
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
proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest';
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
proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse';
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
proto.buf.alpha.registry.v1alpha1.GetTemplateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.GetTemplateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.GetTemplateRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.GetTemplateRequest';
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
proto.buf.alpha.registry.v1alpha1.GetTemplateResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.GetTemplateResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.GetTemplateResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.GetTemplateResponse';
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
proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest';
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
proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse';
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
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest';
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
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse';
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
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest';
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
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse';
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
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest';
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
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse';
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
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest';
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
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse';
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
proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest';
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
proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse';
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
proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest';
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
proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse';
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
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest';
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
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse';
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
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest';
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
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse';
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
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest';
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
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.repeatedFields_, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse';
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
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest';
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
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse';
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
proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest.displayName = 'proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest';
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
proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse.displayName = 'proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse';
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
proto.buf.alpha.registry.v1alpha1.Plugin.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.Plugin.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.Plugin} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.Plugin.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    owner: jspb.Message.getFieldWithDefault(msg, 3, ""),
    visibility: jspb.Message.getFieldWithDefault(msg, 4, 0),
    deprecated: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    deprecationMessage: jspb.Message.getFieldWithDefault(msg, 6, "")
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
 * @return {!proto.buf.alpha.registry.v1alpha1.Plugin}
 */
proto.buf.alpha.registry.v1alpha1.Plugin.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.Plugin;
  return proto.buf.alpha.registry.v1alpha1.Plugin.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.Plugin} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.Plugin}
 */
proto.buf.alpha.registry.v1alpha1.Plugin.deserializeBinaryFromReader = function(msg, reader) {
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
      msg.setOwner(value);
      break;
    case 4:
      var value = /** @type {!proto.buf.alpha.registry.v1alpha1.PluginVisibility} */ (reader.readEnum());
      msg.setVisibility(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeprecated(value);
      break;
    case 6:
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
proto.buf.alpha.registry.v1alpha1.Plugin.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.Plugin.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.Plugin} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.Plugin.serializeBinaryToWriter = function(message, writer) {
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
  f = message.getOwner();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getVisibility();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = message.getDeprecated();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getDeprecationMessage();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.Plugin.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Plugin} returns this
 */
proto.buf.alpha.registry.v1alpha1.Plugin.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.Plugin.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Plugin} returns this
 */
proto.buf.alpha.registry.v1alpha1.Plugin.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string owner = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.Plugin.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Plugin} returns this
 */
proto.buf.alpha.registry.v1alpha1.Plugin.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional PluginVisibility visibility = 4;
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVisibility}
 */
proto.buf.alpha.registry.v1alpha1.Plugin.prototype.getVisibility = function() {
  return /** @type {!proto.buf.alpha.registry.v1alpha1.PluginVisibility} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginVisibility} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Plugin} returns this
 */
proto.buf.alpha.registry.v1alpha1.Plugin.prototype.setVisibility = function(value) {
  return jspb.Message.setProto3EnumField(this, 4, value);
};


/**
 * optional bool deprecated = 5;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.Plugin.prototype.getDeprecated = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Plugin} returns this
 */
proto.buf.alpha.registry.v1alpha1.Plugin.prototype.setDeprecated = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional string deprecation_message = 6;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.Plugin.prototype.getDeprecationMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Plugin} returns this
 */
proto.buf.alpha.registry.v1alpha1.Plugin.prototype.setDeprecationMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.PluginVersion.repeatedFields_ = [6];



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
proto.buf.alpha.registry.v1alpha1.PluginVersion.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.PluginVersion.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginVersion} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.PluginVersion.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    pluginName: jspb.Message.getFieldWithDefault(msg, 3, ""),
    pluginOwner: jspb.Message.getFieldWithDefault(msg, 4, ""),
    containerImageDigest: jspb.Message.getFieldWithDefault(msg, 5, ""),
    runtimeLibrariesList: jspb.Message.toObjectList(msg.getRuntimeLibrariesList(),
    buf_alpha_registry_v1alpha1_generate_pb.RuntimeLibrary.toObject, includeInstance)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVersion}
 */
proto.buf.alpha.registry.v1alpha1.PluginVersion.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.PluginVersion;
  return proto.buf.alpha.registry.v1alpha1.PluginVersion.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginVersion} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVersion}
 */
proto.buf.alpha.registry.v1alpha1.PluginVersion.deserializeBinaryFromReader = function(msg, reader) {
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
      msg.setPluginName(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setPluginOwner(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setContainerImageDigest(value);
      break;
    case 6:
      var value = new buf_alpha_registry_v1alpha1_generate_pb.RuntimeLibrary;
      reader.readMessage(value,buf_alpha_registry_v1alpha1_generate_pb.RuntimeLibrary.deserializeBinaryFromReader);
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
proto.buf.alpha.registry.v1alpha1.PluginVersion.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.PluginVersion.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginVersion} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.PluginVersion.serializeBinaryToWriter = function(message, writer) {
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
  f = message.getPluginName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getPluginOwner();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getContainerImageDigest();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getRuntimeLibrariesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      buf_alpha_registry_v1alpha1_generate_pb.RuntimeLibrary.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.PluginVersion.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVersion} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginVersion.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.PluginVersion.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVersion} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginVersion.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string plugin_name = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.PluginVersion.prototype.getPluginName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVersion} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginVersion.prototype.setPluginName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string plugin_owner = 4;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.PluginVersion.prototype.getPluginOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVersion} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginVersion.prototype.setPluginOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string container_image_digest = 5;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.PluginVersion.prototype.getContainerImageDigest = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVersion} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginVersion.prototype.setContainerImageDigest = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * repeated RuntimeLibrary runtime_libraries = 6;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.RuntimeLibrary>}
 */
proto.buf.alpha.registry.v1alpha1.PluginVersion.prototype.getRuntimeLibrariesList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.RuntimeLibrary>} */ (
    jspb.Message.getRepeatedWrapperField(this, buf_alpha_registry_v1alpha1_generate_pb.RuntimeLibrary, 6));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.RuntimeLibrary>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVersion} returns this
*/
proto.buf.alpha.registry.v1alpha1.PluginVersion.prototype.setRuntimeLibrariesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.RuntimeLibrary=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.RuntimeLibrary}
 */
proto.buf.alpha.registry.v1alpha1.PluginVersion.prototype.addRuntimeLibraries = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.buf.alpha.registry.v1alpha1.RuntimeLibrary, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVersion} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginVersion.prototype.clearRuntimeLibrariesList = function() {
  return this.setRuntimeLibrariesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.Template.repeatedFields_ = [4];



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
proto.buf.alpha.registry.v1alpha1.Template.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.Template.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.Template} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.Template.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    owner: jspb.Message.getFieldWithDefault(msg, 3, ""),
    pluginConfigsList: jspb.Message.toObjectList(msg.getPluginConfigsList(),
    proto.buf.alpha.registry.v1alpha1.PluginConfig.toObject, includeInstance),
    visibility: jspb.Message.getFieldWithDefault(msg, 5, 0),
    deprecated: jspb.Message.getBooleanFieldWithDefault(msg, 8, false),
    deprecationMessage: jspb.Message.getFieldWithDefault(msg, 9, "")
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
 * @return {!proto.buf.alpha.registry.v1alpha1.Template}
 */
proto.buf.alpha.registry.v1alpha1.Template.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.Template;
  return proto.buf.alpha.registry.v1alpha1.Template.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.Template} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.Template}
 */
proto.buf.alpha.registry.v1alpha1.Template.deserializeBinaryFromReader = function(msg, reader) {
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
      msg.setOwner(value);
      break;
    case 4:
      var value = new proto.buf.alpha.registry.v1alpha1.PluginConfig;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.PluginConfig.deserializeBinaryFromReader);
      msg.addPluginConfigs(value);
      break;
    case 5:
      var value = /** @type {!proto.buf.alpha.registry.v1alpha1.PluginVisibility} */ (reader.readEnum());
      msg.setVisibility(value);
      break;
    case 8:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeprecated(value);
      break;
    case 9:
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
proto.buf.alpha.registry.v1alpha1.Template.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.Template.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.Template} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.Template.serializeBinaryToWriter = function(message, writer) {
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
  f = message.getOwner();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getPluginConfigsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.buf.alpha.registry.v1alpha1.PluginConfig.serializeBinaryToWriter
    );
  }
  f = message.getVisibility();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
  f = message.getDeprecated();
  if (f) {
    writer.writeBool(
      8,
      f
    );
  }
  f = message.getDeprecationMessage();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.Template.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Template} returns this
 */
proto.buf.alpha.registry.v1alpha1.Template.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.Template.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Template} returns this
 */
proto.buf.alpha.registry.v1alpha1.Template.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string owner = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.Template.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Template} returns this
 */
proto.buf.alpha.registry.v1alpha1.Template.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * repeated PluginConfig plugin_configs = 4;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.PluginConfig>}
 */
proto.buf.alpha.registry.v1alpha1.Template.prototype.getPluginConfigsList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.PluginConfig>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.PluginConfig, 4));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.PluginConfig>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Template} returns this
*/
proto.buf.alpha.registry.v1alpha1.Template.prototype.setPluginConfigsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginConfig=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginConfig}
 */
proto.buf.alpha.registry.v1alpha1.Template.prototype.addPluginConfigs = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.buf.alpha.registry.v1alpha1.PluginConfig, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.Template} returns this
 */
proto.buf.alpha.registry.v1alpha1.Template.prototype.clearPluginConfigsList = function() {
  return this.setPluginConfigsList([]);
};


/**
 * optional PluginVisibility visibility = 5;
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVisibility}
 */
proto.buf.alpha.registry.v1alpha1.Template.prototype.getVisibility = function() {
  return /** @type {!proto.buf.alpha.registry.v1alpha1.PluginVisibility} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginVisibility} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Template} returns this
 */
proto.buf.alpha.registry.v1alpha1.Template.prototype.setVisibility = function(value) {
  return jspb.Message.setProto3EnumField(this, 5, value);
};


/**
 * optional bool deprecated = 8;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.Template.prototype.getDeprecated = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 8, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Template} returns this
 */
proto.buf.alpha.registry.v1alpha1.Template.prototype.setDeprecated = function(value) {
  return jspb.Message.setProto3BooleanField(this, 8, value);
};


/**
 * optional string deprecation_message = 9;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.Template.prototype.getDeprecationMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.Template} returns this
 */
proto.buf.alpha.registry.v1alpha1.Template.prototype.setDeprecationMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.PluginConfig.repeatedFields_ = [3];



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
proto.buf.alpha.registry.v1alpha1.PluginConfig.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.PluginConfig.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginConfig} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.PluginConfig.toObject = function(includeInstance, msg) {
  var f, obj = {
    pluginOwner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pluginName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    parametersList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f,
    inaccessible: jspb.Message.getBooleanFieldWithDefault(msg, 5, false)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginConfig}
 */
proto.buf.alpha.registry.v1alpha1.PluginConfig.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.PluginConfig;
  return proto.buf.alpha.registry.v1alpha1.PluginConfig.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginConfig} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginConfig}
 */
proto.buf.alpha.registry.v1alpha1.PluginConfig.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setPluginOwner(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPluginName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.addParameters(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setInaccessible(value);
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
proto.buf.alpha.registry.v1alpha1.PluginConfig.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.PluginConfig.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginConfig} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.PluginConfig.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPluginOwner();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPluginName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getParametersList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      3,
      f
    );
  }
  f = message.getInaccessible();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
};


/**
 * optional string plugin_owner = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.PluginConfig.prototype.getPluginOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginConfig} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginConfig.prototype.setPluginOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string plugin_name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.PluginConfig.prototype.getPluginName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginConfig} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginConfig.prototype.setPluginName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated string parameters = 3;
 * @return {!Array<string>}
 */
proto.buf.alpha.registry.v1alpha1.PluginConfig.prototype.getParametersList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginConfig} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginConfig.prototype.setParametersList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginConfig} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginConfig.prototype.addParameters = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginConfig} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginConfig.prototype.clearParametersList = function() {
  return this.setParametersList([]);
};


/**
 * optional bool inaccessible = 5;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.PluginConfig.prototype.getInaccessible = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginConfig} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginConfig.prototype.setInaccessible = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.TemplateVersion.repeatedFields_ = [5];



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
proto.buf.alpha.registry.v1alpha1.TemplateVersion.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.TemplateVersion.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.TemplateVersion} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.TemplateVersion.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    templateOwner: jspb.Message.getFieldWithDefault(msg, 3, ""),
    templateName: jspb.Message.getFieldWithDefault(msg, 4, ""),
    pluginVersionsList: jspb.Message.toObjectList(msg.getPluginVersionsList(),
    proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.toObject, includeInstance)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateVersion}
 */
proto.buf.alpha.registry.v1alpha1.TemplateVersion.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.TemplateVersion;
  return proto.buf.alpha.registry.v1alpha1.TemplateVersion.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.TemplateVersion} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateVersion}
 */
proto.buf.alpha.registry.v1alpha1.TemplateVersion.deserializeBinaryFromReader = function(msg, reader) {
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
      msg.setTemplateOwner(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setTemplateName(value);
      break;
    case 5:
      var value = new proto.buf.alpha.registry.v1alpha1.PluginVersionMapping;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.deserializeBinaryFromReader);
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
proto.buf.alpha.registry.v1alpha1.TemplateVersion.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.TemplateVersion.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.TemplateVersion} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.TemplateVersion.serializeBinaryToWriter = function(message, writer) {
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
  f = message.getTemplateOwner();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getTemplateName();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getPluginVersionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.TemplateVersion.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateVersion} returns this
 */
proto.buf.alpha.registry.v1alpha1.TemplateVersion.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.TemplateVersion.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateVersion} returns this
 */
proto.buf.alpha.registry.v1alpha1.TemplateVersion.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string template_owner = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.TemplateVersion.prototype.getTemplateOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateVersion} returns this
 */
proto.buf.alpha.registry.v1alpha1.TemplateVersion.prototype.setTemplateOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string template_name = 4;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.TemplateVersion.prototype.getTemplateName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateVersion} returns this
 */
proto.buf.alpha.registry.v1alpha1.TemplateVersion.prototype.setTemplateName = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * repeated PluginVersionMapping plugin_versions = 5;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping>}
 */
proto.buf.alpha.registry.v1alpha1.TemplateVersion.prototype.getPluginVersionsList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.PluginVersionMapping, 5));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateVersion} returns this
*/
proto.buf.alpha.registry.v1alpha1.TemplateVersion.prototype.setPluginVersionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping}
 */
proto.buf.alpha.registry.v1alpha1.TemplateVersion.prototype.addPluginVersions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.buf.alpha.registry.v1alpha1.PluginVersionMapping, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateVersion} returns this
 */
proto.buf.alpha.registry.v1alpha1.TemplateVersion.prototype.clearPluginVersionsList = function() {
  return this.setPluginVersionsList([]);
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
proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.toObject = function(includeInstance, msg) {
  var f, obj = {
    pluginOwner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pluginName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    version: jspb.Message.getFieldWithDefault(msg, 3, ""),
    inaccessible: jspb.Message.getBooleanFieldWithDefault(msg, 5, false)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping}
 */
proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.PluginVersionMapping;
  return proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping}
 */
proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setPluginOwner(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPluginName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setVersion(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setInaccessible(value);
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
proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPluginOwner();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPluginName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getVersion();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getInaccessible();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
};


/**
 * optional string plugin_owner = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.prototype.getPluginOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.prototype.setPluginOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string plugin_name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.prototype.getPluginName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.prototype.setPluginName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string version = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.prototype.getVersion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.prototype.setVersion = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool inaccessible = 5;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.prototype.getInaccessible = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.prototype.setInaccessible = function(value) {
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
proto.buf.alpha.registry.v1alpha1.PluginContributor.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.PluginContributor.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginContributor} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.PluginContributor.toObject = function(includeInstance, msg) {
  var f, obj = {
    user: (f = msg.getUser()) && buf_alpha_registry_v1alpha1_user_pb.User.toObject(includeInstance, f),
    pluginId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    explicitRole: jspb.Message.getFieldWithDefault(msg, 3, 0),
    implicitRole: jspb.Message.getFieldWithDefault(msg, 4, 0)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginContributor}
 */
proto.buf.alpha.registry.v1alpha1.PluginContributor.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.PluginContributor;
  return proto.buf.alpha.registry.v1alpha1.PluginContributor.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginContributor} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginContributor}
 */
proto.buf.alpha.registry.v1alpha1.PluginContributor.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new buf_alpha_registry_v1alpha1_user_pb.User;
      reader.readMessage(value,buf_alpha_registry_v1alpha1_user_pb.User.deserializeBinaryFromReader);
      msg.setUser(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPluginId(value);
      break;
    case 3:
      var value = /** @type {!proto.buf.alpha.registry.v1alpha1.PluginRole} */ (reader.readEnum());
      msg.setExplicitRole(value);
      break;
    case 4:
      var value = /** @type {!proto.buf.alpha.registry.v1alpha1.PluginRole} */ (reader.readEnum());
      msg.setImplicitRole(value);
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
proto.buf.alpha.registry.v1alpha1.PluginContributor.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.PluginContributor.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginContributor} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.PluginContributor.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUser();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      buf_alpha_registry_v1alpha1_user_pb.User.serializeBinaryToWriter
    );
  }
  f = message.getPluginId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getExplicitRole();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getImplicitRole();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
};


/**
 * optional User user = 1;
 * @return {?proto.buf.alpha.registry.v1alpha1.User}
 */
proto.buf.alpha.registry.v1alpha1.PluginContributor.prototype.getUser = function() {
  return /** @type{?proto.buf.alpha.registry.v1alpha1.User} */ (
    jspb.Message.getWrapperField(this, buf_alpha_registry_v1alpha1_user_pb.User, 1));
};


/**
 * @param {?proto.buf.alpha.registry.v1alpha1.User|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginContributor} returns this
*/
proto.buf.alpha.registry.v1alpha1.PluginContributor.prototype.setUser = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginContributor} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginContributor.prototype.clearUser = function() {
  return this.setUser(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.PluginContributor.prototype.hasUser = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string plugin_id = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.PluginContributor.prototype.getPluginId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginContributor} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginContributor.prototype.setPluginId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional PluginRole explicit_role = 3;
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginRole}
 */
proto.buf.alpha.registry.v1alpha1.PluginContributor.prototype.getExplicitRole = function() {
  return /** @type {!proto.buf.alpha.registry.v1alpha1.PluginRole} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginRole} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginContributor} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginContributor.prototype.setExplicitRole = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional PluginRole implicit_role = 4;
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginRole}
 */
proto.buf.alpha.registry.v1alpha1.PluginContributor.prototype.getImplicitRole = function() {
  return /** @type {!proto.buf.alpha.registry.v1alpha1.PluginRole} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginRole} value
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginContributor} returns this
 */
proto.buf.alpha.registry.v1alpha1.PluginContributor.prototype.setImplicitRole = function(value) {
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
proto.buf.alpha.registry.v1alpha1.TemplateContributor.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.TemplateContributor.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.TemplateContributor} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.TemplateContributor.toObject = function(includeInstance, msg) {
  var f, obj = {
    user: (f = msg.getUser()) && buf_alpha_registry_v1alpha1_user_pb.User.toObject(includeInstance, f),
    templateId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    explicitRole: jspb.Message.getFieldWithDefault(msg, 3, 0),
    implicitRole: jspb.Message.getFieldWithDefault(msg, 4, 0)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateContributor}
 */
proto.buf.alpha.registry.v1alpha1.TemplateContributor.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.TemplateContributor;
  return proto.buf.alpha.registry.v1alpha1.TemplateContributor.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.TemplateContributor} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateContributor}
 */
proto.buf.alpha.registry.v1alpha1.TemplateContributor.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new buf_alpha_registry_v1alpha1_user_pb.User;
      reader.readMessage(value,buf_alpha_registry_v1alpha1_user_pb.User.deserializeBinaryFromReader);
      msg.setUser(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTemplateId(value);
      break;
    case 3:
      var value = /** @type {!proto.buf.alpha.registry.v1alpha1.TemplateRole} */ (reader.readEnum());
      msg.setExplicitRole(value);
      break;
    case 4:
      var value = /** @type {!proto.buf.alpha.registry.v1alpha1.TemplateRole} */ (reader.readEnum());
      msg.setImplicitRole(value);
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
proto.buf.alpha.registry.v1alpha1.TemplateContributor.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.TemplateContributor.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.TemplateContributor} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.TemplateContributor.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUser();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      buf_alpha_registry_v1alpha1_user_pb.User.serializeBinaryToWriter
    );
  }
  f = message.getTemplateId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getExplicitRole();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getImplicitRole();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
};


/**
 * optional User user = 1;
 * @return {?proto.buf.alpha.registry.v1alpha1.User}
 */
proto.buf.alpha.registry.v1alpha1.TemplateContributor.prototype.getUser = function() {
  return /** @type{?proto.buf.alpha.registry.v1alpha1.User} */ (
    jspb.Message.getWrapperField(this, buf_alpha_registry_v1alpha1_user_pb.User, 1));
};


/**
 * @param {?proto.buf.alpha.registry.v1alpha1.User|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateContributor} returns this
*/
proto.buf.alpha.registry.v1alpha1.TemplateContributor.prototype.setUser = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateContributor} returns this
 */
proto.buf.alpha.registry.v1alpha1.TemplateContributor.prototype.clearUser = function() {
  return this.setUser(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.TemplateContributor.prototype.hasUser = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string template_id = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.TemplateContributor.prototype.getTemplateId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateContributor} returns this
 */
proto.buf.alpha.registry.v1alpha1.TemplateContributor.prototype.setTemplateId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional TemplateRole explicit_role = 3;
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateRole}
 */
proto.buf.alpha.registry.v1alpha1.TemplateContributor.prototype.getExplicitRole = function() {
  return /** @type {!proto.buf.alpha.registry.v1alpha1.TemplateRole} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.TemplateRole} value
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateContributor} returns this
 */
proto.buf.alpha.registry.v1alpha1.TemplateContributor.prototype.setExplicitRole = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional TemplateRole implicit_role = 4;
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateRole}
 */
proto.buf.alpha.registry.v1alpha1.TemplateContributor.prototype.getImplicitRole = function() {
  return /** @type {!proto.buf.alpha.registry.v1alpha1.TemplateRole} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.TemplateRole} value
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateContributor} returns this
 */
proto.buf.alpha.registry.v1alpha1.TemplateContributor.prototype.setImplicitRole = function(value) {
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
proto.buf.alpha.registry.v1alpha1.ListPluginsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListPluginsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    pageSize: jspb.Message.getFieldWithDefault(msg, 1, 0),
    pageToken: jspb.Message.getFieldWithDefault(msg, 2, ""),
    reverse: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginsRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListPluginsRequest;
  return proto.buf.alpha.registry.v1alpha1.ListPluginsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginsRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPageSize(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPageToken(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setReverse(value);
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
proto.buf.alpha.registry.v1alpha1.ListPluginsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListPluginsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPageSize();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getReverse();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional uint32 page_size = 1;
 * @return {number}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsRequest.prototype.getPageSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsRequest.prototype.setPageSize = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsRequest.prototype.getPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsRequest.prototype.setPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool reverse = 3;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsRequest.prototype.getReverse = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsRequest.prototype.setReverse = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.repeatedFields_ = [1];



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
proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    pluginsList: jspb.Message.toObjectList(msg.getPluginsList(),
    proto.buf.alpha.registry.v1alpha1.Plugin.toObject, includeInstance),
    nextPageToken: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginsResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListPluginsResponse;
  return proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginsResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Plugin;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Plugin.deserializeBinaryFromReader);
      msg.addPlugins(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNextPageToken(value);
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
proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPluginsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Plugin.serializeBinaryToWriter
    );
  }
  f = message.getNextPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * repeated Plugin plugins = 1;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.Plugin>}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.prototype.getPluginsList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.Plugin>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.Plugin, 1));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.Plugin>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginsResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.prototype.setPluginsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.Plugin=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.Plugin}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.prototype.addPlugins = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.alpha.registry.v1alpha1.Plugin, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginsResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.prototype.clearPluginsList = function() {
  return this.setPluginsList([]);
};


/**
 * optional string next_page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.prototype.getNextPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginsResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListPluginsResponse.prototype.setNextPageToken = function(value) {
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
proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pageSize: jspb.Message.getFieldWithDefault(msg, 2, 0),
    pageToken: jspb.Message.getFieldWithDefault(msg, 3, ""),
    reverse: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest;
  return proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPageSize(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setPageToken(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setReverse(value);
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
proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwner();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPageSize();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getPageToken();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getReverse();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint32 page_size = 2;
 * @return {number}
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest.prototype.getPageSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest.prototype.setPageSize = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string page_token = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest.prototype.getPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest.prototype.setPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool reverse = 4;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest.prototype.getReverse = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsRequest.prototype.setReverse = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.repeatedFields_ = [1];



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
proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    pluginsList: jspb.Message.toObjectList(msg.getPluginsList(),
    proto.buf.alpha.registry.v1alpha1.Plugin.toObject, includeInstance),
    nextPageToken: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse;
  return proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Plugin;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Plugin.deserializeBinaryFromReader);
      msg.addPlugins(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNextPageToken(value);
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
proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPluginsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Plugin.serializeBinaryToWriter
    );
  }
  f = message.getNextPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * repeated Plugin plugins = 1;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.Plugin>}
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.prototype.getPluginsList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.Plugin>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.Plugin, 1));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.Plugin>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.prototype.setPluginsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.Plugin=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.Plugin}
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.prototype.addPlugins = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.alpha.registry.v1alpha1.Plugin, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.prototype.clearPluginsList = function() {
  return this.setPluginsList([]);
};


/**
 * optional string next_page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.prototype.getNextPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListUserPluginsResponse.prototype.setNextPageToken = function(value) {
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
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    organization: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pageSize: jspb.Message.getFieldWithDefault(msg, 2, 0),
    pageToken: jspb.Message.getFieldWithDefault(msg, 3, ""),
    reverse: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest;
  return proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOrganization(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPageSize(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setPageToken(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setReverse(value);
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
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOrganization();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPageSize();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getPageToken();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getReverse();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional string organization = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest.prototype.getOrganization = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest.prototype.setOrganization = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint32 page_size = 2;
 * @return {number}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest.prototype.getPageSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest.prototype.setPageSize = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string page_token = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest.prototype.getPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest.prototype.setPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool reverse = 4;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest.prototype.getReverse = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsRequest.prototype.setReverse = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.repeatedFields_ = [1];



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
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    pluginsList: jspb.Message.toObjectList(msg.getPluginsList(),
    proto.buf.alpha.registry.v1alpha1.Plugin.toObject, includeInstance),
    nextPageToken: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse;
  return proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Plugin;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Plugin.deserializeBinaryFromReader);
      msg.addPlugins(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNextPageToken(value);
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
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPluginsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Plugin.serializeBinaryToWriter
    );
  }
  f = message.getNextPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * repeated Plugin plugins = 1;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.Plugin>}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.prototype.getPluginsList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.Plugin>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.Plugin, 1));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.Plugin>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.prototype.setPluginsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.Plugin=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.Plugin}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.prototype.addPlugins = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.alpha.registry.v1alpha1.Plugin, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.prototype.clearPluginsList = function() {
  return this.setPluginsList([]);
};


/**
 * optional string next_page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.prototype.getNextPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationPluginsResponse.prototype.setNextPageToken = function(value) {
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
proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    version: jspb.Message.getFieldWithDefault(msg, 3, "")
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
 * @return {!proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest}
 */
proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest;
  return proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest}
 */
proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest.serializeBinaryToWriter = function(message, writer) {
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
  f = message.getVersion();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string version = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest.prototype.getVersion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetPluginVersionRequest.prototype.setVersion = function(value) {
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
proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    pluginVersion: (f = msg.getPluginVersion()) && proto.buf.alpha.registry.v1alpha1.PluginVersion.toObject(includeInstance, f)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse}
 */
proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse;
  return proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse}
 */
proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.PluginVersion;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.PluginVersion.deserializeBinaryFromReader);
      msg.setPluginVersion(value);
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
proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPluginVersion();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.PluginVersion.serializeBinaryToWriter
    );
  }
};


/**
 * optional PluginVersion plugin_version = 1;
 * @return {?proto.buf.alpha.registry.v1alpha1.PluginVersion}
 */
proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse.prototype.getPluginVersion = function() {
  return /** @type{?proto.buf.alpha.registry.v1alpha1.PluginVersion} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.registry.v1alpha1.PluginVersion, 1));
};


/**
 * @param {?proto.buf.alpha.registry.v1alpha1.PluginVersion|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse.prototype.setPluginVersion = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse.prototype.clearPluginVersion = function() {
  return this.setPluginVersion(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.GetPluginVersionResponse.prototype.hasPluginVersion = function() {
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
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    pageSize: jspb.Message.getFieldWithDefault(msg, 3, 0),
    pageToken: jspb.Message.getFieldWithDefault(msg, 4, ""),
    reverse: jspb.Message.getBooleanFieldWithDefault(msg, 5, false)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest;
  return proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPageSize(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setPageToken(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setReverse(value);
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
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.serializeBinaryToWriter = function(message, writer) {
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
  f = message.getPageSize();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
  f = message.getPageToken();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getReverse();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional uint32 page_size = 3;
 * @return {number}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.prototype.getPageSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.prototype.setPageSize = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional string page_token = 4;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.prototype.getPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.prototype.setPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional bool reverse = 5;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.prototype.getReverse = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsRequest.prototype.setReverse = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.repeatedFields_ = [1];



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
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    pluginVersionsList: jspb.Message.toObjectList(msg.getPluginVersionsList(),
    proto.buf.alpha.registry.v1alpha1.PluginVersion.toObject, includeInstance),
    nextPageToken: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse;
  return proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.PluginVersion;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.PluginVersion.deserializeBinaryFromReader);
      msg.addPluginVersions(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNextPageToken(value);
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
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPluginVersionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.PluginVersion.serializeBinaryToWriter
    );
  }
  f = message.getNextPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * repeated PluginVersion plugin_versions = 1;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.PluginVersion>}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.prototype.getPluginVersionsList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.PluginVersion>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.PluginVersion, 1));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.PluginVersion>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.prototype.setPluginVersionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginVersion=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVersion}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.prototype.addPluginVersions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.alpha.registry.v1alpha1.PluginVersion, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.prototype.clearPluginVersionsList = function() {
  return this.setPluginVersionsList([]);
};


/**
 * optional string next_page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.prototype.getNextPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListPluginVersionsResponse.prototype.setNextPageToken = function(value) {
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
proto.buf.alpha.registry.v1alpha1.CreatePluginRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.CreatePluginRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.CreatePluginRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.CreatePluginRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.buf.alpha.registry.v1alpha1.CreatePluginRequest}
 */
proto.buf.alpha.registry.v1alpha1.CreatePluginRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.CreatePluginRequest;
  return proto.buf.alpha.registry.v1alpha1.CreatePluginRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.CreatePluginRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.CreatePluginRequest}
 */
proto.buf.alpha.registry.v1alpha1.CreatePluginRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {!proto.buf.alpha.registry.v1alpha1.PluginVisibility} */ (reader.readEnum());
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
proto.buf.alpha.registry.v1alpha1.CreatePluginRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.CreatePluginRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.CreatePluginRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.CreatePluginRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.buf.alpha.registry.v1alpha1.CreatePluginRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.CreatePluginRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.CreatePluginRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.CreatePluginRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.CreatePluginRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.CreatePluginRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional PluginVisibility visibility = 3;
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVisibility}
 */
proto.buf.alpha.registry.v1alpha1.CreatePluginRequest.prototype.getVisibility = function() {
  return /** @type {!proto.buf.alpha.registry.v1alpha1.PluginVisibility} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginVisibility} value
 * @return {!proto.buf.alpha.registry.v1alpha1.CreatePluginRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.CreatePluginRequest.prototype.setVisibility = function(value) {
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
proto.buf.alpha.registry.v1alpha1.CreatePluginResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.CreatePluginResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.CreatePluginResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.CreatePluginResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    plugin: (f = msg.getPlugin()) && proto.buf.alpha.registry.v1alpha1.Plugin.toObject(includeInstance, f)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.CreatePluginResponse}
 */
proto.buf.alpha.registry.v1alpha1.CreatePluginResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.CreatePluginResponse;
  return proto.buf.alpha.registry.v1alpha1.CreatePluginResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.CreatePluginResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.CreatePluginResponse}
 */
proto.buf.alpha.registry.v1alpha1.CreatePluginResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Plugin;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Plugin.deserializeBinaryFromReader);
      msg.setPlugin(value);
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
proto.buf.alpha.registry.v1alpha1.CreatePluginResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.CreatePluginResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.CreatePluginResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.CreatePluginResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPlugin();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Plugin.serializeBinaryToWriter
    );
  }
};


/**
 * optional Plugin plugin = 1;
 * @return {?proto.buf.alpha.registry.v1alpha1.Plugin}
 */
proto.buf.alpha.registry.v1alpha1.CreatePluginResponse.prototype.getPlugin = function() {
  return /** @type{?proto.buf.alpha.registry.v1alpha1.Plugin} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.registry.v1alpha1.Plugin, 1));
};


/**
 * @param {?proto.buf.alpha.registry.v1alpha1.Plugin|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.CreatePluginResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.CreatePluginResponse.prototype.setPlugin = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.CreatePluginResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.CreatePluginResponse.prototype.clearPlugin = function() {
  return this.setPlugin(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.CreatePluginResponse.prototype.hasPlugin = function() {
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
proto.buf.alpha.registry.v1alpha1.GetPluginRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.GetPluginRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.GetPluginRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetPluginRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.buf.alpha.registry.v1alpha1.GetPluginRequest}
 */
proto.buf.alpha.registry.v1alpha1.GetPluginRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.GetPluginRequest;
  return proto.buf.alpha.registry.v1alpha1.GetPluginRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetPluginRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetPluginRequest}
 */
proto.buf.alpha.registry.v1alpha1.GetPluginRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.buf.alpha.registry.v1alpha1.GetPluginRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.GetPluginRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetPluginRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetPluginRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.buf.alpha.registry.v1alpha1.GetPluginRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetPluginRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetPluginRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.GetPluginRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetPluginRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetPluginRequest.prototype.setName = function(value) {
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
proto.buf.alpha.registry.v1alpha1.GetPluginResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.GetPluginResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.GetPluginResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetPluginResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    plugin: (f = msg.getPlugin()) && proto.buf.alpha.registry.v1alpha1.Plugin.toObject(includeInstance, f)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.GetPluginResponse}
 */
proto.buf.alpha.registry.v1alpha1.GetPluginResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.GetPluginResponse;
  return proto.buf.alpha.registry.v1alpha1.GetPluginResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetPluginResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetPluginResponse}
 */
proto.buf.alpha.registry.v1alpha1.GetPluginResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Plugin;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Plugin.deserializeBinaryFromReader);
      msg.setPlugin(value);
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
proto.buf.alpha.registry.v1alpha1.GetPluginResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.GetPluginResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetPluginResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetPluginResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPlugin();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Plugin.serializeBinaryToWriter
    );
  }
};


/**
 * optional Plugin plugin = 1;
 * @return {?proto.buf.alpha.registry.v1alpha1.Plugin}
 */
proto.buf.alpha.registry.v1alpha1.GetPluginResponse.prototype.getPlugin = function() {
  return /** @type{?proto.buf.alpha.registry.v1alpha1.Plugin} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.registry.v1alpha1.Plugin, 1));
};


/**
 * @param {?proto.buf.alpha.registry.v1alpha1.Plugin|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetPluginResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.GetPluginResponse.prototype.setPlugin = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetPluginResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetPluginResponse.prototype.clearPlugin = function() {
  return this.setPlugin(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.GetPluginResponse.prototype.hasPlugin = function() {
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
proto.buf.alpha.registry.v1alpha1.DeletePluginRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.DeletePluginRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.DeletePluginRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeletePluginRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.buf.alpha.registry.v1alpha1.DeletePluginRequest}
 */
proto.buf.alpha.registry.v1alpha1.DeletePluginRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.DeletePluginRequest;
  return proto.buf.alpha.registry.v1alpha1.DeletePluginRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeletePluginRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeletePluginRequest}
 */
proto.buf.alpha.registry.v1alpha1.DeletePluginRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.buf.alpha.registry.v1alpha1.DeletePluginRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.DeletePluginRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeletePluginRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeletePluginRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.buf.alpha.registry.v1alpha1.DeletePluginRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.DeletePluginRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.DeletePluginRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.DeletePluginRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.DeletePluginRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.DeletePluginRequest.prototype.setName = function(value) {
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
proto.buf.alpha.registry.v1alpha1.DeletePluginResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.DeletePluginResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.DeletePluginResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeletePluginResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

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
 * @return {!proto.buf.alpha.registry.v1alpha1.DeletePluginResponse}
 */
proto.buf.alpha.registry.v1alpha1.DeletePluginResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.DeletePluginResponse;
  return proto.buf.alpha.registry.v1alpha1.DeletePluginResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeletePluginResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeletePluginResponse}
 */
proto.buf.alpha.registry.v1alpha1.DeletePluginResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
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
proto.buf.alpha.registry.v1alpha1.DeletePluginResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.DeletePluginResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeletePluginResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeletePluginResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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
proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    pluginId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    userId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    pluginRole: jspb.Message.getFieldWithDefault(msg, 3, 0)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest}
 */
proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest;
  return proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest}
 */
proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setPluginId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 3:
      var value = /** @type {!proto.buf.alpha.registry.v1alpha1.PluginRole} */ (reader.readEnum());
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
proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPluginId();
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
  f = message.getPluginRole();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * optional string plugin_id = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest.prototype.getPluginId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest.prototype.setPluginId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string user_id = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional PluginRole plugin_role = 3;
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginRole}
 */
proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest.prototype.getPluginRole = function() {
  return /** @type {!proto.buf.alpha.registry.v1alpha1.PluginRole} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginRole} value
 * @return {!proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.SetPluginContributorRequest.prototype.setPluginRole = function(value) {
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
proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

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
 * @return {!proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse}
 */
proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse;
  return proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse}
 */
proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
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
proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.SetPluginContributorResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    pluginId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pageSize: jspb.Message.getFieldWithDefault(msg, 2, 0),
    pageToken: jspb.Message.getFieldWithDefault(msg, 3, ""),
    reverse: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest;
  return proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setPluginId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPageSize(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setPageToken(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setReverse(value);
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
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPluginId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPageSize();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getPageToken();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getReverse();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional string plugin_id = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest.prototype.getPluginId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest.prototype.setPluginId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint32 page_size = 2;
 * @return {number}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest.prototype.getPageSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest.prototype.setPageSize = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string page_token = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest.prototype.getPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest.prototype.setPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool reverse = 4;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest.prototype.getReverse = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsRequest.prototype.setReverse = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.repeatedFields_ = [1];



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
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    usersList: jspb.Message.toObjectList(msg.getUsersList(),
    proto.buf.alpha.registry.v1alpha1.PluginContributor.toObject, includeInstance),
    nextPageToken: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse;
  return proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.PluginContributor;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.PluginContributor.deserializeBinaryFromReader);
      msg.addUsers(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNextPageToken(value);
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
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUsersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.PluginContributor.serializeBinaryToWriter
    );
  }
  f = message.getNextPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * repeated PluginContributor users = 1;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.PluginContributor>}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.prototype.getUsersList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.PluginContributor>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.PluginContributor, 1));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.PluginContributor>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.prototype.setUsersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginContributor=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginContributor}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.prototype.addUsers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.alpha.registry.v1alpha1.PluginContributor, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.prototype.clearUsersList = function() {
  return this.setUsersList([]);
};


/**
 * optional string next_page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.prototype.getNextPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListPluginContributorsResponse.prototype.setNextPageToken = function(value) {
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
proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    message: jspb.Message.getFieldWithDefault(msg, 3, "")
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
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest}
 */
proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest;
  return proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest}
 */
proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
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
proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest.serializeBinaryToWriter = function(message, writer) {
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
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.DeprecatePluginRequest.prototype.setMessage = function(value) {
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
proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

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
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse}
 */
proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse;
  return proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse}
 */
proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
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
proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeprecatePluginResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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
proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest;
  return proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.UndeprecatePluginRequest.prototype.setName = function(value) {
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
proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

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
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse;
  return proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
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
proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.UndeprecatePluginResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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
proto.buf.alpha.registry.v1alpha1.GetTemplateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.GetTemplateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.GetTemplateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.buf.alpha.registry.v1alpha1.GetTemplateRequest}
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.GetTemplateRequest;
  return proto.buf.alpha.registry.v1alpha1.GetTemplateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetTemplateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetTemplateRequest}
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.buf.alpha.registry.v1alpha1.GetTemplateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.GetTemplateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetTemplateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.buf.alpha.registry.v1alpha1.GetTemplateRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetTemplateRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetTemplateRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateRequest.prototype.setName = function(value) {
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
proto.buf.alpha.registry.v1alpha1.GetTemplateResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.GetTemplateResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.GetTemplateResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    template: (f = msg.getTemplate()) && proto.buf.alpha.registry.v1alpha1.Template.toObject(includeInstance, f)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.GetTemplateResponse}
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.GetTemplateResponse;
  return proto.buf.alpha.registry.v1alpha1.GetTemplateResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetTemplateResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetTemplateResponse}
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Template;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Template.deserializeBinaryFromReader);
      msg.setTemplate(value);
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
proto.buf.alpha.registry.v1alpha1.GetTemplateResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.GetTemplateResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetTemplateResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTemplate();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Template.serializeBinaryToWriter
    );
  }
};


/**
 * optional Template template = 1;
 * @return {?proto.buf.alpha.registry.v1alpha1.Template}
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateResponse.prototype.getTemplate = function() {
  return /** @type{?proto.buf.alpha.registry.v1alpha1.Template} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.registry.v1alpha1.Template, 1));
};


/**
 * @param {?proto.buf.alpha.registry.v1alpha1.Template|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetTemplateResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.GetTemplateResponse.prototype.setTemplate = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetTemplateResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateResponse.prototype.clearTemplate = function() {
  return this.setTemplate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateResponse.prototype.hasTemplate = function() {
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
proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    pageSize: jspb.Message.getFieldWithDefault(msg, 1, 0),
    pageToken: jspb.Message.getFieldWithDefault(msg, 2, ""),
    reverse: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest;
  return proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPageSize(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPageToken(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setReverse(value);
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
proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPageSize();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getReverse();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional uint32 page_size = 1;
 * @return {number}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest.prototype.getPageSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest.prototype.setPageSize = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest.prototype.getPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest.prototype.setPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool reverse = 3;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest.prototype.getReverse = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesRequest.prototype.setReverse = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.repeatedFields_ = [1];



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
proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    templatesList: jspb.Message.toObjectList(msg.getTemplatesList(),
    proto.buf.alpha.registry.v1alpha1.Template.toObject, includeInstance),
    nextPageToken: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse;
  return proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Template;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Template.deserializeBinaryFromReader);
      msg.addTemplates(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNextPageToken(value);
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
proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTemplatesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Template.serializeBinaryToWriter
    );
  }
  f = message.getNextPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * repeated Template templates = 1;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.Template>}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.prototype.getTemplatesList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.Template>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.Template, 1));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.Template>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.prototype.setTemplatesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.Template=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.Template}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.prototype.addTemplates = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.alpha.registry.v1alpha1.Template, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.prototype.clearTemplatesList = function() {
  return this.setTemplatesList([]);
};


/**
 * optional string next_page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.prototype.getNextPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListTemplatesResponse.prototype.setNextPageToken = function(value) {
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
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pageSize: jspb.Message.getFieldWithDefault(msg, 2, 0),
    pageToken: jspb.Message.getFieldWithDefault(msg, 3, ""),
    reverse: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest;
  return proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPageSize(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setPageToken(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setReverse(value);
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
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOwner();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPageSize();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getPageToken();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getReverse();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint32 page_size = 2;
 * @return {number}
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest.prototype.getPageSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest.prototype.setPageSize = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string page_token = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest.prototype.getPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest.prototype.setPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool reverse = 4;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest.prototype.getReverse = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesRequest.prototype.setReverse = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.repeatedFields_ = [1];



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
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    templatesList: jspb.Message.toObjectList(msg.getTemplatesList(),
    proto.buf.alpha.registry.v1alpha1.Template.toObject, includeInstance),
    nextPageToken: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse;
  return proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Template;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Template.deserializeBinaryFromReader);
      msg.addTemplates(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNextPageToken(value);
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
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTemplatesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Template.serializeBinaryToWriter
    );
  }
  f = message.getNextPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * repeated Template templates = 1;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.Template>}
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.prototype.getTemplatesList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.Template>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.Template, 1));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.Template>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.prototype.setTemplatesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.Template=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.Template}
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.prototype.addTemplates = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.alpha.registry.v1alpha1.Template, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.prototype.clearTemplatesList = function() {
  return this.setTemplatesList([]);
};


/**
 * optional string next_page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.prototype.getNextPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListUserTemplatesResponse.prototype.setNextPageToken = function(value) {
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
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    version: jspb.Message.getFieldWithDefault(msg, 3, "")
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
 * @return {!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest}
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest;
  return proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest}
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest.serializeBinaryToWriter = function(message, writer) {
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
  f = message.getVersion();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string version = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest.prototype.getVersion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionRequest.prototype.setVersion = function(value) {
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
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    templateVersion: (f = msg.getTemplateVersion()) && proto.buf.alpha.registry.v1alpha1.TemplateVersion.toObject(includeInstance, f)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse}
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse;
  return proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse}
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.TemplateVersion;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.TemplateVersion.deserializeBinaryFromReader);
      msg.setTemplateVersion(value);
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
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTemplateVersion();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.TemplateVersion.serializeBinaryToWriter
    );
  }
};


/**
 * optional TemplateVersion template_version = 1;
 * @return {?proto.buf.alpha.registry.v1alpha1.TemplateVersion}
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse.prototype.getTemplateVersion = function() {
  return /** @type{?proto.buf.alpha.registry.v1alpha1.TemplateVersion} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.registry.v1alpha1.TemplateVersion, 1));
};


/**
 * @param {?proto.buf.alpha.registry.v1alpha1.TemplateVersion|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse.prototype.setTemplateVersion = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse.prototype.clearTemplateVersion = function() {
  return this.setTemplateVersion(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.GetTemplateVersionResponse.prototype.hasTemplateVersion = function() {
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
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    organization: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pageSize: jspb.Message.getFieldWithDefault(msg, 2, 0),
    pageToken: jspb.Message.getFieldWithDefault(msg, 3, ""),
    reverse: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest;
  return proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOrganization(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPageSize(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setPageToken(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setReverse(value);
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
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOrganization();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPageSize();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getPageToken();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getReverse();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional string organization = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest.prototype.getOrganization = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest.prototype.setOrganization = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint32 page_size = 2;
 * @return {number}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest.prototype.getPageSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest.prototype.setPageSize = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string page_token = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest.prototype.getPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest.prototype.setPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool reverse = 4;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest.prototype.getReverse = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesRequest.prototype.setReverse = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.repeatedFields_ = [1];



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
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    templatesList: jspb.Message.toObjectList(msg.getTemplatesList(),
    proto.buf.alpha.registry.v1alpha1.Template.toObject, includeInstance),
    nextPageToken: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse;
  return proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Template;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Template.deserializeBinaryFromReader);
      msg.addTemplates(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNextPageToken(value);
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
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTemplatesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Template.serializeBinaryToWriter
    );
  }
  f = message.getNextPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * repeated Template templates = 1;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.Template>}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.prototype.getTemplatesList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.Template>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.Template, 1));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.Template>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.prototype.setTemplatesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.Template=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.Template}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.prototype.addTemplates = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.alpha.registry.v1alpha1.Template, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.prototype.clearTemplatesList = function() {
  return this.setTemplatesList([]);
};


/**
 * optional string next_page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.prototype.getNextPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListOrganizationTemplatesResponse.prototype.setNextPageToken = function(value) {
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
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    pageSize: jspb.Message.getFieldWithDefault(msg, 3, 0),
    pageToken: jspb.Message.getFieldWithDefault(msg, 4, ""),
    reverse: jspb.Message.getBooleanFieldWithDefault(msg, 5, false)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest;
  return proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPageSize(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setPageToken(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setReverse(value);
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
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.serializeBinaryToWriter = function(message, writer) {
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
  f = message.getPageSize();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
  f = message.getPageToken();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getReverse();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional uint32 page_size = 3;
 * @return {number}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.prototype.getPageSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.prototype.setPageSize = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional string page_token = 4;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.prototype.getPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.prototype.setPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional bool reverse = 5;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.prototype.getReverse = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsRequest.prototype.setReverse = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.repeatedFields_ = [1];



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
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    templateVersionsList: jspb.Message.toObjectList(msg.getTemplateVersionsList(),
    proto.buf.alpha.registry.v1alpha1.TemplateVersion.toObject, includeInstance),
    nextPageToken: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse;
  return proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.TemplateVersion;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.TemplateVersion.deserializeBinaryFromReader);
      msg.addTemplateVersions(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNextPageToken(value);
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
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTemplateVersionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.TemplateVersion.serializeBinaryToWriter
    );
  }
  f = message.getNextPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * repeated TemplateVersion template_versions = 1;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.TemplateVersion>}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.prototype.getTemplateVersionsList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.TemplateVersion>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.TemplateVersion, 1));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.TemplateVersion>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.prototype.setTemplateVersionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.TemplateVersion=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateVersion}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.prototype.addTemplateVersions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.alpha.registry.v1alpha1.TemplateVersion, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.prototype.clearTemplateVersionsList = function() {
  return this.setTemplateVersionsList([]);
};


/**
 * optional string next_page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.prototype.getNextPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateVersionsResponse.prototype.setNextPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.repeatedFields_ = [4];



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
proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    visibility: jspb.Message.getFieldWithDefault(msg, 3, 0),
    pluginConfigsList: jspb.Message.toObjectList(msg.getPluginConfigsList(),
    proto.buf.alpha.registry.v1alpha1.PluginConfig.toObject, includeInstance)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest;
  return proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {!proto.buf.alpha.registry.v1alpha1.PluginVisibility} */ (reader.readEnum());
      msg.setVisibility(value);
      break;
    case 4:
      var value = new proto.buf.alpha.registry.v1alpha1.PluginConfig;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.PluginConfig.deserializeBinaryFromReader);
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
proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.serializeBinaryToWriter = function(message, writer) {
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
      proto.buf.alpha.registry.v1alpha1.PluginConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional PluginVisibility visibility = 3;
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVisibility}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.prototype.getVisibility = function() {
  return /** @type {!proto.buf.alpha.registry.v1alpha1.PluginVisibility} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginVisibility} value
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.prototype.setVisibility = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * repeated PluginConfig plugin_configs = 4;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.PluginConfig>}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.prototype.getPluginConfigsList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.PluginConfig>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.PluginConfig, 4));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.PluginConfig>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest} returns this
*/
proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.prototype.setPluginConfigsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginConfig=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginConfig}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.prototype.addPluginConfigs = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.buf.alpha.registry.v1alpha1.PluginConfig, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateRequest.prototype.clearPluginConfigsList = function() {
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
proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    template: (f = msg.getTemplate()) && proto.buf.alpha.registry.v1alpha1.Template.toObject(includeInstance, f)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse;
  return proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.Template;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.Template.deserializeBinaryFromReader);
      msg.setTemplate(value);
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
proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTemplate();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.Template.serializeBinaryToWriter
    );
  }
};


/**
 * optional Template template = 1;
 * @return {?proto.buf.alpha.registry.v1alpha1.Template}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse.prototype.getTemplate = function() {
  return /** @type{?proto.buf.alpha.registry.v1alpha1.Template} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.registry.v1alpha1.Template, 1));
};


/**
 * @param {?proto.buf.alpha.registry.v1alpha1.Template|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse.prototype.setTemplate = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse.prototype.clearTemplate = function() {
  return this.setTemplate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateResponse.prototype.hasTemplate = function() {
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
proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest}
 */
proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest;
  return proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest}
 */
proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.DeleteTemplateRequest.prototype.setName = function(value) {
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
proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

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
 * @return {!proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse}
 */
proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse;
  return proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse}
 */
proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
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
proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeleteTemplateResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.repeatedFields_ = [4];



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
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    templateOwner: jspb.Message.getFieldWithDefault(msg, 2, ""),
    templateName: jspb.Message.getFieldWithDefault(msg, 3, ""),
    pluginVersionsList: jspb.Message.toObjectList(msg.getPluginVersionsList(),
    proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.toObject, includeInstance)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest;
  return proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.buf.alpha.registry.v1alpha1.PluginVersionMapping;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.deserializeBinaryFromReader);
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
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.serializeBinaryToWriter = function(message, writer) {
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
      proto.buf.alpha.registry.v1alpha1.PluginVersionMapping.serializeBinaryToWriter
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string template_owner = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.prototype.getTemplateOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.prototype.setTemplateOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string template_name = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.prototype.getTemplateName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.prototype.setTemplateName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * repeated PluginVersionMapping plugin_versions = 4;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping>}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.prototype.getPluginVersionsList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.PluginVersionMapping, 4));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest} returns this
*/
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.prototype.setPluginVersionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.PluginVersionMapping}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.prototype.addPluginVersions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.buf.alpha.registry.v1alpha1.PluginVersionMapping, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionRequest.prototype.clearPluginVersionsList = function() {
  return this.setPluginVersionsList([]);
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
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    templateVersion: (f = msg.getTemplateVersion()) && proto.buf.alpha.registry.v1alpha1.TemplateVersion.toObject(includeInstance, f)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse;
  return proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.TemplateVersion;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.TemplateVersion.deserializeBinaryFromReader);
      msg.setTemplateVersion(value);
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
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTemplateVersion();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.TemplateVersion.serializeBinaryToWriter
    );
  }
};


/**
 * optional TemplateVersion template_version = 1;
 * @return {?proto.buf.alpha.registry.v1alpha1.TemplateVersion}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse.prototype.getTemplateVersion = function() {
  return /** @type{?proto.buf.alpha.registry.v1alpha1.TemplateVersion} */ (
    jspb.Message.getWrapperField(this, proto.buf.alpha.registry.v1alpha1.TemplateVersion, 1));
};


/**
 * @param {?proto.buf.alpha.registry.v1alpha1.TemplateVersion|undefined} value
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse.prototype.setTemplateVersion = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse.prototype.clearTemplateVersion = function() {
  return this.setTemplateVersion(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.CreateTemplateVersionResponse.prototype.hasTemplateVersion = function() {
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
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    templateId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    userId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    templateRole: jspb.Message.getFieldWithDefault(msg, 3, 0)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest}
 */
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest;
  return proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest}
 */
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTemplateId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 3:
      var value = /** @type {!proto.buf.alpha.registry.v1alpha1.TemplateRole} */ (reader.readEnum());
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
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTemplateId();
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
  f = message.getTemplateRole();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * optional string template_id = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest.prototype.getTemplateId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest.prototype.setTemplateId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string user_id = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional TemplateRole template_role = 3;
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateRole}
 */
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest.prototype.getTemplateRole = function() {
  return /** @type {!proto.buf.alpha.registry.v1alpha1.TemplateRole} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.TemplateRole} value
 * @return {!proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorRequest.prototype.setTemplateRole = function(value) {
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
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

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
 * @return {!proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse}
 */
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse;
  return proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse}
 */
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
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
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.SetTemplateContributorResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    templateId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    pageSize: jspb.Message.getFieldWithDefault(msg, 2, 0),
    pageToken: jspb.Message.getFieldWithDefault(msg, 3, ""),
    reverse: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest;
  return proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTemplateId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPageSize(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setPageToken(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setReverse(value);
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
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTemplateId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPageSize();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getPageToken();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getReverse();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional string template_id = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest.prototype.getTemplateId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest.prototype.setTemplateId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint32 page_size = 2;
 * @return {number}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest.prototype.getPageSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest.prototype.setPageSize = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string page_token = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest.prototype.getPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest.prototype.setPageToken = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool reverse = 4;
 * @return {boolean}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest.prototype.getReverse = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsRequest.prototype.setReverse = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.repeatedFields_ = [1];



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
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    usersList: jspb.Message.toObjectList(msg.getUsersList(),
    proto.buf.alpha.registry.v1alpha1.TemplateContributor.toObject, includeInstance),
    nextPageToken: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse;
  return proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.buf.alpha.registry.v1alpha1.TemplateContributor;
      reader.readMessage(value,proto.buf.alpha.registry.v1alpha1.TemplateContributor.deserializeBinaryFromReader);
      msg.addUsers(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setNextPageToken(value);
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
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUsersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.buf.alpha.registry.v1alpha1.TemplateContributor.serializeBinaryToWriter
    );
  }
  f = message.getNextPageToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * repeated TemplateContributor users = 1;
 * @return {!Array<!proto.buf.alpha.registry.v1alpha1.TemplateContributor>}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.prototype.getUsersList = function() {
  return /** @type{!Array<!proto.buf.alpha.registry.v1alpha1.TemplateContributor>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.buf.alpha.registry.v1alpha1.TemplateContributor, 1));
};


/**
 * @param {!Array<!proto.buf.alpha.registry.v1alpha1.TemplateContributor>} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse} returns this
*/
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.prototype.setUsersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.alpha.registry.v1alpha1.TemplateContributor=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.alpha.registry.v1alpha1.TemplateContributor}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.prototype.addUsers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.alpha.registry.v1alpha1.TemplateContributor, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.prototype.clearUsersList = function() {
  return this.setUsersList([]);
};


/**
 * optional string next_page_token = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.prototype.getNextPageToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse} returns this
 */
proto.buf.alpha.registry.v1alpha1.ListTemplateContributorsResponse.prototype.setNextPageToken = function(value) {
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
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    owner: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    message: jspb.Message.getFieldWithDefault(msg, 3, "")
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
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest;
  return proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
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
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest.serializeBinaryToWriter = function(message, writer) {
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
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string owner = 1;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message = 3;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateRequest.prototype.setMessage = function(value) {
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
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

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
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse;
  return proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse}
 */
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
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
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.DeprecateTemplateResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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
proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest;
  return proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest.prototype.getOwner = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest.prototype.setOwner = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest} returns this
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateRequest.prototype.setName = function(value) {
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
proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

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
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse;
  return proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse}
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
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
proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.alpha.registry.v1alpha1.UndeprecateTemplateResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};


/**
 * @enum {number}
 */
proto.buf.alpha.registry.v1alpha1.PluginVisibility = {
  PLUGIN_VISIBILITY_UNSPECIFIED: 0,
  PLUGIN_VISIBILITY_PUBLIC: 1,
  PLUGIN_VISIBILITY_PRIVATE: 2
};

goog.object.extend(exports, proto.buf.alpha.registry.v1alpha1);

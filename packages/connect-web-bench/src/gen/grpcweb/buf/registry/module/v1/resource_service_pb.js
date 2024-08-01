// Copyright 2021-2024 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// source: buf/registry/module/v1/resource_service.proto
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
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

var buf_registry_module_v1_resource_pb = require('../../../../buf/registry/module/v1/resource_pb.js');
goog.object.extend(proto, buf_registry_module_v1_resource_pb);
var buf_validate_validate_pb = require('../../../../buf/validate/validate_pb.js');
goog.object.extend(proto, buf_validate_validate_pb);
goog.exportSymbol('proto.buf.registry.module.v1.GetResourcesRequest', null, global);
goog.exportSymbol('proto.buf.registry.module.v1.GetResourcesResponse', null, global);
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
proto.buf.registry.module.v1.GetResourcesRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.registry.module.v1.GetResourcesRequest.repeatedFields_, null);
};
goog.inherits(proto.buf.registry.module.v1.GetResourcesRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.registry.module.v1.GetResourcesRequest.displayName = 'proto.buf.registry.module.v1.GetResourcesRequest';
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
proto.buf.registry.module.v1.GetResourcesResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.buf.registry.module.v1.GetResourcesResponse.repeatedFields_, null);
};
goog.inherits(proto.buf.registry.module.v1.GetResourcesResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.buf.registry.module.v1.GetResourcesResponse.displayName = 'proto.buf.registry.module.v1.GetResourcesResponse';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.registry.module.v1.GetResourcesRequest.repeatedFields_ = [1];



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
proto.buf.registry.module.v1.GetResourcesRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.registry.module.v1.GetResourcesRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.registry.module.v1.GetResourcesRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.registry.module.v1.GetResourcesRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
resourceRefsList: jspb.Message.toObjectList(msg.getResourceRefsList(),
    buf_registry_module_v1_resource_pb.ResourceRef.toObject, includeInstance)
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
 * @return {!proto.buf.registry.module.v1.GetResourcesRequest}
 */
proto.buf.registry.module.v1.GetResourcesRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.registry.module.v1.GetResourcesRequest;
  return proto.buf.registry.module.v1.GetResourcesRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.registry.module.v1.GetResourcesRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.registry.module.v1.GetResourcesRequest}
 */
proto.buf.registry.module.v1.GetResourcesRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new buf_registry_module_v1_resource_pb.ResourceRef;
      reader.readMessage(value,buf_registry_module_v1_resource_pb.ResourceRef.deserializeBinaryFromReader);
      msg.addResourceRefs(value);
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
proto.buf.registry.module.v1.GetResourcesRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.registry.module.v1.GetResourcesRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.registry.module.v1.GetResourcesRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.registry.module.v1.GetResourcesRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getResourceRefsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      buf_registry_module_v1_resource_pb.ResourceRef.serializeBinaryToWriter
    );
  }
};


/**
 * repeated ResourceRef resource_refs = 1;
 * @return {!Array<!proto.buf.registry.module.v1.ResourceRef>}
 */
proto.buf.registry.module.v1.GetResourcesRequest.prototype.getResourceRefsList = function() {
  return /** @type{!Array<!proto.buf.registry.module.v1.ResourceRef>} */ (
    jspb.Message.getRepeatedWrapperField(this, buf_registry_module_v1_resource_pb.ResourceRef, 1));
};


/**
 * @param {!Array<!proto.buf.registry.module.v1.ResourceRef>} value
 * @return {!proto.buf.registry.module.v1.GetResourcesRequest} returns this
*/
proto.buf.registry.module.v1.GetResourcesRequest.prototype.setResourceRefsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.registry.module.v1.ResourceRef=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.registry.module.v1.ResourceRef}
 */
proto.buf.registry.module.v1.GetResourcesRequest.prototype.addResourceRefs = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.registry.module.v1.ResourceRef, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.registry.module.v1.GetResourcesRequest} returns this
 */
proto.buf.registry.module.v1.GetResourcesRequest.prototype.clearResourceRefsList = function() {
  return this.setResourceRefsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.buf.registry.module.v1.GetResourcesResponse.repeatedFields_ = [1];



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
proto.buf.registry.module.v1.GetResourcesResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.buf.registry.module.v1.GetResourcesResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.buf.registry.module.v1.GetResourcesResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.registry.module.v1.GetResourcesResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
resourcesList: jspb.Message.toObjectList(msg.getResourcesList(),
    buf_registry_module_v1_resource_pb.Resource.toObject, includeInstance)
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
 * @return {!proto.buf.registry.module.v1.GetResourcesResponse}
 */
proto.buf.registry.module.v1.GetResourcesResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.buf.registry.module.v1.GetResourcesResponse;
  return proto.buf.registry.module.v1.GetResourcesResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.buf.registry.module.v1.GetResourcesResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.buf.registry.module.v1.GetResourcesResponse}
 */
proto.buf.registry.module.v1.GetResourcesResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new buf_registry_module_v1_resource_pb.Resource;
      reader.readMessage(value,buf_registry_module_v1_resource_pb.Resource.deserializeBinaryFromReader);
      msg.addResources(value);
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
proto.buf.registry.module.v1.GetResourcesResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.buf.registry.module.v1.GetResourcesResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.buf.registry.module.v1.GetResourcesResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.buf.registry.module.v1.GetResourcesResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getResourcesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      buf_registry_module_v1_resource_pb.Resource.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Resource resources = 1;
 * @return {!Array<!proto.buf.registry.module.v1.Resource>}
 */
proto.buf.registry.module.v1.GetResourcesResponse.prototype.getResourcesList = function() {
  return /** @type{!Array<!proto.buf.registry.module.v1.Resource>} */ (
    jspb.Message.getRepeatedWrapperField(this, buf_registry_module_v1_resource_pb.Resource, 1));
};


/**
 * @param {!Array<!proto.buf.registry.module.v1.Resource>} value
 * @return {!proto.buf.registry.module.v1.GetResourcesResponse} returns this
*/
proto.buf.registry.module.v1.GetResourcesResponse.prototype.setResourcesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.buf.registry.module.v1.Resource=} opt_value
 * @param {number=} opt_index
 * @return {!proto.buf.registry.module.v1.Resource}
 */
proto.buf.registry.module.v1.GetResourcesResponse.prototype.addResources = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.buf.registry.module.v1.Resource, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.buf.registry.module.v1.GetResourcesResponse} returns this
 */
proto.buf.registry.module.v1.GetResourcesResponse.prototype.clearResourcesList = function() {
  return this.setResourcesList([]);
};


goog.object.extend(exports, proto.buf.registry.module.v1);
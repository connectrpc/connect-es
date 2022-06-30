// source: buf/alpha/rpc/v1alpha1/error.proto
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

goog.exportSymbol('proto.buf.alpha.rpc.v1alpha1.ErrorCode', null, global);
/**
 * @enum {number}
 */
proto.buf.alpha.rpc.v1alpha1.ErrorCode = {
  ERROR_CODE_UNSPECIFIED: 0,
  ERROR_CODE_CANCELLED: 1,
  ERROR_CODE_UNKNOWN: 2,
  ERROR_CODE_INVALID_ARGUMENT: 3,
  ERROR_CODE_DEADLINE_EXCEEDED: 4,
  ERROR_CODE_NOT_FOUND: 5,
  ERROR_CODE_ALREADY_EXISTS: 6,
  ERROR_CODE_PERMISSION_DENIED: 7,
  ERROR_CODE_RESOURCE_EXHAUSTED: 8,
  ERROR_CODE_FAILED_PRECONDITION: 9,
  ERROR_CODE_ABORTED: 10,
  ERROR_CODE_OUT_OF_RANGE: 11,
  ERROR_CODE_UNIMPLEMENTED: 12,
  ERROR_CODE_INTERNAL: 13,
  ERROR_CODE_UNAVAILABLE: 14,
  ERROR_CODE_DATA_LOSS: 15,
  ERROR_CODE_UNAUTHENTICATED: 16
};

goog.object.extend(exports, proto.buf.alpha.rpc.v1alpha1);

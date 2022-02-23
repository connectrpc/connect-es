import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';
import * as buf_alpha_audit_v1alpha1_envelope_pb from '../../../../buf/alpha/audit/v1alpha1/envelope_pb';


export class ListAuditLogsRequest extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): ListAuditLogsRequest;

  getPageToken(): string;
  setPageToken(value: string): ListAuditLogsRequest;

  getReverse(): boolean;
  setReverse(value: boolean): ListAuditLogsRequest;

  getStartTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setStartTime(value?: google_protobuf_timestamp_pb.Timestamp): ListAuditLogsRequest;
  hasStartTime(): boolean;
  clearStartTime(): ListAuditLogsRequest;

  getEndTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setEndTime(value?: google_protobuf_timestamp_pb.Timestamp): ListAuditLogsRequest;
  hasEndTime(): boolean;
  clearEndTime(): ListAuditLogsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListAuditLogsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListAuditLogsRequest): ListAuditLogsRequest.AsObject;
  static serializeBinaryToWriter(message: ListAuditLogsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListAuditLogsRequest;
  static deserializeBinaryFromReader(message: ListAuditLogsRequest, reader: jspb.BinaryReader): ListAuditLogsRequest;
}

export namespace ListAuditLogsRequest {
  export type AsObject = {
    pageSize: number,
    pageToken: string,
    reverse: boolean,
    startTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    endTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class ListAuditLogsResponse extends jspb.Message {
  getAuditLogsList(): Array<buf_alpha_audit_v1alpha1_envelope_pb.Event>;
  setAuditLogsList(value: Array<buf_alpha_audit_v1alpha1_envelope_pb.Event>): ListAuditLogsResponse;
  clearAuditLogsList(): ListAuditLogsResponse;
  addAuditLogs(value?: buf_alpha_audit_v1alpha1_envelope_pb.Event, index?: number): buf_alpha_audit_v1alpha1_envelope_pb.Event;

  getNextPageToken(): string;
  setNextPageToken(value: string): ListAuditLogsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListAuditLogsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListAuditLogsResponse): ListAuditLogsResponse.AsObject;
  static serializeBinaryToWriter(message: ListAuditLogsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListAuditLogsResponse;
  static deserializeBinaryFromReader(message: ListAuditLogsResponse, reader: jspb.BinaryReader): ListAuditLogsResponse;
}

export namespace ListAuditLogsResponse {
  export type AsObject = {
    auditLogsList: Array<buf_alpha_audit_v1alpha1_envelope_pb.Event.AsObject>,
    nextPageToken: string,
  }
}


import * as grpcWeb from 'grpc-web';

import * as buf_alpha_registry_v1alpha1_audit_logs_pb from '../../../../buf/alpha/registry/v1alpha1/audit_logs_pb';


export class AuditLogsServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  listAuditLogs(
    request: buf_alpha_registry_v1alpha1_audit_logs_pb.ListAuditLogsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: buf_alpha_registry_v1alpha1_audit_logs_pb.ListAuditLogsResponse) => void
  ): grpcWeb.ClientReadableStream<buf_alpha_registry_v1alpha1_audit_logs_pb.ListAuditLogsResponse>;

}

export class AuditLogsServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  listAuditLogs(
    request: buf_alpha_registry_v1alpha1_audit_logs_pb.ListAuditLogsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<buf_alpha_registry_v1alpha1_audit_logs_pb.ListAuditLogsResponse>;

}


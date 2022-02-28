import type {
  ClientResponse,
  ClientRequest,
  ClientCallOptions,
} from "./client-transport.js";
import type { MethodInfo, ServiceType } from "@bufbuild/protobuf";

export type ClientInterceptor = (
  service: ServiceType,
  method: MethodInfo,
  options: Readonly<ClientCallOptions>,
  request: ClientRequest,
  response: ClientResponse
) => [ClientRequest, ClientResponse];

export function chainClientInterceptors(
  service: ServiceType,
  method: MethodInfo,
  options: Readonly<ClientCallOptions>,
  request: ClientRequest,
  response: ClientResponse,
  chain: ClientInterceptor[]
): [ClientRequest, ClientResponse] {
  for (const interceptor of chain.concat().reverse()) {
    [request, response] = interceptor(
      service,
      method,
      options,
      { ...request },
      response
    );
  }
  return [request, response];
}

import type { MethodInfo, ServiceType } from "@bufbuild/protobuf";

/**
 * Create a URL for the given RPC. This simply joins the qualified
 * service name with the method name, separated by a slash. This format
 * is used by the protocols Connect, gRPC and Twirp.
 */
export function createMethodUrl(
  baseUrl: string | URL,
  service: ServiceType | string,
  method: MethodInfo | string
): URL {
  const s = typeof service == "string" ? service : service.typeName;
  const m = typeof method == "string" ? method : method.name;
  return new URL(`${s}/${m}`, baseUrl);
}

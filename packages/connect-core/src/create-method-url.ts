import type { MethodInfo, ServiceType } from "@bufbuild/protobuf";

/**
 * Create a URL for the given RPC. This simply adds the qualified
 * service name, a slash, and the method name to the path.
 * This format is used by the protocols Connect, gRPC and Twirp.
 */
export function createMethodUrl(
  baseUrl: string | URL,
  service: ServiceType | string,
  method: MethodInfo | string
): URL {
  const s = typeof service == "string" ? service : service.typeName;
  const m = typeof method == "string" ? method : method.name;
  return new URL(baseUrl.toString().replace(/\/?$/, `/${s}/${m}`));
}

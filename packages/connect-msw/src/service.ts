import type { ServiceType } from "@bufbuild/protobuf";
import { createConnectRouter } from "@connectrpc/connect";
import type { ServiceImpl } from "@connectrpc/connect";
import { createWorkerHandlers } from "./create-worker-handlers.js";
import type { Options } from "./create-worker-handlers.js";

import { RequestHandler } from "msw";

export function service<T extends ServiceType>(
  service: T,
  options: Options,
  impl: Partial<ServiceImpl<T>>
): RequestHandler[] {
  const router = createConnectRouter().service(service, impl);
  return createWorkerHandlers(router, options);
}

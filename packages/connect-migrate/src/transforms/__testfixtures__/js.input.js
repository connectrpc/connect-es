import { createPromiseClient } from "@bufbuild/connect";
import { createConnectTransport } from "@bufbuild/connect-web";
import { fastifyConnectPlugin } from "@bufbuild/connect-fastify";

export const createNewPromiseClient = createPromiseClient;

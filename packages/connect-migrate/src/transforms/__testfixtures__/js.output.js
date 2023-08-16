import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { fastifyConnectPlugin } from "@connectrpc/connect-fastify";

export const createNewPromiseClient = createPromiseClient;

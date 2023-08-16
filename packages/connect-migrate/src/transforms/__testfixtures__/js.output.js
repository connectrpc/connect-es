import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { x } from "@connectrpc/connect-fastify";

export const createNewPromiseClient = createPromiseClient;

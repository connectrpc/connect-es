import {
  makePromiseClient,
  createConnectTransport,
} from "@bufbuild/connect-web";
import { PluginService } from "./gen/connectweb/buf/alpha/registry/v1alpha1/plugin_connectweb.js";

const pluginClient = makePromiseClient(
  PluginService,
  createConnectTransport({
    baseUrl: "https://localhost",
  })
);

// eslint-disable-next-line no-console -- log statement makes sure the variable is in use
console.log(pluginClient);

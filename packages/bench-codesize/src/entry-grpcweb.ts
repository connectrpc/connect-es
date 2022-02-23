import { PluginServiceClient } from "./gen/grpcweb/buf/alpha/registry/v1alpha1/plugin_grpc_web_pb.js";

const pluginClient = new PluginServiceClient("localhost");

// eslint-disable-next-line no-console -- log statement makes sure the variable is in use
console.log(pluginClient);

import { TestService } from "./gen/grpc/testing/test_connectweb.js";
import { makeGrpcClient } from "./util/make-grpc-client.nodeonly.js";
import * as grpc from "@grpc/grpc-js";

describe("ff", function () {
  it("should ", function () {
    const grpcClient = makeGrpcClient(TestService, {
      address: "localhost:5002",
      channelCredentials: grpc.ChannelCredentials.createInsecure(),
      clientOptions: {},
      binaryOptions: {},
    });
    expect(grpcClient).toBeDefined();
  });
});

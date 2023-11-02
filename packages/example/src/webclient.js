const {ElizaServiceClient} = require("./gengrpcweb/eliza_grpc_web_pb.js");
const {IntroduceRequest} = require("./gengrpcweb/eliza_pb.js");

const client = new ElizaServiceClient("https://localhost:8443");
const stream = client.introduce(new IntroduceRequest().setName("X"));
stream.on("error", (e) => console.error("erorr", e));
stream.on("data", (data) => console.log(data.getSentence()));

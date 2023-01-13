# Code example

This directory contains a simple example for running a Connect-Web client with a Connect-Node server using [Express](https://expressjs.com/).

The application is a web interface for a stripped-down version of [ELIZA](https://en.wikipedia.org/wiki/ELIZA), a very
simple natural language processor built in the 1960s to represent a psychotherapist. 

You can find the protocol buffer schema [on the BSR](https://buf.build/bufbuild/eliza/tree/main:buf/connect/demo/eliza/v1/eliza.proto).

## Run the example

### Prerequisites

For this example, you will need [Node 18+](https://nodejs.org/en/download/) and [Buf](https://docs.buf.build/installation) installed.  

### Setup

First, download the source locally and install dependencies:

```shell
curl -L https://github.com/bufbuild/connect-web/archive/refs/heads/main.zip > connect-web-main.zip
unzip connect-web-main.zip 'connect-web-main/packages/example/*'

cd connect-web-main/packages/example
npm install
```

### Generate code

The next step is to generate our service definitions and message types from the Eliza Protobuf file mentioned above.

To use [`buf`](https://github.com/bufbuild/buf) to generate the code, simply run `npm run buf:generate` in this directory. 
The [`buf.gen.yaml` file](./buf.gen.yaml) contains the plugin configuration. 

Of course, you can use `protoc` as well if desired:

```bash
protoc -I . eliza.proto \
  --plugin=protoc-gen-es=../../node_modules/.bin/protoc-gen-es \
  --es_out src \
  --es_opt target=ts \
  --plugin=protoc-gen-connect-web=../../node_modules/.bin/protoc-gen-connect-web \
  --connect-web_out src \
  --connect-web_opt target=ts
```

### Start the server

Next, start the Connect-Node server:

```shell
npm run server
```

### Start the client

Finally, in another terminal window, start the client:

```shell
npm run client
```

That's it!  You should now be able to open a web browser to http://localhost:3000 and see the example running locally.

![Screenshot](README.png)

## More examples

To get started, head over to the [docs](https://connect.build/docs/web/getting-started)
for a tutorial on Connect-Web. You will also find API documentation and best practices there.
For using connect-web with your favorite framework, take a look at
[connect-web-integration](https://github.com/bufbuild/connect-web-integration).

Documentation for Connect-Node is coming soon!


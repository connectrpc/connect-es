# Code example

This directly contains a simple, framework-independent example for Connect-Web.
It is a web interface for [ELIZA](https://en.wikipedia.org/wiki/ELIZA), a very
simple natural language processor built in the 1960s to represent a 
psychotherapist. The ELIZA service is provided by us at [demo.connect.build](https://demo.connect.build). 

## Run the example

To run this example in your browser, [download the source](https://github.com/bufbuild/connect-web/archive/refs/heads/main.zip),
then run the following commands:

```shell
# in the project root:
cd packages/example
npm install
npm run start
```

![Screenshot](README.png)

## Generate code yourself

If you want to use [`buf`](https://github.com/bufbuild/buf) to generate the code, 
simply run `buf generate` in this directory. [`buf.gen.yaml`](./buf.gen.yaml) 
contains the plugin configuration. Of course you can use `protoc` as well:

```bash
protoc -I . eliza.proto \
  --plugin=protoc-gen-es=../../node_modules/.bin/protoc-gen-es \
  --es_out src \
  --es_opt target=ts \
  --plugin=protoc-gen-connect-web=../../node_modules/.bin/protoc-gen-connect-web \
  --connect-web_out src \
  --connect-web_opt target=ts
```

## More examples

Head over to the [docs](https://connect.build/docs/web/getting-started) for a 
tutorial, or take a look at [our examples](https://github.com/bufbuild/connect-web-integration)
for integration with various frameworks.

import {deflateRawSync, gzipSync, brotliCompressSync} from "zlib";
import {buildSync} from "esbuild";


const connectweb = gather("src/entry-connectweb.ts");
const grpcweb = gather("src/entry-grpcweb.ts");

process.stdout.write(`# Code size comparison

This is a simple code size comparison between Connect-Web and gRPC-web.

We are generating code for the module [buf.build/bufbuild/buf](https://buf.build/bufbuild/buf)
once with \`protoc-gen-grpc-web\`, once with \`protoc-gen-connect-web\`. Then we bundle a client 
for the service \`buf.alpha.registry.v1alpha1.PluginService\` with [esbuild](https://esbuild.github.io/),
minify the bundle, and compress it like a web server would usually do.
TESTING

| code generator                         | bundle size        | minified               | gzip               |
|----------------------------------------|-------------------:|-----------------------:|-------------------:|
| [connect-web](src/entry-connectweb.ts) | ${connectweb.size} | ${connectweb.minified} | ${connectweb.brotli} |
| [grpc-web](src/entry-grpcweb.ts)       | ${grpcweb.size}    | ${grpcweb.minified}    | ${grpcweb.brotli}    |
`);


function gather(entryPoint) {
    const bundle = build(entryPoint, false, "esm");
    const bundleMinified = build(entryPoint, true, "esm");
    const compressed = compress(bundleMinified);
    return {
        entryPoint,
        size: formatSize(bundle.byteLength),
        minified: formatSize(bundleMinified.byteLength),
        brotli: formatSize(compressed.brotli),
    };
}

function build(entryPoint, minify, format) {
    const result = buildSync({
        entryPoints: [entryPoint],
        bundle: true,
        format: format,
        treeShaking: true,
        minify: minify,
        write: false,
    });
    if (result.outputFiles.length !== 1) {
        throw new Error();
    }
    return result.outputFiles[0].contents;
}

function compress(buf) {
    const deflate = deflateRawSync(buf);
    const gzip = gzipSync(buf, {
        level: 7, // for mysterious reasons, the default (equivalent to 6) is unstable across node versions
    });
    const brotli = brotliCompressSync(buf);
    return {
        deflate: deflate.byteLength,
        gzip: gzip.byteLength,
        brotli: brotli.byteLength,
    };
}

function formatSize(bytes) {
    return new Intl.NumberFormat().format(bytes) + " b";
}

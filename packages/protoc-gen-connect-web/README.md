# @bufbuild/protoc-gen-connect-web

This package is deprecated.

The code generator `protoc-gen-connect-web` can now be used for Connect on the 
Web, and for Connect on Node.js.  
For a better fit, we have renamed it to `protoc-gen-connect-es` in 
[v0.8.0](https://github.com/bufbuild/connect-es/releases/tag/v0.8.0). 

The generated code is actually exactly the same, so it is not necessary to 
update right away, but we are not going to maintain this package anymore.

Switching to [@bufbuild/protoc-gen-connect-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-connect-es) 
is straight-forward:

```bash
npm remove @bufbuild/protoc-gen-connect-web
npm install @bufbuild/protoc-gen-connect-es
```

Update your `buf.gen.yaml`:

```diff
version: v1
plugins:
  - plugin: es
    out: src/gen
-  - plugin: connect-web
+  - plugin: connect-es
    out: src/gen
```

And your import paths:

```diff
- import { ElizaService } from "gen/eliza_connectweb";
+ import { ElizaService } from "gen/eliza_connect";
```


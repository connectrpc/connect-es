// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as http2 from "http2";
import * as http from "http";
import * as https from "https";
import {
  compressionGzip,
  createConnectHttp2Transport,
  createConnectHttpTransport,
  createGrpcWebHttp2Transport,
  createGrpcHttp2Transport,
  createGrpcHttpTransport,
  createGrpcWebHttpTransport,
  createHandlers,
  mergeHandlers,
  Transport,
} from "@bufbuild/connect-node";
import { TestService } from "../gen/grpc/testing/test_connectweb.js";
import { testService } from "./test-service-impl.js";

export function createTestServers() {
  // TODO http2 server with TLS and allow http1
  let nodeH2SecureServer: http2.Http2SecureServer | undefined;
  let nodeH2cServer: http2.Http2Server | undefined;
  let nodeHttpServer: http.Server | undefined;
  let nodeHttpsServer: http.Server | undefined;

  // openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout localhost-privkey.pem -out localhost-cert.pem
  const certLocalhost = {
    key: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDmkdOoHdbvOsh
zJ87KpSu4I3KOPuO/2msLNYDmiyivGc79Y5T064sCxet0J/jfpU/7t9A4ETNGBi0
/i4ZGa/kbR4uCQXnl2jroHuNFdfcnyBWjJLxaIN2WUm/RZvsjNSoWhkOjNjZZIsg
9nGv6iJLNVH7RZf0bAmklo+Al6bXnsPY+9k8Apy74zniGBchJsU5q8Mg4eX8ctVp
faWLg0LUCOZGQZoJPc1ZsxcMGOBN+7CIONq/VeiNB8ILyadF6A4Jywr9FkJzCz0k
r5uiXlYygsXSsMYTcScPy3Uqd3W9YKwhVaE8fsLa56+Gp08ifRnyUC9E0y56BpOQ
SEGis/J5AgMBAAECggEAYhMNBeN3dUv4KW5LuILVIgn9jhOcLkrqVSX1+MBo+P+2
U14ACw/sGLFHIiOkx5BEjVXcIs9QL/WRDc8UlglHJCWCKFrl1wUX2m0RBeCZ50jy
EfNSCjD5GXIThBAG6kiCqBbk0WLVp8q9570pq6ado1AM1wxB8I/rFddYBIYFZb6X
l3kr9ncGuRY3X3swVJvxsBu1FWVPKBbesHDeuJpUV8vdQges8rrVj+5iAB0yo0YS
HMOFfwDImfrO+GltfGenAcbQo+zfDJutsZmcE+1+pQNAXHeHIQ1GNX1xKSlg/39L
hlIVVNm8U2uYsrGR/eSHGT7ith8q2iyr3oRXq5oGAQKBgQD4mDnFYVnQBIij7Q88
saVtRetX69aCGdFxEAiLE95NM6GfmX6ecW/lbWxqN31PWn8x9Th6NkwkjrJgmOZ0
EEwiv/A2ABNCBXTJJVnkjU4eHA4IpWA9B9kd17mm1vypesLzqtPFcUXZC5/j4m8r
mUsb1gzlJSanjOL5E0CtmUfBaQKBgQDJbfAT61bVQP3HvdtjfWbObn1o/G9K+by7
JHQU4LdWhoF5vEX3ffDuKkI8KJjNbxJAKjBxd9GVKnbXf5lEjXp8fqFBiYL+fAae
xghLX2ekG80a6oDHLcapL5Cd4Rfu/+UXHz1dt/idq7GHaK5lKxiWY0RJfhzkN2ct
1MAbCIF2kQKBgQC8zHfLtQTN3DOeM9NHqC9YDysOqhlO06biNGgYoC1L+rN8D8o/
MS3nU7Rr8tqjorpJSdDr2EL53LoSbO1RJnN8TMN1b5cwpA4vGcPstXinm2z5Ggg+
MbCuXoEr+ckIOijHgGy3XjDLB24WV4lQ1mpZqLZAbXeu9mwG+J09etUpSQKBgBnR
TYRAFdEfk2eWnhgSaqrq3ogmUt15RQd3lKlYZCdi9hV0XENskQT1xaeQTIWIRv6S
acMhaGuGFdVpNWvj9l8em+yag3+6xd5z43xFrjMKnS9l/zuIUn486nxR7Y9knShp
iKQKgIM1Dnwcnr242F3uO0JwN6PItiDZtAXDAVUBAoGBAOPo/QSVGfZ1g9Lg9Xwf
k2Psk2MMymXmRycWbaQJkYpTsVI+3nlhZz69WmqekBFKyjs32jAggbo8U9Zy0UMx
J80BkIuZE10cAXiE2wEXoxbBPfXjMKwwf6h1Sm9XXVEHx01Cdtxl/llvTfEr7a9p
Rg9v50EVbOTB+3s/Hc0RszTt
-----END PRIVATE KEY-----
`,
    cert: `-----BEGIN CERTIFICATE-----
MIICpDCCAYwCCQC+zR6wDbTx9zANBgkqhkiG9w0BAQsFADAUMRIwEAYDVQQDDAls
b2NhbGhvc3QwHhcNMjMwMTAzMTkzODA1WhcNMjMwMjAyMTkzODA1WjAUMRIwEAYD
VQQDDAlsb2NhbGhvc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDD
mkdOoHdbvOshzJ87KpSu4I3KOPuO/2msLNYDmiyivGc79Y5T064sCxet0J/jfpU/
7t9A4ETNGBi0/i4ZGa/kbR4uCQXnl2jroHuNFdfcnyBWjJLxaIN2WUm/RZvsjNSo
WhkOjNjZZIsg9nGv6iJLNVH7RZf0bAmklo+Al6bXnsPY+9k8Apy74zniGBchJsU5
q8Mg4eX8ctVpfaWLg0LUCOZGQZoJPc1ZsxcMGOBN+7CIONq/VeiNB8ILyadF6A4J
ywr9FkJzCz0kr5uiXlYygsXSsMYTcScPy3Uqd3W9YKwhVaE8fsLa56+Gp08ifRny
UC9E0y56BpOQSEGis/J5AgMBAAEwDQYJKoZIhvcNAQELBQADggEBAIE5EdZOzde9
XqywKS3ms5FrBkajaR3K6XnyX6zAPK7/wBXvVmK7da6hMq5pYOQOIepdFs9FhX7l
vu6KTA/rJ4gkRz08UPFIIbUtqHYmWCTWEv4BSDneXPCwIYHjM3TmcW6XtaS+i01u
JKlZ0IwBc3rBSBMVf8Yo567W7JQebOe0LEOzGeYtFuAKPUSfTsPp2pyae/5ar5a6
Hikm1olkZ74i7Sfg3/gr/VNsh30IVGvW7q3NSznvWOB0Dx6jdchw2kgUeNEUfoyE
RMyjn6SZ8fxpOsqBOQLgaVgVeBTornOBI9BIV9sk/raT4ErG+H6GdCBhTK9QllSP
J4aliShXnxA=
-----END CERTIFICATE-----
`,
  };

  // The following servers are available through crosstests:
  //
  // | server        | port |
  // | ------------- | --- |
  // | connect-go h1 | 8080 |
  // | connect-go h2 | 8081 |
  // | grpc-go       | 8083 |
  //
  // Source: https://github.com/bufbuild/connect-web/pull/87
  const servers = {
    "connect-go (h1)": {
      getUrl() {
        return `https://localhost:8080`;
      },
      start() {
        return Promise.resolve();
      },
      stop() {
        return Promise.resolve();
      },
    },
    "connect-go (h2)": {
      getUrl() {
        return `https://localhost:8081`;
      },
      start() {
        return Promise.resolve();
      },
      stop() {
        return Promise.resolve();
      },
    },
    "grpc-go (h2)": {
      getUrl() {
        return `https://localhost:8083`;
      },
      start() {
        return Promise.resolve();
      },
      stop() {
        return Promise.resolve();
      },
    },
    "@bufbuild/connect-node (h2)": {
      getUrl() {
        const address = nodeH2SecureServer?.address();
        if (address == null || typeof address == "string") {
          throw new Error("cannot get server port");
        }
        return `https://localhost:${address.port}`;
      },
      start() {
        return new Promise<void>((resolve) => {
          nodeH2SecureServer = http2
            .createSecureServer(
              {
                allowHTTP1: true,
                cert: certLocalhost.cert,
                key: certLocalhost.key,
              },
              mergeHandlers(createHandlers(TestService, testService, {}))
            )
            .listen(0, resolve);
        });
      },
      stop() {
        return new Promise<void>((resolve, reject) => {
          if (!nodeH2SecureServer) {
            reject(new Error("http2Server not started"));
            return;
          }
          nodeH2SecureServer.close((err) => (err ? reject(err) : resolve()));
          // TODO this resolve is only there because we currently don't manage http2 sessions in the client, and the server doesn't shut down with an open connection
          resolve(); // the server.close() callback above slows down our tests
        });
      },
    },
    "@bufbuild/connect-node (h2c)": {
      getUrl() {
        const address = nodeH2cServer?.address();
        if (address == null || typeof address == "string") {
          throw new Error("cannot get server port");
        }
        return `http://localhost:${address.port}`;
      },
      start() {
        return new Promise<void>((resolve) => {
          nodeH2cServer = http2
            .createServer(
              {},
              mergeHandlers(createHandlers(TestService, testService, {}))
            )
            .listen(0, resolve);
        });
      },
      stop() {
        return new Promise<void>((resolve, reject) => {
          if (!nodeH2cServer) {
            reject(new Error("http2Server not started"));
            return;
          }
          nodeH2cServer.close((err) => (err ? reject(err) : resolve()));
          // TODO this resolve is only there because we currently don't manage http2 sessions in the client, and the server doesn't shut down with an open connection
          resolve(); // the server.close() callback above slows down our tests
        });
      },
    },
    "@bufbuild/connect-node (h1)": {
      getUrl() {
        const address = nodeHttpServer?.address();
        if (address == null || typeof address == "string") {
          throw new Error("cannot get server port");
        }
        return `http://localhost:${address.port}`;
      },
      start() {
        return new Promise<void>((resolve) => {
          nodeHttpServer = http
            .createServer(
              {},
              mergeHandlers(createHandlers(TestService, testService, {}))
            )
            .listen(0, resolve);
        });
      },
      stop() {
        return new Promise<void>((resolve, reject) => {
          if (!nodeHttpServer) {
            reject(new Error("httpServer not started"));
            return;
          }
          nodeHttpServer.close((err) => (err ? reject(err) : resolve()));
        });
      },
    },

    "@bufbuild/connect-node (h1 + tls)": {
      getUrl() {
        const address = nodeHttpsServer?.address();
        if (address == null || typeof address == "string") {
          throw new Error("cannot get server port");
        }
        return `https://localhost:${address.port}`;
      },
      start() {
        return new Promise<void>((resolve) => {
          nodeHttpsServer = https
            .createServer(
              {
                cert: certLocalhost.cert,
                key: certLocalhost.key,
              },
              mergeHandlers(createHandlers(TestService, testService, {}))
            )
            .listen(0, resolve);
        });
      },
      stop() {
        return new Promise<void>((resolve, reject) => {
          if (!nodeHttpsServer) {
            reject(new Error("https not started"));
            return;
          }
          nodeHttpsServer.close((err) => (err ? reject(err) : resolve()));
          resolve(); // the server.close() callback above slows down our tests
        });
      },
    },
  };

  const transports = {
    // TODO add http1.1 transports once implemented
    // gRPC
    "@bufbuild/connect-node (gRPC, binary, http2) against @bufbuild/connect-node (h2)":
      (options?: Record<string, unknown>) =>
        createGrpcHttp2Transport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2)"].getUrl(),
          useBinaryFormat: true,
          http2Options: {
            ca: certLocalhost.cert,
          },
        }),
    "@bufbuild/connect-node (gRPC, binary, http2) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcHttp2Transport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (gRPC, JSON, http2) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcHttp2Transport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          useBinaryFormat: false,
        }),
    "@bufbuild/connect-node (gRPC, binary, http2, gzip) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcHttp2Transport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC, JSON, http2, gzip) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcHttp2Transport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC, binary, http2) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcHttp2Transport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        http2Options: {
          rejectUnauthorized: false, // TODO set up cert for go server correctly
        },
        useBinaryFormat: true,
      }),
    "@bufbuild/connect-node (gRPC, binary, http2, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcHttp2Transport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          http2Options: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC, JSON, http2, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcHttp2Transport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          http2Options: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC, JSON, http2) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcHttp2Transport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        http2Options: {
          rejectUnauthorized: false, // TODO set up cert for go server correctly
        },
        useBinaryFormat: false,
      }),
    "@bufbuild/connect-node (gRPC, binary, http2) against grpc-go (h2)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcHttp2Transport({
        ...options,
        baseUrl: servers["grpc-go (h2)"].getUrl(),
        http2Options: {
          rejectUnauthorized: false, // TODO set up cert for go server correctly
        },
        useBinaryFormat: true,
      }),
    "@bufbuild/connect-node (gRPC, binary, http) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcHttpTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (gRPC, JSON, http) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcHttpTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          useBinaryFormat: false,
        }),
    "@bufbuild/connect-node (gRPC, JSON, https) against @bufbuild/connect-node (h1 + tls)":
      (options?: Record<string, unknown>) =>
        createGrpcHttpTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1 + tls)"].getUrl(),
          useBinaryFormat: false,
          httpOptions: {
            rejectUnauthorized: false,
          },
        }),
    "@bufbuild/connect-node (gRPC, binary, https) against @bufbuild/connect-node (h1 + tls)":
      (options?: Record<string, unknown>) =>
        createGrpcHttpTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1 + tls)"].getUrl(),
          useBinaryFormat: true,
          httpOptions: {
            rejectUnauthorized: false,
          },
        }),
    "@bufbuild/connect-node (gRPC, binary, https) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcHttpTransport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        useBinaryFormat: true,
        httpOptions: {
          rejectUnauthorized: false,
        },
      }),
    "@bufbuild/connect-node (gRPC, JSON, https) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcHttpTransport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        useBinaryFormat: false,
        httpOptions: {
          rejectUnauthorized: false,
        },
      }),
    "@bufbuild/connect-node (gRPC, binary, http, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcHttpTransport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          useBinaryFormat: true,
          sendCompression: compressionGzip,
          httpOptions: {
            rejectUnauthorized: false,
          },
        }),
    "@bufbuild/connect-node (gRPC, JSON, http, gzip) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcHttpTransport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        useBinaryFormat: false,
        sendCompression: compressionGzip,
        httpOptions: {
          rejectUnauthorized: false,
        },
      }),
    "@bufbuild/connect-node (gRPC, binary, http, gzip) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcHttpTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC, JSON, http, gzip) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcHttpTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    // Connect
    "@bufbuild/connect-node (Connect, binary, http2, gzip) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createConnectHttp2Transport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (Connect, binary, http2, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createConnectHttp2Transport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          http2Options: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (Connect, JSON, http2, gzip) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createConnectHttp2Transport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (Connect, JSON, http2, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createConnectHttp2Transport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          http2Options: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (Connect, JSON, http) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createConnectHttpTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          useBinaryFormat: false,
        }),
    "@bufbuild/connect-node (Connect, binary, http) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createConnectHttpTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (Connect, binary, https) against @bufbuild/connect-node (h1 + tls)":
      (options?: Record<string, unknown>) =>
        createConnectHttpTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1 + tls)"].getUrl(),
          useBinaryFormat: true,
          httpOptions: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
        }),
    "@bufbuild/connect-node (Connect, JSON, https) against @bufbuild/connect-node (h1 + tls)":
      (options?: Record<string, unknown>) =>
        createConnectHttpTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1 + tls)"].getUrl(),
          useBinaryFormat: false,
          httpOptions: {
            rejectUnauthorized: false,
          },
        }),
    "@bufbuild/connect-node (Connect, binary, http) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createConnectHttpTransport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        useBinaryFormat: true,
        httpOptions: {
          rejectUnauthorized: false, // TODO set up cert for go server correctly
        },
      }),
    "@bufbuild/connect-node (Connect, JSON, http) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createConnectHttpTransport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        useBinaryFormat: false,
        httpOptions: {
          rejectUnauthorized: false, // TODO set up cert for go server correctly
        },
      }),
    "@bufbuild/connect-node (Connect, binary, http, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createConnectHttpTransport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          useBinaryFormat: true,
          httpOptions: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (Connect, JSON, http, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createConnectHttpTransport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          useBinaryFormat: false,
          httpOptions: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (Connect, JSON, http, gzip) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createConnectHttpTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          useBinaryFormat: false,
          httpOptions: {
            rejectUnauthorized: false,
          },
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (Connect, binary, http, gzip) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createConnectHttpTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          useBinaryFormat: true,
          httpOptions: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          sendCompression: compressionGzip,
        }),
    //gRPC-web
    "@bufbuild/connect-node (gRPC-web, binary, http2) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttp2Transport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http2) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttp2Transport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          useBinaryFormat: false,
        }),
    "@bufbuild/connect-node (gRPC-web, binary, http2) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttp2Transport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          http2Options: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (gRPC-web, binary, http2, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttp2Transport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          http2Options: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http2, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttp2Transport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          http2Options: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC-web, binary, http2, gzip) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttp2Transport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          http2Options: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: true,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http2, gzip) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttp2Transport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
          http2Options: {
            rejectUnauthorized: false, // TODO set up cert for go server correctly
          },
          useBinaryFormat: false,
          sendCompression: compressionGzip,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http2) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcWebHttp2Transport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        http2Options: {
          rejectUnauthorized: false, // TODO set up cert for go server correctly
        },
        useBinaryFormat: false,
      }),
    "@bufbuild/connect-node (gRPC-web, binary, http) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttpTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          useBinaryFormat: true,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttpTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          useBinaryFormat: false,
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, https) against @bufbuild/connect-node (h1 + tls)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttpTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          useBinaryFormat: false,
          httpOptions: {
            rejectUnauthorized: false,
          },
        }),
    "@bufbuild/connect-node (gRPC-web, binary, https) against @bufbuild/connect-node (h1 + tls)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttpTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          useBinaryFormat: true,
          httpOptions: {
            rejectUnauthorized: false,
          },
        }),
    "@bufbuild/connect-node (gRPC-web, binary, https) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttpTransport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          useBinaryFormat: true,
          httpOptions: {
            rejectUnauthorized: false,
          },
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, https) against connect-go (h1)": (
      options?: Record<string, unknown>
    ) =>
      createGrpcWebHttpTransport({
        ...options,
        baseUrl: servers["connect-go (h1)"].getUrl(),
        useBinaryFormat: false,
        httpOptions: {
          rejectUnauthorized: false,
        },
      }),
    "@bufbuild/connect-node (gRPC-web, JSON, http, gzip) against connect-go (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttpTransport({
          ...options,
          baseUrl: servers["connect-go (h1)"].getUrl(),
          useBinaryFormat: false,
          sendCompression: compressionGzip,
          httpOptions: {
            rejectUnauthorized: false,
          },
        }),
    "@bufbuild/connect-node (gRPC-web, binary, http, gzip) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttpTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          useBinaryFormat: true,
          sendCompression: compressionGzip,
          httpOptions: {
            rejectUnauthorized: false,
          },
        }),
    "@bufbuild/connect-node (gRPC-web, JSON, http, gzip) against @bufbuild/connect-node (h1)":
      (options?: Record<string, unknown>) =>
        createGrpcWebHttpTransport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h1)"].getUrl(),
          useBinaryFormat: false,
          sendCompression: compressionGzip,
          httpOptions: {
            rejectUnauthorized: false,
          },
        }),
  } as const;

  return {
    servers,
    transports,
    start(): Promise<void> {
      return Promise.all(Object.values(servers).map((s) => s.start())).then();
    },
    stop(): Promise<void> {
      return Promise.all(Object.values(servers).map((s) => s.stop())).then();
    },
    describeTransports(
      specDefinitions: (
        transport: () => Transport,
        transportName: keyof typeof transports
      ) => void
    ) {
      for (const [name, transportFactory] of Object.entries(transports)) {
        describe(name, () => {
          specDefinitions(transportFactory, name as keyof typeof transports);
        });
      }
    },
    describeTransportsExcluding(
      exclude: Array<keyof typeof transports>,
      specDefinitions: (
        transport: () => Transport,
        transportName: keyof typeof transports
      ) => void
    ) {
      for (const [name, transportFactory] of Object.entries(transports)) {
        if (exclude.includes(name as keyof typeof transports)) {
          continue;
        }
        describe(name, () => {
          specDefinitions(transportFactory, name as keyof typeof transports);
        });
      }
    },
    describeTransportsOnly(
      only: Array<keyof typeof transports>,
      specDefinitions: (
        transport: () => Transport,
        transportName: keyof typeof transports
      ) => void
    ) {
      for (const [name, transportFactory] of Object.entries(transports)) {
        if (only.includes(name as keyof typeof transports)) {
          describe(name, () => {
            specDefinitions(transportFactory, name as keyof typeof transports);
          });
        }
      }
    },
    describeServers(
      only: Array<keyof typeof servers>,
      specDefinitions: (
        server: typeof servers[keyof typeof servers],
        serverName: keyof typeof servers
      ) => void
    ) {
      for (const [name, server] of Object.entries(servers)) {
        if (only.includes(name as keyof typeof servers)) {
          describe(name, () => {
            specDefinitions(server, name as keyof typeof servers);
          });
        }
      }
    },
  };
}

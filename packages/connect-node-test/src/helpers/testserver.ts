// Copyright 2021-2022 Buf Technologies, Inc.
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
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDTzbyj/B3AMygL
SbnHs/T+SYzIdn0yMo3O7BHHqsBSQkGJ/fc9nujbtBd0TeNGnDCvhiyvXGCGwoA0
+foTFm5MzhogYZwpGmBunAd3SoARmsQ+7xBaNj0LdArcCKi1oWszhU3Jo/GWJ1r9
yjHszouCg8d2qRgmBKYG4LF+QyzLFns5enoOR8k0zQhIxVmPkm1dnEpSmpxOgy9T
iLkYxguCadgIzefpKqntOX9RkJYi7vI3pEAngp0DYDDaWjAC7JzBr41WNqvw1ldm
4xvmm1oTGrES090/NFTIc7JNv5DnmH87MAa9syuU1QJ+Ho9aMQVwn1tFQeVj996V
3lryzza1AgMBAAECggEAbpH4Cc+jJGRQYlwxrUyH+HwjD7+zqhH0L/LTcV31mrvW
BRjdCoE75P5GREQpAwKk8+zixQU/qvo8/esGHxLVsCjkQMVURazsbLHtv9vXsdkO
3B/ndIDeK22AAdBPasqC8VmE+2AnzZBsExOMLqjA8fijl5G89pP0rKB+aIDfEIGP
Teunp/FBrflImwegJFLb5p/Uj/szFhJJLMy1ByqWYKlw/hSUEyd+bnpKn1Pcv/vQ
N0OPZDemEMQrgQIxcLvKte8ybapm6xldIaQjPmhBoEnn7ksyCNoBdkFIZmG0y6xs
Tsd0CONivLyZ4ZCo3dWGETHo+Ogj0ShKcTuRqGGdYQKBgQD5a+udU/8vpVeNtvPg
SvhELReE5MvqwRSDnO1cCDP973CavOk/wmFkrIbs5ZnWEoivvUNfM1O+CRow01Hl
dsycctZ60Z7BqoBjTwxC8Gf3sU3JXE/w0qJMkgApPIIDqizJXBsK/EX1qIlTsglf
mBqX8NE/Ean6wPf086KK/08n6QKBgQDZY9KY6LLLeYNNW5cw4d7AalppQq4KDcrc
efJk6jP0wK+N07v+3l2wkUWFTsVXrSWaAhdCuOnjLBckd1FNa9Qh6Bkz0uCBnsji
Lg2JyPFOR6UcghtQsnyo3F0NkCiN7OwHUTrWxjos0Ny0Zn7tMJgheKbobHt4UuQM
+EZ19Yak7QKBgE+HsuRCoU7u+MDuQksVfJ44hpRQZBkhocnpouHCl9lznMMqU3GK
KIXyYT9uYqQY2s62maHkeuJQgrJo32c8fzevgmY9KtLz6+Y+kVlS0MPxHC2FqtPO
RgQGVdjQO2CxxYAbR2A0WpZfPBKc5VI+7NPf7MigeEPFfgr0GLMbf4DpAoGBAI8I
6Dtl+KZ66FLQ7dTi+P6fu6dAkWTaGF0i+8M8ej0TPy9RXoPe6cRQgW6qGpyKt4/y
yj1Dj9jCXOPIgj0vsp8wqMx5dvCyejif1paPGX7JEzGDxdc96VntzGgtLxHbDp3t
64n/Wa29K0qjmeYUsDRtv1x0bHUKDTUfcrUQfKwtAoGBAOiKdYLuPGB6eV8lgnlK
+qUTNDyDAT/ZX/0BAoPPuglAI4fd6kBHY5AdnlT2aEewkgaS0mqiPRGkL8uwKmdQ
mSUY3aAJ51Yn2IhfNCWRJyxbjPyoNoCJGbpQqW1tXNvV2zvT1QtDMrHi/2eLfysW
eny6TtdUBIsngV//KbYrTABi
-----END PRIVATE KEY-----
`,
    cert: `-----BEGIN CERTIFICATE-----
MIICpDCCAYwCCQDWU4MUt2KG2DANBgkqhkiG9w0BAQsFADAUMRIwEAYDVQQDDAls
b2NhbGhvc3QwHhcNMjIxMTI0MjIwNDQ0WhcNMjIxMjI0MjIwNDQ0WjAUMRIwEAYD
VQQDDAlsb2NhbGhvc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDT
zbyj/B3AMygLSbnHs/T+SYzIdn0yMo3O7BHHqsBSQkGJ/fc9nujbtBd0TeNGnDCv
hiyvXGCGwoA0+foTFm5MzhogYZwpGmBunAd3SoARmsQ+7xBaNj0LdArcCKi1oWsz
hU3Jo/GWJ1r9yjHszouCg8d2qRgmBKYG4LF+QyzLFns5enoOR8k0zQhIxVmPkm1d
nEpSmpxOgy9TiLkYxguCadgIzefpKqntOX9RkJYi7vI3pEAngp0DYDDaWjAC7JzB
r41WNqvw1ldm4xvmm1oTGrES090/NFTIc7JNv5DnmH87MAa9syuU1QJ+Ho9aMQVw
n1tFQeVj996V3lryzza1AgMBAAEwDQYJKoZIhvcNAQELBQADggEBAJXdbfZNMVXx
cqIHOCfgr2nHOir383E2jwnrmlj1BXtaw++SiHwbqFkEhuLu0PPy65e26mhDFH3L
3+AlIT6vozna1vaHctQwtCz4XAFqt6B8CLQk1qdq1LSD+y8agSbvHCHZjivl1K37
eg2LYOrreTfhSEMBuHuvSc18CA0VBH5A4YL5HlKaxdMlTpUq8wA3Hr/wAcyUfabt
UTKCiG3QXKmdlVV1xgmw0aYQGaFY/h7bzJmFIQ8yhtLQWT1zKKLNmDl1ZcBOKYtc
TXWfm6G6gP8vMBfICXjzI8+MeNF5+CbMyRKDGIejsova7dCKI5WMRykCp64cmnKC
vKy9wyvtUtg=
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
          resolve();
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
          resolve();
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
          resolve();
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
    // Connect
    "@bufbuild/connect-node (Connect, binary, http2, gzip) against @bufbuild/connect-node (h2c)":
      (options?: Record<string, unknown>) =>
        createConnectHttp2Transport({
          ...options,
          baseUrl: servers["@bufbuild/connect-node (h2c)"].getUrl(),
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

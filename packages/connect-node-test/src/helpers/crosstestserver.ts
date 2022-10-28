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

import type { Transport } from "@bufbuild/connect-core";
import { createGrpcTransport } from "@bufbuild/connect-node";
import * as tls from "tls";
import * as grpc from "@grpc/grpc-js";

// The following servers are available through crosstests:
//
// | server        | port |
// | ------------- | --- |
// | connect-go h1 | 8080 |
// | connect-go h2 | 8081 |
// | grpc-go       | 8083 |
//
// Source: // https://github.com/bufbuild/connect-web/pull/87
export const baseUrl = "https://127.0.0.1:8080";

export const crosstestTransports: Record<
  string,
  (options?: Record<string, unknown>) => Transport
> = {
  // TODO
  // "gRPC-web transport": (options) =>
  //   createGrpcWebTransport({
  //     ...options,
  //     baseUrl,
  //   }),
  "gRPC transport": (options) =>
    createGrpcTransport({
      ...options,
      address: baseUrl.substring("https://".length),
      channelCredentials: grpc.ChannelCredentials.createFromSecureContext(
        tls.createSecureContext({
          cert: clientCert,
          key: clientKey,
        })
      ),
    }),
};

// https://github.com/bufbuild/connect-crosstest/blob/main/cert/client.crt
export const clientCert = `-----BEGIN CERTIFICATE-----
MIIEODCCAiCgAwIBAgIRAJTCeo42f8lts3VeDnN7CVwwDQYJKoZIhvcNAQELBQAw
FjEUMBIGA1UEAxMLQ3Jvc3N0ZXN0Q0EwHhcNMjIwNTAzMTcxMDQwWhcNMjMxMTAz
MTcxOTU2WjARMQ8wDQYDVQQDEwZjbGllbnQwggEiMA0GCSqGSIb3DQEBAQUAA4IB
DwAwggEKAoIBAQCoJI6BDesWPERm7zjLGA9Pp0XSR3rnpecXTKIBwamr35gr/It4
jAZMMBUBHhdvLB0pAj1/hlWLvDQSuQBvfsr2KrqOvtVOP0c5KCzwHjvLmyhhvjOV
5iEdtv5mUDwILcQH8mvK4XTyWqIDvslUs3KxWfuwrPHZE+qptVAE982pbYixQTTG
ynRKi+tlFqb0a070koKu5jj+x2TV6Kgh4SFmexHdBSYWiElUGAks2MJ09CT5+Dva
z4lePGlA6VlDIjwif/lziHASBvW+6J4ZpLyAeCc+1/DgI74Gmpy2oNGmb2LBMwrM
OZL5KsdiMyYY9ZjPmKWcxybjgGPfinbctOldAgMBAAGjgYUwgYIwDgYDVR0PAQH/
BAQDAgO4MB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAdBgNVHQ4EFgQU
kjyFVJG7YocJyghCFYWHEDdWrv0wHwYDVR0jBBgwFoAUpg6MnxjPVlc2QEjDWcAC
0qxir5IwEQYDVR0RBAowCIIGY2xpZW50MA0GCSqGSIb3DQEBCwUAA4ICAQAgqAI9
/yUVAyf3UoSYaZrA22/OPUwvoHoQOSWZDkHXIy9VOiQAJNE8N97XzIIgbjB93sVC
njwOUk+kXEfmPZuD8RdAR43m1s+WrKCMukAIyg7hobLHqolkUPCdKlsaXgUsNsX1
T5ka1imVaIyggXWBVu3Q3Wpt8ERl82ncBr65wzRnvAdsGOFag4ujamSAU8s/Mhfy
EXNkx9u4MqvfWqhU7e5uBULfic+e836ojDxa5If7/MZo892lCQq6t861e5SOHhRN
AtS7toBmR/h5vYGDqmIwGGaR6YqcIMZ9JbWyPRbr2KIiMDGU7EvVYpIuIKdodbkJ
aN9RTmaCJTJVHrwMos9sAjwUqis+5gZj7lsPozp7OKYlFwy5Ae4+3C8e8Q1sIzKv
FaiodJ712fK6xsYr8CbUm4XbP3FBCAiYwbbaJg6odOciexpyvFnbF7152t+a6wOc
52z4pz7cCjZun40eDxmSucRGx5Do1ohFNrXxriGih0nFF82GCSCZZ3ddkSTIy/Uj
15MCKRXIOq/0kFDtMIJZ6X73I6jLvk0hiakfrV+GyrVBkzG1pHJEsSyiy7f1edTG
FjL/opqnz8GV8od9hLHJfwclPBSEA0fp7yNvOzKm1lNPEX009ME1hK4dLKNCqv3x
g+mJcflVCfjEqJzfEy4wPq5SJzOIzXva6DyBpA==
-----END CERTIFICATE-----`;

// https://github.com/bufbuild/connect-crosstest/blob/main/cert/client.key
export const clientKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAqCSOgQ3rFjxEZu84yxgPT6dF0kd656XnF0yiAcGpq9+YK/yL
eIwGTDAVAR4XbywdKQI9f4ZVi7w0ErkAb37K9iq6jr7VTj9HOSgs8B47y5soYb4z
leYhHbb+ZlA8CC3EB/JryuF08lqiA77JVLNysVn7sKzx2RPqqbVQBPfNqW2IsUE0
xsp0SovrZRam9GtO9JKCruY4/sdk1eioIeEhZnsR3QUmFohJVBgJLNjCdPQk+fg7
2s+JXjxpQOlZQyI8In/5c4hwEgb1vuieGaS8gHgnPtfw4CO+BpqctqDRpm9iwTMK
zDmS+SrHYjMmGPWYz5ilnMcm44Bj34p23LTpXQIDAQABAoIBAFaTpDC9SuwDEjFy
QesJM3EPLztsBNPcL9ZmZhDDeCsAkWksu1/RsbhvFZGivexHaahg9+t+7vNpb+Ko
EZpXTghczfyMNGb63CCJGEJ3PtDCzpMtjYBEo46aV/m0nISVlBeHcotfdYkIs917
0kzjrU22iItbMZhV0gGaU16LfgEbiJpMS7nmVKnmLEs02g4G3H+xKXRfRhQA7RId
OIa/iHkJsNQ+o4MiJ7s4G1hp3zqZBSnHuPM3qqj+MAUHobeJKdB7WCW5UWXI9OmA
ryRSk+R6KDDoXxyWZc0FQ5BJ0OhwMzBsxgqs54CDWND/PLjmsvOjvdhMqpKRy2Am
oMXk0J0CgYEA0Mkbhh/M7nEeGwKM8MxovSEE0u0j2ksbgt9Wx2aCfiP6GWxLZZuj
o1aV7TgEn7M70qyeTs9B/fWVzk+tO0yN0S07VxlaY5RMV44LdHnQ85TeTEIxQIAa
ZYq3kFdfim9ZVzouZHK4mCqYoKpKQyx0sEjbfm9+tdPbs/x5xzVa5EcCgYEAziqU
zmopsZM4CnCnqvuKK8GH7WwDZXd7SrMOm2qBuvZxNQZsNNsTLR9SV23YA9yYrkmk
dqdVRS9WX1HjFgbSrQ19b4nk7GZ3d1pjCIZ0BW+WVI6ZkINRCniCsK/2fakCRyas
HTF+eZIre7SIjM2SKxQU7EbG1J1Mt3Vh3ilSyzsCgYEAuw1iDmERPhK0ESjQ0q+f
qsoZQ0vYEiu2IyMq4QyzHoXm/L3sMsUk7yKUwemtItL2ZsHmNt8y1W8f3q29muH0
MJKglmENfSeQ2eRV2O2GSaR3IMUw0QO0IoMMAFJ3M1SdKyviAnZRcWrAQTkvvUzn
4kPz+iuzzv1W2cL564KewuMCgYEAuNDXQQtOgQ+Wh1ViGRcRUBRXw/C2QrmPXvGR
QKWD0pSl+4Dcc62ITUTszc98fEm+3U7LDksHV9QNu7lutwo6xkN3lQuqmnlo0yfF
65iMXWsg+oAzDaeKeLZ7geTcNN3TWvFCDZGW7WipbmXymzaVt+RytTTlfSfd5ABo
UX396I0CgYASYF3TgzFVGkQK/lVlTOFaWAf0IZ3qwVfCWlezi4GVDHc+eZ27n8rE
UPFHgEHm9ID0jun/4FQsUkkWQpvfl2H51R4UtFVePXSiKq7D/KNamSUYY3Kvyf0a
5tmRR33Swjjp3fVRuFtiNVgfTA3OLa2quAqbRzxMsGYAUfeQtCb98g==
-----END RSA PRIVATE KEY-----`;

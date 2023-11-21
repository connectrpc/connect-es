import * as forge from "node-forge";
import { Integer } from "asn1js";

export function createCert() {
  const keys = forge.pki.rsa.generateKeyPair(2048);
  const cert = forge.pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.serialNumber = new Integer({
    value: Math.floor(Math.random() * Number.MIN_SAFE_INTEGER),
  }).toString("hex");
  cert.setSubject([
    {
      name: "organizationName",
      value: "ConnectRPC",
    },
    {
      name: "commonName",
      value: "Conformance Server",
    },
  ]);
  const now = new Date();
  const notBefore = new Date();
  notBefore.setDate(now.getDate() - 1);
  const notAfter = new Date();
  notAfter.setDate(now.getDate() + 7);
  cert.validity.notBefore = notBefore;
  cert.validity.notAfter = notAfter;
  cert.setExtensions([
    {
      name: "basicConstraints",
      cA: true,
    },
    {
      name: "keyUsage",
      digitalSignature: true,
      keyEncipherment: true,
    },
    {
      name: "extKeyUsage",
      serverAuth: true,
    },
    {
      name: "subjectAltName",
      altNames: [
        {
          type: 2, // DNS
          value: "localhost",
        },
        {
          type: 7, // IP
          ip: "127.0.0.1",
        },
        {
          type: 7, // IP
          ip: "::1",
        },
      ],
    },
  ]);
  cert.sign(keys.privateKey, forge.md.sha256.create());
  return {
    cert: forge.pki.certificateToPem(cert),
    key: forge.pki.privateKeyToPem(keys.privateKey),
  };
}

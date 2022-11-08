/**
 * Parse a gRPC-web trailer, a set of header fields separated by CRLF.
 */
export function grpcWebTrailerParse(data: Uint8Array): Headers {
  const headers = new Headers();
  const lines = new TextDecoder().decode(data).split("\r\n");
  for (const line of lines) {
    if (line === "") {
      continue;
    }
    const i = line.indexOf(":");
    if (i > 0) {
      const name = line.substring(0, i).trim();
      const value = line.substring(i + 1).trim();
      headers.append(name, value);
    }
  }
  return headers;
}

/**
 * Serialize a Headers object as a gRPC-web trailer.
 */
export function grpcWebTrailerSerialize(trailer: Headers): Uint8Array {
  const lines: string[] = [];
  trailer.forEach((value, key) => {
    lines.push(`${key}: ${value}\r\n`);
  });
  return new TextEncoder().encode(lines.join(""));
}

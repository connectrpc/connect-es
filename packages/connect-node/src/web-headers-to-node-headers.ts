import type * as http from "http";
import type * as http2 from "http2";

export function nodeHeaderToWebHeader(
  nodeHeaders:
    | http.OutgoingHttpHeaders
    | http.IncomingHttpHeaders
    | http2.IncomingHttpHeaders
): Headers {
  const header = new Headers();
  for (const [k, v] of Object.entries(nodeHeaders)) {
    if (k.startsWith(":")) {
      continue;
    }
    if (v === undefined) {
      continue;
    }
    if (typeof v == "string") {
      header.append(k, v);
    } else if (typeof v == "number") {
      header.append(k, String(v));
    } else {
      for (const e of v) {
        header.append(k, e);
      }
    }
  }
  return header;
}

export function webHeadersToNodeHeaders(
  headersInit: HeadersInit
): http.OutgoingHttpHeaders {
  const o = Object.create(null) as http.OutgoingHttpHeaders;
  if (Array.isArray(headersInit)) {
    for (const [key, value] of headersInit) {
      const k = key.toLowerCase();
      o[k] = value;
    }
  } else if ("forEach" in headersInit) {
    if (typeof headersInit.forEach == "function") {
      headersInit.forEach((value, key) => {
        const k = key.toLowerCase();
        o[k] = value;
      });
    }
  } else {
    for (const [key, value] of Object.entries<string>(headersInit)) {
      const k = key.toLowerCase();
      o[k] = value;
    }
  }
  return o;
}

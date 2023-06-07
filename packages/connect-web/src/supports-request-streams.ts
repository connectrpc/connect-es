// Feature detection function taken from https://developer.chrome.com/articles/fetch-streaming-requests/
export function supportsRequestStreams() {
  let duplexAccessed = false;

  const hasContentType = new Request("", {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      duplexAccessed = true;
      return "half";
    },
  } as any).headers.has("Content-Type");

  return duplexAccessed && !hasContentType;
}

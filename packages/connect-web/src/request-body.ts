// Copyright 2021-2026 The Connect Authors
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

import type {
  DescMessage,
  DescMethodStreaming,
  MessageShape,
} from "@bufbuild/protobuf";
import { Code, ConnectError } from "@connectrpc/connect";
import { encodeEnvelope } from "@connectrpc/connect/protocol";

/**
 * The request body for a streaming call, and the fetch option that must
 * accompany it.
 */
export interface StreamingRequestBody {
  body: BodyInit;
  /**
   * The fetch API requires this option when the body is a ReadableStream.
   * Only half-duplex is supported: the response does not become available
   * until the request body has been sent completely.
   */
  duplex?: "half";
}

/**
 * Creates the request body for a streaming call.
 *
 * For server-streaming methods, the single request message is enveloped and
 * sent as a byte array.
 *
 * For client-streaming and bidi-streaming methods, the request messages are
 * enveloped and sent as a ReadableStream. This requires support for streaming
 * request bodies in the fetch API, which is available in Chromium-based
 * browsers over HTTP/2 and HTTP/3, and in Node.js. Firefox and Safari do not
 * support streaming request bodies at the time of writing. If support is
 * missing, a ConnectError with Code.Unimplemented is raised.
 */
export async function createStreamingRequestBody<
  I extends DescMessage,
  O extends DescMessage,
>(
  method: DescMethodStreaming<I, O>,
  input: AsyncIterable<MessageShape<I>>,
  serialize: (message: MessageShape<I>) => Uint8Array,
): Promise<StreamingRequestBody> {
  const it = input[Symbol.asyncIterator]();
  if (method.methodKind == "server_streaming") {
    const r = await it.next();
    if (r.done == true) {
      throw "missing request message";
    }
    return { body: encodeEnvelope(0, serialize(r.value)) };
  }
  if (!supportsRequestStreams()) {
    throw new ConnectError(
      "The fetch API does not support streaming request bodies in this environment",
      Code.Unimplemented,
    );
  }
  const body = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const r = await it.next();
      if (r.done == true) {
        controller.close();
        return;
      }
      controller.enqueue(encodeEnvelope(0, serialize(r.value)));
    },
    async cancel(reason) {
      if (it.throw) {
        try {
          await it.throw(reason);
        } catch {
          // iterator.throw on a generator function rethrows unless the
          // body catches and swallows.
        }
      }
    },
  });
  return { body, duplex: "half" };
}

/**
 * Detects whether the fetch API supports sending a ReadableStream as the
 * request body.
 *
 * Implementations that support streaming request bodies read the `duplex`
 * option, and do not set a Content-Type header for a ReadableStream body.
 * Implementations without support ignore `duplex`, and convert the body to a
 * string.
 *
 * See https://developer.chrome.com/docs/capabilities/web-apis/fetch-streaming-requests#feature_detection
 */
function supportsRequestStreams(): boolean {
  let duplexAccessed = false;
  try {
    const hasContentType = new Request("https://example.com/", {
      body: new ReadableStream(),
      method: "POST",
      get duplex() {
        duplexAccessed = true;
        return "half";
      },
    } as RequestInit).headers.has("Content-Type");
    return duplexAccessed && !hasContentType;
  } catch (_) {
    return false;
  }
}

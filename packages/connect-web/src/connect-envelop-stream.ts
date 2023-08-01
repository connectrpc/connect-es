import { encodeEnvelope } from "@bufbuild/connect/protocol";

export class ConnectEnvelopStream<I> extends TransformStream {
  public constructor(serializer: (data: I) => Uint8Array) {
    super({
      transform(chunk, controller) {
        try {
          const envelope = encodeEnvelope(0, serializer(chunk));
          controller.enqueue(envelope);
        } catch (e) {
          controller.error(e);
        }
      },
    });
  }
}

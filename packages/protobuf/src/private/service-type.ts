import type { DynamicMessage, Message } from "../message.js";
import type { MessageType } from "../message-type.js";
import {
  MethodIdempotency,
  MethodInfo,
  MethodKind,
  ServiceType,
} from "../service-type.js";

/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-argument */

/**
 * Create a service type at runtime.
 */
export function makeServiceType<T extends PartialServiceInfo>(
  info: T
): makeServiceType<T> {
  const i = info as any;
  // We do not surface options at this time
  //d.options = def.options ?? {};
  for (const k of Object.keys(info.methods)) {
    const method = info.methods[k],
      m = method as any;
    m.localName = k;
    // We do not surface options at this time
    //m.options = met.options ?? {};
    m.idempotency = method.idempotency ?? MethodIdempotency.Unknown;
  }
  i.listMethods = () => Object.values(i.methods);
  return i;
}

type makeServiceType<T extends PartialServiceInfo> = {
  typeName: T["typeName"];
  // We do not surface options at this time
  // options: T["options"] extends OptionsMap ? T["options"] : OptionsMap;
  methods: {
    [P in keyof T["methods"]]: makeMethodInfo<T["methods"][P], P>;
  };
  listMethods(): MethodInfo[];
};

type makeMethodInfo<T extends PartialMethodInfo, L> = {
  name: T["name"];
  localName: L;
  I: T["I"];
  O: T["O"];
  kind: T["kind"];
  idempotency: T["idempotency"] extends MethodIdempotency
    ? T["idempotency"]
    : MethodIdempotency.Unknown;
  // We do not surface options at this time
  // options: T["options"] extends OptionsMap ? T["options"] : OptionsMap;
};

type PartialServiceInfo = Omit<
  ServiceType,
  "listMethods" | "options" | "methods"
> & {
  // We do not surface options at this time
  // readonly options?: OptionsMap
  readonly methods: {
    [localName: string]: PartialMethodInfo;
  };
};

interface PartialMethodInfo<
  I extends Message = DynamicMessage,
  O extends Message = DynamicMessage
> {
  name: string;
  I: MessageType<I>;
  O: MessageType<O>;
  kind: MethodKind;
  // We do not surface options at this time
  // options?: OptionsMap;
  idempotency?: MethodIdempotency;
}

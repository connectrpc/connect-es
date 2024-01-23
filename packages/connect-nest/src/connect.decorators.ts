import { Controller, Logger } from "@nestjs/common";
import type { MethodInfo, ServiceType } from "@bufbuild/protobuf";

import { ConnectStore } from "./connect.store";
import { MethodIdempotency } from "@bufbuild/protobuf";

export interface ConnectControllerOptions {
  serviceType: ServiceType;
  autoMappping?: {
    enable: boolean;
    replace?: {
      [key: string]: string;
    };
  };
}

const store = ConnectStore.getInstance();
const logger = new Logger("ConnectRouter");

const ConnectControllerMetadataKey = Symbol("ConnectControllerMetadataKey");

interface ConnectControllerMetadata {
  methodInfo: MethodInfo;
  target: any;
  propertyKey: string;
  descriptor: PropertyDescriptor;
}

export function ConnectController(options: ConnectControllerOptions) {
  return (target: any) => {
    // custom mapping
    const metadata: Set<ConnectControllerMetadata> | undefined =
      Reflect.getMetadata(ConnectControllerMetadataKey, target);
    if (metadata) {
      for (const item of metadata) {
        if (
          store.addHandler({
            serviceType: options.serviceType,
            methodInfo: item.methodInfo,
            handler: item.descriptor.value,
          })
        ) {
          logger.log(
            `Custom Mapped {/${options.serviceType.typeName}/${
              item.methodInfo.name
            }, ${target.name}.${item.propertyKey}, ${
              item.methodInfo.idempotency === MethodIdempotency.NoSideEffects
                ? "GET|POST"
                : "POST"
            }} route`
          );
        }
      }
    }
    // auto mapping
    if (options.autoMappping?.enable) {
      for (const methodKey in options.serviceType.methods) {
        const methodInfo = options.serviceType.methods[methodKey];

        let methodName = methodKey;
        if (options.autoMappping?.replace) {
          for (const key in options.autoMappping.replace) {
            methodName = methodName.replace(
              key,
              options.autoMappping?.replace[key]
            );
          }
        }

        const descriptor = getMethodDescriptor(target.prototype, methodName);
        if (descriptor) {
          if (
            store.addHandler({
              serviceType: options.serviceType,
              methodInfo: methodInfo,
              handler: descriptor.value,
            })
          ) {
            logger.log(
              `Auto Mapped {/${options.serviceType.typeName}/${
                methodInfo.name
              }, ${target.name}.${methodName}, ${
                methodInfo.idempotency === MethodIdempotency.NoSideEffects
                  ? "GET|POST"
                  : "POST"
              }} route`
            );
          }
        }
      }
    }
    // default nest mapping
    Controller()(target);
  };
}

export interface ConnectMethodOptions {
  methodInfo: MethodInfo;
}

export function ConnectMethod(options: ConnectMethodOptions) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const metadata: Set<ConnectControllerMetadata> =
      Reflect.getMetadata(ConnectControllerMetadataKey, target.constructor) ||
      new Set<ConnectControllerMetadata>();

    metadata.add({
      methodInfo: options.methodInfo,
      target,
      propertyKey,
      descriptor,
    });

    Reflect.defineMetadata(
      ConnectControllerMetadataKey,
      metadata,
      target.constructor
    );
  };
}

function getMethodDescriptor(target: any, methodName: string) {
  // If target is null or undefined, return undefined
  if (target === null || target === undefined) {
    return undefined;
  }

  // Check if the method exists directly on the target
  const descriptor = Object.getOwnPropertyDescriptor(target, methodName);
  if (descriptor) {
    return descriptor;
  }

  // Recursively check the prototype chain
  return getMethodDescriptor(Object.getPrototypeOf(target), methodName);
}

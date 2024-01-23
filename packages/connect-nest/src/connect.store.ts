import type { MethodInfo, ServiceType } from '@bufbuild/protobuf';

import type { ConnectRouter } from '@connectrpc/connect';

export interface HandlerInfo {
  serviceType: ServiceType;
  methodInfo: MethodInfo;
  handler: any;
}

export class ConnectStore {
  private static instance: ConnectStore;
  private data: Set<HandlerInfo> = new Set();

  constructor() {}

  static getInstance() {
    if (!ConnectStore.instance) {
      ConnectStore.instance = new ConnectStore();
    }

    return ConnectStore.instance;
  }

  addHandler(handlerData: HandlerInfo) {
    for (const handler of this.data) {
      if (
        handler.serviceType.typeName === handlerData.serviceType.typeName &&
        handler.methodInfo.name === handlerData.methodInfo.name
      ) {
        return false;
      }
    }
    this.data.add(handlerData);
    return true;
  }

  getHandlers() {
    return this.data;
  }

  static routes(router: ConnectRouter) {
    ConnectStore.getInstance()
      .getHandlers()
      .forEach((handlerInfo) => {
        router.rpc(
          handlerInfo.serviceType,
          handlerInfo.methodInfo,
          handlerInfo.handler,
        );
      });
  }
}

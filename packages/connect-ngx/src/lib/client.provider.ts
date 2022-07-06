import { Provider } from '@angular/core';
import { Transport } from '@bufbuild/connect-web';
import { ServiceType } from '@bufbuild/protobuf';
import { createObservableClient } from './observable-client';
import { TRANSPORT } from './transport.token';

export function provideClient<T extends ServiceType>(service: T): Provider {
  return {
    provide: service,
    useFactory: (transport: Transport) => {
      return createObservableClient(service, transport);
    },
    deps: [TRANSPORT],
  };
}

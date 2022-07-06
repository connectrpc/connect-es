import { Provider } from '@angular/core';
import { Transport } from '@bufbuild/connect-web';
import { ServiceType } from '@bufbuild/protobuf';
import { createObservableClient } from './observable-client';
import { TRANSPORT } from './transport.token';

/**
 * Returns a [DI provider](https://angular.io/guide/glossary#provider) of an
 * `ObservableClient` for the the given service.
 * 
 * *Example:*
 * Providing a client:
 * ```ts
 * @NgModule({
 * ...
 * providers: [ provideClient(FooService) ]
 * ...
 * })
 * ```
 * Requesting a client:
 * ```ts
 * export class AppComponent {
 *  constructor(
 *    @Inject(FooService)
 *    private client: ObservableClient<typeof FooService>
 *  ) {}
 * }
 * ```
 */
export function provideClient<T extends ServiceType>(service: T): Provider {
  return {
    provide: service,
    useFactory: (transport: Transport) => {
      return createObservableClient(service, transport);
    },
    deps: [TRANSPORT],
  };
}

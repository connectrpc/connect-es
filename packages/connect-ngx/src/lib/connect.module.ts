import { ModuleWithProviders, NgModule } from '@angular/core';
import { createConnectTransport, Interceptor } from '@bufbuild/connect-web';
import { ConnectTransportOptions } from '@bufbuild/connect-web/dist/types/connect-transport';
import { INTERCEPTORS } from './interceptor.token';
import { TRANSPORT } from './transport.token';

/**
 * Configures the [dependency injector](https://angular.io/guide/glossary#injector) for `Transport`
 * using the `connect` transport.
 *
 * You can add interceptors to the `Transport` by binding them to the
 * multiprovider for built-in [DI token](https://angular.io/guide/glossary#di-token) `INTERCEPTORS`.
 */
@NgModule()
export class ConnectModule {
  public static forRoot(
    connectOptions: Omit<ConnectTransportOptions, 'interceptors'>
  ): ModuleWithProviders<ConnectModule> {
    return {
      ngModule: ConnectModule,
      providers: [
        {
          provide: TRANSPORT,
          useFactory: (interceptors: Interceptor[]) =>
            createConnectTransport({
              ...connectOptions,
              interceptors: interceptors,
            }),
          deps: [INTERCEPTORS],
        },
      ],
    };
  }
}

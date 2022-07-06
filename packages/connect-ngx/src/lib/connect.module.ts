import { ModuleWithProviders, NgModule } from '@angular/core';
import { createConnectTransport, Interceptor } from '@bufbuild/connect-web';
import { INTERCEPTORS } from './interceptor.token';
import { TRANSPORT } from './transport.token';

@NgModule()
export class ConnectModule {
  public static forRoot(
    connectOptions: Omit<
      Parameters<typeof createConnectTransport>[0],
      'interceptors'
    >
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

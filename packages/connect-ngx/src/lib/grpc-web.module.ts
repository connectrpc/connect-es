import { ModuleWithProviders, NgModule } from '@angular/core';
import { createGrpcWebTransport, Interceptor } from '@bufbuild/connect-web';
import { GrpcWebTransportOptions } from '@bufbuild/connect-web/dist/types/grpc-web-transport';
import { INTERCEPTORS } from './interceptor.token';
import { TRANSPORT } from './transport.token';

/**
 * Configures the [dependency injector](https://angular.io/guide/glossary#injector) for `Transport`
 * using the `grpc-web` transport.
 *
 * You can add interceptors to the `Transport` by binding them to the
 * multiprovider for built-in [DI token](https://angular.io/guide/glossary#di-token) `INTERCEPTORS`.
 */
@NgModule()
export class GrpcWebModule {
  public static forRoot(
    grpcWebOptions: Omit<GrpcWebTransportOptions, 'interceptors'>
  ): ModuleWithProviders<GrpcWebModule> {
    return {
      ngModule: GrpcWebModule,
      providers: [
        {
          provide: TRANSPORT,
          useFactory: (interceptors: Interceptor[]) =>
            createGrpcWebTransport({
              ...grpcWebOptions,
              interceptors: interceptors,
            }),
          deps: [INTERCEPTORS],
        },
      ],
    };
  }
}

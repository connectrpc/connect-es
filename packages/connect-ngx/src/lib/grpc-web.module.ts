import { ModuleWithProviders, NgModule } from '@angular/core';
import { createGrpcWebTransport, Interceptor } from '@bufbuild/connect-web';
import { INTERCEPTORS } from './interceptor.token';
import { TRANSPORT } from './transport.token';

@NgModule()
export class GrpcWebModule {
  public static forRoot(
    grpcWebOptions: Omit<
      Parameters<typeof createGrpcWebTransport>[0],
      'interceptors'
    >
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

// Copyright 2021-2022 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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

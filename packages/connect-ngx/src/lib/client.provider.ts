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

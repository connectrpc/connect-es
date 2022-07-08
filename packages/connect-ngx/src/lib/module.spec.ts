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

import {
  NgModule,
  ModuleWithProviders,
  Inject,
  Injectable,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Interceptor, Transport } from '@bufbuild/connect-web';
import { INTERCEPTORS } from './interceptor.token';
import { TRANSPORT } from './transport.token';
import { FooService } from './test-utils/foo-service';

@Injectable()
export class TestTransportService {
  constructor(@Inject(TRANSPORT) public transport: Transport) {}
}

export function testModule<T extends NgModule>(module: ModuleWithProviders<T>) {
  it('should be able to inject `Transport`', () => {
    TestBed.configureTestingModule({
      imports: [module],
      providers: [TestTransportService],
    });
    const service = TestBed.inject(TestTransportService);
    expect(service.transport).toBeTruthy();
  });
  it('should provide `Transport` that depends on interceptors', async () => {
    const interceptorSpy = jasmine.createSpy<Interceptor>('interceptor');
    TestBed.configureTestingModule({
      imports: [module],
      providers: [
        TestTransportService,
        { provide: INTERCEPTORS, multi: true, useValue: interceptorSpy },
      ],
    });
    const service = TestBed.inject(TestTransportService);
    await expectAsync(
      service.transport.unary(
        FooService,
        FooService.methods.foo,
        undefined,
        undefined,
        undefined,
        {}
      )
    ).toBeRejected();
    expect(interceptorSpy).toHaveBeenCalled();
  });
}

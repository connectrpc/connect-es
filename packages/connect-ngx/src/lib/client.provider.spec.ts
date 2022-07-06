import { Inject, Injectable, InjectFlags } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Empty, MethodKind, ServiceType } from '@bufbuild/protobuf';
import { ObservableClient } from 'dist/connect-ngx';
import { provideClient } from './client.provider';
import { FooService } from './test-utils/foo-service';
import { TRANSPORT } from './transport.token';

@Injectable()
class TestClientProvider {
  constructor(
    @Inject(FooService) public client: ObservableClient<typeof FooService>
  ) {}
}

describe('provideClient', () => {
  it('should return a provider that is injectable by `ServiceType`', () => {
    TestBed.configureTestingModule({
      providers: [
        provideClient(FooService),
        TestClientProvider,
        { provide: TRANSPORT, useValue: {} },
      ],
    });
    const service = TestBed.inject(TestClientProvider);
    expect(service.client).toBeTruthy();
    expect(service.client).toEqual(
      jasmine.objectContaining({
        foo: jasmine.anything(),
      })
    );
  });
});

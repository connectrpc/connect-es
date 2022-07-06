import {
  Inject,
  Injectable,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Interceptor, Transport } from '@bufbuild/connect-web';
import { INTERCEPTORS } from './interceptor.token';
import { TRANSPORT } from './transport.token';
import { FooService } from './test-utils/foo-service';

@Injectable()
class TestService {
  constructor(@Inject(TRANSPORT) public transport: Transport) {}
}

export function testModule<T extends NgModule>(
  connectModule: ModuleWithProviders<T>
) {
  it('should provide `Transport`', () => {
    expect(connectModule.providers).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({
          provide: TRANSPORT,
        }),
      ])
    );
  });
  it('should be able to inject `Transport`', () => {
    TestBed.configureTestingModule({
      imports: [connectModule],
      providers: [TestService],
    });
    const service = TestBed.inject(TestService);
    expect(service.transport).toBeTruthy();
  });
  it('should provide `Transport` that depends on interceptors', () => {
    const interceptorSpy = jasmine.createSpy<Interceptor>('interceptor');
    TestBed.configureTestingModule({
      imports: [connectModule],
      providers: [
        TestService,
        { provide: INTERCEPTORS, multi: true, useValue: interceptorSpy },
      ],
    });
    const service = TestBed.inject(TestService);
    expectAsync(
      service.transport.unary(
        FooService,
        FooService.methods.foo,
        undefined,
        undefined,
        undefined,
        {}
      )
    ).toBeResolved();
    expect(interceptorSpy).toHaveBeenCalled();
  });
}

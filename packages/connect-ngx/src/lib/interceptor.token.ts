import { InjectionToken } from '@angular/core';
import type { Interceptor } from '@bufbuild/connect-web';

/**
 * A multi-provider injection token that represents the array
 * of `Interceptor` objects.
 *
 * Interceptors can be added to the chain as follows,
 * ```ts
 *  {
 *    provide: INTERCEPTORS,
 *    useValue: logInterceptor,
 *    multi: true,
 *  }
 * ```
 *
 * The order in which these are provided is the order
 * they are called in.
 */
export const INTERCEPTORS = new InjectionToken<Interceptor[]>(
  'connect.interceptors',
  {
    factory: () => [],
  }
);

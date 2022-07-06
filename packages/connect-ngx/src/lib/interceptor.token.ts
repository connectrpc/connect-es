import { InjectionToken } from '@angular/core';
import type { Interceptor } from '@bufbuild/connect-web';

export const INTERCEPTORS = new InjectionToken<Interceptor[]>(
  'connect.interceptors',
  {
    factory: () => [],
  }
);

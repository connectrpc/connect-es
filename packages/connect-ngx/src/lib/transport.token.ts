import { InjectionToken } from '@angular/core';
import type { Transport } from '@bufbuild/connect-web';

/**
 * Injection token for `Transport`.
 *
 * This is provided in both ConnectModule.forRoot() and GrpcWebModule.forRoot().
 */
export const TRANSPORT = new InjectionToken<Transport>('connect.transport');

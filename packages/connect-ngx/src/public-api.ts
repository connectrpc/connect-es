/*
 * Public API Surface of connect-ngx
 */

export { provideClient } from './lib/client.provider';
export { ConnectModule } from './lib/connect.module';
export { GrpcWebModule } from './lib/grpc-web.module';
export { INTERCEPTORS } from './lib/interceptor.token';
export { ObservableClient } from './lib/observable-client';
export { TRANSPORT } from './lib/transport.token';

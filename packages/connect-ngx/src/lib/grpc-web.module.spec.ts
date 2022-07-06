import { GrpcWebModule } from 'dist/connect-ngx';
import { testModule } from './module.spec';

describe('GrpcWebModule', () => {
  testModule(GrpcWebModule.forRoot({ baseUrl: 'https://foo.bar' }));
});

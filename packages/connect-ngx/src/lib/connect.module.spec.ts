import { ConnectModule } from 'dist/connect-ngx';
import { testModule } from './module.spec';

describe('ConnectModule', () => {
  testModule(ConnectModule.forRoot({ baseUrl: 'https://foo.bar' }));
});

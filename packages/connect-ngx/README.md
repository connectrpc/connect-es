# @bufbuild/connect-ngx

[Angular](https://angular.io) support library for [@bufbuild/connect-web](https://www.npmjs.com/package/@bufbuild/connect-web). 

It has the following features:

- An [Observable](https://rxjs.dev/guide/observable) based client.
- Support for [Angular DI](https://angular.io/guide/glossary#dependency-injection-di).
- [NgModules](https://angular.io/guide/glossary#ngmodule) for `connect` and `grpc-web` transports.

## Getting started

Get started by importing the `ConnectModule` as shown below.

```ts
import { ConnectModule } from '@bufbuild/connect-ngx';


@NgModule({
    imports: [
        ConnectModule.forRoot({
            // The address of the connect server
            baseUrl: 'https://demo.connect.build',
        })
    ],
})
```

Next add a client provider.

```ts
import { ConnectModule, provideClient } from '@bufbuild/connect-ngx';
import { ElizaService } from 'src/gen/buf/connect/demo/eliza/v1/eliza_connectweb';


@NgModule({
    imports: [
        ConnectModule.forRoot({
            baseUrl: 'https://demo.connect.build',
        })
    ],
    providers: [
        provideClient(ElizaService)
    ],
})
```

Here we are passing the generated service definition to `provideClient`. For information on how to generate these please see [Generate code section](https://connect.build/docs/web/getting-started#generate-code).

Now, let's use the client in a component,

```ts
import { Component, Inject } from '@angular/core'
import { ObservableClient } from '@bufbuild/connect-ngx'
import { ElizaService } from 'src/gen/buf/connect/demo/eliza/v1/eliza_connectweb'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    constructor(
        @Inject(ElizaService)
        private client: ObservableClient<typeof ElizaService>
    ) {}

    ngOnInit() {
        this.client.say({ sentence: "Let's connect!" }).subscribe((next) => {
            console.log(next.sentence)
        })
    }
}
```

## Interceptors

[Interceptors](https://connect.build/docs/web/interceptors) can be added using Angular DI. Here's an example:

```ts
import { ConnectModule, provideClient, INTERCEPTORS } from '@bufbuild/connect-ngx';
import { ElizaService } from 'src/gen/buf/connect/demo/eliza/v1/eliza_connectweb'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        ConnectModule.forRoot({
            baseUrl: 'https://demo.connect.build',
        }),
    ],
    providers: [
        provideClient(ElizaService),
        { provide: INTERCEPTORS, multi: true, useValue: logInterceptor },
    ],
})
```

The order in which these are provided will affect the call order. The last interceptor will receive the request first and the first interceptor will recieve the response first.

## Grpc Web Protocol

`grpc-web` can be used by replacing the `ConnectModule` with `GrpcWebModule`.

```ts
import { GrpcWebModule } from '@bufbuild/connect-ngx';


@NgModule({
    imports: [
        GrpcWebModule.forRoot({
            // The address of the connect server
            baseUrl: 'https://demo.connect.build',
        })
    ],
})
```

## Examples

For an end-to-end setup checkout the [examples](https://github.com/bufbuild/connect-web-integration/tree/main/angular).

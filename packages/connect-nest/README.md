# @connectrpc/connect-nest

Connect is a family of libraries for building and consuming APIs on different languages and platforms, and
[@connectrpc/connect](https://www.npmjs.com/package/@connectrpc/connect) brings type-safe APIs with Protobuf to
TypeScript.

`@connectrpc/connect-nest` provides a plugin for [Nestjs](https://https://nestjs.com),
A progressive Node.js framework.

### nestConnectMiddleware()

#### Express (default)

```ts
// main.ts
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { nestConnectMiddleware } from "./connect.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable nestjs middleware
  app.use(nestConnectMiddleware);

  await app.listen(3000);
}

bootstrap();
```

#### Fastify

```ts
// main.ts
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { nestConnectMiddleware } from "./connect.middleware";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  // Enable nestjs middleware
  app.use(nestConnectMiddleware);

  await app.listen(3000, "0.0.0.0");
}

bootstrap();
```

### @ConnectController() (Manual Mapping)

```ts
// ...controller.ts
import { ConnectController, ConnectMethod } from "./connect.decorators";

import { Get } from "@nestjs/common";
import { TodoAPI } from "./gen/todo/v1/todo_api_connect";
import { ListTodosRequest, ListTodosResponse } from "./gen/todo/v1/todo_api_pb";

@ConnectController({ serviceType: TodoAPI })
export class AppController {
  // regular http method
  @Get()
  getHello() {
    return "hello world";
  }

  @ConnectController({
    serviceType: TodoAPI,
  })
  async listTodos(req: ListTodosRequest): Promise<ListTodosResponse> {
    return { todos: [] };
  }
}
```

### @ConnectController() (Auto Mapping)

```ts
// ...controller.ts
import { ConnectController, ConnectMethod } from "./connect.decorators";

import { Get } from "@nestjs/common";
import { TodoAPI } from "./gen/todo/v1/todo_api_connect";

@ConnectController({
  serviceType: TodoAPI,
  autoMappping: {
    enable: true,
  },
})
export class AppController {
  // regular http method
  @Get()
  getHello() {
    return "hello world";
  }

  // auto mapped due to name matching
  async listTodos() {}
}
```

## Getting started

To get started with Connect, head over to the [docs](https://connectrpc.com/docs/node/getting-started)
for a tutorial, or take a look at [our example](https://github.com/connectrpc/connect-es/tree/main/packages/example).

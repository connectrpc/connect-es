// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  createHandler,
  createHandlers,
  unimplementService,
} from "@bufbuild/connect-node";
import { createRegistry } from "@bufbuild/protobuf";
import { TestService } from "./gen/grpc/testing/test_connectweb.js";

describe("createHandler()", () => {
  it("should take a method", () => {
    const h = createHandler(
      TestService,
      TestService.methods.emptyCall,
      (req) => req
    );
    expect(h.service).toBe(TestService);
    expect(h.method).toBe(TestService.methods.emptyCall);
    expect(h.requestPath).toBe("/grpc.testing.TestService/EmptyCall");
  });
  it("should take serialization options", () => {
    const h = createHandler(
      TestService,
      TestService.methods.emptyCall,
      (req) => req,
      {
        jsonOptions: {
          typeRegistry: createRegistry(),
        },
        binaryOptions: {
          writeUnknownFields: false,
        },
      }
    );
    expect(h).toBeDefined();
  });
  it("should take protocols options", () => {
    const h = createHandler(
      TestService,
      TestService.methods.emptyCall,
      (req) => req,
      {
        connect: true,
      }
    );
    expect(h).toBeDefined();
  });
});

describe("createHandlers()", () => {
  it("should take a service", () => {
    const h = createHandlers(TestService, unimplementService(TestService, {}));
    expect(h.length).toBe(Object.keys(TestService.methods).length);
  });
  it("should take serialization options", () => {
    const h = createHandlers(TestService, unimplementService(TestService, {}), {
      jsonOptions: {
        typeRegistry: createRegistry(),
      },
      binaryOptions: {
        writeUnknownFields: false,
      },
    });
    expect(h).toBeDefined();
  });
  it("should take protocols options", () => {
    const h = createHandlers(TestService, unimplementService(TestService, {}), {
      connect: true,
    });
    expect(h).toBeDefined();
  });
});

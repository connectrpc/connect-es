// Copyright 2021-2022 Buf Technologies, Inc.
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

/* eslint-disable  @typescript-eslint/unbound-method */

import { fakeAsync, tick } from '@angular/core/testing';
import { StreamResponse, Transport } from '@bufbuild/connect-web';
import { Empty } from '@bufbuild/protobuf';
import { ObservableClient } from 'dist/connect-ngx';
import { createObservableClient } from './observable-client';
import { FooService } from './test-utils/foo-service';

describe('ObservableClient', () => {
  let transportSpy: jasmine.SpyObj<Transport>;
  let client: ObservableClient<typeof FooService>;
  beforeEach(() => {
    transportSpy = jasmine.createSpyObj<Transport>('Transport', [
      'unary',
      'serverStream',
    ]);
    client = createObservableClient(FooService, transportSpy);
  });
  describe('unary', () => {
    it("doesn't call on create", fakeAsync(() => {
      client.foo({});
      tick();
      expect(transportSpy.unary).not.toHaveBeenCalled();
    }));
    it('emits message on success', (done) => {
      const response = new Empty({});
      const headers = new Headers({ 'X-HEADER': '1' });
      const trailers = new Headers({ 'X-TRAILER': '1' });
      transportSpy.unary.and.resolveTo({
        stream: false,
        service: FooService,
        method: FooService.methods.foo,
        message: response,
        header: headers,
        trailer: trailers,
      });
      const errorSpy = jasmine.createSpy('error');
      const nextSpy = jasmine.createSpy('next');
      const optionsSpy = jasmine.createSpyObj<{
        onHeader: jasmine.Func;
        onTrailer: jasmine.Func;
      }>('callOptions', ['onHeader', 'onTrailer']);
      client.foo({}, optionsSpy).subscribe(nextSpy, errorSpy, () => {
        expect(transportSpy.unary).toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(nextSpy).toHaveBeenCalledOnceWith(response);
        expect(nextSpy).toHaveBeenCalledBefore(optionsSpy.onTrailer);
        expect(optionsSpy.onHeader).toHaveBeenCalledOnceWith(headers);
        expect(optionsSpy.onHeader).toHaveBeenCalledBefore(nextSpy);
        expect(optionsSpy.onTrailer).toHaveBeenCalledOnceWith(trailers);
        done();
      });
    });
    it('emits error on failure', (done) => {
      const err = 'grpc-web';
      transportSpy.unary.and.rejectWith(err);
      const nextSpy = jasmine.createSpy('next');
      client.foo({}).subscribe(nextSpy, (gotErr) => {
        expect(transportSpy.unary).toHaveBeenCalled();
        expect(nextSpy).not.toHaveBeenCalled();
        expect(gotErr).toBe(err);
        done();
      });
    });
  });
  describe('serverStream', () => {
    it("doesn't call on create", fakeAsync(() => {
      client.bar({});
      tick();
      expect(transportSpy.serverStream).not.toHaveBeenCalled();
    }));
    it('emits messages on success', (done) => {
      const message = new Empty();
      const responses: ReturnType<StreamResponse['read']>[] = (
        [
          { done: false, value: message },
          { done: false, value: message },
          { done: true },
        ] as const
      ).map((r) => Promise.resolve(r));
      const headers = new Headers({ 'X-HEADER': '1' });
      const trailers = new Headers({ 'X-TRAILER': '1' });
      const readSpy = jasmine.createSpy('read').and.returnValues(...responses);
      transportSpy.serverStream.and.resolveTo({
        stream: true,
        service: FooService,
        method: FooService.methods.foo,
        read: readSpy,
        header: headers,
        trailer: trailers,
      });
      const errorSpy = jasmine.createSpy('error');
      const nextSpy = jasmine.createSpy('next');
      const optionsSpy = jasmine.createSpyObj<{
        onHeader: jasmine.Func;
        onTrailer: jasmine.Func;
      }>('callOptions', ['onHeader', 'onTrailer']);
      client.bar({}, optionsSpy).subscribe(nextSpy, errorSpy, () => {
        expect(transportSpy.serverStream).toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(nextSpy).toHaveBeenCalledWith(message);
        expect(nextSpy).toHaveBeenCalledTimes(responses.length - 1);
        expect(nextSpy).toHaveBeenCalledBefore(optionsSpy.onTrailer);
        expect(optionsSpy.onHeader).toHaveBeenCalledOnceWith(headers);
        expect(optionsSpy.onHeader).toHaveBeenCalledBefore(nextSpy);
        expect(optionsSpy.onTrailer).toHaveBeenCalledOnceWith(trailers);
        done();
      });
    });
    it('emits error on failure', (done) => {
      const err = 'grpc-web';
      transportSpy.serverStream.and.rejectWith(err);
      const nextSpy = jasmine.createSpy('next');
      client.bar({}).subscribe(nextSpy, (gotErr) => {
        expect(transportSpy.serverStream).toHaveBeenCalled();
        expect(gotErr).toBe(err);
        expect(nextSpy).not.toHaveBeenCalled();
        done();
      });
    });
    it('emits error on read failure', (done) => {
      const err = 'grpc-web';
      const readSpy = jasmine.createSpy('read').and.rejectWith(err);
      transportSpy.serverStream.and.resolveTo({
        stream: true,
        service: FooService,
        method: FooService.methods.foo,
        read: readSpy,
        header: new Headers(),
        trailer: new Headers(),
      });
      const nextSpy = jasmine.createSpy('next');
      client.bar({}).subscribe(nextSpy, (gotErr) => {
        expect(transportSpy.serverStream).toHaveBeenCalled();
        expect(gotErr).toBe(err);
        expect(nextSpy).not.toHaveBeenCalled();
        expect(readSpy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});

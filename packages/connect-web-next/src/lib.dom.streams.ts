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

// The name for the ReadableStreamDefaultReadResult type changed in TypeScript
// 4.8.2 to ReadableStreamReadResult.  This makes supporting multiple versions
// of TypeScript difficult if we use the ambient type declaration.  Instead,
// this type is meant to mimic the type provided by TypeScript, just defined
// here so that we can have better control with supporting various versions.
// The suffix 'Like' has been added to the type name to differentiate it from
// the actual type provided by TypeScript libs.
export type ReadableStreamReadResultLike<T> =
  | ReadableStreamReadValueResultLike<T>
  | ReadableStreamReadDoneResultLike;

interface ReadableStreamReadValueResultLike<T> {
  done: false;
  value: T;
}

interface ReadableStreamReadDoneResultLike {
  done: true;
  value?: undefined;
}

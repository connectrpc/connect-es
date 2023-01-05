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

export function defer<T>(): Promise<T> & Ctrl<T> {
  let res: ((v: T | PromiseLike<T>) => void) | undefined = undefined;
  let rej: ((reason?: unknown) => void) | undefined;
  const p = new Promise<T>((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  void p.catch(() => {
    // We want to provide several promises that are typically awaited
    // by the user one after the other.
    // If we reject one of the promises before it is awaited by the user,
    // some runtimes may report an unhandled promise rejection.
    // We are attaching this error handler to avoid the warnings.
  });
  const c: Ctrl<T> = {
    resolve(v) {
      res?.(v);
    },
    reject(reason) {
      rej?.(reason);
    },
  };
  return Object.assign(p, c);
}

type Ctrl<T> = {
  resolve(v: T | PromiseLike<T>): void;
  reject(reason?: unknown): void;
};

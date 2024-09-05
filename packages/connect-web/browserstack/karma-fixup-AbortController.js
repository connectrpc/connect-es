// Copyright 2021-2024 The Connect Authors
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

// a simplistic polyfill for AbortController and AbortSignal

(function () {
  if (globalThis.AbortController && globalThis.AbortSignal) {
    // `throwIfAborted` was added much later.
    if (!globalThis.AbortSignal.prototype.throwIfAborted) {
      globalThis.AbortSignal.prototype.throwIfAborted = function () {
        if (this.aborted) {
          const err = new Error("operation aborted");
          err.name = "AbortError";
          throw err;
        }
      };
    }
    return;
  }

  function AbortSignal() {
    Object.defineProperty(this, "listeners", {
      value: [],
      writable: true,
      configurable: true,
    });
  }

  AbortSignal.prototype.throwIfAborted = function () {
    if (this.aborted) {
      const err = new Error("operation aborted");
      err.name = "AbortError";
      throw err;
    }
  };

  AbortSignal.prototype.addEventListener = function (type, callback) {
    if (type !== "abort") {
      return;
    }
    if (!(type in this.listeners)) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
  };

  AbortSignal.prototype.removeEventListener = function (type, callback) {
    if (type !== "abort") {
      return;
    }
    for (let i = 0; i < this.listeners.length; i++) {
      if (this.listeners[i] === callback) {
        this.listeners.splice(i, 1);
        break;
      }
    }
  };

  AbortSignal.prototype.dispatchEvent = function (event) {
    if (event.type !== "abort") {
      return;
    }
    this.aborted = true;
    if (typeof this.onabort === "function") {
      this.onabort.call(this, event);
    }
    const l = this.listeners.concat();
    for (let i = 0; i < l.length; i++) {
      const listener = l[i];
      try {
        listener.call(this, event);
      } catch (e) {
        Promise.resolve().then(() => {
          throw e;
        });
      }
    }
    return !event.defaultPrevented;
  };

  AbortSignal.prototype.toString = function () {
    return "[object AbortSignal]";
  };

  function AbortController() {
    Object.defineProperty(this, "signal", {
      value: new AbortSignal(),
      writable: true,
      configurable: true,
    });
  }

  AbortController.prototype.abort = function () {
    let event;
    try {
      event = new Event("abort");
    } catch (e) {
      // no support for IE
    }
    this.signal.dispatchEvent(event);
  };

  AbortController.prototype.toString = function () {
    return "[object AbortController]";
  };

  globalThis.AbortController = AbortController;
  globalThis.AbortSignal = AbortSignal;
})();

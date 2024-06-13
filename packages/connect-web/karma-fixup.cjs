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

const path = require("path");

// This is a plugin for the test runner karma that injects some polyfills.
// http://karma-runner.github.io/6.3/dev/plugins.html

function fixupFactory(files) {
  files.unshift(
    {
      pattern: path.join(__dirname, "/karma-fixup-globalThis.js"),
      included: true,
      served: true,
      watched: false,
    },
    {
      pattern: path.join(__dirname, "/karma-fixup-AbortController.js"),
      included: true,
      served: true,
      watched: false,
    },
    {
      pattern: path.join(__dirname, "/karma-fixup-queueMicrotask.js"),
      included: true,
      served: true,
      watched: false,
    },
    {
      pattern: path.join(__dirname, "/karma-fixup-symbolAsyncIterator.js"),
      included: true,
      served: true,
      watched: false,
    },
  );
}

fixupFactory.$inject = ["config.files"];

module.exports = {
  "framework:fixup": ["factory", fixupFactory],
};

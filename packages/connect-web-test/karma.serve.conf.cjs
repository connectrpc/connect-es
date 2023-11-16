// Copyright 2022 Buf Technologies, Inc.
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

module.exports = function (config) {
  require("./karma.conf.cjs")(config);
  config.set({
    // Override the configuration settings so that we can simply serve
    // karma, instead of running against configured browsers.
    // This is used by the npm script "karma-serve", and the make target
    // "test-local-browser".
    singleRun: false,
    browsers: [],
    customLaunchers: {},
  });
};

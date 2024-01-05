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

if (
  process.env.BROWSERSTACK_USERNAME === undefined ||
  process.env.BROWSERSTACK_ACCESS_KEY === undefined
) {
  throw new Error(
    "The environment variables BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY are required to run tests on browserstack.",
  );
}

module.exports = function (config) {
  config.set({
    plugins: [
      require("./karma-fixup.cjs"),
      require("karma-esbuild"),
      require("karma-jasmine"),
      require("karma-browserstack-launcher"),
      require("karma-chrome-launcher"),
    ],
    singleRun: true,
    frameworks: ["jasmine", "fixup"],
    preprocessors: {
      "**/*.ts": "esbuild",
    },
    reporters: ["progress", "BrowserStack"],
    files: ["src/browserstackonly/*.ts", "src/gen/**/*.ts"],
    esbuild: {
      define: {},
      plugins: [],
      tsconfig: "./tsconfig.json",
      target: "es2015",
      singleBundle: true,
    },

    // global config of your BrowserStack account
    browserStack: {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      apiClientEndpoint: "https://api.browserstack.com",
    },
    browsers: [
      "ChromeHeadless",
      "bstack_ios_safari_13",
      "bstack_macos_safari_14_1",
      "bstack_macos_safari_13_1",
      "bstack_macos_safari_12_1",
      "bstack_macos_safari_11_1",
      "bstack_windows_chrome_60_0",
      "bstack_windows_ff_67_0",
    ],
    customLaunchers: {
      bstack_ios_safari_13: {
        // Safari 13 on iOS 13.3 - the oldest iOS version available.
        base: "BrowserStack",
        "browserstack.tunnel": false,
        device: "iPhone 11",
        real_mobile: true,
        browser: "safari",
        os: "ios",
        os_version: "13",
      },

      bstack_macos_safari_14_1: {
        base: "BrowserStack",
        "browserstack.tunnel": false,
        browser_version: "14.1",
        os: "OS X",
        os_version: "Big Sur",
        resolution: "1024x768",
        browser: "safari",
      },

      bstack_macos_safari_13_1: {
        base: "BrowserStack",
        "browserstack.tunnel": false,
        browser_version: "13.1",
        os: "OS X",
        os_version: "Catalina",
        resolution: "1024x768",
        browser: "safari",
      },

      bstack_macos_safari_12_1: {
        base: "BrowserStack",
        "browserstack.tunnel": false,
        browser_version: "12.1",
        os: "OS X",
        os_version: "Mojave",
        resolution: "1024x768",
        browser: "safari",
      },

      bstack_macos_safari_11_1: {
        // fetch API and encoder API are available on mac os since Safari 10.1:
        // https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API#browser_compatibility
        // Unfortunately, jasmine-core/jasmine.js uses the object spread syntax
        // (only available since Safari 11.1) and does not get transpiled, so we
        // cannot test earlier versions.
        base: "BrowserStack",
        "browserstack.tunnel": false,
        browser_version: "11.1",
        os: "OS X",
        os_version: "High Sierra",
        resolution: "1024x768",
        browser: "safari",
      },

      bstack_windows_chrome_60_0: {
        // fetch API and encoder API are available since Chrome 42:
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API#browser_compatibility
        // Unfortunately, jasmine-core/jasmine.js uses the object spread syntax
        // (only available since Chrome 60) and does not get transpiled, so we
        // cannot test earlier versions.
        base: "BrowserStack",
        "browserstack.tunnel": false,
        browser: "chrome",
        browser_version: "60.0",
        os: "Windows",
        os_version: "10",
      },

      bstack_windows_ff_67_0: {
        // fetch API and encoder API are available since Firefox 42, but
        // ReadableStream was only added in 65:
        // https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API#browser_compatibility
        // We cannot test it here though, because capturing times out in
        // browserstack.
        base: "BrowserStack",
        "browserstack.tunnel": false,
        browser: "firefox",
        browser_version: "67.0",
        os: "Windows",
        os_version: "10",
      },
    },
  });
};

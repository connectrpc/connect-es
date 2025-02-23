// Copyright 2021-2025 The Connect Authors
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

export const config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  runner: "local",
  framework: "jasmine",
  logLevel: "error",
  commonCapabilities: {
    "bstack:options": {
      projectName: "Connect-ES",
      buildName: "Connect Build Name",
    },
  },
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        // to run chrome headless the following flags are required
        args: ["--headless", "--disable-gpu"],
      },
    },
    {
      browserName: "Safari",
      "bstack:options": {
        osVersion: "13",
        deviceName: "iPhone 11",
      },
    },
    {
      browserName: "Safari",
      "bstack:options": {
        os: "OS X",
        osVersion: "Big Sur",
        browserVersion: "14.1",
      },
    },
    {
      browserName: "Safari",
      "bstack:options": {
        os: "OS X",
        osVersion: "Catalina",
        browserVersion: "13.1",
      },
    },
    {
      browserName: "Safari",
      "bstack:options": {
        os: "OS X",
        osVersion: "Mojave",
        browserVersion: "12.1",
      },
    },
    {
      browserName: "Safari",
      "bstack:options": {
        os: "OS X",
        osVersion: "High Sierra",
        browserVersion: "11.1",
      },
    },
    {
      browserName: "Chrome",
      "bstack:options": {
        os: "Windows",
        osVersion: "10",
        browserVersion: "66.0",
      },
    },
    {
      browserName: "Firefox",
      "bstack:options": {
        os: "Windows",
        osVersion: "10",
        browserVersion: "67.0",
      },
    },
  ],
  services: [["browserstack"]],
  specs: [["./*.spec.ts"]],
};

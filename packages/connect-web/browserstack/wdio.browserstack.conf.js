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
        browserVersion: "60.0",
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

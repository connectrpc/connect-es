# Conformance tests for connect

This package provides test coverage for connect-es. It implements the conformance service described [here](https://buf.build/connectrpc/conformance).

It uses the [conformance runner](https://github.com/connectrpc/conformance/releases) to run the tests.

## `connect-web` Tests

The conformance runner sends the test config via stdin, and expects the test results on stdout. To make this work for browser-based tests, we make use of webdriver's [executeAsyncScript](https://webdriver.io/docs/api/webdriver#executeasyncscript) api to send the test config to the browser, and to retrieve the test results. The script that is executed in the browser is [web/entry.ts](src/web/entry.ts).

We can run the tests on a single browser using this API like so:

```mermaid
sequenceDiagram
    participant R as Runner
    create participant C as Client
    R->>C: Run Client
    create participant B as Browser
    C->>B: Start Browser
    loop All test cases
        R->>C: Send Test case
        C->> B: Execute test case
        C->>R: Send test result
    end
    destroy B
    C->>B: Stop Browser
    destroy C
    C->>R: Done
```

Unfortunately, this doesn't work with webdriver. The browser will take over the stdin/stdout. Even if it did work this has to repeat for each browser. We also need to run the tests on the browserstack. Webdriver has support for browserstack, but we need to utilize the test runner to run on borwser stack. So we change the flow:

```mermaid
sequenceDiagram
    participant W as Webdriver
    create participant B as Browser
    W->>B: Start Browser
    create participant T as "(web/client.ts)"
    W->>T: Start
    create participant R as Conformance Runner
    T->>R: Start
    create participant C as Proxy Client
    R->>C: Run Client       
    loop All test cases
        R->>C: Send Test case
        C->> T: Proxy test case
        T->> B: Execute test case
        T->>R: Send test result
    end
    destroy C
    C->>R: Done
    destroy R
    R->>T: Done
    destroy T
    T->>W: Done
```
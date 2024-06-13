# Connect-Web Browserstack Tests

This directory provides cross-browser test coverage for @connectrpc/connect-web with Browserstack 
by running a few select tests on old browsers. Thanks to Browserstack for the sponsorship!

To run these tests locally, you need to sign up on [Browserstack](https://www.browserstack.com/)
and provide your username and access key:

```bash
BROWSERSTACK_USERNAME=<username> BROWSERSTACK_ACCESS_KEY=<key> make testwebbrowserstack
```

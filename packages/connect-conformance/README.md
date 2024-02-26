# Conformance tests for connect

This package provides test coverage for connect-es. It implements the conformance service described [here](https://buf.build/connectrpc/conformance).

It uses the [conformance runner](https://github.com/connectrpc/conformance/releases) to run the tests.

## Browser

Browser tests are run on every commit.

### Running tests in a headless browser

Run `make testwebconformance` to run the tests in a headless browser. It runs tests in chrome and firefox, safari if running on a mac. Safari requires users to enable the 'Allow Remote Automation' option in Safari's Develop menu. As a special case it also runs the
tests in node.

### Running tests in a local browser

Run `make testwebconformancelocal` to run the tests in a local browser. This will open a chrome browser and run the tests. If you want to run the tests in a different browser, set the `CONFORMANCE_BROWSER` environment variable.

## Node

Node tests are run as part of regular CI, on every commit. The [src/node](src/node/) directory contains the entry points for tests.

## Cloudflare workers

Cloudflare worker tests are run once every 24 hours and on a release PR. This is because the tests are run on a live Cloudflare worker, and deploying a new version of the worker is a slow process.

The [src/cloudflare](src/cloudflare/) directory contains the entry points for tests.

### Client tests on Cloudflare

Client tests on Cloudflare require a live server with valid TLS. To run the tests, we set up a [self hosted GitHub action runner](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners) that runs the conformance runner and exposes the reference server on 443 over the public internet.

#### Steps to setup the action runner

* Provision a VM with a static public IP address.
* Reserve a domain (can be a subdomain) and point it to the public IP address from the previous step.
* Use [certbot](https://certbot.eff.org/) to setup automatic certificate renewal for the domain.
* Using iptables, redirect traffic from port 443 to a non-priviliged port say 8181.
* Create a dedicated user to run the action runner.
* Make sure the user has the necessary permissions to run the conformance runner, read the cert and key that certbot maintains.
* Follow the steps [here](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/adding-self-hosted-runners) to add a self-hosted runner to the repository.
* Cofigure the runner app to [run as a service](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/configuring-the-self-hosted-runner-application-as-a-service) with the created user.

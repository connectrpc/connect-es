# Connect Conformance

This package provides common artifacts and functionality for running conformance tests against the various packages in
this repository.

For documentation on the conformance tests, see the repository [here](https://github.com/connectrpc/conformance?tab=readme-ov-file#documentation).

Note that this package does not run any conformance tests itself, but instead exports functionality to be used by other
packages, such as `connect-node`, `connect-web`, etc.

## Updating the conformance version

To update the version of the conformance runner and protos, change the version in the following places:

* The `generate` command of this package's `package.json` file.
* The `version` constant inside `node/conformance.ts`.

<<<<<<< HEAD
=======
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
* Using iptables, redirect traffic from port 443 to a non-privileged port say 8181.
* Create a dedicated user to run the action runner.
* Make sure the user has the necessary permissions to run the conformance runner, read the cert and key that certbot maintains.
* Follow the steps [here](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/adding-self-hosted-runners) to add a self-hosted runner to the repository.
* Configure the runner app to [run as a service](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/configuring-the-self-hosted-runner-application-as-a-service) with the created user.
>>>>>>> main

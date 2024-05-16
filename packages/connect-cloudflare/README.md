# Connect-ES on Cloudflare Conformance Tests

This package provides conformance test coverage for Connect-ES on Cloudflare for both clients and servers.

It uses the [conformance runner](https://github.com/connectrpc/conformance/releases) to run the tests.

Cloudflare worker tests are run once every 24 hours and on a release PR. This is because the tests are run on a live 
Cloudflare worker, and deploying a new version of the worker is a slow process.

## Running conformance tests

Run `make testcloudflareconformance` to run all Cloudflare conformance tests for both server and client. The above command
is also available as an npm script: `npm run conformance`.

The individual tests for server and client can also be run via npm:

`npm run conformance:server`
`npm run conformance:client`

### Client tests on Cloudflare

Client tests on Cloudflare require a live server with valid TLS. To run the tests, we set up a 
[self hosted GitHub action runner](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners) 
that runs the conformance runner and exposes the reference server on port 443 over the public internet.

#### Steps to setup the action runner

* Provision a VM with a static public IP address.
* Reserve a domain (can be a subdomain) and point it to the public IP address from the previous step.
* Use [certbot](https://certbot.eff.org/) to setup automatic certificate renewal for the domain.
* Using iptables, redirect traffic from port 443 to a non-privileged port say 8181.
* Create a dedicated user to run the action runner.
* Make sure the user has the necessary permissions to run the conformance runner, read the cert and key that certbot maintains.
* Follow the steps [here](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/adding-self-hosted-runners) to add a self-hosted runner to the repository.
* Configure the runner app to [run as a service](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/configuring-the-self-hosted-runner-application-as-a-service) with the created user.

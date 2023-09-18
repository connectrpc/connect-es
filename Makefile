# See https://tech.davis-hansson.com/p/make/
SHELL := bash
.DELETE_ON_ERROR:
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := all
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules
MAKEFLAGS += --no-print-directory
TMP   = .tmp
BIN   = .tmp/bin
BUILD = .tmp/build
GEN   = .tmp/gen
CONFORMANCE_VERSION := 0b07f579cb61ad89de24524d62f804a2b03b1acf
LICENSE_HEADER_YEAR_RANGE := 2021-2023
LICENSE_IGNORE := -e .tmp\/ -e node_modules\/ -e packages\/.*\/src\/gen\/ -e packages\/.*\/dist\/ -e scripts\/
NODE20_VERSION ?= v20.0.0
NODE19_VERSION ?= v19.9.0
NODE18_VERSION ?= v18.16.0
NODE16_VERSION ?= v16.20.0
NODE_OS = $(subst Linux,linux,$(subst Darwin,darwin,$(shell uname -s)))
NODE_ARCH = $(subst x86_64,x64,$(subst aarch64,arm64,$(shell uname -m)))

node_modules: package-lock.json
	npm ci

node_modules/.bin/protoc-gen-es: node_modules

$(BIN)/license-header: Makefile
	@mkdir -p $(@D)
	GOBIN=$(abspath $(BIN)) go install github.com/bufbuild/buf/private/pkg/licenseheader/cmd/license-header@v1.1.0

$(BIN)/node20: Makefile
	@mkdir -p $(@D)
	curl -sSL https://nodejs.org/dist/$(NODE20_VERSION)/node-$(NODE20_VERSION)-$(NODE_OS)-$(NODE_ARCH).tar.xz | tar xJ -C $(TMP) node-$(NODE20_VERSION)-$(NODE_OS)-$(NODE_ARCH)/bin/node
	mv $(TMP)/node-$(NODE20_VERSION)-$(NODE_OS)-$(NODE_ARCH)/bin/node $(@)
	rm -r $(TMP)/node-$(NODE20_VERSION)-$(NODE_OS)-$(NODE_ARCH)
	@touch $(@)

$(BIN)/node19: Makefile
	@mkdir -p $(@D)
	curl -sSL https://nodejs.org/dist/$(NODE19_VERSION)/node-$(NODE19_VERSION)-$(NODE_OS)-$(NODE_ARCH).tar.xz | tar xJ -C $(TMP) node-$(NODE19_VERSION)-$(NODE_OS)-$(NODE_ARCH)/bin/node
	mv $(TMP)/node-$(NODE19_VERSION)-$(NODE_OS)-$(NODE_ARCH)/bin/node $(@)
	rm -r $(TMP)/node-$(NODE19_VERSION)-$(NODE_OS)-$(NODE_ARCH)
	@touch $(@)

$(BIN)/node18: Makefile
	@mkdir -p $(@D)
	curl -sSL https://nodejs.org/dist/$(NODE18_VERSION)/node-$(NODE18_VERSION)-$(NODE_OS)-$(NODE_ARCH).tar.xz | tar xJ -C $(TMP) node-$(NODE18_VERSION)-$(NODE_OS)-$(NODE_ARCH)/bin/node
	mv $(TMP)/node-$(NODE18_VERSION)-$(NODE_OS)-$(NODE_ARCH)/bin/node $(@)
	rm -r $(TMP)/node-$(NODE18_VERSION)-$(NODE_OS)-$(NODE_ARCH)
	@touch $(@)

$(BIN)/node16: Makefile
	@mkdir -p $(@D)
	curl -sSL https://nodejs.org/dist/$(NODE16_VERSION)/node-$(NODE16_VERSION)-$(NODE_OS)-$(NODE_ARCH).tar.xz | tar xJ -C $(TMP) node-$(NODE16_VERSION)-$(NODE_OS)-$(NODE_ARCH)/bin/node
	mv $(TMP)/node-$(NODE16_VERSION)-$(NODE_OS)-$(NODE_ARCH)/bin/node $(@)
	rm -r $(TMP)/node-$(NODE16_VERSION)-$(NODE_OS)-$(NODE_ARCH)
	@touch $(@)

$(BUILD)/protoc-gen-connect-es: node_modules tsconfig.base.json packages/protoc-gen-connect-es/tsconfig.json $(shell find packages/protoc-gen-connect-es/src -name '*.ts')
	npm run -w packages/protoc-gen-connect-es clean
	npm run -w packages/protoc-gen-connect-es build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/connect: $(GEN)/connect node_modules packages/connect/package.json packages/connect/scripts/* tsconfig.base.json packages/connect/tsconfig.json $(shell find packages/connect/src -name '*.ts') packages/connect/*.js
	npm run -w packages/connect clean
	npm run -w packages/connect build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/connect-node: $(BUILD)/connect packages/connect-node/tsconfig.json $(shell find packages/connect-node/src -name '*.ts')
	npm run -w packages/connect-node clean
	npm run -w packages/connect-node build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/connect-fastify: $(BUILD)/connect $(BUILD)/connect-node packages/connect-fastify/tsconfig.json $(shell find packages/connect-fastify/src -name '*.ts')
	npm run -w packages/connect-fastify clean
	npm run -w packages/connect-fastify build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/connect-express: $(BUILD)/connect $(BUILD)/connect-node packages/connect-express/tsconfig.json $(shell find packages/connect-express/src -name '*.ts')
	npm run -w packages/connect-express clean
	npm run -w packages/connect-express build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/connect-next: $(BUILD)/connect $(BUILD)/connect-node packages/connect-next/tsconfig.json $(shell find packages/connect-next/src -name '*.ts')
	npm run -w packages/connect-next clean
	npm run -w packages/connect-next build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/connect-web: $(BUILD)/connect packages/connect-web/tsconfig.json $(shell find packages/connect-web/src -name '*.ts')
	npm run -w packages/connect-web clean
	npm run -w packages/connect-web build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/connect-web-test: $(BUILD)/connect-web $(GEN)/connect-web-test packages/connect-web-test/tsconfig.json $(shell find packages/connect-web-test/src -name '*.ts')
	npm run -w packages/connect-web-test clean
	npm run -w packages/connect-web-test build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/connect-node-test: $(BUILD)/connect-node $(BUILD)/connect-fastify $(BUILD)/connect-express $(BUILD)/connect-next $(GEN)/connect-node-test packages/connect-node-test/tsconfig.json $(shell find packages/connect-node-test/src -name '*.ts')
	npm run -w packages/connect-node-test clean
	npm run -w packages/connect-node-test build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/example: $(GEN)/example $(BUILD)/connect-web packages/example/tsconfig.json $(shell find packages/example/src -name '*.ts')
	npm run -w packages/example lint
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/connect-migrate: packages/connect-migrate/package.json packages/connect-migrate/tsconfig.json $(shell find packages/connect-migrate/src -name '*.ts')
	npm run -w packages/connect-migrate clean
	npm run -w packages/connect-migrate build
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/connect: node_modules/.bin/protoc-gen-es packages/connect/buf.gen.yaml $(shell find packages/connect/src -name '*.proto') Makefile
	rm -rf packages/connect/src/gen/*
	npm run -w packages/connect generate
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/connect-web-test: node_modules/.bin/protoc-gen-es $(BUILD)/protoc-gen-connect-es packages/connect-web-test/buf.gen.yaml Makefile
	rm -rf packages/connect-web-test/src/gen/*
	npm run -w packages/connect-web-test generate https://github.com/connectrpc/conformance.git#ref=$(CONFORMANCE_VERSION),subdir=proto
	npm run -w packages/connect-web-test generate buf.build/connectrpc/eliza:8bde2b90ec0a7f23df3de5824bed0b6ea2043305
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/connect-node-test: node_modules/.bin/protoc-gen-es $(BUILD)/protoc-gen-connect-es packages/connect-node-test/buf.gen.yaml Makefile
	rm -rf packages/connect-node-test/src/gen/*
	npm run -w packages/connect-node-test generate https://github.com/connectrpc/conformance.git#ref=$(CONFORMANCE_VERSION),subdir=proto
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/connect-web-bench: node_modules/.bin/protoc-gen-es $(BUILD)/protoc-gen-connect-es packages/connect-web-bench/buf.gen.yaml Makefile
	rm -rf packages/connect-web-bench/src/gen/*
	npm run -w packages/connect-web-bench generate buf.build/connectrpc/eliza:8bde2b90ec0a7f23df3de5824bed0b6ea2043305
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/example: node_modules/.bin/protoc-gen-es $(BUILD)/protoc-gen-connect-es packages/example/buf.gen.yaml $(shell find packages/example -name '*.proto')
	rm -rf packages/example/src/gen/*
	npx -w packages/example buf generate
	@mkdir -p $(@D)
	@touch $(@)


.PHONY: help
help: ## Describe useful make targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "%-30s %s\n", $$1, $$2}'

.PHONY: all
all: build test format lint bench ## build, test, format, lint, and bench (default)

.PHONY: clean
clean: conformanceserverstop ## Delete build artifacts and installed dependencies
	@# -X only removes untracked files, -d recurses into directories, -f actually removes files/dirs
	git clean -Xdf

.PHONY: build
build: $(BUILD)/connect $(BUILD)/connect-web $(BUILD)/connect-node $(BUILD)/connect-fastify $(BUILD)/connect-express $(BUILD)/connect-next $(BUILD)/protoc-gen-connect-es $(BUILD)/example $(BUILD)/connect-migrate ## Build

.PHONY: test
test: testconnectpackage testconnectnodepackage testnode testwebnode testwebbrowser testconnectmigrate ## Run all tests, except browserstack

.PHONY: testconnectpackage
testconnectpackage: $(BUILD)/connect
	npm run -w packages/connect jasmine

.PHONY: testconnectnodepackage
testconnectnodepackage: $(BIN)/node16 $(BIN)/node18 $(BIN)/node19 $(BIN)/node20 $(BUILD)/connect-node
	cd packages/connect-node && PATH="$(abspath $(BIN)):$(PATH)" node16 --trace-warnings ../../node_modules/.bin/jasmine --config=jasmine.json
	cd packages/connect-node && PATH="$(abspath $(BIN)):$(PATH)" node18 --trace-warnings ../../node_modules/.bin/jasmine --config=jasmine.json
	cd packages/connect-node && PATH="$(abspath $(BIN)):$(PATH)" node19 --trace-warnings ../../node_modules/.bin/jasmine --config=jasmine.json
	cd packages/connect-node && PATH="$(abspath $(BIN)):$(PATH)" node20 --trace-warnings ../../node_modules/.bin/jasmine --config=jasmine.json

.PHONY: testnode
testnode: $(BIN)/node16 $(BIN)/node18 $(BIN)/node19 $(BIN)/node20 $(BUILD)/connect-node-test
	$(MAKE) conformanceserverrun
	cd packages/connect-node-test && PATH="$(abspath $(BIN)):$(PATH)" node16 --trace-warnings ../../node_modules/.bin/jasmine --config=jasmine.json
	cd packages/connect-node-test && PATH="$(abspath $(BIN)):$(PATH)" node18 --trace-warnings ../../node_modules/.bin/jasmine --config=jasmine.json
	cd packages/connect-node-test && PATH="$(abspath $(BIN)):$(PATH)" node19 --trace-warnings ../../node_modules/.bin/jasmine --config=jasmine.json
	cd packages/connect-node-test && PATH="$(abspath $(BIN)):$(PATH)" node20 --trace-warnings ../../node_modules/.bin/jasmine --config=jasmine.json
	$(MAKE) conformanceserverstop

.PHONY: testwebnode
testwebnode: $(BIN)/node18 $(BUILD)/connect-web-test
	$(MAKE) conformanceserverrun
	$(MAKE) connectnodeserverrun
	cd packages/connect-web-test && PATH="$(abspath $(BIN)):$(PATH)" NODE_TLS_REJECT_UNAUTHORIZED=0 node18 ../../node_modules/.bin/jasmine --config=jasmine.json
	$(MAKE) conformanceserverstop
	$(MAKE) connectnodeserverstop

.PHONY: testwebbrowser
testwebbrowser: $(BUILD)/connect-web-test
	$(MAKE) conformanceserverrun
	$(MAKE) connectnodeserverrun
	npm run -w packages/connect-web-test karma
	$(MAKE) conformanceserverstop
	$(MAKE) connectnodeserverstop

.PHONY: testwebbrowserlocal
testwebbrowserlocal: $(BUILD)/connect-web-test
	$(MAKE) conformanceserverrun
	$(MAKE) connectnodeserverrun
	npm run -w packages/connect-web-test karma-serve
	$(MAKE) conformanceserverstop
	$(MAKE) connectnodeserverstop

.PHONY: testwebbrowserstack
testwebbrowserstack: $(BUILD)/connect-web-test
	npm run -w packages/connect-web-test karma-browserstack

.PHONY: testconnectmigrate
testconnectmigrate: $(BUILD)/connect-migrate
	npm run -w packages/connect-migrate test

.PHONY: lint
lint: node_modules $(BUILD)/connect-web $(GEN)/connect-web-bench ## Lint all files
	npx eslint --max-warnings 0 .

.PHONY: format
format: node_modules $(BIN)/license-header ## Format all files, adding license headers
	npx prettier --write '**/*.{json,js,jsx,ts,tsx,css}' --log-level error
	comm -23 \
		<(git ls-files --cached --modified --others --no-empty-directory --exclude-standard | sort -u | grep -v $(LICENSE_IGNORE) ) \
		<(git ls-files --deleted | sort -u) | \
		xargs $(BIN)/license-header \
			--license-type "apache" \
			--copyright-holder "The Connect Authors" \
			--year-range "$(LICENSE_HEADER_YEAR_RANGE)"

.PHONY: bench
bench: node_modules $(GEN)/connect-web-bench $(BUILD)/connect-web ## Benchmark code size
	npm run -w packages/connect-web-bench report

.PHONY: setversion
setversion: ## Set a new version in for the project, i.e. make setversion SET_VERSION=1.2.3
	node scripts/set-workspace-version.js $(SET_VERSION)
	rm package-lock.json
	rm -rf node_modules
	npm i
	$(MAKE) all

# Recommended procedure:
# 1. Set a new version with the target `setversion`
# 2. Commit and push all changes
# 3. Login with `npm login`
# 4. Run this target, publishing to npmjs.com
# 5. Tag the release
.PHONY: release
release: all ## Release npm packages
	@[ -z "$(shell git status --short)" ] || (echo "Uncommitted changes found." && exit 1);
	npm publish \
		--workspace packages/connect \
		--workspace packages/connect-web \
		--workspace packages/connect-node \
		--workspace packages/connect-fastify \
		--workspace packages/connect-express \
		--workspace packages/connect-next \
		--workspace packages/protoc-gen-connect-es \
		--workspace packages/connect-migrate \

.PHONY: conformanceserverstop
conformanceserverstop:
	-docker container stop serverconnect servergrpc

.PHONY: conformanceserverrun
conformanceserverrun: conformanceserverstop
	docker run --rm --name serverconnect -p 8080:8080 -p 8081:8081 -d \
		connectrpc/conformance:$(CONFORMANCE_VERSION) \
		/usr/local/bin/serverconnect --h1port "8080" --h2port "8081" --cert "cert/localhost.crt" --key "cert/localhost.key"
	docker run --rm --name servergrpc -p 8083:8083 -d \
		connectrpc/conformance:$(CONFORMANCE_VERSION) \
		/usr/local/bin/servergrpc --port "8083" --cert "cert/localhost.crt" --key "cert/localhost.key"

.PHONY: connectnodeserverrun
connectnodeserverrun: $(BUILD)/connect-node-test
	PATH="$(abspath $(BIN)):$(PATH)" node18 packages/connect-node-test/connect-node-h1-server.mjs restart

.PHONY: connectnodeserverstop
connectnodeserverstop: $(BUILD)/connect-node-test
	PATH="$(abspath $(BIN)):$(PATH)" node18 packages/connect-node-test/connect-node-h1-server.mjs stop

.PHONY: updatelocalhostcert
updatelocalhostcert:
	openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -days 300 -keyout packages/connect-node-test/localhost-key.pem -out packages/connect-node-test/localhost-cert.pem

.PHONY: checkdiff
checkdiff:
	@# Used in CI to verify that `make` does not produce a diff
	test -z "$$(git status --porcelain | tee /dev/stderr)"


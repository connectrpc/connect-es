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
CROSSTEST_VERSION := 2c228a09c52e3a95263034c1fb79119d33ab3258
LICENSE_HEADER_YEAR_RANGE := 2021-2023
LICENSE_IGNORE := -e .tmp\/ -e node_modules\/ -e packages\/.*\/src\/gen\/ -e packages\/.*\/dist\/ -e scripts\/
NODE18_VERSION ?= v18.2.0
NODE16_VERSION ?= v16.15.0
NODE_OS = $(subst Linux,linux,$(subst Darwin,darwin,$(shell uname -s)))
NODE_ARCH = $(subst x86_64,x64,$(subst aarch64,arm64,$(shell uname -m)))

node_modules: package-lock.json
	npm ci

node_modules/.bin/protoc-gen-es: node_modules

$(BIN)/license-header: Makefile
	@mkdir -p $(@D)
	GOBIN=$(abspath $(BIN)) go install github.com/bufbuild/buf/private/pkg/licenseheader/cmd/license-header@v1.1.0

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

$(BUILD)/protoc-gen-connect-web: node_modules tsconfig.base.json packages/protoc-gen-connect-web/tsconfig.json $(shell find packages/protoc-gen-connect-web/src -name '*.ts')
	npm run -w packages/protoc-gen-connect-web clean
	npm run -w packages/protoc-gen-connect-web build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/connect-core: $(GEN)/connect-core node_modules tsconfig.base.json packages/connect-core/tsconfig.json $(shell find packages/connect-core/src -name '*.ts') packages/connect-core/*.js
	npm run -w packages/connect-core clean
	npm run -w packages/connect-core build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/connect-node: $(BUILD)/connect-core packages/connect-node/tsconfig.json $(shell find packages/connect-node/src -name '*.ts')
	npm run -w packages/connect-node clean
	npm run -w packages/connect-node build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/connect-web: node_modules tsconfig.base.json packages/connect-web/tsconfig.json $(shell find packages/connect-web/src -name '*.ts')
	npm run -w packages/connect-web clean
	npm run -w packages/connect-web build
	@mkdir -p $(@D)
	@touch $(@)

# connect-web-next is temporary
$(BUILD)/connect-web-next: $(BUILD)/connect-core packages/connect-web-next/tsconfig.json $(shell find packages/connect-web-next/src -name '*.ts')
	npm run -w packages/connect-web-next clean
	npm run -w packages/connect-web-next build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/connect-web-test: $(BUILD)/connect-web-next $(BUILD)/connect-web $(GEN)/connect-web-test packages/connect-web-test/tsconfig.json $(shell find packages/connect-web-test/src -name '*.ts')
	npm run -w packages/connect-web-test clean
	npm run -w packages/connect-web-test build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/connect-node-test: $(BUILD)/connect-node $(BUILD)/connect-web-next $(GEN)/connect-node-test packages/connect-node-test/tsconfig.json $(shell find packages/connect-node-test/src -name '*.ts')
	npm run -w packages/connect-node-test clean
	npm run -w packages/connect-node-test build
	@mkdir -p $(@D)
	@touch $(@)

$(BUILD)/example: $(GEN)/example $(BUILD)/connect-web packages/example/tsconfig.json $(shell find packages/example/src -name '*.ts')
	npm run -w packages/example lint
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/connect-core: node_modules/.bin/protoc-gen-es packages/connect-core/buf.gen.yaml $(shell find packages/connect-core/src -name '*.proto') Makefile
	rm -rf packages/connect-core/src/gen/*
	npm run -w packages/connect-core generate
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/connect-web-test: node_modules/.bin/protoc-gen-es $(BUILD)/protoc-gen-connect-web packages/connect-web-test/buf.gen.yaml Makefile
	rm -rf packages/connect-web-test/src/gen/*
	npm run -w packages/connect-web-test generate https://github.com/bufbuild/connect-crosstest.git#ref=$(CROSSTEST_VERSION),subdir=internal/proto
	npm run -w packages/connect-web-test generate buf.build/bufbuild/eliza
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/connect-node-test: node_modules/.bin/protoc-gen-es $(BUILD)/protoc-gen-connect-web packages/connect-node-test/buf.gen.yaml Makefile
	rm -rf packages/connect-node-test/src/gen/*
	npm run -w packages/connect-node-test generate https://github.com/bufbuild/connect-crosstest.git#ref=$(CROSSTEST_VERSION),subdir=internal/proto
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/connect-web-bench: node_modules/.bin/protoc-gen-es $(BUILD)/protoc-gen-connect-web packages/connect-web-bench/buf.gen.yaml Makefile
	rm -rf packages/connect-web-bench/src/gen/*
	npm run -w packages/connect-web-bench generate buf.build/bufbuild/eliza:847d7675503fd7aef7137c62376fdbabcf777568
	@mkdir -p $(@D)
	@touch $(@)

$(GEN)/example: node_modules/.bin/protoc-gen-es $(BUILD)/protoc-gen-connect-web packages/example/buf.gen.yaml $(shell find packages/example -name '*.proto')
	rm -rf packages/example/src/gen/*
	npm run -w packages/example buf:generate
	@mkdir -p $(@D)
	@touch $(@)


.PHONY: help
help: ## Describe useful make targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "%-30s %s\n", $$1, $$2}'

.PHONY: all
all: build test format lint bench ## build, test, format, lint, and bench (default)

.PHONY: clean
clean: crosstestserverstop ## Delete build artifacts and installed dependencies
	@# -X only removes untracked files, -d recurses into directories, -f actually removes files/dirs
	git clean -Xdf

.PHONY: build
build: $(BUILD)/connect-core $(BUILD)/connect-web-next $(BUILD)/connect-node $(BUILD)/connect-web $(BUILD)/protoc-gen-connect-web $(BUILD)/example ## Build

.PHONY: test
test: testcore testnode testwebnode testwebbrowser ## Run all tests, except browserstack

.PHONY: testcore
testcore: $(BUILD)/connect-core
	npm run -w packages/connect-core jasmine

.PHONY: testnode
testnode: $(BIN)/node16 $(BIN)/node18 $(BUILD)/connect-node-test
	$(MAKE) crosstestserverrun
	cd packages/connect-node-test && PATH="$(abspath $(BIN)):$(PATH)" node16 --trace-warnings ../../node_modules/.bin/jasmine --config=jasmine.json
	cd packages/connect-node-test && PATH="$(abspath $(BIN)):$(PATH)" node18 --trace-warnings ../../node_modules/.bin/jasmine --config=jasmine.json
	$(MAKE) crosstestserverstop

.PHONY: testwebnode
testwebnode: $(BIN)/node18 $(BUILD)/connect-web-test
	$(MAKE) crosstestserverrun
	$(MAKE) connectnodeserverrun
	cd packages/connect-web-test && PATH="$(abspath $(BIN)):$(PATH)" NODE_TLS_REJECT_UNAUTHORIZED=0 node18 ../../node_modules/.bin/jasmine --config=jasmine.json
	$(MAKE) crosstestserverstop
	$(MAKE) connectnodeserverstop

.PHONY: testwebbrowser
testwebbrowser: $(BUILD)/connect-web-test
	$(MAKE) crosstestserverrun
	$(MAKE) connectnodeserverrun
	npm run -w packages/connect-web-test karma
	$(MAKE) crosstestserverstop
	$(MAKE) connectnodeserverstop

.PHONY: testwebbrowserlocal
testwebbrowserlocal: $(BUILD)/connect-web-test
	$(MAKE) crosstestserverrun
	$(MAKE) connectnodeserverrun
	npm run -w packages/connect-web-test karma-serve
	$(MAKE) crosstestserverstop
	$(MAKE) connectnodeserverstop

.PHONY: testwebbrowserstack
testwebbrowserstack: $(BUILD)/connect-web-test
	npm run -w packages/connect-web-test karma-browserstack

.PHONY: lint
lint: node_modules $(BUILD)/connect-web $(GEN)/connect-web-bench ## Lint all files
	npx eslint --max-warnings 0 .

.PHONY: format
format: node_modules $(BIN)/license-header ## Format all files, adding license headers
	npx prettier --write '**/*.{json,js,jsx,ts,tsx,css}' --loglevel error
	comm -23 \
		<(git ls-files --cached --modified --others --no-empty-directory --exclude-standard | sort -u | grep -v $(LICENSE_IGNORE) ) \
		<(git ls-files --deleted | sort -u) | \
		xargs $(BIN)/license-header \
			--license-type "apache" \
			--copyright-holder "Buf Technologies, Inc." \
			--year-range "$(LICENSE_HEADER_YEAR_RANGE)"

.PHONY: bench
bench: node_modules $(GEN)/connect-web-bench $(BUILD)/connect-web $(BUILD)/connect-web-next ## Benchmark code size
	npm run -w packages/connect-web-bench report

.PHONY: setversion
setversion: ## Set a new version in for the project, i.e. make setversion SET_VERSION=1.2.3
	node scripts/set-workspace-version.js $(SET_VERSION)
	rm package-lock.json
	rm -rf node_modules
	npm i
	$(MAKE) all

# Release @bufbuild/connect-web.
# Recommended procedure:
# 1. Set a new version with the target `setversion`
# 2. Commit and push all changes
# 3. Login with `npm login`
# 4. Run this target, publishing to npmjs.com
# 5. Tag the release
.PHONY: release
release: all ## Release @bufbuild/connect-web
	@[ -z "$(shell git status --short)" ] || (echo "Uncommitted changes found." && exit 1);
	npm publish \
		--workspace packages/connect-web \
		--workspace packages/connect-node \
		--workspace packages/connect-core \
		--workspace packages/protoc-gen-connect-web

.PHONY: crosstestserverstop
crosstestserverstop:
	-docker container stop serverconnect servergrpc

.PHONY: crosstestserverrun
crosstestserverrun: crosstestserverstop
	docker run --rm --name serverconnect -p 8080:8080 -p 8081:8081 -d \
		bufbuild/connect-crosstest:$(CROSSTEST_VERSION) \
		/usr/local/bin/serverconnect --h1port "8080" --h2port "8081" --cert "cert/localhost.crt" --key "cert/localhost.key"
	docker run --rm --name servergrpc -p 8083:8083 -d \
		bufbuild/connect-crosstest:$(CROSSTEST_VERSION) \
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
	@# Used in CI to verify that `make` doesn't produce a diff, but ignore changes in benchmarks
	git checkout packages/connect-web-bench/README.md
	test -z "$$(git status --porcelain | tee /dev/stderr)"


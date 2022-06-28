CACHE_DIR = .cache
SHELL := /usr/bin/env bash -o pipefail
.DEFAULT_GOAL = all
UNAME_OS := $(shell uname -s)
UNAME_ARCH := $(shell uname -m)
export PATH := $(abspath $(CACHE_DIR)/bin):$(abspath node_modules/.bin):$(PATH)


# The crosstest git hash to be used by docker-compose and code generation
CROSSTEST_VERSION := e982fb10e5f9c3e74061b50716317003e3e736b3


# The code generator protoc-gen-es generates message and enum types.
# It is installed via the NPM package @bufbuild/protoc-gen-es.
PROTOC_GEN_ES_BIN := node_modules/.bin/protoc-gen-es
$(PROTOC_GEN_ES_BIN): node_modules


# Install NPM dependencies
# (We need --force so NPM doesn't bail on the platform-specific
# packages in the workspace)
node_modules: package-lock.json
	npm ci --force


# Our code generator protoc-gen-connect-web generates service types
PROTOC_GEN_CONNECT_WEB_BIN := $(CACHE_DIR)/bin/protoc-gen-connect-web
PROTOC_GEN_CONNECT_WEB_SOURCES = go.mod $(shell find . -name '*.go')
$(PROTOC_GEN_CONNECT_WEB_BIN): $(PROTOC_GEN_CONNECT_WEB_SOURCES)
	go build -o $(PROTOC_GEN_CONNECT_WEB_BIN) ./cmd/protoc-gen-connect-web


# The NPM package "@bufbuild/connect-web"
WEB_DIR = packages/connect-web
WEB_BUILD = $(CACHE_DIR)/build/packages-connect-web
WEB_SOURCES = $(WEB_DIR)/*.json $(shell find $(WEB_DIR)/src -name '*.ts')
$(WEB_BUILD): node_modules $(WEB_SOURCES)
	npm run -w $(WEB_DIR) clean
	npm run -w $(WEB_DIR) build
	mkdir -p $(CACHE_DIR)/build && touch $(WEB_BUILD)


# The private NPM package "@bufbuild/connect-web-test" provides test coverage:
TEST_DIR = packages/connect-web-test
TEST_GEN = $(CACHE_DIR)/gen/connect-web-test
TEST_BUILD = $(CACHE_DIR)/build/connect-web-test
TEST_SOURCES = $(shell find $(TEST_DIR)/src -name '*.ts') $(TEST_DIR)/*.json
$(TEST_BUILD): $(TEST_GEN) $(WEB_BUILD) $(TEST_SOURCES)
	cd $(TEST_DIR) && npm run clean && npm run build
	mkdir -p $(dir $(TEST_BUILD)) && touch $(TEST_BUILD)
$(TEST_GEN): $(PROTOC_GEN_CONNECT_WEB_BIN) $(PROTOC_GEN_ES_BIN)
	rm -rf $(TEST_DIR)/src/gen/*
	buf generate https://github.com/bufbuild/connect-crosstest.git#ref=$(CROSSTEST_VERSION),subdir=internal/proto --template $(TEST_DIR)/buf.gen.yaml --output $(TEST_DIR)
	mkdir -p $(dir $(TEST_GEN)) && touch $(TEST_GEN)


# The private NPM package "@bufbuild/bench-codesize" benchmarks code size
BENCHCODESIZE_DIR = packages/bench-codesize
BENCHCODESIZE_BUF_COMMIT=4505cba5e5a94a42af02ebc7ac3a0a04
BENCHCODESIZE_GEN = $(CACHE_DIR)/gen/bench-codesize-$(BENCHCODESIZE_BUF_COMMIT)
$(BENCHCODESIZE_GEN): $(PROTOC_GEN_ES_BIN) $(PROTOC_GEN_CONNECT_WEB_BIN)
	rm -rf $(BENCHCODESIZE_DIR)/src/gen/*
	buf generate buf.build/bufbuild/buf:$(BENCHCODESIZE_BUF_COMMIT) --template $(BENCHCODESIZE_DIR)/buf.gen.yaml --output $(BENCHCODESIZE_DIR)
	mkdir -p $(dir $(BENCHCODESIZE_GEN)) && touch $(BENCHCODESIZE_GEN)


# Ensure that the the crosstest server is running
CROSSTEST_SERVER_RUNNING = $(CACHE_DIR)/service/crosstestserver
$(CROSSTEST_SERVER_RUNNING):
	node make/scripts/service-stop.js $(CROSSTEST_SERVER_RUNNING) dockertestserverup
	node make/scripts/service-start.js $(CROSSTEST_SERVER_RUNNING) dockertestserverup 'localhost:8080,localhost:8081,localhost:8083'


# Install license-header
LICENSE_HEADER_VERSION := v1.1.0
LICENSE_HEADER_LICENSE_TYPE := apache
LICENSE_HEADER_COPYRIGHT_HOLDER := Buf Technologies, Inc.
LICENSE_HEADER_YEAR_RANGE := 2021-2022
LICENSE_HEADER_IGNORES := .cache\/ node_module\/ packages\/bench-codesize\/src\/gen\/ packages\/connect-web\/dist\/ make\/scripts\/ packages\/connect-web-test\/src\/gen
LICENSE_HEADER_DEP := $(CACHE_DIR)/dep/license-header-$(LICENSE_HEADER_VERSION)
$(LICENSE_HEADER_DEP):
	GOBIN=$(abspath $(CACHE_DIR)/bin) go install github.com/bufbuild/buf/private/pkg/licenseheader/cmd/license-header@$(LICENSE_HEADER_VERSION)
	mkdir -p $(dir $(LICENSE_HEADER_DEP)) && touch $(LICENSE_HEADER_DEP)

# Install git-ls-files-unstaged
GIT_LS_FILES_UNSTAGED_VERSION ?= v1.1.0
GIT_LS_FILES_UNSTAGED_DEP := $(CACHE_DIR)/dep/git-ls-files-unstaged-$(GIT_LS_FILES_UNSTAGED_VERSION)
$(GIT_LS_FILES_UNSTAGED_DEP):
	GOBIN=$(abspath $(CACHE_DIR)/bin) go install github.com/bufbuild/buf/private/pkg/git/cmd/git-ls-files-unstaged@$(GIT_LS_FILES_UNSTAGED_VERSION)
	mkdir -p $(dir $(GIT_LS_FILES_UNSTAGED_DEP)) && touch $(GIT_LS_FILES_UNSTAGED_DEP)

# Install golangci-lint
GOLANGCI_LINT_VERSION ?= v1.44.0
GOLANGCI_LINT_DEP := $(CACHE_DIR)/dep/golangci-lint-$(GOLANGCI_LINT_VERSION)
$(GOLANGCI_LINT_DEP):
	GOBIN=$(abspath $(CACHE_DIR)/bin) go install github.com/golangci/golangci-lint/cmd/golangci-lint@$(GOLANGCI_LINT_VERSION)
	mkdir -p $(dir $(GOLANGCI_LINT_DEP)) && touch $(GOLANGCI_LINT_DEP)

# Install Node.js v18
NODE18_VERSION ?= v18.2.0
NODE18_DEP := $(CACHE_DIR)/dep/node18-$(GOLANGCI_LINT_VERSION)
NODE18_OS = $(subst Linux,linux,$(subst Darwin,darwin,$(UNAME_OS)))
NODE18_ARCH = $(subst x86_64,x64,$(subst aarch64,arm64,$(UNAME_ARCH)))
$(NODE18_DEP):
	curl -sSL https://nodejs.org/dist/$(NODE18_VERSION)/node-$(NODE18_VERSION)-$(NODE18_OS)-$(NODE18_ARCH).tar.xz | tar xJ -C $(CACHE_DIR) node-$(NODE18_VERSION)-$(NODE18_OS)-$(NODE18_ARCH)/bin/node
	mkdir -p $(CACHE_DIR)/bin
	mv $(CACHE_DIR)/node-$(NODE18_VERSION)-$(NODE18_OS)-$(NODE18_ARCH)/bin/node $(CACHE_DIR)/bin/node18
	rm -r $(CACHE_DIR)/node-$(NODE18_VERSION)-$(NODE18_OS)-$(NODE18_ARCH)
	mkdir -p $(dir $(NODE18_DEP)) && touch $(NODE18_DEP)


# Commands
.PHONY: all clean build test lint format bench-codesize set-version release

help: ## Describe useful make targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "%-30s %s\n", $$1, $$2}'

all: build test format lint bench-codesize ## build, test, format, lint, and bench-codesize (default)

clean: ## Delete build artifacts and installed dependencies
	npm run clean -w $(BENCHCODESIZE_DIR)
	npm run clean -w $(WEB_DIR)
	node make/scripts/service-stop.js $(CROSSTEST_SERVER_RUNNING) dockertestserverup
	$(MAKE) dockertestserverclean
	[ -n "$(CACHE_DIR)" ] && rm -rf $(CACHE_DIR)/*
	rm -rf node_modules
	rm -rf packages/protoc-gen-*/bin/*


build: $(WEB_BUILD) $(PROTOC_GEN_CONNECT_WEB_BIN) ## Build

test: dockertestserverclean  ## Run all tests
	$(MAKE) test-go
	$(MAKE) test-node
	$(MAKE) test-browser

test-go:
	go test ./cmd/...

test-node: $(NODE18_DEP) $(TEST_BUILD) $(CROSSTEST_SERVER_RUNNING)
	cd $(TEST_DIR) && NODE_TLS_REJECT_UNAUTHORIZED=0 node18 ../../node_modules/.bin/jasmine --config=jasmine.json

test-browser: $(TEST_BUILD) $(CROSSTEST_SERVER_RUNNING)
	npm run -w $(TEST_DIR) karma

test-local-browser: $(TEST_BUILD) $(CROSSTEST_SERVER_RUNNING)
	npm run -w $(TEST_DIR) karma-serve

lint: $(GOLANGCI_LINT_DEP) node_modules $(WEB_BUILD) $(BENCHCODESIZE_GEN) ## Lint all files
	golangci-lint run
	npx eslint --max-warnings 0 .

format: node_modules $(GIT_LS_FILES_UNSTAGED_DEP) $(LICENSE_HEADER_DEP) ## Format all files, adding license headers
	go fmt ./cmd/...
	npx prettier --write '**/*.{json,js,jsx,ts,tsx,css}' --loglevel error
	git-ls-files-unstaged | \
		grep -v $(patsubst %,-e %,$(sort $(LICENSE_HEADER_IGNORES))) | \
		xargs license-header \
			--license-type "$(LICENSE_HEADER_LICENSE_TYPE)" \
			--copyright-holder "$(LICENSE_HEADER_COPYRIGHT_HOLDER)" \
			--year-range "$(LICENSE_HEADER_YEAR_RANGE)"

bench-codesize: $(BENCHCODESIZE_GEN) node_modules $(WEB_BUILD) ## Benchmark code size
	npm run -w $(BENCHCODESIZE_DIR) report

set-version: ## Set a new version in for the project, i.e. make set-version SET_VERSION=1.2.3
	node make/scripts/update-go-version-file.js cmd/protoc-gen-connect-web/main.go $(SET_VERSION)
	node make/scripts/set-workspace-version.js $(SET_VERSION)
	node make/scripts/go-build-npm.js packages/protoc-gen-connect-web ./cmd/protoc-gen-connect-web
	rm package-lock.json
	rm -rf node_modules
	npm i -f
	$(MAKE) all

# Release @bufbuild/connect-web.
# Recommended procedure:
# 1. Set a new version with the target `set-version`
# 2. Commit and push all changes
# 3. Login with `npm login`
# 4. Run this target, publishing to npmjs.com
# 5. Tag the release
release: all ## Release @bufbuild/connect-web
	@[ -z "$(shell git status --short)" ] || (echo "Uncommitted changes found." && exit 1);
	node make/scripts/go-build-npm.js packages/protoc-gen-connect-web ./cmd/protoc-gen-connect-web
	npm publish \
		--access restricted \
		--workspace packages/connect-web \
		--workspace packages/protoc-gen-connect-web \
		--workspace packages/protoc-gen-connect-web-darwin-64 \
		--workspace packages/protoc-gen-connect-web-darwin-arm64 \
		--workspace packages/protoc-gen-connect-web-freebsd-64 \
		--workspace packages/protoc-gen-connect-web-freebsd-arm64 \
		--workspace packages/protoc-gen-connect-web-linux-32 \
		--workspace packages/protoc-gen-connect-web-linux-64 \
		--workspace packages/protoc-gen-connect-web-linux-arm \
		--workspace packages/protoc-gen-connect-web-linux-arm64 \
		--workspace packages/protoc-gen-connect-web-netbsd-64 \
		--workspace packages/protoc-gen-connect-web-openbsd-64 \
		--workspace packages/protoc-gen-connect-web-windows-32 \
		--workspace packages/protoc-gen-connect-web-windows-64 \
		--workspace packages/protoc-gen-connect-web-windows-arm64


# Some builds need code generation, some code generation needs builds.
# We expose this target only for ci, so it can check for diffs.
ci-generate: $(BENCHCODESIZE_GEN) $(TEST_GEN)

dockertestserverclean:
	-node make/scripts/service-stop.js $(CROSSTEST_SERVER_RUNNING) dockertestserverup
	-docker container stop connect-crosstest-server-connect
	-docker container stop connect-crosstest-server-grpc
	# clean up errors are ignored

dockertestserverup: dockertestserverclean
	docker run --rm --name connect-crosstest-server-connect -d \
		-p 8080:8080 -p 8081:8081 \
		bufbuild/connect-crosstest:${CROSSTEST_VERSION} \
		/usr/local/bin/serverconnect \
		--h1port "8080" --h2port "8081" \
		--cert "cert/localhost.crt" --key "cert/localhost.key"
	docker run --rm --name connect-crosstest-server-grpc -d \
		-p 8083:8083 \
		bufbuild/connect-crosstest:${CROSSTEST_VERSION} \
		/usr/local/bin/servergrpc \
		--port "8083" \
		--cert "cert/localhost.crt" --key "cert/localhost.key"

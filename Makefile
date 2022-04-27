CACHE_DIR = .cache
SHELL := /usr/bin/env bash -o pipefail
.DEFAULT_GOAL = all
export PATH := $(abspath $(CACHE_DIR)/bin):$(PATH)

# TODO remove after the repository has been made public
export GOPRIVATE := github.com/bufbuild/protobuf-es


# The code generator protoc-gen-es generates message and enum types.
# It is installed via the NPM package @bufbuild/protoc-gen-es.
PROTOC_GEN_ES_BIN := node_modules/.bin/protoc-gen-es
$(PROTOC_GEN_ES_BIN): node_modules


# Our code generator protoc-gen-connect-web generates service types
PROTOC_GEN_CONNECT_WEB_BIN := $(CACHE_DIR)/protoc-gen-connect-web
PROTOC_GEN_CONNECT_WEB_SOURCES = go.mod $(shell find . -name '*.go')
$(PROTOC_GEN_CONNECT_WEB_BIN): $(PROTOC_GEN_CONNECT_WEB_SOURCES)
	go build -o $(PROTOC_GEN_CONNECT_WEB_BIN) ./cmd/protoc-gen-connect-web


# Install NPM dependencies
# (We need --force so NPM doesn't bail on the platform-specific
# packages in the workspace)
node_modules: package-lock.json
	npm ci --force


# The NPM package "@bufbuild/connect-web"
WEB_DIR = packages/connect-web
WEB_BUILD = $(CACHE_DIR)/build/packages-connect-web
WEB_SOURCES = $(WEB_DIR)/*.json $(shell find $(WEB_DIR)/src -name '*.ts')
$(WEB_BUILD): node_modules $(WEB_SOURCES)
	cd $(WEB_DIR) && npm run clean && npm run build
	mkdir -p $(CACHE_DIR)/build && touch $(WEB_BUILD)


# The private NPM package "@bufbuild/connect-web-test" provides test coverage:
TEST_DIR = packages/connect-web-test
TEST_GEN = $(CACHE_DIR)/gen/connect-web-test
TEST_BUILD = $(CACHE_DIR)/build/connect-web-test
TEST_SOURCES = $(shell find $(TEST_DIR)/src -name '*.ts') $(TEST_DIR)/*.json
$(TEST_BUILD): $(WEB_BUILD) $(TEST_SOURCES)
	cd $(TEST_DIR) && npm run clean && npm run build
	mkdir -p $(dir $(TEST_BUILD)) && touch $(TEST_BUILD)


# The private NPM package "@bufbuild/bench-codesize" benchmarks code size
BENCHCODESIZE_DIR = packages/bench-codesize
BENCHCODESIZE_BUF_COMMIT=4505cba5e5a94a42af02ebc7ac3a0a04
BENCHCODESIZE_GEN = $(CACHE_DIR)/gen/bench-codesize-$(BENCHCODESIZE_BUF_COMMIT)
BUF_GENERATE_TEMPLATE = '\
{\
	"version": "v1",\
	"plugins": [\
		{\
			"name":"es", \
			"path": "$(PROTOC_GEN_ES_BIN)",\
			"out": "$(BENCHCODESIZE_DIR)/src/gen/connectweb",\
			"opt": "ts_nocheck=false,target=ts"\
		},{\
			"name":"connect-web", \
			"path": "$(PROTOC_GEN_CONNECT_WEB_BIN)",\
			"out": "$(BENCHCODESIZE_DIR)/src/gen/connectweb",\
			"opt": "ts_nocheck=false,target=ts"\
		},{\
			"remote":"buf.build/protocolbuffers/plugins/js:v3.19.3-1", \
			"out": "$(BENCHCODESIZE_DIR)/src/gen/grpcweb", \
			"opt": "import_style=commonjs"\
		},{\
			"remote":"buf.build/grpc/plugins/web:v1.3.1-2", \
			"out": "$(BENCHCODESIZE_DIR)/src/gen/grpcweb", \
			"opt": "import_style=commonjs+dts,mode=grpcweb"\
		}\
	]\
}'
$(BENCHCODESIZE_GEN): $(PROTOC_GEN_ES_BIN) $(PROTOC_GEN_CONNECT_WEB_BIN)
	rm -rf $(BENCHCODESIZE_DIR)/src/gen/*
	buf generate buf.build/bufbuild/buf:$(BENCHCODESIZE_BUF_COMMIT) --template $(BUF_GENERATE_TEMPLATE)
	mkdir -p $(dir $(BENCHCODESIZE_GEN)) && touch $(BENCHCODESIZE_GEN)


# Install license-header
LICENSE_HEADER_VERSION := v1.1.0
LICENSE_HEADER_LICENSE_TYPE := apache
LICENSE_HEADER_COPYRIGHT_HOLDER := Buf Technologies, Inc.
LICENSE_HEADER_YEAR_RANGE := 2021-2022
LICENSE_HEADER_IGNORES := .cache\/ node_module\/ packages\/bench-codesize\/src\/gen\/ packages\/connect-web\/dist\/
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


# Commands
.PHONY: all clean build test lint format bench-codesize set-version release

help: ## Describe useful make targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "%-30s %s\n", $$1, $$2}'

all: build test format lint bench-codesize ## build, test, format, lint, and bench-codesize (default)

clean: ## Delete build artifacts and installed dependencies
	cd $(BENCHCODESIZE_DIR); npm run clean
	cd $(WEB_DIR); npm run clean
	[ -n "$(CACHE_DIR)" ] && rm -rf $(CACHE_DIR)/*
	rm -rf node_modules
	rm -rf packages/protoc-gen-*/bin/*

build: $(WEB_BUILD) $(PROTOC_GEN_CONNECT_WEB_BIN) ## Build

test: test-go test-jest ## Run all tests

test-go:
	go test ./cmd/...

test-jest: $(TEST_BUILD) $(TEST_DIR)/*.config.js
	cd $(TEST_DIR) && NODE_OPTIONS=--experimental-vm-modules npx jest

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
	cd $(BENCHCODESIZE_DIR) && npm run report

set-version: ## Set a new version in for the project, i.e. make set-version SET_VERSION=1.2.3
	node make/scripts/update-go-version-file.js cmd/protoc-gen-connect-web/version.go $(SET_VERSION)
	node make/scripts/set-workspace-version.js $(SET_VERSION)
	node make/scripts/go-build-npm.js packages/protoc-gen-connect-web ./cmd/protoc-gen-connect-web
	rm package-lock.json
	npm i -f

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

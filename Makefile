CACHE_DIR = .cache
CACHE_BIN := $(CACHE_DIR)/bin
SHELL := /usr/bin/env bash -o pipefail
.DEFAULT_GOAL = default

# We use the official protocolbuffers implementation to:
# 1. generate wkt as part of the NPM package "@bufbuild/protobuf"
# 2. test conformance
# 3. test .proto file compilation
GOOGPROTOBUF_VERSION = 3.19.4
GOOGPROTOBUF_SOURCE_URL = https://github.com/protocolbuffers/protobuf/releases/download/v$(GOOGPROTOBUF_VERSION)/protobuf-all-$(GOOGPROTOBUF_VERSION).tar.gz
GOOGPROTOBUF_SOURCE = $(CACHE_DIR)/protobuf-$(GOOGPROTOBUF_VERSION)
GOOGPROTOBUF_WKT_PROTOS = google/protobuf/api.proto google/protobuf/any.proto google/protobuf/compiler/plugin.proto google/protobuf/descriptor.proto google/protobuf/duration.proto google/protobuf/descriptor.proto google/protobuf/empty.proto google/protobuf/field_mask.proto google/protobuf/source_context.proto google/protobuf/struct.proto google/protobuf/timestamp.proto google/protobuf/type.proto google/protobuf/wrappers.proto
GOOGPROTOBUF_CONFORMANCE_RUNNER_BIN = $(GOOGPROTOBUF_SOURCE)/bazel-bin/conformance_test_runner
GOOGPROTOBUF_PROTOC_BIN = $(GOOGPROTOBUF_SOURCE)/bazel-bin/protoc
$(GOOGPROTOBUF_SOURCE):
	mkdir -p $(CACHE_DIR)/protobuf-$(GOOGPROTOBUF_VERSION)
	curl --silent -L $(GOOGPROTOBUF_SOURCE_URL) > $(CACHE_DIR)/protobuf-$(GOOGPROTOBUF_VERSION).tar.gz
	tar -xzf $(CACHE_DIR)/protobuf-$(GOOGPROTOBUF_VERSION).tar.gz -C $(CACHE_DIR)/
$(GOOGPROTOBUF_PROTOC_BIN): $(GOOGPROTOBUF_SOURCE)
	cd $(CACHE_DIR)/protobuf-$(GOOGPROTOBUF_VERSION) && bazel build protoc
	touch $(GOOGPROTOBUF_PROTOC_BIN)
$(GOOGPROTOBUF_CONFORMANCE_RUNNER_BIN): $(GOOGPROTOBUF_SOURCE)
	cd $(CACHE_DIR)/protobuf-$(GOOGPROTOBUF_VERSION) && bazel build test_messages_proto3_proto conformance_proto conformance_test conformance_test_runner
export PATH := $(abspath $(GOOGPROTOBUF_SOURCE)/bazel-bin):$(abspath $(CACHE_BIN)):$(PATH)


# Our code generator protoc-gen-es generates message and enum types
# It is used within the project to:
# 1. compile .proto files for tests
# 2. generate wkt as part of the NPM package "@bufbuild/protobuf"
PROTOC_GEN_ES_BIN := $(CACHE_DIR)/protoc-gen-es
PROTOC_GEN_ES_SOURCES = go.mod $(shell find . -name '*.go')
$(PROTOC_GEN_ES_BIN): $(PROTOC_GEN_ES_SOURCES)
	go build -o $(PROTOC_GEN_ES_BIN) ./cmd/protoc-gen-es


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


# The NPM package "@bufbuild/protobuf" is the runtime library required by the code our plugin generates
RUNTIME_DIR = packages/protobuf
RUNTIME_GEN = $(CACHE_DIR)/gen/bufbuild-protobuf-wkt-$(GOOGPROTOBUF_VERSION)
RUNTIME_BUILD = $(CACHE_DIR)/build/packages-protobuf
RUNTIME_SOURCES = $(RUNTIME_DIR)/*.json $(RUNTIME_DIR)/src/*.ts $(RUNTIME_DIR)/src/*/*.ts
$(RUNTIME_BUILD): node_modules $(RUNTIME_GEN) $(RUNTIME_SOURCES)
	cd $(RUNTIME_DIR) && npm run clean && npm run build
	mkdir -p $(CACHE_DIR)/build && touch $(RUNTIME_BUILD)
$(RUNTIME_GEN): $(GOOGPROTOBUF_PROTOC_BIN) $(PROTOC_GEN_ES_BIN)
	$(GOOGPROTOBUF_PROTOC_BIN) -I $(GOOGPROTOBUF_SOURCE)/src --plugin $(PROTOC_GEN_ES_BIN) --es_out $(RUNTIME_DIR)/src --es_opt bootstrap_wkt=true,ts_nocheck=false $(GOOGPROTOBUF_WKT_PROTOS)
	mkdir -p $(dir $(RUNTIME_GEN)) && touch $(RUNTIME_GEN)


# The NPM package "@bufbuild/connect-web"
WEB_DIR = packages/connect-web
WEB_BUILD = $(CACHE_DIR)/build/packages-connect-web
WEB_SOURCES = $(WEB_DIR)/*.json $(shell find $(WEB_DIR)/src -name '*.ts')
$(WEB_BUILD): node_modules $(WEB_SOURCES)
	cd $(WEB_DIR) && npm run clean && npm run build
	mkdir -p $(CACHE_DIR)/build && touch $(WEB_BUILD)


# The private NPM package "@bufbuild/protobuf-test" is used to test:
# 1. compilation of a large number of .proto files
# 2. conformance
# 3. unit test generated code
# 4. test interoperability with protoc (JSON names)
# Code is run by node.js, both the ESM variant (through the conformance tests),
# as well es the CJS variant (through Jest).
TEST_DIR = packages/protobuf-test
TEST_GEN = $(CACHE_DIR)/gen/packages-test-$(GOOGPROTOBUF_VERSION)
TEST_BUILD = $(CACHE_DIR)/build/packages-test
TEST_SOURCES = $(shell find $(TEST_DIR)/src -name '*.ts') $(TEST_DIR)/*.json
$(TEST_GEN) : protoc = $(GOOGPROTOBUF_PROTOC_BIN) -I $(GOOGPROTOBUF_SOURCE) -I $(GOOGPROTOBUF_SOURCE)/src -I $(TEST_DIR) $(shell cd $(TEST_DIR) && find . -name '*.proto' | cut -sd / -f 2-) google/protobuf/type.proto $(shell cd $(GOOGPROTOBUF_SOURCE)/src && find . -name 'unittest*.proto' | cut -sd / -f 2-) conformance/conformance.proto google/protobuf/test_messages_proto2.proto google/protobuf/test_messages_proto3.proto
$(TEST_GEN): $(GOOGPROTOBUF_SOURCE) $(GOOGPROTOBUF_PROTOC_BIN) $(PROTOC_GEN_ES_BIN) $(PROTOC_GEN_CONNECT_WEB_BIN) $(shell find $(TEST_DIR) -name '*.proto')
	rm -rf $(TEST_DIR)/src/gen/* $(TEST_DIR)/descriptorset.bin
	$(protoc) --plugin $(PROTOC_GEN_ES_BIN) --es_out $(TEST_DIR)/src/gen --es_opt ts_nocheck=false
	$(protoc) --plugin $(PROTOC_GEN_CONNECT_WEB_BIN) --connect-web_out $(TEST_DIR)/src/gen --connect-web_opt ts_nocheck=false
	$(protoc) --descriptor_set_out $(TEST_DIR)/descriptorset.bin --include_imports --include_source_info
	mkdir -p $(dir $(TEST_GEN)) && touch $(TEST_GEN)
$(TEST_BUILD): $(PROTOC_GEN_ES_BIN) $(TEST_GEN) $(RUNTIME_BUILD) $(TEST_SOURCES)
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
			"opt": "ts_nocheck=false"\
		},{\
			"name":"connect-web", \
			"path": "$(PROTOC_GEN_CONNECT_WEB_BIN)",\
			"out": "$(BENCHCODESIZE_DIR)/src/gen/connectweb",\
			"opt": "ts_nocheck=false"\
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


# The license header information in this project
LICENSE_HEADER_VERSION := v1.1.0
LICENSE_HEADER_LICENSE_TYPE := apache
LICENSE_HEADER_COPYRIGHT_HOLDER := Buf Technologies, Inc.
LICENSE_HEADER_YEAR_RANGE := 2020-2022
LICENSE_HEADER_IGNORES := .cache\/ node_module\/ packages\/protobuf-test\/bin\/conformance_esm.js packages\/protobuf-test\/src\/gen\/ packages\/protobuf\/src\/google\/ packages\/bench-codesize\/src\/gen\/ packages\/connect-web\/dist\/ packages\/protobuf\/dist\/ packages\/protobuf-test\/dist\/
GIT_LS_FILES_UNSTAGED_VERSION ?= v1.1.0


# Commands

.PHONY: default clean test-go test-jest test-conformance fuzz-go set-version go-build-npm
default: lint test go-build-npm bench-codesize format

clean:
	cd $(RUNTIME_DIR); npm run clean
	cd $(TEST_DIR); npm run clean
	cd $(BENCHCODESIZE_DIR); npm run clean
	cd $(WEB_DIR); npm run clean
	rm -rf $(CACHE_DIR)/*
	rm -rf node_modules
	rm -rf packages/protoc-gen-*/bin/*

test: test-go test-jest test-conformance

test-jest: $(TEST_BUILD) $(TEST_DIR)/*.config.js
	cd $(TEST_DIR) && npx jest

test-conformance: $(GOOGPROTOBUF_CONFORMANCE_RUNNER_BIN) $(PROTOC_GEN_ES_BIN) $(TEST_BUILD)
	$(GOOGPROTOBUF_CONFORMANCE_RUNNER_BIN) --enforce_recommended --failure_list $(TEST_DIR)/conformance_failing_tests.txt --text_format_failure_list $(TEST_DIR)/conformance_failing_tests_text_format.txt $(TEST_DIR)/bin/conformance_esm.js

test-go: $(TEST_GEN)
	go test ./internal/...

fuzz-go:
	gotip test ./internal/protoplugin -cpu=1 -parallel=1 -fuzz FuzzProtoCamelCase

lint:
	@$(MAKE) checknodiffgenerated
	@$(MAKE) lint-es

lint-es: node_modules $(RUNTIME_BUILD) $(WEB_BUILD) $(TEST_BUILD)
	npx eslint --max-warnings 0 .

format: node_modules
	go fmt ./internal/... ./cmd/...
	npx prettier --write '**/*.{json,js,jsx,ts,tsx,css}' --loglevel error

bench-codesize: $(BENCHCODESIZE_GEN) node_modules $(RUNTIME_BUILD) $(WEB_BUILD)
	cd $(BENCHCODESIZE_DIR) && npm run report

go-build-npm:
	node make/scripts/go-build-npm.js packages/protoc-gen-es ./cmd/protoc-gen-es
	node make/scripts/go-build-npm.js packages/protoc-gen-connect-web ./cmd/protoc-gen-connect-web

set-version:
	node make/scripts/update-go-version-file.js cmd/protoc-gen-es/version.go $(SET_VERSION)
	node make/scripts/update-go-version-file.js cmd/protoc-gen-connect-web/version.go $(SET_VERSION)
	node make/scripts/set-workspace-version.js $(SET_VERSION)

install-license-header:
	GOBIN=$(abspath $(CACHE_BIN)) go install github.com/bufbuild/buf/private/pkg/licenseheader/cmd/license-header@$(LICENSE_HEADER_VERSION)

install-git-ls-files-unstaged:
	GOBIN=$(abspath $(CACHE_BIN)) go install github.com/bufbuild/buf/private/pkg/git/cmd/git-ls-files-unstaged@$(GIT_LS_FILES_UNSTAGED_VERSION)

license-header: install-license-header install-git-ls-files-unstaged
	git-ls-files-unstaged | \
		grep -v $(patsubst %,-e %,$(sort $(LICENSE_HEADER_IGNORES))) | \
		xargs license-header \
			--license-type "$(LICENSE_HEADER_LICENSE_TYPE)" \
			--copyright-holder "$(LICENSE_HEADER_COPYRIGHT_HOLDER)" \
			--year-range "$(LICENSE_HEADER_YEAR_RANGE)"

assert-no-uncommitted:
	[ -z "$(shell git status --short)" ] || echo "Uncommitted changes found." && exit 1;

generate:
	@$(MAKE) license-header

checknodiffgenerated:
	@ if [ -d .git ]; then \
			$(MAKE) __checknodiffgeneratedinternal; \
		else \
			echo "skipping make checknodiffgenerated due to no .git repository" >&2; \
		fi

__checknodiffgeneratedinternal:
	bash make/scripts/checknodiffgenerated.bash $(MAKE) generate

# Release @bufbuild/protobuf.
# Recommended procedure:
# 1. Set a new version with the target `set-version`
# 2. Commit and push all changes
# 3. Login with `npm login`
# 4. Run this target, publishing to npmjs.com
# 5. Tag the release
release-bufbuild-protobuf: assert-no-uncommitted clean test go-build-npm bench-codesize format lint go-build-npm assert-no-uncommitted
	npm publish \
		--access restricted \
		--workspace packages/protobuf \
		--workspace packages/protoc-gen-es \
		--workspace packages/protoc-gen-es-darwin-64 \
		--workspace packages/protoc-gen-es-darwin-arm64 \
		--workspace packages/protoc-gen-es-freebsd-64 \
		--workspace packages/protoc-gen-es-freebsd-arm64 \
		--workspace packages/protoc-gen-es-linux-32 \
		--workspace packages/protoc-gen-es-linux-64 \
		--workspace packages/protoc-gen-es-linux-arm \
		--workspace packages/protoc-gen-es-linux-arm64 \
		--workspace packages/protoc-gen-es-netbsd-64 \
		--workspace packages/protoc-gen-es-openbsd-64 \
		--workspace packages/protoc-gen-es-windows-32 \
		--workspace packages/protoc-gen-es-windows-64 \
		--workspace packages/protoc-gen-es-windows-arm64


# Release @bufbuild/connect-web.
# Recommended procedure:
# 1. Set a new version with the target `set-version`
# 2. Commit and push all changes
# 3. Login with `npm login`
# 4. Run this target, publishing to npmjs.com
# 5. Tag the release
release-bufbuild-connect-web: assert-no-uncommitted clean test go-build-npm bench-codesize format lint go-build-npm assert-no-uncommitted
	npm publish \
		--access restricted \
		--workspace packages/connect-web \
		--workspace packages/protoc-gen-es \
		--workspace packages/protoc-gen-es-darwin-64 \
		--workspace packages/protoc-gen-es-darwin-arm64 \
		--workspace packages/protoc-gen-es-freebsd-64 \
		--workspace packages/protoc-gen-es-freebsd-arm64 \
		--workspace packages/protoc-gen-es-linux-32 \
		--workspace packages/protoc-gen-es-linux-64 \
		--workspace packages/protoc-gen-es-linux-arm \
		--workspace packages/protoc-gen-es-linux-arm64 \
		--workspace packages/protoc-gen-es-netbsd-64 \
		--workspace packages/protoc-gen-es-openbsd-64 \
		--workspace packages/protoc-gen-es-windows-32 \
		--workspace packages/protoc-gen-es-windows-64 \
		--workspace packages/protoc-gen-es-windows-arm64


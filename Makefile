CACHE_DIR = .cache
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
export PATH := $(abspath $(GOOGPROTOBUF_SOURCE)/bazel-bin):$(PATH)


# Our code generator protoc-gen-es generates message and enum types
# It is used within the project to:
# 1. compile .proto files for tests
# 2. generate wkt as part of the NPM package "@bufbuild/protobuf"
PROTOC_GEN_ES_BIN := $(CACHE_DIR)/protoc-gen-es
PROTOC_GEN_ES_SOURCES = go.mod $(shell find . -name '*.go')
$(PROTOC_GEN_ES_BIN): $(PROTOC_GEN_ES_SOURCES)
	go build -o $(PROTOC_GEN_ES_BIN) ./cmd/protoc-gen-es


# Our code generator protoc-gen-connectweb generates service types
PROTOC_GEN_CONNECTWEB_BIN := $(CACHE_DIR)/protoc-gen-connectweb
PROTOC_GEN_CONNECTWEB_SOURCES = go.mod $(shell find . -name '*.go')
$(PROTOC_GEN_CONNECTWEB_BIN): $(PROTOC_GEN_CONNECTWEB_SOURCES)
	go build -o $(PROTOC_GEN_CONNECTWEB_BIN) ./cmd/protoc-gen-connectweb


# Install NPM dependencies
node_modules: package-lock.json
	npm ci


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
$(TEST_GEN): $(GOOGPROTOBUF_SOURCE) $(GOOGPROTOBUF_PROTOC_BIN) $(PROTOC_GEN_ES_BIN) $(PROTOC_GEN_CONNECTWEB_BIN) $(shell find $(TEST_DIR) -name '*.proto')
	rm -rf $(TEST_DIR)/src/gen/* $(TEST_DIR)/descriptorset.bin
	$(protoc) --plugin $(PROTOC_GEN_ES_BIN) --es_out $(TEST_DIR)/src/gen --es_opt ts_nocheck=false
	$(protoc) --plugin $(PROTOC_GEN_CONNECTWEB_BIN) --connectweb_out $(TEST_DIR)/src/gen --connectweb_opt ts_nocheck=false
	$(protoc) --descriptor_set_out $(TEST_DIR)/descriptorset.bin --include_imports
	mkdir -p $(dir $(TEST_GEN)) && touch $(TEST_GEN)
$(TEST_BUILD): $(PROTOC_GEN_ES_BIN) $(TEST_GEN) $(RUNTIME_BUILD) $(TEST_SOURCES)
	cd $(TEST_DIR) && npm run clean && npm run build
	mkdir -p $(dir $(TEST_BUILD)) && touch $(TEST_BUILD)


# The private NPM package "@bufbuild/bench-codesize" benchmarks code size
BENCHCODESIZE_DIR = packages/bench-codesize
BENCHCODESIZE_BUF_COMMIT=4505cba5e5a94a42af02ebc7ac3a0a04
BENCHCODESIZE_GEN = $(CACHE_DIR)/gen/bench-codesize-$(BENCHCODESIZE_BUF_COMMIT)
$(BENCHCODESIZE_GEN): $(PROTOC_GEN_ES_BIN) $(PROTOC_GEN_CONNECTWEB_BIN)
	rm -rf $(BENCHCODESIZE_DIR)/src/gen/*
	buf generate buf.build/bufbuild/buf:$(BENCHCODESIZE_BUF_COMMIT) --template \
		'{"version": "v1", "plugins": [\
			{\
				"name":"es", \
				"path": "$(PROTOC_GEN_ES_BIN)",\
				"out": "$(BENCHCODESIZE_DIR)/src/gen/connectweb",\
				"opt": "ts_nocheck=false"\
			},{\
				"name":"connectweb", \
				"path": "$(PROTOC_GEN_CONNECTWEB_BIN)",\
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
		]}'
	mkdir -p $(dir $(BENCHCODESIZE_GEN)) && touch $(BENCHCODESIZE_GEN)


# The private NPM package "@bufbuild/requestbuilder-poc" is only here temporarily
REQUESTBUILDERPOC_DIR = packages/requestbuilder-poc
REQUESTBUILDERPOC_SOURCES = $(REQUESTBUILDERPOC_DIR)/*.json $(shell find $(REQUESTBUILDERPOC_DIR)/src -name '*.ts')
serve-requestbuilder-poc: node_modules $(RUNTIME_BUILD) $(WEB_BUILD) $(PROTOC_GEN_ES_BIN) $(PROTOC_GEN_CONNECTWEB_BIN)
	buf generate buf.build/bufbuild/buf --template '{"version": "v1", "plugins": [{"name":"es", "out": "$(REQUESTBUILDERPOC_DIR)/src/gen", "path": "$(PROTOC_GEN_ES_BIN)"},{"name":"connectweb", "out": "$(REQUESTBUILDERPOC_DIR)/src/gen", "path": "$(PROTOC_GEN_CONNECTWEB_BIN)"}]}'
	cd $(REQUESTBUILDERPOC_DIR) && npm run serve


# The private NPM package "@bufbuild/connect-web-example" is only here temporarily
WEBEXAMPLE_DIR = packages/connect-web-example
WEBEXAMPLE_SOURCES = $(WEBEXAMPLE_DIR)/*.json $(shell find $(WEBEXAMPLE_DIR)/src -name '*.ts')
WEBEXAMPLE_GEN = $(CACHE_DIR)/gen/web-example
$(WEBEXAMPLE_GEN): $(PROTOC_GEN_ES_BIN) $(PROTOC_GEN_CONNECTWEB_BIN) $(shell find $(WEBEXAMPLE_DIR)/protos -name '*.proto')
	rm -rf $(WEBEXAMPLE_DIR)/src/gen/*
	buf generate $(WEBEXAMPLE_DIR)/protos --template \
		'{"version": "v1", "plugins": [\
			{\
				"name":"es", \
				"out": "$(WEBEXAMPLE_DIR)/src/gen", \
				"path": "$(PROTOC_GEN_ES_BIN)",\
			},{\
				"name":"connectweb", \
				"out": "$(WEBEXAMPLE_DIR)/src/gen", \
				"path": "$(PROTOC_GEN_CONNECTWEB_BIN)"\
			}\
		]}'
	mkdir -p $(dir $(WEBEXAMPLE_GEN)) && touch $(WEBEXAMPLE_GEN)
serve-web-example-client: node_modules $(RUNTIME_BUILD) $(WEB_BUILD) $(WEBEXAMPLE_GEN)
	cd $(WEBEXAMPLE_DIR) && npm run serve



# Commands

.PHONY: default clean test-go test-jest test-conformance fuzz-go set-version go-build-npm
default: test go-build-npm bench-codesize format lint

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

lint: lint-es

lint-es: node_modules $(RUNTIME_BUILD) $(WEB_BUILD) $(TEST_BUILD)
	npx eslint --max-warnings 0 .

format: node_modules
	go fmt ./internal/... ./cmd/...
	npx prettier --write '**/*.{json,js,jsx,ts,tsx,css}' --loglevel error

bench-codesize: $(BENCHCODESIZE_GEN) node_modules $(RUNTIME_BUILD) $(WEB_BUILD)
	cd $(BENCHCODESIZE_DIR) && npm run report

go-build-npm:
	node make/scripts/go-build-npm.js packages/protoc-gen-es ./cmd/protoc-gen-es
	node make/scripts/go-build-npm.js packages/protoc-gen-connectweb ./cmd/protoc-gen-connectweb

set-version:
	node make/scripts/update-go-version-file.js cmd/protoc-gen-es/version.go $(SET_VERSION)
	node make/scripts/update-go-version-file.js cmd/protoc-gen-connectweb/version.go $(SET_VERSION)
	node make/scripts/set-workspace-version.js $(SET_VERSION)


# TODO add a "release" target that cleans and runs all tests, cross compiles, and manages the version


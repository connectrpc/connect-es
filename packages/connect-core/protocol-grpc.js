// Copyright 2021-2022 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// workaround for bundlers that do not support subpath exports.
// // it's unclear whether we should point to cjs or esm here.
// // it's also unclear whether we have to use the subpath export "./protocol-connect.js", or if it should remain "./protocol-connect"
// // it's also unclear whether this works for type declarations.
export * from "./dist/esm/protocol-grpc/index.js";

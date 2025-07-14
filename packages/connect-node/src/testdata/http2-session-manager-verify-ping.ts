// Copyright 2021-2025 The Connect Authors
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

import { Http2SessionManager } from "../http2-session-manager.js";
import * as http2 from "node:http2";
import { parentPort, workerData } from "node:worker_threads";

if (!parentPort) {
  // See packages/connect-node/src/http2-session-manager.spec.ts
  throw new Error("Missing parentPort. Expected to be run in a Worker.");
}

const sm = new Http2SessionManager(workerData, {
  pingIntervalMs: 5, // intentionally short for faster tests
});
sm.request("POST", "/", {}, {}).then((req) => {
  req.close(http2.constants.NGHTTP2_NO_ERROR, () =>
    setTimeout(() => {
      sm.request("POST", "/", {}, {}).then((req) => {
        req.close(http2.constants.NGHTTP2_NO_ERROR, () => {
          parentPort?.postMessage("done");
        });
      });
    }, 10),
  );
});

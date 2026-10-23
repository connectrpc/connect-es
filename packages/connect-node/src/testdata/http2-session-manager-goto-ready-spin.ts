// Copyright 2021-2026 The Connect Authors
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

const mode = process.argv[2];

interface InjectedState {
  t: "connecting" | "closed";
  conn?: Promise<unknown>;
  abort?: () => void;
}

function inject(sm: Http2SessionManager, state: InjectedState) {
  (
    sm as unknown as {
      setState(state: InjectedState): void;
    }
  ).setState(state);
}

const sm = new Http2SessionManager("https://unresolvable-host.some.domain", {
  connectTimeoutMs: 50,
});
const dead = {
  connecting: false,
  destroyed: true,
  closed: true,
};

if (mode === "destroyed-session") {
  inject(sm, {
    t: "connecting",
    conn: Promise.resolve(dead),
    abort() {},
  });
} else if (mode === "closed") {
  let resolveConn: (session: typeof dead) => void = () => {};
  const conn = new Promise<typeof dead>((resolve) => {
    resolveConn = resolve;
  });
  inject(sm, {
    t: "connecting",
    conn,
    abort() {},
  });
  // Runs before gotoReady resumes, so the loop observes closed.
  conn.then(() => {
    inject(sm, { t: "closed" });
  });
  resolveConn(dead);
} else {
  throw new Error("unexpected mode: " + String(mode));
}

async function main() {
  console.log(await sm.connect());
}

void main().catch((err: unknown) => {
  console.error(err);
  process.exitCode = 1;
});

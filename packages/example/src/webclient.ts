// Copyright 2021-2023 Buf Technologies, Inc.
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

import { createPromiseClient } from "@bufbuild/connect";
import { createConnectTransport } from "@bufbuild/connect-web";
import { ElizaService } from "./gen/eliza_connect.js";

// Alternatively, use createGrpcWebTransport here for the gRPC-web
// protocol.
const transport = createConnectTransport({ baseUrl: "/" });

void (async () => {
  const client = createPromiseClient(ElizaService, transport);

  print("What is your name?");
  const name = await prompt();
  print(`> ${name}`);

  for await (const res of client.introduce({ name })) {
    print(res.sentence);
  }

  for (;;) {
    const sentence = await prompt();
    print(`> ${sentence}`);
    const res = await client.say({ sentence });
    print(res.sentence);
  }
})();

function print(text: string): void {
  const p = document.createElement("p");
  p.innerText = text;
  p.scrollIntoView();
  document.querySelector<HTMLElement>("#root")?.append(p);
}

function prompt(): Promise<string> {
  const input = document.createElement("input");
  input.value = "";
  document.querySelector<HTMLElement>("#root")?.append(input);
  input.focus();
  return new Promise<string>((resolve) => {
    input.onkeyup = (ev) => {
      if (ev.key == "Enter" && input.value.length > 0) {
        input.remove();
        input.onkeyup = null;
        resolve(input.value);
      }
    };
  });
}

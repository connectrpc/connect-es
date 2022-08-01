import { createConnectTransport, createPromiseClient } from "@bufbuild/connect-web";
import { ElizaService } from "./eliza_connectweb";

const root = document.querySelector<HTMLElement>("#root")
const input = document.createElement("input");

void (async() => {

  const transport = createConnectTransport({
    baseUrl: "https://demo.connect.build"
  });

  const client = createPromiseClient(ElizaService, transport);

  print("What is your name?")
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
  p.scrollIntoView()
  root?.append(p);
}

function prompt(): Promise<string> {
  input.value = "";
  root?.append(input);
  input.focus();
  return new Promise<string>(resolve => {
    input.onkeyup = ev => {
      if (ev.key == "Enter" && input.value.length > 0) {
        input.remove();
        input.onkeyup = null;
        resolve(input.value);
      }
    };
  });
}

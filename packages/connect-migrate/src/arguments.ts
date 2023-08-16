export interface CommandLineArgs {
  ok: true;
  help: boolean;
  singleQuotes: boolean;
  runInstall: boolean;
}

interface CommandLineError {
  ok: false;
  errorMessage: string;
}

const usage = `USAGE: connect-migrate
Updates references to connect-es packages in your project to use @connectrpc.

Options:
  --single-quotes: Use single quotes instead of double quotes for imports
`;

export function parseCommandLineArgs(
  args: string[]
): CommandLineArgs | CommandLineError {
  const parsed = {
    singleQuotes: false,
    help: false,
    runInstall: false,
  };
  while (args.length > 0) {
    const arg = args.shift();
    switch (arg) {
      case "-h":
      case "--help":
        if (parsed.help) {
          break;
        }
        parsed.help = true;
        process.stdout.write(usage);
        process.exit(0);
        break;
      case "--single-quotes":
        parsed.singleQuotes = true;
        break;
      default:
        return {
          ok: false,
          errorMessage: `unknown argument ${arg}`,
        };
    }
  }
  return { ...parsed, ok: true };
}

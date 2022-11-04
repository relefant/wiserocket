/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable id-length */
import minimist from 'minimist';

export interface ParsedArgsResult {
  groupOrCommand: string;
  coreOptions: {
    h: any;
    help: any;
    d: any;
    debug: any;
    v: any;
    version: any;
  };
  extOptions: {
    [arg: string]: any;
  };
  argsWithoutOptions: string[];
  extraArguments?: string[];
}

function parseArgs(argv = process.argv): ParsedArgsResult {
  // prettier-ignore
  const {
    _,
    h, help,
    d, debug,
    v, version,
    '--': extraArguments,
    ...extOptions
  } = minimist(argv.slice(2), {
    '--': true,
    boolean: ['h', 'help', 'd', 'debug', 'v', 'version'],
  });

  const [groupOrCommand, ...argsWithoutOptions] = _;

  return {
    groupOrCommand,

    // prettier-ignore
    coreOptions: {
      h, help,
      d, debug,
      v, version,
    },

    extOptions, // forwarded to commands
    argsWithoutOptions, // remaining arguments
    extraArguments, // arguments after the ended argument list (--)
  };
}

export { parseArgs };

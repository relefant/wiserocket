import { initEnv } from '@relefant/env';
import { ConsoleFormatter, ConsoleLogSink, superlog, LogToken } from '@relefant/superlog';
import chalk from 'chalk';
import figlet from 'figlet';

import packageJson from '../package.json';

import { CliCommand, CliCommandType } from './cli/CliCommand';
import { CmdError } from './cli/CmdError';
import { InvalidArgsError } from './cli/InvalidArgsError';
import { parseArgs } from './cli/parseArgs';
import { runConvert } from './commands/convert';
import { runVersion } from './commands/version';

// TODO - from package.json
const appName = packageJson.name;
const appVersion = packageJson.version;

class StockRocket2Tool {
  private log = superlog.getLogger('StockRocket2Tool');

  constructor() {
    //
  }

  public async run(): Promise<void> {
    console.log(
      chalk.yellow(
        figlet.textSync('StockRocket2', {
          font: 'Small',
        }),
      ),
    );
    runVersion();

    const args = parseArgs();
    // console.log(args);

    const core = args.coreOptions;

    if (core.version || core.v) {
      process.exit();
    }

    try {
      switch (args.groupOrCommand as CliCommandType) {
        case CliCommand.convert:
          await runConvert(args);
          break;
        default:
        //
      }
    } catch (e) {
      this.handleError(e as Error);
    }
  }

  private handleError(e: Error) {
    if (e instanceof InvalidArgsError) {
      this.log.error(chalk.red(e.message));
      // TODO console.log(e.usage);
    } else if (e instanceof CmdError) {
      this.log.error(chalk.red(e.message));
    } else {
      this.log.error(chalk.red(e.message), e);
    }
  }
}
function initLogging() {
  // Init superlog
  superlog.init({
    enabled: true,
    appName,
    metadata: {},
  });

  // Add console superlog sink
  superlog.registerSink(
    new ConsoleLogSink(
      // new ObjectFormatter({
      //   argsOnly: false,
      // }),
      // new JsonFormatter({
      //   argsOnly: false,
      //   excludeSerializationErrors: true,
      // }),
      new ConsoleFormatter({
        // colourise: false,
        // padLevel: false,
        template: `${LogToken.upTime} ${LogToken.level} [${LogToken.logger}]${LogToken.data}`,
        // superfast: true,
      }),
      // new FastConsoleFormatter({
      //   includeAppName: false,
      //   includeTime: true,
      //   includeLogger: true,
      //   includeLevel: true,
      // }),
    ),
    {
      enabled: true,
      // supportedLevels: ['warn', 'fatal'], // ALL
      loggers: {
        default: 'debug',
        test: 'track',
      },
    },
  );
}

function installUnhandledRejectionsHandler() {
  process.on('unhandledRejection', (reason, _promise) => {
    if (reason instanceof Error) {
      console.error('Unhandled rejection:', reason.stack);
    } else {
      console.error('Unhandled rejection: Unknown');
    }
  });
}

function run() {
  installUnhandledRejectionsHandler();

  initEnv({
    app: appName,
    version: appVersion,
  });
  initLogging();

  const cli = new StockRocket2Tool();
  cli.run();
}

export { run };

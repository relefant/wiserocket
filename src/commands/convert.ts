// import fs from 'fs-extra';
// import path from 'path';
import Wise from 'transferwise';

// import { CmdError } from '../cli/CmdError';
// import { InvalidArgsError } from '../cli/InvalidArgsError';
import { ParsedArgsResult } from '../cli/parseArgs';

interface Args {
  // xmlGameFile: string;
  // metaJsonFile: string;
  // outDir: string;
}

const WISE_OPTIONS = {
  sandboxApiTokenKey: '', // TODO
  apiTokenKey: '97971190-a195-441d-85c9-ea1ff0f178e1', // RSReadOnlyMay2022
};

async function runConvert(args: ParsedArgsResult): Promise<void> {
  const parsedArgs = parseArgs(args);
  parsedArgs;

  const wiseClient = new Wise(WISE_OPTIONS);

  const profiles = await wiseClient.getProfilesV2({});
  console.log(profiles);
  const profileId = profiles[0].id;
  const balances = await wiseClient.getBalancesV3({
    profileId,
  });
  console.log(balances);

  // const quote = await wiseClient.createQuoteV2({
  //   profileId,
  //   sourceCurrency: 'EUR',
  //   targetCurrency: 'GBP',
  //   targetAmount: 19.84,
  //   payOut: 'BALANCE',
  // });
  // console.log(quote);
  // if (quote.createdTime) {
  //   if (quote.rate > 0.85) {
  //     const conversionTransaction = await wiseClient.convertCurrenciesV2({
  //       profileId,
  //       quoteId: quote.id,
  //     });
  //     console.log(conversionTransaction);
  //   }
  // }
}

function parseArgs(_args: ParsedArgsResult): Args {
  // const argsLength = args.argsWithoutOptions.length;
  // let xmlGameFile = '';
  // let metaJsonFile = '';
  // let outDir = '';

  // if (argsLength < 1 || argsLength > 2) {
  //   throw new InvalidArgsError();
  // }

  // xmlGameFile = path.resolve(process.cwd(), args.argsWithoutOptions[0]);

  // // Check xmlFile exists
  // if (!fs.existsSync(xmlGameFile)) {
  //   throw new CmdError(`XML input file:\n${xmlGameFile}\ndoes not exist`);
  // }

  // metaJsonFile = path.resolve(xmlGameFile, '..', `${path.basename(xmlGameFile, '.xml')}-meta.json`);

  // // Check metaJsonFile exists
  // if (!fs.existsSync(metaJsonFile)) {
  //   throw new CmdError(`Metadata file:\n${metaJsonFile}\ndoes not exist`);
  // }

  // if (argsLength === 2) {
  //   outDir = path.resolve(process.cwd(), args.argsWithoutOptions[1]);
  // } else {
  //   outDir = path.resolve(path.dirname(xmlGameFile), 'game');
  //   try {
  //     fs.mkdirSync(outDir);
  //   } catch (e) {
  //     if (e.code !== 'EEXIST') throw e;
  //   }
  // }

  // // Check outDir exists
  // if (!fs.existsSync(outDir)) {
  //   throw new CmdError(`Output directory:\n${outDir}\ndoes not exist`);
  // }

  return {
    // xmlGameFile,
    // metaJsonFile,
    // outDir,
  };
}
export { runConvert };

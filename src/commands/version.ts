import { env } from '@relefant/env';

function runVersion(): void {
  console.log(`${env.app} v${env.appVersion.full}\n`);
}
export { runVersion };

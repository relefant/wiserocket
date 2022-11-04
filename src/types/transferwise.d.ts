/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'transferwise' {
  export = Wise;
}

declare class Wise {
  constructor(options: any);
  getProfilesV2(...options: any): any;
  getBalancesV3(...options: any): any;
}

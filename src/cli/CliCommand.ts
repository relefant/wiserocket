import { EnumType, superenum } from '@relefant/superenum';

const CliCommand = superenum({
  convert: 'convert',
});

export type CliCommandType = EnumType<typeof CliCommand>;

export { CliCommand };

import packageInfo from '../../package.json' with { type: 'json' };

export type ItemType = 'project' | 'alias' | 'path' | 'variable';

export type Param = {
  shortName: string;
  longName: string;
  description: string;
  required?: boolean;
  argument?: string;
  defaultValue?: string;
  allowedValues?: string[];
  action?: (arg?: string) => void;
};

export type AllyProgram = {
  name: string;
  version: string;
  description: string;
  params: Param[];
};

const name = 'ally-cli';
const description = 'CLI utility to manage aliases, paths and variables based on the project/directory.';
const cli: AllyProgram = {
  name,
  description,
  params: [],
  version: packageInfo.version,
};

export default cli;

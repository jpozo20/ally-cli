import { Command } from 'commander';
import packageInfo from '../../package.json' with { type: 'json' };
import { aliasCommand, projectCommand } from './ally-commands.js';

const name = 'ally-cli';
const description = 'CLI utility to manage aliases, paths and variables based on the project/directory.';
const version = packageInfo.version;

const allyProgram = new Command()
  .version(`ally-cli version: ${version}`, '-v, --version', 'Output the current version of the CLI')
  .name(name)
  .description(description)
  .configureHelp({
    sortOptions: true,
    sortSubcommands: true,
    helpWidth: 80,
  }); //.enablePositionalOptions(true);

allyProgram.addCommand(aliasCommand as Command).addCommand(projectCommand as Command);

export default allyProgram;

import DataManager from '@/data/data-manager.js';
import { logDebug, logError } from '@/utils/messages.js';
import { Command } from 'commander';
import packageInfo from '../../package.json' with { type: 'json' };
import { aliasCommand, projectsCommand } from './ally-commands.js';

const name = 'ally-cli';
const version = packageInfo.version;
const description = 'CLI utility to manage aliases, paths and variables based on the project/directory.';

async function initializeCLI() {
  const program = DataManager.getInstance()
    .loadDatabase()
    .then(() => {
      logDebug('Database loaded successfully.');

      const allyProgram = new Command()
        .enablePositionalOptions(true)
        .version(`ally-cli version: ${version}`, '-v, --version', 'Output the current version of the CLI')
        .name(name)
        .description(description)
        .addCommand(aliasCommand as Command)
        .addCommand(projectsCommand as Command)
        .configureHelp({
          sortOptions: true,
          sortSubcommands: false,
          helpWidth: 80,
        })
        .helpOption('-h, --help', 'Display this help page')
        .helpCommand('help [command]', 'Display help for given command');

      return allyProgram;
    })
    .catch((error) => {
      logError('Error loading database: ' + error.message);
      process.exit(1);
    });

  return program;
}

export default initializeCLI;

import { createCommand } from '@commander-js/extra-typings';

const aliasCommand = createCommand('alias').alias('a').description('Manage alias configurations');

const addAlias = aliasCommand
  .command('add')
  .alias('a')
  .description('Add a new alias to the database.')
  .option('-p, --project <name>', 'Name of the project to add aliases to. Defaults to the project in the current path.', '')
  .option('-d, --directory <path>', `Path for a directory to add aliases to. Defaults to the current directory.`, '.')
  .option('-c, --create-project', 'Tells the CLI to make a new project if the specified path is not found in the database', false)
  .argument('<alias...>', 'Aliases to add to the project. Multiple aliases can be specified, separated by spaces.');

const listAliases = aliasCommand
  .command('list')
  .alias('l')
  .description('List all aliases in the database.')
  .option('-p, --project <name>', 'Name of the project to list aliases for. Defaults to the project in the current path.', '')
  .option('-d, --directory <path>', 'Path for a directory to list aliases for. Defaults to the current directory.', '.')
  .option('-a, --all', 'List all aliases in the database, regardless of the project or directory.', false);

const removeAlias = aliasCommand
  .command('remove')
  .alias('rm')
  .description('Remove an alias from the database.')
  .option('-p, --project <name>', 'Name of the project to remove aliases from. Defaults to the project in the current path.', '')
  .option('-d, --directory <path>', 'Path for a directory to remove aliases from. Defaults to the current directory.', '.')
  .option('-a, --all', 'Remove all aliases from the project or directory.', false)
  .option('-n, --no-throw', 'Do not throw an error if an alias in the list does not exist in the project or directory.', false)
  .argument('<alias...>', 'Aliases to remove from the project.');

// Don't show the help command by default
aliasCommand.helpCommand(false);

export default aliasCommand;

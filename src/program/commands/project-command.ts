import { createCommand } from '@commander-js/extra-typings';

const projectCommand = createCommand('project').alias('p').description('Manage projects configurations');

const addProject = projectCommand
  .command('add')
  .alias('a')
  .description(
    `             Add a new project to the database.
                  If no options are provided, it will use the current directory as the project name 
                  and the current path as the project path.`.trim()
  )
  .option('-n, --name <name>', 'Name of the project. Defaults to the current directory name.', '')
  .option('-p, --path <path>', 'Path to the project. Defaults to the current directory.', '')
  .helpOption('-h, --help', 'Display help for this command');

const listProjects = projectCommand
  .command('list')
  .alias('l')
  .description('List all projects in the database.')
  .option('-d, --details', 'Show detailed information about each project.', false);

const removeProject = projectCommand
  .command('remove')
  .alias('rm')
  .description('Remove a project from the database.')
  .argument('<name>', 'Name of the project to remove');

  // Don't show the help command by default
  projectCommand.helpCommand(false);

export default projectCommand;

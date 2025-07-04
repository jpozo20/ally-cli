import { createCommand } from '@commander-js/extra-typings';

import projectsHandler from '@/data/handlers/projects-handler.js';
import onProjectError from '../error-handlers/project-command.errors.js';
import { commandOutputConfiguration, subcommandOutputConfiguration } from '@/utils/error-helper.js';

const projectsCommand = createCommand('projects')
  .alias('p')
  .description('Manage projects configurations')
  .configureOutput(commandOutputConfiguration)
  .exitOverride(() => process.exit(0));

const addCommand = projectsCommand
  .createCommand('add')
  .alias('a')
  .description(
    `             Add a new project to the database.
                  If no options are provided, it will use the current directory as the project name 
                  and the current path as the project path.`.trim()
  )

  .option('-n, --name <name>', 'Name of the project. Defaults to the current directory name.', '')
  .option('-p, --path <path>', 'Path to the project. Defaults to the current directory.', '')
  .helpOption('-h, --help', 'Display help for this command')
  .configureOutput(subcommandOutputConfiguration)
  .action(async (options) => {
    await projectsHandler.addProject(options);
  });

const listCommand = projectsCommand
  .createCommand('list')
  .alias('l')
  .description('List all projects in the database.')
  .option('-d, --details', 'Show detailed information about each project.', false)
  .configureOutput(subcommandOutputConfiguration)
  .action(async (options) => {
    await projectsHandler.listProjects(options.details);
  });

const removeCommand = projectsCommand
  .createCommand('remove')
  .alias('rm')
  .description('Remove a project from the database.')
  .argument('<name>', 'Name of the project to remove')
  .configureOutput(subcommandOutputConfiguration)
  .action(async (name) => {
    await projectsHandler.removeProject(name);
  });

addCommand.exitOverride((err) => onProjectError(err, addCommand));
listCommand.exitOverride((err) => onProjectError(err, listCommand));
removeCommand.exitOverride((err) => onProjectError(err, removeCommand));

projectsCommand.addCommand(addCommand);
projectsCommand.addCommand(listCommand);
projectsCommand.addCommand(removeCommand);

// Don't show the help command by default
projectsCommand.helpCommand(false);

export default projectsCommand;

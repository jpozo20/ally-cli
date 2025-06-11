import projectsHandler from '@/data/handlers/projects-handler.js';
import { createCommand } from '@commander-js/extra-typings';

const projectsCommand = createCommand('projects').alias('p').description('Manage projects configurations');

projectsCommand
  .command('add')
  .alias('a')
  .description(
    `             Add a new project to the database.
                  If no options are provided, it will use the current directory as the project name 
                  and the current path as the project path.`.trim()
  )

  .option('-n, --name <name>', 'Name of the project. Defaults to the current directory name.', '')
  .option('-p, --path <path>', 'Path to the project. Defaults to the current directory.', '')

  .helpOption('-h, --help', 'Display help for this command')
  .action(async (options) => {
    await projectsHandler.addProject(options);
  });

projectsCommand
  .command('list')
  .alias('l')
  .description('List all projects in the database.')
  .option('-d, --details', 'Show detailed information about each project.', false)
  .action(async (options) => {
    await projectsHandler.listProjects(options.details);
  });

projectsCommand
  .command('remove')
  .alias('rm')
  .description('Remove a project from the database.')
  .argument('<name>', 'Name of the project to remove')
  .action(async (name) => {
    await projectsHandler.removeProject(name);
  });

// Don't show the help command by default
projectsCommand.helpCommand(false);

export default projectsCommand;

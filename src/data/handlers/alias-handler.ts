import DataManager from '@/data/data-manager.js';
import projectsHandler from '@/data/handlers/projects-handler.js';
import { logError, logOutput, logSuccess } from '@/utils/messages.js';
import { Alias } from '../models/models.js';

const aliasHandler = {
  /**
   * Adds aliases to a project.
   * @param projectName - The name of the project to add aliases to.
   * @param aliases - An array of Alias objects to add.
   */
  async addAlias(aliases: Alias[], projectName: string = '', path: string = '', createProject: boolean = false) {
    const manager = DataManager.getInstance();
    const projects = await manager.getProjects();
    const project = projects.find((p) => p.name === projectName);

    if (!project) {
      if (createProject) {
        const newProject = await projectsHandler.addProject({ name: projectName, path });
        if (!newProject) {
          logError(`Failed to create project "${projectName}".`);
          return;
        }
        logSuccess(`Created Project "${projectName}" for aliases.`);
      } else {
        logError(`Project "${projectName}" not found.`);
      }
      return;
    }

    if (!project.aliases) project.aliases = [];

    aliases.forEach((alias) => {
      if (project.aliases!.some((a) => a.name === alias.name)) {
        logError(`Alias "${alias.name}" already exists in project "${projectName}".`);
      } else {
        project.aliases!.push(alias);
        logSuccess(`Alias "${alias.name}" added to project "${projectName}".`);
      }
    });

    await manager.saveDatabase();
  },

  //* Lists all aliases for a project.
  /**
   * @param projectName - The name of the project to list aliases for.
   *
   */

  async listAliases(projectName: string = '', directory: string | null = null, all: boolean = false) {
    const manager = DataManager.getInstance();
    const projects = await manager.getProjects();

    if (all) {
      logOutput('Listing all aliases in the database:');
      projects.forEach((p) => {
        if (p.aliases && p.aliases.length > 0) {
          logOutput(`Project: ${p.name}`);
          p.aliases.forEach((alias) => {
            logOutput(`- ${alias.name}: ${alias.command}`);
          });
        } else {
          logOutput(`Project "${p.name}" has no aliases.`);
        }
      });
      return;
    }

    if (!projectName && directory) {
      projectName = directory.split('/').pop() || '';
      logOutput(`No project name provided, using directory name: ${projectName}`);
    }

    if (!projectName && !directory) {
      projectName = process.cwd().split('/').pop() || '';
      logOutput('No project name or directory provided. Using the current directory as the project.');
    }

    const project = projects.find((p) => p.name === projectName);

    if (!project) {
      logError(`Project "${projectName}" not found.`);
      return;
    }

    if (!project.aliases || project.aliases.length === 0) {
      logOutput(`No aliases found for project "${projectName}".`);
      return;
    }

    logOutput(`Aliases for project "${projectName}":`);
    project.aliases.forEach((alias) => {
      logOutput(`- ${alias.name}: ${alias.command}`);
    });
  },

  /**
   * Removes aliases from a project.
   * @param projectName - The name of the project to remove aliases from.
   * @param directory - The directory path to use if no project name is provided.
   * @param all - If true, removes all aliases from the database.
   * @param aliasNames - An array of alias names to remove.
   */
  async removeAlias(projectName: string, aliasNames: string[], directory: string = '', all: boolean = false) {
    const manager = DataManager.getInstance();
    const projects = await manager.getProjects();

    if (all) {
      logOutput('Removing all aliases from the database.');
      projects.forEach((p) => {
        p.aliases = [];
        logSuccess(`Removed all aliases from project "${p.name}".`);
      });
      await manager.saveDatabase();
      return;
    }

    if (!projectName && directory) {
      projectName = directory.split('/').pop() || '';
      logOutput(`No project name provided, using directory name: ${projectName}`);
    }

    if (!projectName && !directory) {
      projectName = process.cwd().split('/').pop() || '';
      logOutput('No project name or directory provided. Using the current directory as the project.');
    }

    const project = projects.find((p) => p.name === projectName);
    if (!project) {
      logError(`Project "${projectName}" not found.`);
      return;
    }

    if (!project.aliases) {
      logError(`No aliases to remove in project "${projectName}".`);
      return;
    }

    let removed = false;
    aliasNames.forEach((aliasName) => {
      const index = project.aliases!.findIndex((a) => a.name === aliasName);
      if (index !== -1) {
        project.aliases!.splice(index, 1);
        logSuccess(`Alias "${aliasName}" removed from project "${projectName}".`);
        removed = true;
      } else {
        logError(`Alias "${aliasName}" not found in project "${projectName}".`);
      }
    });

    if (removed) {
      await manager.saveDatabase();
    }
  },
};

export default aliasHandler;

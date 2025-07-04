import { default as dataManager, default as DataManager } from '@/data/data-manager.js';
import { logError, logOutput, logSuccess } from '@/utils/messages.js';
import { Project } from '../models/models.js';

const projectsHandler = {
  async addProject(options: { name?: string; path?: string }) {
    const manager = DataManager.getInstance();
    const projects = await manager.getProjects();

    if (projects.some((project) => project.name === options.name)) {
      const message = `Project with name "${options.name}" already exists.`;
      logError(message);

      throw new Error(message);
    }

    const currentDir = process.cwd();

    console.log(`Adding a new project with the following options:`, options);
    const projectName = options.name || currentDir.split('/').pop() || 'default-project';
    const projectPath = options.path || currentDir;
    logSuccess(`Adding project: ${projectName} at path: ${projectPath}`);

    const project: Project = {
      name: projectName,
      path: projectPath,
      autoLoad: false,
      aliases: [],
      envVars: [],
      paths: [],
    };

    await manager.addProject(project);
    return project;
  },

  async listProjects(details: boolean) {
    const manager = DataManager.getInstance();
    const projects = await manager.getProjects();

    if (details) {
      console.log('Detailed project information:');
      projects.forEach((project) => {
        logOutput(`Name: ${project.name}, Path: ${project.path}, Auto Load: ${project.autoLoad}`);
      });
    } else {
      logOutput('Projects names:');
      projects.forEach((project) => {
        logOutput(project.name);
      });
    }
  },
  async removeProject(name: string) {
    const manager = DataManager.getInstance();
    const projects = await manager.getProjects();

    const projectIndex = projects.findIndex((project) => project.name === name);
    if (projectIndex === -1) {
      const message = `Project with name "${name}" does not exist.`;
      logError(message);
      
      throw new Error(message);
      //process.exit(0);
    }

    await manager.removeProject(name);
    logSuccess(`Project "${name}" has been removed successfully.`);
  },
};

export default projectsHandler;

import { default as dataManager, default as DataManager } from '../../data/data-manager.js';

const projectsHandler = {
  async addProject(options: { name?: string; path?: string }) {
    const manager = DataManager.getInstance();
    const projects = await manager.getProjects();

    if (projects.some((project) => project.name === options.name)) {
      console.error(`Project with name "${options.name}" already exists.`);
      process.exit(0);
    }

    console.log(`Adding a new project with the following options:`, options);
    await dataManager.addProject(options.name, options.path);
  },

  async listProjects(details: boolean) {
    const manager = DataManager.getInstance();
    const projects = await manager.getProjects();

    if (details) {
      console.log('Detailed project information:');
      projects.forEach((project) => {
        console.log(`Name: ${project.name}, Path: ${project.path}, Auto Load: ${project.autoLoad}`);
      });
    } else {
      console.log('Project names:');
      projects.forEach((project) => {
        console.log(project.name);
      });
    }
  },
  async removeProject(name: string) {
    const manager = DataManager.getInstance();
    const projects = await manager.getProjects();

    const projectIndex = projects.findIndex((project) => project.name === name);
    if (projectIndex === -1) {
      console.error(`Project with name "${name}" does not exist.`);
      process.exit(0);
    }

    await manager.removeProject(name);
    console.log(`Project "${name}" has been removed successfully.`);
  },
};

export default projectsHandler;

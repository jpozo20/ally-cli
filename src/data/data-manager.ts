import fileManager from './file-manager.js';
import { Database, Project } from './models/models.js';

class DataManager {
  database: Database;
  static instance: DataManager;

  private constructor() {
    this.database = {
      projects: [],
    };
  }

  static getInstance() {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  async loadDatabase() {
    try {
      const data = await fileManager.loadData();
      if (data === '' || !data) return this.database;

      const parsedData = JSON.parse(data);
      this.database = parsedData as Database;
    } catch (error) {
      console.error('Error loading database:', error);
    }
  }

  async saveData(data: Project) {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      await fileManager.saveData(jsonData);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  async saveDatabase() {
    try {
      const jsonData = JSON.stringify(this.database, null, 2);
      await fileManager.saveData(jsonData);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  async getProjects() {
    try {
      return this.database.projects;
    } catch (error) {
      console.error('Error retrieving projects:', error);
      return [];
    }
  }

  async addProject(project: Project) {
    this.database.projects.push(project);
    await this.saveDatabase();
  }

  async removeProject(name: string) {
    try {
      console.log(`Removing project: ${name}`);
      const filteredProjects = this.database.projects.filter((project) => project.name !== name);
      this.database.projects = filteredProjects;
      await this.saveDatabase();
    } catch (error) {
      console.error('Error removing project:', error);
    }
  }

  resetDatabase() {
    this.database = {
      projects: [],
    };
  }
}

export default DataManager;

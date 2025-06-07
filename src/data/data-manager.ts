import fileManager from './file-manager.js';
import { Database, Project } from './models/models.js';

class DataManager {
  database: Database;
  static instance: DataManager;

  constructor() {
    this.database = {
      projects: [],
    };
  }

  getInstance() {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  async loadDatabase() {
    try {
      const data = await fileManager.loadData();
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

  async addProject(name: string, path: string) {
    const currentDir = process.cwd();

    const projectName = name || currentDir.split('/').pop() || 'default-project';
    const projectPath = path || currentDir;
    console.log(`Adding project: ${projectName} at path: ${projectPath}`);

    const project: Project = {
      name: projectName,
      path: projectPath,
      autoLoad: false,
      aliases: [],
      envVars: [],
      paths: [],
    };

    this.database.projects.push(project);
    await this.saveDatabase();
  }
}

export default new DataManager();

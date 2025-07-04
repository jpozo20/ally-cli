import { Project } from '@/data/models/models.js';
import { faker } from '@faker-js/faker';
// 


export function getCurrentDir(): string | undefined {
  const proccessDir = process.cwd();
  return proccessDir.split('/').pop();
}

export function getRandomProjects(count: number = 1): Project[] {
  const projects = [];
  for (let i = 0; i < count; i++) {
    const randomName = faker.word.noun();
    const randomName2 = faker.word.noun();
    projects.push({
      name: `${randomName}-${randomName2}`,
      path: faker.system.directoryPath(),
    });
  }

  return projects;
}
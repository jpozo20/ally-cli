import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';

import initializeCLI from '@/program/ally-program.js';
import dataManager from '@/data/data-manager.js';

import * as utils from '@test/test-utils.js';
import * as logger from '@/utils/messages.js';

// Mock the file manager to avoid actual file operations
// This is necessary to prevent the CLI from trying to read/write files during tests
vi.mock('@/data/file-manager.js', async () => {
  const actual = await vi.importActual('@/data/file-manager.js');
  return {
    default: {
      //@ts-ignore This is a workaround to avoid type errors with mocks
      ...actual.default,
      saveData: () => true,
      loadData: () => ({ projects: [] }),
    },
  };
});

beforeEach(() => {
  dataManager.getInstance().resetDatabase();
});

describe('add project', async () => {
  //Spy on process.exit and replace its implementation
  const mockExit = vi.spyOn(process, 'exit').mockImplementation((number) => {
    throw new Error(`process.exit: ${number}`);
  });

  afterAll(() => {
    //Restore the original implementation after all tests
    mockExit.mockRestore();
  });

  const getProgram = async (extraArgs: string[] = [], exitOverride?: boolean) => {
    const program = await initializeCLI();
    if (exitOverride) program.exitOverride();

    await program.parseAsync(['p', 'add', ...extraArgs], { from: 'user' });
    return program;
  };

  it('should add the project to the database', async () => {
    await getProgram();
    const manager = dataManager.getInstance();

    console.log('DataManager instance:', manager);
    const projects = await manager.getProjects();
    expect(projects.length).toBeGreaterThan(0);
  });

  it('should set the project name to the given name', async () => {
    const projectName = 'test-project';
    await getProgram(['--name', projectName]);

    const manager = dataManager.getInstance();
    console.log(manager);
    const project = (await manager.getProjects())[0];
    expect(project.name).toEqual(projectName);
  });

  it('should set the project path to the given path', async () => {
    const projectPath = '/test/path';
    await getProgram(['--path', projectPath]);

    const manager = dataManager.getInstance();
    const project = (await manager.getProjects())[0];
    expect(project.path).toEqual(projectPath);
  });

  it('should log error if project name already exists', async () => {
    const manager = dataManager.getInstance();
    const projectName = 'existing-project';
    const existingProject = { name: projectName, path: '/existing/path' };
    manager.addProject(existingProject);

    const errorMessage = `Project with name "${projectName}" already exists.`;
    const fun = getProgram(['--name', projectName], true);

    await expect(fun).rejects.toThrow(errorMessage);

    mockExit.mockRestore();
  });

  it('when no options are passed, it should set the project name to the current dir', async () => {
    await getProgram();

    const manager = dataManager.getInstance();
    const currentDir = utils.getCurrentDir();
    const project = (await manager.getProjects())[0];

    expect(project.name).toEqual(currentDir);
  });

  it('when no options are passed, it should set the project directory to the current dir', async () => {
    await getProgram();

    const manager = dataManager.getInstance();
    const currentDir = process.cwd();
    const project = (await manager.getProjects())[0];

    expect(project.path).toEqual(currentDir);
  });
});

describe('list projects', async () => {
  const getProgram = async (extraArgs: string[] = [], exitOverride?: boolean) => {
    const program = await initializeCLI();
    if (exitOverride) program.exitOverride();

    await program.parseAsync(['p', 'list', ...extraArgs], { from: 'user' });
    return program;
  };

  it('should list saved projects', async () => {
    const consoleSpy = vi.spyOn(logger, 'logOutput');

    const projectCount = 3;
    const projects = utils.getRandomProjects(projectCount);

    const manager = dataManager.getInstance();
    projects.forEach((project) => manager.addProject(project));

    await getProgram();

    const header = 'Projects names:';
    const hasHeader = consoleSpy.mock.calls.some((call) => call[0].includes(header));
    const hasProjects = projects.every((project) => consoleSpy.mock.calls.some((call) => call[0].includes(project.name)));

    const callCount = consoleSpy.mock.calls.length;
    expect(callCount).toBeGreaterThanOrEqual(projectCount + 1);
    expect(hasHeader).toBeTruthy();
    expect(hasProjects).toBeTruthy();

    consoleSpy.mockRestore();
  });

  describe('remove project', () => {
    const getProgram = async (extraArgs: string[] = [], exitOverride?: boolean) => {
      const program = await initializeCLI();
      if (exitOverride) program.exitOverride();

      await program.parseAsync(['p', 'remove', ...extraArgs], { from: 'user' });
      return program;
    };

    it('should log error if no project name is given', async () => {});

    it('should remove given project', async () => {
      const projectCount = 3;
      const projects = utils.getRandomProjects(projectCount);

      const manager = dataManager.getInstance();
      projects.forEach((project) => manager.addProject(project));
    });
  });
});

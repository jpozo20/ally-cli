// @ts-nocheck

import { describe, it, expect, vi, beforeEach } from 'vitest';

import initializeCLI from '@/program/ally-program.js';
import dataManager from '@/data/data-manager.js';

import * as utils from '@test/test-utils.js';

// Mock the file manager to avoid actual file operations
// This is necessary to prevent the CLI from trying to read/write files during tests
vi.mock('@/data/file-manager.js', async () => {
  const actual = await vi.importActual('@/data/file-manager.js');
  return {
    default: {
      ...actual.default,
      saveData: (data: string) => true,
    },
  };
});

beforeEach(() => {
  dataManager.resetDatabase();
});

describe('add project', async () => {
  const getProgram = async (extraArgs: string[] = [], exitOverride?: boolean) => {
    const program = await initializeCLI();
    if (exitOverride) program.exitOverride();

    await program.parseAsync(['p', 'add', ...extraArgs], { from: 'user' });
    return program;
  };

  it('should add the project to the database', async () => {
    await getProgram();

    const projects = await dataManager.getProjects();
    expect(projects.length).toBeGreaterThan(0);
  });

  it('should set the project name to the given name', async () => {
    const projectName = 'test-project';
    await getProgram(['--name', projectName]);

    console.log(dataManager);
    const project = (await dataManager.getProjects())[0];
    expect(project.name).toEqual(projectName);
  });

  it('should set the project path to the given path', async () => {
    const projectPath = '/test/path';
    await getProgram(['--path', projectPath]);

    const project = (await dataManager.getProjects())[0];
    expect(project.path).toEqual(projectPath);
  });

  it('should log error if project name already exists', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((code) => {
      return;
    });

    const manager = dataManager.getInstance();
    const projectName = 'existing-project';
    const existingProject = { name: projectName, path: '/existing/path' };
    manager.addProject(existingProject);

    const errorMessage = `Project with name "${projectName}" already exists.`;
    await getProgram(['--name', projectName], true);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(errorMessage));
    consoleSpy.mockClear();
    exitSpy.mockClear();
  });

  it('when no options are passed, it should set the project name to the current dir', async () => {
    await getProgram();

    const currentDir = utils.getCurrentDir();
    const project = (await dataManager.getProjects())[0];

    expect(project.name).toEqual(currentDir);
  });

  it('when no options are passed, it should set the project directory to the current dir', async () => {
    await getProgram();

    const currentDir = process.cwd();
    const project = (await dataManager.getProjects())[0];

    expect(project.path).toEqual(currentDir);
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars */

import { logDebug } from '@/utils/messages.js';
import xdg from '@folder/xdg';
import * as atom from 'atomically';
import fs from 'fs';
import os from 'os';
import path from 'path';

const appName = 'ally-cli';
const platform = os.platform();
const dbFileName = 'ally-cli.db';

const isWindows = platform === 'win32';
const isMac = platform === 'darwin';
const isLinux = !isWindows && !isMac;

// const allyPathOnUnix = path.join('.local', 'share', 'ally-cli');
// const allyPathOnWindows = path.join('AppData', 'Local', 'ally-cli');

/**
 * Returns the data directory path for the Ally-cli.
 *
 * On Windows, it returns the path to the data directory in the user's AppData\Local folder
 *
 * On Mac, it returns the path to the data directory in the user's Library/Application Support folder.
 *
 * On Linux, it returns the path to the data directory in the user's .local/share folder.
 * @returns {string} The path to the ally-cli data directory.
 */
const getDataDir = (): string => {
  const dataDir = xdg(platform).data;
  if (dataDir === undefined) {
    throw new Error('Unsupported platform');
  } else {
    return path.join(dataDir, appName);
  }
};

/**
 * Saves data to the ally-cli data directory.
 *
 * On Windows, it saves to the AppData\Local folder.
 *
 * On Mac, it saves to the "Library/Application Support" folder.
 *
 * On Linux, it saves to the .local/share folder.
 *
 * Boilerplate code for now.
 */
const saveData = async (data: string): Promise<boolean> => {
  const dataDir = getDataDir();
  logDebug(`Saving data to ${dataDir}`);

  try {
    // Create the data directory if it doesn't exist
    const finalPath = path.join(dataDir, dbFileName);
    const dirExists = fs.existsSync(dataDir);
    if (!dirExists) {
      logDebug(`Creating data directory: ${dataDir}`);
      fs.mkdirSync(dataDir, { recursive: true });
    }

    logDebug(`Writing data to ${finalPath}, ` + 'data:' + data);
    await atom.writeFile(finalPath, data);
    return true;
  } catch (error) {
    console.error(`Error saving data: ${error}`);
    return false;
  }
};

/**
 * Loads data from the ally-cli data directory.
 *
 * On Windows, it loads from the AppData\Local folder.
 *
 * On Mac, it loads from the "Library/Application Support" folder.
 *
 * On Linux, it loads from the .local/share folder.
 *
 * Boilerplate code for now.
 */
const loadData = async (): Promise<string> => {
  // Add your loading logic here
  const dataDir = getDataDir();
  logDebug(`Loading data from ${dataDir}`);
  try {
    // Create the data directory if it doesn't exist
    const finalPath = path.join(dataDir, dbFileName);
    const dirExists = fs.existsSync(dataDir);
    if (!dirExists) {
      throw new Error(`Data directory does not exist: ${dataDir}`);
    }

    const data = await atom.readFile(finalPath, { encoding: 'utf-8' });
    return data;
  } catch (error) {
    console.error(`Error loading data: ${error}`);
    return '';
  }
};

/**
 * Reads a file from and returns its content.
 *
 * @param {string} filePath - The path to the file to read.
 * @returns {Promise<string>} The contents of the file.
 */
const readFile = async (filePath: string): Promise<string> => {
  try {
    const data = await atom.readFile(filePath, { encoding: 'utf-8' });
    return data;
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error}`);
    return '';
  }
};

export default {
  getDataDir,
  saveData,
  loadData,
  readFile
};

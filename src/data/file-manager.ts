/* eslint-disable @typescript-eslint/no-unused-vars */

import xdg from '@folder/xdg';
import os from 'os';
import path from 'path';

const appName = 'ally-cli';
const platform = os.platform();

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
const saveData = () => {
  const dataDir = getDataDir();
  console.log(`Saving data to ${dataDir}`);

  // Add your saving logic here
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
const loadData = () => {
  const dataDir = getDataDir();
  console.log(`Loading data from ${dataDir}`);

  // Add your loading logic here
};

export default {
  getDataDir,
  saveData,
  loadData,
};

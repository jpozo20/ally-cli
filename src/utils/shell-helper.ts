import { exec } from 'node:child_process';
import util from 'node:util';
import { logDebug, logError, logInfo } from './messages.js';

const execAsync = util.promisify(exec);
const userShell = process.env.SHELL || '/bin/bash';
const shellName = userShell.split('/').pop() || 'bash';
//function execAsync

/**
 * Executes a shell command and returns the output.
 * @param {string} command - The shell command to execute.
 * @returns {Promise<string>} - The output of the command.
 */
export async function executeCommand(command: string): Promise<string> {
  logDebug(`Current shell: ${userShell}`);
  logDebug(`Executing shell command: ${command}`);

  try {
    const interactiveCommand = `${shellName} -i -c "${command}"`;
    const { stdout, stderr } = await execAsync(interactiveCommand, { windowsHide: true });
    //const { stdout, stderr } = await execAsync(command, { windowsHide: false, env: process.env,  });

    if (stderr) {
      logDebug(`Error executing command: ${stderr}`);
      throw new Error(stderr);
    }
    return stdout.trim();
  } catch (error) {
    const errorOutput = error as { stdout: string; stderr: string; message?: string };
    if (errorOutput.stdout != '') {
      return errorOutput.stdout.trim();
    } else {
      logDebug(`Failed to execute2 command "${command}": ${error instanceof Error ? error.message : String(error)}`);
      console.log(error);
      throw error;
    }
  }
}
/**
 *
 * @param aliases - An array of aliases to retrieve from the shell.
 * @returns An array of aliases retrieved from the shell.
 */
export async function getAliasesFromShell(aliases: string[]): Promise<string[]> {
  if (aliases.length === 0) {
    logInfo('No aliases provided. Returning empty array.');
    return [];
  }

  const oneLineAliases = aliases.join(' ');
  const aliasCommand = `alias ${oneLineAliases}`;
  try {
    const output = await executeCommand(aliasCommand);
    const aliasList = output
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line);
    logDebug(`Retrieved aliases from shell: ${aliasList}`);
    return aliasList;
  } catch (error) {
    logError(`Failed to retrieve aliases from shell: ${error instanceof Error ? error.message : String(error)}`);
    return [];
  }
}

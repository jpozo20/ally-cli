import fileManager from '@/data/file-manager.js';
import { Alias } from '@/data/models/models.js';
import { logError, logSuccess } from './messages.js';
import { getAliasesFromShell } from './shell-helper.js';

/**
 * Parses aliases from the shell.
 * @param aliases - An array of alias strings to parse.
 * @returns An array of Alias objects parsed from the shell.
 */
async function parseAliasesFromShell(aliases: string[]): Promise<Alias[]> {
  const shellAliases: string[] = await getAliasesFromShell(aliases);
  if (shellAliases.length === 0) {
    logError('No aliases found in the shell.');
    return [];
  }

  const parsedAliases: Alias[] = shellAliases.map((alias) => {
    const [name, command] = alias.split('=');
    return { name: name.trim(), command: command.trim() };
  });

  if (parsedAliases.length === 1) logSuccess(`Parsed ${parsedAliases.length} alias from shell.`);
  else logSuccess(`Parsed ${parsedAliases.length} aliases from shell.`);
  
  return parsedAliases;
}

/**
 * Parses aliases from a file.
 * @param filePath - The path to the file containing aliases.
 * @returns An array of Alias objects parsed from the file.
 */
async function parseAliasesFromFile(filePath: string) {
  const parsedAliases: Alias[] = [];
  const aliases = await fileManager.readFile(filePath);

  if (!aliases) {
    logError(`No aliases found in file: ${filePath}`);
  }
  const aliasLines = aliases.split('\n').filter((line) => line.trim() !== '');
  aliasLines.forEach((line) => {
    const [name, command] = line.split('=');
    if (name && command) {
      parsedAliases.push({ name: name.trim(), command: command.trim() });
    } else {
      logError(`Invalid alias format in file: ${line}`);
    }
  });

  return parsedAliases;
}

export { parseAliasesFromFile, parseAliasesFromShell };

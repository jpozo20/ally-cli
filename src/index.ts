import { logDebug } from '@/utils/messages.js';
import initializeCLI from './program/ally-program.js';

process.on('uncaughtException', handleError);
process.on('unhandledRejection', handleError);

function handleError(err: unknown) {
  // Exit gracefully on error thrown from ally-cli
  // This is a workaround for the issue with commander.js not handling errors properly
  // Removes stack trace on production and helps running tests
  process.exit(0);
}

logDebug('Starting Ally CLI...');
const allyProgram = await initializeCLI();
await allyProgram.parseAsync();

// const { args, options } = allyProgram;
// console.log(args);

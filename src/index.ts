import { logDebug } from '@/utils/messages.js';
import initializeCLI from './program/ally-program.js';

logDebug('Starting Ally CLI...');
const allyProgram = await initializeCLI();
await allyProgram.parseAsync();

// const { args, options } = allyProgram;
// console.log(args);

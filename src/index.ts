import initializeCLI from './program/ally-program.js';

console.log('Starting Ally CLI...');
const allyProgram = await initializeCLI();
await allyProgram.parseAsync();

const { args, options } = allyProgram;
console.log(args);

// manager.saveData();
// allyProgram.outputHelp()

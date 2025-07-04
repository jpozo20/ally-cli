import { CommanderError } from 'commander';
import { OptionError } from '@/data/models/error-models.js';

export const InvalidOptionArgumentCode = 'commander.optionMissingArgument';
export const InvalidArgumentErrorCode = 'commander.invalidArgument';
export const MissingArgumentErrorCode = 'commander.missingArgument';
export const UnknownOptionErrorCode = 'commander.unknownOption';

/**
 * Extracts the short flag, long flag, and argument name from a CommanderError
 * when the error code is 'commander.optionMissingArgument'.
 * @param {CommanderError} [err] The error object thrown by Commander.js.
 * @returns {OptionError} An object containing the short flag, long flag, and argument name.
 */
export const parseOptionMissingArgument = (err: CommanderError): OptionError => {
  // Extract the short flag, long flag, and argument name from the error message
  // Include the dashes for the flags
  const shortFlag = err.message.match(/(-\w+)/)?.[1] || '';
  const longFlag = err.message.match(/(--\w+)/)?.[1] || '';
  const argumentName = err.message.match(/<(\w+)/)?.[1] || '';

  return {
    shortFlag,
    longFlag,
    argumentName,
    commanderCode: InvalidOptionArgumentCode,
  };
};

export const parseUnknownOption = (err: CommanderError): string => {
  // Extract the unknown option from the error message
  // The regex captures the content inside single quotes
  // Example: "Unknown option: '--foobar'" will capture '--foobar'
  const unknownOption = err.message.match(/'([^']*)'/)?.[1] || '';
  return unknownOption;
};

// export const onCommanderError = (err: CommanderError, command: TypedCommand) => {
//   if (err.code === InvalidOptionArgumentCode) {
//     const optionError = parseOptionMissingArgument(err);
//     logError(`Invalid option argument: ${optionError.shortFlag || optionError.longFlag} ${optionError.argumentName}`);
//     return;
//   }
//   switch (command.name()) {
//     case 'projects':
//       //handleProjectsCommandError(err, command);
//       break;
//     default:
//       logError(`An error occurred in command ${command.name()}: ${err.message}`);
//   }

//   process.exit(0);
// };

export const commandOutputConfiguration = {
  writeOut: (str: string) => process.stdout.write(`[OUT] ${str}`),
  // hide output errors from commanderjs
  writeErr: (str: string) => process.stderr.write(str),
  outputError: (str: string, write: (str: string) => never) => write(str),
};

export const subcommandOutputConfiguration = {
  writeOut: (str: string) => process.stdout.write(`${str}`),
  // hide output errors from commanderjs
  writeErr: (str: string) => process.stderr.write(str),
  outputError: () => {},
};

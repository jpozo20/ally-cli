import { Command, OptionValues } from '@commander-js/extra-typings';
import { CommanderError, InvalidArgumentError, MissingArgumentError } from 'commander';

import { logError, logOutput } from '@/utils/messages.js';
import { InvalidOptionArgumentCode, parseOptionMissingArgument, parseUnknownOption, UnknownOptionErrorCode } from '@/utils/error-helper.js';

type TypedCommand = Command<unknown[], OptionValues, OptionValues>;

const handleRemoveCommandError = (err: CommanderError, command: TypedCommand) => {
  if (err instanceof MissingArgumentError) {
    const message = 'The name is required for removing a project from the database.';
    logError(message);
  } else if (err instanceof InvalidArgumentError) {
    logError(`The argument provided is invalid for the command ${command.name()}.`);
  } else {
    logError(`An unexpected error occurred: ${err.message}`);
  }
};
/**
 * Handles errors from invalid and missing arguments in project commands.
 * @param {CommanderError} [err] The error object thrown by Commander.js.
 * @param {TypedCommand} [command] The command that triggered the error.
 */
export const onProjectError = (err: CommanderError, command: TypedCommand) => {
  // Somehow commander.js throws an error when the help command is invoked.
  if (err.code.includes('help')) return;

  if (err.code === InvalidOptionArgumentCode) {
    const optionError = parseOptionMissingArgument(err);
    logError(`Invalid argument for option: ${optionError.shortFlag || optionError.longFlag} ${optionError.argumentName}`);
    process.exit(0);
  }

  if (err.code === UnknownOptionErrorCode) {
    const unknownOption = parseUnknownOption(err);
    const message = `Unknown option '${unknownOption}' given for command ${command.name()}.`;
    logError(message);
    logOutput(command.helpInformation().trim());
    process.exit(0);
  }

  switch (command.name()) {
    case 'remove':
      handleRemoveCommandError(err, command);
      break;
    default:
      console.error('undhandled error in command', err);
      logError(`An error occurred in command ${command.name()}: ${err.message}`);
  }

  process.exit(0);
};

export default onProjectError;

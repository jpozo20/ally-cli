import chalk from 'chalk';

type LogParams = Parameters<typeof console.log>;
const isDebugMode = process.env.DEBUG === 'true' || process.env.NODE_ENV === 'development';

const LogLevel = {
  Error: 'error',
  Warning: 'warning',
  Info: 'info',
  Success: 'success',
  Debug: 'debug',
};

export const LogType = {
  error: (message: string) => chalk.red(`ERROR: ${message}`),
  warning: (message: string) => chalk.yellow(`WARNING: ${message}`),
  info: (message: string) => chalk.white.bgBlue(`INFO: ${message}`),
  success: (message: string) => chalk.green(`SUCCESS: ${message}`),
  debug: (message: string) => chalk.gray(`DEBUG: ${message}`),
};

const logMessage = (message: string, level: string) => {
  const loggedMessage = LogType[level as keyof typeof LogType](message);

  // Skip debug logs if not in debug mode
  if (level === LogLevel.Debug && !isDebugMode) {
    return;
  }
  if (level === LogLevel.Error) console.error(loggedMessage);
  else console.log(loggedMessage);
  
};

export const logOutput = console.log;

//export const logError = (message: string) => console.error(messages.error(message));
export const logError = (message: string) => logMessage(message, LogLevel.Error);
export const logWarning = (message: string) => logMessage(message, LogLevel.Warning);
export const logInfo = (message: string) => logMessage(message, LogLevel.Info);
export const logSuccess = (message: string) => logMessage(message, LogLevel.Success);
export const logDebug = (message: string) => logMessage(message, LogLevel.Debug);

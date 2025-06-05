// import { ItemType, Param } from "./ally-program.js"

// const itemTypes: ItemType[] = ['project', 'alias', 'path', 'variable'];
// const addParam: Param = {
//     shortName: 'a',
//     longName: 'add',
//     description: 'Add a new configuration item. Defaults to project.',
//     argument: '[type]',
//     defaultValue: 'project',
//     allowedValues: itemTypes,
// }
// export * as aliasCommand from './commands/alias-command.js';
// export * as projectCommand from './commands/project-command.js';
import aliasCommand from "./commands/alias-command.js";
import projectCommand from "./commands/project-command.js";

export { aliasCommand, projectCommand };



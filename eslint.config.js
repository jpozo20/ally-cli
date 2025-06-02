// @ts-check

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['**/node_modules', '**/dist', '**/out'] },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    eslintConfigPrettier.rules,
    {
        // my custom rules
        rules: {

        }
    }
);
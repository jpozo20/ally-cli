// @ts-check

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['**/node_modules', '**/dist', '**/out'] },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    eslintConfigPrettier,
    {
        // my custom rules
        rules: {
            '@typescript-eslint/no-unused-vars': ['warn'],
            "@typescript-eslint/ban-ts-comment": ["error", {
                // Disable @ts-ignore for specific cases
                "ts-nocheck": false
            }]
        }
    }
);
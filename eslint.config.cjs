const js = require('@eslint/js')
const tseslint = require('@typescript-eslint/eslint-plugin')
const parser = require('@typescript-eslint/parser')
const globals = require('globals')

module.exports = [
    js.configs.recommended,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: ['./tsconfig.json'],
            },
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            // estilo
            'quotes': ['error', 'single'],
            'semi': ['error', 'never'],
            // 'indent': ['error', 2, { SwitchCase: 1 }],

            // typescript
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': ['warn'],
        },
    },
    {
        files: ['tests/**/*.ts'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },
    },
]

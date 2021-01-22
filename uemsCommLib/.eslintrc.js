module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'airbnb-typescript',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        indent: ['error', 4],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'variableLike',
                format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            },
        ],
        '@typescript-eslint/indent': ['error', 4],
        'import/first': ['off'],
        'import/order': ['off'],
        'import/prefer-default-export': ['off'],
        'max-len': ['error', 120],
        'object-curly-newline': ['off'],
    },
};

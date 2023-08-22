module.exports = {
    ignorePatterns: ['**/dist/**/*', '**/storybook-static/**/*'],
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        // 'airbnb',
        'airbnb-typescript',
        'plugin:react-hooks/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.eslint.json'],
    },
    plugins: [
        '@typescript-eslint',
        'import',
        'jsx-a11y',
        'react',
        'react-hooks',
    ],
    rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        ],
        indent: ['error', 4],
        'linebreak-style': ['error', 'windows'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        yoda: [
            'error',
            'never',
            {
                exceptRange: true,
            },
        ],
        'no-async-promise-executor': [1],
        'prefer-const': [1],
        'no-case-declarations': [1],
        '@typescript-eslint/ban-types': [1],
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': ['error'],
        '@typescript-eslint/indent': ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-closing-bracket-location': [
            1,
            { selfClosing: 'tag-aligned', nonEmpty: 'tag-aligned' },
        ],
        // rules set to warn (and some "off") TEMPORARILY to make Storybook work
        // 'import/export': ['warn'],
        // 'max-len': ['warn'],
        // 'no-confusing-arrow': ['warn'],
        // 'implicit-arrow-linebreak': ['warn'],
        // '@typescript-eslint/no-une-before-define': ['off'],
        // '@typescript-eslint/comma-dangle': ['warn'],
        // 'operator-linebreak': ['warn'],
        // '@typescript-eslint/no-use-before-define': ['warn'],
        // 'arrow-body-style': ['warn'],
        // 'react/function-component-definition': ['warn'],
        // 'react/require-default-props': ['warn'],
        // 'import/order': ['warn'],
        // 'no-floating-decimal': ['warn'],
        // 'import/no-cycle': ['warn'],
        // 'no-restricted-exports': ['warn'],
        // 'no-tabs': ['warn'],
        // 'jsx-quotes': ['warn'],
        // 'react/jsx-props-no-spreading': ['warn'],
        // 'jsx-a11y/aria-role': ['warn'],
        // 'object-shorthand': ['warn'],
        // '@typescript-eslint/no-shadow': ['warn'],
        // 'eqeqeq': ['warn'],
        // '@typescript-eslint/no-unused-vars': ['warn'],
        // 'no-useless-rename': ['warn'],
        // 'react/destructuring-assignment': ['warn'],
        // 'no-trailing-spaces': ['warn'],
        // '@typescript-eslint/object-curly-spacing': ['warn'],
        // 'no-multiple-empty-lines': ['warn'],
        // '@typescript-eslint/keyword-spacing': ['warn'],
        // 'no-unneeded-ternary': ['warn'],
        // 'react/jsx-curly-newline': ['warn'],
        // 'no-nested-ternary': ['warn'],
        // 'no-useless-return': ['warn'],
        // 'react/no-array-index-key': ['warn'],
        // 'consistent-return': ['warn'],
        // '@typescript-eslint/no-unused-expressions': ['warn'],
        // 'no-restricted-syntax': ['warn'],
        // 'import/no-useless-path-segments': ['warn'],
        // 'no-underscore-dangle': ['warn'],
        // 'react/jsx-wrap-multilines': ['warn'],
        // 'import/no-duplicates': ['warn'],
        // 'object-curly-newline': ['warn'],
        // 'import/prefer-default-export': ['warn'],
        // 'no-else-return': ['warn'],
        // 'eol-last': ['warn'],
        // 'function-paren-newline': ['warn'],
        // 'react/jsx-one-expression-per-line': ['warn'],
        // 'react/no-unused-prop-types': ['warn'],
        // '@typescript-eslint/brace-style': ['warn'],
        // '@typescript-eslint/semi': ['warn'],
        // 'react/jsx-first-prop-new-line': ['warn'],
        // 'no-param-reassign': ['warn'],
        // 'arrow-parens': ['warn'],
        // 'prefer-destructuring': ['warn'],
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
        // 'react/no-unstable-nested-components': ['warn'],
        // 'spaced-comment': ['warn'],
        // 'react/jsx-tag-spacing': ['warn'],
        // 'no-multi-spaces': ['warn'],
        // 'react/jsx-boolean-value': ['warn'],
        // 'prefer-arrow-callback': ['warn'],
        // 'react/jsx-curly-brace-presence': ['warn'],
        // 'padded-blocks': ['warn'],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
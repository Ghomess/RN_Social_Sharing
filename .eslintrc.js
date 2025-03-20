/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-native/all',
  ],
  plugins: [
    '@typescript-eslint',
    'prettier',
    'unused-imports',
    'testing-library',
  ],
  ignorePatterns: [
    'node_modules',
    'packages',
    'android',
    'ios',
    '**/*.js',
    '**/.eslintrc.js',
    '!**/*.ts', // remove this line
    '!**/*.tsx', // remove this line
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    /**
     * These are the rules that we want to enforce but have been suppressed to a warning
     * for now, due to significant legacy code.
     */
    'react-native/no-color-literals': 'warn',
    'react-native/sort-styles': 'off',
    'react-native/split-platform-components': 'off',
    'react-native/no-inline-styles': 'warn',
    'react/display-name': 'off',
    'react-native/no-raw-text': [
      'error',
      { skip: ['HighlightableText', 'Pill'] },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['react'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react-native',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'expo*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '~/**',
            group: 'parent',
            position: 'before',
          },
        ],
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@testing-library/react-native',
            importNames: ['render', 'act'],
            message: "Please use `render` from '~/app/global/utils/jest'.",
          },
          {
            name: '@testing-library/react',
            importNames: ['renderHook', 'act'],
            message: "Please use `renderHook` from '~/app/global/utils/jest'.",
          },
        ],
      },
    ],
    'import/no-unresolved': ['off'],
    'import/no-named-as-default-member': ['off'],
    'import/default': ['off'],
    'unused-imports/no-unused-imports': 'error',
    'prettier/prettier': 'error',
    'no-restricted-globals': [
      'error',
      {
        name: 'StyleSheet',
        message:
          "This isn't the React Native StyleSheet, you need to import it from 'react-native'.",
      },
      {
        name: 'name',
        message:
          "This is currently using `name` from the global scope, which you won't want. Ensure you have defined a variable called `name` instead  ",
      },
    ],
  },
  settings: {
    'import/ignore': [
      'node_modules/react-native/index\\.js$',
      'node_modules/react-native-svg/.*\\.js$',
    ],
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/__tests__/**/*'],
      extends: ['plugin:testing-library/react'],
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
    },
  ],
};

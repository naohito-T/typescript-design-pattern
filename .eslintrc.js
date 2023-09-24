/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['airbnb-typescript/base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'import', 'unused-imports'],
  /**
   * @note globalにjest pluginを効かすとsrc配下のアプリケーションコードにもjest設定が入ってしまうためtestsだけに効かす
   * ※今後jestのルールを追加したい場合は以下に記載すること。
   */
  overrides: [
    {
      files: ['./tests/**.test.ts'],
      plugins: ['jest'],
      extends: ['plugin:jest/all'],
      rules: {},
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './',
      },
    },
    // jestのpluginにversionを追尾させる
    jest: {
      version: require('jest/package.json').version,
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'never',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          { pattern: 'src/types/**', group: 'internal', position: 'before' },
          {
            pattern: 'src/repositories/**',
            group: 'internal',
            position: 'before',
          },
        ],
      },
    ],
    // 主に import 側の名前が統一されない問題を避けるために default export は禁止する
    'import/prefer-default-export': 'off',
    // テストケースは日本語に統一するためoffにする
    'jest/lowercase-name': ['off'],
  },
};

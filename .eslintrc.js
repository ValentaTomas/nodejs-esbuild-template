module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    semi: [2, 'always', { omitLastInOneLineBlock: true }],
    quotes: [2, 'single', { avoidEscape: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'max-len': 'off',
    // Below two lines fix this bug - https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined/64024916#64024916.
    // Note you must disable the base rule as it can report incorrect errors.
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
  },
  ignorePatterns: ['lib/**/*', 'node_modules/**/*'],
};

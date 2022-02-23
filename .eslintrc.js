module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:solid/typescript'],
  settings: {},
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'solid'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'quotes': ['warn', 'single'],
    'semi': 'warn',
    'max-len': 'off',
    'array-element-newline': 'off',
    'comma-dangle': ['warn', 'always-multiline'],
    'object-curly-spacing': ['warn', 'always'],
    'keyword-spacing': 'warn',
    'solid/reactivity': 'off',
  },
};

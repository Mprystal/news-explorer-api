module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'linebreak-style': 0,
    'no-underscore-dangle': 0,
    'no-console': 0,
    'no-trailing-whitespace': 0,
  },
  settings: {
    react: {
      version: '999.999.999',
    },
  },
};

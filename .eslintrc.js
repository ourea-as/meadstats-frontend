module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    "plugin:jsx-a11y/recommended",
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/prop-types': 0,
    "react/jsx-filename-extension": [1, {
      "extensions": [".jsx", ".tsx"]
    }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

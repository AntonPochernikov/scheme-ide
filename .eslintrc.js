module.exports = {
  parser: 'babel-eslint',
  plugins: [
    'react',
    'babel',
    'jest',
    'react-hooks',
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
  ],
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: 'detect',
      flowVersion: '0.53',
    },
    propWrapperFunctions: [
      { property: 'freeze', object: 'Object' },
      { property: 'myFavoriteWrapper' },
    ],
  },
  rules: {
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    'class-methods-use-this': 0,
    'linebreak-style': 0,
    'line-break-style': 0,
    'no-console': 0,
    'max-len': ['warn', { code: 120 }],
    'operator-linebreak': ['error', 'after'],
  },
};

module.exports = {
  parser: 'babel-eslint',
  plugins: [
    'module-resolver',
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
    'plugin:react/recommended',
    'airbnb-base',
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
    'import/resolver': {
      'babel-module': {
        alias: {
          static: './public/static',
          actions: './src/actions',
          components: './src/components',
          constants: './src/constants',
          libs: './src/libs',
          reducers: './src/reducers',
          sagas: './src/sagas',
          selectors: './src/selectors',
          store: './src/store',
        },
      },
    },
  },
  rules: {
    'import/prefer-default-export': 0,
    'module-resolver/use-alias': 2,
    'react-hooks/rules-of-hooks': 'error',
    'class-methods-use-this': 0,
    'linebreak-style': 0,
    'line-break-style': 0,
    'react/prop-types': 0,
    'no-console': 0,
    'max-len': ['warn', { code: 120 }],
    'import/extensions': 0,
    'operator-linebreak': ['error', 'after'],
  },
};

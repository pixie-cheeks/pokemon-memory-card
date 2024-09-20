module.exports = {
  env: {
    browser: true,
  },
  overrides: [{ files: ['*.jsx', '*.js'] }],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: { jsx: true },
    sourceType: 'module',
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/jsx-runtime',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  plugins: ['react-refresh'],
  ignorePatterns: ['*', '!src', '!src/**/*'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',
    'no-plusplus': 'off',
    'import/extensions': ['error', 'ignorePackages'],
    'no-param-reassign': ['error', { props: false }],
    'unicorn/better-regex': 'warn',
    'unicorn/numeric-separators-style': [
      'error',
      { number: { minimumDigits: 0 } },
    ],
    'unicorn/filename-case': ['error', { cases: { pascalCase: true } }],

    'lines-between-class-members': [
      'error',
      {
        enforce: [
          { blankLine: 'always', prev: '*', next: 'method' },
          { blankLine: 'always', prev: 'method', next: '*' },
          { blankLine: 'never', prev: 'field', next: 'field' },
        ],
      },
    ],
  },
};

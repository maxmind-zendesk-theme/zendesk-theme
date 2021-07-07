module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:compat/recommended',
    'plugin:security/recommended',
    'standard',
  ],
  overrides: [
    {
      extends: [
        'plugin:json/recommended',
      ],
      files: [
        '**/*.json',
      ],
      rules: {
        'comma-dangle': [
          'warn',
          'never',
        ],
        'quote-props': [
          'warn',
          'always',
        ],
        quotes: [
          'warn',
          'double',
        ],
        semi: [
          'warn',
          'never',
        ],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: [
    'security',
    'sort-keys-fix',
  ],
  rules: {
    'comma-dangle': [
      'warn',
      'always',
    ],
    semi: [
      'warn',
      'always',
    ],
    'sort-keys-fix/sort-keys-fix': 'warn',
  },
};

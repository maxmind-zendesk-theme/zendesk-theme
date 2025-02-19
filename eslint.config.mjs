import globals from "globals";
import js from '@eslint/js';
import security from 'eslint-plugin-security';
import compat from 'eslint-plugin-compat';
import sortKeys from 'eslint-plugin-sort-keys-fix';
import importPlugin from 'eslint-plugin-import';
import json from "@eslint/json";

export default [
  {
    ignores:  ["**/node_modules/", ".git/", "dist/"],
  },
  {
    files: ['**/*.js'],
    ...js.configs.recommended,
    ...importPlugin.flatConfigs.recommended,
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es2021,
      },
    },
    plugins: {
      security,
      'sort-keys-fix': sortKeys,
    },
    rules: {
      ...security.configs.recommended.rules,
      "sort-keys-fix/sort-keys-fix": "warn",
    },
  },
  {
    files: ['src/scripts/**/*.js'],
    plugins: {
      compat,
    },
    rules: {
      ...compat.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.json'],
    language: 'json/json',
    plugins: {
      json,
    },
    rules: {
      'comma-dangle': ['warn', 'never'],
      'quote-props': ['warn', 'always'],
      quotes: ['warn', 'double'],
      semi: ['warn', 'never'],
    },
  },
];

import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  {
    ...playwright.configs['flat/recommended'],
    files: ['src/tests/**'],
  },
  {
    files: ['src/**'],
    rules: {
      'playwright/expect-expect': 'off',
      // Customize Playwright rules
      // ...
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

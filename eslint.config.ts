import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  {
    ignores: [
      'playwright-report/**',
      'allure-results/**',
      'allure-report/**',
      'test-results/**',
      'playwright-report-docker/**',
      'allure-results-docker/**',
      'test-results-docker/**',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  playwright.configs['flat/recommended'],
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: false,
    braceStyle: '1tbs',
  }),
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'playwright/expect-expect': 'off',
      'playwright/no-skipped-test': 'off',
    },
  },
);

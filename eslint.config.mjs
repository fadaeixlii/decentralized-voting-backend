// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'src/public/**/*.js'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        // Add browser globals for JavaScript files
        ...globals.browser,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        allowDefaultProject: true, // Allow files not in tsconfig to be linted with default settings
      },
    },
  },
  // Add specific configuration for JavaScript files
  {
    files: ['**/*.js'],
    languageOptions: {
      parserOptions: {
        projectService: false, // Disable TypeScript project service for JS files
      },
    },
  },
  // Add specific configuration for the swagger-initializer.js file
  {
    files: ['**/public/**/*.js'],
    ignores: [], // Ensure public JS files are not ignored
    languageOptions: {
      globals: {
        ...globals.browser,
        SwaggerUIBundle: 'readonly',
        SwaggerUIStandalonePreset: 'readonly',
      },
    },
  },
  {
    rules: {
      'linebreak-style': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  },
);

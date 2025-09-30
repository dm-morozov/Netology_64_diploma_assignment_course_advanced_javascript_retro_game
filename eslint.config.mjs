// eslint.config.mjs (Финальная, рабочая версия с отключенными правилами)

import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,mjs,ts}'],
    languageOptions: {
      parser,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2023,
        ...globals.jest,
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: pluginImport,
      prettier: pluginPrettier,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts'],
        },
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginImport.configs.recommended.rules,
      
      // ОТКЛЮЧАЕМ ПРАВИЛА, КОТОРЫЕ КОНФЛИКТУЮТ С PRETTIER
      // 1. Общее правило quotes (отключаем встроенное правило JS)
      'quotes': 'off', 
      // 2. Правило TypeScript quotes (отключаем правило TS)
      '@typescript-eslint/quotes': 'off', 
      
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          mjs: 'never',
          ts: 'never',
        },
      ],
      'import/no-unresolved': 'off',
      // Активируем Prettier
      'prettier/prettier': ['error', {
        singleQuote: true, // Встраиваем настройку прямо сюда
        // Если нужно, другие настройки:
        semi: true,
        tabWidth: 2,
        trailingComma: 'es5',
      }],
    },
  },
];
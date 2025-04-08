import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPrettier from 'eslint-plugin-prettier';
import eslintPreferArrow from 'eslint-plugin-prefer-arrow';
import eslintValidateFilename from 'eslint-plugin-validate-filename';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const defineConfig = [
  {
    ignores: ['./.next/*', './node_modules/*', './dist/*']
  },
  ...compat.extends('next/core-web-vitals'),
  {
    files: ['src/components/ui/**/*.{js,jsx}'],
    rules: {
      'prefer-arrow/prefer-arrow-functions': 'off'
    }
  },
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      'validate-filename': eslintValidateFilename,
      'prefer-arrow': eslintPreferArrow,
      prettier: eslintPrettier
    },
    rules: {
      'validate-filename/naming-rules': [
        'error',
        {
          rules: [
            {
              case: 'kebab',
              target: '**/src/**'
            },
            {
              case: 'kebab',
              target: '**/app/**',
              patterns: '^(page|layout|loading|error|not-found|route|template|index)\\.(js|jsx)$'
            }
          ]
        }
      ],
      'prefer-arrow/prefer-arrow-functions': [
        'error',
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false
        }
      ]
    }
  }
];

export default defineConfig;

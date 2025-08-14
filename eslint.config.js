const js = require('@eslint/js');
const angularEslint = require('@angular-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const jsdocPlugin = require('eslint-plugin-jsdoc');
const preferArrowPlugin = require('eslint-plugin-prefer-arrow');
const importPlugin = require('eslint-plugin-import');
const unusedImports = require('eslint-plugin-unused-imports');
module.exports = [
  // Basic ESLint configuration
  js.configs.recommended,

  // Ignore test files .spec.ts
  {
    ignores: ['**/*.spec.ts', '**/*.d.ts', 'eslint.config.js', 'scripts/**'],
  },

  // Specific rules for TypeScript
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@angular-eslint': angularEslint,
      'prefer-arrow': preferArrowPlugin,
      'unused-imports': unusedImports,
      jsdoc: jsdocPlugin,
      import: importPlugin,
    },
    rules: {
      // Angular rules
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: ['app', 'sps'],
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: ['app', 'sps'],
          style: 'kebab-case',
        },
      ],
      'lines-around-comment': [
        'error',
        {
          beforeBlockComment: true,
          afterBlockComment: false,
          beforeLineComment: true,
          afterLineComment: false,
          allowBlockStart: true,
          allowBlockEnd: true,
          allowObjectStart: true,
          allowObjectEnd: true,
          allowArrayStart: true,
          allowArrayEnd: true,
          allowClassStart: true,
          allowClassEnd: true,
        },
      ],
      'max-len': [
        'error',
        {
          code: 100,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      'arrow-body-style': ['error', 'as-needed'],
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/prefer-output-readonly': 'error',
      '@angular-eslint/no-output-native': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-output-rename': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',

      // Complexity and maintainability
      complexity: ['warn', { max: 10 }],
      'max-depth': ['warn', 3],
      'max-lines-per-function': ['warn', { max: 50, skipComments: true }],
      'max-statements': ['warn', 10],
      'no-nested-ternary': 'warn',
      'max-params': ['warn', 4],
      'max-lines': ['warn', { max: 400, skipComments: true, skipBlankLines: true }],

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/no-empty-function': 'error',

      // Additional ESLint rules in strict mode
      'no-console': 'warn', // Allow logs only as a warning
      eqeqeq: 'error', // Requires use of === and !==
      curly: 'error', // Requires use of braces in blocks
      'no-var': 'error', // Requires use of let or const instead of var
      'prefer-const': 'error', // Prefers const when possible

      // Basic JSDoc rules configuration
      'jsdoc/check-alignment': 'error', // Ensures JSDoc tags are aligned
      'jsdoc/check-param-names': 'error', // Checks that parameter names match
      'jsdoc/check-tag-names': 'error', // Ensures tags are valid
      'jsdoc/check-types': 'error', // Checks the validity of specified types

      'jsdoc/require-param': 'error', // Requires all parameters to be documented
      'jsdoc/require-param-type': 'error', // Requires parameter types to be specified
      'jsdoc/require-returns': 'error', // Requires return tags in functions
      'jsdoc/require-returns-type': 'error', // Requires return types to be specified

      // prefer-arrow configurations
      'prefer-arrow/prefer-arrow-functions': [
        'error',
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
          allowStandaloneDeclarations: true,
        },
      ],

      // eslint-plugin-import configurations
      'import/no-default-export': 'error', // Discourages the use of default exports
      'unused-imports/no-unused-imports': 'error', // Ensures all modules and exports are used
      'import/order': [
        'error',
        {
          // Orders imports consistently
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: '@angular/**',
              group: 'external',
              position: 'before',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/first': 'error', // Ensures all imports are at the top of the file
      'import/no-duplicates': 'error', // Prohibits duplicate imports
    },
  },

  {
    files: ['*.html'],
    extends: ['plugin:@angular-eslint/template/recommended'],
    rules: {
      '@angular-eslint/template/no-negated-async': 'warn',
      '@angular-eslint/template/i18n': [
        'warn',
        {
          checkId: true,
          checkText: true,
          checkAttributes: true,
        },
      ],
    },
  },
];

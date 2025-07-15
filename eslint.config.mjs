import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        parser: '@typescript-eslint/parser'
      },
      globals: { ...globals.node, ...globals.browser }
    },
    rules: {
      'prefer-destructuring': ['error', { object: true, array: false }],
      indent: ['error', 2],
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'never'],
      'max-len': ['error', { code: 300 }],
      'no-param-reassign': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'import/no-absolute-path': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-plusplus': ['off', { allowForLoopAfterthoughts: true }],
      'newline-per-chained-call': ['error', { ignoreChainWithDepth: 10 }],
      'vue/no-v-html': 'off',
      'vue/no-template-shadow': 'off',
      'vue/require-default-prop': 'off',
      'vue/comment-directive': 'off',
      'vue/multi-word-component-names': ['error', {
        ignores: ['index', 'login', 'r']
      }],
      'object-curly-newline': [
        'error',
        {
          ExportDeclaration: { multiline: true, minProperties: 3 },
          ImportDeclaration: { multiline: true, minProperties: 3 }
        }
      ],
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off'
    },
    ignores: ['node_modules', 'dist', '*.d.ts', '.husky']
  }
)

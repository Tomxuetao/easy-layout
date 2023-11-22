module.exports = {
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser'
  },
  plugins: ['@typescript-eslint'],

  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true
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
    'object-curly-newline': [
      'error',
      { ImportDeclaration: 'never', ExportDeclaration: 'never' }
    ],
    // eslint-plugin-vue
    'vue/no-v-html': 'off',
    'vue/no-template-shadow': 'off',
    'vue/require-default-prop': 'off',
    'vue/comment-directive': 'off',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index', 'login', 'r']
      }
    ],
    // typescript-eslint
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false
        }
      }
    ],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
  overrides: [
    {
      files: ['*.vue'],
      parser: require.resolve('vue-eslint-parser')
    },
    {
      files: ['**/*.md/*.js', '**/*.md/*.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off'
      }
    }
  ]
}

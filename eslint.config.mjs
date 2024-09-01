import antfu from '@antfu/eslint-config'
import eslintTailwind from 'eslint-plugin-tailwindcss'

export default antfu(
  {
    vue: true,
    settings: {
      'import/core-modules': ['vue-router/auto-routes'],
    },
    stylistic: {
      quotes: 'single',
    },
    ignores: ['dist', 'node_modules', '.gitignore'],
  },
  {
    rules: {
      'vue/singleline-html-element-content-newline': 'off',
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 3 },
        multiline: { max: 1 },
      }],
      'vue/attribute-hyphenation': ['error', 'never'],
      'no-console': 'warn',
      'vue/no-side-effects-in-computed-properties': 'off',
      'unicorn/error-message': 'error',
      'antfu/curly': 'warn',
      'antfu/top-level-function': 'error',
      'style/brace-style': ['error', '1tbs'],
      'antfu/if-newline': 'off',
      'unused-imports/no-unused-vars': 'warn',
      'ts/consistent-type-definitions': 'off',
      'node/prefer-global/buffer': 'off',
    },
  },
  ...eslintTailwind.configs['flat/recommended'],
  {
    rules: {
      'tailwindcss/no-custom-classname': 'off',
    },
  },

)

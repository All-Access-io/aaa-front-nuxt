// @ts-check
import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'
import nuxt from './.nuxt/eslint.config.mjs'

const compat = new FlatCompat()

export default nuxt(
  antfu(
    {
      formatters: true,
      ignores: ['auto-imports.d.ts', '**/auto-imports.d.ts/**', 'components.d.ts', '**/components.d.ts/**', 'nuxt.d.ts', '**/nuxt.d.ts/**', '.nuxt', '**/.nuxt/**', '.output', '**/.output/**', 'node_modules', '**/node_modules/**', 'dist', '**/dist/**', 'public', '**/public/**'],
    },
    ...compat.config({
      extends: ['plugin:tailwindcss/recommended'],
      rules: {
        'tailwindcss/no-custom-classname': 'off',
      },
    }),
  ),
)

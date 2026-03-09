import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import boundaries from 'eslint-plugin-boundaries'

export default [
  js.configs.recommended,
  prettierConfig,
  {
    files: ['src/**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      boundaries,
    },
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'boundaries/elements': [
        { type: 'domain', pattern: 'src/domain/*' },
        { type: 'app', pattern: 'src/app/*' },
        { type: 'infra', pattern: 'src/infra/*' },
        { type: 'routes', pattern: 'src/routes/*' },
      ],
    },
    rules: {
      // ── General — disable base rules in favor of TypeScript-aware equivalents ──
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^[A-Z_]' }],
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',

      // ── CLEAN Architecture Boundaries ──
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'domain', allow: ['domain'] },
            { from: 'app', allow: ['domain', 'app'] },
            { from: 'infra', allow: ['domain', 'app', 'infra'] },
            { from: 'routes', allow: ['domain', 'app', 'routes'] },
          ],
        },
      ],
    },
  },
  {
    ignores: ['dist/', 'node_modules/'],
  },
]

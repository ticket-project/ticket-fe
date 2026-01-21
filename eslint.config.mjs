import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import perfectionist from 'eslint-plugin-perfectionist';

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    files: ['**/*.styles.ts', '**/*.styles.tsx', '**/*.tsx'],
    plugins: { perfectionist },
    rules: {
      'perfectionist/sort-objects': [
        'error',
        {
          customGroups: [
            // (옵션) pseudo-element 내부에서 content를 항상 맨 위로
            { elementNamePattern: '^content$', groupName: 'content' },

            { elementNamePattern: '^position$', groupName: 'position' },
            {
              elementNamePattern: '^(top|right|bottom|left|inset)$',
              groupName: 'coords',
            },
            { elementNamePattern: '^zIndex$', groupName: 'z' },

            {
              elementNamePattern:
                '^(display|flex|flexDirection|alignItems|justifyContent|gap)$',
              groupName: 'layout',
            },

            {
              elementNamePattern:
                '^(width|height|minWidth|maxWidth|minHeight|maxHeight|padding|paddingTop|paddingRight|paddingBottom|paddingLeft|margin|marginTop|marginRight|marginBottom|marginLeft)$',
              groupName: 'sizing-spacing',
            },

            {
              elementNamePattern:
                '^(font|fontSize|fontWeight|lineHeight|letterSpacing|textAlign|textDecoration|color)$',
              groupName: 'typography',
            },

            // 폴백에서 자주 섞이는 것들(overflow/opacity/filter 등)도 visual로 묶어주면 깔끔해짐
            {
              elementNamePattern:
                '^(background|backgroundColor|border|borderRadius|boxShadow|opacity|overflow|filter|backdropFilter)$',
              groupName: 'visual',
            },

            // transform/transition도 고정 위치로
            {
              elementNamePattern: '^(transform|transition|animation)$',
              groupName: 'motion',
            },

            // ✅ &:after / &::after / &:before / &::before
            { elementNamePattern: '^&::?(before|after)$', groupName: 'pseudo' },

            // 기존 states 확장(원하면 더 추가)
            {
              elementNamePattern:
                '^(&:?hover|&:?focus|&:?focus-visible|&:?active|&\\[aria-current="page"\\])$',
              groupName: 'states',
            },

            {
              elementNamePattern:
                '^\\[?theme\\.breakpoints\\.down\\([\'"]xs[\'"]\\)\\]?$',
              groupName: 'bp-down-xs',
            },
            {
              elementNamePattern:
                '^\\[?theme\\.breakpoints\\.down\\([\'"]sm[\'"]\\)\\]?$',
              groupName: 'bp-down-sm',
            },
            {
              elementNamePattern:
                '^\\[?theme\\.breakpoints\\.down\\([\'"]md[\'"]\\)\\]?$',
              groupName: 'bp-down-md',
            },
            {
              elementNamePattern:
                '^\\[?theme\\.breakpoints\\.down\\([\'"]lg[\'"]\\)\\]?$',
              groupName: 'bp-down-lg',
            },
            {
              elementNamePattern:
                '^\\[?theme\\.breakpoints\\.down\\([\'"]xl[\'"]\\)\\]?$',
              groupName: 'bp-down-xl',
            },

            {
              elementNamePattern:
                '^\\[?theme\\.breakpoints\\.between\\([\'"]xs[\'"]\\s*,\\s*[\'"]sm[\'"]\\)\\]?$',
              groupName: 'bp-between-xs-sm',
            },
            {
              elementNamePattern:
                '^\\[?theme\\.breakpoints\\.between\\([\'"]sm[\'"]\\s*,\\s*[\'"]md[\'"]\\)\\]?$',
              groupName: 'bp-between-sm-md',
            },
            {
              elementNamePattern:
                '^\\[?theme\\.breakpoints\\.between\\([\'"]md[\'"]\\s*,\\s*[\'"]lg[\'"]\\)\\]?$',
              groupName: 'bp-between-md-lg',
            },
            {
              elementNamePattern:
                '^\\[?theme\\.breakpoints\\.between\\([\'"]lg[\'"]\\s*,\\s*[\'"]xl[\'"]\\)\\]?$',
              groupName: 'bp-between-lg-xl',
            },

            {
              elementNamePattern:
                '^\\[?theme\\.breakpoints\\.up\\([\'"]xs[\'"]\\)\\]?$',
              groupName: 'bp-up-xs',
            },
            {
              elementNamePattern:
                '^\\[?theme\\.breakpoints\\.up\\([\'"]sm[\'"]\\)\\]?$',
              groupName: 'bp-up-sm',
            },
            {
              elementNamePattern:
                '^\\[?theme\\.breakpoints\\.up\\([\'"]md[\'"]\\)\\]?$',
              groupName: 'bp-up-md',
            },
            {
              elementNamePattern:
                '^\\[?theme\\.breakpoints\\.up\\([\'"]lg[\'"]\\)\\]?$',
              groupName: 'bp-up-lg',
            },
            {
              elementNamePattern:
                '^\\[?theme\\.breakpoints\\.up\\([\'"]xl[\'"]\\)\\]?$',
              groupName: 'bp-up-xl',
            },
          ],

          fallbackSort: { order: 'asc', type: 'natural' },

          groups: [
            'content',
            'position',
            'coords',
            'z',
            'layout',
            'sizing-spacing',
            'typography',
            'visual',
            'motion',
            'pseudo',
            'states',

            'bp-down-xs',
            'bp-down-sm',
            'bp-down-md',
            'bp-down-lg',
            'bp-down-xl',
            'bp-between-xs-sm',
            'bp-between-sm-md',
            'bp-between-md-lg',
            'bp-between-lg-xl',
            'bp-up-xs',
            'bp-up-sm',
            'bp-up-md',
            'bp-up-lg',
            'bp-up-xl',

            'unknown',
          ],

          order: 'asc',
          type: 'natural',
        },
      ],
    },
  },
  {
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
    },
  },

  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  eslintPluginPrettier,

  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'node_modules/**',
      'next-env.d.ts',
    ],
  }
);

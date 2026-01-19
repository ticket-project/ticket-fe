import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import perfectionist from 'eslint-plugin-perfectionist';

export default tseslint.config(
  ...tseslint.configs.recommended,
  // perfectionist - CSS 스타일 파일에만 객체 정렬 적용
  {
    files: ['**/*.styles.ts', '**/*.styles.tsx', '**/*.tsx'],
    plugins: { perfectionist },
    rules: {
      'perfectionist/sort-objects': [
        'error',
        {
          customGroups: [
            {
              elementNamePattern: '^position$',
              groupName: 'position',
            },
            {
              elementNamePattern: '^(top|right|bottom|left)$',
              groupName: 'coords',
            },
            {
              elementNamePattern: '^zIndex$',
              groupName: 'z',
            },

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

            {
              elementNamePattern:
                '^(background|backgroundColor|border|borderRadius|boxShadow)$',
              groupName: 'visual',
            },

            {
              elementNamePattern:
                '^(&:hover|&:focus|&:focus-visible|&:active|&\\[aria-current="page"\\])$',
              groupName: 'states',
            },
          ],

          fallbackSort: { order: 'asc', type: 'natural' },

          groups: [
            'position',
            'coords',
            'z',
            'layout',
            'sizing-spacing',
            'typography',
            'visual',
            'states',
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

import nextPlugin from '@next/eslint-plugin-next';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import perfectionist from 'eslint-plugin-perfectionist';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...tseslint.configs.recommended,

  {
    files: ['**/*.styles.ts', '**/*.styles.tsx'],
    plugins: { perfectionist },
    rules: {
      'perfectionist/sort-objects': [
        'error',
        {
          type: 'natural',
          order: 'asc',

          groups: [
            'css-var',
            'content',

            // Layout / Positioning
            'position',
            'offset',
            'z-index',

            'display',
            'flex',
            'grid',

            // Box model
            'box-size',
            'overflow',
            'margin',
            'padding',

            // Typography
            'typography',
            'color',

            // Visual
            'background',
            'border',
            'shadow',

            // Motion / Interaction
            'motion',
            'interaction',

            // Nested selectors / pseudos (MUI 포함)
            'nested-selector',
            'media-query',
            'unknown',
          ],

          customGroups: [
            { groupName: 'css-var', elementNamePattern: '^--' },
            { groupName: 'content', elementNamePattern: '^content$' },

            // Layout / Positioning
            { groupName: 'position', elementNamePattern: '^position$' },
            {
              groupName: 'offset',
              elementNamePattern: '^(inset|top|right|bottom|left)$',
            },
            { groupName: 'z-index', elementNamePattern: '^zIndex$' },

            {
              groupName: 'display',
              elementNamePattern: '^(display|visibility|float|clear)$',
            },

            // Flex / Grid
            {
              groupName: 'flex',
              elementNamePattern:
                '^(flex|flexDirection|flexWrap|flexFlow|justifyContent|alignItems|alignContent|gap|rowGap|columnGap|order|flexGrow|flexShrink|flexBasis)$',
            },
            {
              groupName: 'grid',
              elementNamePattern:
                '^(grid|gridTemplate|gridTemplateColumns|gridTemplateRows|gridAutoFlow|gridAutoColumns|gridAutoRows|gridColumn|gridRow|placeItems|placeContent)$',
            },

            // Box model
            {
              groupName: 'box-size',
              elementNamePattern:
                '^(boxSizing|width|minWidth|maxWidth|height|minHeight|maxHeight)$',
            },
            {
              groupName: 'overflow',
              elementNamePattern: '^(overflow|overflowX|overflowY)$',
            },
            {
              groupName: 'margin',
              elementNamePattern:
                '^(margin|marginTop|marginRight|marginBottom|marginLeft)$',
            },
            {
              groupName: 'padding',
              elementNamePattern:
                '^(padding|paddingTop|paddingRight|paddingBottom|paddingLeft)$',
            },

            // Typography
            {
              groupName: 'typography',
              elementNamePattern:
                '^(font|fontFamily|fontSize|fontWeight|fontStyle|fontVariant|lineHeight|letterSpacing|textAlign|textDecoration|textTransform|whiteSpace|wordBreak|wordWrap)$',
            },
            { groupName: 'color', elementNamePattern: '^(color|opacity)$' },

            // Visual
            {
              groupName: 'background',
              elementNamePattern:
                '^(background|backgroundColor|backgroundImage|backgroundPosition|backgroundRepeat|backgroundSize)$',
            },
            {
              groupName: 'border',
              elementNamePattern:
                '^(border|borderTop|borderRight|borderBottom|borderLeft|borderColor|borderRadius|outline)$',
            },
            {
              groupName: 'shadow',
              elementNamePattern: '^(boxShadow|filter|backdropFilter)$',
            },

            // Motion / Interaction
            {
              groupName: 'motion',
              elementNamePattern: '^(transition|transform|animation)$',
            },
            {
              groupName: 'interaction',
              elementNamePattern: '^(cursor|pointerEvents|userSelect)$',
            },

            // Nested selectors / pseudos (MUI 포함)
            { groupName: 'nested-selector', elementNamePattern: '^&' },
            { groupName: 'media-query', elementNamePattern: '^@' },
          ],

          partitionByNewLine: false,
        },
      ],
    },
  },

  // React
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
      react: { version: 'detect' },
    },
  },

  // React Hooks
  {
    plugins: { 'react-hooks': reactHooksPlugin },
    rules: { ...reactHooksPlugin.configs.recommended.rules },
  },

  // Next.js
  {
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // Prettier
  eslintPluginPrettier,

  //  ts/tsx 파일 규칙
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { perfectionist },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          fallbackSort: { type: 'type-import-first', order: 'asc' },
          internalPattern: ['^~/.+', '^@/.+'],
          newlinesBetween: 1,

          groups: [
            'side-effect-style',
            'side-effect',

            'react-next',

            'type-builtin',
            'value-builtin',
            'type-external',
            'value-external',

            'internal-types',
            'type-internal',
            'value-internal',
            ['type-parent', 'type-sibling', 'type-index'],
            ['value-parent', 'value-sibling', 'value-index'],
            'internal-styles',

            'ts-equals-import',
            'unknown',
          ],

          customGroups: [
            {
              groupName: 'react-next',
              elementNamePattern: [
                '^react$',
                '^react-dom$',
                '^next$',
                '^next/.+',
              ],
            },

            {
              groupName: 'internal-types',
              elementNamePattern: [
                '^@/.*/types(?:/.*)?$',
                '^@/.+\\.types$',

                '^\\./.*(?:/types(?:/.*)?|\\.types)$',
                '^(?:\\.\\./)+.*(?:/types(?:/.*)?|\\.types)$',
              ],
            },

            {
              groupName: 'internal-styles',
              elementNamePattern: [
                '^@/.+\\.styles$',

                '^\\./.+\\.styles$',
                '^(?:\\.\\./)+.+\\.styles$',
              ],
            },
          ],
        },
      ],
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

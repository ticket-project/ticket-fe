export const CATEGORIES = {
  concert: {
    code: 'CONCERT',
    label: '콘서트',
  },
  musical: {
    code: 'MUSICAL',
    label: '뮤지컬',
  },
  theater: {
    code: 'THEATER',
    label: '연극',
  },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;
export type CategoryMeta = (typeof CATEGORIES)[CategorySlug];
export type CategoryCode = CategoryMeta['code'];

export const isCategorySlug = (value: string): value is CategorySlug => {
  return value in CATEGORIES;
};

export const getCategoryMeta = (slug: string): CategoryMeta | null => {
  if (!isCategorySlug(slug)) return null;
  return CATEGORIES[slug];
};

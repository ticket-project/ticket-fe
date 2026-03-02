export const CATEGORIES = {
  concert: { code: 'CONCERT', label: '콘서트' },
  musical: { code: 'MUSICAL', label: '뮤지컬' },
  theater: { code: 'THEATER', label: '연극' },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;
export type CategoryCode = (typeof CATEGORIES)[CategorySlug]['code'];
export type CategoryMeta = {
  slug: CategorySlug;
  code: CategoryCode;
  label: string;
};

export const isCategorySlug = (value: string): value is CategorySlug =>
  value in CATEGORIES;

export const getCategoryMeta = (slug: string): CategoryMeta | null => {
  if (!isCategorySlug(slug)) return null;

  return {
    slug,
    ...CATEGORIES[slug],
  };
};

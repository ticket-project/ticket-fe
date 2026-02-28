import { notFound } from 'next/navigation';

import UpcomingShowPageClient from '@/features/shows/components/page/UpcomingShowPageClient';
import { getCategoryMeta } from '@/features/shows/constants/categories';

interface CategoryUpcomingPageProps {
  params: Promise<{ category: string }>;
}

const CategoryUpcomingPage = async ({ params }: CategoryUpcomingPageProps) => {
  const { category } = await params;
  const categoryMeta = getCategoryMeta(category);

  if (!categoryMeta) {
    notFound();
  }

  return (
    <UpcomingShowPageClient
      categoryCode={categoryMeta.code}
      categorySlug={categoryMeta.slug}
    />
  );
};

export default CategoryUpcomingPage;

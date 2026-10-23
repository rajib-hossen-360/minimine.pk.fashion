import React, { Suspense } from 'react';
import CategoryClient from '@/components/CategoryClient';

export function generateStaticParams() {
  return [
    { slug: 'boys' },
    { slug: 'girls' },
    { slug: 'accessories' },
    { slug: 'infant' },
    { slug: 'mom-and-dad' },
    { slug: 'essentials' },
    { slug: 'sale' },
  ];
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug || 'boys';

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-sm font-semibold text-[#0D8385]">
          Loading category...
        </div>
      }
    >
      <CategoryClient slug={slug} />
    </Suspense>
  );
}

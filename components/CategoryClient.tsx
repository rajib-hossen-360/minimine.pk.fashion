'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ChevronRight,
  Filter,
  ArrowUpDown,
  ShoppingBag,
  Heart,
  Eye,
  Sparkles,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  Phone,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import {
  allProducts,
  categoriesMeta,
  getProductsByCategory,
  Product,
} from '@/lib/minimine-data';

export default function CategoryClient({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeSlug = slug || 'boys';
  const subParam = searchParams.get('sub');

  const { addToCart, wishlist, toggleWishlist, setQuickViewProduct, setSizeGuideOpen } = useCart();

  const meta = categoriesMeta[activeSlug] || {
    slug: activeSlug,
    title: activeSlug.charAt(0).toUpperCase() + activeSlug.slice(1),
    heroTitle: `${activeSlug.charAt(0).toUpperCase() + activeSlug.slice(1)} Collection`,
    subtitle: 'Explore our latest arrivals and timeless fashion favorites.',
    bannerImage: 'https://minimine.pk/wp-content/uploads/2024/11/happy-child-lies-on-the-grass-next-to-a-red-toy-airplane.jpg',
    subCategories: ['All'],
  };

  const rawProducts = useMemo(() => {
    return getProductsByCategory(activeSlug);
  }, [activeSlug]);

  // Subcategory filter state
  const [selectedSub, setSelectedSub] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [productSelectedSizes, setProductSelectedSizes] = useState<Record<string, string>>({});

  // Sync subcategory from query string if present
  useEffect(() => {
    if (subParam) {
      setSelectedSub(subParam);
    } else {
      setSelectedSub('All');
    }
  }, [subParam]);

  // Collect all available sizes in this category for size filter
  const allAvailableSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    rawProducts.forEach((p) => p.sizes.forEach((s) => sizeSet.add(s)));
    return Array.from(sizeSet);
  }, [rawProducts]);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let list = [...rawProducts];

    // Filter by subcategory
    if (selectedSub !== 'All') {
      if (activeSlug === 'sale') {
        if (selectedSub.includes('Girls')) list = list.filter((p) => p.category === 'girls');
        else if (selectedSub.includes('Boys')) list = list.filter((p) => p.category === 'boys');
        else if (selectedSub.includes('Infant')) list = list.filter((p) => p.category === 'infant');
        else if (selectedSub.includes('Adults')) list = list.filter((p) => p.category === 'mom-and-dad');
      } else {
        list = list.filter((p) => p.subCategory.toLowerCase() === selectedSub.toLowerCase());
      }
    }

    // Filter by size
    if (selectedSize !== 'All') {
      list = list.filter((p) => p.sizes.includes(selectedSize));
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [rawProducts, selectedSub, selectedSize, sortBy, activeSlug]);

  const handleSubSelect = (sub: string) => {
    setSelectedSub(sub);
    if (sub === 'All') {
      router.push(`/category/${activeSlug}`, { scroll: false });
    } else {
      router.push(`/category/${activeSlug}?sub=${encodeURIComponent(sub)}`, { scroll: false });
    }
  };

  const resetFilters = () => {
    setSelectedSub('All');
    setSelectedSize('All');
    setSortBy('featured');
    router.push(`/category/${activeSlug}`, { scroll: false });
  };

  const handleSizeClick = (productId: string, size: string) => {
    setProductSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-16">
      {/* 1. BREADCRUMBS */}
      <div className="bg-white border-b border-gray-100 py-3.5">
        <div className="page-container flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/" className="hover:text-[#0D8385] transition-colors">
            Home
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <Link href={`/category/${activeSlug}`} className="hover:text-[#0D8385] transition-colors capitalize">
            {meta.title}
          </Link>
          {selectedSub !== 'All' && (
            <>
              <ChevronRight size={13} className="text-gray-400" />
              <span className="text-gray-900 font-semibold">{selectedSub}</span>
            </>
          )}
        </div>
      </div>

      {/* 2. CATEGORY HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0D8385] via-[#11696B] to-[#1B3F9B] text-white py-12 md:py-16">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="page-container relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm text-white mb-3">
              <Sparkles size={13} className="text-[#F5C542]" />
              webnibo Official Collection
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-display leading-tight mb-3 tracking-tight">
              {meta.heroTitle}
            </h1>

            <p className="text-sm md:text-base text-white/90 leading-relaxed font-light mb-4">
              {meta.subtitle}
            </p>

            <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-semibold text-white/80">
              <span className="flex items-center gap-1.5">
                <Truck size={14} className="text-[#F5C542]" /> Cash on Delivery
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <RotateCcw size={14} className="text-[#F5C542]" /> 7 Days Exchange
              </span>
              <span>•</span>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="underline hover:text-white transition-colors"
              >
                Size Chart
              </button>
            </div>
          </div>

          <div className="hidden md:block w-72 h-44 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <img
              src={meta.bannerImage}
              alt={meta.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. SUB-CATEGORIES PILL BAR */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="page-container py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2 flex-shrink-0 hidden sm:inline">
              Filter:
            </span>

            {meta.subCategories.map((sub) => {
              const isActive = selectedSub.toLowerCase() === sub.toLowerCase();

              return (
                <button
                  key={sub}
                  onClick={() => handleSubSelect(sub)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                    isActive
                      ? 'bg-[#0D8385] text-white shadow-md shadow-[#0D8385]/20 scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MAIN PRODUCT LISTING */}
      <div className="page-container mt-8">
        {/* Controls Bar */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-800">
              Showing <span className="text-[#0D8385] font-extrabold">{filteredProducts.length}</span> items
            </span>

            {(selectedSub !== 'All' || selectedSize !== 'All') && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs text-[#E54768] font-bold hover:underline bg-[#fff0f3] px-2.5 py-1 rounded-full"
              >
                <X size={12} /> Clear Filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 ml-auto flex-wrap">
            {/* Size Filter Dropdown */}
            {allAvailableSizes.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="font-semibold hidden sm:inline">Size:</span>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded-lg px-2.5 py-1.5 font-medium outline-none focus:border-[#0D8385]"
                >
                  <option value="All">All Sizes</option>
                  {allAvailableSizes.map((sz) => (
                    <option key={sz} value={sz}>
                      {sz}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <ArrowUpDown size={14} className="text-[#0D8385]" />
              <span className="font-semibold hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded-lg px-2.5 py-1.5 font-medium outline-none focus:border-[#0D8385]"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Product Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm my-8">
            <div className="w-16 h-16 rounded-full bg-[#fff0f3] text-[#E54768] flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">No products match your selected filters</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto mb-6">
              We couldn&apos;t find any matching outfits with the selected size or subcategory. Try clearing your filters to see all available items.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#0D8385] text-white text-xs font-bold rounded-full hover:bg-[#086365] transition-colors shadow-md"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((p) => {
              const isWishlisted = wishlist.includes(p.id);
              const activeSize = productSelectedSizes[p.id] || p.sizes[0] || 'Standard';

              return (
                <div
                  key={p.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Card Image Area */}
                  <div className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer" onClick={() => setQuickViewProduct(p)}>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Hover Image Flip if available */}
                    {p.hoverImage && (
                      <img
                        src={p.hoverImage}
                        alt={`${p.name} preview`}
                        className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    )}

                    {/* Badge */}
                    {p.badge && (
                      <span
                        className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded text-[10.5px] font-bold uppercase tracking-wider text-white shadow-sm ${
                          p.badge === 'Sale'
                            ? 'bg-[#E54768]'
                            : p.badge === 'New'
                            ? 'bg-[#0D8385]'
                            : 'bg-gray-800'
                        }`}
                      >
                        {p.badge}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(p.id);
                      }}
                      className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center transition-all ${
                        isWishlisted ? 'text-[#E54768]' : 'text-gray-500 hover:text-[#E54768]'
                      }`}
                      aria-label="Wishlist"
                    >
                      <Heart size={15} className={isWishlisted ? 'fill-[#E54768]' : ''} />
                    </button>

                    {/* Quick View Button Hover Overlay */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickViewProduct(p);
                        }}
                        className="w-full py-2 bg-white/95 backdrop-blur-sm text-gray-800 hover:text-[#0D8385] text-xs font-bold rounded-lg shadow-md flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye size={14} />
                        <span>Quick View</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-3.5 flex flex-col flex-1">
                    <span className="text-[10px] font-semibold text-[#0D8385] uppercase tracking-wider mb-1">
                      {p.subCategory}
                    </span>

                    <h3
                      onClick={() => setQuickViewProduct(p)}
                      className="text-xs md:text-sm font-semibold text-gray-800 line-clamp-2 hover:text-[#0D8385] cursor-pointer mb-2 transition-colors min-h-[36px]"
                    >
                      {p.name}
                    </h3>

                    {/* Available Size Chips */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {p.sizes.slice(0, 4).map((sz) => {
                        const isSelected = activeSize === sz;
                        const isOut = p.outOfStockSizes?.includes(sz);

                        return (
                          <button
                            key={sz}
                            type="button"
                            disabled={isOut}
                            onClick={() => handleSizeClick(p.id, sz)}
                            className={`text-[9.5px] px-1.5 py-0.5 rounded border transition-all ${
                              isSelected
                                ? 'bg-[#1B3F9B] text-white border-[#1B3F9B] font-bold'
                                : isOut
                                ? 'bg-gray-100 text-gray-400 line-through border-gray-200 cursor-not-allowed'
                                : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#0D8385]'
                            }`}
                          >
                            {sz}
                          </button>
                        );
                      })}
                      {p.sizes.length > 4 && (
                        <span className="text-[9.5px] text-gray-400 self-center">
                          +{p.sizes.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Price & Add to Bag */}
                    <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                      <div>
                        <div className="font-extrabold text-sm md:text-base text-[#E54768]">
                          {p.priceDisplay}
                        </div>
                        {p.originalPrice && (
                          <div className="text-[11px] text-gray-400 line-through font-medium">
                            {p.originalPrice}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => addToCart(p, activeSize, 1)}
                        className="bg-[#0D8385] hover:bg-[#086365] text-white p-2 rounded-lg transition-transform active:scale-95 shadow-sm hover:shadow"
                        title={`Add ${activeSize} to bag`}
                        aria-label="Add to bag"
                      >
                        <ShoppingBag size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 5. WEBNIBO ASSURANCE BANNER (Hidden on mobile) */}
        <section className="mt-16 bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hidden md:block">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#e6f6f6] flex items-center justify-center text-[#0D8385] flex-shrink-0">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Free Shipping $50+</h4>
                <p className="text-xs text-gray-500">Fast worldwide delivery</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#fff0f3] flex items-center justify-center text-[#E54768] flex-shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Cash On Delivery</h4>
                <p className="text-xs text-gray-500">Pay safely at your doorstep</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                <RotateCcw size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">7 Days Exchange</h4>
                <p className="text-xs text-gray-500">Hassle-free size replacement</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Customer Support</h4>
                <a
                  href="https://wa.me/15552345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#0D8385] font-semibold hover:underline"
                >
                  +1 (555) 234-5678
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

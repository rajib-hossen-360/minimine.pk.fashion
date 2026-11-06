'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Heart,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  Check,
  Star,
  ExternalLink,
  ShoppingBag,
  Eye,
  Truck,
  RotateCcw,
  ShieldCheck,
  Phone,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { allProducts, Product } from '@/lib/minimine-data';

// Hero slides with authentic Minimine photography
const heroSlides = [
  {
    id: 1,
    tag: 'NEW ARRIVALS 2025',
    title: 'Warm Winter Collection',
    subtitle: 'Cozy hoodies, three-piece suits, knitted sweaters, and soft nightsuits for happy kids.',
    btnText: 'Shop Boys & Girls',
    href: '/category/boys',
    discount: 'UP TO 40%',
    bg: 'https://minimine.pk/wp-content/uploads/2024/11/happy-child-lies-on-the-grass-next-to-a-red-toy-airplane.jpg',
  },
  {
    id: 2,
    tag: 'BABY DELIGHTS',
    title: 'Infant & Toddler Rompers',
    subtitle: '100% gentle cotton fabrics crafted for delicate newborn and infant skin.',
    btnText: 'Explore Infant',
    href: '/category/infant',
    discount: 'FLAT 25%',
    bg: 'https://images.pexels.com/photos/16222075/pexels-photo-16222075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 3,
    tag: 'TRENDY ESSENTIALS',
    title: 'Chic Frocks & Sets',
    subtitle: 'Adorable coordinates, twirl skirts, and sparkling accessories little ones love.',
    btnText: 'Explore Girls',
    href: '/category/girls',
    discount: 'NEW',
    bg: 'https://minimine.pk/wp-content/uploads/2024/11/fashion-little-girl-wirh-bow-and-sunglasses-on-wooden-wall-background-eating-ice-cream.jpg',
  },
];

// Customer reviews directly from Minimine PK Facebook & site
const customerReviews = [
  {
    name: 'Ayesha Khan',
    initials: 'AK',
    date: '15 Oct 2025',
    city: 'Lahore',
    text: 'MashAllah the fabric quality of the Mickey nightsuit is so soft! My daughter loves wearing it. Delivery was super quick to Lahore!',
  },
  {
    name: 'Zeeshan Tariq',
    initials: 'ZT',
    date: '28 Sep 2025',
    city: 'Karachi',
    text: 'Ordered the 3-piece puffer suit for my son. Exact same as shown on their Instagram and website. Cash on delivery was seamless.',
  },
  {
    name: 'Fatima Bilal',
    initials: 'FB',
    date: '10 Aug 2025',
    city: 'Islamabad',
    text: 'Loved the hair accessories and bows! Very gentle on baby hair, no snagging at all. Will definitely be ordering regularly.',
  },
  {
    name: 'Hina Farooq',
    initials: 'HF',
    date: '02 Aug 2025',
    city: 'Multan',
    text: 'Super satisfied! The sizing chart was 100% accurate. The polo shirt and denim shorts fit my 4-year-old boy perfectly.',
  },
  {
    name: 'Saad Ahmed',
    initials: 'SA',
    date: '24 Jul 2025',
    city: 'Rawalpindi',
    text: 'Best online experience for kids clothing. Delivered in 2 days and the packaging was top notch with a cute gift tag.',
  },
];

export default function HomePage() {
  const { addToCart, wishlist, toggleWishlist, setQuickViewProduct } = useCart();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<'All' | 'Girls' | 'Boys' | 'Infant' | 'Sale'>('All');
  const [selectedProductSizes, setSelectedProductSizes] = useState<Record<string, string>>({});
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % customerReviews.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + customerReviews.length) % customerReviews.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      nextReview();
    } else if (diff < -45) {
      prevReview();
    }
    setTouchStartX(null);
  };

  // Slideshow auto-advance every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Filter products for the showcase tab
  const tabProducts = useMemo(() => {
    if (activeTab === 'All') return allProducts.slice(0, 8);
    if (activeTab === 'Girls') return allProducts.filter((p) => p.category === 'girls').slice(0, 8);
    if (activeTab === 'Boys') return allProducts.filter((p) => p.category === 'boys').slice(0, 8);
    if (activeTab === 'Infant') return allProducts.filter((p) => p.category === 'infant').slice(0, 8);
    if (activeTab === 'Sale') return allProducts.filter((p) => p.badge === 'Sale' || p.originalPrice).slice(0, 8);
    return allProducts.slice(0, 8);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SLIDESHOW SECTION */}
      <section className="hero-slider-section relative">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className="hero-slide"
            style={{
              backgroundImage: `url(${slide.bg})`,
              display: index === currentSlide ? 'flex' : 'none',
            }}
          >
            <div className="hero-slide-overlay" />
            <div className="page-container hero-content">
              <span className="hero-tag">{slide.tag}</span>
              <h1 className="hero-title">
                {slide.title.split(' ')[0]} <br />
                <span>{slide.title.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
              <Link href={slide.href} className="hero-cta-btn inline-flex items-center gap-2">
                {slide.btnText}
                <ArrowRight size={17} />
              </Link>
            </div>

            {/* Floating wobble sticker */}
            <div className="hero-floating-sticker">
              <strong>{slide.discount}</strong>
              <span>OFF</span>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="hero-slider-arrows">
          <button
            className="hero-nav-arrow"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="hero-nav-arrow"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* 2. PROMOTIONAL 3-GRID CATEGORY HERO CARDS */}
      <section className="page-container py-10">
        <div className="category-cards-grid">
          {/* Card 1: Girls */}
          <Link href="/category/girls" className="promo-category-card group">
            <img
              src="https://minimine.pk/wp-content/uploads/2024/11/fashion-little-girl-wirh-bow-and-sunglasses-on-wooden-wall-background-eating-ice-cream.jpg"
              alt="Girls Collection"
              className="promo-category-img group-hover:scale-105 transition-transform duration-500"
            />
            <div className="promo-category-overlay">
              <h2 className="promo-category-title">Girls</h2>
              <p className="promo-category-sub">Clothing & Dresses</p>
              <span className="promo-category-btn">Shop Now</span>
            </div>
          </Link>

          {/* Card 2: Boys */}
          <Link href="/category/boys" className="promo-category-card group">
            <img
              src="https://minimine.pk/wp-content/uploads/2024/11/happy-child-lies-on-the-grass-next-to-a-red-toy-airplane.jpg"
              alt="Boys Collection"
              className="promo-category-img group-hover:scale-105 transition-transform duration-500"
            />
            <div className="promo-category-overlay">
              <h2 className="promo-category-title">Boys</h2>
              <p className="promo-category-sub">Suits & Hoodies</p>
              <span className="promo-category-btn">Shop Now</span>
            </div>
          </Link>

          {/* Card 3: Accessories */}
          <Link href="/category/accessories" className="promo-category-card group">
            <img
              src="https://minimine.pk/wp-content/uploads/2024/11/WhatsApp-Image-2024-05-21-at-1.20.34-AM-1.jpeg"
              alt="Accessories"
              className="promo-category-img group-hover:scale-105 transition-transform duration-500"
            />
            <div className="promo-category-overlay">
              <h2 className="promo-category-title">Accessories</h2>
              <p className="promo-category-sub">Bows & Jewelry</p>
              <span className="promo-category-btn">Shop Now</span>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. INFINITE DELIVERY TICKER MARQUEE */}
      <div className="delivery-marquee">
        <div className="delivery-track">
          <div className="delivery-item">🚚 FREE SHIPPING ON ALL ORDERS ABOVE $50 WORLDWIDE!</div>
          <div className="delivery-item">💰 CASH ON DELIVERY & SECURE CARD PAYMENTS</div>
          <div className="delivery-item">📞 24/7 CUSTOMER SUPPORT: +1 (555) 234-5678</div>
          <div className="delivery-item">🔄 7 DAYS HASSLE-FREE SIZE EXCHANGE GUARANTEE</div>
          <div className="delivery-item">🚚 FREE SHIPPING ON ALL ORDERS ABOVE $50 WORLDWIDE!</div>
          <div className="delivery-item">💰 CASH ON DELIVERY & SECURE CARD PAYMENTS</div>
        </div>
      </div>

      {/* 4. FEATURED PRODUCTS: "YOU'LL ❤ THIS" */}
      <section id="products" className="section-wrapper page-container">
        <div className="section-header">
          <p className="section-tagline">Small things, big joy</p>
          <h2 className="section-heading-heart">
            You&apos;ll <Heart className="heart-icon inline-block text-[#E54768] fill-[#E54768]" size={36} /> This
          </h2>
          <p className="section-desc">
            We’ve picked our most adored styles. Soft fabrics, child-friendly tailoring, and stylish looks.
          </p>
          <div className="squiggle-divider" />
        </div>

        {/* Filter Category Tabs */}
        <div className="filter-tabs-row">
          {(['All', 'Girls', 'Boys', 'Infant', 'Sale'] as const).map((tab) => (
            <button
              key={tab}
              className={`filter-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'Sale' ? '🔥 On Sale' : tab}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="products-grid">
          {tabProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const activeSize = selectedProductSizes[product.id] || product.sizes[0] || 'Standard';

            return (
              <article key={product.id} className="product-card group">
                {/* Thumbnail & Quick Hover */}
                <div
                  className="product-image-container relative cursor-pointer"
                  onClick={() => setQuickViewProduct(product)}
                >
                  {/* Badge */}
                  {product.badge && (
                    <span
                      className={`product-badge ${
                        product.badge === 'Sale'
                          ? 'badge-sale'
                          : product.badge === 'Sold Out'
                          ? 'badge-soldout'
                          : 'badge-new'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    className={`product-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    aria-label="Add to wishlist"
                  >
                    <Heart size={18} className={isWishlisted ? 'fill-[#E54768] text-[#E54768]' : ''} />
                  </button>

                  {/* Product Images with Hover Flip */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-primary-img"
                    loading="lazy"
                  />
                  {product.hoverImage && (
                    <img
                      src={product.hoverImage}
                      alt={`${product.name} alternate view`}
                      className="product-secondary-img"
                      loading="lazy"
                    />
                  )}

                  {/* Quick Select Button on Hover */}
                  <div className="product-quick-action">
                    <button
                      type="button"
                      className="quick-select-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                    >
                      <Eye size={14} className="inline mr-1" /> Quick View
                    </button>
                  </div>
                </div>

                {/* Details */}
                <h3
                  className="product-title cursor-pointer"
                  onClick={() => setQuickViewProduct(product)}
                >
                  {product.name}
                </h3>

                <div className="product-price-row flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="product-price">{product.priceDisplay}</span>
                    {product.originalPrice && (
                      <span className="product-old-price">{product.originalPrice}</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(product, activeSize, 1)}
                    className="p-1.5 bg-[#0D8385] hover:bg-[#086365] text-white rounded-lg transition-transform active:scale-95 shadow-sm"
                    title={`Add ${activeSize} to bag`}
                  >
                    <ShoppingBag size={15} />
                  </button>
                </div>

                {/* Size Chips Selection */}
                <div className="size-chips-wrapper">
                  {product.sizes.map((size) => {
                    const isOutOfStock = product.outOfStockSizes?.includes(size);
                    const isSelected = activeSize === size;

                    return (
                      <button
                        key={size}
                        type="button"
                        disabled={isOutOfStock}
                        className={`size-chip ${isSelected ? 'active' : ''} ${
                          isOutOfStock ? 'out-of-stock' : ''
                        }`}
                        onClick={() => {
                          if (!isOutOfStock) {
                            setSelectedProductSizes((prev) => ({
                              ...prev,
                              [product.id]: size,
                            }));
                          }
                        }}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

        {/* View All in Category Link */}
        <div className="text-center mt-10">
          <Link
            href={
              activeTab === 'Girls'
                ? '/category/girls'
                : activeTab === 'Boys'
                ? '/category/boys'
                : activeTab === 'Infant'
                ? '/category/infant'
                : activeTab === 'Sale'
                ? '/category/sale'
                : '/category/boys'
            }
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0D8385] hover:bg-[#086365] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <span>View Full {activeTab === 'All' ? 'Collection' : activeTab} Page</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* 5. TOP SELLING PROMO BANNER */}
      <section className="top-selling-banner my-12">
        <div className="page-container top-selling-inner">
          <img
            src="https://minimine.pk/wp-content/uploads/2024/11/Decoration2.png"
            alt="Doodle 2"
            className="top-selling-decor-1"
          />
          <img
            src="https://minimine.pk/wp-content/uploads/2024/11/Decoration1-1.png"
            alt="Doodle 1"
            className="top-selling-decor-2"
          />

          <div className="top-selling-image-wrap">
            <img
              src="https://images.pexels.com/photos/3985069/pexels-photo-3985069.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Child happy with new clothes"
              className="top-selling-img"
            />
          </div>

          <div className="top-selling-content">
            <h2>Two & Three Piece Suits</h2>
            <p>
              We celebrate childhood with thoughtful designs, comfortable stretch fabrics, and convenient Cash on Delivery across Pakistan.
            </p>
            <Link href="/category/boys?sub=Two piece suits" className="top-selling-btn inline-flex items-center gap-2">
              Shop Suits Now <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. POPULAR CATEGORIES (PLAYFUL BOUNCY BLOBS) */}
      <section className="popular-categories-section page-container py-12">
        <div className="section-header">
          <p className="section-tagline">Browse by favorites</p>
          <h2 className="section-heading-heart">Popular Categories</h2>
          <div className="squiggle-divider" />
        </div>

        <div className="popular-grid">
          {/* Girls Clothing */}
          <Link href="/category/girls" className="popular-blob-card">
            <div className="blob-icon-shape blob-pink">
              <span className="text-4xl">👗</span>
            </div>
            <h3 className="popular-card-title">Girls Clothing</h3>
          </Link>

          {/* Boys Clothing */}
          <Link href="/category/boys" className="popular-blob-card">
            <div className="blob-icon-shape blob-blue">
              <span className="text-4xl">👕</span>
            </div>
            <h3 className="popular-card-title">Boys Clothing</h3>
          </Link>

          {/* Infant & Rompers */}
          <Link href="/category/infant" className="popular-blob-card">
            <div className="blob-icon-shape blob-gold">
              <span className="text-4xl">👶</span>
            </div>
            <h3 className="popular-card-title">Infant & Rompers</h3>
          </Link>

          {/* Back To School & Essentials */}
          <Link href="/category/essentials" className="popular-blob-card">
            <div className="blob-icon-shape blob-sky">
              <img
                src="https://minimine.pk/wp-content/uploads/2025/08/4807726.png"
                alt="Back To School Icon"
              />
            </div>
            <h3 className="popular-card-title">Back To School</h3>
          </Link>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS (AUTHENTIC 5-STAR FACEBOOK STYLE) */}
      <section className="reviews-section py-16 bg-[#FDFBF7]">
        <div className="page-container">
          <div className="reviews-grid">
            {/* Summary Brand Card */}
            <div className="review-summary-card">
              <div className="summary-brand-row">
                <div className="summary-logo-badge">
                  <img
                    src="/webkyro-w-icon-transparent-1024x1024.png"
                    alt="webkyro badge"
                  />
                </div>
                <div>
                  <h4 className="summary-title">webkyro</h4>
                  <div className="facebook-stars text-amber-400">★★★★★</div>
                </div>
              </div>
              <p className="review-count-text">
                Rated <strong>5.0 / 5.0</strong> based on verified Facebook reviews
              </p>
              <a
                href="https://facebook.com/webkyro"
                target="_blank"
                rel="noopener noreferrer"
                className="write-review-btn inline-flex items-center gap-2"
              >
                Write a review <ExternalLink size={13} />
              </a>
            </div>

            {/* Single Interactive Review Slider Card */}
            {(() => {
              const currentRev = customerReviews[currentReviewIndex];
              return (
                <div
                  className="review-slider-card"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <div key={currentReviewIndex} className="review-fade-anim flex flex-col h-full">
                    <div className="review-card-top flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="review-avatar">{currentRev.initials}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="reviewer-name">{currentRev.name}</h5>
                            {currentRev.city && (
                              <span className="text-[11px] text-gray-400 font-normal">
                                • {currentRev.city}
                              </span>
                            )}
                          </div>
                          <div className="text-[#1877F2] text-xs">★★★★★</div>
                        </div>
                      </div>

                      {/* Navigation Arrow Controls */}
                      <div className="flex items-center gap-2">
                        <span className="fb-badge-icon font-bold text-lg mr-1 hidden sm:inline-block">f</span>
                        <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-full border border-gray-200">
                          <button
                            type="button"
                            onClick={prevReview}
                            aria-label="Previous review"
                            className="w-8 h-8 rounded-full bg-white text-gray-700 hover:text-[#0D8385] hover:bg-gray-100 flex items-center justify-center shadow-xs transition-all active:scale-95 border border-gray-200 cursor-pointer"
                          >
                            <ChevronLeft size={17} />
                          </button>
                          <button
                            type="button"
                            onClick={nextReview}
                            aria-label="Next review"
                            className="w-8 h-8 rounded-full bg-white text-gray-700 hover:text-[#0D8385] hover:bg-gray-100 flex items-center justify-center shadow-xs transition-all active:scale-95 border border-gray-200 cursor-pointer"
                          >
                            <ChevronRight size={17} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="review-recommend-badge mt-2">
                      <Check size={14} /> recommends webnibo
                    </div>

                    <p className="review-text text-sm md:text-base leading-relaxed text-gray-700 my-3 font-normal min-h-[64px]">
                      &ldquo;{currentRev.text}&rdquo;
                    </p>

                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                      <span className="review-date text-gray-400 font-medium">
                        {currentRev.date}
                      </span>

                      {/* Dots Pagination */}
                      <div className="flex items-center gap-1.5">
                        {customerReviews.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentReviewIndex(idx)}
                            aria-label={`Go to review ${idx + 1}`}
                            className={`h-2 rounded-full transition-all cursor-pointer ${
                              idx === currentReviewIndex
                                ? 'w-5 bg-[#0D8385]'
                                : 'w-2 bg-gray-200 hover:bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 8. WEBNIBO ASSURANCE BAR (Hidden on mobile) */}
      <section className="page-container py-12 hidden md:block">
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#e6f6f6] flex items-center justify-center text-[#0D8385] flex-shrink-0">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Free Shipping $50+</h4>
                <p className="text-xs text-gray-500">Delivered within 2-4 working days</p>
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
                <p className="text-xs text-gray-500">Fast size & item replacements</p>
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
        </div>
      </section>
    </div>
  );
}

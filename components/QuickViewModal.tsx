'use client';

import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Heart, Ruler, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    setSizeGuideOpen,
  } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes[0] || 'Standard');
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isWishlisted = wishlist.includes(quickViewProduct.id);

  return (
    <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
      <div
        className="modal-content-box max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setQuickViewProduct(null)}
          className="modal-close-icon"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="quick-view-grid">
          {/* Product Image */}
          <div className="relative rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="qv-image object-cover w-full h-full"
            />
            {quickViewProduct.badge && (
              <span className={`product-badge ${quickViewProduct.badge.toLowerCase()} absolute top-3 left-3`}>
                {quickViewProduct.badge}
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="text-xs font-bold text-[#0D8385] uppercase tracking-wider mb-1">
              {quickViewProduct.categoryLabel} • {quickViewProduct.subCategory}
            </div>

            <h2 className="qv-title text-xl font-bold text-gray-900 leading-snug">
              {quickViewProduct.name}
            </h2>

            <div className="flex items-baseline gap-2.5 my-2">
              <span className="qv-price font-extrabold text-2xl text-[#E54768]">
                {quickViewProduct.priceDisplay}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="line-through text-sm text-gray-400 font-semibold">
                  {quickViewProduct.originalPrice}
                </span>
              )}
            </div>

            {quickViewProduct.description && (
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                {quickViewProduct.description}
              </p>
            )}

            {/* Size Selector */}
            <div className="mb-4">
              <div className="qv-label flex justify-between items-center text-xs font-bold text-gray-700 mb-2">
                <span>Select Size: <strong className="text-[#0D8385]">{selectedSize}</strong></span>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="size-guide-trigger-btn flex items-center gap-1 text-[11px] text-[#0D8385] hover:underline"
                >
                  <Ruler size={13} />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="qv-sizes-row flex flex-wrap gap-2">
                {quickViewProduct.sizes.map((sz) => {
                  const isOutOfStock = quickViewProduct.outOfStockSizes?.includes(sz);
                  const isSelected = selectedSize === sz;

                  return (
                    <button
                      key={sz}
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => setSelectedSize(sz)}
                      className={`qv-size-btn text-xs px-3 py-1.5 rounded border transition-all ${
                        isSelected
                          ? 'selected bg-[#1B3F9B] text-white border-[#1B3F9B]'
                          : isOutOfStock
                          ? 'disabled bg-gray-100 text-gray-400 line-through cursor-not-allowed border-gray-200'
                          : 'bg-white text-gray-800 border-gray-300 hover:border-[#0D8385]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & Add to Bag */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center border border-gray-300 rounded h-11 px-2 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-600 hover:text-black px-2 font-bold text-sm"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-semibold text-gray-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-600 hover:text-black px-2 font-bold text-sm"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => addToCart(quickViewProduct, selectedSize, quantity)}
                className="qv-add-btn flex-1 bg-[#0D8385] hover:bg-[#086365] text-white font-bold h-11 px-4 rounded text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <ShoppingBag size={18} />
                <span>Add To Bag</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`h-11 w-11 rounded border flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-[#E54768]'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:text-[#E54768]'
                }`}
                title={isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
              >
                <Heart size={18} className={isWishlisted ? 'fill-[#E54768]' : ''} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-gray-100 pt-3 flex flex-col gap-1.5 text-[11px] text-gray-500">
              <div className="flex items-center gap-1.5">
                <Truck size={14} className="text-[#0D8385]" />
                <span>Fast shipping & Cash on Delivery available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw size={14} className="text-[#0D8385]" />
                <span>7 Days Hassle-free Exchange Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#0D8385]" />
                <span>100% Genuine Quality Fabrics tested for baby comfort</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

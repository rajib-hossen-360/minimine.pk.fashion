'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { allProducts } from '@/lib/minimine-data';

export default function SearchModal() {
  const { searchOpen, setSearchOpen, setQuickViewProduct } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const q = searchTerm.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
    ).slice(0, 10);
  }, [searchTerm]);

  if (!searchOpen) return null;

  const popularSearches = ['Sweater', 'Nightsuit', 'Two piece suit', 'Frock', 'Bag', 'Denim', 'Earrings', 'Puffer'];

  return (
    <div className="modal-overlay" onClick={() => setSearchOpen(false)}>
      <div
        className="search-modal-box max-w-xl bg-white rounded-xl shadow-2xl p-6 relative w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setSearchOpen(false)}
          className="modal-close-icon absolute top-4 right-4"
          aria-label="Close search"
        >
          <X size={18} />
        </button>

        <h3 className="font-bold text-gray-800 text-lg mb-2">Search webnibo Collection</h3>

        <div className="search-input-wrap flex items-center gap-2 border-b-2 border-[#0D8385] pb-2 pt-1">
          <Search size={20} className="text-[#0D8385]" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by suit, frock, nightsuit, age, category..."
            className="search-input-field flex-1 text-base outline-none bg-transparent"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-gray-400 hover:text-gray-700">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Popular Tags */}
        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-gray-400">Popular:</span>
          {popularSearches.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSearchTerm(tag)}
              className="text-[11px] bg-gray-100 hover:bg-[#e6f6f6] hover:text-[#0D8385] px-2.5 py-1 rounded-full text-gray-600 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="search-results-list mt-4 max-h-[340px] overflow-y-auto divide-y divide-gray-100">
          {searchTerm.trim() && filteredProducts.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">
              No products found matching &ldquo;{searchTerm}&rdquo;. Try another term.
            </div>
          )}

          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="search-result-item flex items-center gap-3 py-2.5 px-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              onClick={() => {
                setQuickViewProduct(p);
                setSearchOpen(false);
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-12 h-12 rounded object-cover border border-gray-100 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-800 truncate">{p.name}</h4>
                <p className="text-[11px] text-gray-500">
                  {p.categoryLabel} • {p.subCategory}
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-[#E54768] block">{p.priceDisplay}</span>
                <span className="text-[10px] text-[#0D8385] font-semibold">Quick View</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

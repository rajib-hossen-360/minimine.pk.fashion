'use client';

import React from 'react';
import { X, Ruler, Info } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function SizeGuideModal() {
  const { sizeGuideOpen, setSizeGuideOpen } = useCart();

  if (!sizeGuideOpen) return null;

  const sizeChart = [
    { age: '9-12 Months', chest: '20"', length: '14"', waist: '18"' },
    { age: '1-2 Years', chest: '22"', length: '15.5"', waist: '19"' },
    { age: '2-3 Years', chest: '23"', length: '17"', waist: '20"' },
    { age: '3-4 Years', chest: '24"', length: '18.5"', waist: '21"' },
    { age: '4-5 Years', chest: '25"', length: '20"', waist: '22"' },
    { age: '5-6 Years', chest: '26"', length: '21.5"', waist: '23"' },
    { age: '6-7 Years', chest: '27"', length: '23"', waist: '24"' },
    { age: '7-8 Years', chest: '28"', length: '24.5"', waist: '25"' },
    { age: '9-10 Years', chest: '30"', length: '26"', waist: '26"' },
    { age: '11-12 Years', chest: '32"', length: '28"', waist: '27"' },
    { age: '13-14 Years', chest: '34"', length: '30"', waist: '28"' },
  ];

  return (
    <div className="modal-overlay" onClick={() => setSizeGuideOpen(false)}>
      <div
        className="modal-content-box max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setSizeGuideOpen(false)}
          className="modal-close-icon"
          aria-label="Close size guide"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Ruler size={24} className="text-[#0D8385]" />
          <h2 className="text-xl font-bold text-gray-900 font-display">
            Minimine Kids Size Guide
          </h2>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          All measurements are standard garment dimensions in inches. For healthy/taller kids, we recommend sizing up one size.
        </p>

        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="size-table text-left text-xs w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-700">
                <th className="py-2.5 px-3 font-bold text-[#0D8385]">Age / Size</th>
                <th className="py-2.5 px-3 font-bold">Chest (in)</th>
                <th className="py-2.5 px-3 font-bold">Top Length (in)</th>
                <th className="py-2.5 px-3 font-bold">Waist (in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sizeChart.map((row) => (
                <tr key={row.age} className="hover:bg-gray-50">
                  <td className="py-2.5 px-3 font-semibold text-gray-900">{row.age}</td>
                  <td className="py-2.5 px-3 text-gray-700">{row.chest}</td>
                  <td className="py-2.5 px-3 text-gray-700">{row.length}</td>
                  <td className="py-2.5 px-3 text-gray-700">{row.waist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-800">
          <Info size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Need measurement assistance?</strong> Our team is happy to measure specific pieces before shipping. WhatsApp us at{' '}
            <a href="https://wa.me/15552345678" target="_blank" rel="noopener noreferrer" className="font-bold underline text-[#0D8385]">
              +1 (555) 234-5678
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}

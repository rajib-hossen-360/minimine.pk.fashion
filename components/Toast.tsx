'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="toast-notice">
      <CheckCircle2 size={18} className="text-[#0D8385]" />
      <span>{toastMessage}</span>
    </div>
  );
}

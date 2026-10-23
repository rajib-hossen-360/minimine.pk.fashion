'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import SizeGuideModal from '@/components/SizeGuideModal';
import SearchModal from '@/components/SearchModal';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Toast from '@/components/Toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      {children}
      <Footer />
      <CartDrawer />
      <QuickViewModal />
      <SizeGuideModal />
      <SearchModal />
      <FloatingWhatsApp />
      <Toast />
    </CartProvider>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Heart,
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const navItems = [
  {
    title: 'Home',
    href: '/',
    items: [],
  },
  {
    title: 'Boys',
    href: '/category/boys',
    items: [
      { name: 'All Boys Clothing', href: '/category/boys' },
      { name: 'Two piece suits', href: '/category/boys?sub=Two piece suits' },
      { name: 'Night Suit', href: '/category/boys?sub=Night Suit' },
      { name: 'Pants & Cargo', href: '/category/boys?sub=Pants & Cargo' },
      { name: 'T-shirts & Polos', href: '/category/boys?sub=T-shirts & Polos' },
      { name: 'Sweatshirt & Hoodies', href: '/category/boys?sub=Sweatshirt & Hoodies' },
      { name: 'Co-ord sets', href: '/category/boys?sub=Co-ord sets' },
    ],
  },
  {
    title: 'Girls',
    href: '/category/girls',
    items: [
      { name: 'All Girls Clothing', href: '/category/girls' },
      { name: 'Co-ord sets', href: '/category/girls?sub=Co-ord sets' },
      { name: 'Two piece suits', href: '/category/girls?sub=Two piece suits' },
      { name: 'Nightsuits', href: '/category/girls?sub=Nightsuits' },
      { name: 'Frocks & Skirts', href: '/category/girls?sub=Frocks & Skirts' },
      { name: 'Denim Suits', href: '/category/girls?sub=Denim Suits' },
      { name: 'Tights & Leggings', href: '/category/girls?sub=Tights & Leggings' },
    ],
  },
  {
    title: 'Accessories',
    href: '/category/accessories',
    items: [
      { name: 'All Accessories', href: '/category/accessories' },
      { name: 'Bows & Scrunchies', href: '/category/accessories?sub=Bows & Scrunchies' },
      { name: 'Earrings & Hoops', href: '/category/accessories?sub=Earrings & Hoops' },
      { name: 'Bracelets & Necklaces', href: '/category/accessories?sub=Bracelets & Necklaces' },
      { name: 'Jewellerybox & Pouches', href: '/category/accessories?sub=Jewellerybox & Pouches' },
      { name: 'PREMIUM', href: '/category/accessories?sub=PREMIUM' },
    ],
  },
  {
    title: 'Infant',
    href: '/category/infant',
    items: [
      { name: 'All Infant Clothing', href: '/category/infant' },
      { name: 'Two piece suits', href: '/category/infant?sub=Two piece suits' },
      { name: 'Rompers', href: '/category/infant?sub=Rompers' },
      { name: 'Warm Suits', href: '/category/infant?sub=Warm Suits' },
      { name: 'Nightsuit', href: '/category/infant?sub=Nightsuit' },
    ],
  },
  {
    title: 'Mom & Dad',
    href: '/category/mom-and-dad',
    items: [
      { name: 'All Loungewear', href: '/category/mom-and-dad' },
      { name: 'Mommy & Baby Duo', href: '/category/mom-and-dad?sub=Mommy & Baby Duo' },
      { name: 'Women Loungewear', href: '/category/mom-and-dad?sub=Women Loungewear' },
      { name: 'Nightsuits', href: '/category/mom-and-dad?sub=Nightsuits' },
      { name: 'Co-ord sets', href: '/category/mom-and-dad?sub=Co-ord sets' },
    ],
  },
  {
    title: 'Essentials',
    href: '/category/essentials',
    items: [
      { name: 'All Essentials', href: '/category/essentials' },
      { name: 'Back To School', href: '/category/essentials?sub=Back To School' },
      { name: 'Bags & Backpacks', href: '/category/essentials?sub=Bags & Backpacks' },
      { name: 'Stationery & Pouches', href: '/category/essentials?sub=Stationery & Pouches' },
      { name: 'Water Bottles', href: '/category/essentials?sub=Water Bottles' },
    ],
  },
  {
    title: 'Sale',
    href: '/category/sale',
    isSale: true,
    items: [],
  },
];

export default function Header() {
  const pathname = usePathname();
  const { cartCount, cartTotal, setCartDrawerOpen, wishlist, setSearchOpen, showToast } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR (Hidden on mobile) */}
      <div className="announcement-bar hidden md:flex">
        <span>
          <strong>Welcome to webnibo!</strong> Free worldwide shipping on orders over $50. Tax inclusive.
        </span>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="site-header">
        <div className="page-container header-inner">
          {/* Mobile hamburger */}
          <button
            className="mobile-menu-toggle action-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Open mobile navigation"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link href="/" className="brand-logo-link" aria-label="webkyro Home">
            <img
              src="/logo.png"
              alt="webkyro Logo"
              className="brand-logo-img"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <div key={item.title} className="nav-item">
                  <Link
                    href={item.href}
                    className={`nav-link ${isActive ? 'active' : ''} ${item.isSale ? 'sale-link' : ''}`}
                  >
                    {item.title}
                    {item.items.length > 0 && <ChevronDown size={14} className="opacity-70" />}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.items.length > 0 && (
                    <ul className="nav-dropdown">
                      {item.items.map((sub) => (
                        <li key={sub.name}>
                          <Link href={sub.href}>{sub.name}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="header-actions">
            {/* Search */}
            <button
              className="action-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search items"
            >
              <Search size={21} />
            </button>

            {/* Wishlist */}
            <button
              className="action-btn"
              onClick={() => {
                if (wishlist.length === 0) {
                  showToast('Your wishlist is currently empty');
                } else {
                  showToast(`You have ${wishlist.length} item(s) in wishlist`);
                }
              }}
              aria-label="Wishlist items"
            >
              <Heart size={21} />
              {wishlist.length > 0 && (
                <span className="wishlist-counter-bubble">{wishlist.length}</span>
              )}
            </button>

            {/* Shopping Bag Pill Button */}
            <button
              className="cart-toggle-btn"
              onClick={() => setCartDrawerOpen(true)}
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag size={20} className="text-[#0D8385]" />
              <span className="hidden sm:inline">₨ {cartTotal.toLocaleString()}</span>
              {cartCount > 0 && <span className="cart-counter-bubble">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* 3. MOBILE NAVIGATION DRAWER */}
      {mobileOpen && (
        <div className="drawer-backdrop" onClick={() => setMobileOpen(false)}>
          <aside
            className="w-[300px] h-full bg-white flex flex-col p-6 shadow-2xl animate-slide-right overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <img
                  src="/logo.png"
                  alt="webkyro Logo"
                  className="h-9 w-auto"
                />
              </Link>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={22} className="text-gray-600" />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {navItems.map((cat) => {
                const isExpanded = expandedSubmenu === cat.title;
                const isActive = pathname === cat.href;

                return (
                  <div key={cat.title} className="border-b border-gray-100/80 py-1">
                    <div className="flex items-center justify-between">
                      <Link
                        href={cat.href}
                        onClick={() => setMobileOpen(false)}
                        className={`font-semibold py-2.5 text-base flex-1 transition-colors ${
                          cat.isSale
                            ? 'text-[#E54768] font-bold'
                            : isActive
                            ? 'text-[#0D8385] font-bold'
                            : 'text-gray-800 hover:text-[#0D8385]'
                        }`}
                      >
                        {cat.title}
                      </Link>

                      {cat.items.length > 0 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setExpandedSubmenu(isExpanded ? null : cat.title);
                          }}
                          className="p-2.5 text-gray-500 hover:text-gray-800 transition-colors"
                          aria-label={`Toggle ${cat.title} submenu`}
                        >
                          <ChevronDown
                            size={18}
                            className={`transform transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[#0D8385]' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Submenu */}
                    {cat.items.length > 0 && isExpanded && (
                      <div className="pl-3.5 pb-2.5 pt-1 flex flex-col gap-1 border-l-2 border-[#0D8385]/30 ml-2">
                        {cat.items.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-left text-sm text-gray-600 hover:text-[#0D8385] hover:bg-gray-50 py-1.5 px-2 rounded transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={15} className="text-[#0D8385]" />
                <a href="tel:+15552345678">+1 (555) 234-5678</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={15} className="text-[#0D8385]" />
                <a href="mailto:support@webnibo.com">support@webnibo.com</a>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

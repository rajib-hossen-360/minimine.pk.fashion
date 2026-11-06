'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Footer() {
  const { setSizeGuideOpen, showToast } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      showToast('Thank you for subscribing to webnibo!');
    }
  };

  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="footer-columns-grid">
          {/* Column 1: Information */}
          <div className="footer-col">
            <h3>Information</h3>
            <ul className="footer-links-list">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contacts & Stores</Link></li>
              <li><button onClick={() => setSizeGuideOpen(true)} className="text-left">Size Guide</button></li>
              <li><Link href="/category/sale">Special Offers</Link></li>
            </ul>
          </div>

          {/* Column 2: Extras */}
          <div className="footer-col">
            <h3>Categories</h3>
            <ul className="footer-links-list">
              <li><Link href="/category/boys">Boys Collection</Link></li>
              <li><Link href="/category/girls">Girls Collection</Link></li>
              <li><Link href="/category/infant">Infant & Toddler</Link></li>
              <li><Link href="/category/accessories">Accessories</Link></li>
              <li><Link href="/category/mom-and-dad">Mom & Dad Loungewear</Link></li>
              <li><Link href="/category/essentials">Back To School</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="footer-col">
            <h3>Contact Us</h3>
            <div className="contact-item">
              <MapPin size={17} className="text-[#2DD4BF] flex-shrink-0" />
              <span>123 Fashion Avenue, Suite 400, New York, NY 10001</span>
            </div>
            <div className="contact-item">
              <Phone size={17} className="text-[#2DD4BF] flex-shrink-0" />
              <a href="tel:+15552345678">+1 (555) 234-5678</a>
            </div>
            <div className="contact-item">
              <Mail size={17} className="text-[#2DD4BF] flex-shrink-0" />
              <a href="mailto:support@webnibo.com">support@webnibo.com</a>
            </div>
            <p className="text-xs text-gray-400 mt-2">Mon - Sat: 9:00 AM – 8:00 PM EST</p>
          </div>

          {/* Column 4: Payment Options & Newsletter */}
          <div className="footer-col">
            <h3>Payment & News</h3>
            <p className="text-sm text-gray-300 font-medium">Cash on Delivery • Credit Card</p>
            <p className="text-sm text-gray-300 font-medium mb-3">Apple Pay • Bank Transfer</p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 rounded text-xs font-semibold">
                ✓ Thank you! You&apos;re subscribed to webnibo updates.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  Sign Up
                </button>
              </form>
            )}

            <h4 className="text-sm font-bold text-gray-200 mb-2 mt-4">Follow Us :</h4>
            <div className="social-icons-row">
              <a
                href="https://facebook.com/webnibo"
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle-btn"
                aria-label="Facebook"
              >
                <span className="font-bold text-sm">f</span>
              </a>
              <a
                href="https://instagram.com/webnibo"
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle-btn"
                aria-label="Instagram"
              >
                <span className="font-bold text-sm">📸</span>
              </a>
              <a
                href="https://twitter.com/webnibo"
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle-btn"
                aria-label="Twitter / X"
              >
                <span className="font-bold text-sm">𝕏</span>
              </a>
            </div>
          </div>
        </div>

        {/* Centered Brand Logo */}
        <div className="footer-middle-logo">
          <Link href="/" className="footer-logo-badge">
            <img
              src="/logo.png"
              alt="webkyro Footer Brand"
            />
          </Link>
        </div>

        {/* Copyright */}
        <div className="footer-bottom-copy">
          Copyright © 2025 webnibo. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
